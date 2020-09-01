import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyC9Dt_xAKv7ZNgWIulOTrCWuLULYsfOkss',
  authDomain: 'webgurusbevasarlolista.firebaseapp.com',
  databaseURL: 'https://webgurusbevasarlolista.firebaseio.com',
  projectId: 'webgurusbevasarlolista',
  storageBucket: 'webgurusbevasarlolista.appspot.com',
  messagingSenderId: '396339081861',
  appId: '1:396339081861:web:4f05f8bd2631e88d322fec'
}
export const db = firebase.initializeApp(firebaseConfig).firestore();

export default db
