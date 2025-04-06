In order to test out the API using POSTMAN

Follow this link:
https://app.getpostman.com/join-team?invite_code=d8bb20182405b4b1b737f1013ee63cb974d3ded615dd8885526120b1feab3cac&target_code=d914bc97b768c30c725584cd1d414ef2
It will take you to my postman workspace
you can then see UserAPI, PostAPI, etc

navigate to the directory of the app
run the local debug server using
	npm install
	SET DEBUG=backendassignment:* & npm start

Now you the server is running, and you can check out the apis to create and modify users and posts
below is the usage of the apis, as well as in postman



=== Users ===

GET /users/
    [query] id - the numerical id of the user
    [query] Username - or the name of the user as a string

POST /users/new/
    [json] Username - the name of the new user to be added

PUT /users/edit/
    [query] id - numerical id of an existing user
    [json] Username - the new name for the user

DELETE /users/
    [query] id - the numerical id of an existing user to remove




=== Posts ===

GET /posts/
    [query] id - the id of the posts

POST /posts/
    [json] content - the contents of the posts
    [json] as - id of the user creating the post

POST /posts/reply
    [query] id -  post to reply to
    [json] content - the contents of the post
    [json] as - user creating the post

PUT /posts/
    [query] id - numerical id of an existing posts
    [json] content - the new contents of the posts

DELETE /posts/
    [query] id - numerical id of an exiting post to remove




=== Likes ===

GET /likes/
    [query] id - numerical id of the post to return number of likes

GET /like/
    [query] id - numerical id of the post to like
    [query] as - user id liking the post

GET /unlike/
    [query] id - numerical id of the post
    [query] as - user id unliking the post