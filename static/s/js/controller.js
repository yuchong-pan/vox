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

function fakeInit() {
    genSlider(60);
    genTree(treeData);
    var data = dfsData(treeData);
    data = syncNode(data);
    addKeywords(data);
    var last = null;
    $("#slider").on("slide", function(e) {
        var node = findTime(e.value, data);
        if (last) {
            smallNode(last);
        }
        if (node) {
            largeNode(node.node_id);
            last = node.node_id;
        } else {
            last = null;
        }
    });
}
