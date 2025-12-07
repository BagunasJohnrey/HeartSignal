const admin = require('firebase-admin');
const db = admin.firestore();
const { getDistance } = require('../utils/distance');

const updateLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
    await db.collection('users').doc(userId).set({
      latitude,
      longitude,
      updatedAt: new Date()
    }, { merge: true });

    res.status(200).json({ message: 'Location updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNearbyUsers = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const usersSnapshot = await db.collection('users').get();
    const nearbyUsers = [];

    usersSnapshot.forEach(doc => {
      const data = doc.data();
      const distance = getDistance(latitude, longitude, data.latitude, data.longitude);
      if(distance <= 1) { // 1km radius
        nearbyUsers.push({ userId: doc.id, avatarId: data.avatarId, distance });
      }
    });

    res.status(200).json({ nearbyUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { updateLocation, getNearbyUsers };
