const admin = require('firebase-admin');
const db = admin.firestore();
const { sendPushNotification } = require('../utils/pushNotifications');

const sendSignal = async (req, res) => {
  try {
    const { fromUserId, toUserId } = req.body;
    
    // 1. Create the new signal
    const signalRef = db.collection('signals').doc();
    await signalRef.set({
      fromUserId,
      toUserId,
      timestamp: new Date()
    });

    // 2. Check if this is a Mutual Match
    // We look for a signal where the recipient (toUserId) has already sent one to the sender (fromUserId)
    const matchSnapshot = await db.collection('signals')
      .where('fromUserId', '==', toUserId)
      .where('toUserId', '==', fromUserId)
      .get();

    const isMatch = !matchSnapshot.empty;

    // 3. Get tokens for both users
    const toUserDoc = await db.collection('users').doc(toUserId).get();
    const fromUserDoc = await db.collection('users').doc(fromUserId).get();
    
    const toToken = toUserDoc.data()?.fcmToken;
    const fromToken = fromUserDoc.data()?.fcmToken;

    if (isMatch) {
      // --- CASE: MUTUAL MATCH ---
      // Notify the person receiving this signal
      if(toToken) {
        await sendPushNotification(toToken, "It's a Match! 💘 Someone you signaled liked you back!");
      }
      // Optional: Notify the sender immediately as well
      if(fromToken) {
        await sendPushNotification(fromToken, "It's a Match! 💘 You matched with a user!");
      }
    } else {
      // --- CASE: STANDARD SIGNAL ---
      // Only notify the recipient
      if(toToken) {
        await sendPushNotification(toToken, "💗 Someone sent you a Heart Signal!");
      }
    }

    res.status(200).json({ message: 'Signal sent', isMatch });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getReceivedSignals = async (req, res) => {
  try {
    const { userId } = req.params;
    const snapshot = await db.collection('signals').where('toUserId', '==', userId).get();
    const signals = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ signals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendSignal, getReceivedSignals };