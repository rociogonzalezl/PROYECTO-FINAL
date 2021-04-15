const express = require('express');
const _ = require('underscore');
const categoria = require('../models/categoria');
const app = express();
const Producto = require('../models/producto');

app.get('/producto', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Producto.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al listar el producto',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Productos listados con exito',
                conteo: productos.length,
                productos
            });
        });
});

app.post('/producto', (req, res) => {
    let body = req.body
    let produ = new Producto({
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        precioUni: req.body.precioUni,
        categoria: req.body.categoria
    });

    produ.save((err, produDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err
            });
        };
        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            produDB
        });
    });

});

app.put('/producto/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'usuario', 'disponible', 'precioUni', 'categoria']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, produDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El producto fue actualizado con exito',
            produDB
        });
    });
});

app.delete('/producto/:id', (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndRemove(id, { context: 'query' }, (err, produDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El producto fue eliminado con exito',
            produDB
        });
    });
});

module.exports = app;