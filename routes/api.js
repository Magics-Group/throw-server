var express = require('express');
var router = express.Router();

var Firebase = require('firebase');
var dataRef = new Firebase('https://luminous-inferno-104.firebaseio.com/');

 var azure = require('azure-storage');
 var blobSvc = azure.createBlobService();

/* api endpoints. */
router.get('/users', function(req, res, next) {
	res.status(200).send('users GET');
});

router.post('/users', function(req, res, next) {
	var userRef = dataRef.child('users');
	var oauth = req.query.oauth;

	//TODO require name
	userRef.once('value').then(function(snapshot) {
		//check for duplicates
		if (snapshot.child(oauth).exists()) {
			console.log('here');
			res.status(404).send('Duplicate User');
			return;
		}

		//create a user object
		var userInfo = {
			firstName: req.query.firstName,
			lastName: req.query.lastName,
			joinDate: Date()
		}

		//add it to the database
		userRef.child(oauth).set(userInfo, function(err) {
			if (err) {
				//handle error
			} else {
				//create a storage container for the user
				blobSvc.createContainerIfNotExists(oauth, function(error, result, response){
					if(!error){
						console.log('Container Created');
					} else {
						console(err);
					}
				});

				res.status(200).send('User Created');
			}
		});
	})
});

router.get('/downloads', function(req, res, next) {
	res.status(200).send('downloads GET');
});

router.post('/downloads', function(req, res, next) {
	res.status(200).send('downloadsPOST');
});

module.exports = router;
