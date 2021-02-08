"use strict";

var table = $('#tableListUser').DataTable( {
    "ajax": window.location.href,
    "columns": [
        { "data": "no" },
        { "data": "kostl" },
        { "data": "hilfm" },
        { "data": "desc" },
        { "data": "uker_id" },  
        { "data": "status_btn" },
        { "data": "button" },
    ],
    'columnDefs': [
        { "targets": 5, "className": "text-center", },
        { "targets": 6, "className": "text-center", }
    ],
} );

$('.dataTables_filter').append('<button class="btn btn-success btn_add_user ml-2 btn-sm" data-toggle="modal" data-target="#add_info_user"><i class="fas fa-plus"></i> Tambah User</button>');
$(document).on('click', ".btn_add_user", function(){
    clearModal();
});

$(document).on('click',".btn_cari_pn", function(){
    let pn = $('#input_pernr').val();
    if(pn){
        //pertama check db
        var data = {"tipe" : 1, "pernr": pn, "tabel" : "db"};
        APIcall("/infopekerja", 'POST', data, function(result){
            if(result.error){
                var data = {"tipe" : 1, "pernr": pn, "tabel" : "api"};
                APIcall("/infopekerja", 'POST', data, function(result){
                    if(result.error){
                        alert('Personal Number tidak ditemukan');
                    }else{
                        let datas = result.data;
                        $.map(datas, function(val, i){
                            if(i == 'foto'){
                                $("#img_pro").attr("src", val);
                            }else{
                                $('#'+i).text(val);
                                if(i == 'nama'){
                                    $('#namapern').val(val);
                                }
                            }
                        });

                        $('#input_pernr').attr('readonly', true);
                        $('.btn_submit').prop('disabled', false);
                        $('.btn_batal').prop('disabled', false);
                    }
                });
            }else{
                alert('Personal ID sudah terdaftar')
            }
        });
        
    }else{
        alert('Insert Pernr');
    }
});

$(document).on('click',".btn_batal", function(){
    clearModal();
});

function clearModal(){
    $("#img_pro").attr("src", '/assets/img/avatar/avatar-1.png');
    $('#nama').text('. . .');
    $('#pernr').text('. . .');
    $('#bagian').text('. . .');
    $('#kostl_tx').text('. . .');
    $('#nip').text('. . .');
    $('#pa').text('. . .');
    $('#psa').text('. . .');
    $('#orgeh').text('. . .');
    $('#bagian').text('. . .');
    $('#bagian').text('. . .');
    $('#bagian').text('. . .');
    $('.btn_submit').prop('disabled', true);
    $('.btn_batal').prop('disabled', true);
    $('#input_pernr').attr('readonly', false);
    $('#input_pernr').val('');
    $('#namapern').val('');
}

$('#form_user').submit(function(e) {
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    // console.log(data);
        APIcall('/insertuser', 'POST', data, function(response){
            console.log(response);
            clearModal();
            table.ajax.reload();
        });

    return false;          
});

$(document).on('click',".btn_delete", function(){
    let id = $(this).attr('id');
    ConfirmAlert('Apakah anda yakin?','Apabila dihapus tidak bisa direcovery lagi', function(data){
    if (data) {
        APIcall('/deleteuser/'+id, 'DELETE', null, function(result){
            if(result.error){
                swal("Hapus User "+id, 'Gagal', 'error');
            }else{
                swal("Hapus User "+id, 'Berhasil!', 'success');
                table.ajax.reload();
            }
        });
    }
    });
  });