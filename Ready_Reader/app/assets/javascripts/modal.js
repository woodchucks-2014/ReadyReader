$(document).ready(function () {
  var modal_window = $('#modal-window');
  $('a[rel=modal]').on('click', function (e) {
    var scroll_position = $(window).scrollTop(),
         return_position = false;

    e.preventDefault();

    modal_window.modal({
      'remote': $(this).attr('href') + ' #modal-target'
    }).on('show', function () {
      if (modal_window.css('position') === 'absolute') {
        return_position = true;
        $(window).scrollTop(modal_window.offset().top);
      }
    }).on('hidden', function () {
      if (return_position) {
        $(window).scrollTop(scroll_position);
      }
    }).modal('show');
  });
});
