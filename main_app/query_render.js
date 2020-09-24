const my_dataBase = require('./my_dataBase')
my_dataBase.product_per_page = 8;

function query_render(req,res,args,template="index"){
    ///default args
    let {
        query="",
        filter_name="", //is what will appear in the template if a filter is set
        find_args={},
        sort={},
        page=1,
    } = args
    const func = (db_len)=>{
        ///page calculations
        const page_number = parseInt( db_len/(my_dataBase.product_per_page) )
        const P_n = my_dataBase.product_per_page
        ///query
        if(query!="")
            find_args = {title: { $regex: query, $options: "i" }, ...find_args}
            my_dataBase.db.find(find_args)
        .sort(sort).skip( (page-1)*P_n ).limit(P_n).lean().exec((error,result)=>{
            if(error != undefined)console.log("query error:"+error)
            ///render
            res.render(template,{
                query:query,
                filters:filter_name,
                page:page,
                total_page:page_number,
                products:result,
                
                brand_list:my_dataBase.brands,


                helpers:{
                    compare:(...args)=>{
                        const compare = args[args.length-2]
                        const arr = Array(args.length-2).fill(compare).toString()
                        const slice = args.slice(0,-2).toString()
                        const res = args[args.length-1]
                        return arr==slice?
                        res.fn(this):
                        res.inverse(this)
                    }
                }
                    

            })
        })
    }
    
    my_dataBase.count_db(func)
}

module.exports = query_render