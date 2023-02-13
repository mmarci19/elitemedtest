import express from 'express'; //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
//import path from 'path';
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const port = 8000;                  //Save the port number where your server will be listening
import utf8 from 'utf8';

// first configure the logger provider
//const kafkaLogging = require('kafka-node/logging');
//kafkaLogging.setLoggerProvider(consoleLoggerProvider);
// then require kafka-node and continue as normal
//var kafka = require('kafka-node');
//var HighLevelConsumer = kafka.Consumer;
//var KeyedMessage = kafka.KeyedMessage;

import { Auth } from 'aws-amplify';
var __dirname = "/frontend/"
async function signUp() {
    try {
        const { user } = await Auth.signUp({
            username: "szalay",
            password: "mark",
            attributes: {
                email: "molnar@marton.hu",          // optional
                phone_number: "030404213",   // optional - E.164 number convention
                // other custom attributes 
            },
            autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: true,
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

signUp()

app.set('view engine', 'pug');

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});


import fs from 'fs';

console.log('Hello');



app.get('/',function(req,res){
    data = fs.readFile('/');
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
})

import cors  from 'cors';
app.use(cors({credentials: true, origin: true}));

app.get('/sample', function(req,res){
var coordsR = [
		    { x: x_array, y: y_array, image: image_raw, colors: team_array}
		    
		  ];

// Since the request is for a JSON representation of the people, we
//  should JSON serialize them. The built-in JSON.stringify() function
//  does that.
var coordsJSON = JSON.stringify(coordsR);

// Now, we can use the response object's send method to push that string
//  of people JSON back to the browser in response to this request:
	console.log(x_array);
	console.log(y_array);
	console.log(team_array);
	
	
    res.send(coordsJSON); 

})


app.get('/matches', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('matches.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});


app.get('/pitch-selector', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('pitch-selector.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});





app.get('/recording', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('recording.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});



app.get('/settings', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('settings.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});
