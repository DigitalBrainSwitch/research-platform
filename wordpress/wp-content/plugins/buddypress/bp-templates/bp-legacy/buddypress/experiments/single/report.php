<link href="http://digitalbrain-test.lancs.ac.uk/flot/examples/examples.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/themes/default.css" id="theme_base">
<link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/themes/default.date.css" id="theme_date">
<link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/uislider/jquery.nouislider.css">

<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="http://dev.jquery.com/view/trunk/plugins/validate/jquery.validate.js"></script>


<script language="javascript" type="text/javascript" src="http://digitalbrain-test.lancs.ac.uk/flot/jquery.js"></script>
<script language="javascript" type="text/javascript" src="http://digitalbrain-test.lancs.ac.uk/flot/jquery.flot.js"></script>
<script language="javascript" type="text/javascript" src="http://digitalbrain-test.lancs.ac.uk/flot/jquery.flot.tickrotor.js"></script>
<script language="javascript" type="text/javascript" src="http://digitalbrain-test.lancs.ac.uk/flot/jquery.flot.axislabels.js"></script>


<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/picker.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/picker.date.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/picker.time.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/legacy.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/uislider/jquery.nouislider.min.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/wp-includes/js/bootstrap.min.js"></script>


<script>
/*

$(document).ready(function() {

                  $("#report-experiment-form").validate({
                                       submitHandler: function() {
                                       //submit the form
                                       $.post("<?php echo $_SERVER[PHP_SELF]; ?>", //post
                                              $("#report-experiment-form").serialize(),
                                              function(data){
                                              //if message is sent
                                              if (data == 'Sent') {
                                                    //$("#message").fadeIn(); //show confirmation message
                                              $("#report-experiment-form")[0].reset(); //reset fields
                                              }
                                              //
                                              });
                                       return false; //don't let the page refresh on submit.
                                       }
                                       }); //validate the form
                  
                  
                  });

*/
</script>


<!--style the error message-->
<style type="text/css">
.error {
display: block;
color: red;
    font-style: italic;
}
#message {
display:none;
font-size:15px;
font-weight:bold;
color:#333333;
}
.sidebar {
    display: block;
    background-color: #444;
    padding:20px;
    color:#777;
    margin-top: -10px;
    text-align: left;

}
.sidebar input{
      border: 2px solid #bdc3c7;
  color: #34495e;
  font-family: "Lato", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.467;
  width:100%!important;
  padding: 8px 12px;
  height: 42px;
  -webkit-appearance: none;
  border-radius: 6px;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: border .25s linear, color .25s linear, background-color .25s linear;
  transition: border .25s linear, color .25s linear, background-color .25s linear;
  margin-bottom:10px;
}
.sidebar select{
    border: 2px solid #bdc3c7;
  color: #34495e;
  font-family: "Lato", Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.467;
  width:100%!important;
  padding: 8px 12px;
  height: 42px;
  -webkit-appearance: none;
  border-radius: 6px;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: border .25s linear, color .25s linear, background-color .25s linear;
  transition: border .25s linear, color .25s linear, background-color .25s linear;
  margin-bottom:10px;
    background-image: url('http://digitalbrain-test.lancs.ac.uk/wp-content/plugins/buddypress/bp-templates/bp-legacy/buddypress/experiments/images/select-arrow.png');
    background-repeat: no-repeat;
    background-position: right;
}
 .sidebar h1, .sidebar h2 {
    color:#ddd;
}
.sidebar h3{
    color:#777;
}


</style>



<?php if ( is_user_logged_in() && bp_experiment_is_member() ) : ?>



<div id="message">Your message has been sent.<br /><br /></div>
<div class="row"><div class="col-md-3 sidebar"><h2>Report</h2>

<?php
    
    global $variable_chart1;
    global $variable_chart2;
    
    global $variable_chart1_index;
    global $variable_chart2_index;
    
    global $experiment_report_count;
    global $experiment_results_period;
    
    $variable_chart1_index = 0;
    $variable_chart2_index = 1;
    
    $experiment_results_period = 0;
    
    if(isset($_POST['chart']))
    {
        
        $variable_chart1 = $_POST['shown-variable1'];
        $variable_chart2 = $_POST['shown-variable2'];
        
        $experiment_results_period = $_POST['results-period'];
        //echo $variable_chart1;

    }//end if(isset($_POST['chart'])
    
    
    if(isset($_POST['report']))
    {
        

        
        //echo "Success";
        global $wpdb, $bp;
        
        
        //echo $_POST['variable_id'][0];
        //echo $_POST['variable'][0];
        
        //echo $_POST['variable_id'][1];
        //echo $_POST['variable'][1];
        
        
        $date_modified = new DateTime();
        $date_modified = (string) $date_modified->format('Y-m-d H:i:s');
        

        $variable1_id = $_POST['variable_id'][0];
        $variable1_value = $_POST['variable'][0];
        
        $variable2_id = $_POST['variable_id'][1];
        $variable2_value = $_POST['variable'][1];
        
        $variable_ids = $_POST['variable_id'];
        $variable_values = $_POST['variable'];
        
        
        for($x = 0; $x < count($variable_ids); $x++ )
        {
            //foreach ($name as $key => $val)
            //echo ($names[$x]);
            
            $sql = $wpdb->prepare(
                                  "INSERT INTO wp_bp_experiments_report (
                                  experiment_id,
                                  user_id,
                                  variable_id,
                                  variable_value,
                                  date_modified
                                  ) VALUES (
                                            %d, %d, %d, %s, %s
                                            )",
            bp_get_current_experiment_id(),
            bp_loggedin_user_id(),
            $variable_ids[$x],
            $variable_values[$x],
            $date_modified
            );
            
            
            if ( !$wpdb->query( $sql ) )
                echo "Failure";
            
        }//end for
        
                    //bp_core_redirect( bp_get_experiment_permalink( $bp->experiments->current_experiment ) );
    }//end if(isset($_POST['report']))
?>


<form action="" method="post" id="report-experiment-form" name="report-experiment-form">


<?php
    
    $experimentid = bp_get_current_experiment_id();
    $currentUserId = bp_loggedin_user_id();
    
    //echo "experimentId="+$experimentid;
    //echo $currentUserId;
    //echo $experimentid;
    
    // Create a connection
    $connection = mysql_connect("localhost", "root", "") or die(mysql_error());
    //$connection = mysql_connect("digitalbrain-test.lancs.ac.uk", "urashid", "password") or die(mysql_error());
    
    //Select database
    mysql_select_db("wordpress", $connection) or die(mysql_error());
    
    $result=mysql_query("select * from wp_bp_experiments_variables where experiment_id=$experimentid");
    
    $cols=1;		// Here we define the number of columns
    
    
    global $variable_name1;
    global $variable_name2;
    
    
    do{
        
?>


<?php
    //if($result)
    {
        for($i=1;$i<=$cols;$i++){	// All the rows will have $cols columns even if
            // the records are less than $cols
            
            $row=mysql_fetch_array($result);
            if($row){
                if(i==1)
                    $variable_name1 = $row['name'];
                if(i==2)
                    $variable_name2 = $row['name'];

    
                if($row['type'] == 'count')
                {
        
?>
        <h3><?php _e( $row['name'], 'buddypress' ); ?></h3>
        <input type="text" name="variable[]" placeholder='0' id="<?php echo $row['id']?>" aria-required="true"  />

<?php
    
    }
    
    if($row['type'] == 'score')
    {
        
?>

    <h3><?php _e( $row['name'], 'buddypress' ); ?>: <span style='color:white' id="<?php echo $row['id']?>">0</span></h3>
    <div class="slider" id="scoreSlider<?php echo $row['id']?>"></div>
    <input hidden type="text" name="variable[]" id="scoreText<?php echo $row['id']?>"></input>
    <script>
        var sliders = $("#scoreSlider<?php echo $row['id']?>");
        sliders.noUiSlider({
            start: 0,
            connect: "lower",
            orientation: "horizontal",
            range: {
                'min': 0,
                'max': 10
            },
            serialization: {
                format: {
                    decimals: 0
                }
            }
        });
        sliders.on('slide', showScore);
        function showScore(){
            $("#scoreText<?php echo $row['id']?>").val($("#scoreSlider<?php echo $row['id']?>").val());
            $("#<?php echo $row['id']?>").html($("#scoreSlider<?php echo $row['id']?>").val());
        }
    </script>

<?php
    
    }
    
    if($row['type'] == 'binary')
    {
        
?>
        <h3><?php _e( $row['name'], 'buddypress' ); ?></h3>
        <select id="$row['id']" name="variable[]">
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>

<?php
    
    }
    
    if($row['type'] == 'time')
    {
        
?>

        <h3><?php _e( $row['name'], 'buddypress' ); ?></h3>
<input type="text" name="variable[]" placeholder='07:00' id="$row['id']" aria-required="true"  />

<?php
    
    }
if($row['type'] == 'switches'){

?>
<div style='margin-top:10px' class="alert alert-info alert-dismissable">
  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
  <strong>Pick a date to view the amount of switches you made.</strong></br>You must have our chrome extension installed !!LINK!!
</div>
<h3><?php _e( $row['name'], 'buddypress' ); ?>: <span style='color:white' id='switches'><span></h3>
<input id='datepicker' placeholder="Choose a date" type="text"></input><input type='hidden' name="variable[]" id='switchCount'></input>
<script>
    $('#datepicker').pickadate({
        format: 'mm/dd/yyyy',
         onSet: function(context) {
            d = $('#datepicker').val();
            $.post("http://digitalbrain-test.lancs.ac.uk/wp-includes/chrome-extension/getSwitchesCount.php", {user_id: <?php echo get_current_user_id(); ?>, date: d}, function(response) {
              $('#switchCount').val(response);
              $('#switches').html(response);
              console.log(response);
            });
        }
    });


    
</script>
<?php
    }
    
?>

<input type="hidden" name="variable_id[]" value="<?php echo $row['id']; ?>">



<?php
    
    }//end if(row)
    else{
        //echo "<td>&nbsp;</td>";	//If there are no more records at the end, add a blank column
    }
    
    
    }//end for (cols)
    }//end if($result)
    } while($row);
    
    //echo "</table>";
    
?>


<button style='margin-top:20px; width:100%' type="submit" value="<?php _e('report', 'buddypress' ); ?>" id="experiment-report-variables" name="report" ><span class="glyphicon glyphicon-stats"></span>
</button>





</form>

</div><div class='col-md-9'><h3>Results</h3>
<table>



<?php
    
    $experimentid = bp_get_current_experiment_id();
    $query="SELECT id, name, type FROM wp_bp_experiments_variables where wp_bp_experiments_variables.experiment_id=$experimentid";
    $result = mysql_query($query);
    
    $variableIds = array();
    $dateTimes = array();
    $dateTimesPP = array();
    $variableNames = array();
    $variableTypes = array();
    $variableValues = array();
    $variableValuesPP = array();
    $variableNameValues = array();
    $variableNameValuesPP = array();
    
    echo "<tr>";
    
    do{
        $row=mysql_fetch_array($result);
        if($row){
            $variableIds[] = $row['id'];
            $variableNames[] = $row['name'];
            $variableTypes[] = $row['type'];
            /*
            echo "<td width=33%><b>";
            echo $row['name'];
            echo "</td>";
            */
        }//end if($row)
        else
            break;

        
    }while($row);
    

    //$result1=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
    $result1=mysql_query("SELECT count(*) FROM wp_bp_experiments_report WHERE experiment_id=$experimentid");
    $row=mysql_fetch_array($result1);
    if($row)
    {

        $experiment_report_count = $row['count(*)'];
        if($experiment_report_count==0)
            echo "Please upload data for this experiment.";

        else if($experiment_report_count>0)
        {
            
            //$result2=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
            //$result2=mysql_query("select date_modified from wp_bp_experiments_report where experiment_id=$experimentid");
            
            if($experiment_results_period == 0)
                $result2=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
            
            if($experiment_results_period == 30)
                $result2=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0] AND date_modified BETWEEN NOW() - INTERVAL 30 DAY AND NOW()");
            
            if($experiment_results_period == 7)
                $result2=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0] AND date_modified BETWEEN NOW() - INTERVAL 7 DAY AND NOW()");
            
            //echo "<table>";
            do{
                $row=mysql_fetch_array($result2);
                if($row){
                    
                    $dateTimes[] = $row['date_modified'];
                }//end if($row)
            } while($row);

        }//end if ($experiment_report_count >0)
    }//end if row

?>

</table>


<?php
    
    /*
        If the data exists in experiments reports, show the visualization.
    */
    if($experiment_report_count>0)
    {

?>


<form action="" method="post" id="show-experiment-chart" name="show-experiment-chart"  >
<tr>

    <td>
        <label for="x-variable">Variable 1</label>

            <select id="shown-variable1" name="shown-variable1" tabindex="-1">

<?php

    //echo $variable_chart1;
  for ($x=0; $x<count($variableNames); $x++)
    {
        
        if($variable_chart1 == $variableNames[$x])
        {
            $variable_chart1_index = $x;
            
?>
        <option value="<?php echo $variableNames[$x]?>" selected><?php echo $variableNames[$x]?> </option>

<?php
        }//end if
    else{
?>
        <option value="<?php echo $variableNames[$x]?>"><?php echo $variableNames[$x]?> </option>

<?php
        }//end else
    }//end for
?>

            </select>
    </td>

    <td>
        <label for="y-variable">Variable 2</label>

            <select id="shown-variable2" name="shown-variable2" tabindex="-1">

<?php
    
    for ($x=0; $x<count($variableNames); $x++)
    {
        if($variable_chart2==NULL)
        {
            if($x==1)
            {
?>
            <option value="<?php echo $variableNames[$x]?>" selected><?php echo $variableNames[$x]?> </option>
<?php
            }//end if
            else
            {
?>
            <option value="<?php echo $variableNames[$x]?>"><?php echo $variableNames[$x]?> </option>
<?php
            }//end else
        }//end if($variable_chart2==null)
        
        else if($variable_chart2!=NULL)
        {
        
            if($variable_chart2 == $variableNames[$x])
            {
                $variable_chart2_index = $x;

?>
        <option value="<?php echo $variableNames[$x]?>" selected><?php echo $variableNames[$x]?> </option>

<?php
            }//end if if($variable_chart2 == $variableNames[$x])
            else
            {
?>
            
       <option value="<?php echo $variableNames[$x]?>"><?php echo $variableNames[$x]?> </option>
<?php
            }//end else
        }//end else if($variable_chart2!=NULL)
    }//end for
?>

            </select>
    </td>


    <td align="center">
        <br> <br>
        Days:
                <input type="radio" name="results-period" value="0" <?php echo $experiment_results_period== 0 ? "checked" : "";?> >All
                <input type="radio" name="results-period" value="30" <?php echo $experiment_results_period== 30 ? "checked" : "";?>>Last 30
                <input type="radio" name="results-period" value="7" <?php echo $experiment_results_period== 7 ? "checked" : "";?>>Last 7

        <input type="submit" value="<?php _e('chart', 'buddypress' ); ?>" id="experiment-show-variables-chart" name="chart" />
        <br> <br>
    </td>

</tr>



</form>

<tr>

<?php
    /*
     
        Retreiving all participants' resutls from the database
    */

        //$result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
    
    for ($x=0; $x<count($variableNames); $x++)
    {
        
        $name = $variableNames[$x];
        $id = $variableIds[$x];
        $userId = 0;
        //echo "The variableId[$x] is $id and variableName[$x] $name  <br>";

        
        if($experiment_results_period == 0)
            $result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid AND variable_id=$id");
        
        if($experiment_results_period == 30)
            $result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid AND variable_id=$id AND date_modified BETWEEN NOW() - INTERVAL 30 DAY AND NOW()");
        
        if($experiment_results_period == 7)
            $result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid AND variable_id=$id AND date_modified BETWEEN NOW() - INTERVAL 7 DAY AND NOW()");
        
        $index = 0;
        
        do{
            $row=mysql_fetch_array($result4);
            if($row){
                
                //$index = $index+1;
                
                $val = $row['variable_value'];
                if($val == 'Yes' || $val == 'yes')
                    $val = 1;
                if($val == 'No' || $val == 'no')
                    $val = 0;
                
                //$variableNameValues[] = $row['variable_value'];
                $variableNameValues[] = $val;
            }//end if($row)
        } while($row);

        
         for ($y=0; $y<count($variableNameValues); $y++) {
             
             $value = $variableNameValues[$y];
             //echo "$value <br>";
             
         }//end for
        
        $variableValues[$x] = $variableNameValues;
        $variableNameValues = NULL;
        
    }//end for ($x=0; $x<count($variableNames); $x++)

?>

<script type="text/javascript">
//var xdata = <?php echo json_encode($xdata); ?>;

var names = <?php echo json_encode($variableNames); ?>;
var values = <?php echo json_encode($variableValues); ?>;

var times = <?php echo json_encode($dateTimes); ?>;

//var values1 = <?php echo json_encode($variableValues[0]); ?>;
//var values2 = <?php echo json_encode($variableValues[1]); ?>;

var values1 = <?php echo json_encode($variableValues[$variable_chart1_index]); ?>;
var values2 = <?php echo json_encode($variableValues[$variable_chart2_index]); ?>;


var nameVar1 = <?php echo json_encode($variableNames[$variable_chart1_index]); ?>;
var nameVar2 = <?php echo json_encode($variableNames[$variable_chart2_index]); ?>;

var typeVar1 = <?php echo json_encode($variableTypes[$variable_chart1_index]); ?>;
var typeVar2 = <?php echo json_encode($variableTypes[$variable_chart2_index]); ?>;

</script>



<?php echo "All participants' results (daily)"; ?>

<script type="text/javascript">

$(document).ready(function() {
                  
                  
                  if(typeVar1=="binary" && typeVar2=="binary")
                  {
                  
                    var d1 = [];
                    var d2 = [];
                  
                  for (var i = 0; i < times.length; ++i)
                  {
                        if(values1[i]==1 && values2[i]==1)
                        {
                            d1.push([i, 1]);
                        }
                  
                        if(values1[i]==1 && values2[i]==0)
                        {
                            d1.push([i, -1]);
                        }
                  
                        if(values1[i]==0 && values2[i]==1)
                        {
                            d2.push([i, 1]);
                        }
                        if(values1[i]==0 && values2[i]==0)
                        {
                            d2.push([i, -1]);
                        }

                  }//end for

                  var xlabels = [];
                  for (var i=0; i <times.length; ++i)
                  {
                    //alert("times[0]="+times[0]);
                        var xlabel = [];
                        xlabel.push(i, times[i]);
                        xlabels.push(xlabel);
                  }//end for
                  
                  var ylabels = [];
                  ylabels[0] = nameVar2+" Yes";
                  ylabels[1] = nameVar2+" No";
                  
                  var data = [{ data: d1, label: nameVar1+" Yes", color: "blue" }, { data: d2, label: nameVar1+" No", color: "red" }];
                  
                  
                    var placeholder = $("#placeholder-daily");
                    var plot = $.plot(placeholder, data, {
                                      bars: { show: true, barWidth: 0.5, fill: 0.9},
                                      xaxis: {tickLength: 0,
                                      //min: 0.5,
                                      //max: ticks.length+0.5,
                                      ticks: xlabels,
                                      rotateTicks: 90},
                                      yaxis:{ticks: [[0.5, "Yes"], [-0.5, "No"]], axisLabel: nameVar2},

                                      grid: {hoverable: true, clickable: true},
                                      legend:{
                                        noColumns: 0,
                                        container: $("#legendcontainer-daily")
                                        },
                                    
                                      });

                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   if(y==1)
                                        y= "Yes";
                                   else if(y==-1)
                                        y="No";
                                   
                                    $("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y)
                                    .css({top: item.pageY+5, left: item.pageX+5})
                                    .fadeIn(200);
                                
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   
                                   if(y==1)
                                        y= "Yes";
                                   else if(y==-1)
                                        y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });

                  
                    }//end if(typeVar1=='binary' && typeVar2=='binary')
                  
                  else if(typeVar1=="binary" || typeVar2=="binary")
                  {
                  
                        var d1 = [];
                        var d2 = [];
                        var ylabels = [];
                        var label2;
                  
                        if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2== "count") )
                        {
                            label2 = nameVar2;
                            ylabels[0] = nameVar1+" Yes";
                            ylabels[1] = nameVar1+" No";
                                for(var i=0; i < values2.length; ++i)
                                {

                  
                                    if(values1[i]==1)
                                        d1.push([i, values2[i]]);

                                    if(values1[i]==0)
                                        d2.push([i, values2[i]]);
                                }//end for

                  
                        }//end if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2== "count"))
                  
                    if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1== "count") )
                    {
                  
                        label2 = nameVar1;
                        ylabels[0] = nameVar2+" Yes";
                        ylabels[1] = nameVar2+" No";
                        for(var i=0; i < values1.length; ++i)
                        {

                            if(values2[i]==1)
                                d1.push([i, values1[i]]);
                  
                            if(values2[i]==0)
                                d2.push([i, values1[i]]);
                        }//end for
                  }//end if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1== "count"))
                  

                  var xlabels = [];
                  
                  for (var i=0; i <times.length; ++i) {
                  //alert("times[0]="+times[0]);
                    var xlabel = [];
                    xlabel.push(i, times[i]);
                    xlabels.push(xlabel);
                  }
 
                  var data = [{ data: d1, label: ylabels[0], color: "blue" }, { data: d2, label: ylabels[1], color: "red"}];
                  var placeholder = $("#placeholder-daily");
                  var plot = $.plot(placeholder, data, {
                                    bars: { show: true, barWidth: 0.5, fill: 0.9},
                                    xaxis: {tickLength: 0,
                                    //min: 0.5,
                                    //max: ticks.length+0.5,
                                    ticks: xlabels,
                                    rotateTicks: 90},
                                    yaxis:{axisLabel: label2},
                                    
                                    grid: {hoverable: true, clickable: true},
                                    legend:{
                                    noColumns: 0,
                                    container: $("#legendcontainer-daily")
                                    },
                                    
                                    });
                  
                  
                  
                  
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                         
                                        //    if ($("#enablePosition:checked").length > 0)
                                        {
                                         var str = "(" + pos.x.toFixed(2) + " , " + pos.y.toFixed(2) + ")";
                                         //$("#hoverdata").text(str);
                                         }
                                         
                                         //if ($("#enableTooltip:checked").length > 0)
                                        {
                                         if (item) {
                                         var x = item.datapoint[0].toFixed(2),
                                         y = item.datapoint[1].toFixed(2);
                                   
                                         $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                         .css({top: item.pageY+5, left: item.pageX+5})
                                         .fadeIn(200);
                                   
                                         } else {
                                         $("#tooltip").hide();
                                         }
                                         }
                                         });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                         if (item)
                                        {
                                            //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                            var x = item.datapoint[0].toFixed(2),
                                                y = item.datapoint[1].toFixed(2);
                                   
                                            $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                                .css({top: item.pageY+5, left: item.pageX+5})
                                                .fadeIn(200);

                                            plot.highlight(item.series, item.datapoint);
                                         }
                                         });
                  
                  } //end else if(typeVar1=="binary" || typeVar2=="binary")
                  else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )
                  {
                  
                 
                    var d1 = [];
                    var d2 = [];
 
                    var xlabels = [];
                  
                    for (var i=0; i <times.length; ++i) {
                        //alert("times[0]="+times[0]);
                            var xlabel = [];
                            xlabel.push(i, times[i]);
                            xlabels.push(xlabel);
                  
                        d1.push([i, values1[i]]);
                        d2.push([i, values2[i]]);

                    }

                  
                  var ylabels = [];
                  ylabels[0] = nameVar2+" Yes";
                  ylabels[1] = nameVar2+" No";
                  
                  var data = [{ data: d1, label: nameVar1, color: "blue" }, { data: d2, label: nameVar2, color: "red", yaxis:2 }];
                  
                  
                  var placeholder = $("#placeholder-daily");
                  
                  var plot = $.plot(placeholder, data,
                                    
                                    {
                                        lines: {show:true},
                                        points: {show:true},
                                    xaxis: //{ ticks: xlabels, autoscaleMargin: 1},
                                    
                                    {
                                    
                                    tickLength: 0,
                                    //min: 0.5,
                                    //max: ticks.length+0.5,
                                    ticks: xlabels,
                                    rotateTicks: 90
                                    
                                    },
                                    yaxes: [ { min: 0 }, { position: "right"} ],
                                    
                                    grid: {hoverable: true, clickable: true},
                                    legend:{
                                        noColumns: 0,
                                        container: $("#legendcontainer-daily")
                                    },

                                    
                                    });
                  
                  
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                    $("#tooltip").html(item.series.label +  " = " + y)
                                    .css({top: item.pageY+5, left: item.pageX+5})
                                    .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   $("#tooltip").html(item.series.label + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });

                  }//end else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )
                  
                  
                  
                  });


</script>


<div id="content">
    <div class="demo-container">
        <div id="legendcontainer-daily"></div>
        <div id="placeholder-daily" class="demo-placeholder" style="height: 400px; width: 100%;"></div>

        <span id="hoverdata"></span>
        <span id="clickdata"></span>
    </div>
</div>



<?php
    
    /*
     If any of the two varaibles is binary, show the cumulative results.
     */
    if( $variableTypes[$variable_chart1_index] == "binary" || $variableTypes[$variable_chart2_index] == "binary")
    {
    
 echo "<br><br>All participants' results (cumulative)";

?>

<script type="text/javascript">

$(document).ready(function() {
                  
                  if(typeVar1=="binary" && typeVar2=="binary")
                  {
                  
                  var dc1 = [];
                  var dc2 = [];

                  var count1 = 0;
                  var count2 = 0;
                  var count3 = 0;
                  var count4 = 0;
                  
                  for (var i = 0; i < times.length; ++i)
                  {
                        if(values1[i]==1 && values2[i]==1)
                        {
                            count1++;
                        }
                  
                        if(values1[i]==1 && values2[i]==0)
                        {
                            count2++;
                        }
                  
                        if(values1[i]==0 && values2[i]==1)
                        {
                            count3++;
                        }
                  
                        if(values1[i]==0 && values2[i]==0)
                        {
                            count4++;
                        }
                  }//end for
                  
                  dc1.push([0, count1]);
                  dc1.push([3, count2]);
                  
                  dc2.push([1, count3]);
                  dc2.push([4, count4]);
                  
                  var xlabels1 = [];
                  var xlabel1 = [];
                  xlabel1.push(1, nameVar2+":Yes");
                  xlabels1.push(xlabel1);
                  
                  var xlabel2 = [];
                  xlabel2.push(4, nameVar2+":No");
                  xlabels1.push(xlabel2);
                  
                  

                  var ylabels = [];
                  ylabels[0] = nameVar2+" Yes";
                  ylabels[1] = nameVar2+" No";
                  
                  var data = [{ data: dc1, label: nameVar1+":Yes", color: "blue" }, { data: dc2, label: nameVar1+":No", color: "red" }];
                  
                  
                  var placeholder = $("#placeholder-cumulative");
                  
                  var plot = $.plot(placeholder, data, {
                                    bars: { show: true, barWidth: 1, fill: 0.9 },
                                    xaxis:{ ticks: xlabels1, autoscaleMargin: 1},
                                    grid: {hoverable: true, clickable: true},
                                    legend:{
                                        noColumns: 0,
                                        container: $("#legendcontainer-cumulative")
                                    },
                                    });
                 
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   
                                   var label2 = nameVar2;
                                   
                                   if(x==0 || x==1)
                                        label2 += "Yes";
                                   if(x==3 || x==4)
                                        label2 += "No";
                                   
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   var label2 = nameVar2;
                                   
                                   if(x==0 || x==1)
                                        label2 += "Yes";
                                   if(x==3 || x==4)
                                        label2 += "No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });

                  
                  
                  }//end if(typeVar1=='binary' && typeVar2=='binary')
                  
                  
                  else if(typeVar1=="binary" || typeVar2=="binary")
                  {
                  
                        var d1 = [];
                        var d2 = [];
                        var ylabels = [];
                        var xlabels1 = [];
                        var totalCount1 = 0;
                        var totalCount2 = 0;
                        var avgScore1 = 0;
                        var avgScore2 = 0;
                        var count1 = 0;
                        var count2 = 0;
                        var label2;
                  
                  if(typeVar1 == "binary")
                  {
                  
                        label2 = nameVar2;
                        ylabels[0] = nameVar1+" Yes";
                        ylabels[1] = nameVar1+" No";
                  
                        var xlabel1 = [];
                        xlabel1.push(0.2, nameVar1+":Yes");
                        xlabels1.push(xlabel1);
                  
                        var xlabel2 = [];
                        xlabel2.push(1.2, nameVar1+":No");
                        xlabels1.push(xlabel2);
                  
                        if(typeVar2=="score")
                        {
                            for(var i=0; i < values2.length; ++i)
                            {
                                if(values1[i] == 1)
                                {
                                    count1++;
                                    avgScore1 = parseInt(avgScore1) + parseInt(values2[i]);
                                }
                                if(values1[i] == 0)
                                {
                                    count2++;
                                    avgScore2 = parseInt(avgScore2) + parseInt(values2[i]);
                                }
                            }//end for
                  
        
                            d1.push([0, avgScore1/count1]);
                            d2.push([1, avgScore2/count2]);
                  
                        }//end if(typeVar2=="score")
                  
                        if(typeVar2=="count")
                        {
                            for(var i=0; i < values2.length; ++i)
                            {
                                if(values1[i] == 1)
                                {
                                    totalCount1 = parseInt(totalCount1) + parseInt(values2[i]);
                                }
                                if(values1[i] == 0)
                                {
                                    //alert("parseInt(values2[i]="+parseInt(values2[i]);
                                    //alert("values2[i]="+values2[i]);
                                    //alert("totalCount2="+totalCount2);
                                    totalCount2 = parseInt(totalCount2) + parseInt(values2[i]);
                                }
                            }//end for
                  
                  
                            d1.push([0, totalCount1]);
                            d2.push([1, totalCount2]);
                  
                        }//end if(typeVar2=="count")
                  
                  
                  }//end if(typeVar1 == "binary")
                  
                  else if(typeVar2 == "binary")
                  {
                  
                    label2 = nameVar1;
                    ylabels[0] = nameVar2+" Yes";
                    ylabels[1] = nameVar2+" No";
                  
                    var xlabel1 = [];
                    xlabel1.push(0.2, nameVar2+":Yes");
                    xlabels1.push(xlabel1);
                  
                    var xlabel2 = [];
                    xlabel2.push(1.2, nameVar2+":No");
                    xlabels1.push(xlabel2);
                  
                    if(typeVar1=="score")
                    {
                        for(var i=0; i < values1.length; ++i)
                        {
                            if(values2[i] == 1)
                            {
                                count1++;
                                avgScore1 = parseInt(avgScore1) + parseInt(values1[i]);
                            }
                            if(values2[i] == 0)
                            {
                                count2++;
                                avgScore2 = parseInt(avgScore2) + parseInt(values1[i]);
                            }
                        }//end for
                  
                  
                        d1.push([0, avgScore1/count1]);
                        d2.push([1, avgScore2/count2]);
                  
                  }//end if(typeVar1=="score")
                  
                    if(typeVar1=="count")
                    {
                        for(var i=0; i < values1.length; ++i)
                        {
                            if(values2[i] == 1)
                            {
                                totalCount1 = parseInt(totalCount1) + parseInt(values1[i]);
                            }
                            if(values2[i] == 0)
                            {
                                totalCount2 = parseInt(totalCount2) + parseInt(values1[i]);
                            }
                        }//end for
                  
                  
                        d1.push([0, totalCount1]);
                        d2.push([1, totalCount2]);
                    }//end if(typeVar2=="count")
                  
                  
                  }//end if(typeVar2 == "binary")
                  

                  var data = [{ data: d1, label: ylabels[0], color: "blue" }, { data: d2, label: ylabels[1], color: "red"}];
                
                  var placeholder = $("#placeholder-cumulative");
                  
                  
                  
                  var plot = $.plot(placeholder, data, {
                                    bars: { show: true, barWidth: 0.5, fill: 0.9 },
                                    
                                    xaxis: { ticks: xlabels1, autoscaleMargin: 1},
                                    yaxis:{axisLabel: label2},
                                    
                                    grid: {hoverable: true, clickable: true},
                                    
                                    legend:{
                                        noColumns: 0,
                                        container: $("#legendcontainer-cumulative")
                                    },
                                    });
                  
                  
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });
                  
                  
                  
                  
                  
                  
                  
                  
                  } //end else if(typeVar1=="binary" || typeVar2=="binary")
                  
                  

                  });


</script>





<div id="content">
    <div class="demo-container">
        <div id="legendcontainer-cumulative"></div>
    <div id="placeholder-cumulative" class="demo-placeholder" style="height: 400px; width: 100%;"></div>

    <span id="hoverdata"></span>
    <span id="clickdata"></span>
</div>
</div>



<?php
    
    }//end if( $variableTypes[$variable_chart1_index] == "binary" || $variableTypes[$variable_chart2_index] == "binary")

    /*
     
     Retreiving an individual participant's resutls from the database
     */
    
    //$result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
    

    for ($x=0; $x<count($variableNames); $x++)
    {
        
        $name = $variableNames[$x];
        $id = $variableIds[$x];
        
        //$statement = "select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$id and user_id=$currentUserId";
        //echo $statement;
        
        //$result5=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$id and user_id=$currentUserId");
        
        if($experiment_results_period == 0)
            $result5=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$id and user_id=$currentUserId");
        
        if($experiment_results_period == 30)
            $result5=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$id and user_id=$currentUserId AND date_modified BETWEEN NOW() - INTERVAL 30 DAY AND NOW()");
        
        if($experiment_results_period == 7)
            $result5=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$id and user_id=$currentUserId AND date_modified BETWEEN NOW() - INTERVAL 7 DAY AND NOW()");
        
        
        $index = 0;
        
        do{
            $row=mysql_fetch_array($result5);
            if($row){
                
                //$index = $index+1;
                //Add datetime value only once
                if($x==0)
                   $dateTimesPP[] = $row['date_modified'];
                $val = $row['variable_value'];
                if($val == 'Yes' || $val == 'yes')
                    $val = 1;
                if($val == 'No' || $val == 'no')
                    $val = 0;
                
                //$variableNameValues[] = $row['variable_value'];
                $variableNameValuesPP[] = $val;
            }//end if($row)
        } while($row);
        
        
        for ($y=0; $y<count($variableNameValuesPP); $y++) {
            
            $value = $variableNameValuesPP[$y];
            //echo "$value <br>";
            
        }//end for
        
        $variableValuesPP[$x] = $variableNameValuesPP;
        $variableNameValuesPP = NULL;
        
    }//end for ($x=0; $x<count($variableNames); $x++)
    
?>

<script type="text/javascript">
//var xdata = <?php echo json_encode($xdata); ?>;

var names = <?php echo json_encode($variableNames); ?>;
var valuesPP = <?php echo json_encode($variableValuesPP); ?>;

var timesPP = <?php echo json_encode($dateTimesPP); ?>;

//var values1 = <?php echo json_encode($variableValues[0]); ?>;
//var values2 = <?php echo json_encode($variableValues[1]); ?>;

var valuesPP1 = <?php echo json_encode($variableValuesPP[$variable_chart1_index]); ?>;
var valuesPP2 = <?php echo json_encode($variableValuesPP[$variable_chart2_index]); ?>;

//alert(values1[0]);
//alert(values2[0]);

</script>


<?php
    
    if(count($dateTimesPP) == 0)
    {
        echo "<br><br>You have not reported your results to this experiment. Please report them.";
    }
    
    if(count($dateTimesPP) > 0)
    {
    //echo count($dateTimesPP);
    echo "<br><br>Your results (daily)";
    

?>

<script type="text/javascript">

$(document).ready(function() {
                  
                  
                  
                  if(typeVar1=="binary" && typeVar2=="binary")
                  {
                  
                  var d1 = [];
                  var d2 = [];
                  var dOne = 0;
                  var dTwo = 0;
                  
                  
                  
                  for (var i = 0; i < timesPP.length; ++i)
                  {
                    if(valuesPP1[i]==1 && valuesPP2[i]==1)
                    {
                        d1.push([i, 1]);
                    }
                  
                    if(valuesPP1[i]==1 && valuesPP2[i]==0)
                    {
                        d1.push([i, -1]);
                    }
                  
                    if(valuesPP1[i]==0 && valuesPP2[i]==1)
                    {
                        d2.push([i, 1]);
                    }
                    if(valuesPP1[i]==0 && valuesPP2[i]==0)
                    {
                        d2.push([i, -1]);
                    }
                  
                  }//end for
                  
                  var xlabels = [];
                  
                  for (var i=0; i <timesPP.length; ++i)
                  {
                    //alert("times[0]="+times[0]);
                    var xlabel = [];
                    xlabel.push(i, timesPP[i]);
                    xlabels.push(xlabel);
                  }
                  
                  var ylabels = [];
                  ylabels[0] = nameVar2+" Yes";
                  ylabels[1] = nameVar2+" No";
                  
                  var data = [{ data: d1, label: nameVar1+" Yes", color: "blue" }, { data: d2, label: nameVar1+" No", color: "red" }];
                  


                  var placeholder = $("#placeholder-daily-pp");
                  
                  var plot = $.plot(placeholder, data, {
                                    bars: { show: true, barWidth: 0.5, fill: 0.9 },
                                    xaxis:
                                    {
                                    tickLength: 0,
                                    //min: 0.5,
                                    //max: ticks.length+0.5,
                                    ticks: xlabels,
                                    rotateTicks: 90
                                    },
                                    yaxis:{ticks: [[0.5, "Yes"], [-0.5, "No"]], axisLabel: nameVar2},
                                    grid: {hoverable: true, clickable: true},
                                    legend:{
                                        noColumns: 0,
                                        container: $("#legendcontainer-daily-pp")
                                    },
                                    });
                  
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + nameVar2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });
                  

                  
                  
                  }//end if(typeVar1=='binary' && typeVar2=='binary')
                  
                  else if(typeVar1=="binary" || typeVar2=="binary")
                  {

                  
                  
                  var d1 = [];
                  var d2 = [];
                  var ylabels = [];
                  var label2;
                  
                  if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2== "count") )
                  {
                  label2 = nameVar2;
                  ylabels[0] = nameVar1+" Yes";
                  ylabels[1] = nameVar1+" No";
                  for(var i=0; i < valuesPP2.length; ++i)
                  {
                    if(valuesPP1[i]==1)
                        d1.push([i, valuesPP2[i]]);
                  
                    if(valuesPP1[i]==0)
                        d2.push([i, valuesPP2[i]]);
                  }//end for
                  
                  
                  }//end if(typeVar1 == "binary" && (typeVar2== "score" || typeVar2== "count"))
                  
                  if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1== "count") )
                  {
                    label2 = nameVar1;
                    ylabels[0] = nameVar2+" Yes";
                    ylabels[1] = nameVar2+" No";
                    for(var i=0; i < valuesPP1.length; ++i)
                    {
                  
                    if(valuesPP2[i]==1)
                        d1.push([i, valuesPP1[i]]);
                  
                    if(valuesPP2[i]==0)
                        d2.push([i, valuesPP1[i]]);
                    }//end for
                  }//end if(typeVar2 == "binary" && (typeVar1== "score" || typeVar1== "count"))
                  
                  
                  var xlabels = [];
                  
                  for (var i=0; i <timesPP.length; ++i) {
                  //alert("times[0]="+times[0]);
                  var xlabel = [];
                  xlabel.push(i, timesPP[i]);
                  xlabels.push(xlabel);
                  }
                  
                  
                  
                  
                  var data = [{ data: d1, label: ylabels[0], color: "blue" }, { data: d2, label: ylabels[1], color: "red" }];
                  
                  var placeholder = $("#placeholder-daily-pp");
                  
                  var plot = $.plot(placeholder, data, {
                                    bars: { show: true, barWidth: 0.5, fill: 0.9 },
                                    
                                    xaxis:{
                                    tickLength: 0,
                                    //min: 0.5,
                                    //max: ticks.length+0.5,
                                    ticks: xlabels,
                                    rotateTicks: 90
                                    
                                    },
                                    
                                    yaxis:{axisLabel: label2},
                                    
                                    grid: {hoverable: true, clickable: true},
                                     
                                    legend:{
                                    noColumns: 0,
                                    container: $("#legendcontainer-daily-pp")
                                    },
                                     

                                    });
                  

                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });
                  

                  
                  

                  }//end else if(typeVar1=="binary" || typeVar2=="binary")
                  
                  else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )
                  {
                  
                  
                  var d1 = [];
                  var d2 = [];
                  
                  var xlabels = [];
                  
                  for (var i=0; i <timesPP.length; ++i) {
                  //alert("times[0]="+times[0]);
                  var xlabel = [];
                  xlabel.push(i, timesPP[i]);
                  xlabels.push(xlabel);
                  
                  d1.push([i, valuesPP1[i]]);
                  d2.push([i, valuesPP2[i]]);
                  
                  }
                  
                  
                  var ylabels = [];
                  ylabels[0] = nameVar2+" Yes";
                  ylabels[1] = nameVar2+" No";
                  
                  var data = [{ data: d1, label: nameVar1, color: "blue" }, { data: d2, label: nameVar2, color: "red", yaxis: 2 }];
                  
                  
                  var placeholder = $("#placeholder-daily-pp");

                  var plot = $.plot(placeholder, data,
                                    
                                    {
                                    lines: {show:true},
                                    points: {show:true},
                                    xaxis: //{ ticks: xlabels, autoscaleMargin: 1},
                                    
                                    {
                                    
                                    tickLength: 0,
                                    //min: 0.5,
                                    //max: ticks.length+0.5,
                                    ticks: xlabels,
                                    rotateTicks: 90
                                    
                                    },
                                    yaxes: [ { min: 0 }, { position: "right"} ],
                                    
                                    grid: {hoverable: true, clickable: true},
                                    legend:{
                                    noColumns: 0,
                                    container: $("#legendcontainer-daily-pp")
                                    },
                                    
                                    
                                    });
                  
                  
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   $("#tooltip").html(item.series.label +  " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   $("#tooltip").html(item.series.label + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });

                  
                  
                  
                  }//end else if( (typeVar1== "score" || typeVar1== "count") && (typeVar2== "score" || typeVar2== "count")  )

                  
                  
                  });

</script>



<div id="content">
    <div class="demo-container">
        <div id="legendcontainer-daily-pp"></div>
        <div id="placeholder-daily-pp" class="demo-placeholder" style="height: 400px; width: 100%;"></div>
    </div>

    <span id="hoverdata"></span>
    <span id="clickdata"></span>

</div>

<?php

    if( $variableTypes[$variable_chart1_index] == "binary" || $variableTypes[$variable_chart2_index] == "binary")
    {
        echo "<br><br>Your results (cumulative)";
?>

<script type="text/javascript">

$(document).ready(function() {
                  

                  
                  
                  
                  if(typeVar1=="binary" && typeVar2=="binary")
                  {
                  
                  var dc1 = [];
                  var dc2 = [];
                  
                  var count1 = 0;
                  var count2 = 0;
                  var count3 = 0;
                  var count4 = 0;
                  
                  for (var i = 0; i < timesPP.length; ++i)
                  {
                  if(valuesPP1[i]==1 && valuesPP2[i]==1)
                  {
                  count1++;
                  }
                  
                  if(valuesPP1[i]==1 && valuesPP2[i]==0)
                  {
                  count2++;
                  }
                  
                  if(valuesPP1[i]==0 && valuesPP2[i]==1)
                  {
                  count3++;
                  }
                  
                  if(valuesPP1[i]==0 && valuesPP2[i]==0)
                  {
                  count4++;
                  }
                  }
                  
                  dc1.push([0, count1]);
                  dc1.push([3, count2]);
                  
                  dc2.push([1, count3]);
                  dc2.push([4, count4]);
                  
                  
                  
                  var xlabels1 = [];
                  var xlabel1 = [];
                  xlabel1.push(1, nameVar2+":Yes");
                  xlabels1.push(xlabel1);
                  
                  var xlabel2 = [];
                  xlabel2.push(4, nameVar2+":No");
                  xlabels1.push(xlabel2);
                  
                  
                  
                  var ylabels = [];
                  ylabels[0] = nameVar2+" Yes";
                  ylabels[1] = nameVar2+" No";
                  
                  var data = [{ data: dc1, label: nameVar1+":Yes", color: "blue" }, { data: dc2, label: nameVar1+":No", color: "red" }];
                  
                  
                  var placeholder = $("#placeholder-cumulative-pp");
                  
                  
                  var placeholder = $("#placeholder-cumulative-pp");
                  
                  var plot = $.plot(placeholder, data, {
                                    bars: { show: true, barWidth: 1, fill: 0.9 },
                                    xaxis:{ ticks: xlabels1, autoscaleMargin: 1},
                                    grid: {hoverable: true, clickable: true},
                                    legend:{
                                    noColumns: 0,
                                    container: $("#legendcontainer-cumulative-pp")
                                    },
                                    });
                  
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + ", " + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   
                                   var label2 = nameVar2;
                                   
                                   if(x==0 || x==1)
                                   label2 += "Yes";
                                   if(x==3 || x==4)
                                   label2 += "No";
                                   
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   var label2 = nameVar2;
                                   
                                   if(x==0 || x==1)
                                   label2 += "Yes";
                                   if(x==3 || x==4)
                                   label2 += "No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });
                  

                  
                  
                  }//end if(typeVar1=='binary' && typeVar2=='binary')
                  
                  else if(typeVar1=="binary" || typeVar2=="binary")
                  {
                  
                  var d1 = [];
                  var d2 = [];
                  var ylabels = [];
                  var xlabels1 = [];
                  var totalCount1 = 0;
                  var totalCount2 = 0;
                  var avgScore1 = 0;
                  var avgScore2 = 0;
                  var count1 = 0;
                  var count2 = 0;
                  var label2;
                  
                  if(typeVar1 == "binary")
                  {
                  label2 = nameVar2;
                  ylabels[0] = nameVar1+" Yes";
                  ylabels[1] = nameVar1+" No";
                  
                  var xlabel1 = [];
                  xlabel1.push(0.2, nameVar1+":Yes");
                  xlabels1.push(xlabel1);
                  
                  var xlabel2 = [];
                  xlabel2.push(1.2, nameVar1+":No");
                  xlabels1.push(xlabel2);
                  
                  if(typeVar2=="score")
                  {
                  for(var i=0; i < valuesPP2.length; ++i)
                  {
                  if(valuesPP1[i] == 1)
                  {
                    count1++;
                    avgScore1 = parseInt(avgScore1)+ parseInt(valuesPP2[i]);
                  }
                  if(valuesPP1[i] == 0)
                  {
                    count2++;
                    avgScore2 = parseInt(avgScore2)+ parseInt(valuesPP2[i]);
                  }
                  }//end for
                  
                  
                  d1.push([0, avgScore1/count1]);
                  d2.push([1, avgScore2/count2]);
                  
                  }//end if(typeVar2=="score")
                  
                  if(typeVar2=="count")
                  {
                    for(var i=0; i < valuesPP1.length; ++i)
                    {
                        if(valuesPP1[i] == 1)
                        {
                            totalCount1 = parseInt(totalCount1) + parseInt(valuesPP2[i]);
                        }
                  
                        if(valuesPP1[i] == 0)
                        {
                            totalCount2 = parseInt(totalCount2) + parseInt(valuesPP2[i]);
                            //alert("valuesPP2[i]="+valuesPP2[i]);
                            //alert("totalCount2="+totalCount2);
                  
                        }
                    }//end for
                  
                  
                  
                  
                    d1.push([0, totalCount1]);
                    d2.push([1, totalCount2]);
                  
                  }//end if(typeVar2=="count")
                  
                  
                  }//end if(typeVar1 == "binary")
                  
                  else if(typeVar2 == "binary")
                  {
                  label2 = nameVar1;
                  ylabels[0] = nameVar2+" Yes";
                  ylabels[1] = nameVar2+" No";
                  
                  var xlabel1 = [];
                  xlabel1.push(0.2, nameVar2+":Yes");
                  xlabels1.push(xlabel1);
                  
                  var xlabel2 = [];
                  xlabel2.push(1.2, nameVar2+":No");
                  xlabels1.push(xlabel2);
                  
                  if(typeVar1=="score")
                  {
                    for(var i=0; i < valuesPP1.length; ++i)
                    {
                    if(valuesPP2[i] == 1)
                    {
                        count1++;
                        avgScore1 = parseInt(avgScore1)+ parseInt(valuesPP1[i]);
                    }
                    if(valuesPP2[i] == 0)
                    {
                        count2++;
                        avgScore2 = parseInt(avgScore2) + parseInt(valuesPP1[i]);
                    }
                }//end for
                  
                  
                  d1.push([0, avgScore1/count1]);
                  d2.push([1, avgScore2/count2]);
                  
                  }//end if(typeVar1=="score")
                  
                  if(typeVar1=="count")
                  {
                  for(var i=0; i < valuesPP1.length; ++i)
                  {
                    if(valuesPP2[i] == 1)
                    {
                            totalCount1 = parseInt(totalCount1)+ parseInt(valuesPP1[i]);
                    }
                    if(valuesPP2[i] == 0)
                    {
                            totalCount2 = parseInt(totalCount2)+ parseInt(valuesPP1[i]);
                    }
                  }//end for
                  
                  
                  d1.push([0, totalCount1]);
                  d2.push([1, totalCount2]);
                  
                  }//end if(typeVar2=="count")
                  
                  
                  }//end if(typeVar2 == "binary")
                  
                  
                  var data = [{ data: d1, label: ylabels[0], color: "blue" }, { data: d2, label: ylabels[1], color: "red" }];
                  
                  var placeholder = $("#placeholder-cumulative-pp");

                  var plot = $.plot(placeholder, data, {
                                    bars: { show: true, barWidth: 0.5, fill: 0.9 },
                                    
                                    xaxis: { ticks: xlabels1, autoscaleMargin: 1},

                                    
                                    yaxis:{axisLabel: label2},
                                    
                                    grid: {hoverable: true, clickable: true},
                                    
                                    legend:{
                                    noColumns: 0,
                                    container: $("#legendcontainer-cumulative-pp")
                                    },
                                    
                                    
                                    });
                  
                  
                  $("<div id='tooltip'></div>").css({
                                                    position: "absolute",
                                                    display: "none",
                                                    border: "1px solid #fdd",
                                                    padding: "2px",
                                                    "background-color": "#fee",
                                                    opacity: 0.80
                                                    }).appendTo("body");
                  
                  placeholder.bind("plothover", function (event, pos, item) {
                                   
                                   //    if ($("#enablePosition:checked").length > 0)
                                   {
                                   var str = "(" + pos.x.toFixed(2) + "," + pos.y.toFixed(2) + ")";
                                   //$("#hoverdata").text(str);
                                   }
                                   
                                   //if ($("#enableTooltip:checked").length > 0)
                                   {
                                   if (item) {
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   } else {
                                   $("#tooltip").hide();
                                   }
                                   }
                                   });
                  
                  placeholder.bind("plotclick", function (event, pos, item) {
                                   if (item)
                                   {
                                   //$("#clickdata").text(" - click point " + item.dataIndex + " in " + item.series.label);
                                   var x = item.datapoint[0].toFixed(2),
                                   y = item.datapoint[1].toFixed(2);
                                   
                                   
                                   if(y==1)
                                   y= "Yes";
                                   else if(y==-1)
                                   y="No";
                                   
                                   $("#tooltip").html(item.series.label + " , " + label2 + " = " + y)
                                   .css({top: item.pageY+5, left: item.pageX+5})
                                   .fadeIn(200);
                                   
                                   plot.highlight(item.series, item.datapoint);
                                   }
                                   });
                  

                  
                  
                  
                  
                  } //end else if(typeVar1=="binary" || typeVar2=="binary")
                  
                  });


</script>

<div id="content">

    <div class="demo-container">
        <div id="legendcontainer-cumulative-pp"></div>
        <div id="placeholder-cumulative-pp" class="demo-placeholder" style="height: 400px; width: 100%;"></div>
    </div>

    <span id="hoverdata"></span>
    <span id="clickdata"></span>

</div>

<?php
            }//end if( $variableTypes[$variable_chart1_index] == "binary" || $variableTypes[$variable_chart2_index] == "binary")
        }//end if (count($dateTimesPP) > 0)
    }//end if(experiment_count>0)
?>

<?php endif; ?><!-- end  (is_user_logged_in() && bp_experiment_is_member() ) -->

</div>