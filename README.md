# Axios-Concurrent-Requests

This code snippets shows how to make concurrnt requst using axios "Promise.all()" in express application and cache the requests

The get Url route '/api/posts' accepts multiple tags as query parameter However  lets suppose api.example only permits one tag a time.

For example user sends a request as '/api/posts?tags=History,Science'.

We will send two concurrent requests using axios Promise.all([array of requests urls]).

array of request urls is created by converting the values of tags query parameter into an array and mapping that array to create another array with request urls.

Example of array: ['api.example.com/tag=History','api.example.com?tag=Scinece']

Axios promise.all retuns a promise with the result which can be accesses using .then() block and response can be sent back to the user.
