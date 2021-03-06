const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require("path");
const pool = require('./db');

// console.log(process.env.PORT)
//middleware
app.use(cors());
app.use(express.json());

// if (process.env.NODE_ENV === "production") {
//     //server static content
//     //npm run build
//     app.use(express.static(path.join(__dirname, "client")));
// }

// console.log(__dirname);
// console.log(path.join(__dirname, "client"));

app.get('/test', function (req, res) {
    res.status(200).json({ message: 'yepp Tango...' });
});

app.post('/Vendor_register', async (req, res) => {
    try {
        const { contact, name, shop_name, shop_address, password } = req.body;
        q1 = await pool.query('Select name from vendor where contact=$1',
            [contact]);
        // console.log('condition chk-',q1.rows)
        if (q1.rows.length == 0) {
            pool.query('INSERT INTO vendor (contact, name, shop_name, shop_address, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [contact, name, shop_name, shop_address, password]);
            res.json({
                success: true,
                message: 'Registration Successful',
            });
        }
        else {
            res.json({
                success: false,
                message: 'Contact Number Already Exists',
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
})


app.get('/Vendor_login', async (req, res) => {
    try {
        const contact = req.query.contact;
        // console.log(contact);
        // console.log(typeof(contact))

        const password = await pool.query('SELECT password FROM vendor WHERE contact = $1', [contact]);
        res.json(password.rows[0]);
        // res.status(200).json({ message: password.rows });
        // console.log(password.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
})

//Api to get consumer's password from database
app.get('/Consumer_login', async (req, res) => {
    try {
        const contact = req.query.contact;
        // console.log(contact);
        // console.log(typeof(contact))

        const password = await pool.query('SELECT password FROM consumer WHERE contact = $1', [contact]);
        res.json(password.rows[0]);
        // console.log(password.rows[0]);        
    }
    catch (err) {
        console.error(err.message);
    }
})



app.post('/Consumer_register', async (req, res) => {
    try {
        const { contact, name, address, password } = req.body;
        q1 = await pool.query('Select name from consumer where contact=$1',
            [contact]);
        // console.log('condition chk-',q1.rows)
        if (q1.rows.length == 0) {
            pool.query('INSERT INTO consumer (contact, name, address, password) VALUES ($1, $2, $3, $4) RETURNING *',
                [contact, name, address, password]);
            res.json({
                success: true,
                message: 'Registration Successful',
            });
        }
        else {
            console.log("e");
            res.json({
                success: false,
                message: 'Contact Number Already Exists',
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
})


app.get('/Vendor_dashboard/:vRMN', async (req, res) => {
    try {
        var { vRMN } = req.params;
        const allconsumer = await pool.query('SELECT consumer_contact,consumer_name, balance, due_date from  vendor_consumer where vendor_contact = $1 order by consumer_name',
            [vRMN]);
        // console.log(allconsumer.rows);
        res.json(allconsumer.rows);
        //console.log(err);
    }
    catch (err) {
        console.log(err.message);
    }
})


app.get('/Consumer_dashboard/:cRMN', async (req, res) => {
    try {
        var { cRMN } = req.params;
        const allvendor = await pool.query('select name,contact, balance, due_date, shop_name from vendor, vendor_consumer where vendor_consumer.vendor_contact=vendor.contact and vendor_consumer.consumer_contact=$1 order by shop_name',
            [cRMN]);
        // console.log(allvendor.rows);
        res.json(allvendor.rows);
        //console.log(err);
    }
    catch (err) {
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


app.get('/Account_details/:vRMN/:cRMN', async (req, res) => {
    try {
        // console.log('HIE');
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        // console.log(vRMN)
        // console.log(cRMN)
        const result = await pool.query('SELECT consumer_name, address, consumer.contact, threshold, start_date, due_date, balance, billing_start_date FROM vendor_consumer natural join consumer WHERE consumer.contact=vendor_consumer.consumer_contact and (consumer.contact=$1 and vendor_consumer.vendor_contact=$2)',
            [cRMN, vRMN]);
        // console.log(result.rows[0]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err.message);
    }
})
// for consumer
app.get('/My_account/:vRMN/:cRMN', async (req, res) => {
    try {
        // console.log('HIE');
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        // console.log(vRMN)
        // console.log(cRMN)
        const result = await pool.query('SELECT consumer_name, vendor.shop_address, vendor.shop_name, consumer.contact, threshold, start_date, due_date, balance, billing_start_date FROM vendor_consumer, consumer, vendor WHERE consumer.contact=vendor_consumer.consumer_contact and vendor.contact=vendor_consumer.vendor_contact and (consumer.contact=$1 and vendor_consumer.vendor_contact=$2)',
            [cRMN, vRMN]);
        // console.log(result.rows[0]);
        res.json(result.rows);
    }
    catch (err) {
        console.error(err.message);
    }
})


app.put('/Account_details/:vRMN/:cRMN', async (req, res) => {
    try {
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        const { updatingValue } = req.body;
        // console.log(updatingValue);
        // console.log(due_date);
        // console.log(cRMN);
        // console.log(typeof(updatingValue));
        if (isNaN(updatingValue)) {
            await pool.query('UPDATE vendor_consumer SET consumer_name = $1 WHERE vendor_contact = $2 and consumer_contact = $3',
                [updatingValue, vRMN, cRMN], (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Oops Something went wrong, could not save the changes',
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            message: 'Name Changed Successfully',
                        });
                    }
                });
        }
        else {
            await pool.query('UPDATE vendor_consumer SET threshold = $1 WHERE vendor_contact = $2 and consumer_contact = $3',
                [updatingValue, vRMN, cRMN], (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Oops Something went wrong, could not save the changes',
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            message: 'Threshold Changed Successfully',
                        });
                    }
                });
        }
    }
    catch (err) {
        console.log(err);
    }
})


app.delete('/Account_details/:vRMN/:cRMN', async (req, res) => {
    try {
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        // console.log(req.params);
        // console.log("@VENDOR"+vRMN)
        // console.log("@COsumer"+cRMN)
        await pool.query('DELETE FROM vendor_consumer WHERE vendor_contact = $1 and consumer_contact=$2', [vRMN, cRMN], (err) => {
            if (err) {
                res.json({
                    success: false,
                    message: 'Oops Something went wrong, could not delete the account',
                });
            }
            else {
                res.json({
                    success: true,
                    message: 'Account Deleted Successfully',
                });
            }
        })
    }
    catch (err) {
        console.log(err.message);
    }
})

//Add new consumer's udhaari

app.get('/contact', async (req, res) => {
    try {
        console.log(req.body);
        const allcontact = await pool.query('SELECT name,contact,address from consumer');
        // console.log(allcontact.rows[1].contact);
        res.json(allcontact.rows);
    }
    catch (err) {
        console.log(err.message);
    }
})


app.post('/Add_consumer', async (req, res) => {
    try {
        // console.log(req.body);
        const { vendor_contact, consumer_contact, threshold, start_date, due_date, balance, billing_start_date, consumer_name } = req.body;
        q1 = await pool.query('Select start_date from vendor_consumer where vendor_contact=$1 and consumer_contact=$2',
            [vendor_contact, consumer_contact]);
        // console.log('condition chk-',q1.rows)
        if (q1.rows.length == 0) {
            pool.query('INSERT INTO vendor_consumer (vendor_contact , consumer_contact , threshold , start_date , due_date , balance , billing_start_date , consumer_name) VALUES ($1, $2, $3, $4, $5 ,$6 , $7 , $8) RETURNING *',
                [vendor_contact, consumer_contact, threshold, start_date, due_date, balance, billing_start_date, consumer_name]);
            res.json({
                success: true,
                message: 'Consumer Added Successfully',
            });
            // console.log(res.data)
        }
        else {
            // console.log("e");
            res.json({
                success: false,
                message: 'Consumer Already Exists',
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
})


//Api to Add products by the vendor
app.post('/Add_products/transaction/:vRMN/:cRMN', async (req, res) => {
    try {
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        const { id, type, transaction_amount, transaction_date, transaction_time } = req.body;
        console.log(req.body);
        await pool.query('INSERT INTO transaction_history (id, type, transaction_amount, transaction_date, transaction_time, vendor_contact, consumer_contact) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [id, type, transaction_amount, transaction_date, transaction_time, vRMN, cRMN], (err) => {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Oops Something went wrong, Try after sometime',
                    });
                }
                else {
                    res.json({
                        success: true,
                        message: 'Transaction Stored Successfully',
                    });
                }
            })
    }
    catch (err) {
        console.log(err.message);
    }
})


app.post('/Add_products/:vRMN/:cRMN', async (req, res) => {
    try {
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        const { product_id, quantity, date_purchase, time_purchase, total_price, tr_id, total_amount } = req.body;
        console.log(req.body);
        await pool.query('INSERT INTO consumer_product_vendor (consumer_contact, vendor_contact, product_id, quantity, date_purchase, time_purchase, total_price, tr_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *',
            [cRMN, vRMN, product_id, quantity, date_purchase, time_purchase, total_price, tr_id]);
        await pool.query('UPDATE vendor_consumer SET balance = $1 WHERE vendor_contact = $2 and consumer_contact = $3',
            [total_amount, vRMN, cRMN]);
        res.json({ message: 'Success' });
    }
    catch (err) {
        console.log(err.message);
    }
})


app.get('/Add_products/product', async (req, res) => {
    try {
        // console.log(req.body);
        const allproduct = await pool.query('SELECT * from product');
        // console.log(allproduct.rows);
        res.json(allproduct.rows);
        // console.log(res.json);
    }
    catch (err) {
        console.log(err.message);
    }
})


app.get('/Add_products/total_amount/:vRMN/:cRMN', async (req, res) => {
    try {
        // console.log("TOTAL Server");
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        // console.log(req.body);
        // var vRMN = 9196191919;
        // var cRMN = 7678697696;
        const totalamount = await pool.query('SELECT balance from vendor_consumer where consumer_contact=$1 and vendor_contact=$2',
            [cRMN, vRMN]);
        if (totalamount.rows.length == 0) {
            // console.log(0);
            res.json(0);
        }
        else {
            // console.log("e");
            // console.log(totalamount.rows[0].balance);
            res.json(totalamount.rows[0].balance);
        }
    }
    catch (err) {
        console.log(err.message);
    }
})



// //Api to Add products by the vendor
// app.post( '/Add_products/:vRMN/:cRMN', async(req,res) => {
//     try{
//         const  {vRMN}  = req.params;
//         const {cRMN}  = req.params;
//         const {product_id, quantity, date_purchase, time_purchase, total_amount, total_price} = req.body;
//         // console.log(req.body);
//         await pool.query('INSERT INTO consumer_product_vendor (consumer_contact, vendor_contact, product_id, quantity, date_purchase, time_purchase, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
//         [cRMN, vRMN, product_id, quantity, date_purchase, time_purchase, total_price]);
//         await pool.query('UPDATE vendor_consumer SET balance = $1 WHERE vendor_contact = $2 and consumer_contact = $3',
//         [total_amount,vRMN,cRMN]);
//         res.json({message: 'Success'});

//     }
//     catch(err){
//         console.log(err.message);
//     }
// })



// app.get('/Add_products/product', async(req,res) => {
//     try{
//         // console.log(req.body);
//         const allproduct = await pool.query('SELECT * from product');
//         // console.log(allproduct.rows);
//         res.json(allproduct.rows);
//         // console.log(res.json);
//     }
//     catch(err) {
//         console.log(err.message);
//     }
// })


// app.get('/Add_products/total_amount/:vRMN/:cRMN', async(req,res) => {
//     try{
//         // console.log("TOTAL Server");
//         const {vRMN}  = req.params;
//         const {cRMN}  = req.params;
//         // console.log(req.body);
//         // var vRMN = 9196191919;
//         // var cRMN = 7678697696;
//         const totalamount = await pool.query('SELECT balance from vendor_consumer where consumer_contact=$1 and vendor_contact=$2',
//         [cRMN,vRMN]);
//         if(totalamount.rows.length==0){
//             // console.log(0);
//             res.json(0);          
//         }
//         else{
//             // console.log("e");
//             // console.log(totalamount.rows[0].balance);
//             res.json(totalamount.rows[0].balance);
//         }        
//     }
//     catch(err) {
//         console.log(err.message);
//     }
// })




//Api for vendor to get consumer's account details for "Udhaari records display"
//consumername contact thresh lastpaidamt startdate duedate totaldueamt partialdueamt
app.get('/Account_details/Udhaari_rec', async (req, res) => {
    try {
        const vRMN = req.query.vRMN;
        const cRMN = req.query.cRMN;
        const udhaari_data = await pool.query('SELECT  start_date, balance FROM vendor_consumer WHERE (consumer_contact=$1 and vendor_contact=$2) ', [cRMN, vRMN]);
        res.json(udhaari_data.rows[0]);
        // console.log(udhaari_data.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
})



//Api to get vendor's transaction history

app.get('/Transaction_history', async (req, res) => {
    try {
        const vRMN = req.query.vRMN;
        const cRMN = req.query.cRMN;
        const transactions = await pool.query('SELECT id, type, transaction_date, transaction_time, transaction_amount FROM transaction_history WHERE ( vendor_contact= $1 and consumer_contact= $2) order by transaction_date desc, transaction_time desc', [vRMN, cRMN]);
        res.json(transactions.rows);
        // console.log(transactions.rows)
    }
    catch (err) {
        console.log(err.message);
    }
})




//Api to get vendor's payment history
//transid date totamt amountpaid remainingamt
app.get('/Payment_history', async (req, res) => {
    try {
        const vRMN = req.query.vRMN;
        const cRMN = req.query.cRMN;
        const type = 'payment';
        const transactions = await pool.query('SELECT id, type,  transaction_amount FROM transaction_history WHERE ( vendor_contact= $1 and consumer_contact= $2 and type=$3) order by id desc', [vRMN, cRMN, type]);
        res.json(transactions.rows);
        // console.log(transactions.rows)
    }
    catch (err) {
        console.log(err.message);
    }
})



//Api to get vendor's purchase history
//due date, paid on       ,       carried amount, total amount
//date, time, product_name, product_id, quantity, base_price, total_price
app.get('/Purchase_history', async (req, res) => {
    try {
        const trID = req.query.trID;
        const purchase_rec = await pool.query('SELECT product_id, name, quantity, base_price, date_purchase, time_purchase, total_price FROM consumer_product_vendor, product where product.id=consumer_product_vendor.product_id and consumer_product_vendor.tr_id= $1', [trID]);
        res.json(purchase_rec.rows)
        // console.log(purchase_rec.rows)
    } catch (err) {
        console.log(err.message);
    }
})


//Api to get payment details of selected transaction
app.get('/Payment_details', async (req, res) => {
    try {
        const trID = req.query.trID;
        const pay = await pool.query('select transaction_history.id, transaction_history.transaction_time, transaction_history.transaction_date, payment_history.total_amount, payment_history.payed_amount, payment_history.remaining_amount from transaction_history, payment_history where transaction_history.id= payment_history.tr_id and transaction_history.id=$1', [trID]);
        res.json(pay.rows)
        // console.log(purchase_rec.rows)
    } catch (err) {
        console.log(err.message);
    }
})


//Api to get puchase bill of selected transaction
app.get('/Purchase_bill', async (req, res) => {
    try {
        const trID = req.query.trID;
        const pur = await pool.query('select id, transaction_time, transaction_date, transaction_amount from transaction_history where id=$1', [trID]);
        res.json(pur.rows)
        // console.log(purchase_rec.rows)
    } catch (err) {
        console.log(err.message);
    }
})



// Make payment 

app.get('/threshold/:vRMN/:cRMN', async (req, res) => {
    try {
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        // console.log(req.body);
        const allthreshold = await pool.query('SELECT threshold ,balance from vendor_consumer where consumer_contact = $1 and vendor_contact = $2',
            [cRMN, vRMN]);
        res.json(allthreshold.rows);
        // console.log(allthreshold.rows)
    }
    catch (err) {
        console.log(err.message);
    }
})


app.post("/changedata", async (req, res) => {
    try {

        console.log(req.body);
        const { consumer_contact, vendor_contact, total_amount, payed_amount, remaining_amount, transaction_date, transaction_time, tr_id } = req.body;
        // console.log(req.body);
        const updatedata = await pool.query('INSERT INTO payment_history (consumer_contact , vendor_contact , total_amount , payed_amount , remaining_amount , transaction_date, transaction_time, tr_id) VALUES ($1, $2, $3, $4, $5 ,$6, $7, $8 ) RETURNING *',
            [consumer_contact, vendor_contact, total_amount, payed_amount, remaining_amount, transaction_date, transaction_time, tr_id]);
        res.json("Data Inserted Successfully.....");


    } catch (err) {
        console.error(err.message);

    }
});


app.put("/updatedata/:vRMN/:cRMN", async (req, res) => {
    try {
        const { vRMN } = req.params;
        const { cRMN } = req.params;
        // console.log(req.body);
        const { due_date, balance, billing_start_date } = req.body;
        // console.log(req.body);
        const updatedata = await pool.query("UPDATE vendor_consumer SET due_date = $1 , balance = $2, billing_start_date = $3 where consumer_contact = $4 AND vendor_contact = $5 ",
            [due_date, balance, billing_start_date, cRMN, vRMN]);
        res.json('Payment Successful');
        // console.log(updatedata);


    } catch (err) {
        console.error(err.message);

    }
});


//add new products

app.get('/Add_products/product', async (req, res) => {
    try {
        console.log(req.body);
        const allproduct = await pool.query('SELECT * from product order by name');
        console.log(allproduct.rows);
        res.json(allproduct.rows);
        // console.log(res.json);
    }
    catch (err) {
        console.log(err.message);
    }
})

app.post('/Add_products/new_product', async (req, res) => {
    try {
        console.log(req.body);
        const { name, base_price } = req.body;
        console.log(req.body);
        q1 = await pool.query('Select * from product where name= $1 and base_price = $2',
            [name, base_price]);
        console.log('condition chk-', q1.rows)
        if (q1.rows.length == 0) {
            pool.query('INSERT INTO product (name , base_price) VALUES ($1, $2 ) RETURNING *',
                [name, base_price]);
            res.json({
                success: true,
                message: 'Product Added Successfully',
            });
            console.log(res.data)
        }
        else {
            console.log("e");
            res.json({
                success: false,
                message: 'Product Already Exists',
            });
        }
    }
    catch (err) {
        console.log(err.message);
    }
})





app.listen(port, () => {
    console.log("Server started on port : " + port);
});