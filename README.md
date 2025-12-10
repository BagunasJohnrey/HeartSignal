# HeartSignal

HeartSignal is a location-based mobile app inspired by unspoken feelings and quiet connections. It allows users to anonymously send a “heart signal” to someone nearby, expressing interest without direct messaging or identity reveal. Using real-time location awareness, the app shows nearby users as icons on a radar-style map, where a single tap can send a signal that triggers a notification on the recipient’s device. Identity remains hidden unless signals are matched, encouraging sincerity, curiosity, and emotional safety.

HeartSignal is a cross-platform mobile application built with **React Native** and **Expo**, supported by a **Node.js/Express** backend with **Firebase** integration. 

## 📱 Tech Stack

### Frontend (Mobile App)
* **Framework:** React Native (via Expo SDK 54)
* **Language:** TypeScript / JavaScript
* **Styling:** NativeWind (Tailwind CSS)
* **Navigation:** React Navigation v7 (Native Stack)
* **Fonts:** Expo Google Fonts (Inter)
* **Key Features:**
    * Google Sign-In (`@react-native-google-signin/google-signin`)
    * Push Notifications (`expo-notifications`)
    * Location Services (`expo-location`)
    * Haptics (`expo-haptics`)

### Backend (API)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database/Auth:** Firebase Admin SDK
* **Utilities:** CORS, Dotenv

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (LTS version recommended)
* [Expo Go](https://expo.dev/client) app on your physical device or an Android/iOS emulator.
* A **Firebase Project** with a service account key.

---

## 🚀 Getting Started

### 1. Backend Setup

The backend handles user data and signal processing using Firebase.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Firebase:**
    * Download your Firebase service account key JSON file from the Firebase Console.
    * Rename it to `firebase-service.json` and place it in the `backend/` root directory.

4.  **Environment Variables:**
    * Create a `.env` file in the `backend/` folder.
    * Add your configuration (e.g., port):
        ```env
        PORT=5000
        ```

5.  **Start the Server:**
    ```bash
    node server.js
    ```
    * The server will run on `http://localhost:5000` (or your defined port).

### 2. Mobile App Setup

The frontend is an Expo managed project.

1.  **Navigate to the project root:**
    ```bash
    cd ..
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    * *Note: If you encounter version mismatches, run `npx expo install --fix`.*

3.  **Configure Firebase & Google Sign-In:**
    * Place your `google-services.json` file (for Android) in the project root.
    * Ensure your `app.json` is correctly configured with your package name (`com.yourname.heartsignal`).

4.  **Start the App:**
    ```bash
    npx expo start
    ```

5.  **Run on Device:**
    * Scan the QR code with the **Expo Go** app (Android) or Camera app (iOS).
    * Press `a` to open in Android Emulator or `i` for iOS Simulator.

---

## 📂 Project Structure

```text
HeartSignal/
├── App.tsx                 # Main entry point & Navigation setup
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── package.json            # Frontend dependencies
├── global.css              # Global styles (Tailwind imports)
├── google-services.json    # Android Firebase config (required)
├── hooks/
│   └── usePushNotifications.ts  # Push notification logic
├── screens/                # App Screens
│   ├── Index.tsx
│   ├── UsernameSetup.tsx
│   ├── Home.tsx
│   ├── Settings.tsx
│   └── Notifications.tsx
└── backend/                # Backend Server
    ├── server.js           # Express server entry point
    ├── firebase-service.json # Firebase Admin credentials (DO NOT COMMIT)
    ├── package.json        # Backend dependencies
    └── routes/             # API Routes
        ├── users.js
        └── signals.js
