var voxFakeData = {
    "name": 0,
    "keywords": ["Vox","产品特性"],
    "start_time": 5,
    "end_time": 11,
    "parent": "null",
    "children": [
      {
        "name": 1,
        "keywords": ["信息的挖掘","音频文件","逻辑性"],
        "start_time": 11,
        "end_time": 14,
        "parent": 0
      },
      {
        "name": 2,
        "keywords": ["可视化","音频文件"],
        "start_time": 15,
        "end_time": 21,
        "parent": 0
      },
      {
        "name": 3,
        "keywords": ["思维导图","进度条之间","互动"],
        "start_time": 22,
        "end_time": 26,
        "parent": 0,
        "children": [
          {
            "name": 4,
            "keywords": ["技术"],
            "start_time": 27,
            "end_time": 33,
            "parent": 3,
            "children":[
           {
             "name": 5,
             "keywords": ["微软","语音识别","API"],
             "start_time": 34,
             "end_time": 40,
             "parent": 4
           },
           {
            "name": 6,
             "keywords": ["D3.js","思维导图","可视化","自己设计"],
             "start_time": 40,
             "end_time": 48,
             "parent": 4
           }
            ]
          }
        ]
      }
    ]
    }

var treeData = [
  {
    "name": 0,
    "keywords": ["Vox", "voice", "visualization"],
    "start_time": 5,
    "end_time": 11,
    "parent": "null",
    "children": [
      {
        "name": 1,
        "keywords": ["education", "programming", "hello"],
        "start_time": 27,
        "end_time": 35,
        "parent": 0,
        "children": [
          {
            "name": 2,
            "keywords": ["MOOC", "university"],
            "start_time": 36,
            "end_time": 47,
            "parent": 1
          },
          {
            "name": 3,
            "keywords": ["vertical search"],
            "start_time": 50,
            "end_time": 59,
            "parent": 1
          }
        ]
      },
      {
        "name": 4,
        "keywords": ["meeting recording"],
        "start_time": 15,
        "end_time": 21,
        "parent": 0
      }
    ]
  }
];

function fakeInit(treeData, len) {
    genSlider(len);
    genTree(treeData);
    var data = dfsData(treeData);
    data = syncNode(data);
    addKeywords(data);
    var last = null;
    $("#slider").on("slide", function(e) {
        var node = findTime(e.value, data);
        if (last != null) {
            smallNode(last);
        }
        if (node != null) {
            largeNode(node.node_id);
            last = node.node_id;
        } else {
            last = null;
        }
    });
}

var vm = new Vue({
    el: "#main",
    data: {
        recording: false,
        SDK: null,
        recognizer: null,
        text: null,
        startTime: null,
        id: 0
    },
    mounted: function() {
        var _this = this;
        Initialize(function(speechSdk) {
            _this.SDK = speechSdk;
        });
    },
    methods: {
        recordOrStop: function() {
            this.recording = !this.recording;
            if (!this.recording) {
                RecognizerStop(this.SDK, this.recognizer);
                /*
                Vue.http.post("/api/realtime", { id: -1 }).then(function(response) {
                    var data = response.body;
                    fakeInit([resonse.body], Math.floor(Date.now() / 1000));
                });*/
                fakeInit([voxFakeData], 50);
            } else {
                this.setup();
                RecognizerStart(this.SDK, this.recognizer);
            }
        },
        setup: function() {
            this.recognizer = RecognizerSetup(this.SDK, this.SDK.RecognitionMode.Interactive, "zh-CN", this.SDK.SpeechResultFormat["Simple"], "1f6bd0fb94504b799d0a555a45fddf9f");
        }
    }
});

function UpdateStatus(status) {
}

function UpdateRecognizedHypothesis(text) {
    vm.text = text;
    if (vm.startTime == null) {
        vm.startTime = Math.floor(Date.now() / 1000);
    }
    console.log(text);
}

function OnSpeechEndDetected() {
    // send text to server
    Vue.http.post("/api/realtime", {
        id: vm.id,
        start_time: vm.startTime,
        end_time: Math.floor(Date.now() / 1000),
        text: vm.text
    }).then(function(response) {
        console.log(response);
    });
    console.log({
        id: vm.id,
        start_time: vm.startTime,
        end_time: Math.floor(Date.now() / 1000),
        text: vm.text
    });
    vm.startTime = null;
    RecognizerStart(vm.SDK, vm.recognizer);
    vm.id += 1;
}

function UpdateRecognizedPhrase(json) {
}

function onComplete() {
    if (vm.recording) {
        RecognizerStart(vm.SDK, vm.recognizer);
    }
}
