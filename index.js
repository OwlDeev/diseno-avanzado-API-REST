const express = require('express')
const app = express()
app.listen(3000, console.log('Server ON'))

const { obtenerMedicamentos, obtenerPersonal } = require('./consultas')

app.get('/medicamentos', async(req, res) => {
  try {
    const queryStrings = req.query;
    const medicamentos = await obtenerMedicamentos(queryStrings);
    res.json(medicamentos)
  } catch (error) {
    res.send(console.log(error.message))
  }
    
})

app.get('/personal', async(req, res) => {
  try {
    const queryStrings = req.query;
    const personal = await obtenerPersonal(queryStrings);
    res.json(personal)
  } catch (error) {
    res.send(console.log(error.message))
  } 
})

app.get('/medicamentos/filtros', async (req, res) => {
  const queryStrings = req.query
  const medicamentos = await obtenerModecamentosPorFiltros(queryStrings)
  res.json(medicamentos)
 })
