const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000
const createCountry = require('./db/CountryStorage')
const country = require('./router/country')

app.use(cors())
app.use(express.json())
app.use('/api/country', country)

app.listen(PORT, async() => {
    try {
        await createCountry()
        console.log(`LISTEN TO PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
})