// This constant define which class will be "editable" ("veep_para by default")
const INLINE_EDITOR_CLASS = "veep_para";

const InlineEditor = {

	editMode : false,

	inlineEditorInit: function(){
		$("." + INLINE_EDITOR_CLASS).attr("contenteditable", true);
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
			content = InlineEditor.extractFirstDiv(content);
			$(this).attr('disabled', true);
			$("#inline-editor-annulation").attr('disabled', true);
			$("." + INLINE_EDITOR_CLASS).attr("contenteditable", false);
			ajax_save_article_inline( content , postId);
		});
		$("#inline-editor-annulation").click(function(){
			$(this).attr('disabled', true);
			$("#inline-editor-validation").attr('disabled', true);
			$("." + INLINE_EDITOR_CLASS).attr("contenteditable", false);
			location.reload();
		});
	},

	nIndexOf: function(haystack, needle, n){
		let result;
		let start = 0;
		for (let i=0; i<n; i++) {
			result = haystack.indexOf(needle, start);
			if (result >= 0) {
				start = result+1;
			}
		}
		return result;
	},

	lastIndexOfFirstDiv: function(str) {
		let index = str.indexOf("</div>");
		let n;
		if (index >= 0){
			n = Array.from(str.slice(0, index).matchAll("<div")).length;
			index = InlineEditor.nIndexOf(str, "</div>", n) + 6;
		}
		return index;
	},

	extractFirstDiv: function(str) {
		let index = lastIndexOfFirstDiv(str);
		return str.slice(index).trim();
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