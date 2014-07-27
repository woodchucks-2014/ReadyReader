function get_cp(point){
  console.log('yaaaaa');

  var ajax2 = $.ajax({
    url : '/check_point',
    method : 'POST',
    data : { last_point: localStorage['last_point'] }
  });


  ajax2.success(function(response){
    server_response = response["farthest_point"];
    return server_response;

  });
}


// $(document).ready(function(){
//   console.log('yolo from check point')

//   // setInterval(function(){get_cp();}, 400);
// });
