document.addEventListener('DOMContentLoaded', function () {
    const updateFileInput = document.getElementById('updateLoadingFile');
    const updateFileText = document.getElementById('updateFile');
    const versionInput = document.getElementById('version');

    // Cargar datos de los archivos al abrir la pestaña

    fetch('LauncherConfig/updates/version.php')
        .then(response => response.text())
        .then(data => versionInput.value = data.trim())
        .catch(error => console.error('Error al cargar versión:', error));

    // Abrir diálogo para seleccionar archivo
    document.getElementById('uploadUpdateFile').addEventListener('click', function () {
        updateFileInput.click();
    });

    // Mostrar nombre de archivo seleccionado
    updateFileInput.addEventListener('change', function () {
        updateFileText.value = this.files[0] ? this.files[0].name : '';
    });

    // Subir actualización
    document.getElementById('saveLauncherUpdate').addEventListener('click', function () {
        const versionContent = versionInput.value;
        const updateFile = updateFileInput.files[0];

        let updateFileUploaded = false;

        if (versionContent) {
            updateFileContent('LauncherConfig/updates/version.php', versionContent);
        }

        if (updateFile) {
            uploadFile(updateFile, 'LauncherConfig/updates/update.exe');
            updateFileUploaded = true;
        }

        if (updateFileUploaded) {
            Swal.fire({
                icon: 'success',
                title: 'Nueva Update lanzada',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Configuración actualizada',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 3000
            });
        }
    });

    function updateFileContent(filePath, content) {
        const formData = new FormData();
        formData.append('file_path', filePath);
        formData.append('content', content);

        fetch('launcher_update.php', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
        .then(data => {
            console.log('Archivo actualizado correctamente: ' + filePath);
            console.log(data);
        }).catch(error => {
            console.error('Error al actualizar el archivo: ' + filePath, error);
        });
    }

    function uploadFile(file, targetPath) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetPath', targetPath);

        fetch('launcher_update.php', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
        .then(data => {
            console.log('Archivo subido correctamente.');
            console.log(data);
        }).catch(error => {
            console.error('Error al subir el archivo.', error);
        });
    }
});
