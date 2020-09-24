const query_render = require('./query_render')


function home(req,res){
    let page = req.params.page
    page = page==undefined?1:parseInt(page)
    query_render(req,res,{ page:page ,sort:{rating:'desc'}  })
}


function filter(req,res){
    let {query, query_only, 
        brand, maximum_price, 
        minimum_price,  filter_for}
    = req.query
    /// treat data
    maximum_price = parseFloat(maximum_price)
    minimum_price = parseFloat(minimum_price)

    let find_args = {}
    if(query_only!='true'){
        //treat NaN
        if(!isNaN(minimum_price))find_args.price = {$gt:minimum_price}
        if(!isNaN(maximum_price))find_args.price = {...find_args.price , $lt:maximum_price}
        //treat brand
        if(brand!="" && brand!="all")find_args.brand = brand
    }
    let sort
    switch(filter_for){
        case "lower price":
            sort = {price:'asc'}
            break;
        case "higher price":
            sort = {price:'desc'}
            break
        default:
            sort = {rating:'desc'} ///better ratings
    }
    const page = req.params.page
    query_render(req,res,{ page:page ,sort:sort, query:query ,find_args:find_args, filter_name:filter_for},'filter')
}

module.exports = {
    home:home,
    filter:filter
}