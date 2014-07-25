$(document).ready(function(){
  $(document).on('submit', 'form', function(e){
    e.preventDefault();
    console.log("yolo");
    var ajaxRequest = $.ajax({
      url : '/comment_on_book',
      data: {commentary: $('#comment_commentary').val(), commented_on: $('.current_sentence').text()},
      //{form: $('form').serialize(), commented_on: $('.current_sentence').text()},
      method: 'POST'
    });

    ajaxRequest.success(function(response){
      console.log("yolo");

    });


  })

});
