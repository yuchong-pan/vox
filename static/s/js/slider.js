function genSlider(len) {
    $("#slider-wrapper").append("<input id='slider' type='text' data-slider-min='0' data-slider-max='" + len + "' data-slider-step='1' data-slider-value='0'>");
    $("#slider").slider({
        formatter: function(value) {
            var hhmmss = [value / 3600, value % 3600 / 60, value % 60].map(function(x) {
                x = Math.floor(x);
                return x < 10 ? ("0" + x) : x.toString();
            });
            return hhmmss[0] + ":" + hhmmss[1] + ":" + hhmmss[2];
        }
    });
    $("#slider").on("slide", function(e) {
        console.log(e.value);
    });
}
