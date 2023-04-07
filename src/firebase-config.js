const config = {
    apiKey: "AIzaSyAeHrofXx3R565bQiq3wTcGzIwbMaWqqHQ",
    authDomain: "instagram-913e8.firebaseapp.com",
    projectId: "instagram-913e8",
    storageBucket: "instagram-913e8.appspot.com",
    messagingSenderId: "304026376163",
    appId: "1:304026376163:web:b01e352a08c7e563ebb2d6"
  };
  export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return config;
    }
  }
  