use agendafes;

// Ricardo Madrigal Urencio
db.direccioness.insertMany(
[
  {"_id":1, direccion:"Av Rancho seco SN", cp: "57200", "alumnos": [ "Juan", "Ana", "Pedro" ]},
  {"_id":2, direccion:"Av Universidad 3000", cp: 30300},
  {"_id":3, direccion:"Av Central 5000", cp: NumberLong(56234), "posgrado": true},
  {"_id":4, direccion:"Las Palmas 4", cp: NumberInt(56330), "preferencias": {
        "seguimientoEmails": false,
        "idioma": "Español",
        "zonaHoraria": 5
    }},
  {"_id":5, direccion:"Bosques de Africa 2", cp: ["57200", "57201"], "fecha" : ISODate("2025-02-11T08:52:30.038Z")},
  {"_id":6, direccion:"Bosques de Africa 2", cp: {codigo:"57200", zp:"57201"}}
]
);

show dbs;
show collections;
db;


//SELECT * FROM direcciones
// Mostrar todos los documentos de una coleccion
db.direcciones.find();


//SELECT count(*) FROM direcciones
// Contar todos los documentos de una coleccion
db.direcciones.count();
db.direcciones.countDocuments();


db.direcciones.insertOne(
  {"_id":7, 
  direccion:"Bosques de Africa 2", cp: [
   {codigo:"57200", zp:"57201"},
   {codigo:"58200", zp:"58201"},
   {codigo:"59200", zp:"59201"}
   ]
  }
)

db.direcciones.insertMany(
  [
  {"_id":8, 
  direccion:"Bosques de Africa 2", cp: [
   ["57200", 57201],
   ["58200", 58201],
   ["59200", 59201]
   ]
  },
  {"_id":9, direccion:"Bosques de Africa 2", "cp" : ISODate("2025-01-08T08:52:30.038Z")},
  {"_id":10, direccion:"Av Universidad 3000", cp: "30300", fecha:"2025-01-09 08:52:30"}
  ]
)
 
db.direcciones.insertOne({"_id":11, direccion:"Bosques de Africa 2", "cp" : true})


var coll = 'direcciones'
coll

db.getCollection(coll).find();

db.direcciones.find({});
db.direccioness.find({});

db.direccionezz.find({});

// Busqueda en los elementos

// SELECT * FROM direcciones WHERE direccion = 'Bosques de Africa 2'
db.direcciones.find({direccion : 'Bosques de Africa 2'});

db.direcciones.find({direccion : 'Bosques de Africa 2'}).count();

db.direcciones.count({direccion : 'Bosques de Africa 2'});

db.direcciones.find({direccion : {$eq: 'Bosques de Africa 2' }}); //Manera Formal de evaluar

// SELECT * FROM direcciones WHERE direccion != 'Bosques de Africa 2'
db.direcciones.find({direccion : {$ne: 'Bosques de Africa 2' }});

// SELECT * FROM direcciones WHERE NOT direccion = 'Bosques de Africa 2'
db.direcciones.find({direccion : {$not:{$eq: 'Bosques de Africa 2'}}});


db.direcciones.find({calle : {$eq: 'Bosques de Africa 2' }});


//Evaluar si el campo existe o no
//Ricardo Madrigal Urencio
db.direcciones.find({calle : {$exists: 1}});
db.direcciones.find({calle : {$exists: 0}});

db.direcciones.find({alumnos : {$exists: 1}});

db.direcciones.find({fecha : {$exists: 1}});

//Uso de Expresiones Regulares

db.direcciones.find({direccion : /AV/});
db.direcciones.find({direccion : /AV/i}); //Definir insensitividad a Mayusculas

// SELECT _id, direccion, cp FROM direcciones WHERE regep_like('Av', 'i');
db.direcciones.find({direccion : /AV/i}, {direccion : 1, cp : 1}); //El segundo Argumento de Find sirve para filtrar los documentos
db.direcciones.find({direccion : /AV/i}, {direccion : 1, cp : 1, fecha : 1});

// SELECT direccion, cp FROM direcciones WHERE regep_like('Av', 'i');
db.direcciones.find({direccion : /AV/i}, {direccion : 1, cp : 1, _id : 0});

//Excluir un solo campo
db.direcciones.find({direccion : /AV/i}, {direccion : 0});

// AND - OR
db.direcciones.find({$and : [{direccion : /AV/i}, {posgrado : {$exists : 1}}]});

db.direcciones.find({$or : [{fecha : {$exists : 1}}, {alumnos : {$exists : 1}}]});

db.direcciones.find({cp: {$exists : 1}});

//Evaluar Tipo de valores
db.direcciones.find({cp : {$type : 1}});
db.direcciones.find({cp : {$type : "double"}});

db.direcciones.find({cp : {$type : 2}});
db.direcciones.find({cp : {$type : "string"}});

db.direcciones.find({cp : {$type : 3}});
db.direcciones.find({cp : {$type : "object"}});

db.direcciones.find({cp : {$type : 4}});
db.direcciones.find({cp : {$type : "array"}});

db.direcciones.find({cp : {$type : 8}});
db.direcciones.find({cp : {$type : "bool"}});

db.direcciones.find({cp : {$type : 9}});
db.direcciones.find({cp : {$type : "date"}});

db.direcciones.find({cp : {$type : "number"}}); //Todos los formatos numericos


//Preferencias
db.direcciones.find({preferencias : {$exists : 1}});

db.direcciones.find({"preferencias.seguimientoEmails" : {$type : 8}});

// Ricardo Madrigal Urencio
db.direcciones.find({cp : {$type : ["date", "number"]}}); //Al darle un arreglo a type, evalua con OR


//TRUNCATE TABLE
db.direccioness.deleteMany({});

//DROP TABLE
db.direccioness.drop();
