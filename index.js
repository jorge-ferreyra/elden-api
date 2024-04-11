const express = require('express')
const cors = require('cors')
const fs = require('node:fs')
const app = express()
const PORT = 1234

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Para encontrar el JSON con la información, ir a "/bosses"...</h1>')
})

/// ENDPOINT
app.get('/bosses', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Error al leer el archivo')
    }
    try {
      const info = JSON.parse(data)
      res.json(info)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al procesar los datos')
    }
  })
})

app.get('/bosses/:id', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Error al leer el archivo')
    }
    try {
      const param = req.params
      const info = JSON.parse(data)
      const result = info.bosses[param.id]
      res.json(result)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error al procesar los datos')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
