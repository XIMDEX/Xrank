'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Publications Schema
 */
var PublicationSchema = new Schema({
  url: String,
  votes: [{
  	val: Number,
  	comment: String,
  	voter: String
  }]
});

/**
 * Methods
 */

PublicationSchema.virtual('average').get(function(){
	var count = this.votes.length;
	if (count>0) {
	  var sum = 0;
	  for (var i=0; i<count; i++) {
	  	sum += this.votes[i];
	  }
	  return sum/count;
	} else {
		return 0;
	}
});
PublicationSchema.virtual('voteCount').get(function(){
	return this.votes.length;
});

PublicationSchema.methods.vote = function(vote, callback){
	if (!this.hasVoted(vote.voter)){
		this.votes.push(vote);
		this.save(function (err) {
	  		callback(err)
		});	
	} else {
		callback('An user can not vote twice for')
	}
};

PublicationSchema.methods.hasVoted = function(voter){
	for (var i=0; i<this.votes.length; i++) {
	  	if(this.votes[i].voter === voter) {
	  		return true;
	  	}
	}
	return false;
};
/**
 * Validations
 */
// PublicationsSchema.path('votes').validate(function (num) {
//   return num >= 0 && num <= 5;
// }, 'Awesomeness must be between 1 and 10');

mongoose.model('Publication', PublicationSchema);
