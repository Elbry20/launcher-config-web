// Al inicio del archivo, agrega esta variable
let selectedImageFile = null;
let selectedBackgroundImage = null;
let selectedImgN = null;
let selectedImgH = null;
let selectedImgC = null;
let selectedHoverSound = null;
let selectedClickSound = null;
let isPredefinedButton = false;
let isPredefinedPage = false;

// Agregar estos manejadores de eventos
$('#uploadBackgroundImage').on('click', function() {
    $('#backgroundImageFile').val(''); // Resetear el valor del input
    $('#backgroundImageFile').click();
});

$('#backgroundImageFile').on('change', function() {
    var file = this.files[0];
    if (file) {
        var fileName = 'data/' + file.name;
        $('#background_image').val(fileName);
        selectedBackgroundImage = file;
    }
});

$('#uploadImgN').on('click', function() {
    $('#imgNFile').val('');
    $('#imgNFile').click();
});

$('#imgNFile').on('change', function() {
    var file = this.files[0];
    if (file) {
        var fileName = 'data/' + file.name;
        $('#img_n').val(fileName);
        selectedImgN = file;
    }
});

$('#uploadImgH').on('click', function() {
    $('#imgHFile').val('');
    $('#imgHFile').click();
});

$('#imgHFile').on('change', function() {
    var file = this.files[0];
    if (file) {
        var fileName = 'data/' + file.name;
        $('#img_h').val(fileName);
        selectedImgH = file;
    }
});

$('#uploadImgC').on('click', function() {
    $('#imgCFile').val('');
    $('#imgCFile').click();
});

$('#imgCFile').on('change', function() {
    var file = this.files[0];
    if (file) {
        var fileName = 'data/' + file.name;
        $('#img_c').val(fileName);
        selectedImgC = file;
    }
});

$('#uploadHoverSound').on('click', function() {
    $('#hoverSoundFile').val('');
    $('#hoverSoundFile').click();
});

$('#hoverSoundFile').on('change', function() {
    var file = this.files[0];
    if (file) {
        var fileName = 'data/' + file.name;
        $('#hover_sound').val(fileName);
        selectedHoverSound = file;
    }
});

$('#uploadClickSound').on('click', function() {
    $('#clickSoundFile').val('');
    $('#clickSoundFile').click();
});

$('#clickSoundFile').on('change', function() {
    var file = this.files[0];
    if (file) {
        var fileName = 'data/' + file.name;
        $('#click_sound').val(fileName);
        selectedClickSound = file;
    }
});

$('#uploadImageFile').on('click', function() {
    $('#imageFile').val('');
    $('#imageFile').click();
});

$('#imageFile').on('change', function() {
    var file = this.files[0];
    if (file) {
        var fileName = 'data/' + file.name;
        $('#imageFilename').val(fileName);
        selectedImageFile = file;
    }
});

let jsonTemplate = {};

const preview = $('#preview');
const pagesContainer = $('#pagesContainer');
const pageSwitchContainer = $('#pageSwitchContainer');
const pageModal = $('#pageModal');
const functionModal = $('#functionModal');
const savePageName = $('#savePageName');
const deletePageBtn = $('#deletePageBtn');
const saveFunction = $('#saveFunction');
const generateBtn = $('#generateBtn');
const loadJsonInput = $('#loadJsonInput');
const loadBtn = $('#loadBtn');

const actionMap = {
    "Verificar update": "verificar_update('')",
    "Cerrar launcher": 'clouse_launcher()',
    "Minimizar launcher": 'pygame.display.iconify()',
    "Desinstalar launcher": 'desinstalar_lancher()',
    "Espera de accion": 'waiting_action()',
    "Instalar launcher": "funcion_instalar_launcher('')",
    "Instalar javas": "funcion_instalar_javas('')",
    "Instalar update": "instalar_parche('')",
    "Cambiar página": 'current_page = ""',
    "Verificar mantenimiento": "mantenance('')",
    "Verificar categoría": "verify_category('', '')",
    "Abrir categoría": "abrir_carpeta_categoria('')",
    "Parchar categoría": "parchear_categoria('', '')",
    "Iniciar categoría": "iniciar_categoria('', '')",
    "IPCopy categoría": "obtener_y_copiar_ip('')",
    "Abrir tiendaweb": "obtener_y_abrir_url('', '')",
    "Abrir infoweb": "obtener_y_abrir_url('', '')",
    "Abrir voteweb": "obtener_y_abrir_url('', '')",
    "Desinstalar categoría": "eliminar_categoria('')",
    "Descargar instancia": "funcion_descargar_instancia('', '')",
    "Descargar mods": "funcion_descargar_mods('', '')",
    "Actualizar categoría": "actualizar_categoria('', '', '', '', '')",
    "Abrir web": "webbrowser.open('')",
    "Abrir carpeta": 'abrir_carpeta_classic()',
    "Ocultar elemento temporal": "hide_elements(current_page, [''])",
    "Mostrar elemento temporal": "show_elements(current_page, [''])",
    "Ocultar elemento permanente": "hide_elements_and_ini(current_page, [''])",
    "Mostrar elemento permanente": "show_elements_and_ini(current_page, [''])",

};

const actionDescriptions = {
    "Verificar update": "Verifica si hay una actualizacion para el launcher y si la hay cambia a su pagina de update",
    "Cerrar launcher": "Cierra de manera instantánea el launcher",
    "Minimizar launcher": "Minimiza el launcher",
    "Desinstalar launcher": "Desinstala el launcher de manera instantánea",
    "Espera de accion": "Espera a que se complete la acción anterior para proceder a la siguiente",
    "Instalar launcher": "Instala el launcher",
    "Instalar javas": "Instala los javas correspondientes para el funcionamiento general de las categorias",
    "Instalar update": "Instala el archivo de update para tu actualizacion del launcher",
    "Cambiar página": "Cambia a la página seleccionada",
    "Verificar mantenimiento": "Verifica el mantenimiento del launcher general",
    "Verificar categoría": "Verifica la categoría seleccionada",
    "Abrir categoría": "Abre la carpeta de la categoría seleccionada",
    "Parchar categoría": "Parcha la categoría seleccionada",
    "Iniciar categoria": "Inicia la categoría seleccionada",
    "IPCopy categoría": "Obtiene y copia la IP de la categoría seleccionada",
    "Abrir tiendaweb": "Obtiene y abre la URL de la tienda web de la categoria seleccionada",
    "Abrir infoweb": "Obtiene y abre la URL de la información web de la categoria seleccionada",
    "Abrir voteweb": "Obtiene y abre la URL de la votación web de la categoria seleccionada",
    "Desinstalar categoría": "Desinstala la categoría seleccionada",
    "Descargar instancia": "Descarga la categoría seleccionada",
    "Actualizar categoría": "Actualiza la categoría seleccionada",
    "Abrir web": "Abre una URL específica en el navegador predeterminado",
    "Abrir carpeta": "Abre una carpeta específica",
    "Ocultar elemento temporal": "Oculta el elemento especificado",
    "Mostrar elemento temporal": "Muestra el elemento especificado",
    "Ocultar elemento permanente": "Oculta el elemento especificado de manera permanente",
    "Mostrar elemento permanente": "Muestra el elemento especificado de manera permanente",
};

const renderActionOptions = () => {
    let actionOptions = '<option value="">Seleccionar acción</option>';
    actionOptions += Object.keys(actionMap).map(actionName => {
        const description = actionDescriptions[actionName] || 'No hay descripción disponible';
        return `<option value="${actionName}" data-description="${description}">${actionName}</option>`;
    }).join('');

    $('#pageActionsSelect, #functionActionsSelect, #progressBarActionsSelect').html(actionOptions);

    // Añadir evento para mostrar/ocultar los selectores correspondientes
    $('#pageActionsSelect, #functionActionsSelect, #progressBarActionsSelect').on('change', function() {
        const selectedAction = $(this).val();
        const pageSelector = $(this).closest('.modal-body').find('.page-selector');
        const categorySelector = $(this).closest('.modal-body').find('.category-selector');
        const progressBarSelector = $(this).closest('.modal-body').find('.progressbar-selector');
        const urlInput = $(this).closest('.modal-body').find('.url-input');
        const folderSelector = $(this).closest('.modal-body').find('.folder-selector');
        const customPathInput = $(this).closest('.modal-body').find('.custom-path-input');
        const textInput = $(this).closest('.modal-body').find('.text-input');
    
        pageSelector.hide();
        categorySelector.hide();
        progressBarSelector.hide();
        urlInput.hide();
        folderSelector.hide();
        customPathInput.hide();
        textInput.hide();
    
        if (selectedAction === "Cambiar página" || selectedAction === "Verificar mantenimiento" || selectedAction === "Verificar update") {
            pageSelector.show();
        } else if (selectedAction === "Verificar categoría") {
            categorySelector.show();
            pageSelector.show();
        } else if (selectedAction === "Abrir web") {
            urlInput.show();
        } else if (selectedAction === "Abrir carpeta") {
            folderSelector.show();
        } else if (selectedAction === "Ocultar elemento temporal" || selectedAction === "Mostrar elemento temporal" || selectedAction === "Ocultar elemento permanente" || selectedAction === "Mostrar elemento permanente") {
            textInput.show();
        } else if (selectedAction === "Descargar instancia" || selectedAction === "Descargar mods") {
            categorySelector.show();
            progressBarSelector.show();
        } else if (selectedAction === "Instalar launcher" || selectedAction === "Instalar javas" || selectedAction === "Instalar update") {
            progressBarSelector.show();
        } else if (selectedAction === "Abrir categoría" || 
                   selectedAction === "Parchar categoría" || 
                   selectedAction === "Iniciar categoría" || 
                   selectedAction === "Copiar IP categoría" || 
                   selectedAction === "Abrir tiendaweb" || 
                   selectedAction === "Abrir infoweb" || 
                   selectedAction === "Abrir voteweb" || 
                   selectedAction === "Desinstalar categoría" || 
                   selectedAction === "Actualizar categoría") {
            categorySelector.show();
        }
    });

    // Añadir evento para mostrar/ocultar el campo de ruta personalizada
    $('.folder-selector select').on('change', function() {
        const customPathInput = $(this).closest('.modal-body').find('.custom-path-input');
        if ($(this).val() === "custom") {
            customPathInput.show();
        } else {
            customPathInput.hide();
        }
    });
};

renderActionOptions();

function loadExistingActions(actions, container, progressBarData) {
    if (progressBarData) {
        loadActionsForContainer(progressBarData.start_actions, $('#startActionsContainer'));
        loadActionsForContainer(progressBarData.end_actions, $('#endActionsContainer'));
        loadActionsForContainer(progressBarData.extract_start_actions, $('#extractStartActionsContainer'));
        loadActionsForContainer(progressBarData.extract_end_actions, $('#extractEndActionsContainer'));
    } else {
        loadActionsForContainer(actions, container);
    }
}

function loadActionsForContainer(actions, container) {
    container.empty();
    actions.forEach(action => {
        let actionText = action;
        let actionCode = action;
        if (action.startsWith('hide_elements') || action.startsWith('show_elements') ||
            action.startsWith('hide_elements_and_ini') || action.startsWith('show_elements_and_ini')) {
            const match = action.match(/(?:hide|show)_elements(?:_and_ini)?\(current_page, \[([^\]]+)\]\)/);
            if (match) {
                const elements = match[1].split(',').map(el => el.trim().replace(/'/g, ''));
                const actionType = action.startsWith('hide') ? 'Ocultar' : 'Mostrar';
                const actionPermanence = action.includes('_and_ini') ? 'permanente' : 'temporal';
                actionText = `${actionType} elementos ${actionPermanence}: ${elements.join(', ')}`;
            }
        } else if (action.startsWith('webbrowser.open')) {
            const match = action.match(/webbrowser\.open\('([^']+)'\)/);
            if (match) {
                const url = match[1];
                actionText = `Abrir web ${url}`;
            }
        } else if (action.startsWith('current_page =')) {
            const pageName = action.match(/'([^']+)'/)[1];
            actionText = `Cambiar página ${pageName}`;
        } else if (action.startsWith('mantenance')) {
            const pageName = action.match(/'([^']+)'/)[1];
            actionText = `Pagina mantenimiento ${pageName}`;
        } else if (action.startsWith('verificar_update')) {
            const pageName = action.match(/'([^']+)'/)[1];
            actionText = `Pagina update ${pageName}`;
        } else if (action.startsWith('verify_category')) {
            const match = action.match(/verify_category\('([^']+)', '([^']+)'\)/);
            if (match) {
                const category = match[1];
                const pageName = match[2];
                actionText = `Verificar ${category} (Página: ${pageName})`;
            }
        } else if (action.startsWith('abrir_carpeta_categoria')) {
            const match = action.match(/abrir_carpeta_categoria\('([^']+)'\)/);
            if (match) {
                const category = match[1];
                actionText = `Abrir ${category}`;
            }
        } else if (action.startsWith('parchear_categoria')) {
            const match = action.match(/parchear_categoria\('([^']+)', '[^']+'\)/);
            if (match) {
                const category = match[1];
                actionText = `Parchar ${category}`;
            }
        } else if (action.startsWith('iniciar_categoria')) {
            const match = action.match(/iniciar_categoria\('([^']+)', '[^']+'\)/);
            if (match) {
                const category = match[1];
                actionText = `Iniciar ${category}`;
            }
        } else if (action.startsWith('obtener_y_copiar_ip')) {
            const match = action.match(/obtener_y_copiar_ip\('([^']+)'\)/);
            if (match) {
                const category = match[1];
                actionText = `Copiar IP ${category}`;
            }
        } else if (action.startsWith('obtener_y_abrir_url')) {
            const match = action.match(/obtener_y_abrir_url\('([^']+)', '([^']+)'\)/);
            if (match) {
                const category = match[1];
                const urlType = match[2];
                if (urlType === "pageshop") {
                    actionText = `Abrir tiendaweb ${category}`;
                } else if (urlType === "pageweb") {
                    actionText = `Abrir infoweb ${category}`;
                } else if (urlType === "pagevote") {
                    actionText = `Abrir voteweb ${category}`;
                }
            }
        } else if (action.startsWith('eliminar_categoria')) {
            const match = action.match(/eliminar_categoria\('([^']+)'\)/);
            if (match) {
                const category = match[1];
                actionText = `Desinstalar ${category}`;
            }
        } else if (action.startsWith('funcion_descargar_instancia')) {
            const match = action.match(/funcion_descargar_instancia\('([^']+)', '([^']+)'\)/);
            if (match) {
                const category = match[1];
                const progressBar = match[2];
                actionText = `Descargar ${category} (Barra: ${progressBar})`;
            }
        } else if (action.startsWith('funcion_descargar_mods')) {
            const match = action.match(/funcion_descargar_mods\('([^']+)', '([^']+)'\)/);
            if (match) {
                const category = match[1];
                const progressBar = match[2];
                actionText = `Descargar ${category} (Barra: ${progressBar})`;
            }
        } else if (action.startsWith('funcion_instalar_launcher')) {
            const match = action.match(/funcion_instalar_launcher\('([^']+)'\)/);
            if (match) {
                const progressBar = match[1];
                actionText = `Barra ${progressBar}`;
            }
        } else if (action.startsWith('funcion_instalar_javas')) {
            const match = action.match(/funcion_instalar_javas\('([^']+)'\)/);
            if (match) {
                const progressBar = match[1];
                actionText = `Barra ${progressBar}`;
            }
        } else if (action.startsWith('instalar_parche')) {
            const match = action.match(/instalar_parche\('([^']+)'\)/);
            if (match) {
                const progressBar = match[1];
                actionText = `Barra ${progressBar}`;
            }
        } else if (action.startsWith('actualizar_categoria')) {
            const match = action.match(/actualizar_categoria\('([^']+)', '([^']+)', '([^']+)', '([^']+)', '([^']+)'\)/);
            if (match) {
                const category = match[1];
                actionText = `Actualizar ${category}`;
            }
        } else if (action.startsWith('abrir_carpeta_classic')) {
            const match = action.match(/abrir_carpeta_classic\("?([^"]*)"?\)/);
            if (match) {
                const path = match[1];
                if (path === "") {
                    actionText = "Abrir carpeta Vault";
                } else if (path === "launcher") {
                    actionText = "Abrir carpeta Launcher";
                } else {
                    actionText = `Abrir carpeta ${path}`;
                }
            } else {
                actionText = "Abrir carpeta Vault"; // Este caso debería ser raro y podría manejarse de otra manera si fuera necesario.
            }
        } else {
            actionText = Object.keys(actionMap).find(key => actionMap[key] === action) || action;
        }        
        const actionHtml = `
            <div class="input-group mb-2">
                <span class="form-control" data-action="${actionCode}">${actionText}</span>
                <div class="input-group-append">
                    <button class="btn btn-danger removeActionBtn" type="button">Eliminar</button>
                </div>
            </div>`;
        container.append(actionHtml);
    });
}

// Eliminar acción de la página y función
$(document).on('click', '.removeActionBtn', function() {
    $(this).closest('.input-group').remove();
});

// Agregar accion a pagina y funcion
function addAction(inputId, containerId, actionClass) {
    const action = $(`#${inputId}`).val().trim();
    if (action) {
        $(`#${containerId}`).append(`
            <div class="input-group mb-2">
                <span class="form-control">${action}</span>
                <div class="input-group-append">
                    <button class="btn btn-danger ${actionClass}">Quitar</button>
                </div>
            </div>
        `);
        $(`#${inputId}`).val('');
    }
}

$('#addPageAction').on('click', () => addAction('pageActions', 'pageActionsContainer', 'removePageAction'));
$('#addFunctionAction').on('click', () => addAction('functionActions', 'functionActionsContainer', 'removeFunctionAction'));
$(document).on('click', '.removePageAction, .removeFunctionAction', function() {
    $(this).closest('.input-group').remove();
});

// Para agregar una acción desde el modal de configuración de páginas y funcion
$('#addPageActionBtn, #addFunctionActionBtn, #addProgressBarActionBtn').on('click', function() {
    const container = $(this).closest('.modal-body');
    const selectedAction = container.find('select[id$="ActionsSelect"]').val();
    let actionText = selectedAction;
    let actionCode = actionMap[selectedAction];
    if (actionCode) {
        if (selectedAction === "Ocultar elemento temporal" || selectedAction === "Mostrar elemento temporal" ||
            selectedAction === "Ocultar elemento permanente" || selectedAction === "Mostrar elemento permanente") {
            const textInput = $(this).closest('.modal-body').find('.text-input input').val().trim();
            if (!textInput) {
                Swal.fire({
                    icon: 'warning',
                    title: 'El texto del elemento no puede estar vacío.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            const elements = textInput.split(',').map(text => text.trim());
            actionText = `${selectedAction}: ${elements.join(', ')}`;
            actionCode = actionCode.replace("['']", `[${elements.map(el => `'${el}'`).join(', ')}]`);
        } else if (selectedAction === "Abrir web") {
            const url = container.find('#urlInput').val();
            if (url) {
                actionCode = `webbrowser.open('${url}')`;
                actionText = `Abrir web ${url}`;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Por favor, ingrese una URL válida.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
        } else if (selectedAction === "Cambiar página") {
            const selectedPage = container.find('.page-selector select').val();
            actionCode = `current_page = '${selectedPage}'`;
            actionText = `Cambiar página ${selectedPage}`;
        } else if (selectedAction === "Verificar mantenimiento") {
            const selectedPage = container.find('.page-selector select').val();
            actionCode = `mantenance('${selectedPage}')`;
            actionText = `Pagina mantenimiento ${selectedPage}`;
        } else if (selectedAction === "Verificar update") {
            const selectedPage = container.find('.page-selector select').val();
            actionCode = `verificar_update('${selectedPage}')`;
            actionText = `Pagina update ${selectedPage}`;
        } else if (selectedAction === "Verificar categoría") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            const selectedPage = container.find('.page-selector select').val();
            actionCode = `verify_category('${selectedCategory}', '${selectedPage}')`;
            actionText = `Verificar ${categoryName} (Página: ${selectedPage})`;
        } else if (selectedAction === "Abrir categoría") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `abrir_carpeta_categoria('${selectedCategory}')`;
            actionText = `Abrir ${categoryName}`;
        } else if (selectedAction === "Parchar categoría") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `parchear_categoria('${selectedCategory}', '${categoryName}')`;
            actionText = `Parchar ${categoryName}`;
        } else if (selectedAction === "Iniciar categoría") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `iniciar_categoria('${selectedCategory}', '${categoryName}')`;
            actionText = `Iniciar ${categoryName}`;
        } else if (selectedAction === "Copiar IP categoría") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `obtener_y_copiar_ip('${selectedCategory}')`;
            actionText = `Copiar IP ${categoryName}`;
        } else if (selectedAction === "Abrir tiendaweb") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `obtener_y_abrir_url('${selectedCategory}', '${categoryName}')`;
            actionText = `Abrir tiendaweb ${categoryName}`;
        } else if (selectedAction === "Abrir infoweb") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `obtener_y_abrir_url('${selectedCategory}', '${categoryName}')`;
            actionText = `Abrir infoweb ${categoryName}`;
        } else if (selectedAction === "Abrir voteweb") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `obtener_y_abrir_url('${selectedCategory}', '${categoryName}')`;
            actionText = `Abrir voteweb ${categoryName}`;
        } else if (selectedAction === "Desinstalar categoría") {
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `eliminar_categoria('${categoryName}')`;
            actionText = `Desinstalar ${categoryName}`;
        } else if (selectedAction === "Descargar instancia") {
            const category = container.find('.category-selector select').val();
            const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
            const progressBar = container.find('.progressbar-selector select').val();
            if (!progressBar) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes seleccionar una barra de progreso',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            actionText = `Descargar ${formattedCategory} (Barra: ${progressBar})`;
            actionCode = `funcion_descargar_instancia('${formattedCategory}', '${progressBar}')`;
        } else if (selectedAction === "Descargar mods") {
            const category = container.find('.category-selector select').val();
            const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
            const progressBar = container.find('.progressbar-selector select').val();
            if (!progressBar) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes seleccionar una barra de progreso',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            actionText = `Descargar ${formattedCategory} (Barra: ${progressBar})`;
            actionCode = `funcion_descargar_mods('${formattedCategory}', '${progressBar}')`;
        } else if (selectedAction === "Instalar launcher") {
            const progressBar = container.find('.progressbar-selector select').val();
            if (!progressBar) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes seleccionar una barra de progreso',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            actionText = `Barra ${progressBar}`;
            actionCode = `funcion_instalar_launcher('${progressBar}')`;
        } else if (selectedAction === "Instalar javas") {
            const progressBar = container.find('.progressbar-selector select').val();
            if (!progressBar) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes seleccionar una barra de progreso',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            actionText = `Barra ${progressBar}`;
            actionCode = `funcion_instalar_javas('${progressBar}')`;
        } else if (selectedAction === "Instalar update") {
            const progressBar = container.find('.progressbar-selector select').val();
            if (!progressBar) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Debes seleccionar una barra de progreso',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
            actionText = `Barra ${progressBar}`;
            actionCode = `instalar_parche('${progressBar}')`;
        } else if (selectedAction === "Actualizar categoría") {
            const selectedCategory = container.find('.category-selector select').val();
            const categoryId1 = container.find('.category-selector select').val();
            const categoryId2 = container.find('.category-selector select').val();
            const categoryMayus = container.find('.category-selector select').val();
            const categoryId3 = container.find('.category-selector select').val();
            const categoryName = container.find('.category-selector select option:selected').text();
            actionCode = `actualizar_categoria('${selectedCategory}', '${categoryId1}', '${categoryId2}', '${categoryMayus}', '${categoryId3}')`;
            actionText = `Actualizar ${categoryName}`;
        } else if (selectedAction === "Abrir carpeta") {
            const folderOption = container.find('.folder-selector select').val();
            if (folderOption === "vault") {
                actionCode = `abrir_carpeta_classic()`;
                actionText = `Abrir carpeta Vault`;
            } else if (folderOption === "launcher") {
                actionCode = `abrir_carpeta_classic("launcher")`;
                actionText = `Abrir carpeta Launcher`;
            } else if (folderOption === "custom") {
                const customPath = container.find('#customPath').val();
                if (!customPath) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'El campo de ruta personalizada no debe estar vacio',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                    return;
                }
                actionCode = `abrir_carpeta_classic("${customPath}")`;
                actionText = `Abrir carpeta ${customPath}`;
            }
        }
        let targetContainer;
        if (this.id === 'addProgressBarActionBtn') {
            if ($('#startActionCheck').prop('checked')) {
                targetContainer = $('#startActionsContainer');
            } else if ($('#endActionCheck').prop('checked')) {
                targetContainer = $('#endActionsContainer');
            } else if ($('#extractStartActionCheck').prop('checked')) {
                targetContainer = $('#extractStartActionsContainer');
            } else if ($('#extractEndActionCheck').prop('checked')) {
                targetContainer = $('#extractEndActionsContainer');
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Por favor, selecciona a que tipo de acción irá agregado.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                return;
            }
        } else {
            targetContainer = container.find('[id$="ActionsContainer"]');
        }

        const actionHtml = `
            <div class="input-group mb-2">
                <span class="form-control" data-action="${actionCode}">${actionText}</span>
                <div class="input-group-append">
                    <button class="btn btn-danger removeActionBtn" type="button">Eliminar</button>
                </div>
            </div>`;
        targetContainer.append(actionHtml);
    }
});

// Renderizar la previsualización de la página seleccionada
function renderPreview(pageName) {
    if (Object.keys(jsonTemplate).length === 0) {
        return;
    }

    if (!jsonTemplate.hasOwnProperty(pageName)) {
        alert(`La página "${pageName}" no existe.`);
        return;
    }

    currentPage = pageName;
    const pageData = jsonTemplate[currentPage];
    preview.css('background-image', `url(${pageData.background_image})`);
    preview.empty(); // Clear previous buttons

    // Renderizar botones de funciones
    $('#functionsContainer').empty();
    if (pageData.button_data) {
        Object.entries(pageData.button_data).forEach(([functionName, buttonData]) => {
            const newFunctionButton = $('<button class="btn btn-primary editFunctionBtn"></button>').text(functionName).attr('data-function', functionName);
            $('#functionsContainer').append(newFunctionButton);
            renderButton(functionName, buttonData);
        });

        // Renderizar botones de acciones
        for (const [categoryName, buttonData] of Object.entries(pageData.button_data)) {
            renderButton(categoryName, buttonData);
        }
    }
    // Renderizar imágenes
    $('#imagesContainer').empty();
    if (pageData.images_data) {
        Object.entries(pageData.images_data).forEach(([imageName, imageData]) => {
            const newImageButton = $('<button class="btn btn-primary editImageBtn"></button>').text(imageName).attr('data-image', imageName);
            $('#imagesContainer').append(newImageButton);
            renderImage(imageName, imageData);
        });
    }
    // Renderizar textos
    $('#textsContainer').empty();
    if (pageData.text_data) {
        Object.entries(pageData.text_data).forEach(([textName, textData]) => {
            const newTextButton = $('<button class="btn btn-primary editTextBtn"></button>').text(textName).attr('data-text', textName);
            $('#textsContainer').append(newTextButton);
            renderText(textName, textData);
        });
    }
    // Renderizar solicitudes de texto
    $('#stringsContainer').empty();
    if (pageData.string_data) {
        Object.entries(pageData.string_data).forEach(([stringName, stringData]) => {
            const newStringButton = $('<button class="btn btn-primary editStringBtn"></button>').text(stringName).attr('data-string', stringName);
            $('#stringsContainer').append(newStringButton);
            renderString(stringName, stringData);
        });
    }
    // Renderizar barras de progreso
    $('#progressBarsContainer').empty();
    if (pageData.progressbar_data) {
        Object.entries(pageData.progressbar_data).forEach(([progressBarName, progressBarData]) => {
            const newProgressBarButton = $('<button class="btn btn-primary editProgressBarBtn"></button>').text(progressBarName).attr('data-progressbar', progressBarName);
            $('#progressBarsContainer').append(newProgressBarButton);
            renderProgressBar(progressBarName, progressBarData);
        });
    }
}

// Renderizar botones de cambio de página
function renderPageSwitchButtons() {
    pageSwitchContainer.empty();
    Object.keys(jsonTemplate).forEach(page => {
        const switchButton = $('<button class="btn btn-secondary"></button>').text(page).attr('data-page', page);
        switchButton.on('click', () => {
            renderPreview(page);
        });
        pageSwitchContainer.append(switchButton);
    });
}

function updateProgressBarSelector() {
    const progressBarOptions = Object.keys(jsonTemplate[currentPage].progressbar_data || {}).map(progressBar => 
        `<option value="${progressBar}">${progressBar}</option>`
    ).join('');
    $('.progressbar-selector select').html(progressBarOptions);
}

// Variables para el modal de paginas
const pageNameInput = $('#pageName');
const backgroundImageInput = $('#background_image');

// Agregar nueva página
$('#addPageBtn').on('click', () => {
    let newPageName;
    let pageIndex = 1;
    do {
        newPageName = `PAGINA${pageIndex}`;
        pageIndex++;
    } while (jsonTemplate.hasOwnProperty(newPageName));

    jsonTemplate[newPageName] = {
        "background_image": "",
        "actions": [],
        "images_data": {},
        "button_data": {},
        "text_data": {},
        "string_data": {},
        "progressbar_data": {}
    };

    const newPageButton = $('<button class="btn btn-primary editPageBtn"></button>')
        .text(newPageName)
        .attr('data-page', newPageName);
    $('#pagesContainer').append(newPageButton);
    renderPageSwitchButtons();
    updatePageSelector();
    bindPageEditEvents(); // Agrega esta línea
});

// Mostrar modal para editar página
function bindPageEditEvents() {
    $(document).on('click', '.editPageBtn', function() {
        currentPage = $(this).attr('data-page');
        const pageData = jsonTemplate[currentPage];
        pageNameInput.val(currentPage);
        backgroundImageInput.val(pageData.background_image);
        
        isPredefinedPage = pageData.isPredefinedPage || false;
        $('#predefinedPageCheck').prop('checked', isPredefinedPage);
        if (isPredefinedPage) {
            $('#predefinedPageSelect').show();
            $('#pageName').hide();
            $('#predefinedPage').val(currentPage);
        } else {
            $('#predefinedPageSelect').hide();
            $('#pageName').show();
        }

        loadExistingActions(pageData.actions, $('#pageActionsContainer'));

        pageModal.modal('show');
        updateProgressBarSelector();
        updatePageSelector();
    });
}

// Llama a esta función inmediatamente para vincular los eventos iniciales
bindPageEditEvents();

// Eliminar página
deletePageBtn.on('click', () => {
    Swal.fire({
        title: `¿Deseas eliminar la página ${currentPage}?`,
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            delete jsonTemplate[currentPage];
            $(`.editPageBtn[data-page="${currentPage}"]`).remove();
            $(`#preview > *`).remove(); // Limpia la previsualización
            currentPage = Object.keys(jsonTemplate)[0] || 'INICIO';
            pageModal.modal('hide');
            renderPageSwitchButtons();
            updatePageSelector();
            renderPreview(currentPage); // Renderiza la nueva página actual

            Swal.fire({
                icon: 'success',
                title: 'Página eliminada',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
});


$('#savePageName, #saveFunction').on('click', function() {
    const isPage = $(this).attr('id') === 'savePageName';
    let newName;

    if (isPage) {
        if (isPredefinedPage) {
            newName = $('#predefinedPage').val();
        } else {
            newName = $('#pageName').val().trim();
        }
    } else {
        if (isPredefinedButton) {
            newName = $('#predefinedButton').val();
        } else {
            newName = $('#categoryName').val().trim();
        }
    }
    const currentName = isPage ? currentPage : currentFunction;

    if (!newName) {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre no puede estar vacío.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
        return;
    }

    const data = isPage ? {
        background_image: $('#background_image').val().trim()
    } : {
        x: $('#x').val(),
        y: $('#y').val(),
        width: $('#width').val(),
        height: $('#height').val(),
        img_n: $('#img_n').val(),
        img_h: $('#img_h').val(),
        img_c: $('#img_c').val(),
        layer: $('#functionLayer').val(),
        hover_sound: $('#hover_sound').val(),
        click_sound: $('#click_sound').val()
    };

    const actionsContainer = $(this).closest('.modal-content').find('[id$="ActionsContainer"]');
    const actions = [];
    actionsContainer.find('.input-group span').each(function() {
        let actionCode = $(this).data('action');
        let actionText = $(this).text();
        
        if (actionText.startsWith('Abrir carpeta')) {
            const folderName = actionText.split(' ').slice(2).join(' ').toLowerCase();
            if (folderName === "vault") {
                actions.push(`abrir_carpeta_classic()`);
            } else {
                actions.push(`abrir_carpeta_classic("${folderName}")`);
            }
        } else if (actionText.startsWith('Ocultar elemento temporal')) {
            const elements = actionText.split(': ')[1].split(',').map(el => el.trim());
            actions.push(`hide_elements(current_page, [${elements.map(el => `'${el}'`).join(', ')}])`);
        } else if (actionText.startsWith('Mostrar elemento temporal')) {
            const elements = actionText.split(': ')[1].split(',').map(el => el.trim());
            actions.push(`show_elements(current_page, [${elements.map(el => `'${el}'`).join(', ')}])`);
        } else if (actionText.startsWith('Abrir categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`abrir_carpeta_categoria('${categoryName}')`);
        } else if (actionText.startsWith('Copiar IP categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_copiar_ip('${categoryName}')`);
        } else if (actionText.startsWith('Parchar categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryId = 'c' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase() + 'serversync';
            const categoryName = category.replace(/ /g, '');
            actions.push(`parchear_categoria('${categoryName}', '${categoryId}')`);
        } else if (actionText.startsWith('Iniciar categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryId = 'c' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase() + 'serversync';
            const categoryName = category.replace(/ /g, '');
            actions.push(`iniciar_categoria('${categoryName}', '${categoryId}')`);
        } else if (actionText.startsWith('Abrir tiendaweb')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_abrir_url('${categoryName}', 'pageshop')`);
        } else if (actionText.startsWith('Abrir infoweb')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_abrir_url('${categoryName}', 'pageweb')`);
        } else if (actionText.startsWith('Abrir voteweb')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_abrir_url('${categoryName}', 'pagevote')`);
        } else if (actionText.startsWith('Desinstalar categoría')) {
            const category = actionText.split(' ').slice(2).join('');
            actions.push(`eliminar_categoria('${category}')`);
        } else if (actionText.startsWith('Descargar instancia')) {
            const category = actionText.split(' ')[2].charAt(0).toUpperCase() + actionText.split(' ')[2].slice(1);
            const progressBar = actionText.match(/\(Barra: ([^)]+)\)/)[1];
            actions.push(`funcion_descargar_instancia('${category}', '${progressBar}')`);
        } else if (actionText.startsWith('Descargar mods')) {
            const category = actionText.split(' ')[2].charAt(0).toUpperCase() + actionText.split(' ')[2].slice(1);
            const progressBar = actionText.match(/\(Barra: ([^)]+)\)/)[1];
            actions.push(`funcion_descargar_mods('${category}', '${progressBar}')`);
        } else if (actionText.startsWith('Actualizar categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            const categoryId1 = 'C' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase();
            const categoryId2 = category.replace(/ /g, '').replace('Categoria', '').toLowerCase();
            const categoryMayus = category.replace(/ /g, '').toUpperCase();
            const categoryId3 = 'c' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase();
            actions.push(`actualizar_categoria('${categoryName}', '${categoryId1}', '${categoryId2}', '${categoryMayus}', '${categoryId3}')`);
        } else {
            actions.push(actionCode);
        }
    });

    // Añadir las acciones al objeto de datos
    data.actions = actions;

    const saveData = () => {
        if (isPage) {
            if (newName !== currentName) {
                jsonTemplate[newName] = jsonTemplate[currentName];
                delete jsonTemplate[currentName];
                $(`.editPageBtn[data-page="${currentName}"]`)
                    .attr('data-page', newName)
                    .text(newName);
                bindPageEditEvents();
            }
            Object.assign(jsonTemplate[newName], data);
            jsonTemplate[newName].isPredefinedPage = isPredefinedPage; // Añadir esta línea
            currentPage = newName;
        } else {
            if (newName !== currentName) {
                jsonTemplate[currentPage].button_data[newName] = jsonTemplate[currentPage].button_data[currentName];
                delete jsonTemplate[currentPage].button_data[currentName];
                $(`.editFunctionBtn[data-function="${currentName}"]`).attr('data-function', newName).text(newName);
            }
            Object.assign(jsonTemplate[currentPage].button_data[newName], data);
            jsonTemplate[currentPage].button_data[newName].isPredefinedButton = isPredefinedButton; // Añadir esta línea
            currentFunction = newName;
        }

        $(isPage ? '#pageModal' : '#functionModal').modal('hide');
        renderPreview(currentPage);
        if (isPage) {
            renderPageSwitchButtons();
        }

        // Resetear estados
        if (isPage) {
            isPredefinedPage = false;
            $('#predefinedPageCheck').prop('checked', false);
            $('#predefinedPageSelect').hide();
            $('#pageName').show();
        } else {
            isPredefinedButton = false;
            $('#predefinedButtonCheck').prop('checked', false);
            $('#predefinedButtonSelect').hide();
            $('#categoryName').show();
        }
    };

    if (isPage && selectedBackgroundImage) {
        const formData = new FormData();
        formData.append('file', selectedBackgroundImage);

        $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log('Imagen de fondo subida con éxito');
                data.background_image = $('#background_image').val().trim();
                saveData();
                selectedBackgroundImage = null;
            },
            error: function() {
                console.error('Error al subir la imagen de fondo');
                Swal.fire({
                    icon: 'error',
                    title: 'El nombre no puede estar vacío.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        });
    } else if (!isPage) {
        const filesToUpload = [
            { file: selectedImgN, field: 'img_n' },
            { file: selectedImgH, field: 'img_h' },
            { file: selectedImgC, field: 'img_c' },
            { file: selectedHoverSound, field: 'hover_sound' },
            { file: selectedClickSound, field: 'click_sound' }
        ];

        let uploadPromises = filesToUpload.map(item => {
            if (item.file) {
                return uploadFile(item.file).then(response => {
                    if (response.success) {
                        data[item.field] = response.file;
                    }
                });
            }
            return Promise.resolve();
        });

        Promise.all(uploadPromises).then(() => {
            saveData();
            // Reset selected files
            selectedImgN = selectedImgH = selectedImgC = selectedHoverSound = selectedClickSound = null;
        });
    } else {
        saveData();
    }
});

function savePageConfiguration() {
    // Lógica para guardar la configuración de la página
    var pageName = document.getElementById('pageName').value;
    var x = document.getElementById('pageX').value;
    var y = document.getElementById('pageY').value;
    var width = document.getElementById('pageWidth').value;
    var height = document.getElementById('pageHeight').value;
    var imgN = document.getElementById('pageImgN').value;
    var imgH = document.getElementById('pageImgH').value;
    var imgC = document.getElementById('pageImgC').value;
    var hoverSound = document.getElementById('pageHoverSound').value;
    var clickSound = document.getElementById('pageClickSound').value;

    // Aquí debes agregar la lógica para actualizar la configuración en tu sistema
    console.log('Guardando configuración de la página:', {
        pageName, x, y, width, height, imgN, imgH, imgC, hoverSound, clickSound
    });
}

// Variables para el modal de funciones
const categoryNameInput = $('#categoryName');
const xInput = $('#x');
const yInput = $('#y');
const widthInput = $('#width');
const heightInput = $('#height');
const imgNInput = $('#img_n');
const imgHInput = $('#img_h');
const imgCInput = $('#img_c');
const hoverSoundInput = $('#hover_sound');
const clickSoundInput = $('#click_sound');

// Agregar nueva función
$('#addFunctionBtn').on('click', () => {
    let newFunctionName;
    let functionIndex = 1;
    do {
        newFunctionName = `boton${functionIndex}`;
        functionIndex++;
    } while (jsonTemplate[currentPage].button_data.hasOwnProperty(newFunctionName));

    jsonTemplate[currentPage].button_data[newFunctionName] = {
        "x": "500",
        "y": "300",
        "width": "60",
        "height": "58",
        "img_n": "data/b_exit_a.png",
        "img_h": "data/b_exit_b.png",
        "img_c": "data/b_exit_c.png",
        "layer": "1",
        "hover_sound": "",
        "click_sound": "",
        "actions": []
    };

    const newFunctionButton = $('<button class="btn btn-primary editFunctionBtn"></button>').text(newFunctionName).attr('data-function', newFunctionName);
    $('#functionsContainer').append(newFunctionButton);
});

// Mostrar modal para editar función
$(document).on('click', '.editFunctionBtn', function() {
    currentFunction = $(this).attr('data-function');
    const functionData = jsonTemplate[currentPage].button_data[currentFunction];
    $('#categoryName').val(currentFunction);
    $('#x').val(functionData.x);
    $('#y').val(functionData.y);
    $('#width').val(functionData.width);
    $('#height').val(functionData.height);
    $('#img_n').val(functionData.img_n);
    $('#img_h').val(functionData.img_h);
    $('#img_c').val(functionData.img_c);
    $('#functionLayer').val(functionData.layer);
    $('#hover_sound').val(functionData.hover_sound);
    $('#click_sound').val(functionData.click_sound);

    isPredefinedButton = functionData.isPredefinedButton || false;
    $('#predefinedButtonCheck').prop('checked', isPredefinedButton);
    if (isPredefinedButton) {
        $('#predefinedButtonSelect').show();
        $('#categoryName').hide();
        $('#predefinedButton').val(currentFunction);
    } else {
        $('#predefinedButtonSelect').hide();
        $('#categoryName').show();
    }

    loadExistingActions(functionData.actions, $('#functionActionsContainer'));

    updateProgressBarSelector();
    functionModal.modal('show');
});

function updatePageSelector() {
    const pageOptions = Object.keys(jsonTemplate).map(page => 
        `<option value="${page}">${page}</option>`
    ).join('');
    $('.page-selector select').html(pageOptions);
}

// Eliminar función
$('#deleteFunctionBtn').on('click', () => {
    Swal.fire({
        title: `¿Deseas eliminar la función ${currentFunction}?`,
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            delete jsonTemplate[currentPage].button_data[currentFunction];
            $(`.editFunctionBtn[data-function="${currentFunction}"]`).remove();
            $(`#${currentFunction}`).remove(); // Elimina el botón de la previsualización
            functionModal.modal('hide');
            renderPreview(currentPage); // Actualiza la previsualización

            Swal.fire({
                icon: 'success',
                title: 'Función eliminada',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
});


// Función para subir archivos
function uploadFile(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);

        $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                resolve(JSON.parse(response));
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}

// Renderizar botón en la previsualización
function renderButton(categoryName, buttonData) {
    let button = $(`#${categoryName}`);
    if (button.length === 0) {
        button = $('<div></div>').attr('id', categoryName).addClass('preview-button');
        preview.append(button);
    }
    button.css({
        left: `${buttonData.x}px`,
        top: `${buttonData.y}px`,
        width: `${buttonData.width}px`,
        height: `${buttonData.height}px`,
        backgroundImage: `url(${buttonData.img_n})`,
        zIndex: buttonData.layer
    });

    button.on('mouseover', function() {
        button.css('background-image', `url(${buttonData.img_h})`);
        if (buttonData.hover_sound) {
            const hoverSound = new Audio(buttonData.hover_sound);
            hoverSound.play();
        }
        buttonData.actions.forEach(action => {
            if (action.startsWith('verify_category')) {
                eval(action);
            }
        });
    });

    button.on('mouseout', function() {
        button.css('background-image', `url(${buttonData.img_n})`);
    });

    button.on('click', function() {
        button.css('background-image', `url(${buttonData.img_c})`);
        if (buttonData.click_sound) {
            const clickSound = new Audio(buttonData.click_sound);
            clickSound.play();
        }
        buttonData.actions.forEach(action => {
            if (!action.startsWith('verify_category')) {
                eval(action);
            }
        });
    });
}

function saveFunctionConfiguration() {
    // Lógica para guardar la configuración de la función
    var categoryName = document.getElementById('categoryName').value;
    var x = document.getElementById('x').value;
    var y = document.getElementById('y').value;
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;
    var imgN = document.getElementById('img_n').value;
    var imgH = document.getElementById('img_h').value;
    var imgC = document.getElementById('img_c').value;
    var hoverSound = document.getElementById('hover_sound').value;
    var clickSound = document.getElementById('click_sound').value;

    // Aquí debes agregar la lógica para actualizar la configuración en tu sistema
    console.log('Guardando configuración de la función:', {
        categoryName, x, y, width, height, imgN, imgH, imgC, hoverSound, clickSound
    });
}

// Mostrar spinner
const showLoadingSpinner = () => {
    $('#loadingSpinner').show();
};

// Ocultar spinner
const hideLoadingSpinner = () => {
    $('#loadingSpinner').hide();
};

// Generar JSON y descargarlo
generateBtn.on('click', () => {
    showLoadingSpinner();
    const jsonString = JSON.stringify(jsonTemplate, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pages_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Utiliza setTimeout para ocultar el spinner después de un breve retraso
    setTimeout(() => {
        hideLoadingSpinner();
        URL.revokeObjectURL(url); // Libera la URL del objeto para evitar fugas de memoria
    }, 100); // 100 ms de retraso para asegurarse de que el spinner se muestre antes de ocultarlo
});


// Cargar JSON desde archivo
loadBtn.on('click', () => {
    loadJsonInput.click();
});

loadJsonInput.on('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        showLoadingSpinner();
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedJson = JSON.parse(e.target.result);
                Object.keys(jsonTemplate).forEach(page => {
                    if (!loadedJson[page]) {
                        delete jsonTemplate[page];
                        $(`.editPageBtn[data-page="${page}"]`).remove();
                    }
                });
                Object.assign(jsonTemplate, loadedJson);
                Object.keys(jsonTemplate).forEach(page => {
                    if (!$(`.editPageBtn[data-page="${page}"]`).length) {
                        const newPageButton = $('<button class="btn btn-primary editPageBtn"></button>').text(page).attr('data-page', page);
                        pagesContainer.append(newPageButton);
                    }
                    if (jsonTemplate[page].progressbar_data) {
                        Object.keys(jsonTemplate[page].progressbar_data).forEach(progressBarName => {
                            if (!$(`.editProgressBarBtn[data-progressbar="${progressBarName}"]`).length) {
                                const newProgressBarButton = $('<button class="btn btn-primary editProgressBarBtn"></button>').text(progressBarName).attr('data-progressbar', progressBarName);
                                $('#progressBarsContainer').append(newProgressBarButton);
                            }
                        });
                    }
                    if (jsonTemplate[page].string_data) {
                        Object.keys(jsonTemplate[page].string_data).forEach(stringName => {
                            if (!$(`.editStringBtn[data-string="${stringName}"]`).length) {
                                const newStringButton = $('<button class="btn btn-primary editStringBtn"></button>').text(stringName).attr('data-string', stringName);
                                $('#stringsContainer').append(newStringButton);
                            }
                        });
                    }
                    if (jsonTemplate[page].images_data) {
                        Object.keys(jsonTemplate[page].images_data).forEach(imageName => {
                            if (!$(`.editImageBtn[data-image="${imageName}"]`).length) {
                                const newImageButton = $('<button class="btn btn-primary editImageBtn"></button>').text(imageName).attr('data-image', imageName);
                                $('#imagesContainer').append(newImageButton);
                            }
                        });
                    }
                    if (jsonTemplate[page].text_data) {
                        Object.keys(jsonTemplate[page].text_data).forEach(textName => {
                            if (!$(`.editTextBtn[data-text="${textName}"]`).length) {
                                const newTextButton = $('<button class="btn btn-primary editTextBtn"></button>').text(textName).attr('data-text', textName);
                                $('#textsContainer').append(newTextButton);
                            }
                        });
                    }
                });

                const firstPageName = Object.keys(jsonTemplate)[0];
                renderPreview(firstPageName);
                renderPageSwitchButtons();
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el archivo JSON.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            } finally {
                hideLoadingSpinner();
            }
        };
        reader.readAsText(file);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Funciones
    document.getElementById('functionActionsSelect').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var description = selectedOption.getAttribute('data-description') || 'No hay descripción disponible';
        document.getElementById('actionDescription').value = description;
    });

    // Paginas
    document.getElementById('pageActionsSelect').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var description = selectedOption.getAttribute('data-description') || 'No hay descripción disponible';
        document.getElementById('pageActionDescription').value = description;
    });

    // Progressbar
    document.getElementById('progressBarActionsSelect').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var description = selectedOption.getAttribute('data-description') || 'No hay descripción disponible';
        document.getElementById('ProgressActionDescription').value = description;
    });

    // Guardar configuración de Funciones
    document.getElementById('saveFunction').addEventListener('click', function () {
        // Guardar la configuración sin cambiar la vista
        saveFunctionConfiguration();

        // Cerrar el modal manualmente
        $('#functionModal').modal('hide');
    });

    // Guardar configuración de Paginas
    document.getElementById('savePage').addEventListener('click', function () {
        // Guardar la configuración sin cambiar la vista
        savePageConfiguration();

        // Cerrar el modal manualmente
        $('#pageModal').modal('hide');
    });
});

// Agrega esto al inicio de tu archivo, con las otras variables
const imageOnlineCheckbox = $('#imageOnline');
const filenameGroup = $('#filenameGroup');
const urlGroup = $('#urlGroup');

// Variables para el modal de edición de imágenes
const imageModal = $('#imageModal');
const imageNameInput = $('#imageName');
const imageXInput = $('#imageX');
const imageYInput = $('#imageY');
const imageWidthInput = $('#imageWidth');
const imageHeightInput = $('#imageHeight');
const imageLayerInput = $('#imageLayer');
const imageFilenameInput = $('#imageFilename');
const imageHideOnStartInput = $('#imageHideOnStart');
const imageOnlineInput = $('#imageOnline');
const imageUrlInput = $('#imageUrl');

// Mostrar modal para editar imagen
$(document).on('click', '.editImageBtn', function() {
    currentImage = $(this).data('image');
    const imageData = jsonTemplate[currentPage].images_data[currentImage];
    imageNameInput.val(currentImage);
    imageXInput.val(imageData.x);
    imageYInput.val(imageData.y);
    imageWidthInput.val(imageData.width);
    imageHeightInput.val(imageData.height);
    imageLayerInput.val(imageData.layer);
    imageFilenameInput.val(imageData.filename);
    imageOnlineInput.prop('checked', imageData.img_online === "true");
    imageUrlInput.val(imageData.img_url);
    imageHideOnStartInput.prop('checked', imageData.hide_on_start === "true");
    
    // Añade esto para manejar la visibilidad inicial
    if (imageData.img_online === "true") {
        filenameGroup.hide();
        urlGroup.show();
    } else {
        filenameGroup.show();
        urlGroup.hide();
    }
    
    imageModal.modal('show');
});

// Agregar nueva imagen
$('#addImageBtn').on('click', () => {
    if (!jsonTemplate[currentPage].hasOwnProperty('images_data')) {
        jsonTemplate[currentPage].images_data = {};
    }

    let newImageName;
    let imageIndex = 1;
    do {
        newImageName = `nuevaimagen${imageIndex}`;
        imageIndex++;
    } while (jsonTemplate[currentPage].images_data.hasOwnProperty(newImageName));

    jsonTemplate[currentPage].images_data[newImageName] = {
        "x": "458",
        "y": "246",
        "width": "96",
        "height": "94",
        "layer": "1",
        "filename": "",
        "img_online": "true",
        "img_url": "https://pbs.twimg.com/profile_images/1311763847775125516/mvBRhlDs_400x400.jpg",
        "hide_on_start": "false"
    };

    const newImageButton = $('<button class="btn btn-primary editImageBtn"></button>').text(newImageName).attr('data-image', newImageName);
    $('#imagesContainer').append(newImageButton);
});

// Eliminar imagen
$('#deleteImageBtn').on('click', () => {
    Swal.fire({
        title: `¿Deseas eliminar la imagen ${currentImage}?`,
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            delete jsonTemplate[currentPage].images_data[currentImage];
            $(`.editImageBtn[data-image="${currentImage}"]`).remove();
            $(`#${currentImage}`).remove(); // Elimina la imagen de la previsualización
            imageModal.modal('hide');
            renderPreview(currentPage); // Actualiza la previsualización

            Swal.fire({
                icon: 'success',
                title: 'Imagen eliminada',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
});


// Guardar cambios de imagen
$('#saveImage').on('click', () => {
    const newImageName = imageNameInput.val().trim();
    const imageData = {
        x: imageXInput.val(),
        y: imageYInput.val(),
        width: imageWidthInput.val(),
        height: imageHeightInput.val(),
        layer: imageLayerInput.val(),
        filename: imageFilenameInput.val(),
        img_online: imageOnlineInput.prop('checked') ? "true" : "false",
        img_url: imageUrlInput.val(),
        hide_on_start: imageHideOnStartInput.prop('checked') ? "true" : "false"
    };

    if (newImageName) {
        if (selectedImageFile) {
            uploadFile(selectedImageFile).then(response => {
                if (response.success) {
                    imageData.filename = response.file;
                }
                saveImageData(newImageName, imageData);
            }).catch(error => {
                console.error('Error al subir el archivo:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al subir el archivo de imagen.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            });
        } else {
            saveImageData(newImageName, imageData);
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre de la imagen no puede estar vacío.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
});

function saveImageData(newImageName, imageData) {
    if (newImageName !== currentImage) {
        jsonTemplate[currentPage].images_data[newImageName] = imageData;
        delete jsonTemplate[currentPage].images_data[currentImage];
        $(`.editImageBtn[data-image="${currentImage}"]`).data('image', newImageName).text(newImageName);
    } else {
        jsonTemplate[currentPage].images_data[currentImage] = imageData;
    }

    imageModal.modal('hide');
    renderImage(newImageName, imageData);
    renderPreview(currentPage);

    // Reset selected file
    selectedImageFile = null;
}

// Renderizar imagen en la previsualización
function renderImage(imageName, imageData) {
    let image = $(`#${imageName}`);
    if (image.length === 0) {
        image = $('<div></div>').attr('id', imageName).addClass('preview-image');
        preview.append(image);
    }
    const imageUrl = imageData.img_online === "true" ? imageData.img_url : imageData.filename;
    image.css({
        left: `${imageData.x}px`,
        top: `${imageData.y}px`,
        width: `${imageData.width}px`,
        height: `${imageData.height}px`,
        backgroundImage: `url(${imageUrl})`,
        zIndex: imageData.layer
    });

    if (imageData.hide_on_start === "true") {
        image.hide();
    } else {
        image.show();
    }
}

// Añade este evento al final de tu archivo
imageOnlineCheckbox.on('change', function() {
    if (this.checked) {
        filenameGroup.hide();
        urlGroup.show();
    } else {
        filenameGroup.show();
        urlGroup.hide();
    }
});

// Variables para el modal de edición de textos
const textModal = $('#textModal');
const textNameInput = $('#textName');
const textXInput = $('#textX');
const textYInput = $('#textY');
const textWidthInput = $('#textWidth');
const textHeightInput = $('#textHeight');
const textLayerInput = $('#textLayer');
const textContentInput = $('#textContent');
const textFromFileInput = $('#textFromFile');
const textFileInput = $('#textFile');
const textPreTextInput = $('#textPreText');
const textFontColorInput = $('#textFontColor');
const textFontNameInput = $('#textFontName');
const textFontSizeInput = $('#textFontSize');
const textPositionInput = $('#textPosition');
const textHideOnStartInput = $('#textHideOnStart');

// Mostrar modal para editar texto
$(document).on('click', '.editTextBtn', function() {
    currentText = $(this).data('text');
    const textData = jsonTemplate[currentPage].text_data[currentText];
    textNameInput.val(currentText);
    textXInput.val(textData.x);
    textYInput.val(textData.y);
    textWidthInput.val(textData.width);
    textHeightInput.val(textData.height);
    textLayerInput.val(textData.layer);
    textContentInput.val(textData.text);
    textFromFileInput.prop('checked', textData.content !== "");
    textFileInput.val(textData.content);
    textPreTextInput.val(textData.pre_text);
    textFontColorInput.val(textData.font_color);
    textFontNameInput.val(textData.font_name);
    textFontSizeInput.val(textData.font_size);
    textPositionInput.val(textData.position);
    textHideOnStartInput.prop('checked', textData.hide_on_start === "true");
    textModal.modal('show');
});

// Agregar nuevo texto
$('#addTextBtn').on('click', () => {
    if (!jsonTemplate[currentPage].hasOwnProperty('text_data')) {
        jsonTemplate[currentPage].text_data = {};
    }

    let newTextName;
    let textIndex = 1;
    do {
        newTextName = `nuevotexto${textIndex}`;
        textIndex++;
    } while (jsonTemplate[currentPage].text_data.hasOwnProperty(newTextName));

    jsonTemplate[currentPage].text_data[newTextName] = {
        "x": "425",
        "y": "315",
        "width": "158",
        "height": "20",
        "layer": "1",
        "text": "texto de ejemplo",
        "content": "",
        "pre_text": "",
        "font_color": "#000000",
        "font_name": "Arial",
        "font_size": "16",
        "position": "center",
        "hide_on_start": "false"
    };
    
    const newTextButton = $('<button class="btn btn-primary editTextBtn"></button>').text(newTextName).attr('data-text', newTextName);
    $('#textsContainer').append(newTextButton);
});

// Eliminar texto
$('#deleteTextBtn').on('click', () => {
    Swal.fire({
        title: `¿Deseas eliminar el texto ${currentText}?`,
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            delete jsonTemplate[currentPage].text_data[currentText];
            $(`.editTextBtn[data-text="${currentText}"]`).remove();
            $(`#${currentText}`).remove(); // Elimina el texto de la previsualización
            textModal.modal('hide');
            renderPreview(currentPage); // Actualiza la previsualización

            Swal.fire({
                icon: 'success',
                title: 'Texto eliminado',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
});


// Guardar cambios de texto
$('#saveText').on('click', () => {
    const newTextName = textNameInput.val().trim();
    const textData = {
        x: textXInput.val(),
        y: textYInput.val(),
        width: textWidthInput.val(),
        height: textHeightInput.val(),
        layer: textLayerInput.val(),
        text: textFromFileInput.prop('checked') ? "" : textContentInput.val(),
        content: textFromFileInput.prop('checked') ? textFileInput.val() : "",
        pre_text: textPreTextInput.val(),
        font_color: textFontColorInput.val(),
        font_name: textFontNameInput.val(),
        font_size: textFontSizeInput.val(),
        position: textPositionInput.val(),
        hide_on_start: textHideOnStartInput.prop('checked') ? "true" : "false"
    };

    if (newTextName) {
        if (newTextName !== currentText) {
            jsonTemplate[currentPage].text_data[newTextName] = textData;
            delete jsonTemplate[currentPage].text_data[currentText];
            $(`.editTextBtn[data-text="${currentText}"]`).data('text', newTextName).text(newTextName);
        } else {
            jsonTemplate[currentPage].text_data[currentText] = textData;
        }

        textModal.modal('hide');
        renderText(newTextName, textData);
        renderPreview(currentPage);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre del texto no puede estar vacío.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
});

// Renderizar texto en la previsualización
function renderText(textName, textData) {
    let text = $(`#${textName}`);
    if (text.length === 0) {
        text = $('<div></div>').attr('id', textName).addClass('preview-text');
        preview.append(text);
    }
    const content = textData.content !== "" ? readFileContent(textData.content) : textData.text;
    text.css({
        left: `${textData.x}px`,
        top: `${textData.y}px`,
        width: `${textData.width}px`,
        height: `${textData.height}px`,
        color: textData.font_color,
        fontFamily: textData.font_name,
        fontSize: `${textData.font_size}px`,
        textAlign: textData.position,
        zIndex: textData.layer
    });
    text.html(`${textData.pre_text}${content}`);

    if (textData.hide_on_start === "true") {
        text.hide();
    } else {
        text.show();
    }
}

function readFileContent(filename) {
    // Función para leer el contenido de un archivo de texto
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `archivos/${filename}`, false); // Ruta relativa al archivo
        xhr.overrideMimeType('text/plain; charset=x-user-defined');
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(`Error al cargar el archivo ${filename}: ${xhr.statusText}`);
            }
        };
        xhr.onerror = () => {
            reject(`Error al cargar el archivo ${filename}`);
        };
        xhr.send(null);
    });
}

$('#textFromFile').on('change', function() {
    const isChecked = $(this).prop('checked');
    if (isChecked) {
        $('#textContent').prop('disabled', true);
        $('#textFileGroup').show();
    } else {
        $('#textContent').prop('disabled', false);
        $('#textFileGroup').hide();
    }
});

// Variables para el modal de edición de solicitudes de texto
const stringModal = $('#stringModal');
const stringNameInput = $('#stringName');
const stringXInput = $('#stringX');
const stringYInput = $('#stringY');
const stringWidthInput = $('#stringWidth');
const stringHeightInput = $('#stringHeight');
const stringLayerInput = $('#stringLayer');
const stringFontColorInput = $('#stringFontColor');
const stringFontNameInput = $('#stringFontName');
const stringFontSizeInput = $('#stringFontSize');
const stringGetUrlInput = $('#stringGetUrl');
const stringFixInput = $('#stringFix');
const stringPositionInput = $('#stringPosition');
const stringHideOnStartInput = $('#stringHideOnStart');

// Mostrar modal para editar solicitud de texto
$(document).on('click', '.editStringBtn', function() {
    currentString = $(this).data('string');
    const stringData = jsonTemplate[currentPage].string_data[currentString];
    stringNameInput.val(currentString);
    stringXInput.val(stringData.x);
    stringYInput.val(stringData.y);
    stringWidthInput.val(stringData.width);
    stringHeightInput.val(stringData.height);
    stringLayerInput.val(stringData.layer);
    stringFontColorInput.val(stringData.font_color);
    stringFontNameInput.val(stringData.font_name);
    stringFontSizeInput.val(stringData.font_size);
    stringGetUrlInput.val(stringData.get_url);
    stringFixInput.prop('checked', stringData.string_fix === "true");
    stringPositionInput.val(stringData.position);
    stringHideOnStartInput.prop('checked', stringData.hide_on_start === "true");
    stringModal.modal('show');
});

// Agregar nueva solicitud de texto
$('#addStringBtn').on('click', () => {
    if (!jsonTemplate[currentPage].hasOwnProperty('string_data')) {
        jsonTemplate[currentPage].string_data = {};
    }

    let newStringName;
    let stringIndex = 1;
    do {
        newStringName = `nuevasolicitud${stringIndex}`;
        stringIndex++;
    } while (jsonTemplate[currentPage].string_data.hasOwnProperty(newStringName));

    jsonTemplate[currentPage].string_data[newStringName] = {
        "x": "403",
        "y": "299",
        "width": "200",
        "height": "40",
        "layer": "1",
        "font_color": "#FFFFFF",
        "font_name": "Arial",
        "font_size": "16",
        "get_url": "https://heavynightlauncher.com/Launcher/updates/update_info.txt",
        "string_fix": "false",
        "position": "center",
        "hide_on_start": "false"
    };

    const newStringButton = $('<button class="btn btn-primary editStringBtn"></button>').text(newStringName).attr('data-string', newStringName);
$('#stringsContainer').append(newStringButton);
});

// Eliminar solicitud de texto
$('#deleteStringBtn').on('click', () => {
    Swal.fire({
        title: `¿Deseas eliminar la solicitud de texto ${currentString}?`,
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            delete jsonTemplate[currentPage].string_data[currentString];
            $(`.editStringBtn[data-string="${currentString}"]`).remove();
            $(`#${currentString}`).remove(); // Elimina la solicitud de texto de la previsualización
            stringModal.modal('hide');
            renderPreview(currentPage); // Actualiza la previsualización

            Swal.fire({
                icon: 'success',
                title: 'Solicitud de texto eliminada',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
});


// Guardar cambios de solicitud de texto
$('#saveString').on('click', () => {
    const newStringName = stringNameInput.val().trim();
    const stringData = {
        x: stringXInput.val(),
        y: stringYInput.val(),
        width: stringWidthInput.val(),
        height: stringHeightInput.val(),
        layer: stringLayerInput.val(),
        font_color: stringFontColorInput.val(),
        font_name: stringFontNameInput.val(),
        font_size: stringFontSizeInput.val(),
        get_url: stringGetUrlInput.val(),
        string_fix: stringFixInput.prop('checked') ? "true" : "false",
        position: stringPositionInput.val(),
        hide_on_start: stringHideOnStartInput.prop('checked') ? "true" : "false"
    };

    if (newStringName) {
        if (newStringName !== currentString) {
            jsonTemplate[currentPage].string_data[newStringName] = stringData;
            delete jsonTemplate[currentPage].string_data[currentString];
            $(`.editStringBtn[data-string="${currentString}"]`).data('string', newStringName).text(newStringName);
        } else {
            jsonTemplate[currentPage].string_data[currentString] = stringData;
        }

        stringModal.modal('hide');
        renderString(newStringName, stringData);
        renderPreview(currentPage);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre de la solicitud de texto no puede estar vacío.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
});

// Renderizar solicitud de texto en la previsualización
function renderString(stringName, stringData) {
    let stringElement = $(`#${stringName}`);
    if (stringElement.length === 0) {
        stringElement = $('<div></div>').attr('id', stringName).addClass('preview-text');
        preview.append(stringElement);
    }

    stringElement.css({
        left: `${stringData.x}px`,
        top: `${stringData.y}px`,
        width: `${stringData.width}px`,
        height: `${stringData.height}px`,
        color: stringData.font_color,
        fontFamily: stringData.font_name,
        fontSize: `${stringData.font_size}px`,
        textAlign: stringData.position,
        zIndex: stringData.layer
    });

    fetchStringContent(stringName, stringData);

    if (stringData.hide_on_start === "true") {
        stringElement.hide();
    } else {
        stringElement.show();
    }
}

// Función para obtener el contenido de la solicitud de texto
function fetchStringContent(stringName, stringData) {
    const url = stringData.get_url;
    if (url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                const stringElement = $(`#${stringName}`);
                const fixedContent = stringData.string_fix === "true" ? fitTextToContainer(data, stringElement, stringData.width, stringData.height) : data;
                stringElement.html(fixedContent);
            })
            .catch(error => {
                const stringElement = $(`#${stringName}`);
                stringElement.html("Cords no habilitadas...");
                console.error(`Error al obtener el contenido desde ${url}:`, error);
            });
    }
}

// Función para ajustar el texto al contenedor
function fitTextToContainer(text, container, maxWidth, maxHeight) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontFamily = container.css('font-family');
    const fontSize = parseFloat(container.css('font-size'));

    context.font = `${fontSize}px ${fontFamily}`;

    const words = text.split(' ');
    let line = '';
    let lines = [];
    let lineHeight = fontSize * 1.2; // Ajusta el valor según tus necesidades

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            lines.push(line.trim());
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }

    if (line.trim().length > 0) {
        lines.push(line.trim());
    }

    const totalHeight = lines.length * lineHeight;
    if (totalHeight > maxHeight) {
        const maxLines = Math.floor(maxHeight / lineHeight);
        lines = lines.slice(0, maxLines);
        lines[lines.length - 1] += '...';
    }

    return lines.join('<br>');
}

// Variables para el modal de edición de barras de progreso
const progressBarModal = $('#progressBarModal');
const progressBarNameInput = $('#progressBarName');
const progressBarXInput = $('#progressBarX');
const progressBarYInput = $('#progressBarY');
const progressBarWidthInput = $('#progressBarWidth');
const progressBarHeightInput = $('#progressBarHeight');
const progressBarLayerInput = $('#progressBarLayer');
const progressBarBaseColorInput = $('#progressBarBaseColor');
const progressBarProgressColorInput = $('#progressBarProgressColor');
const progressBarHideOnStartInput = $('#progressBarHideOnStart');

// Mostrar modal para editar barra de progreso
$(document).on('click', '.editProgressBarBtn', function() {
    currentProgressBar = $(this).data('progressbar');
    const progressBarData = jsonTemplate[currentPage].progressbar_data[currentProgressBar];
    progressBarNameInput.val(currentProgressBar);
    progressBarXInput.val(progressBarData.x);
    progressBarYInput.val(progressBarData.y);
    progressBarWidthInput.val(progressBarData.width);
    progressBarHeightInput.val(progressBarData.height);
    progressBarLayerInput.val(progressBarData.layer);
    progressBarBaseColorInput.val(progressBarData.base_color);
    progressBarProgressColorInput.val(progressBarData.progress_color);
    progressBarHideOnStartInput.prop('checked', progressBarData.hide_on_start === "true");

    // Cargar acciones existentes
    loadExistingActions(progressBarData.start_actions || [], $('#startActionsContainer'));
    loadExistingActions(progressBarData.end_actions || [], $('#endActionsContainer'));
    loadExistingActions(progressBarData.extract_start_actions || [], $('#extractStartActionsContainer'));
    loadExistingActions(progressBarData.extract_end_actions || [], $('#extractEndActionsContainer'));

    progressBarModal.modal('show');
});

// Agregar nueva barra de progreso
$('#addProgressBarBtn').on('click', () => {
    if (!jsonTemplate[currentPage].hasOwnProperty('progressbar_data')) {
        jsonTemplate[currentPage].progressbar_data = {};
    }

    let newProgressBarName;
    let progressBarIndex = 1;
    do {
        newProgressBarName = `nuevabarra${progressBarIndex}`;
        progressBarIndex++;
    } while (jsonTemplate[currentPage].progressbar_data.hasOwnProperty(newProgressBarName));

    jsonTemplate[currentPage].progressbar_data[newProgressBarName] = {
        "x": "426",
        "y": "306",
        "width": "173",
        "height": "13",
        "layer": "1",
        "base_color": "#ACD1CD",
        "progress_color": "#FFFB00",
        "hide_on_start": "false",
        "start_actions": [],
        "end_actions": [],
        "extract_start_actions": [],
        "extract_end_actions": []
    };

    const newProgressBarButton = $('<button class="btn btn-primary editProgressBarBtn"></button>').text(newProgressBarName).attr('data-progressbar', newProgressBarName);
    $('#progressBarsContainer').append(newProgressBarButton);
});

// Eliminar barra de progreso
$('#deleteProgressBarBtn').on('click', () => {
    Swal.fire({
        title: `¿Deseas eliminar ${currentProgressBar}?`,
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
        if (result.isConfirmed) {
            delete jsonTemplate[currentPage].progressbar_data[currentProgressBar];
            $(`.editProgressBarBtn[data-progressbar="${currentProgressBar}"]`).remove();
            $(`#${currentProgressBar}`).remove(); // Elimina la barra de progreso de la previsualización
            progressBarModal.modal('hide');
            renderPreview(currentPage); // Actualiza la previsualización

            Swal.fire({
                icon: 'success',
                title: 'Barra de progreso eliminada',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
});


// Guardar cambios de barra de progreso
$('#saveProgressBar').on('click', () => {
    const newProgressBarName = progressBarNameInput.val().trim();
    const progressBarData = {
        x: progressBarXInput.val(),
        y: progressBarYInput.val(),
        width: progressBarWidthInput.val(),
        height: progressBarHeightInput.val(),
        layer: progressBarLayerInput.val(),
        base_color: progressBarBaseColorInput.val(),
        progress_color: progressBarProgressColorInput.val(),
        hide_on_start: progressBarHideOnStartInput.prop('checked') ? "true" : "false",
        start_actions: getActionsFromContainer($('#startActionsContainer')),
        end_actions: getActionsFromContainer($('#endActionsContainer')),
        extract_start_actions: getActionsFromContainer($('#extractStartActionsContainer')),
        extract_end_actions: getActionsFromContainer($('#extractEndActionsContainer'))
    };

    if (newProgressBarName) {
        if (newProgressBarName !== currentProgressBar) {
            jsonTemplate[currentPage].progressbar_data[newProgressBarName] = progressBarData;
            delete jsonTemplate[currentPage].progressbar_data[currentProgressBar];
            $(`.editProgressBarBtn[data-progressbar="${currentProgressBar}"]`).data('progressbar', newProgressBarName).text(newProgressBarName);
        } else {
            jsonTemplate[currentPage].progressbar_data[currentProgressBar] = progressBarData;
        }

        progressBarModal.modal('hide');
        renderProgressBar(newProgressBarName, progressBarData);
        renderPreview(currentPage);
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre de la barra de progreso no puede estar vacío.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    }
});

function getActionsFromContainer(container) {
    const actions = [];
    container.find('.input-group span').each(function() {
        let actionCode = $(this).data('action');
        let actionText = $(this).text();
        
        if (actionText.startsWith('Abrir carpeta')) {
            const folderName = actionText.split(' ').slice(2).join(' ').toLowerCase();
            if (folderName === "vault") {
                actions.push(`abrir_carpeta_classic()`);
            } else {
                actions.push(`abrir_carpeta_classic("${folderName}")`);
            }
        } else if (actionText.startsWith('Ocultar elemento temporal')) {
            const elements = actionText.split(': ')[1].split(',').map(el => el.trim());
            actions.push(`hide_elements(current_page, [${elements.map(el => `'${el}'`).join(', ')}])`);
        } else if (actionText.startsWith('Mostrar elemento temporal')) {
            const elements = actionText.split(': ')[1].split(',').map(el => el.trim());
            actions.push(`show_elements(current_page, [${elements.map(el => `'${el}'`).join(', ')}])`);
        } else if (actionText.startsWith('Abrir categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`abrir_carpeta_categoria('${categoryName}')`);
        } else if (actionText.startsWith('Copiar IP categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_copiar_ip('${categoryName}')`);
        } else if (actionText.startsWith('Parchar categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryId = 'c' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase() + 'serversync';
            const categoryName = category.replace(/ /g, '');
            actions.push(`parchear_categoria('${categoryName}', '${categoryId}')`);
        } else if (actionText.startsWith('Iniciar categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryId = 'c' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase() + 'serversync';
            const categoryName = category.replace(/ /g, '');
            actions.push(`iniciar_categoria('${categoryName}', '${categoryId}')`);
        } else if (actionText.startsWith('Abrir tiendaweb')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_abrir_url('${categoryName}', 'pageshop')`);
        } else if (actionText.startsWith('Abrir infoweb')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_abrir_url('${categoryName}', 'pageweb')`);
        } else if (actionText.startsWith('Abrir voteweb')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            actions.push(`obtener_y_abrir_url('${categoryName}', 'pagevote')`);
        } else if (actionText.startsWith('Desinstalar categoría')) {
            const category = actionText.split(' ').slice(2).join('');
            actions.push(`eliminar_categoria('${category}')`);
        } else if (actionText.startsWith('Descargar instancia')) {
            const category = actionText.split(' ')[2].charAt(0).toUpperCase() + actionText.split(' ')[2].slice(1);
            const progressBar = actionText.match(/\(Barra: ([^)]+)\)/)[1];
            actions.push(`funcion_descargar_instancia('${category}', '${progressBar}')`);
        } else if (actionText.startsWith('Descargar mods')) {
            const category = actionText.split(' ')[2].charAt(0).toUpperCase() + actionText.split(' ')[2].slice(1);
            const progressBar = actionText.match(/\(Barra: ([^)]+)\)/)[1];
            actions.push(`funcion_descargar_mods('${category}', '${progressBar}')`);
        } else if (actionText.startsWith('Actualizar categoría')) {
            const category = actionText.split(' ').slice(2).join(' ');
            const categoryName = category.replace(/ /g, '');
            const categoryId1 = 'C' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase();
            const categoryId2 = category.replace(/ /g, '').replace('Categoria', '').toLowerCase();
            const categoryMayus = category.replace(/ /g, '').toUpperCase();
            const categoryId3 = 'c' + category.replace(/ /g, '')
                                        .replace('Categoria', '')
                                        .toLowerCase();
            actions.push(`actualizar_categoria('${categoryName}', '${categoryId1}', '${categoryId2}', '${categoryMayus}', '${categoryId3}')`);
        } else {
            actions.push(actionCode);
        }
    });
    return actions;
}

// Renderizar barra de progreso en la previsualización
function renderProgressBar(progressBarName, progressBarData) {
    let progressBar = $(`#${progressBarName}`);
    if (progressBar.length === 0) {
        progressBar = $('<div></div>').attr('id', progressBarName).addClass('preview-progress-bar');
        preview.append(progressBar);
    }
    progressBar.css({
        left: `${progressBarData.x}px`,
        top: `${progressBarData.y}px`,
        width: `${progressBarData.width}px`,
        height: `${progressBarData.height}px`,
        backgroundColor: progressBarData.base_color,
        zIndex: progressBarData.layer
    });

    const progressElement = $('<div></div>').addClass('progress');
    progressBar.empty().append(progressElement);

    if (progressBarData.hide_on_start === "true") {
        progressBar.hide();
    } else {
        progressBar.show();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const configIniBtn = document.getElementById('configIniBtn');
    const iniModal = new bootstrap.Modal(document.getElementById('iniModal'));

    function fillSelectOptions(selectElement, buttonData) {
        selectElement.innerHTML = '';
        for (const button in buttonData) {
            if (buttonData.hasOwnProperty(button)) {
                const opt = document.createElement('option');
                opt.value = button;
                opt.text = button;
                selectElement.appendChild(opt);
            }
        }
    }

    function createInputGroup(labelText, pageSelect) {
        const formGroup = document.createElement('div');
        formGroup.className = 'mb-3';
    
        const label = document.createElement('label');
        label.innerText = labelText;
        formGroup.appendChild(label);
    
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group mb-3';
    
        const selectButton = document.createElement('select');
        selectButton.className = 'form-select';
        inputGroup.appendChild(selectButton);
    
        const selectState = document.createElement('select');
        selectState.className = 'form-select';
        selectState.innerHTML = `
            <option value="on">On</option>
            <option value="off">Off</option>
        `;
        inputGroup.appendChild(selectState);
    
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', function() {
            formGroup.remove();
        });
        inputGroup.appendChild(deleteButton);
    
        formGroup.appendChild(inputGroup);
    
        if (pageSelect) {
            const selectedPage = pageSelect.value;
            const buttonData = jsonTemplate[selectedPage].button_data;
            fillSelectOptions(selectButton, buttonData);
        }
    
        return formGroup;
    }

    function createTabContent(pageSelectId, groupLabels, isNewGroup = false) {
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-pane fade';
        tabContent.id = `tab-${pageSelectId}`;
    
        const pageSelectGroup = document.createElement('div');
        pageSelectGroup.className = 'mb-3';
    
        const pageSelectLabel = document.createElement('label');
        pageSelectLabel.innerText = `Selecciona tu página para el grupo:`;
        pageSelectGroup.appendChild(pageSelectLabel);
    
        const pageSelect = document.createElement('select');
        pageSelect.className = 'form-select';
        pageSelect.id = pageSelectId;
    
        for (const page in jsonTemplate) {
            if (jsonTemplate.hasOwnProperty(page)) {
                const opt = document.createElement('option');
                opt.value = page;
                opt.text = page;
                pageSelect.appendChild(opt);
            }
        }
    
        pageSelectGroup.appendChild(pageSelect);
        tabContent.appendChild(pageSelectGroup);
    
        const fieldsContainer = document.createElement('div');
        fieldsContainer.className = 'fields-container';
        tabContent.appendChild(fieldsContainer);
    
        groupLabels.forEach(labelText => {
            const inputGroup = createInputGroup(labelText, pageSelect);
            fieldsContainer.appendChild(inputGroup);
        });
    
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'mt-3';
    
        const addFieldBtn = document.createElement('button');
        addFieldBtn.className = 'btn btn-secondary me-2';
        addFieldBtn.textContent = 'Crear nuevo campo';
        addFieldBtn.addEventListener('click', () => {
            const newInputGroup = createInputGroup('Selecciona tu botón y su estado:', pageSelect);
            fieldsContainer.appendChild(newInputGroup);
        });
    
        const removeGroupBtn = document.createElement('button');
        removeGroupBtn.className = 'btn btn-danger';
        removeGroupBtn.textContent = 'Eliminar grupo';
        removeGroupBtn.addEventListener('click', () => {
            const tabPane = tabContent.closest('.tab-pane');
            const tabId = tabPane.id;
            const tabLink = document.querySelector(`a[href="#${tabId}"]`);
            
            tabLink.parentNode.remove();
            tabPane.remove();
        });
    
        buttonsContainer.appendChild(addFieldBtn);
        buttonsContainer.appendChild(removeGroupBtn);
        tabContent.appendChild(buttonsContainer);
    
        pageSelect.addEventListener('change', function () {
            const selectedPage = pageSelect.value;
            const buttonData = jsonTemplate[selectedPage].button_data;
            tabContent.querySelectorAll('.input-group select:first-child').forEach(select => {
                fillSelectOptions(select, buttonData);
            });
        });
    
        if (isNewGroup) {
            pageSelect.dispatchEvent(new Event('change'));
        }
    
        return tabContent;
    }

    function loadSavedConfig() {
        const savedConfig = localStorage.getItem('iniConfig');
        return savedConfig ? JSON.parse(savedConfig) : null;
    }

    function saveConfig(config) {
        localStorage.setItem('iniConfig', JSON.stringify(config));
    }

    function populateIniModal() {
        const modalBody = document.getElementById('iniModalBody');
        modalBody.innerHTML = '';
    
        const tabList = document.createElement('ul');
        tabList.className = 'nav nav-tabs';
        tabList.setAttribute('role', 'tablist');
    
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content mt-3';
    
        // Crear el grupo fijo "Categorías"
        const categoriesTabItem = document.createElement('li');
        categoriesTabItem.className = 'nav-item';
        const categoriesTabLink = document.createElement('a');
        categoriesTabLink.className = 'nav-link active';
        categoriesTabLink.setAttribute('data-bs-toggle', 'tab');
        categoriesTabLink.href = '#tab-categories';
        categoriesTabLink.textContent = 'Categorías';
        categoriesTabItem.appendChild(categoriesTabLink);
        tabList.appendChild(categoriesTabItem);
    
        const categoriesTabContent = createCategoriesTabContent();
        tabContent.appendChild(categoriesTabContent);
    
        const addGroupButton = document.createElement('button');
        addGroupButton.className = 'btn btn-primary mt-2';
        addGroupButton.textContent = '+ Agregar Grupo';
        addGroupButton.addEventListener('click', addNewGroup);
    
        let groupCount = 0;
    
        function addNewGroup() {
            groupCount++;
            const pageSelectId = `pageSelect${groupCount}`;
            const groupLabels = ['Selecciona tu botón y su estado:'];
    
            const tabItem = document.createElement('li');
            tabItem.className = 'nav-item';
            const tabLink = document.createElement('a');
            tabLink.className = 'nav-link';
            tabLink.setAttribute('data-bs-toggle', 'tab');
            tabLink.href = `#tab-${pageSelectId}`;
            tabLink.textContent = `Grupo ${groupCount}`;
            tabItem.appendChild(tabLink);
            tabList.appendChild(tabItem);
    
            const tabPane = createTabContent(pageSelectId, groupLabels, true);
            tabContent.appendChild(tabPane);
    
            new bootstrap.Tab(tabLink).show();
        }
    
        modalBody.appendChild(tabList);
        modalBody.appendChild(tabContent);
        modalBody.appendChild(addGroupButton);
    
        // Cargar la configuración guardada
        const savedConfig = loadSavedConfig();
        if (savedConfig) {
            if (savedConfig['CATEGORIAS-NAME']) {
                const categoryInput = document.getElementById('category1Input');
                categoryInput.value = savedConfig['CATEGORIAS-NAME']['C1'] || '';
            }

            Object.keys(savedConfig).forEach((page, index) => {
                if (page !== 'CATEGORIAS-NAME') {
                    groupCount++;
                    const pageSelectId = `pageSelect${groupCount}`;
                    const groupLabels = savedConfig[page].map(() => 'Selecciona tu botón y su estado:');
                    
                    const tabItem = document.createElement('li');
                    tabItem.className = 'nav-item';
                    const tabLink = document.createElement('a');
                    tabLink.className = 'nav-link';
                    tabLink.setAttribute('data-toggle', 'tab');
                    tabLink.href = `#tab-${pageSelectId}`;
                    tabLink.textContent = `Grupo ${groupCount}`;
                    tabItem.appendChild(tabLink);
                    tabList.appendChild(tabItem);

                    const tabPane = createTabContent(pageSelectId, groupLabels, true);
                    tabContent.appendChild(tabPane);

                    const pageSelect = tabPane.querySelector('select');
                    pageSelect.value = page;
                    pageSelect.dispatchEvent(new Event('change'));

                    savedConfig[page].forEach((item, fieldIndex) => {
                        const inputGroup = tabPane.querySelectorAll('.input-group')[fieldIndex];
                        if (inputGroup) {
                            const buttonSelect = inputGroup.querySelector('select:first-child');
                            const stateSelect = inputGroup.querySelectorAll('select')[1];
                            if (buttonSelect && stateSelect) {
                                buttonSelect.value = item.button;
                                stateSelect.value = item.state;
                            }
                        }
                    });
                }
            });
        }
    
        // Si no hay grupos guardados, no necesitamos crear uno por defecto
        // ya que tenemos el grupo fijo de "Categorías"
    }

    function createCategoriesTabContent() {
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-pane fade show active';
        tabContent.id = 'tab-categories';
    
        const formGroup = document.createElement('div');
        formGroup.className = 'mb-3';
    
        const label = document.createElement('label');
        label.innerText = 'Nombre actual de la categoría 1:';
        formGroup.appendChild(label);
    
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
        input.id = 'category1Input';
        formGroup.appendChild(input);
    
        tabContent.appendChild(formGroup);
    
        return tabContent;
    }

    configIniBtn.addEventListener('click', function () {
        populateIniModal();
        iniModal.show();
    });

    const saveIniConfigBtn = document.getElementById('saveIniConfig');
    saveIniConfigBtn.addEventListener('click', function () {
        const modalBody = document.getElementById('iniModalBody');
        const config = {
            'CATEGORIAS-NAME': {
                'C1': document.getElementById('category1Input').value
            }
        };
    
        modalBody.querySelectorAll('.tab-pane:not(#tab-categories)').forEach(tabPane => {
            const pageSelect = tabPane.querySelector('select');
            const page = pageSelect.value;
            if (!config[page]) {
                config[page] = [];
            }
    
            tabPane.querySelectorAll('.input-group').forEach(group => {
                const buttonSelect = group.querySelector('select:first-child');
                const stateSelect = group.querySelectorAll('select')[1];
                if (buttonSelect && stateSelect) {
                    config[page].push({
                        button: buttonSelect.value,
                        state: stateSelect.value
                    });
                }
            });
        });
    
        console.log('Configuración INI guardada:', config);
        saveConfig(config);
    
        iniModal.hide();
    
        Swal.fire({
            icon: 'success',
            title: 'Configuración guardada correctamente',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
    });
    const generateIniBtn = document.getElementById('generateIniBtn');

    function generateIniContent(config) {
        let iniContent = '';
        
        // Agregar la sección de categorías primero
        if (config['CATEGORIAS-NAME']) {
            iniContent += '[CATEGORIAS-NAME]\n';
            iniContent += `C1=${config['CATEGORIAS-NAME']['C1']}\n\n`;
        }
    
        // Agregar el resto de las secciones
        const sections = Object.keys(config).filter(key => key !== 'CATEGORIAS-NAME');
        sections.forEach((section, index) => {
            iniContent += `[${section}]\n`;
            const pageData = config[section] || [];
            pageData.forEach(item => {
                let key = item.button;
                iniContent += `${key}=${item.state}\n`;
            });
            iniContent += '\n';
        });
    
        return iniContent.trim();
    }

    function downloadIniFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateIniBtn.addEventListener('click', function () {
        showLoadingSpinner(); // Mostrar el spinner de carga
    
        const savedConfig = loadSavedConfig();
        if (savedConfig) {
            // Simulación de un proceso para generar el archivo INI
            setTimeout(() => {
                const iniContent = generateIniContent(savedConfig);
                downloadIniFile(iniContent, 'config.ini');
    
                hideLoadingSpinner(); // Ocultar el spinner una vez que se complete la generación
            }, 500); // Retraso opcional para mostrar el spinner antes de finalizar
        } else {
            hideLoadingSpinner(); // Asegúrate de ocultar el spinner incluso si no hay configuración guardada
    
            Swal.fire({
                icon: 'warning',
                title: 'No hay configuración guardada. Por favor, configure y guarde primero.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
    
});

$('#predefinedButtonCheck').on('change', function() {
    isPredefinedButton = this.checked;
    if (isPredefinedButton) {
        $('#predefinedButtonSelect').show();
        $('#categoryName').hide();
        $('#predefinedButton').val(currentFunction);
    } else {
        $('#predefinedButtonSelect').hide();
        $('#categoryName').show();
    }
});

$('#predefinedButton').on('change', function() {
    if (isPredefinedButton) {
        $('#categoryName').val(this.value);
    }
});

$('#predefinedPageCheck').on('change', function() {
    isPredefinedPage = this.checked;
    if (isPredefinedPage) {
        $('#predefinedPageSelect').show();
        $('#pageName').hide();
        $('#predefinedPage').val(currentPage);
    } else {
        $('#predefinedPageSelect').hide();
        $('#pageName').show();
    }
});

$('#predefinedPage').on('change', function() {
    if (isPredefinedPage) {
        $('#pageName').val(this.value);
    }
});

let selectedElement = null;
let originalAspectRatio = 1;

$('#preview').on('mousedown', function(e) {
    if (e.target === this) {
        selectedElement = null;
        $('#controlPanel').hide();
    }
});

$('#xSlider, #ySlider, #widthSlider, #heightSlider').on('input', function() {
    const property = this.id.replace('Slider', '');
    const value = parseInt($(this).val());
    $(`#${property}Input`).val(value);
    applyChanges(property, value);
});

$('#xInput, #yInput, #widthInput, #heightInput').on('input', function() {
    const property = this.id.replace('Input', '');
    const value = parseInt($(this).val()) || 0;
    $(`#${property}Slider`).val(value);
    applyChanges(property, value);
});

$('#lockAspectRatio').on('change', function() {
    if (this.checked && selectedElement) {
        originalAspectRatio = $(selectedElement).width() / $(selectedElement).height();
    }
});

function updateJsonTemplate() {
    if (selectedElement && currentPage) {
        const elementId = selectedElement.id;
        const $element = $(selectedElement);
        
        let elementType;
        if ($element.hasClass('preview-button')) elementType = 'button_data';
        else if ($element.hasClass('preview-image')) elementType = 'images_data';
        else if ($element.hasClass('preview-text')) {
            // Verifica si es un texto normal o una solicitud de texto
            elementType = jsonTemplate[currentPage].text_data && jsonTemplate[currentPage].text_data[elementId] ? 
                'text_data' : 'string_data';
        }
        else if ($element.hasClass('preview-progress-bar')) elementType = 'progressbar_data';
        
        if (elementType && jsonTemplate[currentPage][elementType] && jsonTemplate[currentPage][elementType][elementId]) {
            jsonTemplate[currentPage][elementType][elementId].x = Math.round($element.position().left);
            jsonTemplate[currentPage][elementType][elementId].y = Math.round($element.position().top);
            jsonTemplate[currentPage][elementType][elementId].width = Math.round($element.width());
            jsonTemplate[currentPage][elementType][elementId].height = Math.round($element.height());
        }
    }
}

$('#controlPanel').hide();

$('#preview').on('mousedown', '.preview-button, .preview-image, .preview-text, .preview-progress-bar', function(e) {
    e.preventDefault();
    selectedElement = this;
    updateControlPanel(this);
    $('#controlPanel').show();

    const $element = $(this);
    const $preview = $('#preview');
    const previewOffset = $preview.offset();
    const elementOffset = $element.offset();

    // Calcular el offset del cursor dentro del elemento
    const cursorOffsetX = e.pageX - elementOffset.left;
    const cursorOffsetY = e.pageY - elementOffset.top;

    $(document).on('mousemove.drag', function(e) {
        // Calcular la nueva posición relativa al contenedor de previsualización
        let newX = e.pageX - previewOffset.left - cursorOffsetX;
        let newY = e.pageY - previewOffset.top - cursorOffsetY;

        // Limitar el movimiento dentro del contenedor de previsualización
        newX = Math.max(0, Math.min(newX, $preview.width() - $element.outerWidth()));
        newY = Math.max(0, Math.min(newY, $preview.height() - $element.outerHeight()));

        $element.css({
            left: newX + 'px',
            top: newY + 'px'
        });

        $('#xSlider, #xInput').val(Math.round(newX));
        $('#ySlider, #yInput').val(Math.round(newY));
        updateJsonTemplate();
    });

    $element.addClass('dragging');

    $(document).on('mouseup.drag', function() {
        $(document).off('mousemove.drag mouseup.drag');
        $element.removeClass('dragging');
    });
});

// Asegúrate de que el contenedor de previsualización tenga una posición relativa
$('#preview').css('position', 'relative');

// Actualiza la función updateControlPanel para usar posiciones relativas
function updateControlPanel(element) {
    const $element = $(element);
    const position = $element.position();
    const x = Math.round(position.left);
    const y = Math.round(position.top);
    const width = Math.round($element.width());
    const height = Math.round($element.height());

    $('#xSlider, #xInput').val(x);
    $('#ySlider, #yInput').val(y);
    $('#widthSlider, #widthInput').val(width);
    $('#heightSlider, #heightInput').val(height);
    originalAspectRatio = width / height;

    // Actualizar el modal de solicitudes de texto si es necesario
    if ($element.hasClass('preview-text') && jsonTemplate[currentPage].string_data && jsonTemplate[currentPage].string_data[element.id]) {
        $('#stringXInput').val(x);
        $('#stringYInput').val(y);
        $('#stringWidthInput').val(width);
        $('#stringHeightInput').val(height);
    }
}

// Actualiza la función applyChanges para usar posiciones relativas
function applyChanges(property, value) {
    if (selectedElement) {
        const $element = $(selectedElement);
        const $preview = $('#preview');
        const previewRect = $preview[0].getBoundingClientRect();
        const elementRect = $element[0].getBoundingClientRect();

        switch(property) {
            case 'x':
                value = Math.max(0, Math.min(value, previewRect.width - elementRect.width));
                $element.css('left', value + 'px');
                break;
            case 'y':
                value = Math.max(0, Math.min(value, previewRect.height - elementRect.height));
                $element.css('top', value + 'px');
                break;
            case 'width':
                value = Math.min(value, previewRect.width - $element.position().left);
                $element.css('width', value + 'px');
                if ($('#lockAspectRatio').is(':checked')) {
                    const newHeight = value / originalAspectRatio;
                    $element.css('height', newHeight + 'px');
                    $('#heightSlider, #heightInput').val(Math.round(newHeight));
                }
                break;
            case 'height':
                value = Math.min(value, previewRect.height - $element.position().top);
                $element.css('height', value + 'px');
                if ($('#lockAspectRatio').is(':checked')) {
                    const newWidth = value * originalAspectRatio;
                    $element.css('width', newWidth + 'px');
                    $('#widthSlider, #widthInput').val(Math.round(newWidth));
                }
                break;
        }

        updateJsonTemplate();
    }
}

// FUNCION PARA ABRIR LOS MODALS CON UN JUEGO DE TECLA

let ctrlPressed = false;

$(document).on('keydown', function(e) {
    if (e.ctrlKey) {
        ctrlPressed = true;
    }
});

$(document).on('keyup', function(e) {
    if (!e.ctrlKey) {
        ctrlPressed = false;
    }
});

$('#preview').on('click', '.preview-button, .preview-image, .preview-text, .preview-progress-bar', function(e) {
    if (ctrlPressed) {
        e.preventDefault();
        const $element = $(this);
        const elementId = $element.attr('id');
        
        if ($element.hasClass('preview-button')) {
            currentFunction = elementId;
            openFunctionModal(elementId);
        } else if ($element.hasClass('preview-image')) {
            currentImage = elementId;
            openImageModal(elementId);
        } else if ($element.hasClass('preview-text')) {
            // Verificar si es un texto normal o una solicitud de texto
            if (jsonTemplate[currentPage].text_data && jsonTemplate[currentPage].text_data[elementId]) {
                currentText = elementId;
                openTextModal(elementId);
            } else if (jsonTemplate[currentPage].string_data && jsonTemplate[currentPage].string_data[elementId]) {
                currentString = elementId;
                openStringModal(elementId);
            }
        } else if ($element.hasClass('preview-progress-bar')) {
            currentProgressBar = elementId;
            openProgressBarModal(elementId);
        }
    }
});

function openFunctionModal(functionName) {
    const functionData = jsonTemplate[currentPage].button_data[functionName];
    $('#categoryName').val(functionName);
    $('#x').val(functionData.x);
    $('#y').val(functionData.y);
    $('#width').val(functionData.width);
    $('#height').val(functionData.height);
    $('#img_n').val(functionData.img_n);
    $('#img_h').val(functionData.img_h);
    $('#img_c').val(functionData.img_c);
    $('#functionLayer').val(functionData.layer);
    $('#hover_sound').val(functionData.hover_sound);
    $('#click_sound').val(functionData.click_sound);
    
    isPredefinedButton = functionData.isPredefinedButton || false;
    $('#predefinedButtonCheck').prop('checked', isPredefinedButton);
    if (isPredefinedButton) {
        $('#predefinedButtonSelect').show();
        $('#categoryName').hide();
        $('#predefinedButton').val(functionName);
    } else {
        $('#predefinedButtonSelect').hide();
        $('#categoryName').show();
    }

    loadExistingActions(functionData.actions, $('#functionActionsContainer'));

    functionModal.modal('show');
}

function openImageModal(imageName) {
    const imageData = jsonTemplate[currentPage].images_data[imageName];
    imageNameInput.val(imageName);
    imageXInput.val(imageData.x);
    imageYInput.val(imageData.y);
    imageWidthInput.val(imageData.width);
    imageHeightInput.val(imageData.height);
    imageLayerInput.val(imageData.layer);
    imageFilenameInput.val(imageData.filename);
    imageOnlineInput.prop('checked', imageData.img_online === "true");
    imageUrlInput.val(imageData.img_url);
    imageHideOnStartInput.prop('checked', imageData.hide_on_start === "true");
    imageModal.modal('show');
}

function openTextModal(textName) {
    const textData = jsonTemplate[currentPage].text_data[textName];
    textNameInput.val(textName);
    textXInput.val(textData.x);
    textYInput.val(textData.y);
    textWidthInput.val(textData.width);
    textHeightInput.val(textData.height);
    textLayerInput.val(textData.layer);
    textContentInput.val(textData.text);
    textFromFileInput.prop('checked', textData.content !== "");
    textFileInput.val(textData.content);
    textPreTextInput.val(textData.pre_text);
    textFontColorInput.val(textData.font_color);
    textFontNameInput.val(textData.font_name);
    textFontSizeInput.val(textData.font_size);
    textPositionInput.val(textData.position);
    textHideOnStartInput.prop('checked', textData.hide_on_start === "true");
    textModal.modal('show');
}

function openProgressBarModal(progressBarName) {
    const progressBarData = jsonTemplate[currentPage].progressbar_data[progressBarName];
    progressBarNameInput.val(progressBarName);
    progressBarXInput.val(progressBarData.x);
    progressBarYInput.val(progressBarData.y);
    progressBarWidthInput.val(progressBarData.width);
    progressBarHeightInput.val(progressBarData.height);
    progressBarLayerInput.val(progressBarData.layer);
    progressBarBaseColorInput.val(progressBarData.base_color);
    progressBarProgressColorInput.val(progressBarData.progress_color);
    progressBarHideOnStartInput.prop('checked', progressBarData.hide_on_start === "true");
    progressBarModal.modal('show');
}

function openStringModal(stringName) {
    const stringData = jsonTemplate[currentPage].string_data[stringName];
    stringNameInput.val(stringName);
    stringXInput.val(stringData.x);
    stringYInput.val(stringData.y);
    stringWidthInput.val(stringData.width);
    stringHeightInput.val(stringData.height);
    stringLayerInput.val(stringData.layer);
    stringFontColorInput.val(stringData.font_color);
    stringFontNameInput.val(stringData.font_name);
    stringFontSizeInput.val(stringData.font_size);
    stringGetUrlInput.val(stringData.get_url);
    stringFixInput.prop('checked', stringData.string_fix === "true");
    stringPositionInput.val(stringData.position);
    stringHideOnStartInput.prop('checked', stringData.hide_on_start === "true");
    stringModal.modal('show');
}