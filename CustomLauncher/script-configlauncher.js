$(document).ready(function() {
    // Función para cargar los datos del archivo INI cuando se abre la pestaña
    function loadIniData() {
        $.get('LauncherConfig/ConfigLauncher.ini', function(data) {
            const iniData = parseIni(data);

            // Launcher config
            $('#nombreCorporativo').val(iniData.Settings.nombre_corporativo || '');
            $('#initialPage').val(iniData.Settings.initial_page || '');

            // Custom
            $('#loadingBackground').val(iniData.Custom.loading_background || '');
            $('#pathLogo').val(iniData.Custom.path_logo || '');
            $('#pathImageInfo').val(iniData.Custom.path_image_info || '');
            $('#pathImageError').val(iniData.Custom.path_image_error || '');
            $('#pathImageAlerta').val(iniData.Custom.path_image_alerta || '');

            // Files
            $('#filenameBoveda').val(iniData.Files.filename_boveda || '');

            // URLs
            $('#paginawebUrl').val(iniData.URLs.paginaweb_url || '');
            $('#weburlCategorys').val(iniData.URLs.weburl_categorys || '');
            $('#mantenanceInfoUrl').val(iniData.URLs.mantenance_info_url || '');
            $('#pagesDataRemoto').val(iniData.URLs.pages_data_remoto || '');

            // Mantenimiento
            $('#estadoMantenimiento').val(iniData.Mantenimiento.estado || '');
            $('#categoria1').val(iniData['Mantenimiento-Categorias'].categoria1 || '');
            $('#categoria2').val(iniData['Mantenimiento-Categorias'].categoria2 || '');
            $('#categoria3').val(iniData['Mantenimiento-Categorias'].categoria3 || '');
            $('#categoria4').val(iniData['Mantenimiento-Categorias'].categoria4 || '');
        });
    }

    // Función para guardar los datos modificados en el archivo INI
    $('#saveLauncherConfig').click(function() {
        const updatedIni = `[Settings]
nombre_corporativo = ${$('#nombreCorporativo').val()}
initial_page = ${$('#initialPage').val()}

[Custom]
loading_background = ${$('#loadingBackground').val()}
path_logo = ${$('#pathLogo').val()}
path_image_info = ${$('#pathImageInfo').val()}
path_image_error = ${$('#pathImageError').val()}
path_image_alerta = ${$('#pathImageAlerta').val()}

[Files]
filename_boveda = ${$('#filenameBoveda').val()}

[URLs]
paginaweb_url = ${$('#paginawebUrl').val()}
weburl_categorys = ${$('#weburlCategorys').val()}
mantenance_info_url = ${$('#mantenanceInfoUrl').val()}
pages_data_remoto = ${$('#pagesDataRemoto').val()}

[Mantenimiento]
estado = ${$('#estadoMantenimiento').val()}

[Mantenimiento-Categorias]
categoria1 = ${$('#categoria1').val()}
categoria2 = ${$('#categoria2').val()}
categoria3 = ${$('#categoria3').val()}
categoria4 = ${$('#categoria4').val()}`;
    
        $.post('launcher_config.php', { iniData: updatedIni }, function(response) {
            if (response === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Configuración guardada correctamente',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            } else {
                alert('Error al guardar la configuración.');
            }
        });
    });

    // Función para parsear el archivo INI en un objeto
    function parseIni(data) {
        const result = {};
        let section = null;
        data.split(/\r?\n/).forEach(line => {
            line = line.trim();
            if (line && line[0] !== ';') {
                if (line.startsWith('[') && line.endsWith(']')) {
                    section = line.substring(1, line.length - 1);
                    result[section] = {};
                } else if (section) {
                    const [key, value] = line.split('=');
                    result[section][key.trim()] = value.trim();
                }
            }
        });
        return result;
    }

    // Cargar datos cuando se abre la pestaña principal de Launcher Update
    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        if (e.target.id === 'editor4-tab') {
            loadIniData();
        }
    });

    // Eventos de selección de archivo para la Sección Custom
    $('#uploadBackgroundLoading').click(function() {
        $('#backgroundLoadingFile').click();
    });

    $('#backgroundLoadingFile').change(function() {
        subirArchivo($(this), $('#loadingBackground'));
    });

    $('#uploadLogo').click(function() {
        $('#logoFile').click();
    });

    $('#logoFile').change(function() {
        subirArchivo($(this), $('#pathLogo'));
    });

    $('#uploadImageInfo').click(function() {
        $('#imageInfoFile').click();
    });

    $('#imageInfoFile').change(function() {
        subirArchivo($(this), $('#pathImageInfo'));
    });

    $('#uploadImageError').click(function() {
        $('#imageErrorFile').click();
    });

    $('#imageErrorFile').change(function() {
        subirArchivo($(this), $('#pathImageError'));
    });

    $('#uploadImageAlerta').click(function() {
        $('#imageAlertaFile').click();
    });

    $('#imageAlertaFile').change(function() {
        subirArchivo($(this), $('#pathImageAlerta'));
    });

    // Manejo de pestañas
    $('#launcherConfigTabs button').on('click', function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // Función para subir archivos
    function subirArchivo(inputElement, outputElement) {
        const file = inputElement[0].files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            $.ajax({
                url: 'launcher_config.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                    // Aquí asumimos que el servidor retorna el nombre del archivo
                    const filePath = `data/${response}`;
                    outputElement.val(filePath);
                },
                error: function() {
                    alert('Error al subir el archivo.');
                }
            });
        }
    }
});