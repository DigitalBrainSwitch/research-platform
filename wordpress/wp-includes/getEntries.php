<?php
    $user_id = $_POST['user_id'];
    $date = $_POST['date'];
    $variable_id = $_POST['variable_id'];

    $connection = mysql_connect("localhost", "root", "") or die(mysql_error());
    //$connection = mysql_connect("localhost", "urashid", "password") or die(mysql_error());
    $data = [];
    //Select database
    mysql_select_db("wordpress", $connection) or die(mysql_error());
    $today = DateTime::createFromFormat('d/m/Y', $date);
    $tomorrow = DateTime::createFromFormat('d/m/Y', $date);
    date_modify($tomorrow, '+1 day');
    $today = $today->format('Y-m-d'); 
    $tomorrow = $tomorrow->format('Y-m-d');
    $report=mysql_query("select * from wp_bp_experiments_report where variable_id =$variable_id AND user_id =$user_id and `date_modified` > '$today' and `date_modified` < '$tomorrow'");
    while($row = mysql_fetch_assoc($report)){
        $data[] = $row;
    }
    echo json_encode($data);
?>