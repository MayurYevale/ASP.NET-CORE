﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            // make api call
            "url": "/api/book",
            "type": "GET",
            "datatype":"json"
        },
        // now columns
        "columns": [
            {"data":"name","width":"20%"},
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",   // rendering two functions
                "render": function (data) {
                    return '<div class="text-center"><a href="/BookList/Edit?id=${data}" class="btn btn-success text-white" style="cursor:pointer; width:70px;">Edit</a> &nbsp; <a class="btn btn-danger" style="cursor:pointer; width:70px;" onclick=Delete("/api/book?id="+${data})>Delete</a></div>';
                },"width":"40%"
            }

        ],
        "language": {
            "emptyTable":"Data Not Availabe"
        },
        "widht":"100%"
    });
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted , You will not be able to recover",
        icon: "warning",
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();

                    }
                    else {
                        toastr.erro(data.message);

                    }
                }
            });
        }
    });
}