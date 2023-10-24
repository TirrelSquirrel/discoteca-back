const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const drinkRoute = require('./routes/drinkRoute')
const faqRoute = require('./routes/faqRoute')

const app = express()
app.use(cors())
app.use(express.json())

try {
    mongoose.connect("mongodb://127.0.0.1:27017/rockmola");
    console.log('Conectado a base de datos')
} catch (error) {
    console.error(error)
    console.log('Error al conectar a la base de datos');
}


app.get('/', (req, res) => {
    res.send('Esto va flama')
})

app.use('/drink', drinkRoute)
app.use('/faq', faqRoute)

app.listen(5000, () => console.log('Server is running'))