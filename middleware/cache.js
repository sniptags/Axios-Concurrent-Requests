const mcache= require('memory-cache')

// check if the current request is already cached 
// if results are available send those to user in response 
// else use next tick to run real middleware
const cache =(req,res,next)=>{
        let key ='express_'+req.url
        let cachedBody= mcache.get(key)
        if(cachedBody){
           return res.status(200).json(cachedBody)
        }
        else{
            next()
        }
}

// cache the results for 15 minutes
const putCache=(body,key)=>{
    mcache.put(key,body,900000)
    return
}
module.exports={cache,
putCache}