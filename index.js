//Express Server initialization
const express = require('express');
const app = express();
const port = 5000;

//CORS def
const cors = require('cors');
app.use(cors());

//Firebase Admin SDK initalization
const admin = require('firebase-admin');
const testServiceAccount = require('./private/admin-sdk-test-2e7ea-firebase-adminsdk-2moxv-e28dae166a.json');
const serviceAccount = require('./private/overtime-management-83008-firebase-adminsdk-q8kc2-1956d61a57.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://demoproject-7cc0d.firebaseio.com"
});


let uid = 'bsBHT1Hkn3T65E84J6mdGUMPcRV2'
let email = 'stacieharwood@test.com'

app.get('/', (req, res) => {
    
    admin.auth()
    // .getUserByEmail(email)
    .getUser(uid)
    .then((userRecord) => {
        res.send(
        // See the UserRecord reference doc for the contents of userRecord.
        userRecord
        )
    })
    .catch((error) => {
        res.send(
            // See the UserRecord reference doc for the contents of userRecord.
            error
        ) 
    });
})

app.post('/CREATE-USER', (req, res) => {
    admin.auth()
    .createUser({
        email: 'user@example.com',
        emailVerified: false,
        phoneNumber: '+11234567890',
        password: 'secretPassword',
        displayName: 'John Doe',
        photoURL: 'http://www.example.com/12345678/photo.png',
        disabled: false,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        res.send(`Successfully created new user: ${userRecord.uid}`);
      })
      .catch((error) => {
        res.send(`Error creating new user: ${error}`);
      });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

