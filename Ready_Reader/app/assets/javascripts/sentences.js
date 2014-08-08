var getSentences = function(response) {
	var req = $.ajax({
		url : '/sentences.json', 
		method: 'get',
		dataType: 'json',
		success: function(response) {
		result = response;
		}
	});
	// return response;
}
