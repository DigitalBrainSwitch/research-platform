<?php
    $user_id = $_POST['user_id'];
    $experiment_id = $_POST['experiment_id'];

    $connection = mysql_connect("localhost", "root", "") or die(mysql_error());
    //$connection = mysql_connect("localhost", "urashid", "password") or die(mysql_error());
    $data = [];
    //Select database
    mysql_select_db("wordpress", $connection) or die(mysql_error());
    $report=mysql_query("select * from wp_bp_experiments_notifications where user_id = $user_id AND experiment_id = $experiment_id ");
    while($row = mysql_fetch_assoc($report)){
        $data[] = $row;
    }
    echo json_encode($data);
?>