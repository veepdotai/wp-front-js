$(document).ready(function(){

    $("#getBtn").click(function(){
        
        $.get("getJsonPexels.php", function(json, status){
            
            if (status == "success"){
                $("p").text("this is fine");
                let photos = extractionPhotos(json);
                ajoutPhotos(photos, "demo");
            }else{
                $("p").append("ERROR");
            }
        });
    });
});