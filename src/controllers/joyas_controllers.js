const {obtenerJoyas, obtenerJoyasFiltro,obtenerJoyasPorFiltros } = require("./consultas");
const ErrorResponse = require("../helper/errorResponse");
const { response } = require("express");

function obtenerStock(joyas){
  stock = 0
  for(joya of joyas)
  {
    stock = stock + joya.stock
  }
  return stock
}

exports.getJoyas = async (req, res, next) => {
  try {
    const joyas = await obtenerJoyas();
    const queryStrings = req.query;
    if(queryStrings.order_by != undefined || queryStrings.page != undefined || queryStrings.limits != undefined ){
       try {
          if(![queryStrings].includes('')){
             console.log(queryStrings)
              const joyas = await obtenerJoyasFiltro(queryStrings);
              res.json(joyas);
          }else {
              next(
                console.log('error')
                );
          }
    
        } catch (err) {
          next(
            new ErrorResponse(
              "Error, no ha sido posible obtener por filtros, error: " +
                err.message +
                400,      
            )
          
          );
        }
    }else{
      return res.json({
        totalJoyas: joyas.length,
        totalStock: obtenerStock(joyas),
        results: joyas,
      });
    }
  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener las joyas" + err + 404
      )
    );
  }
};


exports.getJoyasPorFiltros = async (req, res, next) => {
  try {
    const queryStrings = req.query;
    if(![queryStrings].includes('')){
        const joyas = await obtenerJoyasPorFiltros(queryStrings);
        res.json(joyas);
    }else {
        next(
          console.log('error')
          );
    }

  } catch (err) {
    next(
      new ErrorResponse(
        "Error, no ha sido posible obtener las joyas por filtros, error: " +
          err.message +
          400
      )
    );
  }}
