$('#tbl_State_Division_Wise2').hide();
$("#btn_state_div_wise2").click(function () {
    debugger;
    $('#tbl_State_Division_Wise2').show();

    $("#tbl_State_Division_Wise2 tbody tr").remove();
    $.ajax({
        type: 'POST',
        url: '/CommonMethod/Get_State_Report_Division_Wise_All',
        dataType: 'json',
        data:
        {
            exam_year_state2: $("#DDL_state_div2_wise_exam_year").val(),
            division2: $("#DDL_state_div2").val(),
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
                    "<td>" + item.Account_Holder_Name + "</td>" +
                    "<td>" + item.Account_No + "</td>" +
                    "<td>" + item.IFSC_Code + "</td>" +
                    "<td>" + item.Status + "</td>" +

                    +"</tr>";

                $('#tbl_State_Division_Wise2 tbody').append(rows);
            });
        },
        error: function (ex) {
            var r = jQuery.parseJSON(response.responseText);
            alert("Message: " + r.Message);
        }
    });
    return false;

});