// firebaseConfig.js
const { initializeApp } = require('firebase/app');

const firebaseConfig = {
    apiKey: "AIzaSyAYTFz8ailFTyb1Pe3ZsXNPCEbuWBAv7CQ",
    authDomain: "website-portfolio-react.firebaseapp.com",
    projectId: "website-portfolio-react",
    storageBucket: "website-portfolio-react.appspot.com",
    messagingSenderId: "159492465131",
    appId: "1:159492465131:web:90afda47364dc5eabe79ae",
    measurementId: "G-D2D5HM1T6J"
};

const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp; // Use module.exports instead of export default