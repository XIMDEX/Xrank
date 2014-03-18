'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Publications Schema
 */
var VoteSchema = new Schema({
  val: Number,
  comment: String,
  voter: String
});

var PublicationSchema = new Schema({
  url: String,
  votes: [VoteSchema]
});


/**
 * Virtuals
 */

PublicationSchema.virtual('average').get(function(){
	var count = this.votes.length;
	if (count>0) {
	  var sum = 0;
	  for (var i=0; i<count; i++) {
	  	sum += this.votes[i].val;
	  }
	  return (sum/count).toFixed(1);
	} else {
		return 0;
	}
});

PublicationSchema.virtual('voteCount').get(function(){
	return this.votes.length;
});

/**
 * Methods
 */

PublicationSchema.methods.vote = function(vote, callback){
	var voted = this.hasVoted(vote.voter)
	if (!voted){
		this.votes.push(vote);
		this.save(function (err) {
	  		callback(err)
		});	
	} else {
		voted.val = vote.val;
		this.save(function (err) {
	  		callback(err)
		});		
	}
};

PublicationSchema.methods.hasVoted = function(voter){
	for (var i=0; i<this.votes.length; i++) {
	  	if(this.votes[i].voter == voter) {
	  		return this.votes[i];
	  	}
	}
	return false;
};

PublicationSchema.methods.getValoration = function(voter){
	if (voter) {	
		for (var i=0; i<this.votes.length; i++) {
		  	if(this.votes[i].voter == voter) {
		  		return this.votes[i].val;
		  	}
		}
	}
	return false;
};

/**
 * Validations
 */
 
VoteSchema.path('val').validate(function (num) {
  return num >= 1 && num <= 5;
}, 'The vote must be between 1 and 5');

mongoose.model('Publication', PublicationSchema);
