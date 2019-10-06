const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Customer,validate} = require('../models/customer');



router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    //const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The course with the given id was not found');

    res.send(customer);
});

router.post('/',auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(404).send(error.details[0].message);
        return;
    }
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', auth,async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }, { new: true });
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
  });

router.delete('/:id',auth,async(req,res)=>{
    const customer= await  Customer.findByIdAndRemove(req.params.id);
 
     // const genre = genres.find(c => c.id === parseInt(req.params.id));
     if (!customer) return res.status(404).send('The genre with the given id was not found');
 
     res.send(customer)
 
 
 });




module.exports = router;
