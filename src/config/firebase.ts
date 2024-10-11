// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBsV19kvGLTWUAB7QDmihQh7iK94MleweE",
	authDomain: "muthmir-30144.firebaseapp.com",
	projectId: "muthmir-30144",
	storageBucket: "muthmir-30144.appspot.com",
	messagingSenderId: "223012362944",
	appId: "1:223012362944:web:69df7eb5781a05d68ceb25",
	measurementId: "G-7NNBPRZZNG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
