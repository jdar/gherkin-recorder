$(function(){
	// add to page with repos only
	// first filter - only on repos pages
	// second - only on index page of repo
	// third - not on file pages
	if ($('.repository-with-sidebar').length > 0 && $('a[title="Go to parent directory"]').length == 0 && $('div.file').length == 0) {	
		$('li.subscription').before('<li><script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script><g:plusone></g:plusone></li>');
	}
});