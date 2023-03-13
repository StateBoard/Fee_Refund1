$('#tbl_IndexNo_Division_Wise').hide();

$("#btn_div_index").click(function () {

    $('#tbl_IndexNo_Division_Wise').show();

    $("#tbl_IndexNo_Division_Wise tbody tr").remove();
    $.ajax({
        type: 'POST',
        url: '/CommonMethod/Get_All_IndexNo_Division_Wise',
        dataType: 'json',
        data:
        {
            index_no: $("#DDL_std_index").val(),
            exam_year: $("#ddl_div_index_wise").val(),
        },
        beforeSend: function () {
            Showloader();
        },
        complete: function () {
            Hideloader();
        },
        success: function (data) {

            $.each(data, function (i, item) {
                var i = i + 1;
                var rows = "<tr> " +

                    "<td>" + i++ + "</td>" +
                    "<td>" + item.Index_No + "</td>" +
                    "<td>" + item.Seat_No + "</td>" +
                    "<td>" + item.Name + "</td>" +
                    "<td>" + item.Account_No + "</td>" +
                    "<td>" + item.IFSC_Code + "</td>" +
                    "<td>" + item.Status + "</td>" +

                    +"</tr>";

                $('#tbl_IndexNo_Division_Wise tbody').append(rows);
            });
        },
        error: function (ex) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    });
    return false;

});


