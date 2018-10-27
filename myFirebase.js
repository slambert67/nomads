  // Initialize Firebase
  /*var config = {
    apiKey: "AIzaSyDxgEiXAJEvXAA4CDsF1yXlQaIczU3skgo",
    authDomain: "nomads-d85b5.firebaseapp.com",
    databaseURL: "https://nomads-d85b5.firebaseio.com",
    projectId: "nomads-d85b5",
    storageBucket: "",
    messagingSenderId: "608271983758"
  };
  firebase.initializeApp(config);*/

firebase.initializeApp({
    apiKey: 'AIzaSyDxgEiXAJEvXAA4CDsF1yXlQaIczU3skgo',
    authDomain: 'nomads-d85b5.firebaseapp.com',
    projectId: 'nomads-d85b5'
});

// Initialize Cloud Firestore through Firebase
var fdb = firebase.firestore();

// Disable deprecated features
fdb.settings({
    timestampsInSnapshots: true
});

