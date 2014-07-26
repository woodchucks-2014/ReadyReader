$(document).ready(function(){
  $(document).on('submit', '#form_fun', function(e){
    e.preventDefault();
    var ajaxRequest = $.ajax({
      url : '/comment_on_book',
      data: {commentary: $('#comment_commentary').val(), commented_on: $('.current_sentence').text()},
      //beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      method: 'POST'
    });

    ajaxRequest.success(function(response){
      console.log("yolo");
      $('#form_fun').remove();
      $('#new_comment').show();

    });


  })

});
