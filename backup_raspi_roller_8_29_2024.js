[
    {
        "id": "d1862eb96aec6389",
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
        "x": 835,
        "y": 475,
        "wires": [
            [
                "d17ed6dd384b256f"
            ]
        ]
    },
    {
        "id": "3c2e4e41d898776d",
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
        "x": 850,
        "y": 520,
        "wires": [
            [
                "f71a4ec1104e64dd"
            ]
        ]
    },
    {
        "id": "0ba0d26f94daa417",
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
        "x": 840,
        "y": 580,
        "wires": [
            [
                "064b3569f7b5c9fa"
            ]
        ]
    },
    {
        "id": "c3b307f85840323b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 640,
        "wires": [
            [
                "2425d3f72f71d5c7"
            ]
        ]
    },
    {
        "id": "5be0e94247229d96",
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
        "x": 850,
        "y": 700,
        "wires": [
            [
                "391615484f92f9f3"
            ]
        ]
    },
    {
        "id": "8ee5d74cb30a70f5",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 765,
        "wires": [
            [
                "9d89ce17952d7b2d"
            ]
        ]
    },
    {
        "id": "d17ed6dd384b256f",
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
        "x": 1120,
        "y": 460,
        "wires": [
            [
                "c86e339ca93e3c59"
            ]
        ]
    },
    {
        "id": "f71a4ec1104e64dd",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 520,
        "wires": [
            [
                "c86e339ca93e3c59"
            ]
        ]
    },
    {
        "id": "064b3569f7b5c9fa",
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
        "x": 1130,
        "y": 580,
        "wires": [
            [
                "c86e339ca93e3c59"
            ]
        ]
    },
    {
        "id": "2425d3f72f71d5c7",
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
        "x": 1130,
        "y": 640,
        "wires": [
            [
                "c86e339ca93e3c59"
            ]
        ]
    },
    {
        "id": "391615484f92f9f3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1140,
        "y": 700,
        "wires": [
            [
                "c86e339ca93e3c59"
            ]
        ]
    },
    {
        "id": "9d89ce17952d7b2d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1130,
        "y": 760,
        "wires": [
            [
                "c86e339ca93e3c59"
            ]
        ]
    },
    {
        "id": "68f7724189e3d4b8",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35off_mcfault#",
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
        "payload": "*signal35off_mcfault#",
        "payloadType": "str",
        "x": 110,
        "y": 270,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "04d4f6930c4343d7",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35on_mcfault#",
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
        "payload": "*signal35on_mcfault#",
        "payloadType": "str",
        "x": 115,
        "y": 235,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "88492ff6e8f497f9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 525,
        "y": 175,
        "wires": [
            [
                "d1862eb96aec6389"
            ]
        ]
    },
    {
        "id": "67487e1a0bbf3226",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 215,
        "wires": [
            [
                "d1862eb96aec6389"
            ]
        ]
    },
    {
        "id": "a9192bd13e41a061",
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
        "x": 265,
        "y": 175,
        "wires": [
            [
                "88492ff6e8f497f9",
                "67487e1a0bbf3226",
                "fc3be531dab42a7c",
                "0f8bd9e4778899ff",
                "a6fd12081adcf7c9",
                "e00afc6d4c59af7c",
                "018d477041b4ba1d",
                "c2621fc3edde1c50",
                "dae32b5fd08c9a67",
                "4acdeec27519722d",
                "761551d6d4192456",
                "302e4bf75eb7b35b"
            ]
        ]
    },
    {
        "id": "3cf65274648a6453",
        "type": "serial in",
        "z": "24034456db30f6e3",
        "name": "",
        "serial": "4a3ca22424113665",
        "x": 85,
        "y": 155,
        "wires": [
            [
                "a9192bd13e41a061",
                "289df22ab1b1092f",
                "0ee32e4254b4d8f7",
                "5f78713a636b761f",
                "e754409c54171aee",
                "6769c8fb7f82b12f"
            ]
        ]
    },
    {
        "id": "fc3be531dab42a7c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35on_qualitycheck",
        "func": "var data_condition;\n\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 265,
        "wires": [
            [
                "3c2e4e41d898776d"
            ]
        ]
    },
    {
        "id": "0f8bd9e4778899ff",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 300,
        "wires": [
            [
                "3c2e4e41d898776d"
            ]
        ]
    },
    {
        "id": "a6fd12081adcf7c9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35on_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 350,
        "wires": [
            [
                "0ba0d26f94daa417"
            ]
        ]
    },
    {
        "id": "e00afc6d4c59af7c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 385,
        "wires": [
            [
                "0ba0d26f94daa417"
            ]
        ]
    },
    {
        "id": "018d477041b4ba1d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 845,
        "y": 180,
        "wires": [
            [
                "c3b307f85840323b",
                "339cc27adc93f041"
            ]
        ]
    },
    {
        "id": "c2621fc3edde1c50",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 845,
        "y": 215,
        "wires": [
            [
                "c3b307f85840323b",
                "087ff3ad5623e184"
            ]
        ]
    },
    {
        "id": "dae32b5fd08c9a67",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35on_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 855,
        "y": 265,
        "wires": [
            [
                "5be0e94247229d96",
                "a1bd08d9ea0b0346"
            ]
        ]
    },
    {
        "id": "4acdeec27519722d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 855,
        "y": 300,
        "wires": [
            [
                "5be0e94247229d96",
                "c1a8bc18aba0411d"
            ]
        ]
    },
    {
        "id": "761551d6d4192456",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35on_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 845,
        "y": 350,
        "wires": [
            [
                "8ee5d74cb30a70f5",
                "0f546e489a3e4154"
            ]
        ]
    },
    {
        "id": "302e4bf75eb7b35b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal35off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 845,
        "y": 385,
        "wires": [
            [
                "8ee5d74cb30a70f5",
                "6a599a7b7abf678b"
            ]
        ]
    },
    {
        "id": "c86e339ca93e3c59",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "de33f8dbe22463fe",
        "name": "",
        "x": 1520,
        "y": 600,
        "wires": [
            []
        ]
    },
    {
        "id": "f2920c86feb26bb5",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35off_toolchange#",
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
        "payload": "*signal35off_toolchange#",
        "payloadType": "str",
        "x": 115,
        "y": 360,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "53861b0d8bf69161",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35on_toolchange#",
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
        "payload": "*signal35on_toolchange#",
        "payloadType": "str",
        "x": 120,
        "y": 325,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "1cd16046d4b60105",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35off_qualitycheck#",
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
        "payload": "*signal35off_qualitycheck#",
        "payloadType": "str",
        "x": 120,
        "y": 450,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "69746b7d31c01fac",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35on_qualitycheck#",
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
        "payload": "*signal35on_qualitycheck#",
        "payloadType": "str",
        "x": 125,
        "y": 415,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "cb68accdfa91a24c",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35off_arm#",
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
        "payload": "*signal35off_arm#",
        "payloadType": "str",
        "x": 110,
        "y": 540,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "23e06d685edcca39",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35on_arm#",
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
        "payload": "*signal35on_arm#",
        "payloadType": "str",
        "x": 115,
        "y": 505,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "06595a2b1aa2219c",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35off_roller#",
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
        "payload": "*signal35off_roller#",
        "payloadType": "str",
        "x": 105,
        "y": 625,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "ab3fac725fdf7609",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35on_roller#",
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
        "payload": "*signal35on_roller#",
        "payloadType": "str",
        "x": 110,
        "y": 590,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "ec46e5d712d4a792",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35off_pin#",
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
        "payload": "*signal35off_pin#",
        "payloadType": "str",
        "x": 100,
        "y": 710,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "62acc7fc87ea1b77",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal35on_pin#",
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
        "payload": "*signal35on_pin#",
        "payloadType": "str",
        "x": 105,
        "y": 675,
        "wires": [
            [
                "a9192bd13e41a061"
            ]
        ]
    },
    {
        "id": "289df22ab1b1092f",
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
        "x": 205,
        "y": 55,
        "wires": []
    },
    {
        "id": "7649b4f1fc39763d",
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
        "x": 835,
        "y": 1275,
        "wires": [
            [
                "0223433351217ca6"
            ]
        ]
    },
    {
        "id": "787b3589215a6573",
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
        "x": 855,
        "y": 1335,
        "wires": [
            [
                "af5814365b7797e4"
            ]
        ]
    },
    {
        "id": "50a7536bc5a776ec",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 845,
        "y": 1395,
        "wires": [
            [
                "e2bf0d3c8d09e8e4"
            ]
        ]
    },
    {
        "id": "7ab80bfd1f52213a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 845,
        "y": 1455,
        "wires": [
            [
                "b662eba6bfc01d78"
            ]
        ]
    },
    {
        "id": "932bf1e699e2ad27",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 1525,
        "wires": [
            [
                "9f31e426f1788884"
            ]
        ]
    },
    {
        "id": "ab70ddde511184ca",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 845,
        "y": 1605,
        "wires": [
            [
                "c65a91edcb4bb0a2"
            ]
        ]
    },
    {
        "id": "0223433351217ca6",
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
        "x": 1125,
        "y": 1275,
        "wires": [
            [
                "cc1ee1a76e2a68bf"
            ]
        ]
    },
    {
        "id": "af5814365b7797e4",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1145,
        "y": 1335,
        "wires": [
            [
                "cc1ee1a76e2a68bf"
            ]
        ]
    },
    {
        "id": "e2bf0d3c8d09e8e4",
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
        "x": 1135,
        "y": 1395,
        "wires": [
            [
                "cc1ee1a76e2a68bf"
            ]
        ]
    },
    {
        "id": "b662eba6bfc01d78",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1135,
        "y": 1455,
        "wires": [
            [
                "cc1ee1a76e2a68bf"
            ]
        ]
    },
    {
        "id": "9f31e426f1788884",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1145,
        "y": 1515,
        "wires": [
            [
                "cc1ee1a76e2a68bf"
            ]
        ]
    },
    {
        "id": "c65a91edcb4bb0a2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1135,
        "y": 1575,
        "wires": [
            [
                "cc1ee1a76e2a68bf"
            ]
        ]
    },
    {
        "id": "0ee32e4254b4d8f7",
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
        "x": 255,
        "y": 940,
        "wires": [
            [
                "f3fdb0a723ef0dc6",
                "899bf685c8644cc6",
                "cf15edbf05ea8b18",
                "bfe8f65b57628208",
                "413c57e4a2d412c9",
                "12db3a56080d8f7c",
                "fe7bb05a495f4179",
                "128699b1dfee8afe",
                "515f8a8032501d70",
                "cebe539109055626",
                "9a4630c1f478a96c",
                "93516953ee6483b2"
            ]
        ]
    },
    {
        "id": "cc1ee1a76e2a68bf",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "787813855a4f46ed",
        "name": "",
        "x": 1495,
        "y": 1390,
        "wires": [
            []
        ]
    },
    {
        "id": "be3655d843b0746b",
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
        "x": 1000,
        "y": 2335,
        "wires": [
            [
                "a514d608a61c847d"
            ]
        ]
    },
    {
        "id": "935f9db05c7a13cd",
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
        "x": 1020,
        "y": 2395,
        "wires": [
            [
                "dbd5cf2145d46256"
            ]
        ]
    },
    {
        "id": "a514d608a61c847d",
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
        "x": 1290,
        "y": 2335,
        "wires": [
            [
                "4d2bdcd6d7233aff"
            ]
        ]
    },
    {
        "id": "dbd5cf2145d46256",
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
        "x": 1310,
        "y": 2395,
        "wires": [
            [
                "4d2bdcd6d7233aff"
            ]
        ]
    },
    {
        "id": "dafb2d8bd723c2b5",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam73^mc_fault^deactivated^#",
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
        "payload": "~signal_iam73^mc_fault^deactivated^#",
        "payloadType": "str",
        "x": 175,
        "y": 1855,
        "wires": [
            [
                "5f78713a636b761f"
            ]
        ]
    },
    {
        "id": "0acd20bf381c230d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam73^mc_fault^activated^#",
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
        "payload": "~signal_iam73^mc_fault^activated^#",
        "payloadType": "str",
        "x": 170,
        "y": 1820,
        "wires": [
            [
                "5f78713a636b761f"
            ]
        ]
    },
    {
        "id": "5e99745d98add64a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 650,
        "y": 2300,
        "wires": [
            [
                "be3655d843b0746b",
                "b1a2d4c650085009"
            ]
        ]
    },
    {
        "id": "0d0af7b65935fe56",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 2335,
        "wires": [
            [
                "be3655d843b0746b",
                "96e872bc025f7be3"
            ]
        ]
    },
    {
        "id": "5f78713a636b761f",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "~,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "~"
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
        "x": 260,
        "y": 1765,
        "wires": [
            [
                "d769f794543be252"
            ]
        ]
    },
    {
        "id": "d769f794543be252",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "^,20",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 380,
        "y": 1765,
        "wires": [
            [
                "5e99745d98add64a",
                "0d0af7b65935fe56",
                "660a09a022ac9836",
                "667860801c3610b8"
            ]
        ]
    },
    {
        "id": "660a09a022ac9836",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_hopper_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 2440,
        "wires": [
            [
                "935f9db05c7a13cd",
                "afc2595722a10452"
            ]
        ]
    },
    {
        "id": "667860801c3610b8",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_hopper_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 2475,
        "wires": [
            [
                "935f9db05c7a13cd",
                "f067a13bf88ccd4d"
            ]
        ]
    },
    {
        "id": "509cc871e480268d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam73^hopper_no_part^deactivated^#",
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
        "payload": "~signal_iam73^hopper_no_part^deactivated^#",
        "payloadType": "str",
        "x": 190,
        "y": 1945,
        "wires": [
            [
                "5f78713a636b761f"
            ]
        ]
    },
    {
        "id": "4a8ae80a01efa1d4",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam73^hopper_no_part^activated^#",
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
        "payload": "~signal_iam73^hopper_no_part^activated^#",
        "payloadType": "str",
        "x": 195,
        "y": 1910,
        "wires": [
            [
                "5f78713a636b761f"
            ]
        ]
    },
    {
        "id": "4d2bdcd6d7233aff",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "7dcb3745c1f6d11e",
        "name": "",
        "x": 1610,
        "y": 2350,
        "wires": [
            []
        ]
    },
    {
        "id": "c9f486b610e29834",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 2605,
        "wires": [
            [
                "5ed917e3baa83789"
            ]
        ]
    },
    {
        "id": "741ff6bad770e91c",
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
        "x": 1020,
        "y": 2665,
        "wires": [
            [
                "b57044da315e31f2"
            ]
        ]
    },
    {
        "id": "5ed917e3baa83789",
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
        "x": 1290,
        "y": 2605,
        "wires": [
            [
                "1202eb22830ab8e4"
            ]
        ]
    },
    {
        "id": "b57044da315e31f2",
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
        "x": 1310,
        "y": 2665,
        "wires": [
            [
                "1202eb22830ab8e4"
            ]
        ]
    },
    {
        "id": "646192a2db190955",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam72^mc_fault^deactivated^#",
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
        "payload": "~signal_iam72^mc_fault^deactivated^#",
        "payloadType": "str",
        "x": 175,
        "y": 2125,
        "wires": [
            [
                "e754409c54171aee"
            ]
        ]
    },
    {
        "id": "46d3f47f15a62efe",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam72^mc_fault^activated^#",
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
        "payload": "~signal_iam72^mc_fault^activated^#",
        "payloadType": "str",
        "x": 170,
        "y": 2090,
        "wires": [
            [
                "e754409c54171aee"
            ]
        ]
    },
    {
        "id": "cae4e9475c6def1a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 650,
        "y": 2570,
        "wires": [
            [
                "c9f486b610e29834",
                "aa01ab1bba6db197"
            ]
        ]
    },
    {
        "id": "0e00cad672f20849",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 2605,
        "wires": [
            [
                "c9f486b610e29834",
                "52e1839c0e0f03d1"
            ]
        ]
    },
    {
        "id": "e754409c54171aee",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "~,#",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "~"
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
        "x": 260,
        "y": 2035,
        "wires": [
            [
                "6750c216b1f77d69"
            ]
        ]
    },
    {
        "id": "6750c216b1f77d69",
        "type": "string",
        "z": "24034456db30f6e3",
        "name": "^,20",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 380,
        "y": 2035,
        "wires": [
            [
                "cae4e9475c6def1a",
                "0e00cad672f20849",
                "4b8f2dec16cd471a",
                "994a5b2a3d26393f"
            ]
        ]
    },
    {
        "id": "4b8f2dec16cd471a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_hopper_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 2775,
        "wires": [
            [
                "741ff6bad770e91c",
                "c95d34ceb836267f"
            ]
        ]
    },
    {
        "id": "994a5b2a3d26393f",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_hopper_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 2815,
        "wires": [
            [
                "741ff6bad770e91c",
                "c220dc7c63bdfc31"
            ]
        ]
    },
    {
        "id": "7f3610fca69964d7",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam72^hopper_no_part^deactivated^#",
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
        "payload": "~signal_iam72^hopper_no_part^deactivated^#",
        "payloadType": "str",
        "x": 190,
        "y": 2215,
        "wires": [
            [
                "e754409c54171aee"
            ]
        ]
    },
    {
        "id": "852022f5ab64b8e2",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "~signal_iam72^hopper_no_part^activated^#",
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
        "payload": "~signal_iam72^hopper_no_part^activated^#",
        "payloadType": "str",
        "x": 195,
        "y": 2180,
        "wires": [
            [
                "e754409c54171aee"
            ]
        ]
    },
    {
        "id": "1202eb22830ab8e4",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "51e6297883dcba65",
        "name": "",
        "x": 1610,
        "y": 2620,
        "wires": [
            []
        ]
    },
    {
        "id": "033e63d7e388bb9d",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 2685,
        "y": 935,
        "wires": [
            []
        ]
    },
    {
        "id": "8825b421fb17788a",
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
        "x": 2955,
        "y": 1460,
        "wires": [
            [
                "281eaaf240fc32a5"
            ]
        ]
    },
    {
        "id": "66604812214f895e",
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
        "x": 2610,
        "y": 1440,
        "wires": [
            [
                "0b4146d68420616d"
            ]
        ]
    },
    {
        "id": "9dcebcb8ca457130",
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
        "x": 2565,
        "y": 1510,
        "wires": [
            [
                "3a065b4adce8e210"
            ]
        ]
    },
    {
        "id": "0b4146d68420616d",
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
        "x": 2775,
        "y": 1440,
        "wires": [
            [
                "8825b421fb17788a"
            ]
        ]
    },
    {
        "id": "3a065b4adce8e210",
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
        "x": 2770,
        "y": 1490,
        "wires": [
            [
                "8825b421fb17788a"
            ]
        ]
    },
    {
        "id": "fbfe46d2ec1e4fc9",
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
        "x": 2540,
        "y": 1620,
        "wires": [
            [
                "797f6abcd4f900e7"
            ]
        ]
    },
    {
        "id": "797f6abcd4f900e7",
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
        "x": 2740,
        "y": 1580,
        "wires": [
            [
                "0b4146d68420616d"
            ]
        ]
    },
    {
        "id": "b65124b3346ebede",
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
        "x": 2740,
        "y": 1655,
        "wires": [
            [
                "9dcebcb8ca457130"
            ]
        ]
    },
    {
        "id": "339cc27adc93f041",
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
        "x": 1905,
        "y": 685,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "a1bd08d9ea0b0346",
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
        "x": 1905,
        "y": 755,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "0f546e489a3e4154",
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
        "x": 1905,
        "y": 825,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "574ba0d29b305be9",
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
        "x": 1910,
        "y": 990,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "6a9d4af55145dec2",
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
        "x": 1910,
        "y": 1060,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "18d66f2936a6f6dc",
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
        "x": 1910,
        "y": 1130,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "afc2595722a10452",
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
        "x": 1895,
        "y": 2025,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "c95d34ceb836267f",
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
        "x": 1895,
        "y": 2220,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "a9a1ac70f4c14712",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Generate Random Data",
        "func": "\n\n\n\n// Kondisi untuk iaa33_arm\nif (msg.payload.iaa33_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_pin\nif (msg.payload.iaa33_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_roller\nif (msg.payload.iaa33_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iaa35_arm\nif (msg.payload.iaa35_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_pin\nif (msg.payload.iaa35_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_roller\nif (msg.payload.iaa35_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iam73_mc_fault\nif (msg.payload.iam73_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam73_hopper\nif (msg.payload.iam73_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n// Kondisi untuk iam72_mc_fault\nif (msg.payload.iam72_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam72_hopper\nif (msg.payload.iam72_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2245,
        "y": 1400,
        "wires": [
            [
                "e1380640503c2dc1",
                "033e63d7e388bb9d"
            ]
        ]
    },
    {
        "id": "b1a2d4c650085009",
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
        "x": 1895,
        "y": 1955,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "aa01ab1bba6db197",
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
        "x": 1895,
        "y": 2150,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "66604812214f895e"
            ]
        ]
    },
    {
        "id": "96e872bc025f7be3",
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
        "x": 1895,
        "y": 1990,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "f067a13bf88ccd4d",
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
        "x": 1895,
        "y": 2060,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "52e1839c0e0f03d1",
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
        "x": 1895,
        "y": 2185,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "c220dc7c63bdfc31",
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
        "x": 1895,
        "y": 2255,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "087ff3ad5623e184",
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
        "x": 1905,
        "y": 720,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "3a065b4adce8e210",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "c1a8bc18aba0411d",
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
        "x": 1905,
        "y": 790,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "6a599a7b7abf678b",
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
        "x": 1905,
        "y": 860,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "0ab02f9b918aec5a",
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
        "x": 1910,
        "y": 1025,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "00d844c8e26573e2",
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
        "x": 1910,
        "y": 1095,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "36f079b7a79f9d01",
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
        "x": 1910,
        "y": 1165,
        "wires": [
            [
                "a9a1ac70f4c14712",
                "504546d3b46785ed"
            ]
        ]
    },
    {
        "id": "e1380640503c2dc1",
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
        "x": 2770,
        "y": 1300,
        "wires": []
    },
    {
        "id": "80c6a465578ba72b",
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
        "x": 2540,
        "y": 1665,
        "wires": [
            [
                "b65124b3346ebede"
            ]
        ]
    },
    {
        "id": "504546d3b46785ed",
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
        "x": 2620,
        "y": 1740,
        "wires": [
            [
                "3a065b4adce8e210"
            ]
        ]
    },
    {
        "id": "281eaaf240fc32a5",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 3225,
        "y": 1430,
        "wires": [
            []
        ]
    },
    {
        "id": "fe7bb05a495f4179",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 545,
        "y": 935,
        "wires": [
            [
                "7649b4f1fc39763d"
            ]
        ]
    },
    {
        "id": "128699b1dfee8afe",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 545,
        "y": 970,
        "wires": [
            [
                "7649b4f1fc39763d"
            ]
        ]
    },
    {
        "id": "515f8a8032501d70",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 565,
        "y": 1020,
        "wires": [
            [
                "787b3589215a6573"
            ]
        ]
    },
    {
        "id": "cebe539109055626",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 565,
        "y": 1055,
        "wires": [
            [
                "787b3589215a6573"
            ]
        ]
    },
    {
        "id": "9a4630c1f478a96c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 565,
        "y": 1105,
        "wires": [
            [
                "50a7536bc5a776ec"
            ]
        ]
    },
    {
        "id": "93516953ee6483b2",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 565,
        "y": 1140,
        "wires": [
            [
                "50a7536bc5a776ec"
            ]
        ]
    },
    {
        "id": "f3fdb0a723ef0dc6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 935,
        "wires": [
            [
                "7ab80bfd1f52213a",
                "574ba0d29b305be9"
            ]
        ]
    },
    {
        "id": "899bf685c8644cc6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 970,
        "wires": [
            [
                "7ab80bfd1f52213a",
                "0ab02f9b918aec5a"
            ]
        ]
    },
    {
        "id": "cf15edbf05ea8b18",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1020,
        "wires": [
            [
                "932bf1e699e2ad27",
                "6a9d4af55145dec2"
            ]
        ]
    },
    {
        "id": "bfe8f65b57628208",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1055,
        "wires": [
            [
                "932bf1e699e2ad27",
                "00d844c8e26573e2"
            ]
        ]
    },
    {
        "id": "413c57e4a2d412c9",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 1105,
        "wires": [
            [
                "ab70ddde511184ca",
                "18d66f2936a6f6dc"
            ]
        ]
    },
    {
        "id": "12db3a56080d8f7c",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal33off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 1140,
        "wires": [
            [
                "ab70ddde511184ca",
                "36f079b7a79f9d01"
            ]
        ]
    },
    {
        "id": "330b0a8b4d0aad67",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33off_mcfault#",
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
        "payload": "*signal33off_mcfault#",
        "payloadType": "str",
        "x": 130,
        "y": 1030,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "b61b44116790c108",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33on_mcfault#",
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
        "payload": "*signal33on_mcfault#",
        "payloadType": "str",
        "x": 135,
        "y": 995,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "f7619f1afaa3f462",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33off_toolchange#",
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
        "payload": "*signal33off_toolchange#",
        "payloadType": "str",
        "x": 135,
        "y": 1120,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "5a09f9e8d3daa1a0",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33on_toolchange#",
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
        "payload": "*signal33on_toolchange#",
        "payloadType": "str",
        "x": 140,
        "y": 1085,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "e045419f36e9f88d",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33off_qualitycheck#",
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
        "payload": "*signal33off_qualitycheck#",
        "payloadType": "str",
        "x": 140,
        "y": 1210,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "408ef399a8fde090",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33on_qualitycheck#",
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
        "payload": "*signal33on_qualitycheck#",
        "payloadType": "str",
        "x": 145,
        "y": 1175,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "00ecb4fd1386f308",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33off_arm#",
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
        "payload": "*signal33off_arm#",
        "payloadType": "str",
        "x": 130,
        "y": 1300,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "112dd6839c872c35",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33on_arm#",
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
        "payload": "*signal33on_arm#",
        "payloadType": "str",
        "x": 135,
        "y": 1265,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "88103e4fc23533cf",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33off_roller#",
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
        "payload": "*signal33off_roller#",
        "payloadType": "str",
        "x": 125,
        "y": 1385,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "d19e92e2e7563c33",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33on_roller#",
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
        "payload": "*signal33on_roller#",
        "payloadType": "str",
        "x": 130,
        "y": 1350,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "dc81ecf94a7e4b57",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33off_pin#",
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
        "payload": "*signal33off_pin#",
        "payloadType": "str",
        "x": 120,
        "y": 1470,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "44c6a77bb54e99fd",
        "type": "inject",
        "z": "24034456db30f6e3",
        "name": "*signal33on_pin#",
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
        "payload": "*signal33on_pin#",
        "payloadType": "str",
        "x": 125,
        "y": 1435,
        "wires": [
            [
                "0ee32e4254b4d8f7"
            ]
        ]
    },
    {
        "id": "6769c8fb7f82b12f",
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
        "x": 390,
        "y": 65,
        "wires": [
            [
                "5e636e343b78b213",
                "2391ac4702737120"
            ]
        ]
    },
    {
        "id": "5e636e343b78b213",
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
        "x": 530,
        "y": 65,
        "wires": [
            [
                "cc1ee1a76e2a68bf"
            ]
        ]
    },
    {
        "id": "2391ac4702737120",
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
        "x": 530,
        "y": 105,
        "wires": [
            [
                "c86e339ca93e3c59"
            ]
        ]
    },
    {
        "id": "0abda23fa66dcba1",
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
        "x": 335,
        "y": 280,
        "wires": [
            [
                "6769c8fb7f82b12f"
            ]
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
    }
]
