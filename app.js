const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const express = require('express')
const cors = require('cors')

const app = express();
const port = 3000;
app.use(cors())
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json())

console.log("Firebase Admin SDK initialized successfully!");


  
  app.get('/', function (req, res) {
    res.send('<H1>NOTIFCATIONS CENTER WORKING FINE</H1>')
  });
 
  app.get('/msg', function (req, res) {
    res.send('<H1>NOTIFCATIONS CENTER WORKING FINE</H1>')
  });

    app.post('/msg', (req, res) => {
    const payload =  req.body;
    const message = {
        notification: {
          title: 'اذن الصرف',
          body: `${payload.description}  (${payload.amount})`,
        },
        token: "dvel-fgVRFKPQ0dRea-BGs:APA91bGjevTiuypqIX9sHGNSCFKjTB60kgE1aAKNRUZzJ6UJLXvVIxxsrhcGa3V4xfvUbCHX1X0GBTeXBhC_Kx8BnllCG5-kxbq-gmp_F2TYgDS7KubMOsg"
    , // or use 'topic' for topic messages
      };
        console.log(req.body,'payload')
        admin.messaging().send(message)
        .then((response) => {
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
      
    })

    app.listen(port,()=>{
        console.log(`Server running on port ${port}`)
    })


    