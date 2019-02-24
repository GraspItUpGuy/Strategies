const express = require('express')


const app = express()
const port = process.env.PORT || 3000;



app.get('/', (req,res)=>{
    res.send('this is the test home page')
})

app.listen(port, ()=>{
    console.log('server running on port 3000')
})