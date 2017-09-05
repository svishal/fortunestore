$(function() {
    //Admin login details validations
    $("#admin_login_form").validate({
        errorElement: 'span',
        errorClass: 'error-msg',
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            email: {
                required: "Email field is required.",
                email: "Please enter a valid email address.",
            },
            password: {
                required: "Password field is required.",
                minlength: "Password field should be of min 6 characters."
            }
        }
    });

    //Admin registration form validations




    $("#admin_registration_form").validate({
        errorElement: 'span',
        errorClass: 'error-msg',
        rules: {
            name: {
                required: true,
                maxlength: 30
            },
            email: {
                required: true,
                email: true

            },
            password: {
                required: true,
                minlength: 6,
                regx: /^(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/
            },
            password_confirmation: {
                minlength: 6,
                equalTo: "#password"
            }
        },
        messages: {
            name: {
                required: "Name field is required."
            },
            email: {
                required: "Email field is required.",
                email: "Please enter a valid email address.",
            },
            password: {
                required: "Password field is required.",
                minlength: "Password field should be of min 6 characters.",
                regx: "Password field should have atleast one digit."
            },
            password_confirmation: "Enter Confirm Password same as Password."
        }
    });

    //change email into lower case

    $('#email').keyup(function() {
        var email = this.value.toLowerCase();
        $(this).val(email);
    });
    $("#email").keypress(function() {
        $("span.error-msg").hide();
    });


    $("#show_hide").click(function() {
        if ($("#password").attr("type") == "password") {
            $("#password").attr("type", "text");
            $(this).children('i').removeClass('fa-eye').addClass("fa-eye-slash");

        } else {
            $("#password").attr("type", "password");
            $(this).children('i').removeClass('fa-eye-slash').addClass("fa-eye");

        }
    });

    $("#name").keypress(function() {
        var _val = $("#name").val();
        var _txt = _val.charAt(0).toUpperCase() + _val.slice(1);
        $("#name").val(_txt);
    })


    $.validator.addMethod("regx", function(value, element, regexpr) {
        return regexpr.test(value);
    });

});