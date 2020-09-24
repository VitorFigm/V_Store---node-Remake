const mongoose = require('mongoose')
const fs = require('fs')

async function connect_database(){
    try{
        const promise = mongoose.connect('mongodb://localhost/Amazon_products',
        { useNewUrlParser: true, useUnifiedTopology: true})
        await promise
        console.log("connected to database")
    }catch(error){
        console.log("database error:"+error)
    }
    
}
mongoose.Promise = global.Promise
connect_database()

const prods_schema = mongoose.Schema({
    brand:String,
    title:String,
    url:String,
    rating:Number,
    price:Number,
    image:String,
})

const products = mongoose.model('Product_info',prods_schema,'Product_info')

///counting data_base
const count_db = (func)=>{
    products.countDocuments({}, (error, count)=>{ 
        if(error!=undefined)console.log("count dataBase failed:"+error)
        func(count)
    })
}

const brands = JSON.parse( fs.readFileSync("brand_list.json") ).values
const obj = { db:products , count_db:count_db, brands:brands}

module.exports = obj;