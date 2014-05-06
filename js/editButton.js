$(function(){
	$('a').click(function() {
		window.location = $(this).attr('href');
	});
	
	// get edit url
	url = $('#raw-url').prev().attr('href');

	// add special edit button with #firepad in the end
	$('#raw-url').before('<a data-hotkey="e" rel="nofollow" data-method="post" href="' + url + '#firepad" class="minibutton">Edit with Firepad</a>');
});