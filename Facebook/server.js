// requiring dependencies
const express = require('express')
const passport = require('passport')
const Strategy  = require('passport-facebook').Strategy
const bodyParser = require('body-parser')
const ejs = require('ejs')
const cookieParser  = require('cookie-parser')()
const expressSession = require('express-session')
const connectEnsureLogin = require('connect-ensure-login')
const morgan = require('morgan')


// setting up the dependencies



//app setup
const app = express()
const port = process.env.PORT || 3000


//@route  -   GET  /home
//@desc   -   a route to home page
//@access -   PUBLIC
//@source -   express npm page
app.get('/', (req,res)=>(
    res.send('this is the home page nibbas')
))



// listening the app on the server
app.listen(port, ()=>{
    console.log(`Server Running on the port : ${port}`)
})