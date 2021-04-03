import Firebase from "firebase/app";
import 'firebase/firestore'; 
import 'firebase/storage'; 
require("firebase/firestore");
require("firebase/storage");

const firebaseApp = Firebase.initializeApp({
  apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL : process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  appId : process.env.REACT_APP_FIREBASE_APP_ID
});

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export { db, storage };
