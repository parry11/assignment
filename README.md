# assignment

To run the project locally, run following commands

1. npm install
2. npm run dev

Before running above commands, add a file named "firestore.js" under folder src/config

Add following content in file "firestore.js"

```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "**********",
  authDomain: "**********",
  databaseURL: "**********",
  projectId: "**************",
  storageBucket: "************",
  messagingSenderId: "**********",
  appId: "****************",
  measurementId: "************",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
```

