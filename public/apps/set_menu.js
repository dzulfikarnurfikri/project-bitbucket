

var datas = [];
var tSend = 0;
var tList, idx1, idx2, id;
tList = idx1 = idx2 = id = 0;

function callAPI(){
  APIcall('', 'GET', null, function(result){
    datas = result.data;
    console.log(datas);
    getList();
  });
}

function getList(){
  $('#title_table').empty();
  if(tList == 0){
    $('#title_table').text("MENU UTAMA");
    $('#posisi').val('0');
    $('#id_parent').val('0');
    $("#jenis").append('<option value="MAIN">MAIN</option>');
    $('#jenis').val("MAIN");
    showList(datas);
  }else if(tList == 1){
    $('#title_table').text("MENU KONTENT ("+datas[idx1].Title+")");
    $('#posisi').val('1');
    $('#id_parent').val(datas[idx1].ID);
    showList(datas[idx1].Drop);
    $("#jenis option[value='MAIN']").remove();
  }else if(tList == 2){
    $('#title_table').text("MENU KONTENT ("+datas[idx1].Drop[idx2].Title+")");
    $('#posisi').val('2');
    $('#id_parent').val(datas[idx1].Drop[idx2].ID);
    showList(datas[idx1].Drop[idx2].Drop);
    $("#jenis option[value='MAIN']").remove();
  }
}

function showList(data){
  var counter = data ? data.length : 0;
  // ToastAlert(true, "Title", 'Total : '+counter+' record');
  $('#tablemenu tbody').empty();
  $.map(data, function( val, i ) {
    num = i+1;
    var tr = "<tr>";
    tr +="<td class='text-center'>"+num+"</div></td>";
    tr += "<td class='text-center'>"+ val.Jenis +"</td>";
    tr += "<td class='text-center'>"+ val.Title +"</td>";
    tr += "<td class='text-center'><a href="+val.Route+">"+ shorter(val.Route, 30) +"</a></td>";
    tr += "<td class='text-center'>"+ val.Controller +"</td>";
    tr += "<td class='text-center'><i class='"+ val.Icon +"'></i></td>";
    tr += "<td class='text-center'>"+ val.Desc +"</td>";
    if(val.Status == 1){
      tr += "<td class='text-center'><div class='badge badge-success'>Active</div></td>";
    }else{
      tr += "<td class='text-center'><div class='badge badge-danger'>Not Active</div></td>";
    }
    tr += "<td class='text-center'>";
      tr += "<div class='btn-group btn-group-md' role='group' aria-label='Basic example'>";
      tr += "<button type='button' id="+val.ID+"                      class='btn btn-outline-primary btn_edit' title='edit data' data-toggle='modal' data-target='#add_menu'><i class='fas fa-edit'></i></button>";
      tr += "<button type='button' id="+val.ID+" drop='"+val.Drop+"'  class='btn btn-outline-danger btn_delete'><i class='fas fa-trash'></i></button>";
    if(val.Jenis == "MAIN" || val.Jenis == "DROP") { 
      tr += "<button type='button' idx="+i+" id="+val.ID+"            class='btn btn-outline-info btn_next'><i class='fas fa-angle-right'></i></button>";
    }
      tr += "</div>";
    tr += "</td>";
    
    tr += "</tr>";
    $('#tablemenu tbody').append(tr);
  });

}

$(document).on('click',".rdmurl", function(){
    $('#route').val(rdtext(50));
});


$(document).on('click',".btn_next", function(){
  var tbidx = $(this).attr('idx');
  id = $(this).attr('id');
  if(tList == 0){
    tList = 1;
    idx1 = tbidx;
  }else if(tList == 1){
    tList = 2;
    idx2 = tbidx;
  }

  getList()
});

$(document).on('click',".btn_back", function(){
  id = $(this).attr('id');
  if(tList == 2){
    tList = 1;
    getList()
  }else if(tList == 1){
    tList = 0;
    getList();
  }

  $("#jenis select").val("MAIN");
});

$(document).on('click',".add_menu", function(){
    tSend = 0;
    setForm();
});

$(document).on('click',".btn_edit", function(){
    tSend = 1;
    setForm();
    id = $(this).attr('id');
    APIcall('/menu/'+id+'/edit', 'GET', null, function(result){
        var data = result.data;
        $('#id').val(data.id);
        $('#posisi').val(data.posisi);
        var jenis = data.jenis;
        if(jenis == "DROP"){
            $("#route").val("#");
            $("#controller").val("#");
            $('.route').hide();
            $('.controller').hide();
        }else if(jenis == "NODROP"){
            $("#route").val("#");
            $("#controller").val("#");
            $('.route').show();
            $('.controller').show();
        }
        $('#jenis').val(data.jenis);
        $('#title').val(data.title);
        $('#route').val(data.route);
        $('#controller').val(data.controller);
        $('#icon').val(data.icon);
        $('#desc').val(data.desc);
        $('#id_parent').val(data.id_parent);
        $('#status').val(data.status);
    });
});

function setForm()
{
    if(tList == 0){
        $('.jenis').hide();
        $('.route').hide();
        $('.controller').hide();
        $('.icon').hide();
    }else if(tList == 1){
        $('.jenis').show();
        $('.route').show();
        $('.controller').show();
        $('.icon').show();
    }else{
        $('.jenis').hide();
        $('.icon').show();
    }
}

$('#jenis').on('change', function() {
  if(this.value == "DROP"){
    $("#route").val("#");
    $("#controller").val("#");
    $('.route').hide();
    $('.controller').hide();
  }else{
    $("#route").val("#");
    $("#controller").val("#");
    $('.route').show();
    $('.controller').show();
  }
});

  $('#form_menu').submit(function(e) {
    var id = $('#id').val();
      e.preventDefault();
      var data = $(this).serializeFormJSON();
      if(tSend == 0){
        APIcall('SetMenuController/create', 'POST', data, function(response){
            console.log(response);
            callAPI();
            // location.reload();
        });
      }else{
        APIcall('SetMenuController/update/'+id, 'PUT', data, function(response){
            console.log(response);
            callAPI();
            // location.reload();
        });
      }

      $('#close-modal').click();
      return false;          
  });

  $(document).on('click',".btn_delete", function(){
    id = $(this).attr('id');
    drop = $(this).attr('drop');
    if(tList == 2){
      drop = "null";
    }
    // console.log(drop);
    if(drop == "null"){
      ConfirmAlert('Apakah anda yakin?','Apabila dihapus tidak bisa direcovery lagi', function(data){
        if (data) {
          APIcall('SetMenuController/delete/'+id, 'DELETE', null, function(result){
            datas = result;
            callAPI()
            swal({
                title: result.title,
                text: result.message,
                icon: 'success',
            });
          });
        }
      });
    }else{
      swal('Warning', 'Menu ini tidak bisa dihapus dikarenakan masih ada sub-menu', 'error');
    }
  });

  (function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
  })(jQuery);

//   function addCommas(nStr)
//   {
//     nStr += '';
//     x = nStr.split('.');
//     x1 = x[0];
//     x2 = x.length > 1 ? '.' + x[1] : '';
//     var rgx = /(\d+)(\d{3})/;
//     while (rgx.test(x1)) {
//       x1 = x1.replace(rgx, '$1' + ',' + '$2');
//     }
//     return x1 + x2;
//   }