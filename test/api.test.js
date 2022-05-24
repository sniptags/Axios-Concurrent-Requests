const request=require('supertest')
const app=require('../index')

// Api/ping test expect status 200
test('API ping Successfull',async()=>{
    await request(app)
    .get('/api/ping')
    .expect(200)
})

// api/posts test with no tags

test("API should not work without tags parameters",async()=>{
    await request(app).get('/api/posts')
    .expect(400)
})

// api/posts request with valid tags parameter
test('API sends valid data',async ()=>{
    const response=await request(app).get('/api/posts?tags=tech')
    .expect(200)
    .expect('Content-Type','application/json; charset=utf-8')
    if(response.body.length!==0){
    expect(response.body[0].author).toBeDefined()
    }
})

// api/posts request test with invalid tags
test('API sends no data with invalid tags',async ()=>{
    const response=await request(app).get('/api/posts?tags=invalid,none,lorem')
    .expect(200)
    .expect('Content-Type','application/json; charset=utf-8')
    expect(response.body).toEqual([])
})

//api/posts request with invalid sortBy parameter
test('API sends error no invalid sortBy Parameter',async()=>{
    const response=await request(app).get('/api/posts?tags=tech&sortBy=name')
    .expect(400)
    expect(response.body.error).toBe('sortBy Parameter is Invalid')
})

// api/posts request with invalid direction parameter
test('API sends error no invalid direction Parameter',async()=>{
    const response=await request(app).get('/api/posts?tags=tech&sortBy=id&direction=none')
    .expect(400)
    expect(response.body.error).toBe('Direction Parameter is Invalid')
})