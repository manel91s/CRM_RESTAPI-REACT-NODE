const Clientes = require('../models/Clientes');

//Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {

   const cliente = new Clientes(req.body);

   try {
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo clienmte'})
   }catch(e) {
        console.log(e);
        next();
   }
}

//Agrega un nuevo cliente
exports.mostrarClientes = async (req, res, next) => {

    try {
        const clientes = await Clientes.find({});
        res.json(clientes)
    }catch(e) {
         console.log(e);
         next();
    }
 }

 // Muestra un cliente por su ID
 exports.mostrarClientes = async(req, res, next) => {

    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente) {
        res.json({mensaje: 'Ese cliente no existe'})
        next();
    }

    //Mostrar el cliente
    res.json(cliente);
 }

// Actualiza un cliente por su ID
exports.actualizarCliente = async (req, res) => {

    try {
        const cliente = await Clientes.findOneAndUpdate({
            _id: req.params.idCliente}, req.body, {
                new: true
            });
            res.json(cliente);
    } catch(error) {
        console.log(error);
        next();
    }
}