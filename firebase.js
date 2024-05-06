// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYTFz8ailFTyb1Pe3ZsXNPCEbuWBAv7CQ",
  authDomain: "website-portfolio-react.firebaseapp.com",
  projectId: "website-portfolio-react",
  storageBucket: "website-portfolio-react.appspot.com",
  messagingSenderId: "159492465131",
  appId: "1:159492465131:web:90afda47364dc5eabe79ae",
  measurementId: "G-D2D5HM1T6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };