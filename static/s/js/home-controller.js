var vm = new Vue({
    el: "#main-container",
    data: {
        meetingId: "",
        userId: "",
        role: ""
    },
    methods: {
        join: function(meetingId, userId, role) {
            window.location = "/vox?m=" + meetingId + "&u=" + userId + "&r=" + role;
        }
    }
});
