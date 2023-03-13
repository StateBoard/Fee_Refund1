$('#tbl_State_Division_Wise').hide();
$("#btn_state_div_wise").click(function () {
    debugger;
    $('#tbl_State_Division_Wise').show();

    $("#tbl_State_Division_Wise tbody tr").remove();
    $.ajax({
        type: 'POST',
        url: '/CommonMethod/Get_State_Report_Division_Wise',
        dataType: 'json',
        data:
        {
            exam_year_state: $("#DDL_state_div_wise_exam_year").val(),
            division: $("#DDL_state_div").val(),         
        },
        beforeSend: function () {
           // Showloader();
        },
        complete: function () {
           // Hideloader();
        },
        success: function (data) {

            $.each(data, function (i, item) {
                var i = i + 1;
                var rows = "<tr> " +

                    "<td>" + i++ + "</td>" +
                    "<td>" + item.Index_No + "</td>" +
                    "<td>" + item.Total + "</td>" +
                    "<td>" + item.Qualify + "</td>" +
                    "<td>" + item.DisQualify + "</td>" +
                    "<td>" + item.Status + "</td>" +

                    +"</tr>";

                $('#tbl_State_Division_Wise tbody').append(rows);
            });
        },
        error: function (ex) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    });
    return false;

});