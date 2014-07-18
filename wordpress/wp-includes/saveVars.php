<?php

        $experiment_id      = $_POST['experiment_id'];
        $user_id    = $_POST['user_id'];
        $variable_id    = $_POST['variable_id'];
        $variable_value    = $_POST['variable_value'];
        $date_modified    = $_POST['date_modified'];
        $id = $_POST['id'];

        $connection = mysql_connect("localhost", "root", "") or die(mysql_error());
        //$connection = mysql_connect("localhost", "urashid", "password") or die(mysql_error());
        $data = [];
        //Select database
        mysql_select_db("wordpress", $connection) or die(mysql_error());
        
        if ( $id!='null' )
        {
            $sql = "UPDATE wp_bp_experiments_report SET experiment_id = $experiment_id, user_id=$user_id, variable_id=$variable_id, variable_value = '$variable_value' WHERE id = $id";
            mysql_query($sql, $connection);
            echo $sql;
        } else {
            // Ensure that variable is not already a variable of the experiment before inserting
            //if ( $wpdb->get_var( $wpdb->prepare( "SELECT id FROM wp_bp_experiments_report WHERE id = %d AND experiment_id = %d", $id, $experiment_id ) ) ) {
            //    return false;
            // }
            $sql = "INSERT INTO wp_bp_experiments_report (experiment_id, user_id, variable_id, variable_value, date_modified  ) VALUES ( $experiment_id, $user_id, $variable_id, '$variable_value', '$date_modified')";     
            mysql_query($sql, $connection);
            echo $sql;
        }

?>