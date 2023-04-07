import './App.css';
import { initializeApp } from "firebase/app";
import { getFirebaseConfig } from './firebase-config';
import Login from './modules/Login';

function App() {

  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
        <Login />
    </div>
  );
}

export default App;
