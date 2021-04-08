const express= require("express");
const app = express();
const port = 5000;
const cors = require('cors');
const pool = require('./database/db');

//middleware
app.use(cors());
app.use(express.json());

app.post('/Vendor_register', async(req,res) => {
    try{
        const {contact, name, shop_name, shop_address, password} = req.body;
        pool.query('INSERT INTO vendor (contact, name, shop_name, shop_address, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [contact, name, shop_name, shop_address, password],(err)=>{
            if(err){   
                res.json({
                        success : false,
                        message : 'Contact Number Already Registered', 
                });
            }
            else{
                res.json({
                    success : true,
                    message : 'Registration Successful', 
                });
            }
        });     
    }
    catch(err) {
        console.log(err.message);        
    }
})


app.post('/Consumer_register', async(req,res) => {
    try{
        // console.log(req.body);
        const {contact, name, address, password} = req.body;
        pool.query('INSERT INTO consumer (contact, name, address, password) VALUES ($1, $2, $3, $4) RETURNING *', 
        [contact, name, address, password], (err)=>{
            if(err){   
                res.json({
                        success : false,
                        message : 'Contact Number Already Registered', 
                });
            }
            else{
                res.json({
                    success : true,
                    message : 'Registration Successful', 
                });
            }
        });     
    }
    catch(err) {
        console.log(err.message);        
    }
})
        


app.listen(port, ()=>{

    console.log("Server started on port : "+port);
});