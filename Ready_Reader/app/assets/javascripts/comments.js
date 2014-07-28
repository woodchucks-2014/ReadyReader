$(document).ready(function(){

  $('#add_comment').on("click", function(e) {
    e.preventDefault();
    $('#form-fun').show();
    $('#commentModal').modal();
  })

  $('#comment_view_click').on("click", function(e) {
    e.preventDefault();
    $('#commentViewModal').modal();
  })

  $('#close_comment_view').on("click", function(e) {
    e.preventDefault();
    $('#commentViewModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  })

  $(document).on('submit', '#form_fun', function(e){
    e.preventDefault();
    var ajaxRequest = $.ajax({
      url : '/comment_on_book',
      data: {commentary: $('#comment_commentary').val(), commented_on: $('.current_sentence').text()},
      dataType: 'json',
      method: 'POST'
    });

    ajaxRequest.success(function(response){
      console.log("HI FRIENDS");
        // necessary to make modal disappear post click
        $('#commentModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#new_comments').append('<p> '+response.passage+'</p>')
        $('#new_comments').append('<p> '+response.author+' wrote at '+response.datetime+'</p>')
        $('#new_comments').append('<p> '+response.comment+'</p>')
        $('#new_comments').append('<p> ************************</p>')
    });


  })

});
