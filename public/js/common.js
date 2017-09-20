$(function () {  
  $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
    $('#customer_list').DataTable();
    $('#fos_list').DataTable();
    $('#balance_history').DataTable();
    $('#purchase_history').DataTable();
    
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    })
     //Initialize Select2 Elements
    $('.select2').select2()

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass   : 'iradio_minimal-blue'
    })
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
      checkboxClass: 'icheckbox_minimal-red',
      radioClass   : 'iradio_minimal-red'
    })
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })
    //Date picker
    $('#datepicker').datepicker({
      autoclose: true,
      format: 'dd-mm-yyyy'
    });
    $('#edit_date_of_joining').datepicker({
      autoclose: true,
      format: 'dd-mm-yyyy'
    });
    
    $(document).on('click','#add_customer_button',function(){
      var mobile_number = $('#mobile_number').val();
      var balance = $('#balance').val();
      var validate_mobile_number=true;
      var validate_balance=true;
      var validate_balance_type=true;
      var validate_all_values = true;
      if(mobile_number.length<1)
        validate_mobile_number = false;
      if(balance.length<1)
        validate_balance = false;
      
      if(isNaN(balance))
        validate_balance_type= false;

      if(!balance.match(/^\d+$/))
         validate_balance_type= false;

      if(!validate_mobile_number){
      $('.mobile_number_error').html('Mobile Number is Required');
        validate_all_values = false;
      }
      if(!validate_balance){
      $('.balance_error').html('Balance is Required');
        validate_all_values = false;
      }
      if(!validate_balance_type){
      $('.balance_error').html('Balance should be numeric');
        validate_all_values = false;
      }
      if(validate_all_values){
       $("#add_customer_form").submit();
      }else{
       return false;
      }
    });
    $(document).on('click','#edit_customer',function(){ 
      var customer_id = $(this).attr("data-id");
      $("#customer_edit_id").val(customer_id);
      $.ajax({
      type: 'GET',
      async: false,
      url: '/get_customer_info?customer_id=' + customer_id,
      success: function (response) {
        if(response['name']===null){
           $(".customer-name").text("Edit Customer");
        }else{
           $(".customer-name").text(response['name']);
        }
        $("#customer_edit_id").val(customer_id);
        $("#edit_customer_name").val(response['name']);
        $("#edit_mobile_no").val(response['mobile_no']);
        $("#edit_address").val(response['address']);
        $("#edit_date_of_joining").val(response['doj']);
       },
      error: function (message) {
       }
      });
    });
     $(document).on('click','#edit_customer_button',function(){ 
      var mobile_number = $('#edit_mobile_no').val();
      var validate_mobile_number=true;
      var validate_all_values = true;
      if(mobile_number.length<1){
        validate_mobile_number = false;
      }
       
      if(!validate_mobile_number){
      $('.mobile_number_error').html('Mobile Number is Required');
        validate_all_values = false;
      }
      if(validate_all_values){
       $("#edit_customer_form").submit();
      }else{
       return false;
      }
    });

     $(document).on('change','#change_customer_status',function(){ 
      var customer_id = $(this).attr("data-id");
      var status = $(this).val();
      $.ajax({
      type: 'GET',
      async: false,
      url: '/change_customer_status?customer_id=' + customer_id+'&status='+status,
      success: function (response) {
        $(this).attr("data-id",response)
       },
      error: function (message) {
       }
      });
     });
    $(document).on('click','#save_fos',function(){
      var mobile_number = $('#fos_mobile_no').val();
      var name = $('#fos_name').val();
      var validate_mobile_number=true;
      var validate_name=true;
      var validate_all_values = true;
      if(mobile_number.length<1)
        validate_mobile_number = false;
      if(name.length<1)
        validate_name = false;

      if(!validate_mobile_number){
      $('.mobile_number_error').html('Mobile Number is Required');
        validate_all_values = false;
      }
      if(!validate_name){
      $('.name_error').html('Name is Required');
        validate_all_values = false;
      }
      if(validate_all_values){
       $("#add_fos_form").submit();
      }else{
       return false;
      }
    });
      $(document).on('change','#change_fos_status',function(){ 
        var fos_id = $(this).attr("data-id");
        var status = $(this).val();
          $.ajax({
          type: 'GET',
          async: false,
          url: '/change_fos_status?fos_id=' + fos_id+'&status='+status,
          success: function (response) {
          $(this).attr("data-id",response)
          },
          error: function (message) {
          }
          });
      });
      $(document).on('click','#edit_fos',function(){ 
      var fos_id = $(this).attr("data-id");
      $("#fos_edit_id").val(fos_id);
      $.ajax({
      type: 'GET',
      async: false,
      url: '/get_fos_info?fos_id=' + fos_id,
      success: function (response) {
        $(".fos-name").text(response['name']);
        $("#fos_edit_id").val(fos_id);
        $("#edit_fos_name").val(response['name']);
        $("#edit_mobile_no").val(response['mobile_no']);
        $("#edit_address").val(response['address']);
        $("#edit_permanent_address").val(response['permanent_address']);
        $("#edit_date_of_joining").val(response['doj']);
        $("#edit_password").val('');
       },
      error: function (message) {
       }
      });
    });
     $(document).on('click','#edit_fos_button',function(){ 
      var mobile_number = $('#edit_mobile_no').val();
      var name = $('#edit_fos_name').val();
      var validate_mobile_number=true;
      var validate_name=true;
      var validate_all_values = true;
      if(mobile_number.length<1){
        validate_mobile_number = false;
      }
      if(name.length<1){
        validate_name = false;
      }
       
      if(!validate_mobile_number){
      $('.mobile_number_error').html('Mobile Number is Required');
        validate_all_values = false;
      }
      if(!validate_name){
       $('.name_error').html('Name is Required');
        validate_all_values = false;
      }
      if(validate_all_values){
       $("#edit_fos_form").submit();
      }else{
       return false;
      }
    });
    $(document).on('click','#update_settings',function(){
      var name = $('#name').val();
      var password = $('#password').val();
      var confirm_password =  $('#confirm_password').val();
      var validate_name=true;
      var validate_password=true;
      var validate_all_values = true;
      if(name.length<1)
        validate_name = false;
      if(confirm_password!=password)
        validate_password = false;

      if(!validate_name){
      $('.name_error').html('Name is Required');
        validate_all_values = false;
      }
      if(!validate_password){
      $('.password_error').html('Password and Confirm Password should be same');
        validate_all_values = false;
      }
      if(validate_all_values){
       $("#update_settings_form").submit();
      }else{
       return false;
      }
    });

    $(document).on('click','#add_money_button',function(){
      var balance = $('#balance').val();
      var validate_balance=true;
      var validate_balance_type=true;
      var validate_all_values = true;
      if(balance.length<1)
        validate_balance = false;

      if(isNaN(balance))
        validate_balance_type= false;

      if(!balance.match(/^\d+$/))
         validate_balance_type= false;

      if(!validate_balance){
      $('.balance_error').html('Balance is Required');
        validate_all_values = false;
      }
      if(!validate_balance_type){
      $('.balance_error').html('Money should be integer');
        validate_all_values = false;
      }
      if(validate_all_values){
       $("#add_money_form").submit();
      }else{
       return false;
      }
    });

    setTimeout(function() {
    $('.alert').fadeOut('fast');
    }, 2000);
  })
   