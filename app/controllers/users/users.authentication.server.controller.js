'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Signup
 */
exports.signup = function(req, res) {

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
	var user = new User(req.body),
	message = null;

	user.displayName = user.firstName + ' ' + user.lastName;

	
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: "erro"
			});
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	});
};

/**
 * Signin with passport
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.status(200).send({ message: 'logout' });
};