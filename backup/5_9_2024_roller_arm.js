[
    {
        "id": "fab58b8b52b25e08",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 965,
        "y": 485,
        "wires": [
            [
                "485832d591f1b1e4"
            ]
        ]
    },
    {
        "id": "f4d273dc7dd1229b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 530,
        "wires": [
            [
                "f5420d454618fb29"
            ]
        ]
    },
    {
        "id": "cfe061b71433c7bb",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 590,
        "wires": [
            [
                "948da501a87aec5c"
            ]
        ]
    },
    {
        "id": "d4455c13fc252dda",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 650,
        "wires": [
            [
                "023348e04902ebca"
            ]
        ]
    },
    {
        "id": "dd52011f16b28831",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 710,
        "wires": [
            [
                "9b3ab348c8bd1f4e"
            ]
        ]
    },
    {
        "id": "5f0e40710371936f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 775,
        "wires": [
            [
                "46f0dce438d3bfe5"
            ]
        ]
    },
    {
        "id": "485832d591f1b1e4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 470,
        "wires": [
            [
                "7e5dc81e6956ce15"
            ]
        ]
    },
    {
        "id": "f5420d454618fb29",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 530,
        "wires": [
            [
                "7e5dc81e6956ce15"
            ]
        ]
    },
    {
        "id": "948da501a87aec5c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1260,
        "y": 590,
        "wires": [
            [
                "7e5dc81e6956ce15"
            ]
        ]
    },
    {
        "id": "023348e04902ebca",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1260,
        "y": 650,
        "wires": [
            [
                "7e5dc81e6956ce15"
            ]
        ]
    },
    {
        "id": "9b3ab348c8bd1f4e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 710,
        "wires": [
            [
                "7e5dc81e6956ce15"
            ]
        ]
    },
    {
        "id": "46f0dce438d3bfe5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1260,
        "y": 770,
        "wires": [
            [
                "7e5dc81e6956ce15"
            ]
        ]
    },
    {
        "id": "e14ed1106ff3510a",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_mcfault#",
        "payloadType": "str",
        "x": 230,
        "y": 280,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "0cb229e7f579c486",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_mcfault#",
        "payloadType": "str",
        "x": 235,
        "y": 245,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "6fd811249d37ca62",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 185,
        "wires": [
            [
                "fab58b8b52b25e08"
            ]
        ]
    },
    {
        "id": "ced40bbe2e9acf47",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 650,
        "y": 225,
        "wires": [
            [
                "fab58b8b52b25e08"
            ]
        ]
    },
    {
        "id": "863a68a8e2a147e8",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 395,
        "y": 185,
        "wires": [
            [
                "6fd811249d37ca62",
                "ced40bbe2e9acf47",
                "ea13ce1fa6330c12",
                "5b8b37185cfda506",
                "f31d23b41d01dea3",
                "1e9f396a404425a7",
                "e8410f65da8a2409",
                "b046fa4070844bc1",
                "3e856b1ffda57444",
                "056898cc051e7d0c",
                "d3dfe87468c842f2",
                "f7f2bcb99a2e2159"
            ]
        ]
    },
    {
        "id": "1d7ed90a99824b61",
        "type": "serial in",
        "z": "24034456db30f6e3",
        "name": "",
        "serial": "4a3ca22424113665",
        "x": 215,
        "y": 165,
        "wires": [
            [
                "863a68a8e2a147e8",
                "0795a89b44666c66",
                "f679a0131bb256e6",
                "65124970e303492d",
                "21ddf2f9c55c4f05",
                "7f5ff96138fa26b3",
                "28b6f25fc19342d7"
            ]
        ]
    },
    {
        "id": "ea13ce1fa6330c12",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_qualitycheck",
        "func": "var data_condition;\ndata_condition = msg.payload;\nif (data_condition == \"iaa35on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 275,
        "wires": [
            [
                "f4d273dc7dd1229b"
            ]
        ]
    },
    {
        "id": "5b8b37185cfda506",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 310,
        "wires": [
            [
                "f4d273dc7dd1229b"
            ]
        ]
    },
    {
        "id": "f31d23b41d01dea3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 360,
        "wires": [
            [
                "cfe061b71433c7bb"
            ]
        ]
    },
    {
        "id": "1e9f396a404425a7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 395,
        "wires": [
            [
                "cfe061b71433c7bb"
            ]
        ]
    },
    {
        "id": "e8410f65da8a2409",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 480,
        "wires": [
            [
                "d4455c13fc252dda",
                "7163ad13f31dabd6"
            ]
        ]
    },
    {
        "id": "b046fa4070844bc1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 515,
        "wires": [
            [
                "d4455c13fc252dda",
                "e64330b612293484"
            ]
        ]
    },
    {
        "id": "3e856b1ffda57444",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 650,
        "y": 565,
        "wires": [
            [
                "dd52011f16b28831",
                "399aff559d5943c5"
            ]
        ]
    },
    {
        "id": "056898cc051e7d0c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 650,
        "y": 600,
        "wires": [
            [
                "dd52011f16b28831",
                "bca99f1aba05b450"
            ]
        ]
    },
    {
        "id": "d3dfe87468c842f2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35on_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 650,
        "wires": [
            [
                "5f0e40710371936f",
                "309acc5b66431b2c"
            ]
        ]
    },
    {
        "id": "f7f2bcb99a2e2159",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 685,
        "wires": [
            [
                "5f0e40710371936f",
                "2516fade4e963987"
            ]
        ]
    },
    {
        "id": "7e5dc81e6956ce15",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "de33f8dbe22463fe",
        "name": "",
        "x": 1650,
        "y": 610,
        "wires": [
            []
        ]
    },
    {
        "id": "bdfedd214c3d90d7",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_toolchange#",
        "payloadType": "str",
        "x": 235,
        "y": 370,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "a246e9d0c5c7dc27",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_toolchange#",
        "payloadType": "str",
        "x": 240,
        "y": 335,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "adc7ccecc78aae8f",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_qualitycheck#",
        "payloadType": "str",
        "x": 240,
        "y": 460,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "2762efe4b6cb4837",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_qualitycheck#",
        "payloadType": "str",
        "x": 245,
        "y": 425,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "be7c4e332e7bf090",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_arm#",
        "payloadType": "str",
        "x": 230,
        "y": 550,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "7a3537a576eda4c9",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_arm#",
        "payloadType": "str",
        "x": 235,
        "y": 515,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "14b6ab8118228f16",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_roller#",
        "payloadType": "str",
        "x": 225,
        "y": 635,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "46df4b2ef9736b14",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_roller#",
        "payloadType": "str",
        "x": 230,
        "y": 600,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "51dea4c2bdf094ae",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35off_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35off_pin#",
        "payloadType": "str",
        "x": 220,
        "y": 720,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "425fc8794ae884e5",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa35on_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa35on_pin#",
        "payloadType": "str",
        "x": 225,
        "y": 685,
        "wires": [
            [
                "863a68a8e2a147e8"
            ]
        ]
    },
    {
        "id": "0795a89b44666c66",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 75",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 335,
        "y": 65,
        "wires": []
    },
    {
        "id": "f1ade9e2fabf7ead",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 965,
        "y": 1285,
        "wires": [
            [
                "e0ed43436974f626"
            ]
        ]
    },
    {
        "id": "4eaa50e3ec767a84",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 985,
        "y": 1345,
        "wires": [
            [
                "d42bf04aa64ab25a"
            ]
        ]
    },
    {
        "id": "1bc6f7a38f479e86",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 975,
        "y": 1405,
        "wires": [
            [
                "003d2ab20882ab00"
            ]
        ]
    },
    {
        "id": "40d18487f27b545f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 975,
        "y": 1465,
        "wires": [
            [
                "5faea59f6ca137e5"
            ]
        ]
    },
    {
        "id": "f0e0bf4350a29718",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 1535,
        "wires": [
            [
                "4f7c8f921b09f8c3"
            ]
        ]
    },
    {
        "id": "7f011736589e7ef1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 975,
        "y": 1615,
        "wires": [
            [
                "2dbfc781d1d41fa9"
            ]
        ]
    },
    {
        "id": "e0ed43436974f626",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1255,
        "y": 1285,
        "wires": [
            [
                "b1dc2071f867a495"
            ]
        ]
    },
    {
        "id": "d42bf04aa64ab25a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1275,
        "y": 1345,
        "wires": [
            [
                "b1dc2071f867a495"
            ]
        ]
    },
    {
        "id": "003d2ab20882ab00",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1265,
        "y": 1405,
        "wires": [
            [
                "b1dc2071f867a495"
            ]
        ]
    },
    {
        "id": "5faea59f6ca137e5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1265,
        "y": 1465,
        "wires": [
            [
                "b1dc2071f867a495"
            ]
        ]
    },
    {
        "id": "4f7c8f921b09f8c3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1275,
        "y": 1525,
        "wires": [
            [
                "b1dc2071f867a495"
            ]
        ]
    },
    {
        "id": "2dbfc781d1d41fa9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1265,
        "y": 1585,
        "wires": [
            [
                "b1dc2071f867a495"
            ]
        ]
    },
    {
        "id": "f679a0131bb256e6",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 385,
        "y": 950,
        "wires": [
            [
                "722a8481bdc25829",
                "2b8f61dfc07f046e",
                "f38babed3a798b24",
                "3561b8f45af133a7",
                "b526459a812aee10",
                "ca5fc74fa81266bc",
                "9739835d8c0b809f",
                "593bf706bee4e789",
                "de1a72607f6a7c92",
                "bc4232a44c0e7c1d",
                "eff7da4a1ca79d48",
                "4774ae457abe8568"
            ]
        ]
    },
    {
        "id": "b1dc2071f867a495",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "787813855a4f46ed",
        "name": "",
        "x": 1625,
        "y": 1400,
        "wires": [
            []
        ]
    },
    {
        "id": "333f4bc409a1b016",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 3025,
        "wires": [
            [
                "0062ecf900ac1807"
            ]
        ]
    },
    {
        "id": "a371d5b2f4028986",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1045,
        "y": 3085,
        "wires": [
            [
                "5ee96b682a549d67"
            ]
        ]
    },
    {
        "id": "0062ecf900ac1807",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1315,
        "y": 3025,
        "wires": [
            [
                "bee0256d617aa2bb"
            ]
        ]
    },
    {
        "id": "5ee96b682a549d67",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1335,
        "y": 3085,
        "wires": [
            [
                "bee0256d617aa2bb"
            ]
        ]
    },
    {
        "id": "063bf51e1eb78473",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73off_mcfault#",
        "payloadType": "str",
        "x": 220,
        "y": 2990,
        "wires": [
            [
                "7f5ff96138fa26b3"
            ]
        ]
    },
    {
        "id": "e4cb58e841bf2295",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73on_mcfault#",
        "payloadType": "str",
        "x": 225,
        "y": 2955,
        "wires": [
            [
                "7f5ff96138fa26b3"
            ]
        ]
    },
    {
        "id": "61c5162cc30e58dc",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73off_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73off_hoppernopart#",
        "payloadType": "str",
        "x": 235,
        "y": 3080,
        "wires": [
            [
                "7f5ff96138fa26b3"
            ]
        ]
    },
    {
        "id": "c44874434b1dc1b3",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam73on_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam73on_hoppernopart#",
        "payloadType": "str",
        "x": 240,
        "y": 3045,
        "wires": [
            [
                "7f5ff96138fa26b3"
            ]
        ]
    },
    {
        "id": "bee0256d617aa2bb",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "7dcb3745c1f6d11e",
        "name": "",
        "x": 1635,
        "y": 3040,
        "wires": [
            []
        ]
    },
    {
        "id": "254c4afa9e11dcc1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 965,
        "y": 2650,
        "wires": [
            [
                "702af14e65b653d3"
            ]
        ]
    },
    {
        "id": "7d98333da63d5f34",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 2690,
        "wires": [
            [
                "2923735502cb406c"
            ]
        ]
    },
    {
        "id": "702af14e65b653d3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1235,
        "y": 2740,
        "wires": [
            [
                "db0fcd511e4ed4ca"
            ]
        ]
    },
    {
        "id": "2923735502cb406c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1255,
        "y": 2800,
        "wires": [
            [
                "db0fcd511e4ed4ca"
            ]
        ]
    },
    {
        "id": "c1e541ed21727ea9",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72off_mcfault#",
        "payloadType": "str",
        "x": 225,
        "y": 2725,
        "wires": [
            [
                "65124970e303492d"
            ]
        ]
    },
    {
        "id": "78bdefc3a9f31018",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72on_mcfault#",
        "payloadType": "str",
        "x": 230,
        "y": 2690,
        "wires": [
            [
                "65124970e303492d"
            ]
        ]
    },
    {
        "id": "e042e7e24e749af4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 2690,
        "wires": [
            [
                "254c4afa9e11dcc1",
                "a6cdcc370cdcefce"
            ]
        ]
    },
    {
        "id": "5a19c85ce9f6dbc1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 2725,
        "wires": [
            [
                "254c4afa9e11dcc1",
                "39dc4e8699ece289"
            ]
        ]
    },
    {
        "id": "65124970e303492d",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 450,
        "y": 2740,
        "wires": [
            [
                "e042e7e24e749af4",
                "5a19c85ce9f6dbc1",
                "8896e607d38694ee",
                "20a1f0e0f1be8119",
                "fed48d12b553a239"
            ]
        ]
    },
    {
        "id": "8896e607d38694ee",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 2765,
        "wires": [
            [
                "7d98333da63d5f34",
                "08f6cf9b6fb3f173"
            ]
        ]
    },
    {
        "id": "20a1f0e0f1be8119",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 2805,
        "wires": [
            [
                "7d98333da63d5f34",
                "c5f56f8af55e31dc"
            ]
        ]
    },
    {
        "id": "64e46a9206209a46",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72off_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72off_hoppernopart#",
        "payloadType": "str",
        "x": 240,
        "y": 2815,
        "wires": [
            [
                "65124970e303492d"
            ]
        ]
    },
    {
        "id": "a2cbe3a4d3164cbf",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam72on_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam72on_hoppernopart#",
        "payloadType": "str",
        "x": 245,
        "y": 2780,
        "wires": [
            [
                "65124970e303492d"
            ]
        ]
    },
    {
        "id": "db0fcd511e4ed4ca",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "51e6297883dcba65",
        "name": "",
        "x": 1555,
        "y": 2755,
        "wires": [
            []
        ]
    },
    {
        "id": "94310fc4b8b22635",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 2785,
        "y": 960,
        "wires": [
            []
        ]
    },
    {
        "id": "799dabc61c73defc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Build SQL Update",
        "func": "var id = msg.id;\nvar andon = msg.andon;\n\nif(msg.id == \"1\"){\n    msg.topic = `UPDATE table_andon SET andon='${andon}' WHERE id=${id}`;  \n    return msg;\n}\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3085,
        "y": 1470,
        "wires": [
            [
                "9464c703845dfc50"
            ]
        ]
    },
    {
        "id": "c234afae18c6b0ed",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "OR Gate",
        "func": "if ( msg.payload.iaa33_pin == \"1\" || msg.payload.iaa33_roller == \"1\" || msg.payload.iaa33_arm == \"1\" || msg.payload.iaa35_pin == \"1\" || msg.payload.iaa35_roller == \"1\" || msg.payload.iaa35_arm == \"1\" || msg.payload.iam72_hopper == \"1\" || msg.payload.iam73_hopper == \"1\") {\n    msg.payload = '1';\n} else {\n    msg.payload = 'aman!!!';\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2740,
        "y": 1450,
        "wires": [
            [
                "2b8c1721851328bc"
            ]
        ]
    },
    {
        "id": "b5b86c0542606135",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "AND Gate",
        "func": "if (msg.payload.a == '1' && msg.payload.b == '1' && msg.payload.c == '1' && msg.payload.d == '1') {\n    msg.payload = '1';\n} else {\n    msg.payload = 'aman!!!';\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2695,
        "y": 1520,
        "wires": [
            [
                "71bdd6f374238b3e"
            ]
        ]
    },
    {
        "id": "2b8c1721851328bc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ANDON ON",
        "func": "if(msg.payload == \"1\"){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"ON\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2905,
        "y": 1450,
        "wires": [
            [
                "799dabc61c73defc"
            ]
        ]
    },
    {
        "id": "71bdd6f374238b3e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ANDON OFF",
        "func": "if(msg.payload == '1'){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"OFF\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2900,
        "y": 1500,
        "wires": [
            [
                "799dabc61c73defc"
            ]
        ]
    },
    {
        "id": "d4f1726391b21170",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "MANUAL ON",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 2670,
        "y": 1630,
        "wires": [
            [
                "5c0bc44fc4bac7d7"
            ]
        ]
    },
    {
        "id": "5c0bc44fc4bac7d7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "on",
        "func": "msg.payload = \"1\"\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2870,
        "y": 1590,
        "wires": [
            [
                "2b8c1721851328bc"
            ]
        ]
    },
    {
        "id": "a0572e142356ab27",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "off",
        "func": "msg.payload = {\n    \"action\": \"stop\",\n    \"a\" : \"1\",\n    \"b\": \"1\",\n    \"c\" : \"1\",\n    \"d\" : \"1\"\n};\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2870,
        "y": 1665,
        "wires": [
            [
                "b5b86c0542606135"
            ]
        ]
    },
    {
        "id": "7163ad13f31dabd6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_arm_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_arm = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2035,
        "y": 695,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "399aff559d5943c5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}// var andon_iaa33_arm;\n// var andon_iaa33_pin;\n// var andon_iaa33_roller;\n// var andon_iaa35_arm;\n// var andon_iaa35_roller;\n// var andon_iaa35_pin;\n// var andon_iam73_hopper;\n// var andon_iam73_mc_fault;\n// var andon_iam72_hopper;\n// var andon_iam72_mc_fault;\n\n// var andon_iaa36_arm = 2; // Default value\n// var andon_iaa36_roller = 2; // Default value\n// var andon_iaa36_pin = 2; // Default value\n// var andon_iam80_hopper = 2; // Default value\n// var andon_iam80_mc_fault = 2; // Default value\n// var ispbr3_arm = 2; // Default value\n// var ispbr3_mc_fault = 2; // Default value\n\n\n\n// Kondisi untuk iaa33_arm\nif (msg.payload.iaa33_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n// var data = {\n//     iaa33_bearing: andon_iaa33_roller,\n//     iaa33_pin: andon_iaa33_pin,\n//     iaa33_arm: andon_iaa33_arm,\n//     iaa35_bearing: andon_iaa35_roller,\n//     iaa35_pin: andon_iaa35_pin,\n//     iaa35_arm: andon_iaa35_arm,\n//     iaa36_bearing: andon_iaa36_roller,\n//     iaa36_pin: andon_iaa36_pin,\n//     iaa36_arm: andon_iaa36_arm,\n//     iam72_hopper: andon_iam72_hopper,\n//     iam72_mc_fault: andon_iam72_mc_fault,\n//     iam73_hopper: andon_iam73_hopper,\n//     iam73_mc_fault: andon_iam73_mc_fault,\n//     iam80_hopper: andon_iam80_hopper,\n//     iam80_mc_fault: andon_iam80_mc_fault,\n//     ispbr3_arm: ispbr3_arm,\n//     ispbr3_mc_fault: ispbr3_mc_fault\n// };\n\n\n\n\n// var query = `\n//     UPDATE table_condition_andon\n//     SET iaa33_bearing = ${data.iaa33_bearing},\n//         iaa33_pin = ${data.iaa33_pin},\n//         iaa33_arm = ${data.iaa33_arm},\n//         iaa35_bearing = ${data.iaa35_bearing},\n//         iaa35_pin = ${data.iaa35_pin},\n//         iaa35_arm = ${data.iaa35_arm},\n//         iaa36_bearing = ${data.iaa36_bearing},\n//         iaa36_pin = ${data.iaa36_pin},\n//         iaa36_arm = ${data.iaa36_arm},\n//         iam72_hopper = ${data.iam72_hopper},\n//         iam72_mc_fault = ${data.iam72_mc_fault},\n//         iam73_hopper = ${data.iam73_hopper},\n//         iam73_mc_fault = ${data.iam73_mc_fault},\n//         iam80_hopper = ${data.iam80_hopper},\n//         iam80_mc_fault = ${data.iam80_mc_fault},\n//         ispbr3_arm = ${data.ispbr3_arm},\n//         ispbr3_mc_fault = ${data.ispbr3_mc_fault}\n//     WHERE id = 1\n// `;\n\n\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2035,
        "y": 765,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "309acc5b66431b2c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_pin = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2035,
        "y": 835,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "0a9c6399dfd5977f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_arm_on",
        "func": "if(msg.payload.action === \"start\"){\n    msg.payload.iaa33_arm = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1000,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "b4f9241aa5a4e8d7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1070,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "e673eff59c8b3c5f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_pin = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1140,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "f83c065424887696",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam73_hopper = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2505,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "08f6cf9b6fb3f173",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam72_hopper = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2025,
        "y": 2230,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "424dd14c3af0a5e5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "INSERT DATA CORE DASHBOARD",
        "func": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iaa35_arm\nif (msg.payload.iaa35_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_pin\nif (msg.payload.iaa35_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_roller\nif (msg.payload.iaa35_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n// Kondisi untuk iaa33_arm\nif (msg.payload.iaa33_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_pin\nif (msg.payload.iaa33_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_roller\nif (msg.payload.iaa33_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iaa36_arm\nif (msg.payload.iaa36_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa36_pin\nif (msg.payload.iaa36_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa36_roller\nif (msg.payload.iaa36_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iam72_mc_fault\nif (msg.payload.iam72_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam72_hopper\nif (msg.payload.iam72_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n// Kondisi untuk iam73_mc_fault\nif (msg.payload.iam73_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam73_hopper\nif (msg.payload.iam73_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n// Kondisi untuk iam80_mc_fault\nif (msg.payload.iam80_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam80_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam80_hopper\nif (msg.payload.iam80_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam80_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk ispbr3_mc_fault\nif (msg.payload.ispbr3_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.ispbr3_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n// Kondisi untuk ispbr3_hopper_nr\nif (msg.payload.ispbr3_arm_nr == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_arm_nr = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.ispbr3_arm_nr == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_arm_nr = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk ispbr3_hopper_d31e\nif (msg.payload.ispbr3_arm_d31e == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_arm_d31e = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.ispbr3_arm_d31e == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_arm_d31e = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2415,
        "y": 1410,
        "wires": [
            [
                "cf687d6963c733e2",
                "94310fc4b8b22635"
            ]
        ]
    },
    {
        "id": "121580b2e83ef669",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam73_mc_fault = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2435,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "a6cdcc370cdcefce",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam72_mc_fault = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2025,
        "y": 2160,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "c40adc6b8ab8d885",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam73_mc_fault = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2470,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "5c5a74df429a035c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam73_hopper = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2540,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "39dc4e8699ece289",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam72_mc_fault = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2025,
        "y": 2195,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "c5f56f8af55e31dc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam72_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam72_hopper = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2025,
        "y": 2265,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "e64330b612293484",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_arm_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa35_arm = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2035,
        "y": 730,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "71bdd6f374238b3e",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "bca99f1aba05b450",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa35_roller = \"0\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2035,
        "y": 800,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "2516fade4e963987",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa35_pin_off",
        "func": "if (msg.payload.action == \"stop\") {\n    msg.payload.iaa35_pin = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2035,
        "y": 870,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "f9f5f82d736e893a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_arm_off",
        "func": "if(msg.payload.action === \"stop\"){\n    msg.payload.iaa33_arm = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1035,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "06596119a5c6eb0f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa33_roller = \"0\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1105,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "6319101f49d59fff",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33_pin_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa33_pin = \"0\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1175,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "cf687d6963c733e2",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 79",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 2900,
        "y": 1310,
        "wires": []
    },
    {
        "id": "496029c965b4d176",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "MANUAL OFF",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 2670,
        "y": 1675,
        "wires": [
            [
                "a0572e142356ab27"
            ]
        ]
    },
    {
        "id": "55faf0739a9547fc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "OR Gate OFF",
        "func": "if ( msg.payload.iaa33_pin == \"0\" || msg.payload.iaa33_roller == \"0\" || msg.payload.iaa33_arm == \"0\" || msg.payload.iaa35_pin == \"0\" || msg.payload.iaa35_roller == \"0\" || msg.payload.iaa35_arm == \"0\" || msg.payload.iam72_hopper == \"0\" || msg.payload.iam73_hopper == \"0\") {\n    msg.payload = \"1\";\n} else {\n    msg.payload = 'aman!!!';\n}\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2750,
        "y": 1750,
        "wires": [
            [
                "71bdd6f374238b3e"
            ]
        ]
    },
    {
        "id": "9464c703845dfc50",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 3355,
        "y": 1440,
        "wires": [
            []
        ]
    },
    {
        "id": "9739835d8c0b809f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 665,
        "y": 945,
        "wires": [
            [
                "f1ade9e2fabf7ead"
            ]
        ]
    },
    {
        "id": "593bf706bee4e789",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 665,
        "y": 980,
        "wires": [
            [
                "f1ade9e2fabf7ead"
            ]
        ]
    },
    {
        "id": "de1a72607f6a7c92",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 1030,
        "wires": [
            [
                "4eaa50e3ec767a84"
            ]
        ]
    },
    {
        "id": "bc4232a44c0e7c1d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 1065,
        "wires": [
            [
                "4eaa50e3ec767a84"
            ]
        ]
    },
    {
        "id": "eff7da4a1ca79d48",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 1115,
        "wires": [
            [
                "1bc6f7a38f479e86"
            ]
        ]
    },
    {
        "id": "4774ae457abe8568",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 1150,
        "wires": [
            [
                "1bc6f7a38f479e86"
            ]
        ]
    },
    {
        "id": "722a8481bdc25829",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 655,
        "y": 1230,
        "wires": [
            [
                "40d18487f27b545f",
                "0a9c6399dfd5977f"
            ]
        ]
    },
    {
        "id": "2b8f61dfc07f046e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 655,
        "y": 1265,
        "wires": [
            [
                "40d18487f27b545f",
                "f9f5f82d736e893a"
            ]
        ]
    },
    {
        "id": "f38babed3a798b24",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 665,
        "y": 1315,
        "wires": [
            [
                "f0e0bf4350a29718",
                "b4f9241aa5a4e8d7"
            ]
        ]
    },
    {
        "id": "3561b8f45af133a7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 665,
        "y": 1350,
        "wires": [
            [
                "f0e0bf4350a29718",
                "06596119a5c6eb0f"
            ]
        ]
    },
    {
        "id": "b526459a812aee10",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 655,
        "y": 1400,
        "wires": [
            [
                "7f011736589e7ef1",
                "e673eff59c8b3c5f"
            ]
        ]
    },
    {
        "id": "ca5fc74fa81266bc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa33off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 655,
        "y": 1435,
        "wires": [
            [
                "7f011736589e7ef1",
                "6319101f49d59fff"
            ]
        ]
    },
    {
        "id": "97bfb9d04e5525da",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_mcfault#",
        "payloadType": "str",
        "x": 250,
        "y": 1040,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "aea73e5dcfd511a0",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_mcfault#",
        "payloadType": "str",
        "x": 255,
        "y": 1005,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "5fd5f0ba3194716c",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_toolchange#",
        "payloadType": "str",
        "x": 255,
        "y": 1130,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "c112a795459bcc8a",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_toolchange#",
        "payloadType": "str",
        "x": 260,
        "y": 1095,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "39bed68287dd7df6",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_qualitycheck#",
        "payloadType": "str",
        "x": 260,
        "y": 1220,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "0dbaa08718bc35a0",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_qualitycheck#",
        "payloadType": "str",
        "x": 265,
        "y": 1185,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "db3374093a66561d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_arm#",
        "payloadType": "str",
        "x": 250,
        "y": 1310,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "892b173cef84bf4f",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_arm#",
        "payloadType": "str",
        "x": 255,
        "y": 1275,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "5fd7e4760ab10247",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_roller#",
        "payloadType": "str",
        "x": 245,
        "y": 1395,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "7c169e05ae3f5900",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_roller#",
        "payloadType": "str",
        "x": 250,
        "y": 1360,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "6dd8de60d3c2a126",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33off_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33off_pin#",
        "payloadType": "str",
        "x": 240,
        "y": 1480,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "e2f8d6e2f2fbaad3",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa33on_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa33on_pin#",
        "payloadType": "str",
        "x": 245,
        "y": 1445,
        "wires": [
            [
                "f679a0131bb256e6"
            ]
        ]
    },
    {
        "id": "21ddf2f9c55c4f05",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 520,
        "y": 75,
        "wires": [
            [
                "8b72a817ebf077b5",
                "dc7d26ac90b3696d"
            ]
        ]
    },
    {
        "id": "8b72a817ebf077b5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "insert_iaa33",
        "func": "\nvar line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (msg.payload[0] == \"30\") {\n    line_name = 'Roller Arm IAA35'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_montiv_roller_arm_iaa_33 (id, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n};\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 75,
        "wires": [
            [
                "b1dc2071f867a495"
            ]
        ]
    },
    {
        "id": "dc7d26ac90b3696d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "insert_iaa35",
        "func": "\nvar line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (msg.payload[0] == \"31\") {\n    line_name = 'Roller Arm IAA33'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_montiv_roller_arm_iaa_35 (id, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n};\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 115,
        "wires": [
            [
                "7e5dc81e6956ce15"
            ]
        ]
    },
    {
        "id": "d9e73e88fa7ef2bc",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "30,LOKAL,3980,4944,136,293,2,195,NORMAL,0,0,OFF;",
        "payloadType": "str",
        "x": 195,
        "y": 65,
        "wires": [
            [
                "21ddf2f9c55c4f05"
            ]
        ]
    },
    {
        "id": "fed48d12b553a239",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 80",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 605,
        "y": 2630,
        "wires": []
    },
    {
        "id": "22d7fe491b3cdf9c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 925,
        "y": 2085,
        "wires": [
            [
                "dbec900fec48d02d"
            ]
        ]
    },
    {
        "id": "72d33f80ae605d47",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 945,
        "y": 2145,
        "wires": [
            [
                "292e5243e154dcb9"
            ]
        ]
    },
    {
        "id": "735e8329ea052030",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 935,
        "y": 2205,
        "wires": [
            [
                "4a9ff8626de4270e"
            ]
        ]
    },
    {
        "id": "d199e84649c10877",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 935,
        "y": 2265,
        "wires": [
            [
                "bb6c42e87ef67d3e"
            ]
        ]
    },
    {
        "id": "5c9ea8b9f5e18782",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 950,
        "y": 2335,
        "wires": [
            [
                "de456bac2f0289e4"
            ]
        ]
    },
    {
        "id": "f529dceca3d3c11c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 935,
        "y": 2415,
        "wires": [
            [
                "30dd443a367914de"
            ]
        ]
    },
    {
        "id": "dbec900fec48d02d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1215,
        "y": 2085,
        "wires": [
            [
                "4c1491ac59e1375f"
            ]
        ]
    },
    {
        "id": "292e5243e154dcb9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1235,
        "y": 2145,
        "wires": [
            [
                "4c1491ac59e1375f"
            ]
        ]
    },
    {
        "id": "4a9ff8626de4270e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1225,
        "y": 2205,
        "wires": [
            [
                "4c1491ac59e1375f"
            ]
        ]
    },
    {
        "id": "bb6c42e87ef67d3e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1225,
        "y": 2265,
        "wires": [
            [
                "4c1491ac59e1375f"
            ]
        ]
    },
    {
        "id": "de456bac2f0289e4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1235,
        "y": 2325,
        "wires": [
            [
                "4c1491ac59e1375f"
            ]
        ]
    },
    {
        "id": "30dd443a367914de",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1225,
        "y": 2385,
        "wires": [
            [
                "4c1491ac59e1375f"
            ]
        ]
    },
    {
        "id": "27f66ee62930990e",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 345,
        "y": 1750,
        "wires": [
            [
                "6a8e091bc985ca44",
                "9b1e5f530354301f",
                "8432ec886456ecfc",
                "3329a54a75ead109",
                "0518cef7bbb21111",
                "4cfacd01024e4e54",
                "471675dba1e5374e",
                "72449cd5acc115af",
                "8c50a699de96cabe",
                "fdcc63e20d0280f8",
                "eb9812db180723be",
                "780647f0509f0281"
            ]
        ]
    },
    {
        "id": "471675dba1e5374e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 625,
        "y": 1745,
        "wires": [
            [
                "22d7fe491b3cdf9c"
            ]
        ]
    },
    {
        "id": "72449cd5acc115af",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 625,
        "y": 1780,
        "wires": [
            [
                "22d7fe491b3cdf9c"
            ]
        ]
    },
    {
        "id": "8c50a699de96cabe",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 1830,
        "wires": [
            [
                "72d33f80ae605d47"
            ]
        ]
    },
    {
        "id": "fdcc63e20d0280f8",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 1865,
        "wires": [
            [
                "72d33f80ae605d47"
            ]
        ]
    },
    {
        "id": "eb9812db180723be",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 1915,
        "wires": [
            [
                "735e8329ea052030"
            ]
        ]
    },
    {
        "id": "780647f0509f0281",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam36off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iam36off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 1950,
        "wires": [
            [
                "735e8329ea052030"
            ]
        ]
    },
    {
        "id": "6a8e091bc985ca44",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 615,
        "y": 2035,
        "wires": [
            [
                "d199e84649c10877",
                "f4c9a4fa29f308a5"
            ]
        ]
    },
    {
        "id": "9b1e5f530354301f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 615,
        "y": 2070,
        "wires": [
            [
                "d199e84649c10877",
                "cce6715569b07267"
            ]
        ]
    },
    {
        "id": "8432ec886456ecfc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 625,
        "y": 2120,
        "wires": [
            [
                "5c9ea8b9f5e18782",
                "3105047e5a967af9"
            ]
        ]
    },
    {
        "id": "3329a54a75ead109",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 625,
        "y": 2155,
        "wires": [
            [
                "5c9ea8b9f5e18782",
                "de432edd26aa505a"
            ]
        ]
    },
    {
        "id": "0518cef7bbb21111",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 615,
        "y": 2205,
        "wires": [
            [
                "f529dceca3d3c11c",
                "e83a5de15c28c17e"
            ]
        ]
    },
    {
        "id": "4cfacd01024e4e54",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 615,
        "y": 2240,
        "wires": [
            [
                "f529dceca3d3c11c",
                "724acfe029726e8a"
            ]
        ]
    },
    {
        "id": "218bc613c3c6e2ea",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_mcfault#",
        "payloadType": "str",
        "x": 210,
        "y": 1840,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "32a4c74e134889da",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_mcfault#",
        "payloadType": "str",
        "x": 215,
        "y": 1805,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "52b512911bdce6c5",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_toolchange#",
        "payloadType": "str",
        "x": 215,
        "y": 1930,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "293ce44de57c25f7",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_toolchange#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_toolchange#",
        "payloadType": "str",
        "x": 220,
        "y": 1895,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "c4a6f790d5d8068c",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_qualitycheck#",
        "payloadType": "str",
        "x": 220,
        "y": 2020,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "8cfc43d6f639a7fc",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_qualitycheck#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_qualitycheck#",
        "payloadType": "str",
        "x": 225,
        "y": 1985,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "b62c70199e73ca0c",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_arm#",
        "payloadType": "str",
        "x": 210,
        "y": 2110,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "89f732bab5cc1b3d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_arm#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_arm#",
        "payloadType": "str",
        "x": 215,
        "y": 2075,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "cc24ed5a815b1bdd",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_roller#",
        "payloadType": "str",
        "x": 205,
        "y": 2195,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "7cd083bb5e3ecfea",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_roller#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_roller#",
        "payloadType": "str",
        "x": 210,
        "y": 2160,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "cb9cd4ba9406fe0a",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36off_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36off_pin#",
        "payloadType": "str",
        "x": 200,
        "y": 2280,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "b489bbfdab20ea95",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iaa36on_pin#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iaa36on_pin#",
        "payloadType": "str",
        "x": 205,
        "y": 2245,
        "wires": [
            [
                "27f66ee62930990e"
            ]
        ]
    },
    {
        "id": "9947d0892b332974",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1045,
        "y": 3280,
        "wires": [
            [
                "51fe527848a9ef62"
            ]
        ]
    },
    {
        "id": "e975385a52badd78",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 3320,
        "wires": [
            [
                "be1680053ff5b274"
            ]
        ]
    },
    {
        "id": "51fe527848a9ef62",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1360,
        "y": 3275,
        "wires": [
            [
                "f138d864b856b8f9"
            ]
        ]
    },
    {
        "id": "be1680053ff5b274",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1375,
        "y": 3335,
        "wires": [
            [
                "f138d864b856b8f9"
            ]
        ]
    },
    {
        "id": "b902e0831cfb0e53",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80off_mcfault#",
        "payloadType": "str",
        "x": 215,
        "y": 3265,
        "wires": [
            [
                "28b6f25fc19342d7"
            ]
        ]
    },
    {
        "id": "0022da8ea8bd5e6d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80on_mcfault#",
        "payloadType": "str",
        "x": 220,
        "y": 3230,
        "wires": [
            [
                "28b6f25fc19342d7"
            ]
        ]
    },
    {
        "id": "1c235802167885fa",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 675,
        "y": 3245,
        "wires": [
            [
                "9947d0892b332974",
                "ecf3d77998e013e1"
            ]
        ]
    },
    {
        "id": "2520de7460d4ed2c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 675,
        "y": 3280,
        "wires": [
            [
                "9947d0892b332974",
                "b93a2390fd57055a"
            ]
        ]
    },
    {
        "id": "28b6f25fc19342d7",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 470,
        "y": 3290,
        "wires": [
            [
                "1c235802167885fa",
                "2520de7460d4ed2c",
                "e01060bb348c4afe",
                "01d9a1f27bdf631c",
                "e354db6a89bb567f"
            ]
        ]
    },
    {
        "id": "e01060bb348c4afe",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 695,
        "y": 3320,
        "wires": [
            [
                "e975385a52badd78",
                "ae1cd5813d1b7595"
            ]
        ]
    },
    {
        "id": "01d9a1f27bdf631c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 695,
        "y": 3360,
        "wires": [
            [
                "e975385a52badd78",
                "7d19240a5179dd7a"
            ]
        ]
    },
    {
        "id": "453f2612827406d2",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80off_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80off_hoppernopart#",
        "payloadType": "str",
        "x": 230,
        "y": 3355,
        "wires": [
            [
                "28b6f25fc19342d7"
            ]
        ]
    },
    {
        "id": "66480c78d3d67b7d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80on_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80on_hoppernopart#",
        "payloadType": "str",
        "x": 235,
        "y": 3320,
        "wires": [
            [
                "28b6f25fc19342d7"
            ]
        ]
    },
    {
        "id": "e354db6a89bb567f",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 81",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 635,
        "y": 3200,
        "wires": []
    },
    {
        "id": "4c1491ac59e1375f",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "e0d1ece896a27757",
        "name": "",
        "x": 1575,
        "y": 2245,
        "wires": [
            []
        ]
    },
    {
        "id": "7f5ff96138fa26b3",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 450,
        "y": 3010,
        "wires": [
            [
                "d11abf7bdd455314",
                "297fee3c7fed52d9",
                "f2b68e3f72fe3a18",
                "4c303137782d292d",
                "cb7a84bddfd692fd"
            ]
        ]
    },
    {
        "id": "d11abf7bdd455314",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 665,
        "y": 2960,
        "wires": [
            [
                "333f4bc409a1b016",
                "121580b2e83ef669"
            ]
        ]
    },
    {
        "id": "297fee3c7fed52d9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 665,
        "y": 2995,
        "wires": [
            [
                "333f4bc409a1b016",
                "c40adc6b8ab8d885"
            ]
        ]
    },
    {
        "id": "f2b68e3f72fe3a18",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 3035,
        "wires": [
            [
                "a371d5b2f4028986",
                "f83c065424887696"
            ]
        ]
    },
    {
        "id": "4c303137782d292d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam73off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 3075,
        "wires": [
            [
                "a371d5b2f4028986",
                "5c5a74df429a035c"
            ]
        ]
    },
    {
        "id": "cb7a84bddfd692fd",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 82",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 605,
        "y": 2900,
        "wires": []
    },
    {
        "id": "f138d864b856b8f9",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "43721eb0e26c1ab7",
        "name": "",
        "x": 1700,
        "y": 3315,
        "wires": [
            []
        ]
    },
    {
        "id": "f4c9a4fa29f308a5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_arm_on",
        "func": "if(msg.payload.action === \"start\"){\n    msg.payload.iaa36_arm = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1295,
        "wires": [
            [
                "c234afae18c6b0ed",
                "424dd14c3af0a5e5"
            ]
        ]
    },
    {
        "id": "3105047e5a967af9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa36_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1365,
        "wires": [
            [
                "c234afae18c6b0ed",
                "424dd14c3af0a5e5"
            ]
        ]
    },
    {
        "id": "e83a5de15c28c17e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa36_pin = \"1\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1435,
        "wires": [
            [
                "c234afae18c6b0ed",
                "424dd14c3af0a5e5"
            ]
        ]
    },
    {
        "id": "cce6715569b07267",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_arm_off",
        "func": "if(msg.payload.action === \"stop\"){\n    msg.payload.iaa36_arm = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1330,
        "wires": [
            [
                "55faf0739a9547fc",
                "424dd14c3af0a5e5"
            ]
        ]
    },
    {
        "id": "de432edd26aa505a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa36_roller = \"0\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1400,
        "wires": [
            [
                "55faf0739a9547fc",
                "424dd14c3af0a5e5"
            ]
        ]
    },
    {
        "id": "724acfe029726e8a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iaa36_pin_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa36_pin = \"0\";\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2040,
        "y": 1470,
        "wires": [
            [
                "55faf0739a9547fc",
                "424dd14c3af0a5e5"
            ]
        ]
    },
    {
        "id": "ae1cd5813d1b7595",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam80_hopper = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2735,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "ecf3d77998e013e1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam80_mc_fault = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2665,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "c234afae18c6b0ed"
            ]
        ]
    },
    {
        "id": "b93a2390fd57055a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam80_mc_fault = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2700,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "7d19240a5179dd7a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam80_hopper = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2020,
        "y": 2770,
        "wires": [
            [
                "424dd14c3af0a5e5",
                "55faf0739a9547fc"
            ]
        ]
    },
    {
        "id": "88e47c5b235480f5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1040,
        "y": 3790,
        "wires": [
            [
                "6ef6a8149a52c289"
            ]
        ]
    },
    {
        "id": "cdf081b481a32bc2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1045,
        "y": 3875,
        "wires": [
            [
                "ad2b5c89c9a1f1ac"
            ]
        ]
    },
    {
        "id": "6ef6a8149a52c289",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1355,
        "y": 3785,
        "wires": [
            [
                "4b9be62658bb6df9"
            ]
        ]
    },
    {
        "id": "ad2b5c89c9a1f1ac",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1380,
        "y": 3875,
        "wires": [
            [
                "4b9be62658bb6df9"
            ]
        ]
    },
    {
        "id": "cf7be6b583de32f4",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80off_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80off_mcfault#",
        "payloadType": "str",
        "x": 210,
        "y": 3775,
        "wires": [
            [
                "2a67c76e512f3bcf"
            ]
        ]
    },
    {
        "id": "11478840662e54ca",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80on_mcfault#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80on_mcfault#",
        "payloadType": "str",
        "x": 215,
        "y": 3740,
        "wires": [
            [
                "2a67c76e512f3bcf"
            ]
        ]
    },
    {
        "id": "97465c2fe08719f7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 3755,
        "wires": [
            [
                "88e47c5b235480f5"
            ]
        ]
    },
    {
        "id": "c572881c3c688480",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "ispbr3off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 3790,
        "wires": [
            [
                "88e47c5b235480f5"
            ]
        ]
    },
    {
        "id": "2a67c76e512f3bcf",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "*,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 465,
        "y": 3800,
        "wires": [
            [
                "97465c2fe08719f7",
                "c572881c3c688480",
                "cc4775a4fe1a7934",
                "daaacfe67ceee948",
                "b9a7c9e4a7143346"
            ]
        ]
    },
    {
        "id": "cc4775a4fe1a7934",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 3855,
        "wires": [
            [
                "cdf081b481a32bc2"
            ]
        ]
    },
    {
        "id": "daaacfe67ceee948",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "iam80off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 3895,
        "wires": [
            [
                "cdf081b481a32bc2"
            ]
        ]
    },
    {
        "id": "e62294a417c3bc0e",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80off_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80off_hoppernopart#",
        "payloadType": "str",
        "x": 225,
        "y": 3865,
        "wires": [
            [
                "2a67c76e512f3bcf"
            ]
        ]
    },
    {
        "id": "90e3b10d7838cab7",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*iam80on_hoppernopart#",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*iam80on_hoppernopart#",
        "payloadType": "str",
        "x": 230,
        "y": 3830,
        "wires": [
            [
                "2a67c76e512f3bcf"
            ]
        ]
    },
    {
        "id": "b9a7c9e4a7143346",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 83",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 630,
        "y": 3640,
        "wires": []
    },
    {
        "id": "4b9be62658bb6df9",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "5f1d22efbf44c717",
        "name": "",
        "x": 1685,
        "y": 3810,
        "wires": [
            []
        ]
    },
    {
        "id": "4a3ca22424113665",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
        "serialbaud": "9600",
        "databits": "8",
        "parity": "none",
        "stopbits": "1",
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": "10000"
    },
    {
        "id": "de33f8dbe22463fe",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_35",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "787813855a4f46ed",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_33",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "7dcb3745c1f6d11e",
        "type": "MySQLdatabase",
        "name": "database_tps_oee_iam_73",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iam_73",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "51e6297883dcba65",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iam_72",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "90f875a253a55c6f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_roller_arm",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "e0d1ece896a27757",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_36",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "43721eb0e26c1ab7",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iam_80",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5f1d22efbf44c717",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_ispbr3",
        "tz": "",
        "charset": "UTF8"
    }
]
