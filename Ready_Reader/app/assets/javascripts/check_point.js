function get_cp(){
  var ajax2 = $.ajax({
    url : '/check_point',
    method : 'POST',
    data : { last_point: localStorage['last_point'] }
  });

  ajax2.complete(function(response){
    console.log(response.responseText);
  });
}

// $(document).ready(function(){
//   console.log('yolo from check point')

//   // setInterval(function(){get_cp();}, 400);
// });
