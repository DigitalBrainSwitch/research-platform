
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

<!-- Optionally use Animate.css -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.0.0/animate.min.css">
<link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/liquidslider/css/liquid-slider.css">
<script language="javascript" type="text/javascript" src='https://code.jquery.com/jquery-1.11.1.min.js' ></script>
<script language="javascript" type="text/javascript" src='//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js' ></script>
<!--link rel="stylesheet" href="http://localhost/liquidslider/css/liquid-slider.css"-->

<!--link rel="stylesheet" href="http://localhost/wordpress/liquidslider/examples/assets/prism.css"-->
<!--link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/liquidslider/examples/assets/styles.css"-->

<script language="javascript" type="text/javascript">

var variableAdded = false;
var variableCount = 0;

function addVariable() {
    var button = jq(this);
    //document.frm.appendChild(txtbox);
    //document.getElementById("add-variable-submit").value= "Hide Filter";

    if(variableAdded==false){
        variableAdded = true;
    }
    
    if(variableAdded)
        variableCount++;
    
    if(variableCount>0){
        //document.getElementById("remove-variable-submit").style.visibility="visible";
        
        var div = document.getElementById("experiment-variables");
        //$(div).find('input[name="remove-variable-submit"]').style.visibility="visible";
        
        //$('#experiment-variables input[name="remove-variable-submit"]').attr("style", "visibility: visible");
        $('[name="remove-variable-submit"]').attr("style", "visibility: visible");

    }
    var col6 = document.createElement("div");
    col6.setAttribute("id", variableCount);
    var varLabel = document.createElement("label");
    //var labelId = "label" + variableCount.toString();
    var labelValue = "Measurement " + (variableCount+2).toString()+"(optional)";
    var labelId = "label" + variableCount.toString();
    varLabel.setAttribute("for", "variable[]");
    varLabel.setAttribute("id", labelId);
    varLabel.innerHTML = labelValue;

    
    
    
    var textBox = document.createElement("input");
    //var textBoxId = "variable" + document.getElementsByTagName('input').length.toString();
    var textBoxId = "variable" + variableCount.toString();
    //Assign different attributes to the element.
    textBox.setAttribute("type", "text");
    textBox.setAttribute("name", "name[]");
    textBox.setAttribute("id", textBoxId);
    textBox.setAttribute("class", 'form-control');
    //textBox.setAttribute("value", textBoxId);
    
    
    var selectList = document.createElement("select");
    selectListBoxId = "type" + variableCount.toString();
    selectList.setAttribute("name", "type[]");
    selectList.setAttribute("id", selectListBoxId);
    selectList.setAttribute("class", "form-control form-control-select");
    
    
    var option1 = document.createElement("option");
    option1.text = "Score";
    option1.value = "score";
    
    var option2 = document.createElement("option");
    option2.text = "Binary";
    option2.value = "binary";
    
    var option3 = document.createElement("option");
    option3.text = "Count";
    option3.value = "count";
    
    var option4 = document.createElement("option");
    option4.text = "Time";
    option4.value = "time";

    var option5 = document.createElement("option");
    option5.text = "Swithes (AUTO)";
    option5.value = "switches";
    
    selectList.add(option1,selectList[0]);
    selectList.add(option2,selectList[1]);
    selectList.add(option3,selectList[2]);
    //selectList.add(option4,selectList[3]);
    //selectList.add(option5,selectList[4]);
    
    
    
    var selects=document.getElementsByTagName("select");
    var length = selects.length;
    
    //var parentGuest = document.getElementById("typeId[]");
    var parentGuest = selects[length-1];
    var parentGuest = parentGuest.parentNode;
   // parentGuest.insertBefore(col6, parentGuest.nextSibling);
    col6.innerHTML = '<div class="col-md-6">' + textBox.outerHTML + '</div><div class="col-md-6">' +selectList.outerHTML +'<a class="btn-hover" id="var-delete" href="javascript:removeVar('+variableCount+')"> <span data-icon="t" class="icon-small"></span></a></div></div>';
    $(".variables").append( col6 );
    /*
     document.getElementById("add-variable-submit").parentNode.appendChild(textBox);
     document.getElementById("add-variable-submit").parentNode.appendChild(selectList);
     */
    
}
function removeVar(i){
$("#"+i).remove();
}

function removeVariable() {
    
    var length = document.getElementsByTagName('input').length;
    //length = length - 1;
    //if(length >2){
    
    var labelId = "label"+variableCount.toString();
    var varLabel = document.getElementById(labelId);
    varLabel.parentNode.removeChild(varLabel);
    
    var textBoxId = "variable"+variableCount.toString();
    var textBox = document.getElementById(textBoxId);
    textBox.parentNode.removeChild(textBox);
    
    
    var selectListId = "type"+variableCount.toString();
    selectList = document.getElementById(selectListId);
    selectList.parentNode.removeChild(selectList);
    
    
    variableCount =  variableCount-1;
    if(variableCount==0)
    {
        variableAdded = false;
        //document.getElementById("remove-variable-submit").style.visibility="hidden";
        //$('#experiment-variables input[name="remove-variable-submit"]').attr("style", "visibility: hidden");
        $('[name="remove-variable-submit"]').attr("style", "visibility: hidden");
    }
    
    
    
    //var form = document.getElementById("create-experiment-form");
    //form.removeChild(element);
    
}

</script>
<style>
.form-control-select{
    max-width:25%!important;
    background-image: url('http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/select-arrow.png');
    background-repeat: no-repeat;
    background-position: right;
}
.form-control-select.focus {
  background-image: url('http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/select-arrow.png')!important;
  background-repeat: no-repeat;
  background-position: right;
}
</style>

<?php do_action( 'bp_before_create_experiment_page' ); ?>

<div id="buddypress">

<?php do_action( 'bp_before_create_experiment_content_template' ); ?>

<form action="<?php bp_experiment_creation_single_form_action(); ?>" method="post" id="create-experiment-form" name="create-experiment-form" class="standard-form" enctype="multipart/form-data">

<?php do_action( 'bp_before_create_experiment' ); ?>

<div class="item-list-tabs no-ajax" id="experiment-create-tabs" role="navigation">
<ul>

<!--?php bp_experiment_creation_tabs(); ?-->

</ul>
</div>

<?php do_action( 'template_notices' ); ?>

<div class="item-body" id="experiment-create-body">

<?php /* Experiment creation step 1: Basic experiment details */ ?>
<!--?php if ( bp_is_experiment_creation_step( 'experiment-details' ) ) : ?-->
<div class="liquid-slider" id="main-slider">

<div id="experiment-details">
<span>1) Details </span><span style='color:#ddd'>2) Variables   </span><span style='color:#ddd'>3) Privacy </span><span style='color:#ddd'>4) Invites</span>
<h1><span class='titlespan'>What will you discover?</span></h1>
<div align="right">

        <input type="button" tabindex="-1" class="btn-hover" value="Next" name="btn-details-next" id="btn-details-next" onclick="detailsNext()">

</div>
<div id='detailsError' style='display:none' class="alert alert-danger alert-dismissible"></div>
<div>
<label for="experiment-name"><?php _e( 'Experiment Name', 'buddypress' ); ?></label>
<input class='form-control' type="text" tabindex="-1" name="experiment-name" id="experiment-name" aria-required="true" value="<?php bp_new_experiment_name(); ?>" />
<p>Your experiment name should be simple, and describe what the experiment will discover. For example, "If I sleep well, I feel well."</p>
</div>

<div>
<label for="experiment-desc"><?php _e( 'Experiment Description', 'buddypress' ); ?></label>
<textarea class='form-control' name="experiment-desc" tabindex="-1" id="experiment-desc" aria-required="true"><?php bp_new_experiment_description(); ?></textarea>
<p>In 50 words, explain why you want to launch this experiment.</p>
</div>

<?php
    do_action( 'bp_after_experiment_details_creation_step' );
    do_action( 'experiments_custom_experiment_fields_editable' ); // @Deprecated
    
    wp_nonce_field( 'experiments_create_save_experiment-details' ); ?>

<!--?php endif; ?-->


</div><!--Details-->

<div id="experiment-variables">
<span style='color:#ddd'>1) Details </span><span>2) Variables </span><span style='color:#ddd'>3) Privacy </span><span style='color:#ddd'>4) Invites</span>
<h1 class="title1">What will you measure?</h1>
<div align="right">

    <input type="button" tabindex="-1" class="btn-hover" value="Previous" name="btn-variables-previous" id="btn-variables-next" onclick="variablesPrevious()">
    <input type="button" tabindex="-1" class="btn-hover" value="Next" name="btn-variables-next" id="btn-variables-next" onclick="variablesNext()">

</div>

<div id='variablesError' style='display:none' class="alert alert-danger alert-dismissible"></div>
<p>The variables are the values that get measured during the experiment. These can be in the form of</br></br>Yes/No. For example "Went for a run"</br>Count. - For example "Hours slept"</br>Score - Is a rating out of 10. For example "Productivity".</p>

<div class='variables'>
<div class='col-md-6'><input type="text" class='form-control' tabindex="-1" placeholder='Measurement 1' name="name[]" id="name[]" aria-required="true" value="<?php bp_new_experiment_variable(); ?>" />
</div>
<div class='col-md-6'>
    <select class='variable-selector form-control form-control-select' id="typeId[]" name="type[]" tabindex="-1">
<option value="score"><?php _e( 'Score', 'buddypress' ); ?></option>
<option value="binary"><?php _e( 'Yes/No', 'buddypress' ); ?></option>
<option value="count"><?php _e( 'Count', 'buddypress' ); ?></option>

<?php do_action( 'bp_experiment_variable_type_options' ); ?>
</select></div>


<div class='col-md-6'>
<input class='form-control' type="text" tabindex="-1" name="name[]" id="name[]" placeholder='Measurement 2' aria-required="true" value="<?php bp_new_experiment_variable(); ?>" />
</div>
<div class='col-md-6' id='var2'>
<select class='form-control form-control-select' id="typeId[]" name="type[]" tabindex="-1">
<option value="score"><?php _e( 'Score', 'buddypress' ); ?></option>
<option value="binary"><?php _e( 'Yes/No', 'buddypress' ); ?></option>
<option value="count"><?php _e( 'Count', 'buddypress' ); ?></option>
<?php do_action( 'bp_experiment_variable_type_options' ); ?>
</select>
</div>
</div>
<tr>
    <td align="right" width="100%">
        <input type="button" value="Add Variable" tabindex="-1" name="add-variable-submit" id="add-variable-submit" onclick="addVariable()">

    </td>
</tr>

</div><!--Variables-->
           

        

<div id="experiment-settings">

<span style='color:#ddd'>1) Details </span><span style='color:#ddd'>2) Variables </span><span >3) Privacy </span><span style='color:#ddd'>4) Invites</span>
    <h1 class="title1">Privacy Options</h1>

    <div align="right">

        <input type="button" tabindex="-1" class="btn-hover" value="Previous" name="btn-settings-previous" id="btn-settings-next" onclick="settingsPrevious()">
        <input type="button" tabindex="-1" class="btn-hover" value="Next" name="btn-settings-next" id="btn-settings-next" onclick="settingsNext()">

    </div>
    <h3>Set the privacy options.</h3>
    <div class='row'>
<div id='public'>

<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/a1.png'/>
    <p style='padding:20px'>Anybody can join</p>
</div>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/b1.png'/>
    <p style='padding:20px'>Shows in experiments directory and search results</p>
</div>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/c1.png'/>
    <p style='padding:20px'>Anybody can see the experiment results.</p>
</div>

</div>
<div id='private'>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/a2.png'/>
    <p style='padding:20px'>People can request to join.</p>
</div>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/b1.png'/>
    <p style='padding:20px'>Shows in experiments directory and search results</p>
</div>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/c2.png'/>
    <p style='padding:20px'>Only experiment members can see the results.</p>
</div>
</div>
<div id='hidden'>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/a3.png'/>
    <p style='padding:20px'>People have to be invited to join.</p>
</div>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/b2.png'/>
    <p style='padding:20px'>Hidden in experiments directory and search results</p>
</div>
<div class='col-xs-4' style='padding:20px; text-align:center'>
    <img src='http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/c2.png'/>
    <p style='padding:20px'>Only experiment members can see the results.</p>
</div></div></div>
<div class="radio" style='margin-top:30px'>
        <label><input class='privacy' type="radio" tabindex="-1" name="experiment-status" value="public"<?php if ( 'public' == bp_get_new_experiment_status() || !bp_get_new_experiment_status() ) { ?> checked="checked"<?php } ?> />
        <strong><?php _e( 'Public', 'buddypress' ); ?></strong>
        </label>

    <label><input class='privacy' type="radio" tabindex="-1"  name="experiment-status" value="private"<?php if ( 'private' == bp_get_new_experiment_status() ) { ?> checked="checked"<?php } ?> />
    <strong><?php _e( 'Private', 'buddypress' ); ?></strong>
    </label>

    <label><input class='privacy' type="radio" tabindex="-1"  name="experiment-status" value="hidden"<?php if ( 'hidden' == bp_get_new_experiment_status() ) { ?> checked="checked"<?php } ?> />
    <strong><?php _e('Hidden', 'buddypress' ); ?></strong>
    </label>
</div>
<script>
$(document).ready(function(){
    $('#private').hide();
    $('#hidden').hide();
    $('.privacy').click(function() {
       if( $( this ).val() == 'public'){
            $('#private').hide();
            $('#hidden').hide();
            $('#public').show();
       }if( $( this ).val() == 'private'){
            $('#hidden').hide();
            $('#public').hide();
            $('#private').show();
       }if( $( this ).val() == 'hidden'){
            $('#private').hide();
            $('#public').hide();
            $('#hidden').show();
       }
    });
});
</script>
<h3><?php _e( 'Experiment Invitations', 'buddypress' ); ?></h4>

<p><?php _e( 'Which members of this experiment are allowed to invite others?', 'buddypress' ); ?></p>

<div class="radio">
<label>
<input type="radio" tabindex="-1"  name="experiment-invite-status" value="members"<?php bp_experiment_show_invite_status_setting( 'members' ); ?> />
<strong><?php _e( 'All experiment members', 'buddypress' ); ?></strong>
</label>

<label>
<input type="radio" tabindex="-1"  name="experiment-invite-status" value="admins"<?php bp_experiment_show_invite_status_setting( 'admins' ); ?> />
<strong><?php _e( 'Only you', 'buddypress' ); ?></strong>
</label>
</div>


</div><!--Settings-->


<div id="experiment-invites">

<span style='color:#ddd'>1) Details </span><span style='color:#ddd'>2) Variables </span><span style='color:#ddd'>3) Privacy </span><span >4) Invites</span>
<h1 class="title1">Invites</h1>

<div align="right">

<input type="button" tabindex="-1"  class="btn-hover" value="Previous" name="btn-invites-previous" id="btn-invites-next" onclick="invitesPrevious()">

<input type="submit" tabindex="-1"  value="<?php esc_attr_e( 'Finish', 'buddypress' ); ?>" id="experiment-creation-finish" name="save"/>

</div>


<?php if ( bp_is_active( 'friends' ) && bp_get_total_friend_count( bp_loggedin_user_id() ) ) : ?>

<div class="left-menu">

<div id="invite-list">
<ul>
<?php bp_new_experiment_invite_friend_list(); ?>
</ul>

<?php wp_nonce_field( 'experiments_invite_uninvite_user', '_wpnonce_invite_uninvite_user' ); ?>
</div>

</div><!-- .left-menu -->

<div class="main-column">

<div id="message" class="info">
<p><?php _e('Select people to invite from your friends list.', 'buddypress' ); ?></p>
</div>

<?php /* The ID 'friend-list' is important for AJAX support. */ ?>
<ul id="friend-list" class="item-list" role="main">

<?php if ( bp_experiment_has_invites() ) { ?>

<?php while ( bp_experiment_invites() ) : bp_experiment_the_invite(); ?>

<li id="<?php bp_experiment_invite_item_id(); ?>" >

<?php bp_experiment_invite_user_avatar(); ?>

<h4><?php bp_experiment_invite_user_link(); ?></h4>
<span class="activity"><?php bp_experiment_invite_user_last_active(); ?></span>

<div class="action">
<a class="remove" href="<?php bp_experiment_invite_user_remove_invite_url(); ?>" id="<?php bp_experiment_invite_item_id(); ?>"><?php _e( 'Remove Invite', 'buddypress' ); ?></a>
</div>
</li>

<?php endwhile; ?>

<?php wp_nonce_field( 'experiments_send_invites', '_wpnonce_send_invites' ); ?>

<?php }
    if(BP_Friends_Friendship::total_friend_count( $bp->loggedin_user->id )== 0){
        echo "You've got no friends yet. Find some <a href='members'>here</a>";
    }   
 ?>

</ul>

</div><!-- .main-column -->

<?php else : ?>

<div id="message" class="info">
<p><?php _e( 'Once you have built up friend connections you will be able to invite others to your experiment.', 'buddypress' ); ?></p>
</div>

<?php endif; ?>




</div><!--Invites-->




</div><!--main-slider-->


<?php do_action( 'experiments_custom_create_steps' ); // Allow plugins to add custom experiment creation steps ?>

<?php do_action( 'bp_before_experiment_creation_step_buttons' ); ?>

<?php do_action( 'bp_after_experiment_creation_step_buttons' ); ?>

<?php /* Don't leave out this hidden field */ ?>
<input type="hidden" name="experiment_id" id="experiment_id" value="<?php bp_new_experiment_id(); ?>" />
<input type="hidden" name="experiment-name" id="experiment-name"  />
<input type="hidden" name="experiment-desc" id="experiment-desc" />


<?php do_action( 'bp_directory_experiments_content' ); ?>

</div><!-- .item-body -->

<?php do_action( 'bp_after_create_experiment' ); ?>

</form>

<?php do_action( 'bp_after_create_experiment_content_template' ); ?>

</div><!-- buddypress -->

<?php do_action( 'bp_after_create_experiment_page' ); ?>


<footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<!--script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/liquidslider/js/jquery.liquid-slider.min.js"></script>
<!--script src="http://localhost/liquidslider/js/jquery.liquid-slider.min.js"></script-->
<script>
/**
 * If you need to access the internal property or methods, use this:
 * var api = $.data( $('#main-slider')[0], 'liquidSlider');
 */
/*
 $('#main-slider').liquidSlider({
 
 continuous:false,
 slideEaseFunction: "easeInOutCubic"
 });
 */


$(document).ready(function(){

                  $('[name="save"]').click(function (){
                                                         
                         var name = document.getElementById("experiment-name").value;
                         var desc = document.getElementById("experiment-desc").value;
                         
                         $('input[name="experiment-name"]').attr('value',name);
                         $('input[name="experiment-desc"]').attr('value',desc);
                         
                         var bla = $('#experiment-name').val();
                         //alert("hello");
                         
                         var variableNames=document.getElementsByName("name[]");
                         var variableTypes=document.getElementsByName("type[]");
                         var length = variableNames.length;
                         var empty=false;
                         
                         //alert(length);
                         //alert(variableTypes.length);
                         
                         
                         for(var i=0; i<length; i++){
                         
                         //alert(variableNames[i].value);
                         
                                           $('<input>').attr({
                                                             type: 'hidden',
                                                             id: 'name[]',
                                                             name: 'name[]',
                                                             value: variableNames[i].value
                                                             }).appendTo('create-experiment-form');
                         
                                           $('<input>').attr({
                                                             type: 'hidden',
                                                             id: 'type[]',
                                                             name: 'type[]',
                                                             value: variableTypes[i].value
                                                             }).appendTo('create-experiment-form')
                         
                         
                         
                         }//end for
                         
                         var experimentStatus=document.getElementsByName("experiment-status");
                         $('<input>').attr({
                                           type: 'hidden',
                                           id: 'experiment-status',
                                           name: 'experiment-status',
                                           value: experimentStatus
                                           }).appendTo('create-experiment-form');
                         
                         
                         var experimentInviteStatus=document.getElementsByName("experiment-invite-status");
                         $('<input>').attr({
                                           type: 'hidden',
                                           id: 'experiment-invite-status',
                                           name: 'experiment-invite-status',
                                           value: experimentInviteStatus
                                           }).appendTo('create-experiment-form');
                         
                         
                         var friends=document.getElementsByName("friends[]");
                         //alert(friends.length);
                         
                         for(var i=0; i<lfriends.length; i++){
                         $('<input>').attr({
                                           type: 'hidden',
                                           //id: 'friends[]',
                                           name: 'friends[]',
                                           value: friends[i].value
                                           }).appendTo('create-experiment-form');
                         }
                         
                         
                         $('[name="create-experiment-form"]').submit();
                         
                         
                         });//end click.function()
                  
                  
                  
                  }); //end ready.function()

$('#main-slider').liquidSlider({
                               //firstPanelToLoad:0
                               
                               //dynamicTabs: false, //remove the tabs from the slider
                               //panelTitleSelector: "title", //use the h3 class=slide_title as the title of the slide
                               //crossLinks: false, //allow external anchors (not inside the slider) to push or pull to the relevant slide (anchors tags require: data-liquidslider-ref="SLIDER-ID")
                               //hashLinking: false, //allows for us to use hashes (#) as a link to push or pull slides
                               //hashCrossLinks: false, //allows us to use cross link's hashes as links to go to specific slides
                               //hashNames: true,
                               //hashTitleSelector: "h3.slide_title", //specifies the name of the hash which corresponds to the specific slide
                               });

var api = $.data( $('#main-slider')[0], 'liquidSlider');

function detailsNext() {
    
    //alert("details");
    var name = document.getElementById("experiment-name").value;
    var desc = document.getElementById("experiment-desc").value;
    $('#detailsError').html('');
    if(name=='')
   	{
    	$('#detailsError').show();
        $('#detailsError').append('Please add a name for your experiment.</br>');
    }
    if(desc=='')
    {
    	$('#detailsError').show();
    	$('#detailsError').append('Please add a description for your experiment.');
    }
    if(name!=''&&desc!='') {
        $('#detailsError').hide();
    	api.setNextPanel(1);
    }
}


function variablesPrevious() {
    api.setNextPanel(0);
    
}

function variablesNext() {
    
    var names=document.getElementsByName("name[]");
    var length = names.length;
    var empty=false;
    
    //alert("hello"+length);
    for(var i=0; i<length; i++){
        if(names[i].value==''){
            empty=true;
            break;
        }
    }//end for
    $('#variablesError').html('');
    if(empty)
    {
        $('#variablesError').show();
        if(length>2){
            $('#variablesError').append('Please name all of the variables.</br>');
        }else{
            $('#variablesError').append('Please add at least two variables to measure.</br>');
        }
    }
    if(!empty){
        $('#variablesError').hide();
        api.setNextPanel(2);
    }
}


function settingsPrevious() {
    api.setNextPanel(1);
    
}

function settingsNext() {
    api.setNextPanel(3);
    
}


function invitesPrevious() {
    api.setNextPanel(2);
    
}

/*
 function settingsNext() {
 api.setNextPanel(3);
 
 }
 */

/*
 $('.btn-hover').on('click', function() {
 
 document.getElementById("next-submit").value= "Hide Filter";
 var button = document.getElementById("next-submit");
 //api.setNextPanel(1);
 
 });
 */

/*
 $('.next-submit').on('click', function () {
 api.setNextPanel(1);
 });
 */

/*
 $('.btn-load').on('click', function () {
 api.setNextPanel(1);
 });
 */

</script>
</footer>
<script src='//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js' />