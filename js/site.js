function loadBaseData() {
    if (localStorage.getItem('base') == null) {
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        request.open('GET', './all_base.json');
        request.onload = function() {
            localStorage.setItem('base', JSON.stringify(request.response));
        }
        request.send();
    }
}

function showCore() {
    if (localStorage.getItem('base') == null) { loadBaseData(); }

    var json = JSON.parse(localStorage.getItem('base'));
    var result = '<table class="table"><thead class="thead-dark"><tr><th scope="col" style="width:64px">#</th><th scope="col" style="width:400px">Core</th><th scope="col" style="width:64px"></th><th scope="col" style="width:200px">Formula</th><th scope="col" style="width:200px">Local</th></tr></thead><tbody>';
    var qt = json['core'].length;
    var nameCore = document.getElementById('txtCoreName').value;
    var selectTypes = $('#coreTypes').select2('data').map(i => i.id);
    for (let i = 0; i < qt; i++) {
        if ((selectTypes.includes(json['core'][i]['type'].toString())
                //    | selectTypes.length == 0
            ) &
            json['core'][i]['Name'].toUpperCase().includes(nameCore.toUpperCase())
        ) {
            result += '<tr>';
            result += '    <td>';
            result += '        <div class="col-4" style="background-color:blue">';
            result += '            <img src="./files/core_base.png" id="img1" />';
            result += '            <img src="./files/' + json['core'][i]['Icon'] + '" id="img2" ' + (json['core'][i]['Neo'] ? 'class="blink"' : '') + ' />';
            result += '        </div>';
            result += '    </td>';
            result += '    <td>';
            result += '        <input type="text" class="form-name" aria-describedby="inputGroup" disabled value="' + json['core'][i]['Name'] + '">';
            result += '        <div class="input-group input-group-sm mb-3">';
            result += '            <div class="input-group-prepend">';
            result += '                <span class="input-group-text" id="inputGroup">Tipo</span>';
            result += '            </div>';
            result += '            <input type="text" class="form-control form-input-group" aria-describedby="inputGroup" disabled value="' + json['tipo'][json['core'][i]['type'] - 1]['name'] + '"/>';
            result += '            <div class="input-group-prepend" style="margin-left:10px">';
            result += '                <span class="input-group-text" id="inputGroup">Level (Min~Max)</span>';
            result += '            </div>';
            result += '            <input type="text" class="form-control form-input-group" aria-describedby="inputGroup" disabled value="' + json['core'][i]['LvlMin'] + '~' + json['core'][i]['LvlMax'] + '"/>';
            result += '        </div>';
            result += '    </td>';
            result += '    <td><div id="preview-border"><div id="preview-background">' + (json['core'][i]['Neo'] ? '<img id="preview-img-neo" class="blink" src="./files/' + json['core'][i]['ImgNeo'] + '"/>' : '') + '</div><div id="preview-img"><img src="./files/' + json['core'][i]['Img'] + '" class="preview-img-aling" /></div></div></td>';
            result += '    <td>';
            if (json['core'][i]['MixFormula'] != null) {
                for (let j = 0; j < 20; j++) {
                    if (json['core'][i]['MixFormula'][j] !== undefined) {
                        result += '        <div class="input-group input-group-sm mb-3">';
                        result += '            <div class="input-group-prepend">';
                        result += '                <span class="input-group-text" id="inputGroup">Mix ' + j + '</span>';
                        result += '            </div>';
                        result += '            <input type="text" class="form-control form-input-group" aria-describedby="inputGroup" disabled value="' + json['core'][i]['MixFormula'][j][0]['Name'] + ' + ' + json['core'][i]['MixFormula'][j][1]['Name'] + '"/>';
                        result += '        </div>';
                    }
                }
            }
            result += '    </td>';
            result += '    <td>';
            if (json['core'][i]['Location'] != null) {
                for (let j = 0; j < 20; j++) {
                    if (json['core'][i]['Location'][j] !== undefined) {
                        result += '<input type="text" class="form-name" aria-describedby="inputGroup" disabled value="' + json['core'][i]['Location'][j]['Nome'] + '">';
                    }
                }
            }
            result += '    </td>';
            result += '</tr>';
            //result += '<img src="files/' + json['core'][i]['Img'] + '" alt="">';
        }
    }
    result += '</tbody></table>';
    document.getElementById('divTeste').innerHTML = result;
}

$(document).ready(function() {
    loadBaseData();
    $('.select2')
        .select2({
            placeholder: "Type",
            with: "300px",
        })
        //Triggers
        .on("select2:select", function(e) {
            showCore();
        })
        .on("select2:unselect", function(e) {
            showCore();
        });
    showCore();
});