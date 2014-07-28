$(document).ready(function() {

  if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {

    $('.modal').on('show.bs.modal', function() {

        // Position modal absolute and bump it down to the scrollPosition
        $(this)
            .css({
                position: 'absolute',
                marginTop: $(window).scrollTop() + 'px',
                bottom: 'auto'
            });

        // Position backdrop absolute and make it span the entire page
        //
        // Also dirty, but we need to tap into the backdrop after Boostrap
        // positions it but before transitions finish.
        //
        setTimeout( function() {
            $('.modal-backdrop').css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: Math.max(
                    document.body.scrollHeight, document.documentElement.scrollHeight,
                    document.body.offsetHeight, document.documentElement.offsetHeight,
                    document.body.clientHeight, document.documentElement.clientHeight
                ) + 'px'
            });
        }, 0);

    });

}


  $('#signup').on("click", function(e) {
    e.preventDefault();
    $('#signupModal').modal();
  })

  $('#login').on("click", function(e) {
    e.preventDefault();
    $('#loginModal').modal();
  })




});
