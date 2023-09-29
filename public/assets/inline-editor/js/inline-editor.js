$(document).ready(function(){
    $(".wp-block-post-content .veepdotai-inline-editable").attr("contenteditable","true");

    $(".wp-block-post-content").append('<p id="debug">...</p>');

    const url = window.location.protocol + "//" + window.location.hostname + "/wp-content/plugins/veepdotai_widgets/public/assets/inline-editor/inline-editor.php";

    //alert(urlApi);

    $(".veepdotai-inline-editable").blur(function(){
        //let id = $(this).attr("id");
        //alert("Le paragraphe '" + id +"' a perdu le focus !");
        const postId = VeepdotaiCarousel.getPostId();
        const content = $(".wp-block-post-content").html();
        ajax_save_article_inline( content , postId);
    });
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
			}
		}
	);
}