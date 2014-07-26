$(document).ready(function () {
  var modal_window = $('#modal-window');
  $('a[rel=modal]').on('click', function (e) {
    var scroll_position = $(window).scrollTop(), // Where did we start in the window.
         return_position = false; // Should we return to the start position?

    e.preventDefault();

    // Build and show the modal.
    modal_window.modal({
      'remote': $(this).attr('href') + ' #modal-target' // Get remote content from the link.
    }).on('show', function () {
      if (modal_window.css('position') === 'absolute') {
        // We will need to return to where we were.
        return_position = true;
        // Jump to the top of the modal.
        $(window).scrollTop(modal_window.offset().top);
      }
    }).on('hidden', function () {
      if (return_position) {
        // Return to where we were.
        $(window).scrollTop(scroll_position);
      }
    }).modal('show');
  });
});
