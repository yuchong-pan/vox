var vm = new Vue({
    el: "#main",
    data: {
        title: "i-lab Hackathon Brainstorm",
        currentTime: 69
    },
    filters: {
        timeFormat: function(timestamp) {
            var hhmmss = [delta / 3600, delta % 3600 / 60, delta % 60].map(function(value) {
                value = Math.floor(value);
                return value < 10 ? ("0" + value) : value.toString();
            });
            return hhmmss[0] + ":" + hhmmss[1] + ":" + hhmmss[2];
        }
    }
});
