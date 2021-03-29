import FirebaseKeys from "./config";
import Firebase from "firebase";
require("firebase/firestore");

class BookController {
    constructor () {
        if (!Firebase.apps.length) {
            Firebase.initializeApp(FirebaseKeys);
        }
    }

    public async getBook (bookId : number) {
        return await Firebase.firestore().collection("books").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }
}

export default BookController;