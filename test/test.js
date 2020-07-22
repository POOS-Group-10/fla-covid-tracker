var assert = require('assert');
var request = require('supertest');
var server = require('../server.js');
var expect = require('chai').expect;
const { model } = require('../models/user.js');
const nodemailer = require('nodemailer');
var session = require('express-session');
const bcrypt = require('bcrypt');

// const { response } = require('express');



// user registration 
describe('User Registration',function(done) {
    // Clear data before testing
    const user1 = {
        userName: 'yurt',
        password: 'yurt',
        userCounty: 'Duval',
        firstName: 'yurt', 
        lastName: 'yurt',
        email: 'yurt@gmail.com',
        verified: true
    };

    user2 = {              
        title: 'unit testing suck',
        body: 'it really sucks',
        user: 'ho',
        county: 'Polk'
      };

      
    const agent = request.agent(server);
    
    it('Should sign up a user', function(done){
        
        agent.post('/api/SignUp')

        .send(user1)
        .expect(200)
        .expect(function(res, err) {
            if (err) throw err; 
            expect(res.statusCode == 200);
        })
        // .end(function(err){
        //     if(err) return done(err);
        // });

        done();
    })

    
});









   // function createUser1(cb){
    //     agent1
    //         .post('/api/SignUp')
    //         .send(user1)
    //         .expect(200)
    //         .end(function(err, res){
    //             if ( err ) throw err;

    //             // loginUser1.call(null, cb);
    //         });
    // }

    // function loginUser1(cb){
    //     agent1
    //         .post('/api/session')
    //         .send({
    //             email: user1.email
    //             , password: user1.password
    //         })
    //         .expect(200)
    //         .end(function(err, res){
    //             if ( err ) throw err;

    //             loggedInUser1 = res.body;

    //             cb();
    //         });
    // }

    // async.series([function(cb){
    //     createUser1(cb);
    // }], done);

