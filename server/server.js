require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('<h1>Bienvenidos a mi servidor REST</h1>');
});

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

 mongoose.connect('mongodb://localhost:27017/starbucks',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
 }, (err, res) => {
 
    if(err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, ()=>{
    console.log('El servidor esta en linea por el puerto', process.env.PORT);
}); 