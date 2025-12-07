const admin = require('firebase-admin');

async function sendPushNotification(token, message) {
  const payload = {
    notification: {
      title: "HeartSignal",
      body: message
    }
  };
  try {
    await admin.messaging().sendToDevice(token, payload);
    console.log("Notification sent!");
  } catch (err) {
    console.error("Error sending notification:", err);
  }
}

module.exports = { sendPushNotification };
