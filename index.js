const express = require('express')
const cors = require('cors')
const app = express()
const note = require('./route/note_route')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4000

app.get('/', (req, res)=> {
    res.json({msg: 'you are on note'})
})

app.use('/api/note', note)

app.listen(port, ()=> {
    console.log(`server is running on http://localhost:4000`)
})