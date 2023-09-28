$(document).ready(function(){
    $(".wp-block-post-content .veepdotai-inline-editable").attr("contenteditable","true");

    $(".wp-block-post-content").append('<p id="debug">...</p>');

    const urlApi = window.location.protocol + "//" + window.location.hostname + "/wp-includes/meta.php";

    const url = window.location.protocol + "//" + window.location.hostname + "/wp-content/plugins/veepdotai_widgets/public/assets/inline-editor/inline-editor.php";

    //alert(urlApi);

    $(".veepdotai-inline-editable").click(function(){
        let id = $(this).attr("id");
        alert("Le paragraphe '" + id +"' a le focus !");
    });

    const idModifie = "";
    const newHtml = '<p id="debug">...</p>';
    const data = {idModifie, newHtml};
    $.post(url, data, function(data, status){
        if (status == "success"){
            //console.log("Success");
            //$("#debug").text(data);
        }else{
            //console.log("Echec");
        }
    });
});

function ajax_save_article_inline() {
	let form = document.getElementById( "veep_form_interview" );
	let fd   = new FormData( form );

	fd.append( 'action', 'save_article_inline' );
	fd.append( 'security', MyAjax.security );

	jQuery.ajax(
		{
			url: MyAjax.ajaxurl,
			data: fd,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function (response) {
				console.log( response );
			}
		}
	);
}