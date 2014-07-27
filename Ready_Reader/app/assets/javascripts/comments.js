$(document).ready(function(){

  $('#add_comment').on("click", function(e) {
    $('#form-fun').show();
    e.preventDefault();
    console.log("FUCK YOU HAMMER");
    console.log($('.current_sentence').text());

    $('#commentModal').modal();
  })

  $(document).on('submit', '#form_fun', function(e){
    e.preventDefault();
    var ajaxRequest = $.ajax({
      url : '/comment_on_book',
      data: {commentary: $('#comment_commentary').val(), commented_on: $('.current_sentence').text()},
      method: 'POST'
    });

    ajaxRequest.success(function(response){
      console.log("yolo");
      $('#commentModal').modal('hide');
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      // $('#new_comment').show();

    });


  })

});
