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
        await pool.query('INSERT INTO vendor (contact, name, shop_name, shop_address, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
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
        await pool.query('INSERT INTO consumer (contact, name, address, password) VALUES ($1, $2, $3, $4) RETURNING *', 
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


app.get('/Vendor_dashboard/:vRMN', async(req,res) => {
    try{
        var {vRMN} = req.params;
        const allconsumer = await pool.query('SELECT consumer_contact,consumer_name from  vendor_consumer where vendor_contact = $1',
        [vRMN]);
        console.log(allconsumer.rows);
        res.json(allconsumer.rows);
        //console.log(err);
    }
    catch(err) {
        console.log(err.message);
    }
})


app.get('/Consumer_dashboard/:cRMN', async(req,res) => {
    try{
        var {cRMN} = req.params;
        const allvendor = await pool.query('select name,contact from vendor, vendor_consumer where vendor_consumer.vendor_contact=vendor.contact and vendor_consumer.consumer_contact=$1',
        [cRMN]);
        console.log(allvendor.rows);
        res.json(allvendor.rows);
        //console.log(err);
    }
    catch(err) {
        console.log(err.message);
    }
})


app.get('/Account_details/:vRMN/:cRMN', async (req, res) =>{
    try{
        console.log('HIE');
        const {vRMN} = req.params;
        const {cRMN} = req.params;
        console.log(vRMN)
        console.log(cRMN)
        const result = await pool.query('select consumer_name,threshold,start_date,due_date,billing_start_date, balance,payed_amount from vendor_consumer, payment_history where vendor_consumer.billing_start_date=payment_history.transaction_date and vendor_consumer.consumer_contact=$1 and vendor_consumer.vendor_contact=$2',
        [cRMN,vRMN]);
        console.log(result.rows);
        res.json(result.rows);
    }
    catch(err){
        console.error(err.message);
    }
})


app.put('/Account_details/:vRMN/:cRMN', async (req, res) =>{
    try{
        const {vRMN} = req.params;
        const {cRMN} = req.params;
        const {updatingValue} = req.body;
        // console.log(updatingValue);
        // console.log(due_date);
        // console.log(cRMN);
        // console.log(typeof(updatingValue));
        if(isNaN(updatingValue)){
            await pool.query('UPDATE vendor_consumer SET consumer_name = $1 WHERE vendor_contact = $2 and consumer_contact = $3',
            [updatingValue,vRMN,cRMN],(err)=>{
                if(err){   
                    res.json({
                        success : false,
                        message : 'Oops Something went wrong, could not save the changes', 
                    });
                }
                else{
                    res.json({
                        success : true,
                        message : 'Name Changed Successfully', 
                    });
                }
            });
        }      
        else{
            await pool.query('UPDATE vendor_consumer SET threshold = $1 WHERE vendor_contact = $2 and consumer_contact = $3',
            [updatingValue, vRMN,cRMN],(err)=>{
                if(err){   
                    res.json({
                        success : false,
                        message : 'Oops Something went wrong, could not save the changes', 
                    });
                }
                else{
                    res.json({
                        success : true,
                        message : 'Threshold Changed Successfully', 
                    });
                }
            });
        } 
    }
    catch(err){
        console.log(err);
    }
})


app.delete( '/Account_details/:vRMN/:cRMN', async(req,res) => {
    try{
        const  {vRMN}  = req.params;
        const {cRMN}  = req.params;
        // console.log(req.params);
        // console.log("@VENDOR"+vRMN)
        // console.log("@COsumer"+cRMN)
        await pool.query('DELETE FROM vendor_consumer WHERE vendor_contact = $1 and consumer_contact=$2' , [vRMN, cRMN],(err)=>{
            if(err){   
                res.json({
                    success : false,
                    message : 'Oops Something went wrong, could not delete the account', 
                });
            }
            else{
                res.json({
                    success : true,
                    message : 'Account Deleted Successfully', 
                });
            }
        })
    }
    catch(err){
        console.log(err.message);
    }
})


app.listen(port, ()=>{

    console.log("Server started on port : "+port);
});