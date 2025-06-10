db.direcciones.insertMany([
    {
        _id: 12,
        direccion: "Calle Hidalgo 456",
        cp: "06000",
        alumnos: ["Pedro", "Sofía"]
    },
    {
        _id: 13,
        direccion: "Calle Juárez 789",
        cp: "03000",
        alumnos: ["Luis", "Mario", "Jorge"]
    },
    {
        _id: 14,
        direccion: "Boulevard del Sol 10",
        cp: "72000",
        alumnos: ["Ana", "José", "Valeria", "Raúl"]
    },
    {
        _id: 15,
        direccion: "Av Insurgentes Sur 555",
        cp: "03900",
        alumnos: ["Pedro", "Ana", "Juan", "Lucía", "Carlos"]
    },
    {
        _id: 16,
        direccion: "Av Reforma 123",
        cp: "01000",
        alumnos: ["Luis", "Maria", "Jorge", "Ana"]
    }
]);


db.getCollection("direcciones").find({ alumnos: { $exists: true } });

//$all, muestra los arreglos que contienen valores especificos
db.getCollection("direcciones").find({ alumnos: { $all: ["Ana", "Pedro"] } });

db.getCollection("direcciones").find({ alumnos: { $all: ["Ana", "Pedro", "Carlos"] } });

// $size, evalua el tamaño del arreglo
db.getCollection("direcciones").find({ alumnos: { $size: 4 } });
db.getCollection("direcciones").find({ alumnos: { $size: 2 } });

// $expr, construye una expresion compleja
db.direcciones.find({
    alumnos: {$exists: true, $type: "array"},
    $expr: {
        $and: [
            { $gte: [{ $size: "$alumnos" }, 2] },
            { $lte: [{ $size: "$alumnos" }, 4] }
        ]
    }
});

db.direcciones.find({alumnos: "Sofía"});

db.direcciones.find({alumnos: {$ne: "Sofía"}});

db.direcciones.find({
    $and: [
    {alumnos: {$exists:true, $type:"array"}},
    {alumnos: {$ne: "Sofía"}}
    ]
});