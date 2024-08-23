<?php
if (isset($_POST['filename'])) {
    $filename = basename($_POST['filename']);
    $filepath = 'data/' . $filename;
    
    if (file_exists($filepath)) {
        echo json_encode(['exists' => true]);
    } else {
        echo json_encode(['exists' => false]);
    }
} else {
    echo json_encode(['error' => 'No filename provided']);
}
?>