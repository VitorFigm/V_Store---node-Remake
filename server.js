//def
const path = require('path')
const express = require('express')
const app = express()

const exphbs = require('express-handlebars')

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout:'main' }));
app.set('view engine', '.hbs');

///server don't uses POST request, so body-parser isn't necessary 
// const bodyparser = require('body-parser')
// app.use(bodyparser.urlencoded({ extended: true }) )
// app.use(bodyparser.json())

function get_path(name){
    return path.join(__dirname,name)
}

///static
app.use(express.static (get_path("static") ))

///apps routes
const main_app = require(get_path('main_app/routes'))
app.use("/",main_app)




//run server
app.listen(8000,
    _=>{console.log('server is running')}
    )