function show_validate() {
    var flg = true;
    var show_name = $('#show_name').val();
    if (show_name == '') {
        $(window).scrollTop(200);
        $('.show_name-error').text('Name field is required.');
        flg = false;
    }
    return flg;
}

function show_form_validate() {
    var flg = true;
    var form_title = $('#form_title').val();
    var form_content = $('#form_content').val();
    if (form_title == '') {
        $(window).scrollTop(200);
        $('.show_form_title_error').text('Title field is required.');
        flg = false;
    }
    if (form_content == '') {
        $(window).scrollTop(200);
        $('.show_form_body_error').text('Body field is required.');
        $('.show_form_body_error').parent().addClass('form_body_textarea_error');
        flg = false;
    }
    return flg;
    $('#form_content').parent().removeClass('form_body_textarea_error');
}


$(document).ready(function() {
    $('#btn_show_next').on('click', function() {
        var flg = show_validate();
        if (flg == false) {
            return false;
        } else {
            $('#createShow-nav a[href="#addForms"]').tab('show');
        }
    });

    $('#show_name').keyup(function() {
        var _val = $("#show_name").val();
        var _txt = _val.charAt(0).toUpperCase() + _val.slice(1);
        $("#show_name").val(_txt);
        $('.show_name-error').text('');
    });

    $('#save_only_show').on('click', function() {
        var flg = show_validate();
        if (flg == false) {
            return false;
        } else {
            $("#show_draft").val('1');
            $("#add_show_form").submit();
        }
    });

    $('#back_to_show').on('click', function() {
        $('#createShow-nav a[href="#information"]').tab('show');
    });

    //Code of save the form in Add form tab of create show start
    $('#save_form').on('click', function() {
        var flg = show_form_validate();
        if (flg == false) {
            return false;
        } else {

            $("#form_title").val("");
            $("#form_content").val("");
            flg == true;

        }

    });


    $('#form_title').keyup(function() {
        $('.show_form_title_error').text('');
    });

    $('#form_content').keyup(function() {
        $('.show_form_body_error').text('');
        $('#form_content').parent().removeClass('form_body_textarea_error');
    });


    //Code of save the form in Add form tab of create show end

    //Code of Discrad the form in Add form tab of create show start
    $('#dicard_form').on('click', function() {
        $("#form_title").val("");
        $("#form_content").val("");
        $('.show_form_body_error').text('');
        $('.show_form_title_error').text('');
        $('#form_content').parent().removeClass('form_body_textarea_error');
    });
    //Code of Discrad the form in Add form tab of create show end

    /* Add More users jquery start */
    $("#add_more_users").click(function(e) { //Add user on click add more button
        e.preventDefault();

        $("#add_more_users_wrap").append('<div class="row user_row"><div class="col-sm-6"> <div class="form-group"><label class="hidden-sm-up">Email</label> <input type="text" class="form-control"> </div></div><div class="col-sm-6"><div class="form-group"><label class="hidden-sm-up">Name (Optional)</label> <input type="Email" class="form-control"><a href="javascript:void(0);" class="remove_user"><i class="fa fa-trash"></i></a> </div></div> </div>'); //add input box

    });

    $("#add_more_users_wrap").on("click", ".remove_user", function(e) { //Remove user on click
        e.preventDefault();
        $(this).parent().parent().parent('.user_row').remove();

    });

    /* Add More users jquery end */


})