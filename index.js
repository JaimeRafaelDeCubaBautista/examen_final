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
              res.send(nuevo3)
            })
            
          })

          app.post('/addlibro', (req, res) => {

            let collection = client.db(dbName).collection('libros');
            let nuevo = JSON.stringify(req.body)
            let nuevo3 = JSON.parse(nuevo)
            
            collection.insertOne(nuevo3, function(err, docs){
              res.send(nuevo3)
            })   
          })

          app.post('/addprestamo', (req, res) => {

            let collection = client.db(dbName).collection('registros');
            let nuevo = JSON.stringify(req.body)
            let nuevo3 = JSON.parse(nuevo)
            
            collection.insertOne(nuevo3, function(err, docs){
              res.send(nuevo3)
            })   
          })

//---------------------Eliminar informacion---------------

        app.post('/deletelector', (req, res) => {

            let collection = client.db(dbName).collection('lectores');
            let nuevo = JSON.stringify(req.body)
            let nuevo3 = JSON.parse(nuevo)
            let documento = nuevo3.documento

            collection.deleteOne({documento : documento}).then(doc=>{
              res.send("Lector eliminado correctamente")
            })

        })

        app.post('/deletelibro', (req, res) => {

          let collection = client.db(dbName).collection('libros');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
          let documento = nuevo3.documento
        
          collection.deleteOne({documento : documento}).then(doc=>{
            res.send("Libro eliminado correctamente")
          })

        })

        app.post('/deleteprestamo', (req, res) => {

          let collection = client.db(dbName).collection('registros');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
          let documento = nuevo3.documento
        
          collection.deleteOne({documento : documento}).then(doc=>{
            res.send("Registro de prestamo eliminado correctamente")
          })
        })

 //----------------------Modificar informacion----------------------------


        app.post('/updatelector', (req, res) => {

          let collection = client.db(dbName).collection('lectores');
          let nuevo = JSON.stringify(req.body)
          let nuevo3 = JSON.parse(nuevo)
        
          collection.updateOne({documento : nuevo3.documento},{$set : {nombre : nuevo3.nombre, telefono : nuevo3.telefono}}).then(doc=>{
            res.send("Lector modificado correctamente")
          })

        })


//-----------------cargar tablas-----------------------------

        app.get('/lectores', (req, res) => {

          let collection = client.db(dbName).collection('lectores');

          collection.find().toArray(function(err, docs){
            res.send(docs)
          })
        })

/*
app.get('/modelo/total', (req, res) => {

  let collection = client.db(dbName).collection('modelos');

  collection.countDocuments({talla:38})(function(err, docs){
    res.send(docs)
  })
})
*/

app.get('/modelo/:nombre', (req, res) => {
  
  let collection = client.db(dbName).collection('modelos');

  collection.find({nombre : req.params.nombre}).toArray(function(err, docs){
    res.send(docs)
  })
})



app.get('/color/:color', (req, res) => {
  
  let collection = client.db(dbName).collection('modelos');

  collection.find({color : req.params.color}).toArray(function(err, docs){
    res.send(docs)
  })

 })

 app.get('/tipo/:tipo', (req, res) => {
  
  let collection = client.db(dbName).collection('modelos');

  collection.find({tipo : req.params.tipo}).toArray(function(err, docs){
    res.send(docs)
  })

 })


app.post('/certificado', (req, res) => {

   res.send('Con fundamento en lo establecido en artículo 7 del decreto 1071 del 26 de junio de 1999, el articulo 2 de la Resolución 3266 de 2001 y el artículo 19 del Decreto 1510, se permite informar los términos de adhesión exigidos para los oferentes interesados en participar en el PROCESO DE ENAJENACIÓN A TRAVÉS DE VENTA AL POR MENOR No. 005 – CONTRATO Nº 100202205-071-685-2014 DIAN-CISA, por la cual se aprueba la venta de mercancía consistente en 456 pares de zapatos que conforma el evento de venta de mercancías No. EV-14-217-013, en cumplimiento a lo establecido en el contrato interadministrativo número 100202205-071-685-2014.<br><br>Las condiciones para participar en el evento y los demás documentos de este proceso los pueden consultar en el siguiente link y en las direcciones electrónicas: www.cisa.gov.co, www.dian.gov.co, https://www.contratos.gov.co/entidades/entLogin.html Buscador de Proceso: 100202205-071-685-2014.')

  })


app.post('/modelo/nuevo', (req, res) => {

  let collection = client.db(dbName).collection('modelos');
  
  console.log(req.body)

  collection.insertOne(req.body, function(err, docs){
    res.send(docs)
  })
})



app.delete('/', (req, res) => {
  res.send('Zapatos s.a.s, Acaba de eliminar a ' + req.body.nombre)
})






