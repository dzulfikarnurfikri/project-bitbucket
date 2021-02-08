var TabelData = [];

function pullTableHead(tblid, tblHeadTitle)
{
    $("#"+tblid+" thead").empty();
    let t = "<tr>";
    $.map(tblHeadTitle, function(val, i){
        t += "<th class='text-center'>"+val+"</th>";
    })
    t += "</tr>";
    $("#"+tblid+" thead").append(t);
}

function paginator(current_page = 1, arraydata = TabelData) {
    
    $('#pagination').empty();

    let per_page_items = 5;
	let page = current_page || 1,
	per_page = per_page_items || 10,
	offset = (page - 1) * per_page,

	paginatedItems = arraydata.slice(offset).slice(0, per_page_items),
	total_pages = Math.ceil(arraydata.length / per_page);

    page = page;
    per_page = per_page;
    pre_page = page - 1 ? page - 1 : null;
    next_page = (total_pages > page) ? page + 1 : null;
    total = arraydata.length;
    total_pages = total_pages;
    data = paginatedItems;

    ShowList(data, page);

    prev = page - 1;
    next = page + 1;
    prev_dis = !pre_page ? 'disabled' : '';
    next_dis = !next_page ? 'disabled' : '';
    
    // console.log(next_dis);
    var t = "<li class='page-item "+ prev_dis +"'>";
    t += "<a class='page-link btn_prev' href='#' tabindex='-1' onclick='paginator("+prev+")'><i class='fas fa-chevron-left'></i></a>";
    t += "</li>";
    for (i = 1; i <= total_pages; i++) {
        var active = page == i ? 'active' : '';
        t += "<li class='page-item "+ active +"'>"  
        t += "<a class='page-link' href='#' onclick='paginator("+i+")'>"+i+"</a>";
        t += "</li>";
    }
    t += "<li class='page-item "+ next_dis +"'>";
    t += "<a class='page-link btn_next' href='#' tabindex='-1' onclick='paginator("+next+")'><i class='fas fa-chevron-right'></i></a>";
    t += "</li>";

    $('.pagination').append(t)
}

function ShowList(datas, page){
    let num = (page * 5)-5;
    $('#tblListFolderDoc tbody').empty();
    $.map(datas, function(val, i){
        num++;
        var tr = "<tr>";
        tr += "<td class='text-center'>"+num+"</div></td>";
        tr += "<td class='text-center'>"+ val.id_folder +"</td>";
        tr += "<td class='text-center'>"+ val.cif +"</td>";
        tr += "<td class='text-center'>"+ val.nama +"</td>";
        tr += "<td class='text-center'>"+ val.tahun +"</td>";
        tr += "<td class='text-center'>"+ val.nmopk +"</td>";
        tr += "<td class='text-center'>"+ val.nmrm +"</td>";
        tr += "<td class='text-center'>"+ val.nmark +"</td>";
        tr += "<td class='text-center'>"+ val.nmkpth +"</td>";
        if(val.doc_status == 1 ){
            tr += "<td class='text-center'><div class='badge badge-success'>Proses</div></td>";
        }else if(val.doc_status == 2 ){
            tr += "<td class='text-center'><div class='badge badge-danger'>Menunggu Pengajuan</div></td>";
        }else if(val.doc_status == 3 ){
            tr += "<td class='text-center'><div class='badge badge-danger'>Diajukan</div></td>";
        }else if(val.doc_status == 4 ){
            tr += "<td class='text-center'><div class='badge badge-danger'>Disetujui</div></td>";
        }else if(val.doc_status == 5 ){
            tr += "<td class='text-center'><div class='badge badge-danger'>Ditolak</div></td>";
        }
        tr += "<td class='text-center'>";
        tr += "<div class='btn-group btn-group-md' role='group' aria-label='Basic example'>";
        tr += "<a href='/Lbk07SrjBWMTUgfm2LIkAtxFEmpsaAfJTPi9XURsK8WQ506jx9AVUB0oLipjLsRbHKgEYu/"+val.id_folder+"' id="+val.id_folder+" class='btn btn-outline-primary' title='edit data'><i class='fas fa-eye'></i> Lihat Document</a>";
        tr += "</div>";
        tr += "</td>";
        tr += "</tr>";
        $('#tblListFolderDoc tbody').append(tr);
    })
}