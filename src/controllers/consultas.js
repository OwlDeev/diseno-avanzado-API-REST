const { pool } = require("../config/dataBase");
const format = require("pg-format");

exports.obtenerJoyas = async () => {
  try {
    const consulta = "SELECT * FROM inventario;";
    const { rows } = await pool.query(consulta);

    return rows;
  } catch (error) {
    console.log("La consulta no esta correcta", error);
    return error;
  }
};

 exports.obtenerJoyasFiltro = async ({
   order_by = "stock_ASC",
   page = 1,
   limits = 2,
 }) => {
   if (page <= 0) {
     throw new Error(
       "El numero de pagina menor o igual a cero"
     );
   }

   const offset = (page - 1) * limits;
   const [campo, direccion] = order_by.split("_");

   const consulta = format(
     "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
     campo,
     direccion,
     limits,
     offset
   );

   const { rows: joyas } = await pool.query(consulta);
   return joyas;
 };

exports.obtenerJoyasPorFiltros = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];

  if (precio_min) {
    filtros.push(` precio >= ${precio_min} `);
  }

  if (precio_max) {
    filtros.push(` precio <= ${precio_max} `);
  }

  if (categoria) {
    filtros.push(` categoria = '${categoria}' `);

    if (metal) {
      filtros.push(` metal = '${metal}' `);
    }

    let consulta = "SELECT * FROM inventario";
    if (filtros.length > 0) {
      filtros = filtros.join(" AND ");
      consulta += ` WHERE ${filtros}`;

      console.log(consulta);
    }

    const { rows: joyas } = await pool.query(consulta);

    return joyas;
  }
};
