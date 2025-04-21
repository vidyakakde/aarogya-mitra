import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA1dJx9rlTL8nRRgDSfsLRUGi2dErVsiq0",
    authDomain: "chefront-dev.firebaseapp.com",
    projectId: "chefront-dev",
    storageBucket: "chefront-dev.firebasestorage.app",
    messagingSenderId: "391672380323",
    appId: "1:391672380323:web:3e0d0a2a188518f36ef816"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

// auth.settings.appVerificationDisabledForTesting = true;

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
