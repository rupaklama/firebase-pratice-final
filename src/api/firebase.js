import firebase from 'firebase/app';

// to connect to firestore database
import 'firebase/firestore';

// need to import auth library from firebase for authentication
import 'firebase/auth';

// to store files
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyC8_apxJoAx6YzmTyv3pKlGCbH1KrsxLqo',
  authDomain: 'test-app-basic-final.firebaseapp.com',
  projectId: 'test-app-basic-final',
  storageBucket: 'test-app-basic-final.appspot.com',
  messagingSenderId: '160860471376',
  appId: '1:160860471376:web:790afaddf6af38536f9155',
  measurementId: 'G-ZXELLW3T1N',
};

// initialize firebase configuration in our app
firebase.initializeApp(config);

// initialize firebase authentication
firebase.auth();

// server timestamp to add in any documents
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// initialize firestore database
const db = firebase.firestore();

// initialize firebase storage
export const storage = firebase.storage();
// to create storage reference object like with collection/document using ref() method
// since there's no default reference object for storage
export const storageRef = storage.ref();
// Reference Object to store images
// child method is to create a relative file path from this reference
export const usersRef = storageRef.child('images/users/');

// NOTE- We get the snapshotObject from the referenceObject using
// the .get() method. ie. documentRef.get() or collectionRef.get()

// documentRef returns a single document object
// collectionRef returns all the document objects

// collectionRef object
export const carsCollection = db.collection('cars');

// user collection
export const usersCollection = db.collection('users');

// documentRef object
export const siteDocumentRef = db.doc('site/business'); // collection/document

// We can get all the documents in the Collection by calling the .docs property.
// It returns an array of our documents as documentSnapshot objects.
// '.docs property' is same as Collection Reference object
export const empoyeeRef = db
  .collection('site')
  .doc('employees')
  .collection('admins');

// to query Specific Collection with firestore collection methods
// .get() - to access particular document inside of a single collection using promise
// In the world of firebase, when you bring something back from the firestore-db, these are call - snapshots
// Snapshot is a collection of different kind of data information for a
// particular collection/document that we get from firebase.

// We get the snapshotObject from the referenceObject using
// the .get() method. ie. documentRef.get() or collectionRef.get()
db.collection('cars')
  .get()
  .then(snapshot => {
    console.log(snapshot);
    // Within each snapshot, comes with default forEach() - Not js function
    // forEach just works like regular forEach to access array of objects in docs property of snapshot
    snapshot.forEach(doc => {
      // document snapshot has a method call - data()
      // data method gives us human readable data but
      // not id since it's not part of an object, however, there's methods for it
      // console.log(doc.id);
      // console.log(doc.data());
    });
  })
  .catch(err => console.log(err));

// to use firebase in other parts of our app
export default firebase;
