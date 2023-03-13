
<script>
    $(document).ajaxSend(function (event, xhr, options) {
        $('.spinner').css('display', 'block');

    }).ajaxComplete(function (event, xhr, options) {
        $('.spinner').css('display', 'none');

    }).ajaxError(function (event, jqxhr, settings, exception) {
        $('.spinner').css('display', 'none');
    });

</script>

$(window).on('load', function () {
    $('.spinner').css('display', 'none');
});

