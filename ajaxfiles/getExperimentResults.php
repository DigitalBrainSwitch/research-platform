<?php

    $experimentId=$_REQUEST["experimentId"];
	$userId=$_REQUEST["userId"];
	$variable1=$_REQUEST["variable1"];
	$variable2=$_REQUEST["variable2"]; 
	$typeVar1=$_REQUEST["typeVar1"]; 
	$typeVar2=$_REQUEST["typeVar2"]; 
	
	//$experiment_results_period = $_REQUEST["experiment_results_period"];
	//$experiment_results_period = 30;
	//$experiment_results_start_date = $_REQUEST["experiment_results_start_date"];
		
	$variable1_values;
    $variable2_values;
	
	$user_variable1_values;
    $user_variable2_values;
	
	$times;
	$user_times;
	
	$result4;
	$result5;

		
    // Create a connection
    $connection = mysql_connect("localhost", "root", "") or die(mysql_error());
    //$connection = mysql_connect("digitalbrain-test.lancs.ac.uk", "urashid", "password") or die(mysql_error());
    
    //Select database
    mysql_select_db("wordpress", $connection) or die(mysql_error());
    
    if($variable1!=-1)
    {
    	//$result4 = mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentId AND variable_id=$variable1");
		
		
		if($typeVar1 == "binary")
		{
			
			$query4 = "select * from wp_bp_experiments_report where experiment_id='$experimentid' 
			AND variable_id='$variable1' AND date_format(date_modified, '%d-%m-%Y')='$dateTimesPP[$x]' 
			ORDER BY time(date_modified) DESC LIMIT 1";
			
			$query5 = "select * from wp_bp_experiments_report where experiment_id='$experimentid' 
			AND user_id=$currentUserId AND variable_id='$id' AND date_format(date_modified, '%d-%m-%Y')='$dateTimesPP[$x]' 
			ORDER BY time(date_modified) DESC LIMIT 1";
		}
		
		
		
		$result5 = mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentId AND variable_id=$variable1 AND user_id=$userId");
		

		$index = 0;

		if (!$result4) { // add this check.
            die('Invalid query: ' . mysql_error());
        }//end if
        else
        {
	        do {
				$row = mysql_fetch_array($result4);
				if ($row) 
				{
					$times[] = $row['date_modified'];
					$val = $row['variable_value'];
					if ($val == 'Yes' || $val == 'yes')
						$val = 1;
					if ($val == 'No' || $val == 'no')
						$val = 0;
		
					//$variableNameValues[] = $row['variable_value'];
					$variable1_values[] = $val;
				}//end if($row)
			} while($row);	
		}//end else

		if (!$result5) { // add this check.
            die('Invalid query: ' . mysql_error());
        }//end if
        else
        {
	        do {
				$row = mysql_fetch_array($result5);
				if ($row) 
				{
					$user_times[] = $row['date_modified'];
					$val = $row['variable_value'];
					if ($val == 'Yes' || $val == 'yes')
						$val = 1;
					if ($val == 'No' || $val == 'no')
						$val = 0;
		
					//$variableNameValues[] = $row['variable_value'];
					$user_variable1_values[] = $val;
				}//end if($row)
			} while($row);	
        }//end else

	}//end if($variable1!=-1)
	else
	{
		$variable1_values[0] = 0;
        $user_variable1_values[0] = 0;   
	}//end else
	
	
    if($variable2!=-1)
    {

    	$result4 = mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentId AND variable_id=$variable2");
		
		$result5 = mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentId AND variable_id=$variable2 AND user_id=$userId");
    	
    	
 		$index = 0;
 		
 
 		if (!$result4) { // add this check.
            die('Invalid query: ' . mysql_error());
        }//end if
        else
        {
			do {
				$row = mysql_fetch_array($result4);
				if ($row) 
				{
					if($variable1==-1)
					{
						$times[] = $row['date_modified'];
					}
	
					$val = $row['variable_value'];
					if ($val == 'Yes' || $val == 'yes')
						$val = 1;
					if ($val == 'No' || $val == 'no')
						$val = 0;
		
					//$variableNameValues[] = $row['variable_value'];
					$variable2_values[] = $val;
				}//end if($row)
			} while($row);  
	        	
        }//end else		



 
 		if (!$result5) { // add this check.
            die('Invalid query: ' . mysql_error());
        }//end if
        else
        {
	        do {
				$row = mysql_fetch_array($result5);
				if ($row) 
				{
					if($variable1==-1)
					{
						$user_times[] = $row['date_modified'];
					}
					$val = $row['variable_value'];
					if ($val == 'Yes' || $val == 'yes')
						$val = 1;
					if ($val == 'No' || $val == 'no')
						$val = 0;
		
					//$variableNameValues[] = $row['variable_value'];
					$user_variable2_values[] = $val;
				}//end if($row)
			} while($row);
        }//end else		
        
		

		 	
	}//end if($variable2!=-1)
	else
	{
		
		$variable2_values[0] = 0;
        $user_variable2_values[0] = 0;
		if($variable1==-1)
		{
			$times[0] = 0;
			$user_times[0] = 0;
		}
        
	}//end else
	
/*
		if (!isset($variable1_values)) {
    	echo "This var is not set.";
}
	*/	

echo json_encode(array('variable1_values' => $variable1_values, 
						'variable2_values' => $variable2_values, 
						'user_variable1_values' => $user_variable1_values,
						'user_variable2_values' => $user_variable2_values,
						'time_values' => $times, 
						'user_time_values' => $user_times));
	
	
	
?>
