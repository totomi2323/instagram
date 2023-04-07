import './App.css';
import {initalizeApp} from "firebase/app"
import { getFirebaseConfig } from './firebase-config';

function App() {

  const firebaseConfig = getFirebaseConfig();
  const app = initalizeApp(firebaseConfig);

  return (
    <div className="App">
    </div>
  );
}

export default App;
