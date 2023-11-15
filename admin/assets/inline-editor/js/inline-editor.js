// This constant define which class will be "editable" ("veep_para by default")
const INLINE_EDITOR_CLASS = "veep_para";

const InlineEditor = {

	editMode : false,

	inlineEditorInit: function(){
		$("." + INLINE_EDITOR_CLASS).attr("contenteditable", "true");
	},

	createEditorBtns: function(postId){
		const str = `
			<div id="inline-editor-btn-container">
				<button id="inline-editor-validation" class="inline-editor-btn color-pr">Valider</button>

				<button id="inline-editor-annulation" class="inline-editor-btn color-sc">Annuler</button>
			</div>
		`; 
		$("body").append(str);

		$("#inline-editor-validation").click(function(){
			let content = $(".wp-block-post-content").html();
			$(this).attr('disabled', true);
			$("#inline-editor-annulation").attr('disabled', true);
			ajax_save_article_inline( content , postId);
		});
		$("#inline-editor-annulation").click(function(){
			$(this).attr('disabled', true);
			$("#inline-editor-validation").attr('disabled', true);
			location.reload();
		});
	},

	widget: function(){
		InlineEditor.inlineEditorInit();

		$("." + INLINE_EDITOR_CLASS).focus(function(){
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
				location.reload();
			}
		}
	);
}