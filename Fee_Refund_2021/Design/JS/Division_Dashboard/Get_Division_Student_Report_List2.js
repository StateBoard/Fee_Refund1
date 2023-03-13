
//$('#tbl_division_record').hide();
//$("#btn_div_show_report").click(function () {
//    debugger;
//    $('#tbl_division_record').show();

//    $("#tbl_division_record tbody tr").remove();
//    $.ajax({
//        type: 'POST',
//        url: '/Division_Dashboard/Get_Division_Student_Report_List2',
//        dataType: 'json',
//        data:
//        {
//            exam_year_div: $("#ExamYear").val(),
//        },
//        success: function (data) {


//            $.each(data, function (i, item) {
//                var i = i + 1;
//                var rows = "<tr> " +

//                    "<td>" + i++ + "</td>" +
//                    "<td>" + item.Index_No + "</td>" +
//                    "<td>" + item.Total + "</td>" +
//                    "<td>" + item.Qualify + "</td>" +
//                    "<td>" + item.DisQualify + "</td>" +
//                    "<td> <input type='checkbox' class='chkbox' id='VerifiedList' name='VerifiedList' /></td>" +

//                    +"</tr>";

//                $('#tbl_division_record tbody').append(rows);
//            });
//        },
//        error: function (ex) {
//            var r = jQuery.parseJSON(response.responseText);
//            alert("Message: " + r.Message);
//        }
//    });
//    return false;

//});
