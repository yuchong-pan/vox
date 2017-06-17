function dfsData(data) {
    var ans = {};
    for (var i = 0; i < data.length; i++) {
        ans[data[i].name] = {
            "keywords": data[i].keywords,
            "start_time": data[i].start_time,
            "end_time": data[i].end_time
        };
        if (data[i].children) {
            dfsData(data[i].children);
        }
    }

    return ans;
}

function syncNode(ans) {
    var all = $(".node text.node-name");
    for (var i = 0; i < data.length; i++) {
        ans[all.eq(i).text()].node_id = i;
    }
    return ans;
}

function findTime(t, data) {
    for (var i in data) {
        if (t >= data[i].start_time && t <= data[i].end_time) {
            return data[i];
        }
    }
    return null;
}
