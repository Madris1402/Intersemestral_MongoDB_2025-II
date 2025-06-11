// Agregacion para contar el numero de documentos
db.sales_cubo.aggregate([
    { $count: "total_documentos" }

]);

// Contar cuantos registros son de mujeres
db.sales_cubo.aggregate([
    { $match: { gender: "Female" } },
    { $count: "total_documentos" }

]);

//Obtener el Profit Total
db.sales_cubo.aggregate([
    {
        $group: {
            _id: null,
            totalProfit: { $sum: "$profit" },
            avgProfit: { $avg: "$profit" },
            totalDocs: { $sum: 1 }
        }
    }
]);

//Obtener el Profit Total de Mujeres
db.sales_cubo.aggregate([
    {
        $match: { gender: "Female" } //Filtrado
    },
    {
        $group: {
            _id: null,
            totalProfit: { $sum: "$profit" },
            avgProfit: { $avg: "$profit" },
            totalDocs: { $sum: 1 }
        } // Agrupacion
    }
]);


//Obtener Profit Total por Genero
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$gender",
            totalProfit: { $sum: "$profit" },
            avgProfit: { $avg: "$profit" },
            totalDocs: { $sum: 1 }
        } // Agrupacion
    }
]);

//Obtener Profit Total por Genero y Generar una Proyeccion
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$gender",
            totalProfit: { $sum: "$profit" },
            avgProfit: { $avg: "$profit" },
            totalDocs: { $sum: 1 }
        } // Agrupacion
    },
    {
        $project: {
            genero: "$_id",
            totalProfit: "$totalProfit",
            promedioProfit: "$avgProfit",
            noReg: "$totalDocs",
            _id: 0
        } //Se tiene que especificar que campos se van a mostrar y cuales no
    }
]);

//Obtener Profit Total por Genero en Mexico
db.sales_cubo.aggregate([
    {
        $match: { country_name: "Mexico" },
    },
    {
        $group: {
            _id: "$gender",
            totalProfit: { $sum: "$profit" },
            avgProfit: { $avg: "$profit" },
            totalDocs: { $sum: 1 }
        }
    },
    {
        $project: {
            genero: "$_id",
            totalProfit: "$totalProfit",
            promedioProfit: "$avgProfit",
            noReg: "$totalDocs",
            _id: 0
        }
    }
]);

//Obtener Profit Total con registros menores o igual a 20 por Genero en Mexico
db.sales_cubo.aggregate([
    { $match: { country_name: "Mexico" } },
    {
        $group: {
            _id: "$gender",
            totalProfit: { $sum: "$profit" },
            avgProfit: { $avg: "$profit" },
            totalDocs: { $sum: 1 }
        }
    },
    {
        $project: {
            genero: "$_id",
            totalProfit: "$totalProfit",
            promedioProfit: "$avgProfit",
            noReg: "$totalDocs",
            _id: 0
        }
    },
    { $match: { noReg: { $lte: 20 } } },
]);

//Obtener Profit Total con registros menores o igual a 20 por Genero que no sea masculino en Mexico
db.sales_cubo.aggregate([
    { $match: { country_name: "Mexico" } },
    {
        $group: {
            _id: "$gender",
            totalProfit: { $sum: "$profit" },
            avgProfit: { $avg: "$profit" },
            totalDocs: { $sum: 1 }
        }
    },
    {
        $project: {
            genero: "$_id",
            totalProfit: "$totalProfit",
            promedioProfit: "$avgProfit",
            noReg: "$totalDocs",
            _id: 0
        }
    },
    { $match: { noReg: { $lte: 20 } } },
    { $match: { genero: { $ne: "Male" } } },
]);

//Sumar la ganancia por categoria
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$category",
            totalProfit: { $sum: "$profit" },
            totalUnidades: { $sum: "units_sold" },
            promedioPrecio: { $avg: "$price_per_unit" }
        }
    },
    { $sort: { totalProfit: -1 } },
    {
        $project: {
            category: "$_id",
            totalProfit: 1,
            totalUnidades: 1,
            promedioPrecio: "$promedioPrecio",
            _id: 0
        }
    },
]);

//Sumar la ganancia por categoria y genero
//Madrigal Urencio Ricardo
db.sales_cubo.aggregate([
    {
        $group: {
            _id: { category: "$category", gender: "$gender" },
            totalProfit: { $sum: "$profit" },
            totalUnidades: { $sum: "units_sold" },
            promedioPrecio: { $avg: "$price_per_unit" }
        }
    },
    { $sort: { "_id.category": 1 } },
    {
        $project: {
            categoria: "$_id.category",
            genero: "$_id.gender",
            totalProfit: "$totalProfit",
            totalUnidades: "$totalUnidades",
            promedioPrecio: "$promedioPrecio",
            _id: 0
        }
    },
    { $sort: { categoria: 1, genero: 1 } }
]);

//Redondear valores en la Proyeccion
db.sales_cubo.aggregate([
    {
        $group: {
            _id: { category: "$category", gender: "$gender" },
            totalProfit: { $sum: "$profit" },
            totalUnidades: { $sum: "units_sold" },
            promedioPrecio: { $avg: "$price_per_unit" }
        }
    },
    { $sort: { "_id.category": 1 } },
    {
        $project: {
            categoria: "$_id.category",
            genero: "$_id.gender",
            totalProfit: { $round: ["$totalProfit", 2] },
            totalUnidades: "$totalUnidades",
            promedioPrecio: { $floor: "$promedioPrecio" },
            _id: 0
        }
    },
    { $sort: { categoria: 1, genero: 1 } }
]);

//Edad promedio por Genero
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$gender",
            promedioEdad: { $avg: "$age" }
        }
    },
    {
        $project: {
            genero: "$_id",
            promedioEdad: { $round: ["$promedioEdad", 2] },
            _id: 0
        }
    },
    { $sort: { promedioEdad: -1 } }
]);

//Genero con Mayor Edad Promedio
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$gender",
            promedioEdad: { $avg: "$age" }
        }
    },
    {
        $project: {
            genero: "$_id",
            promedioEdad: { $round: ["$promedioEdad", 2] },
            _id: 0
        }
    },
    { $sort: { promedioEdad: -1 } },
    { $limit: 1 }
]);

//Edades por Region
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$region",
            edades: { $push: "$age" }, //Genera un Arreglo con los elementos que le indiquemos
        }
    },
    {
        $project: {
            region: "$_id",
            edades: "$edades",
            _id: 0
        }
    }
]);

//Edades Unicas por Region
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$region",
            edades: { $addToSet: "$age" }, //Genera un Arreglo con los elementos unicos que le indiquemos
        }
    },
    {
        $project: {
            region: "$_id",
            edades: "$edades",
            _id: 0
        }
    }
]);

//Clientes por Region
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$region",
            clientes: { $addToSet: { $concat: ["$customer", " - ", "$country_name"] } },
        }
    },
    {
        $project: {
            region: "$_id",
            clientes: "$clientes",
            _id: 0
        }
    }
]);

//Clientes por Region ordenando clientes alfabeticamente
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$region",
            clientes: { $addToSet: { $concat: ["$customer", " - ", "$country_name"] } },
        }
    },
    {
        $project: {
            region: "$_id",
            clientes: { $sortArray: { input: "$clientes", sortBy: 1 } },
            _id: 0
        }
    },
    { $sort: { region: 1 } }
]);

//Clientes por Region con un arreglo de cliente
db.sales_cubo.aggregate([
    {
        $group: {
            _id: "$region",
            clientes: { $addToSet: { cliente: "$customer", pais: "$country_name" } },
        }
    },
    {
        $project: {
            region: "$_id",
            clientes: { $sortArray: { input: "$clientes", sortBy: 1 } },
            _id: 0
        }
    },
    { $sort: { region: 1 } }
]);

//Clientes por Region en el continente Americano
db.sales_cubo.aggregate([
    {
      $match: {continent: /america/i}  
    },
    {
        $group: {
            _id: "$region",
            clientes: { $addToSet: { cliente: "$customer", pais: "$country_name" } },
        }
    },
    {
        $project: {
            region: "$_id",
            clientes: { $sortArray: { input: "$clientes", sortBy: 1 } },
            _id: 0
        }
    },
    { $sort: { region: 1 } },
    {$out: "clientes_america"} //Exporta a una nueva coleccion la consulta
]);

//Madrigal Urencio Ricardo
show collections;

db.clientes_america.find();
db.clientes_america.countDocuments();
db.clientes_america.aggregate([{$count:"no_regiones"}]);