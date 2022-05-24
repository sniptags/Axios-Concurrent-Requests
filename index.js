const express=require('express')
const app= express()
const{cache,putCache}=require('./middleware/cache')
const {removeDuplicate,validSortOption,sortPosts,validDirection}=require('./utils/utilities')

// require request npm module to make api call in outside world
const axios = require('axios')

// ping route
app.get('/api/ping',(req,res)=>{
    res.status(200).json({success:true})
})

// get posts route 
// cache middleware to check cache for existing request
app.get('/api/posts',cache,async (req,res)=>{
    // check for tags in query params
    if(!req.query.tags){
        return res.status(400).json({"error":"Tags parameter is required"})
    }

    // check for valid sortby parameter
    if(req.query.sortBy){
        if(!validSortOption(req.query.sortBy)){
            return res.status(400).json({"error":'sortBy Parameter is Invalid'})
        }
    }

    // check if valid direction parameter
    if(req.query.direction){
        if(!validDirection(req.query.direction)){
            return res.status(400).json({"error":'Direction Parameter is Invalid'})
        }
    }
    // split all tags from query string

    const tags= req.query.tags.split(',')

    // create array of axios request
    const promiseUrls= await tags.map(tag=>{
        return axios.get(`https://api.example.com/blog/posts?tag=${tag}`)
    })

    // request to get posts concurrently

    Promise.all(promiseUrls)
    .then((results)=>{
        var posts=[]
        results.forEach(data => {
            // concat all posts
            posts=posts.concat(data.data.posts)
        });

        // filter duplicate posts

        posts=removeDuplicate(posts);
        
        // sort posts if sortBy is provided and direction is provided or default asc direction
        if(req.query.sortBy){
                posts=sortPosts(posts,req.query.sortBy,req.query.direction)
            }
        else{
            if(req.query.direction){
            posts=sortPostsByDirection(posts,req.query.direction)
            }
        }
         // cache the results with keyurl
        putCache(posts,`express_${req.url}`)
        return res.status(200).json(posts)
    })
    .catch((err)=>{
        return res.status(400).json(err.data)
    })
})

module.exports=app