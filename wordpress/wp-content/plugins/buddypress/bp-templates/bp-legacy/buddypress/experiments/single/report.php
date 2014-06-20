<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script type="text/javascript" src="http://dev.jquery.com/view/trunk/plugins/validate/jquery.validate.js"></script>
<!--script src="http://digitalbrain-test.lancs.ac.uk/chartjs/Chart.js"></script-->
<script src="http://digitalbrain-test.lancs.ac.uk/chartjs/Chart.js"></script>
<link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/themes/default.css" id="theme_base">
<link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/themes/default.date.css" id="theme_date">
<link rel="stylesheet" href="http://digitalbrain-test.lancs.ac.uk/uislider/jquery.nouislider.css">
<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/picker.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/picker.date.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/picker.time.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/datepicker/lib/legacy.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/uislider/jquery.nouislider.min.js"></script>
<script src="http://digitalbrain-test.lancs.ac.uk/wp-includes/js/bootstrap.min.js"></script>


<script>

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
    
    $variable_chart1_index = 0;
    $variable_chart2_index = 1;
    
    if(isset($_POST['chart']))
    {
        
        $variable_chart1 = $_POST['shown-variable1'];
        $variable_chart2 = $_POST['shown-variable2'];
        
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
    
    //echo $experimentid;
    
    // Create a connection
    //$connection = mysql_connect("digitalbrain-test.lancs.ac.uk", "root", "") or die(mysql_error());
    $connection = mysql_connect("digitalbrain-test.lancs.ac.uk", "urashid", "password") or die(mysql_error());
    
    //Select database
    mysql_select_db("wordpress", $connection) or die(mysql_error());
    
    $result=mysql_query("select * from wp_bp_experiments_variables where experiment_id=$experimentid");
    
    $cols=1;		// Here we define the number of columns
    
    
    global $variable_name1;
    global $variable_name2;
    
    //echo "experimentid="+$experimentid;
    ?>





<?php
    
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
                //echo $row['id'];
                
                //$img = $row['image_path'];
                ?>



<?php
    
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
<?php }     
    
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
    $variableNames = array();
    $variableValues = array();
    $variableNameValues = array();
    
    echo "<tr>";
    
    do{
        $row=mysql_fetch_array($result);
        if($row){
            $variableIds[] = $row['id'];
            $variableNames[] = $row['name'];
            
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
            
            $result2=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
            
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
    if($experiment_report_count>0)
    {

?>

<tr>




<form action="" method="post" id="show-experiment-chart" name="show-experiment-chart"  >

<td>
    <label for="x-variable">Variable 1</label>

    <select id="shown-variable1" name="shown-variable1" tabindex="-1">

<?php
    //$temp = "stresslevel";
    //echo $variable_chart1;
    
    //$result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
    
    for ($x=0; $x<count($variableNames); $x++)
    {
        
        if($variable_chart1 == $variableNames[$x])
        {
            $variable_chart1_index = $x;
            //echo "success"; <?php echo $row['id']; ?>
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
    
    
    //$result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
    
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
            else{
?>
            <option value="<?php echo $variableNames[$x]?>"><?php echo $variableNames[$x]?> </option>
<?php
            }//end else
        }//end if($variable_chart2==null)
        
        else if($variable_chart2!=NULL){
        
        if($variable_chart2 == $variableNames[$x])
        {
            $variable_chart2_index = $x;

?>
        <option value="<?php echo $variableNames[$x]?>" selected><?php echo $variableNames[$x]?> </option>

<?php
        }//end if
        else{
?>
            
       <option value="<?php echo $variableNames[$x]?>"><?php echo $variableNames[$x]?> </option>
<?php
    }//end else
    }//end else
    }//end for
?>

</select>
</td>


<td><input type="submit" value="<?php _e('chart', 'buddypress' ); ?>" id="experiment-show-variables-chart" name="chart" />
</td>

</form>

</tr>


<tr>

<?php
    

        //$result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$variableIds[0]");
    
    for ($x=0; $x<count($variableNames); $x++) {
        
        $name = $variableNames[$x];
        $id = $variableIds[$x];
        //echo "The variableId[$x] is $id and variableName[$x] $name  <br>";
        
        $result4=mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentid and variable_id=$id");
        
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

//alert(values1[0]);
//alert(values2[0]);

</script>


<canvas id="my-canvas" height="450" width="600"></canvas>
<script>



var lineChartData = {
    //labels : ["January","February","March","April","May","June","July"],
    labels : times,
    datasets : [
    {
        //fillColor : "rgba(220,220,220,0.5)",
        fillColor : "rgba(255,255,255,0)",
        //strokeColor : "rgba(220,220,220,1)",
        //pointColor : "rgba(220,220,220,1)",
        strokeColor : "rgba(0,0,0,1)",
        pointColor : "rgba(0,0,0,1)",
        data : values1
    }
 ,
    {
        //fillColor : "rgba(151,187,205,0.5)",
        fillColor : "rgba(255,255,255,0)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        data : values2
    }
    
    ]
    
}

var options = {
	//Boolean - If we show the scale above the chart data
	scaleOverlay : false,
	
	//Boolean - If we want to override with a hard coded scale
	scaleOverride : false,
	
	//** Required if scaleOverride is true **
	//Number - The number of steps in a hard coded scale
	scaleSteps : null,
	//Number - The value jump in the hard coded scale
	scaleStepWidth : null,
	//Number - The scale starting value
	scaleStartValue : null,
    
	//String - Colour of the scale line
	scaleLineColor : "rgba(0,0,0,.1)",
	
	//Number - Pixel width of the scale line
	scaleLineWidth : 1,
    
	//Boolean - Whether to show labels on the scale
	scaleShowLabels : true,
	
	//Interpolated JS string - can access value
	scaleLabel : "<%=value%>",
	
	//String - Scale label font declaration for the scale label
	scaleFontFamily : "'Arial'",
	
	//Number - Scale label font size in pixels
	scaleFontSize : 12,
	
	//String - Scale label font weight style
	scaleFontStyle : "normal",
	
	//String - Scale label font colour
	scaleFontColor : "#666",
	
	///Boolean - Whether grid lines are shown across the chart
	scaleShowGridLines : true,
	
	//String - Colour of the grid lines
	scaleGridLineColor : "rgba(0,0,0,.05)",
	
	//Number - Width of the grid lines
	scaleGridLineWidth : 1,
	
	//Boolean - Whether the line is curved between points
	bezierCurve : true,
	
	//Boolean - Whether to show a dot for each point
	pointDot : true,
	
	//Number - Radius of each point dot in pixels
	pointDotRadius : 3,
	
	//Number - Pixel width of point dot stroke
	pointDotStrokeWidth : 1,
	
	//Boolean - Whether to show a stroke for datasets
	datasetStroke : true,
	
	//Number - Pixel width of dataset stroke
	datasetStrokeWidth : 2,
	
	//Boolean - Whether to fill the dataset with a colour
	datasetFill : true,
	
	//Boolean - Whether to animate the chart
	animation : false,
    
	//Number - Number of animation steps
	//animationSteps : 60,
	
	//String - Animation easing effect
	//animationEasing : "easeOutQuart",
    
	//Function - Fires when the animation is complete
	//onAnimationComplete : null
};


//var myLine = new Chart(document.getElementById("my-canvas").getContext("2d")).Line(lineChartData);

var myLine = new Chart(  $("#my-canvas").get(0).getContext("2d")  ).Line(lineChartData, options);

</script>
</tr>

<tr>
    <td width="50%">
        <label for="experiment-variable1-label" style="color:rgba(0,0,0,1)"><b><?php echo $variableNames[$variable_chart1_index] ?></label>
    </td>


    <td width="50%">
        <label for="experiment-variable2-label" style="color:rgba(151,187,205,1)"><b><?php echo $variableNames[$variable_chart2_index] ?></label>
    </td>
</tr>

<?php
        }//end if(experiment_count>0)
?>

<?php endif; ?><!-- end  (is_user_logged_in() && bp_experiment_is_member() ) -->

</div>