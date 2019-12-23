import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import firebaseConfig from '../firebaseConfig.json';

const FirebaseContext = React.createContext(null);

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }

  sendPasswordResetEmail = async email => {
    await this.auth.sendPasswordResetEmail(email);
  };

  checkSignedIn = callback => {
    const unsubscriber = this.auth.onAuthStateChanged(user => {
      const val = user !== null ? true : false;
      callback(val);
    });
    return unsubscriber;
  };

  signIn = async (email, password) => {
    await this.auth.signInWithEmailAndPassword(email, password);
  };

  createAccount = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  signInAnonymously = async () => {
    await this.auth.signInAnonymously();
  };

  signOut = async () => {
    await this.auth.signOut();
  };

  updateAttendance = async val => {
    const uid = this.auth.currentUser.uid;
    const ref = this.firestore
      .collection('years')
      .doc('2020')
      .collection('applications')
      .where('uid', '==', uid);
    const docs = await ref.get();
    let id = null;
    docs.forEach(doc => {
      id = doc.id;
    });
    const ref2 = this.firestore
      .collection('years')
      .doc('2020')
      .collection('applications')
      .doc(id);
    await ref2.update({confirmedAttendance: val});
  };

  getDashboardData = callback => {
    const uid = this.auth.currentUser.uid;
    const ref = this.firestore
      .collection('years')
      .doc('2020')
      .collection('applications')
      .where('uid', '==', uid);
    const unsubscriber = ref.onSnapshot(snap => {
      console.log('Data updated!');
      let retData = {};
      snap.docs.forEach(doc => {
        const data = doc.data();
        const {firstName, lastName, email, accepted, checkinCode} = data;
        const status = accepted === true ? 'Accepted' : 'Pending';
        const name = firstName + ' ' + lastName;
        const fi = firstName.substr(0, 1);
        const li = lastName.substr(0, 1);
        const initials = fi + li;
        retData = {
          initials: initials,
          name: name,
          email: email,
          status: status,
          code: checkinCode,
          confirmed: data.confirmedAttendance ? true : false
        };
      });
      callback(retData);
    });
    return unsubscriber;
  };
}

const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default Firebase;

export {FirebaseContext, withFirebase};
