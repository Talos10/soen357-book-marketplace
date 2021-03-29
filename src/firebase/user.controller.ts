import FirebaseKeys from "./config";
import Firebase from "firebase";
require("firebase/firestore");

class UserController {
    constructor () {
        if (!Firebase.apps.length) {
            Firebase.initializeApp(FirebaseKeys);
        }
    }
}

export default UserController;