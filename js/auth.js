$(document).ready(function () {


    function login() {

        var email = $("#email").val();
        var password = $("#psw").val();
        var data = 'email=' + email + '&psw=' + password;
        if ((email == 0) && (password == 0)) {
            $("#email").effect("shake");

            $("#psw").effect("shake");

        } else if (password == 0) {
            $("#psw").effect("shake");
        } else if (email == 0) {
            $("#email").effect("shake");
        } else if (!validateEmail(email)) {
            $("#email").effect("pulsate");
        } else {

            $.ajax({
                type: 'POST',
                url: 'php/login.php',
                data: data,
                dataType: 'html',
                success: function (data) {
                    if (data == '1') {
                        sessionStorage.setItem("LoggedUser", email);
                        location.replace("index.html");

                    } else if (data == '0') {
                        $(".login").html("<div class='alert alert-danger'><a href='javascript:window.location.href=window.location.href' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Utente inesistente!</strong> Riprova inserendo le credenziali corrette</div>");
                    }
                },
                error: function () {
                    alert("Error!");
                }
            });
        }
    }

    $('#checkUser').click(function () {
        login();
    });

    document.onkeydown = function (e) {
        var keyCode = e.keyCode;
        if (keyCode == 13) {
            login();
        }
    };

    $("#checkSignUp").click(function () {
        var name = $("#nameNewUser").val();
        var lastName = $("#lastnameNewUser").val();
        var email = $("#emailNewUser").val();
        var password = $("#pswNewUser").val();
        var confirmPsw = $("#confirmpsw").val();
        var genders = document.getElementsByName('gender');

        for (var i = 0; i < genders.length; i++) {
            if (genders[i].checked) {
                var sex = genders[i].value;
            }
        }

        var data_string = 'name=' + name + '&lastName=' + lastName + '&email=' + email + '&lastName=' + lastName + '&password=' + password + '&sex=' + sex;

        if (password != confirmPsw) {
            $("#confirmpsw").effect("highlight");
        }
        if (name == 0) {
            $("#nameNewUser").effect("highlight");
        }
        if (lastName == 0) {
            $("#lastnameNewUser").effect("highlight");
        }
        if (email == 0) {
            $("#emailNewUser").effect("highlight");
        }
        if (password == 0) {
            $("#pswNewUser").effect("highlight");
        }
        if (confirmPsw == 0) {
            $("#confirmpsw").effect("highlight");
        }
        if ($("#divGender input:radio:checked").length == 0) {
            $("#divGender input:radio").effect("pulsate");
        }
        if (!validateEmail(email) && email != 0) {
            $("#emailNewUser").effect("pulsate");
        }

        if ((password == confirmPsw) && (name != 0) && (lastName != 0) && (validateEmail(email)) && (password != 0) && (confirmPsw != 0) && ($("#divGender input:radio:checked").length > 0)) {
            $.ajax({
                type: 'POST',
                url: 'php/registration.php',
                data: data_string,
                dataType: 'html',
                success: function (data) {
                    if (data == '1') {
                        $(".modal-body").html("<div class='alert alert-success'><strong>Creazione nuovo utente effettuata! Attendi email di verifica.</strong></div>");
                    } else if (data == '0') {
                        alert("Errore email gia esistente!");
                    }
                },
                error: function () {
                    alert("Error sending data!");
                }
            });
        }

    });


    $("#resetField").click(function () {
        $("#nameNewUser").val("");
        $("#lastnameNewUser").val("");
        $("#emailNewUser").val("");
        $("#pswNewUser").val("");
        $("#confirmpsw").val("");
        $("input:checked").removeAttr("checked");

    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

});