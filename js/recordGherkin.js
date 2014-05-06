//TODO: 
function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}
$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

//TODO: instead of 'console.log' all of these should go to the popup.html, for easy copy-paste
$(function(){
	console.log("url should be %o", window.location.pathname);

        $('input').enterKey(function(e){
          console.log("I press enter");
        });
	$('a').click(function(e) {
          //console.log("I visit %o", $(e.target).attr("href"));
          console.log("I click %o", $(e.target).text());
	});
        $('select').change(function(e){
          console.log("I select %o", $(e.target).val());
        });
        $(":text, :password").change(function(e){
          var label = $('label[for="'+ $(e.target).attr('id')+'"]');
          console.log("I fill in %o with %o", label.text(), $(e.target).val());
        });

        $(':checkbox').change(function(e){
	  //if (e.val()) {
             console.log("I check %o", $(e.target).text());
	  //} else if {
          //   console.log("I uncheck %o", $(e.target).text());
	  //}
        });

        //TODO: things other than 'p'
        $('p').mouseup(function() {
          var text=getSelectedText();
          if (text!='') { 
             console.log("I see %o", $.trim(text));
          }
        });

	$('submit').click(function(e) {
		console.log("I click %o", $(e.target));
	});
});
