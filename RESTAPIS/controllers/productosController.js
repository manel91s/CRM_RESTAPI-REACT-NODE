const Producto = require('../models/Productos');
const shortid = require('shortid');
const multer = require('multer');
const Productos = require('../models/Productos');

// Opciones de Multer
const configuracionMulter = {
    limits: { fileSize : 100000 },
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            
            cb(null, __dirname+'/../uploads/');
        },
        filename: (req, file, cb) => {
            
            const extension = file.mimetype.split('/')[1];
    
            cb(null, `${shortid.generate()}.${extension}`)
            
        }
    }),
    fileFilter(req, file, cb) {
        
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //El callback se ejecuta como true o false: true cuando la imagen se acepta
            cb(null, true)
        }else{
            cb(new Error('Formato No Válido'), false)
        }
    }
}

const upload = multer(configuracionMulter).single('imagen');

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error)  {
        if(error) {
           res.json({mensaje : error})
        }
        return next();
    })
}



// agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Producto(req.body);
    
    try {
        if(req.file.filename) {
            console.log(req.file);
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje : 'Se agrego un nuevo producto'})
    }catch(e) {
        console.log(e);
        next();
    }
}

// Muestra todos los productos
exports.mostrarProductos = async (req, res) => {
    try {
        //Obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    }catch(e) {
        console.log(error);
        next();
    }
}

// Muestra un producto en especifico por su ID
exports.mostrarProducto = async (req, res, next) => {

    const producto = await Productos.findById(req.params.idProducto);

    if(!producto) {
        res.json({mensaje: 'Ese producto no existe'})
        return next();
    }

    // Mostrar el producto 
    res.json(producto);
}

// Actualiza un producto via id
exports.actualizarProducto = async (req, res, next) => {
    try {
    
        //Construir un nuevo producto
        let nuevoProducto = req.body;
    
        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }
        
        let producto = await Productos.findOneAndUpdate({_id: req.params.idProducto}, req.body, {
            new : true
        })
        res.json(producto);
    }catch(e) {
        console.log(error);
        next();
    }
}

//Elimina un producto via ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({ _id: req.params.idProducto })
        res.json({mensaje : 'El producto se ha eliminado'})
    }catch(error) {

    }
}