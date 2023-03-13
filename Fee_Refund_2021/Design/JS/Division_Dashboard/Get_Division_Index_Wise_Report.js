function Get_Div_Index_No(Division_ID, ID) {
    $.ajax({
        type: 'POST',
        url: '/CommonMethod/Get_Div_Index_Nos',
        autoUpload: true,
        dataType: 'json',
        data: {
            Division_ID: Division_ID
        },
        beforeSend: function () {
           // Showloader();
        },
        complete: function () {
           // Hideloader();
        },
        success: function (Accnos) {

            $("#" + ID).append($('<option/>', { Value: 0, text: "--Select Index No--" }));
            $.each(Accnos, function (i, Accno) {
                $("#" + ID).append('<option value="' + Accno.Index_No + '">' + Accno.Index_No + '</option>');
            });
        },
        error: function (e1, e2, e3) {

        }
    });

}