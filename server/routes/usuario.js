const express = require('express');
const app = express();
  
  app.get('/usuarios', function (req, res) {
      res.json({
          ok: 200,
          msj: 'Usuarios consultados exitosamente'
      });
    });
  
    app.post('/usuarios', function (req, res){
        let nombre = req.body.nombre;
        let body =req.body;
  
        if(nombre === undefined){
            res.status(400).json({
              ok:400,
              msj: 'Favor de enviar el valo del nombre'
            });
        }else{
        
          res.json({
              ok: 200,
              msj: 'Usuario insertado con exito',
              body: body
          });
      }
    });
  
  app.put('/usuarios/:id/: nombre', function(req, res){
      let id = req.params.id;
      let nombre = req.params.nombre;
  
      res.json({
          ok: 200, 
          msj:'Usuario actualizado exitozamente',
          id: id,
          nombre: nombre
      });
  });
  
  app.delete('/usuarios/:id', function(req, res){
      let id = req.params.id;
  
      res.json({
          ok: 200,
          msj: 'Usuario eliminado con exito',
          id: id
      });
  });

  module.exports = app;