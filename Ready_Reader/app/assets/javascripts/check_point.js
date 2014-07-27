$(document).ready(function(){
  console.log('yolo from check point')
  function get_cp(){
    var ajax2 = $.ajax({
      url : '/check_point',
      method : 'POST',
      data : { last_point: localStorage['last_point'] }
    });

    // ajax2.complete(function(response){
    //   repeat(function(){get_cp();}, 2000);
    //   console.log('yolo repeat')
    // });
  }
  setInterval(function(){get_cp();}, 400);
});
