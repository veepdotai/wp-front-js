
const InlineEditor = {

	editMode : false,

	createEditorBtns: function(postId){
		const str = `
			<div id="inline-editor-btn-container">
				<button id="inline-editor-validation">Valider</button>

				<button id="inline-editor-annulation">Annuler</button>
			</div>
		`; 
		$("body").append(str);

		$("#inline-editor-validation").click(function(){
			let content = $(".wp-block-post-content").html();
			ajax_save_article_inline( content , postId);
		});
		$("#inline-editor-annulation").click(function(){
			$("#inline-editor-btn-container").remove();
			location.reload();
		});
	},

	widget: function(){
		$(".wp-block-post-content .veepdotai-inline-editable").attr("contenteditable","true");
	
		//$(".wp-block-post-content").append('<p id="debug">...</p>');

		$(".veepdotai-inline-editable").focus(function(){
			if (!InlineEditor.editMode){
				InlineEditor.editMode = true;
				const postId = VeepdotaiCarousel.getPostId();
				InlineEditor.createEditorBtns(postId);
			}
		});
	}
}

$(document).ready(function(){
	InlineEditor.widget();
});

function ajax_save_article_inline( content , postId ) {
	let fd = new FormData();

    fd.append( 'content' , content );
    fd.append( 'postId' , postId );

	fd.append( 'action' , 'save_article_inline' );
	fd.append( 'security' , MyAjax.security );

	jQuery.ajax(
		{
			url: MyAjax.ajaxurl,
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function( response ) {
				console.log( "Article " + response + "update");
				$("#inline-editor-btn-container").remove();
				location.reload();
			}
		}
	);
}