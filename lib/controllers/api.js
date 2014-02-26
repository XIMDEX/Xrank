'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto'),
    Publication = mongoose.model('Publication');

/**
 * Get awesome things
 */
exports.vote = function(req, res) {
	var url = req.body.publication;
	var val = req.body.val;
	if (!req.cookies.xrank_id) {
		var xrank_id = crypto.randomBytes(20).toString('hex');
		res.cookie('xrank_id', xrank_id);
	}		
	var vote = function (publication, val) {
		publication.vote({val: parseInt(val), voter: req.cookies.xrank_id || xrank_id}, function(err){
			if(err) {
				res.send(401, "You can not vote");	
			} else {
				res.send({notice: "Yout vote has been counted"});
			}
		});
	};

	if (url && val) {
		Publication.find({url: url}, function(err, publications){
			if (err) {
				res.send(500, 'Database error');
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
			  			res.send(500, 'Database error');
			  		} else {
			  			vote(publication, val);
			  		}
				});	
			}
		});
	} else {
  		res.send(400, 'Bad request, an url and a vote value should be sent');
	}

};

exports.publication = function(req, res) {
	var url = req.body.publication;
	if(url) {
		return Publication.find({url:url}, function (err, publications) {
		  if (publications.length) {
		  	var publication = publications[0];
		    return res.send({
		    	publication: {
		    		user_val: publication.getValoration(req.cookies.xrank_id),
		    		average: publication.average,
		    		count: publication.voteCount
		    	}
		    });
		  } else {
		    return res.send({notice:"The publication is not in the database"});
		  }
		});
	} else {
		return res.send(400);	
	}
};