const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {customerSchema} = require('../model/customer');
const auth = require('../middleware/auth');

const Customer = mongoose.model('customers', customerSchema);

//TODO: GET
router.get('/', async (req, res) => {
   const customers = await Customer.find().sort('-name');
   res.send(customers);
});

router.get('/:id', async (req, res) => {
   const customer = await Customer.findById(req.params.id);
   if (!customer) return res.status(404).send("NOT FOUND");
   res.send(customer);
});

//TODO: <POST></POST>
router.post('/', auth, async (req, res) => {
   let customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
   });
   try {
      const result = await customer.save();
      res.send(result);
   } catch (ex) {
      let errorMessage = "";
      for (field in ex.errors) {
         errorMessage += ex.errors[field].message + '\n';
      }  
      res.status(400).send(errorMessage);
   }
});

//TODO: UPDATE
router.put('/:id', auth, async (req, res) => {
   let customer = await Customer.findById(req.params.id);
   if(!customer) return res.status(404).send("NOT FOUND");
   
   customer.isGold = req.body.isGold;
   customer.name = req.body.name;
   customer.phone = req.body.phone;
   try {
      const result = await customer.save();
      res.send(result);
   } catch (ex) {
      let errorMessage = "";
      for (field in ex.errors) {
         errorMessage += ex.errors[field].message + '\n';
      }
      return res.status(400).send(errorMessage);
   }
});

//TODO: DELETE
router.delete('/:id', auth, async (req, res) => {
   const result = await Customer.findByIdAndDelete(req.params.id);
   if(!result) return res.status(404).send("NOT FOUND");
   res.send(result);
});

module.exports = router;