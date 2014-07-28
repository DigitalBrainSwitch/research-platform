/*!
 * reportExperiment.js
 */


    var entries = [];
    
    /*
    $( document ).ready(function() 
    {
    	getEntries(<?php echo $row['id']?>, "<?php echo $row['type']?>");
            
        today =  $('#datepicker1').val();
        
        $.fn.bootstrapSwitch.defaults.onText = 'Yes';
        $.fn.bootstrapSwitch.defaults.offText = 'No';
        
        $("#<?php echo $row['id'];?>").bootstrapSwitch().on('switchChange.bootstrapSwitch', function(event, state) {
            console.log(state); // true | false
            if(state){
                binary<?php echo $row['id'];?> = 'Yes';
            }
            else{
                binary<?php echo $row['id'];?> = 'No';
            }
            entryid = $('#entry_id<?php echo $row["id"]; ?>').val();
            reportSave(<?php echo $row['id']; ?>, entryid, binary<?php echo $row['id']?> ,"new","binary");
        }); 
        
    });
    
    $('#datepicker1').change(function() {
        getEntries(<?php echo $row['id']?>, "<?php echo $row['type']?>");
    });    
    
    */
   
    function getEntries(var_id, type){
     $.ajax({
          async:false,
          type: "POST",
          url: "http://digitalbrain-test.lancs.ac.uk/wp-includes/getEntries.php",
          data:{
             date:  $('#datepicker1').val(), 
             user_id: <?php echo $user_id ?>,
             variable_id: var_id
          }
        }).done(function(data) {
            
            if(type == 'score'){
                getAverages(JSON.parse(data), var_id);
                populateEntries(JSON.parse(data), var_id, type);
            }
            if(type == 'count'){
                getSum(JSON.parse(data), var_id);
                populateEntries(JSON.parse(data), var_id, type);
            }
            if(type == 'binary'){
                setBinary(JSON.parse(data), var_id);
            }
        });
    }

    function isInt(n) {
       return typeof n === 'number' && n % 1 == 0;
    }
    $( document ).ready(function() {
        $( "#edit-entries<?php echo $row['id']?>" ).click(function() {
            if ($("#dbs-entries<?php echo $row['id']?>").is(":visible")){
                $("#dbs-entries<?php echo $row['id']?>").slideUp( "slow", function() {
                });
            } 
            else{
                $("#dbs-entries<?php echo $row['id']?>").slideDown( "slow", function() {
                });
            } 
        });
        today =  $('#datepicker1').val();
       getEntries(<?php echo $row['id']?>, "<?php echo $row['type']?>");
    });
    
    $('#datepicker1').change(function() {
        getEntries(<?php echo $row['id']?>, "<?php echo $row['type']?>");
    });
    
    function getAverages(data, var_id){
        id = var_id;
        if(data.length>0){
            sum = 0;
            for (i = 0; i < data.length; i++) { 
              console.log(data[i]['date_modified'] + ':' + data[i]['variable_value']);
              if(isInt(parseInt(data[i]['variable_value']))){
                sum += parseInt(data[i]['variable_value']);
              }
            }
            average = sum / data.length;
            average= Math.round( average * 10) / 10;
            $("#average"+id).html(average);
            console.log(average);
        }
        else{
            $("#average"+id).html('0');
        }
    }
    
    function populateEntries(data, var_id, type){
        $('#dbs-entries'+var_id).empty();
        id = var_id;
        if(data.length>0){
            for (i = 0; i < data.length; i++) { 

                $('#dbs-entries'+var_id).append('<div class="var-entry" id="record' + data[i]['id'] + '">'+data[i]['variable_value']+'</div>');
            }
             $('#edit-entries'+var_id).css( "visibility", "visible" );
        }
        else{
           $('#edit-entries'+var_id).css( "visibility", "hidden" );
        }
        $( ".var-entry" ).click(function() {
            var parent = $(this).parent()[0].id;
            $("#"+parent + " .var-entry").removeClass('selected-entry'); 
            $(this).addClass('selected-entry'); 
            console.log(parent);
            if ("dbs-entries"+var_id == parent){
                if (type=='count'){
                    $("#"+var_id).val($(this).text());
                }
                if (type=='score'){
                     $("#scoreSlider"+var_id).val($(this).text());
                     $("#"+var_id).text($(this).text());
                } 
                var id = $(this)[0].id;
                id = id.split("record");
                $("#entry_id"+var_id).val(id[1]);
            }
        });    
    }
    
    
    function setBinary(data, var_id){
        id = var_id;
        if(data.length>0){
            $('#entry_id'+var_id).val( data[0]['id'] );
            console.log(id);
            if(data[0]['variable_value']=='Yes'){
                $("#25").bootstrapSwitch('state',true);
            }
            else{
                $("#25").bootstrapSwitch('state',false);
            }
            $("#binary-not-set"+id).hide();
        }
        else{
            $('#entry_id'+var_id).val( 'null' );
            $("#binary-not-set"+id).show();
        }
    }

$( document ).ready(function() {
        $('input').attr('autocomplete','off');
       getEntries(<?php echo $row['id']?>, "<?php echo $row['type']?>");
       today =  $('#datepicker1').val();
       $( "#edit-entries<?php echo $row['id']?>" ).click(function() {
            if ($("#dbs-entries<?php echo $row['id']?>").is(":visible")){
                $("#dbs-entries<?php echo $row['id']?>").slideUp( "slow", function() {
                });
            } 
            else{
                $("#dbs-entries<?php echo $row['id']?>").slideDown( "slow", function() {
                });
            } 
        });
    });
    $('#datepicker1').change(function() {
        getEntries(<?php echo $row['id']?>, "<?php echo $row['type']?>");
    });

function getSum(data, var_id)
{
        id = var_id;
        if(data.length>0){
            sum = 0;
            for (i = 0; i < data.length; i++) { 
              console.log(data[i]);
              if(isInt(parseInt(data[i]['variable_value']))){
                sum += parseInt(data[i]['variable_value']);
              }
            }
            $("#sum"+id).html(sum);
        }
        else{
            $("#sum"+id).html('0');
        }
    }


function reportSave(id, entry_id, value, date, type) {
    if(date=='new'){
        if (today==$('#datepicker1').val()){
            d = new Date();
            d.setHours(d.getHours()+2);
            date = d.toISOString().slice(0, 19).replace('T', ' ');
        }
        else{
            from = $("#datepicker1").val().split("/");
            f = new Date(from[2], from[1] - 1, from[0]);
            f.setHours(f.getHours()+2);
            date = f.toISOString().slice(0, 19).replace('T', ' ');
        }
    }
    console.log(entry_id);
     $.ajax({
          async:false,
          type: "POST",
          url: "http://digitalbrain-test.lancs.ac.uk/wp-includes/saveVars.php",
          data:{
             id:  entry_id, 
             user_id: <?php echo $user_id ?>,
             variable_id: id,
             experiment_id: <?php echo $experimentid ?>,
             variable_value:  value,
             date_modified: date
          }
        }).done(function(data) {
            console.log(data);
            getEntries(id, type);
        });
}