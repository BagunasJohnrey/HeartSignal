const admin = require('firebase-admin');
const db = admin.firestore();
const { sendPushNotification } = require('../utils/pushNotifications');

const sendSignal = async (req, res) => {
  try {
    const { fromUserId, toUserId } = req.body;
    const signalRef = db.collection('signals').doc();
    await signalRef.set({
      fromUserId,
      toUserId,
      timestamp: new Date()
    });

    // Get recipient FCM token
    const userDoc = await db.collection('users').doc(toUserId).get();
    const fcmToken = userDoc.data().fcmToken;

    if(fcmToken) {
      await sendPushNotification(fcmToken, "💗 Someone sent you a Heart Signal!");
    }

    res.status(200).json({ message: 'Signal sent' });
  } catch (err) {
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
