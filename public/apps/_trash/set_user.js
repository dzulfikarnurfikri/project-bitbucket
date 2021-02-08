function callAPI(){
    APIcall('', 'GET', null, function(result){
        TabelData = result.data;
    //   console.log(TabelData);
        ShowList(TabelData);
    });
}
  
function ShowList(datas){
    $('#tableListUser tbody').empty();
    $.map(datas, function(val, i){
        num = i + 1;
        var tr = "<tr>";
        tr += "<td class='text-center'>"+num+"</div></td>";
        tr += "<td class='text-center'>"+ val.pn +"</td>";
        tr += "<td class='text-center'>"+ val.nama +"</td>";
        tr += "<td class='text-center'>"+ val.level_id +"</td>";
        tr += "<td class='text-center'>"+ val.uker_id +"</td>";
        if(val.status == 1){
            tr += "<td class='text-center'><div class='badge badge-success'>Aktif</div></td>";
        }else{
            tr += "<td class='text-center'><div class='badge badge-danger'>Tidak Aktif</div></td>";
        }
        tr += "<td class='text-center'>";
        tr += "<div class='btn-group btn-group-md' role='group' aria-label='Basic example'>";
        tr += "<button type='button' id="+val.pn+"                      class='btn btn-outline-primary btn_edit' title='edit data' data-toggle='modal' data-target='#add_menu'><i class='fas fa-edit'></i></button>";
        tr += "<button type='button' id="+val.pn+" drop='"+val.Drop+"'  class='btn btn-outline-info btn_info'><i class='fas fa-info'></i></button>";
        tr += "</div>";
        tr += "</td>";
        tr += "</tr>";
        $('#tableListUser tbody').append(tr);
    })
}

$(document).on('click',".btn_info", function(){
    pern = $(this).attr('id');
    var data = {"tipe" : 1, "pernr": pern, "tabel" : "pekerja"};
    
    APIcall("/infopekerja", 'POST', data, function(result){
        datas = result.data;
        $.map(datas, function(val, i){
            if(i == 'foto'){
                $("#img_pro").attr("src", val);
            }else{
                $('#'+i).text(val);
            }
        });
        $("#add_info_user").modal();
    });
});

$(document).on('click',".btn_add_user", function(){
    pn = $('#input_pernr').val();
    var data = {"tipe" : 1, "pernr": pn, "tabel" : "pekerja"};
    if(pn){
        APIcall("/infopekerja", 'POST', data, function(result){
            if(result.error){
                alert('Pernr tidak ditemukan');
            }else{
                datas = result.data;
                $.map(datas, function(val, i){
                    if(i == 'foto'){
                        $("#img_pro").attr("src", val);
                    }else{
                        $('#'+i).text(val);
                    }
                });
                $("#add_info_user").modal();
            }
        });
    }else{
        alert('Insert Pernr');
    }
});

$(document).on('click',".btn_search", function(){
    nameKey = $('#input_search').val();
    var result = null;
    finddatatabel(nameKey, 0, function(result){

    })
});

function finddatatabel(nameKey, tipe, result){
    if(nameKey){
        for (var i=0; i < TabelData.length; i++) {
            if (TabelData[i].nama == nameKey) {
                // return myArray[i];
                console.log([TabelData[i]])
                result = TabelData[i];
            }
        }
        if(result){
            ShowList([result]);
        }else{
            alert('Nama || Pernr tidak ditemukan');
        }
    }else{
        // ShowList(TabelData);
        result(TabelData)
    }
}