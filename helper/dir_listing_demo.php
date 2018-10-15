<?php

$dir = "../data/demo/";

if(is_dir($dir)){

    if($dh = opendir($dir)){
    	
    	$a = array();
        while(($file = readdir($dh)) != false){

            if($file == "." or $file == ".." or strpos($file, 'zip') === false){
			// skip listing for this files
            } else {
            	array_push($a, $file);	
                //echo $file."<br />";
		//echo json_encode($file);
		sort($a);
            }
        }
        echo json_encode($a);
    }
}

?>
