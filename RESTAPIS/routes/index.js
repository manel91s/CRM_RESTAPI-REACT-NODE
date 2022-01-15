const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


module.exports = function() {
    
    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);
   
    //Muestra un cliente en especifico
    router.get('/clientes/:idCliente', clienteController.mostrarClientes );

    //Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminar);

    return router;
}