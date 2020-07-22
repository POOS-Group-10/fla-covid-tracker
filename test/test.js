var assert = require('assert');
var request = require('supertest');
var server = require('../server.js');
var expect = require('chai').expect;
const { model } = require('../models/user.js');
const nodemailer = require('nodemailer');
var session = require('express-session');
const bcrypt = require('bcrypt');
const { holdReady } = require('jquery');

// const { response } = require('express');



// user registration 
describe('User Registration',function(done) {
    const user1 = {
        userName: 'yurt',
        password: 'yurt',
        userCounty: 'Duval',
        firstName: 'yurt', 
        lastName: 'yurt',
        email: 'yurt@gmail.com',
        verified: true
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

    user2 = {              
        title: 'unit testing suck',
        body: 'it really sucks',
        user: 'ho',
        county: 'Polk'
    };
    
});

// create a new post 
describe('Create a new Post', function(done) {
    user2 = {              
        title: 'unit testing suck',
        body: 'it really sucks',
        user: 'ho',
        county: 'Polk'
    };

    const agent = request.agent(server);


    it('Send', function(done){
        
        agent.post('/api/CreatePost')

        .send(user2)
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

// Logn In 
describe('Login Api', function(done) {
    user2 = {              
        userName: "ho",
        password: "ho"
    };

    const agent = request.agent(server);


    it('Check Login', function(done){
        
        agent.post('/api/Login')

        .send(user2)
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

// Get Post
describe('Get Post form DB', function(done) {
    user2 = {              
        userName: "ho"
    };

    const agent = request.agent(server);


    it('Get Post from DB', function(done){
        
        agent.post('/api/getPosts')

        .send(user2)
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

// Find User
describe('Find User form DB', function(done) {
    user2 = {              
        userName: "ho"
    };

    const agent = request.agent(server);


    it('Find User from DB', function(done){
        
        agent.post('/api/findUser')

        .send(user2)
        // .expect(200)
        .expect(function(res, err) {
            if (err) throw err; 
            expect(res.body.taken == '1')
            expect(res.statusCode == 200);
        })
        // .end(function(err){
        //     if(err) return done(err);
        // });
        done();
    })
});









