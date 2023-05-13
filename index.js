const express = require('express'); // Import the express module

const port = 5000; // Set the port for the server
const path = require("path"); // Import the path module for working with file paths
//const ejs = require('ejs'); // Import the ejs module for rendering EJS templates

 
// // HEAR we add config folder


const db = require('./config/mongoose');
const Contact = require('./models/contact');

 
const app = express(); // Create an instance of express

 


// // add another approch is 
// const mongoose = require('mongoose')

// const url = 'mongodb://127.0.0.1:27017/AlienDB' 

// const app = express()

// mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
// const con = mongoose.connection

// con.on('open', () => {
//     console.log('connected...')
// })

// // con.on('error',()=>{
// //     console.log("Error in connecting to the database");
// // })

// app.use(express.json())

// const alienRouter = require('./routes/aliens')
// app.use('/aliens',alienRouter)

// // 127.0.0.1:9000/aliens/about




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: "marvel",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "iron man",
        phone: "12131321321"
    }
]

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


//Fetching Data from DB
app.get('/', function(req, res){


    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "Contact List",
            contact_list: contacts
        });

    })
  
})
// this is post method means where i push/save my data 
//Populating the DB
app.post('/create-contact', function(req, res){
    
    // contactList.push(req.body);
    
    //from schema
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});


// this is the common part
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})

// this is for delate  fun 
//Deleting From DB

app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});
