'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Change Password
 */
exports.changePassword = function(req, res) {
	// Init Variables
	var passwordDetails = req.body;

	if (req.user) {
		if (passwordDetails.newPassword) {
			User.findById(req.user.id, function(err, user) {
				if (!err && user) {
					if (user.authenticate(passwordDetails.currentPassword)) {
						if (passwordDetails.newPassword === passwordDetails.verifyPassword) {
							user.password = passwordDetails.newPassword;

							user.save(function(err) {
								if (err) {
									return res.status(400).send({
										message: errorHandler.getErrorMessage(err)
									});
								} else {
									req.login(user, function(err) {
										if (err) {
											res.status(400).send(err);
										} else {
											res.send({
												message: 'Password changed successfully'
											});
										}
									});
								}
							});
						} else {
							res.status(400).send({
								message: 'Passwords do not match'
							});
						}
					} else {
						res.status(400).send({
							message: 'Current password is incorrect'
						});
					}
				} else {
					res.status(400).send({
						message: 'User is not found'
					});
				}
			});
		} else {
			res.status(400).send({
				message: 'Please provide a new password'
			});
		}
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};
