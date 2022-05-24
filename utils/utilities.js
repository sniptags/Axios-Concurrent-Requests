
// remove duplicate posts from array
const removeDuplicate=(posts)=>{
    let filteredPosts=posts.reduce((previousPost,currentPost)=>{
        if(!previousPost.some(post=>post.id===currentPost.id)){
            previousPost.push(currentPost)
        }
        return previousPost
     },[])
    return filteredPosts
}

//  check for valid sorting parameter
const validSortOption=(option)=>{
    const validOptions=['id','reads','likes','popularity']
    return validOptions.includes(option)
}

// check for valid direction parameter
const validDirection=(option)=>{
    const validOptions=['asc','desc']
    return validOptions.includes(option)
}
// sort by direction only
const sortPostsByDirection=(posts,dir)=>{
    if(dir === 'desc'){
        posts.sort((a,b)=>b.id-a.id)
    }
}
// Sort posts by sortBy parameter

const sortPosts=(posts,sortBy,dir)=>{
    // sort by id
    if(sortBy==='id'){
        // sort in order-descending order if direction is desc or ascending order if direction is ascending or no direction exists
        if(dir==='desc'){
            posts.sort((a,b)=>b.id-a.id)
        }
        else {
            posts.sort((a,b)=>a.id-b.id)
        }
    }
    // sortBy reads
    if(sortBy==='reads'){
        // sort in order-descending order if direction is desc or ascending order if direction is ascending or no direction exists
        if(dir==='desc'){
            posts.sort((a,b)=>b.reads-a.reads)
        }
        else {
            posts.sort((a,b)=>a.reads-b.reads)
        }
    }
    // Sort by Likes
    if(sortBy==='likes'){
        // sort in order-descending order if direction is desc or ascending order if direction is ascending or no direction exists
        if(dir==='desc'){
            posts.sort((a,b)=>b.likes-a.likes)
        }
        else {
            posts.sort((a,b)=>a.likes-b.likes)
        }
    }
    // Sortby Popularity
    if(sortBy==='popularity'){
        // sort in order-descending order if direction is desc or ascending order if direction is ascending or no direction exists
        if(dir==='desc'){
            posts.sort((a,b)=>b.popularity-a.popularity)
        }
        else {
            posts.sort((a,b)=>a.popularity-b.popularity)
        }
    }
    return posts
}


module.exports={
removeDuplicate,
validSortOption,
validDirection,
sortPosts,
sortPostsByDirection}