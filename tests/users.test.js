const { response } = require("../app");

//Users API
const weburl = "localhost:3000"

// create a user:

var headers = {
    'Content-Type': 'application/json',
};
var body = JSON.stringify({
    Username: "Jane Doe",
});



test('Create User Jane Doe', () => {
    return fetch(weburl+"/users/new", {method: "POST", headers: headers, body: body })
    .then(response => {
        expect(response.Username).toBe('Jane Doe');
    })
});

// get the user id by name and delete it
test('Destroy User Jane Doe', () => {
    return fetch(weburl+"/users/?Username=Jane Doe", {method: "GET"})
    .then(idresponse => {
        let janeID = idresponse.ID
        return fetch(weburl+"/users?id="+janeID, {method: "DELETE", headers})
    })
    .then(response => {
        expect(response.error).toBe('User Deleted');
    })
})