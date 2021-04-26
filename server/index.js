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


app.get( '/Vendor_login', async (req,res) => {
    try{
        const contact = req.query.contact;
        // console.log(contact);
        // console.log(typeof(contact))

        const password = await pool.query('SELECT password FROM vendor WHERE contact = $1', [contact]);
        res.json(password.rows[0]);
        console.log(password.rows[0]);
    }
    catch(err){
        console.error(err.message);
    }
})

//Api to get consumer's password from database
app.get( '/Consumer_login', async (req,res) => {
    try{
        const contact = req.query.contact;
        // console.log(contact);
        // console.log(typeof(contact))
  
        const password = await pool.query('SELECT password FROM consumer WHERE contact = $1', [contact]);
        res.json(password.rows[0]);   
        console.log(password.rows[0]);        
    }
    catch(err){
        console.error(err.message);
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

// app.get( '/Account_details/Udhaari_rec', async(req,res) => {
//     try{
//         const vRMN = req.query.vRMN;
//         const cRMN = req.query.cRMN;
//         const udhaari_data = await pool.query('SELECT consumer.name, consumer.contact, threshold, start_date, due_date, balance, payed_amount, remaining_amount, billing_start_date FROM vendor_consumer natural join payment_history natural join consumer WHERE consumer.contact=vendor_consumer.consumer_contact and consumer.contact=payment_history.consumer_contact and (consumer.contact=$1 and vendor_consumer.vendor_contact=$2) ' , [cRMN,vRMN]); 
//         res.json(udhaari_data.rows[0]);
//         console.log(udhaari_data);
//     }
//     catch(err){
//         console.log(err.message);
//     }
// })


app.get('/Account_details/:vRMN/:cRMN', async (req, res) =>{
    try{
        // console.log('HIE');
        const {vRMN} = req.params;
        const {cRMN} = req.params;
        console.log(vRMN)
        console.log(cRMN)
        const result = await pool.query('SELECT consumer_name, address, consumer.contact, threshold, start_date, due_date, balance, billing_start_date FROM vendor_consumer natural join consumer WHERE consumer.contact=vendor_consumer.consumer_contact and (consumer.contact=$1 and vendor_consumer.vendor_contact=$2)',
        [cRMN,vRMN]);
        // console.log(result.rows[0]);
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

//Add new consumer's udhaari

app.get('/contact', async(req,res) => {
    try{
        console.log(req.body);
        const allcontact = await pool.query('SELECT name,contact,address from consumer');
        console.log(allcontact.rows[1].contact);
        res.json(allcontact.rows);
    }
    catch(err) {
        console.log(err.message);
    }
})


app.post('/Add_consumer', async(req,res) => {
    try{
        console.log(req.body);
        const {vendor_contact , consumer_contact , threshold , start_date , due_date , balance , billing_start_date , consumer_name} = req.body;
        q1=await pool.query('Select start_date from vendor_consumer where vendor_contact=$1 and consumer_contact=$2',
        [vendor_contact , consumer_contact ]);
        console.log('condition chk-',q1.rows)
        if(q1.rows.length==0){
            pool.query('INSERT INTO vendor_consumer (vendor_contact , consumer_contact , threshold , start_date , due_date , balance , billing_start_date , consumer_name) VALUES ($1, $2, $3, $4, $5 ,$6 , $7 , $8) RETURNING *', 
            [vendor_contact , consumer_contact , threshold , start_date , due_date , balance , billing_start_date , consumer_name]);
            res.json({
                success : true,
                message : 'Consumer Added Successfully', 
            });
            console.log(res.data)
        }
        else{
            console.log("e");
            res.json({
                success : false,
                message : 'Consumer Already Exists', 
            });
        }
    }
    catch(err) {
        console.log(err.message);
    }
})




//Api for vendor to get consumer's account details for "Udhaari records display"
//consumername contact thresh lastpaidamt startdate duedate totaldueamt partialdueamt
app.get( '/Account_details/Udhaari_rec', async(req,res) => {
    try{
        const vRMN = req.query.vRMN;
        const cRMN = req.query.cRMN;
        const udhaari_data = await pool.query('SELECT  start_date FROM vendor_consumer WHERE (consumer_contact=$1 and vendor_contact=$2) ' , [cRMN,vRMN]); 
        res.json(udhaari_data.rows[0]);
        console.log(udhaari_data.rows[0]);
    }
    catch(err){
        console.log(err.message);
    }
})





//Api to get vendor's payment history
//transid date totamt amountpaid remainingamt
app.get( '/Payment_history', async(req,res) => {
    try{
        const vRMN = req.query.vRMN;
        const cRMN = req.query.cRMN;
        const transactions = await pool.query('SELECT id, transaction_date, total_amount, payed_amount, remaining_amount FROM payment_history WHERE ( vendor_contact= $1 and consumer_contact= $2) order by transaction_date desc' , [vRMN, cRMN]); 
        res.json(transactions.rows);
        console.log(transactions.rows)
    }
    catch(err){
        console.log(err.message);
    }
})



//Api to get vendor's purchase history
//due date, paid on       ,       carried amount, total amount
//date, time, product_name, product_id, quantity, base_price, total_price
app.get('/Purchase_history', async(req,res) => {
    try {
        const vRMN = req.query.vRMN;
        const cRMN = req.query.cRMN;
        const purchase_rec = await pool.query('SELECT product_id, name, quantity, base_price, date_purchase, time_purchase, total_price FROM consumer_product_vendor, product where product.id=consumer_product_vendor.product_id and vendor_contact=$1 and consumer_contact=$2 order by date_purchase desc;' , [vRMN,cRMN]);
        res.json(purchase_rec.rows)
        console.log(purchase_rec.rows)
    } catch (err) {
        console.log(err.message);        
    }
})



// Make payment 
app.get('/Make_payment', async(req,res) => {
    try{

        // const {vRMN} = req.params;
        // const {cRMN} = req.params;
        console.log(req.body);
        const allpayment = await pool.query('SELECT total_amount from payment_history where consumer_contact = 12 and vendor_contact = 1');
        res.json(allpayment.rows);
    }
    catch(err) {
        console.log(err.message);
    }
})

app.get('/threshold', async(req,res) => {
    try{
        // const {vRMN} = req.params;
        // const {cRMN} = req.params;
        console.log(req.body);
        const allthreshold = await pool.query('SELECT threshold from vendor_consumer where consumer_contact = 12 and vendor_contact = 1');
        res.json(allthreshold.rows);
    }
    catch(err) {
        console.log(err.message);
    }
})
app.put("/changedata" , async(req,res) => {
    try {
            console.log(req.body);
            const {payed_amount,remaining_amount,transaction_date} = req.body;
            console.log(req.body);
            const updatedata = await pool.query("UPDATE payment_history SET payed_amount = $1 , remaining_amount = $2, transaction_date = $3 where consumer_contact = 14 AND vendor_contact =1  AND total_amount = 9000",
            [payed_amount,remaining_amount,transaction_date]);
            res.json("Data Updated Successfully.....");


    } catch (err) {
        console.error(err.message);

    }
});


app.listen(port, ()=>{

    console.log("Server started on port : "+port);
});