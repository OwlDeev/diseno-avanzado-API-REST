const { Pool } = require("pg");
const format = require('pg-format');

const pool = new Pool({
    user: "owldev_",
    host: "postgresql-owldev.alwaysdata.net",
    password: "Ellaberinto1",
    database: "owldev_farmacia",
    port: 5432,
    allowExitOnIdle: true
});

const obtenerMedicamentos = async ({ limits = 10, order_by = "id_ASC", page = 1}) => {
    if (page <= 0) {
        throw new Error("El número de pagina no puede ser igual o inferior a cero");
    }

    const offset = (page - 1) * limits;
    const [campo, direccion] = order_by.split("_");
    const consulta = format('SELECT * FROM medicamentos ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits,offset);
    const { rows: medicamentos } = await pool.query(consulta);
    return medicamentos;
};

const obtenerPersonal = async({ limits = 10, order_by = "id_ASC", page = 1 }) => {
    if (page <= 0) {
        throw new Error("El número de pagina no puede ser igual o inferior a cero");
    }

    const offset = (page - 1) * limits;
    const [campo, direccion] = order_by.split("_");
    const consulta = format('SELECT * FROM personal ORDER BY %s %s LIMIT %s OFFSET %s', campo, direccion, limits,offset);
    const { rows: personal } = await pool.query(consulta)
    return personal
}

const obtenerModecamentosPorFiltros = async ({ stock_min, precio_max }) => {
    let filtros = []
    if (precio_max) filtros.push(`precio <= ${precio_max}`)
    if (stock_min) filtros.push(`stock >= ${stock_min}`)
    let consulta = "SELECT * FROM medicamentos"
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ")
        consulta += ` WHERE ${filtros}`
    }
    const { rows: medicamentos } = await pool.query(consulta)
    return medicamentos
   }

module.exports = { obtenerMedicamentos, obtenerPersonal, obtenerModecamentosPorFiltros }