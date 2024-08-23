<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_FILES['file']['name'])) {
        $target_dir = "data/";
        $target_file = $target_dir . basename($_FILES["file"]["name"]);
        
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo basename($_FILES["file"]["name"]);
        } else {
            echo "Error";
        }
    } elseif (isset($_POST['iniData'])) {
        $iniData = $_POST['iniData'];
        file_put_contents('LauncherConfig/ConfigLauncher.ini', $iniData);
        echo 'success';
    } else {
        echo "No file or data sent";
    }
}
?>