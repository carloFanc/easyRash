var documentiAperti = [];
var arrayListaDocumenti = [];

function verifyUserAuth() {
    if($("#userLoggedIn span").empty()){ 
    console.log(sessionStorage);
    $("#userLoggedIn span").append(sessionStorage.getItem("LoggedUser")); 
    }
}

function verifyAuthentication() {
    if (sessionStorage.length === 0) {
        location.replace("login.html");
    }
}

function logout() {
    $("#confirmLogout").click(function() {
        sessionStorage.removeItem("LoggedUser");
        location.replace("login.html");
    });
}
 
// funzione che al doppio click su un documento lo apre nel content dell'index principale
/*function openDocument(doc){
  $.ajax({
    url: doc,
    success: function(result) {
      $("#file").html(result);
    }
  });
}*/
function cambiaContenuto(string) {   //funzione che al click di un bottone nella index apre un contenuto diverso
if(string=="profile"){
        $("#page-container").load("pages/profile.html");
    }
if(string=="document"){
        $("#page-container").load("pages/document.html");
    }
if(string=="doclist"){
        $("#page-container").load("pages/doclist.html");
    }
 
} 
$(document).ready(function() {
    verifyAuthentication();
    // docToRemove();
    verifyUserAuth();
    logout();
});
