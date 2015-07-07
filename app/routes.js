var create = require ('./create.js');
var view = require ('./view.js');
var next = require ('./next.js');
var select = require ('./select.js');
var toss = require ('./toss.js');
var complete = require ('./complete.js');
var find = require ('./find.js');
var getSelected = require('./get.js');
var tag = require ('./tag.js');

module.exports = function(app, passport) {


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });

    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/next', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/next', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // Create SECTION =====================
    // =====================================
    app.get('/create', isLoggedIn, function(req, res) {

            res.render('create.ejs', {
                message: req.flash('createMessage'),
                user : req.user, // get the user out of session and pass to template
                boomerang: undefined
            });

    });


    app.post('/create', isLoggedIn, function(req, res) {

        create.execute(req,req.user, function(newBoomerang){

                res.render('create.ejs', {
                    message: req.flash('createMessage'),
                    user : req.user, // get the user out of session and pass to template
                    boomerang: newBoomerang
                });
        });
    });

    // =====================================
    // get SECTION =====================
    // =====================================
    app.get('/get', isLoggedIn, function(req, res) {

        getSelected.execute(req, req.user, function(data){

            res.render('view.ejs', {
                message: req.flash('viewMessage'),
                user : req.user, // get the user out of session and pass to template
                boomerang : data
            });

        });

    });


    // =====================================
    // next SECTION =====================
    // =====================================
    app.get('/next', isLoggedIn, function(req, res) {

        next.execute(req, req.user, function(data){

            res.render('next.ejs', {
                message: req.flash('viewMessage'),
                user : req.user, // get the user out of session and pass to template
                boomerang : data
            });

        });

    });

    // =====================================
    // select SECTION =====================
    // =====================================
    app.post('/select', isLoggedIn, function(req, res) {

        select.execute(req, req.user, function(data){

            res.render('next.ejs', {
                message: req.flash('viewMessage'),
                user : req.user, // get the user out of session and pass to template
                boomerang : data
            });

        });

    });

    // =====================================
    // complete SECTION =====================
    // =====================================
    app.post('/complete', isLoggedIn, function(req, res) {

        complete.execute(req, req.user, function(){

            res.writeHead(302, {'Location': '/next'});
            res.end();

        });

    });

    // =====================================
    // toss SECTION =====================
    // =====================================
    app.post('/toss', isLoggedIn, function(req, res) {

        toss.execute(req, req.user, function(data){

            res.render('next.ejs', {
                message: req.flash('viewMessage'),
                user : req.user, // get the user out of session and pass to template
                boomerang : data
            });

        });

    });

    // =====================================
    // tagged SECTION =====================
    // =====================================
    app.get('/tagged', isLoggedIn, function(req, res) {

        tag.getTagged(req, req.user, function(data) {
            res.render('find.ejs', {
                message: req.flash('viewMessage'),
                user: req.user,
                boomerangs: data
            });
        });


    });

    // =====================================
    // find SECTION =====================
    // =====================================
    app.get('/find', isLoggedIn, function(req, res) {

            res.render('find.ejs', {
                message: req.flash('viewMessage'),
                user : req.user,
                boomerangs: undefined
            });


    });

    app.post('/find', isLoggedIn, function(req, res) {

        find.execute(req, req.user, function(data) {
            res.render('find.ejs', {
                message: req.flash('viewMessage'),
                user: req.user,
                boomerangs: data
            });
        });

    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}