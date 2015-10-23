var Slack = require('slack-client')

token = 'xoxb-11014989568-HO9Hat925xdgQAtkPzkhCNcc';

var monica = new Slack(token, true, true);
var greeting = "Finally! where have you been? Im glad you were invited to Slack!  Heres a video exploring Slack https://www.youtube.com/watch?v=B6zVzWU95Sw"
var greeting_2 = "First things first, a profile picture helps people identify who you are. So put up you best pictute and show it off :grin:"
monica.on('open',function(){
	  console.log("Welcome to Slack. You are @" + monica.self.name + " of " + monica.team.name);
});


monica.on('message',function(message){
  var channel, channelError, channelName, errors, response, text, textError, ts, type, typeError, user, userName;
  channel = monica.getChannelGroupOrDMByID(message.channel);
  user = monica.getUserByID(message.user);
  response = '';
  type = message.type, ts = message.ts, text = message.text;
  channelName = (channel != null ? channel.is_channel : void 0) ? '#' : '';
  channelName = channelName + (channel ? channel.name : 'UNKNOWN_CHANNEL');
  userName = (user != null ? user.name : void 0) != null ? "@" + user.name : "UNKNOWN_USER";
 // console.log("Received: " + type + " " + channelName + " " + userName + " " + ts + " \"" + text + "\"");
  try{
	  if (text.indexOf('joined') > -1){
	  	//new user has beed added to #thecrew
	  	//send the joined user a direct message
	  	monica.openDM(user.id,function(res){
	  		console.log(res.channel.id)
	  		var dm_channel = monica.getChannelGroupOrDMByID(res.channel.id)
	  		dm_channel.send(greeting)
	  		dm_channel.send(greeting_2)
	  	});
	  }
	}catch(e){
		console.error(e)
	}
});


monica.on('error', function(error) {
  return console.error("Error: " + error);
});

monica.login()
