$(function() {
	var req = $.ajax({
		url : '/sentences.json', 
		method: 'get',
		dataType: 'json',
	});

	req.success(function(response) {
		console.log(response);
	});

});