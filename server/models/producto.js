const mongoose = require('mongoose');
const { unique } = require('underscore');
const categoria = require('./categoria');
const Schema = mongoose.Schema;

let productoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    precioUni: {
        type: Number,
        unique: true,
        required: [true, 'El precio es obligatorio']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    }


});

module.exports = mongoose.model('Producto', productoSchema)