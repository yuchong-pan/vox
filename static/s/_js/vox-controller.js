var vm = new Vue({
    el: "#main",
    data: {
        title: "i-lab Hackathon Brainstorm",
        currentTime: 69
    },
    filters: {
        timeFormat: function(timestamp) {
            var hhmmss = [timestamp / 3600, timestamp % 3600 / 60, timestamp % 60].map(function(value) {
                value = Math.floor(value);
                return value < 10 ? ("0" + value) : value.toString();
            });
            return hhmmss[0] + ":" + hhmmss[1] + ":" + hhmmss[2];
        }
    }
});
