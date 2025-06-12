// Agregaciones Anidadas
db.sales_cubo.aggregate([
    {
        $group: {
            _id: { continent: "$continent", country: "$country_name" },
            totalProfit: { $sum: "$profit" }
        }
    },
    {
        $group: {
            _id: "$_id.continent",
            totalContinentProfit: { $sum: "$totalProfit" },
            totalRegistros: { $sum: 1 },
            paises: {
                $push: { pais: "$_id.country", totalProfit: "$totalProfit" }
            }
        }
    },
    {
        $project: {
            continente: "$_id", _id: 0,
            totalContinentProfit: "$totalContinentProfit",
            totalRegistros: "$totalRegistros",
            promedioProfit: { $divide: ["$totalContinentProfit", "$totalRegistros"] },
            paises: "$paises"
        }
    },
    { $sort: { continente: 1 } }
]);

//Edades de Clientes por Continentes
db.sales_cubo.aggregate([
    {
        $group: {
            _id: { continent: "$continent", edad: "$age" },
            noClientes: { $sum: 1 }
        }
    },
    {
        $project: {
            continente: "$_id.continent", edad: "$_id.edad", noClientes: 1, _id: 0
        }
    },
    { $sort: { continente: 1, edad: 1 } },
    {
        $group: {
            _id: "$continente", distribucionEdad: { $addToSet: { edad: "$edad", noClientes: "$noClientes" } }
        }
    },
    {
        $project: {
            continente: "$_id", distribucionEdad: "$distribucionEdad", noClientes: 1, _id: 0
        }
    },
    { $sort: { continente: 1 } },
]);

//Obtener Extractos de Fecha
db.sales_cubo.aggregate([
    {
        $project: {
            fecha: "$date",
            fecha_date: { $toDate: "$date" },
            anio: { $year: { $toDate: "$date" } },
            mes: { $month: { $toDate: "$date" } },
            dia: { $dayOfMonth: { $toDate: "$date" } },
            dia_semana: { $dayOfWeek: { $toDate: "$date" } },
            semana: { $dayOfWeek: { $toDate: "$date" } },
        }
    }
]);

