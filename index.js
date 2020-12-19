const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient} = require('mongodb');
const { json } = require('body-parser');


const app = express()
const port = 3000

//configuracion de mongo

const dbName = 'biblioteca'
const url = 'mongodb://localhost:27017/'+dbName
const client = new MongoClient(url, {useUnifiedTopology: true});


async function conectar(){
  await client.connect(function(err){
    if(err){
      console.log('err')
      return
    }
    console.log('conectado a mongo')
  })
}


conectar()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/partes'))
app.use(express.urlencoded({extended: false}))

//------------inicio-------------


app.get('/', (req, res) => {
  res.end(formulario)
//res.send('Bienvenido Al Sistema De Gestion De La Biblioteca')
})

app.listen(port, () => {
  console.log(`puerto:${port}`)
})


//--------agregar informacion--------------------

          app.post('/addlector', (req, res) => {

            let collection = client.db(dbName).collection('lectores');
            let nuevo = JSON.stringify(req.body)
            let nuevo3 = JSON.parse(nuevo)
            
            collection.insertOne(nuevo3, function(err, docs){
              res.redirect('/');
            })
            
          })

          app.post('/addlibro', (req, res) => {

            let collection = client.db(dbName).collection('libros');
            let nuevo = JSON.stringify(req.body)
            let nuevo3 = JSON.parse(nuevo)
            
            collection.insertOne(nuevo3, function(err, docs){
              res.redirect('/');
            })   
          })

          app.post('/addprestamo', (req, res) => {

            let collection = client.db(dbName).collection('registros');
            let nuevo = JSON.stringify(req.body)
            let nuevo3 = JSON.parse(nuevo)
            
            collection.insertOne(nuevo3, function(err, docs){
              res.redirect('/');
            })   
          })

//---------------------Eliminar informacion---------------

        app.post('/deletelector', (req, res) => {

            let collection = client.db(dbName).collection('lectores');
            let nuevo = JSON.stringify(req.body)
            let nuevo3 = JSON.parse(nuevo)
            let documento = nuevo3.documento

            collection.deleteOne({documento : documento}).then(doc=>{
              res.redirect('/');
            })

        })

        app.post('/deletelibro', (req, res) => {

          let collection = client.db(dbName).collection('libros');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
          let documento = nuevo3.documento
        
          collection.deleteOne({documento : documento}).then(doc=>{
            res.redirect('/');
          })

        })

        app.post('/deleteprestamo', (req, res) => {

          let collection = client.db(dbName).collection('registros');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
          let documento = nuevo3.documento
        
          collection.deleteOne({documento : documento}).then(doc=>{
            res.redirect('/');
          })
        })

 //----------------------Modificar informacion----------------------------


        app.post('/updatelector', (req, res) => {

          let collection = client.db(dbName).collection('lectores');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
        
          collection.updateOne({documento : nuevo3.documento},{$set : {nombre : nuevo3.nombre, telefono : nuevo3.telefono}}).then(doc=>{
            res.redirect('/');
          })

        })


        app.post('/updatelibro', (req, res) => {

          let collection = client.db(dbName).collection('libros');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
        
          collection.updateOne({documento : nuevo3.documento},{$set : {nombre : nuevo3.nombre, telefono : nuevo3.telefono}}).then(doc=>{
            res.redirect('/');
          })

        })


        app.post('/updateprestamo', (req, res) => {

          let collection = client.db(dbName).collection('registros');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
        
          collection.updateOne({documento : nuevo3.documento},{$set : {nombre : nuevo3.nombre, telefono : nuevo3.telefono}}).then(doc=>{
            res.redirect('/');
          })

        })


//-----------------cargar tablas-----------------------------

        app.get('/lectores', (req, res) => {

          let collection = client.db(dbName).collection('lectores');

          collection.find().toArray(function(err, docs){

            res.send(docs)

          })
        })


        app.get('/libros', (req, res) => {

          let collection = client.db(dbName).collection('libros');

          collection.find().toArray(function(err, docs){
            
            res.send(docs)

          })
        })

        app.get('/prestamos', (req, res) => {

          let collection = client.db(dbName).collection('registros');

          collection.find().toArray(function(err, docs){
            
            res.send(docs)

          })
        })

