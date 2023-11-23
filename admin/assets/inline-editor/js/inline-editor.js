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
			content = InlineEditor.extractPluginDiv(content, "addtoany");
			$(this).html(`<i class="fa fa-circle-o-notch fa-spin"></i> Validation ...`);
			$(this).attr('disabled', true);
			$("#inline-editor-annulation").attr('disabled', true);
			$("." + INLINE_EDITOR_CLASS).attr("contenteditable", false);
			ajax_save_article_inline( content , postId);
		});
		$("#inline-editor-annulation").click(function(){
			$(this).attr('disabled', true);
			$("#inline-editor-validation").attr('disabled', true);
			$("." + INLINE_EDITOR_CLASS).attr("contenteditable", false);
			InlineEditor.stopUnloadListeners();
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
		let firstEnd = str.indexOf("</div>");
		let n = Array.from(str.slice(0, firstEnd).matchAll("<div")).length;
		let lastEnd = InlineEditor.nIndexOf(str, "</div>", n);
		let m = Array.from(str.slice(firstEnd, lastEnd).matchAll("<div")).length;
		
		while (m > 0) {
			n += m;
			firstEnd = lastEnd;
			lastEnd = InlineEditor.nIndexOf(str, "</div>", n);
			m = Array.from(str.slice(firstEnd, lastEnd).matchAll("<div")).length;
		}
	
		return lastEnd + 6;
	},

	/**
	 * This function return the html string without the plugin's div. If there is no plugin's div, it will return the original html string.
	 * @param {string} html
	 * @param {string} pluginClass 
	 * @returns 
	 */
	extractPluginDiv: function(html, pluginClass) {
		const index = InlineEditor.lastIndexOfFirstDiv(html);
		const firstDiv = html.slice(0, InlineEditor.lastIndexOfFirstDiv(html));
		let result = html; 
		
		if(firstDiv.includes(pluginClass)){
			result = html.slice(index).trim();
		}

		return result;
	},

	getPostId: function(){
        let str = $("body").attr("class");
        let num = str.search("postid-");
        
        str = str.slice(num+7);
        num = str.search(" ");
        
        str = str.slice(0, num);
        num = parseInt(str);

        return num;
    },

	widget: function(){
		InlineEditor.inlineEditorInit();

		$("." + INLINE_EDITOR_CLASS).focus(function(){
			if (!InlineEditor.editMode){
				InlineEditor.initUnloadListeners();
				InlineEditor.editMode = true;
				const postId = InlineEditor.getPostId();
				InlineEditor.createEditorBtns(postId);
			}
		});
	},

	initUnloadListeners: function() {
        window.addEventListener('beforeunload', this.handleUnloadEvents);
        window.addEventListener('pagehide', this.handleUnloadEvents);
    },

	handleUnloadEvents: function(e) {
		window.prompt("Are you really sure you want to quit the application?");
        e.preventDefault();
	},

	stopUnloadListeners: function() {
		window.removeEventListener('beforeunload', this.handleUnloadEvents);
		window.removeEventListener('pagehide', this.handleUnloadEvents);
	}
}

$(document).ready(function(){
	if ($("body").attr("class").includes("logged-in")){
		InlineEditor.widget();
	}else{
		$("." + INLINE_EDITOR_CLASS).attr("contenteditable", false);
	}
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
				InlineEditor.stopUnloadListeners();
				location.reload();
			}
		}
	);
}