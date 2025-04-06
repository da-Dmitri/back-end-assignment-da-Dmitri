const request = require('supertest');
const express = require('express');
const app = express();

//Users API
const weburl = "localhost:3000"

// create a user:

var headers = {
    'Content-Type': 'application/json',
};
var body = JSON.stringify({
    Username: "Jane Doe",
});



describe('POST /users', function() {
    it('Creates a User', function(done) {
      request(app)
        .post('/users')
        .send({name: 'john'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
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