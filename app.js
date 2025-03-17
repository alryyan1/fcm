const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const express = require('express')
const cors = require('cors')

const app = express();
const port = 8000;
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
    console.log(payload,'payload')
    const message = {
        notification: {
          
          title: payload.title,
          body: `${payload.description}`,
        },
        data:{
          id:payload.id.toString(),
        },
        topic: "news", // Replace token with topic

        
    // or use 'topic' for topic messages
      };
        console.log(req.body,'payload')
        
        admin.messaging().send(message)

        .then((response) => {
          console.log('Successfully sent message:', response);
          res.status(200).json({message:'Notification sent successfully'})
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
      
    })

    app.listen(port,()=>{
        console.log(`Server running on port ${port}`)
    })


    