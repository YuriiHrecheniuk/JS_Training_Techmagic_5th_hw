# TechMagic JS Training Center
## Fifth homework

The task was to create a simple server for *“authors with posts list”* application API using **Node.js + Express**.

API provides the ability to perform the following actions:
 - **add author** - *id* automatically generated (so there is no need to write it in params) - *POST /authors* + `{ "name": [name] }`
 - **remove author** - *DELETE /authors/[id]*
 - **get all existing authors** - *GET /authors*
 - **rename author** - *PUT /authors/[id]* + `{ "newName": [new name] }`
 - **get posts by author** - *GET /authors/[id]/posts*
 - **get one specific post by author** - *GET /authors/[id]/posts/[postId]*

Author object example:
```
{
    id: '12345',
    name: 'John Doe',
    posts: [
        {id: '1', text: 'Hello world'},
        {id: '2', text: 'Post number 2'}
    ]
}
```

To run the project, clone it to your project directory, run `npm i` and `npm start`. You can test the functionality by typing `npm test` into terminal or test it manually with *Postman* or other apps that create HTTP requests (request on http://localhost:3000).

Enjoy!