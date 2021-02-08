"use strict";

function GETLIST()
{
    let DataList = [];
    APIcall('', 'GET', null, function(result){
        DataList = result;

        let datatables = $('#tblListFolderDoc').DataTable( {
            // "processing": true,
            "ajax": DataList,
            "columns": [
                { "data": "no" },
                { "data": "id_folder" },
                { "data": "cif" },
                { "data": "nama" },
                { "data": "tahun" },
                { "data": "nmopk" },
                { "data": "nmrm" },
                { "data": "nmark" },
                { "data": "nmkpth" },
                { "data": "status" },
                { "data": "button" }
            ],
            // dom: 'Bfrtip', nampilih pdf
            // "columnDefs": [
            //     { "sortable": false, "targets": [2,3] }
            // ]
        } );
    });
}