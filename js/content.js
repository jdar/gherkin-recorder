function checkAccess() {
	if ($("#submit-file").text().indexOf('Propose File Change') > 0) {
		$('#files').before(
			'<div class=" yellow octotip"> \
				<span class="octicon octicon-mark-github tip-flag"></span> \
				<p> \
					Hi! You are not allowed to edit this repo directly! Please, ask for a permission of repo owner by clicking this button ' + getButtonCode('Requst permission') +
				'</p>\
			</div>'
		);
	}
}

function getButtonCode(buttonText) {
	return '<a href="#" class="minibutton with-count js-toggler-target upwards" style="float:none;" rel="nofollow">\
				<span class="text">' +
					buttonText + 
				'</span>\
			</a>';
}

function getUniqueRepoName(url){
	var hash = 0;
	if (url.length == 0) return hash;
	for (i = 0; i < url.length; i++) {
		char = url.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

// get all varialbes for Firepad and init it;
if (document.URL.indexOf('#firepad') > 0) {
	$('.file').before('<div id="userlist"></div><div id="my_id"></div>');
	var firepadDiv = document.getElementById('my_id');
	this.firepadRef = new Firebase('https://mycustomfirebase.firebaseio.com/firepads/' + getUniqueRepoName(document.URL) + '/users/users/'); //new Firebase('https://firepad-examples.firebaseio-demo.com');
	var hasChild = false;

	this.firepadRef.once('value', function(dataSnapshot) {
		if (dataSnapshot.numChildren() !== 1) {
			hasChild = true;
		}
	});

	this.CodeMirror = CodeMirror(firepadDiv, { lineWrapping: true, lineNumbers: true,
		  mode: 'javascript' });
		        		  
	var userId = Math.floor(Math.random() * 9999999999).toString();
	
	var firepad = Firepad.fromCodeMirror(firepadRef, CodeMirror,
		{ richTextShortcuts: true, richTextToolbar: true, userId: userId });
		
    this.firepadUserList = FirepadUserList.fromDiv(firepadRef.child('users'),
        document.getElementById('userlist'), userId);			
	  
	// put the code to firepad editor after it's ready
	firepad.on('ready', function() {
		if (hasChild === false) {
			firepad.setHtml($('.ace_layer.ace_text-layer').html());
		}

		$('#submit-file').removeAttr('disabled');
	});
		
	// actions!
	$(function(){
			checkAccess();
			
			$('#submit-file').click(function(){
				$('#blob_contents').text(firepad.getText());
				$('.js-blob-contents-changed').val($('#blob_contents').text());		
			});
			
			$('.file').hide();
	});
}