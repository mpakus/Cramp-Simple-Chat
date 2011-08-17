$(document).ready(function(){
	var location = 'ws://localhost:3000';
	$('#nick').val( "Guest"+Math.floor(Math.random()*100) );	
	   
	var wsocket = new WebSocket(location);
	
	wsocket.onopen = function (e) {
		var name = $('#nick').val();
		$('#chat-log').append('<div>Entered to WS '+name+'.</div>')
	};
	
	wsocket.onclose = function() {
		$('#chat-log').append('<div>Socket closed</div>')		
	};
	
	wsocket.onmessage = function (e){
		//var data = JSONstring.toObject(e.data);
		if( e.data ) console.log( e.data );
		var data = jQuery.parseJSON( e.data );
		$(data).each(function(i,item){
			var chat_html = [];
			chat_html.push('<div class="message">');
			chat_html.push('<strong>'+item.username+' <span> say:</span></strong>');
			chat_html.push(item.message);
			chat_html.push('</div>');
			
			$('#chat-log').append(chat_html.join(' '));
			//var messages = document.getElementById("chat-log");
			//messages.scrollTop = messages.scrollHeight;
		});
	};
	
	// service
	$('#form').submit(function(){
		var serial = String(this.nick.value + '||' + this.msg.value );
		wsocket.send(serial);
		$("#msg").val("").focus();
		return false;
	})
});