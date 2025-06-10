db.getCollection("sales_cubo").count();

db.sales_cubo.stats();

db.sales_cubo.find({ "time": { $exists: true } });

db.sales_cubo.find({ "year": { $exists: true } });

// > $gt, >= $gte, < $lt, <= $lte
db.sales_cubo.find({ year: { $gte: 2020, $lte: 2022 } });

db.sales_cubo.find({
    $and: [
        { year: { $gte: 2020 } },
        { year: { $lte: 2022 } }
    ]
});

db.sales_cubo.find({ year: { $gte: 2020, $lte: 2022 } }).count();


// Ordenar Elementos por Año Desc
db.sales_cubo.find({
    $or: [
        { year: { $gte: 2020, $lte: 2022 } },
        { "time.year": { $gte: 2020, $lte: 2022 } }
    ]
},
    { sales_id: 1, year: 1, "time.year": 1, country_name: 1, product: 1, profit: 1, _id: 0 }
).sort({ year: -1 });

// Ordenar Elementos por Mayor Profit
db.sales_cubo.find({
    $or: [
        { year: { $gte: 2020, $lte: 2022 } },
        { "time.year": { $gte: 2020, $lte: 2022 } }
    ]
},
    { sales_id: 1, year: 1, "time.year": 1, country_name: 1, product: 1, profit: 1, _id: 0 }
).sort({ profit: -1 });

// Limitar documentos a mostrar
db.sales_cubo.find({
    $or: [
        { year: { $gte: 2020, $lte: 2022 } },
        { "time.year": { $gte: 2020, $lte: 2022 } }
    ]
},
    { sales_id: 1, year: 1, "time.year": 1, country_name: 1, product: 1, profit: 1, _id: 0 }
).sort({ profit: -1 }).limit(3);

db.sales_cubo.find({}).limit(5);

db.sales_cubo.find({}).limit(5).count();

db.sales_cubo.find({}).limit(5).sort({ profit: -1 }).count();

//Distinct
db.sales_cubo.distinct("customer");
db.sales_cubo.distinct("category");
db.sales_cubo.distinct("continent");
db.sales_cubo.distinct("gender");
db.sales_cubo.distinct("time");
db.sales_cubo.distinct("year");
db.sales_cubo.distinct("time.year");

//Distinct Condicionado
db.sales_cubo.distinct("customer", { gender: "Female" });
db.sales_cubo.distinct("customer", { region: { $ne: "Sicily" } });
db.sales_cubo.distinct("customer", { region: { $eq: "Sicily" } });


// Uso de In & NotIn
db.sales_cubo.find({
    customer: { $in: ["Benjamin Jones", "Gary Mcclure", "Linda Torres"] }
},
    { customer: 1, sales_id: 1, _id: 0 }

);

db.sales_cubo.find({
    customer: { $nin: ["Benjamin Jones", "Gary Mcclure", "Linda Torres"] }
},
    { customer: 1, sales_id: 1, _id: 0 }

);

db.sales_cubo.distinct("customer", {
    customer: { $in: [/Benjamin/i, /Gary/i, /Linda/i] }
}, );


//Mostrar los 3 productos mas vendidos en Asia en 2022
db.sales_cubo.find({
    $and: [
        { continent: "Asia" },
        { year: 2022 }
    ]
},
    { product: 1, profit: 1, continent: 1, year: 1, _id: 0 }
).sort({ profit: -1 }).limit(3);

//Listar los clientes con profit negativo en la Categoria Tecnologia
db.sales_cubo.find({
    $and: [
        { profit: { $lt: 0 } },
        { category: "Technology" }
    ]
},
    { customer: 1, profit: 1, _id: 0 }
).sort({ profit: 1 });

//Listar las Regiones unicas en donde hay clientes No Binarios
db.sales_cubo.distinct("region", { gender: "Non-Binary" });
