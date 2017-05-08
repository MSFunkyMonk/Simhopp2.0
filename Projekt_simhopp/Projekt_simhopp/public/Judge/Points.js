(function ($) {
    console.log("test1");
    $('#test').click(function () {
        alert($('select[name=selector]').val());
        console.log($('select[name=selector]').val());
    });
})(jQuery);