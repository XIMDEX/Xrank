'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto'),
    Publication = mongoose.model('Publication');

/**
 * Get awesome things
 */
exports.vote = function(req, res) {
	try {
		var url = req.body.data.publication;
		var val = req.body.data.val;
		if (!req.cookies.xrank_id) {
			var xrank_id = crypto.randomBytes(20).toString('hex');
			res.cookie('xrank_id', xrank_id);
		}
		console.log("AFTER", xrank_id);
	} catch (err) {
		console.error(err);
  		res.send(400, 'Bad request, an url and a vote value should be sent');
	} 
		
	var vote = function (publication, val) {
		publication.vote({val: parseInt(val), voter: req.cookies.xrank_id || xrank_id}, function(err){
			if(err) {
				res.send(401, "You can not vote twice");	
			} else {
				res.send({notice: "Yout vote has been counted"});
			}
		});
	};

	if (url && val) {
		Publication.find({url: url}, function(err, publications){
			if (err) {
				console.error("ERROR: Finding publication: ", url);
			} 
			if (publications.length) {
				vote(publications[0], val);
			} else {
				var publication = new Publication({
					url: url,
					votes: []
				});
				publication.save(function (err) {
			  		if (err){
			  			console.log("NOT SAVED", err);
			  		} else {
			  			console.log("PUB SAVED", url);
			  			vote(publication, val);
			  		}
				});	
			}
		});
	}
};

exports.publications = function(req, res) {
	return Publication.find(function (err, publications) {
	  if (!err) {
	    return res.send(publications);
	  } else {
	    return res.send(err);
	  }
	});
};