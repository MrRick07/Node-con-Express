
const express = require('express')
import routerApi from './src/routes/index'
import { errorBoomHandler, errorHandler, logErrors } from './src/middlewares/error.handler'

const app = express()
const port = 3001

app.use(express.json())
console.log('Iniciando servidor...')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

routerApi(app)

app.use(logErrors)
app.use(errorBoomHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Servidor iniciado en puerto: ${port}`)
})