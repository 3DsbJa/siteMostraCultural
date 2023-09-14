const navbar = document.getElementById("navBar")
function ativarMenu(){
    if(document.getElementById('ativar-menu').checked){
        navbar.style.visibility = "visible";
        navbar.style.marginLeft = "50vw"
    }else{
        navbar.style.marginLeft = "150vw"
    }
}
