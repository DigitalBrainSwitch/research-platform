<?php

    $experimentId=$_REQUEST["experimentId"];
	$userId=$_REQUEST["userId"];
    $friendId=$_REQUEST["friendId"];
	$variable1=$_REQUEST["variable1"];
	$variable2=$_REQUEST["variable2"];
	$typeVar1=$_REQUEST["typeVar1"];
	$typeVar2=$_REQUEST["typeVar2"];	
	//$dateTimes=$_REQUEST["times"];
	//$dateTimesPP=$_REQUEST["timesPP"];
	$dateTimes = array();
	$dateTimesPP = array();
	$times;
	
	foreach($_GET['times'] AS $value) 
	{
		$times = $value;	
	}

	$dateTimes = explode(",", $times);
	

	//$experiment_results_start_date = $_REQUEST["experiment_results_start_date"];
    
    $user_variable1_values;
    $friend_variable1_values = array();

    $user_variable2_values;
    $friend_variable2_values = array();
    $query;
 

	//echo "(dateTimes)=".count($dateTimes);
	//echo "(dateTimes[0])=".count($dateTimes[0]);
    //echo json_encode($experimentId);
    
 /*
    echo "experimentId= ". $experimentId. " ";
    echo "userId= ". $userId. " ";
    echo "friendId= ". $friendId. " ";
    echo "variable1= ".$variable1. " ";
    echo "variable2= ".$variable2. " ";

 		$result4 = mysql_query("select * from wp_bp_experiments_report where experiment_id=$experimentId AND variable_id=$variable1 AND
		date_modified between DATE_SUB(STR_TO_DATE('$experiment_results_start_date', '%d/%m/%Y'), INTERVAL 7 DAY) AND STR_TO_DATE('$experiment_results_start_date', '%d/%m/%Y')");
*/

/*
    // Create a connection
    //$connection = mysql_connect("localhost", "root", "") or die(mysql_error());
    $connection = mysql_connect("digitalbrain-test.lancs.ac.uk", "urashid", "password") or die(mysql_error());
    
    //Select database
    mysql_select_db("wordpress", $connection) or die(mysql_error());
*/

	//$db = new PDO('mysql:host=digitalbrain-test.lancs.ac.uk;dbname=wordpress;charset=utf8', 'urashid', 'password');
	
	//$connection = mysqli_connect('digitalbrain-test.lancs.ac.uk', 'urashid', 'password', 'wordpress');
	$connection = mysqli_connect('localhost', 'root', ' ', 'wordpress');
    
    if($variable1!=-1)
    {
        //$result1=mysql_query("SELECT * FROM wp_bp_experiments_report WHERE experiment_id=$experimentId AND variable_id=$variable1 AND user_id=$userId");
		    	
        //$result1=mysql_query("SELECT * FROM wp_bp_experiments_report WHERE experiment_id=$experimentId AND variable_id=$variable1 AND user_id=$userId ");
        
        
        for($x=0; $x<count($dateTimes); $x++)
		{
       	    $result2;
	        if($friendId == "All")
	        {
 			 	if($typeVar1 == "binary")
				{
					
					$query = "select * from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id!='$userId' AND variable_id='$variable1' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]' 
					ORDER BY time(date_modified) DESC LIMIT 1";
		
				}
				if($typeVar1 == "score")
				{
					
					$query = "select *, avg(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id!='$userId' AND variable_id='$variable1' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}	
				
				if($typeVar1 == "count")
				{
					
					$query = "select *, sum(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id!='$userId' AND variable_id='$variable1' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}			        	
			}//end if($friendId == "All")
           
           
			else
	        {
 			 	if($typeVar1 == "binary")
				{
					
					$query = "select * from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id='$friendId' AND variable_id='$variable1' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]' 
					ORDER BY time(date_modified) DESC LIMIT 1";
		
				}
				if($typeVar1 == "score")
				{
					
					$query = "select *, avg(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id='$friendId' AND variable_id='$variable1' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}	
				
				if($typeVar1 == "count")
				{
					
					$query = "select *, sum(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id='$friendId' AND variable_id='$variable1' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}			        	
			}//end if($friendId == "All")     
			
			//echo "query=".$query;

	        //$result2=mysql_query($query);
			
			$result2=mysqli_query($connection, $query);
	
	        if (!$result2) { // add this check.
	            die('Invalid query: ' . mysql_error());
	        }//end if
	        else{
	            do
	            {
	                $row=mysqli_fetch_array($result2);
	                if($row)
	                {
	                    
	                    $val = $row['variable_value'];
						if($val!=NULL)
						{
							                    //echo $val;
		                    if ($val == 'Yes' || $val == 'yes')
		                        $val = 1;
		                    if ($val == 'No' || $val == 'no')
		                        $val = 0;
		                    
							if($typeVar1 == "score")
								$val = $row['avg(variable_value)'];
							
							if($typeVar1 == "count")
								$val = $row['sum(variable_value)'];
							
		                    $friend_variable1_values[] = $val;
						}	                    
	
	                }//end if($row)
	            } while($row);
	            
	        }//end else
			
		}//end for
		
        

    }//end if(variable1!=-1)
    else{
        
        $friend_variable1_values[0] = 0;
        $user_variable1_values[0] = 0;
    }
    

  
    if($variable2!=-1)
    {
         for($x=0; $x<count($dateTimes); $x++)
		{
       	    $result2;
	        if($friendId == "All")
	        {
 			 	if($typeVar2 == "binary")
				{
					
					$query = "select * from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id!='$userId' AND variable_id='$variable2' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]' 
					ORDER BY time(date_modified) DESC LIMIT 1";
		
				}
				if($typeVar2 == "score")
				{
					
					$query = "select *, avg(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id!='$userId' AND variable_id='$variable2' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}	
				
				if($typeVar2 == "count")
				{
					
					$query = "select *, sum(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id!='$userId' AND variable_id='$variable2' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}			        	
			}//end if($friendId == "All")
           
           
			else
	        {
 			 	if($typeVar2 == "binary")
				{
					
					$query = "select * from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id='$friendId' AND variable_id='$variable2' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]' 
					ORDER BY time(date_modified) DESC LIMIT 1";
		
				}
				if($typeVar2 == "score")
				{
					
					$query = "select *, avg(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id='$friendId' AND variable_id='$variable2' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}	
				
				if($typeVar2 == "count")
				{
					
					$query = "select *, sum(variable_value) from wp_bp_experiments_report where experiment_id='$experimentId' 
					AND user_id='$friendId' AND variable_id='$variable2' AND date_format(date_modified, '%d-%m-%Y')='$dateTimes[$x]'";
		
				}			        	
			}//end if($friendId != "All")  
			
	   	//echo "query=".$query;
	    //$result2=mysql_query($query);
		$result2=mysqli_query($connection, $query);

        if (!$result2) { // add this check.
            die('Invalid query: ' . mysql_error());
        }//end if
        else{
            do
            {
                $row=mysqli_fetch_array($result2);
                if($row)
                {
                    
                    $val = $row['variable_value'];
					if($val!=NULL)
					{
						
						if ($val == 'Yes' || $val == 'yes')
	                        $val = 1;
	                    if ($val == 'No' || $val == 'no')
	                        $val = 0;
	                    
						if($typeVar2 == "score")
							$val = $row['avg(variable_value)'];
						
						if($typeVar2 == "count")
							$val = $row['sum(variable_value)'];

	                    $friend_variable2_values[] = $val;
					}

                }//end if($row)
            } while($row);
            
        }//end else        
           
		}//end for
		
        


    }//end if(variable2!=-1)
    else{
        
        $friend_variable2_values[0] = 0;
        $user_variable2_values[0] = 0;
    }

echo json_encode(array( 
						'friend_variable1_values' => $friend_variable1_values, 
						'friend_variable2_values' => $friend_variable2_values));
/*						
echo json_encode(array('user_variable1_values' => $user_variable1_values, 
						'friend_variable1_values' => $friend_variable1_values, 
						'user_variable2_values' => $user_variable2_values, 
						'friend_variable2_values' => $friend_variable2_values));
*/												
//echo json_encode(array('user_variable1_values' => $user_variable1_values, 'friend_variable1_values' => $friend_variable1_values));
    
?>









