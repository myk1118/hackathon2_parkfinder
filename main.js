$(document).ready(initializeApp);
function initializeApp(){
    $("button").click(handleClick);
}

function handleClick(){
    var region = $(".region_form").val();
    console.log(region);
}





