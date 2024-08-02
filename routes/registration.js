//Create Read Update Delete

const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

//Crear un nuevo registro

router.post('/', async (req, res) => {
    
    const { name, email, password } = req.body;
    console.log ("respuesta recibida", req.body);

    try {
        const newRegistration = new Registration({ name, email, password });
        await newRegistration.save();
        res.status(201).json(newRegistration);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Obtener todos los registros

router.get('/', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.json(registrations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Obtener un registro ID

router.get('/:id', async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) return res.status(404).json({ message: 'Not Found' });
        res.json(registration);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Actualizar un registro

router.put('/:id', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const updatedRegistration = await Registration.findByIdAndUpdate(req.params.id,
            { name, email, password }, { new: true });
        if (!updatedRegistration) return res.status(404).json({ message: 'Not Found' })
    } catch (err) {
        res.status(400).json({ message: err.message });

    }
});

//Eliminar un registro por ID

router.delete('/:id', async (req,res)=> {
    try{
        const deletedRegistration = await Registration.findByIdAndDelete(req.params.id);
        if(!deletedRegistration) return res.status(404).json({message: 'Not Found '});
        res.json({message: 'Deleted Succefully'});
    }catch (err){
        res.status(500).json({message: err.message});
    }

});

module.exports = router;