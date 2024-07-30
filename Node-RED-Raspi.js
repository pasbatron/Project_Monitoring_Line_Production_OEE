[
    {
        "id": "2c66d364e20da372",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 420,
        "wires": [
            [
                "52400b9f73abc870"
            ]
        ]
    },
    {
        "id": "513af497eb3cba08",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 915,
        "y": 480,
        "wires": [
            [
                "6ae9074a8b15e781"
            ]
        ]
    },
    {
        "id": "fc0be66fed12a742",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 540,
        "wires": [
            [
                "3d4c4cbfbb0d14fb"
            ]
        ]
    },
    {
        "id": "4616888ee492e119",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 600,
        "wires": [
            [
                "3077a31b1b8f67dc"
            ]
        ]
    },
    {
        "id": "c28cea2ef9793d1b",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 915,
        "y": 660,
        "wires": [
            [
                "9d04de6c8f4384d0"
            ]
        ]
    },
    {
        "id": "353995e18d2865fc",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 725,
        "wires": [
            [
                "856f9bb036398718"
            ]
        ]
    },
    {
        "id": "52400b9f73abc870",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1185,
        "y": 420,
        "wires": [
            [
                "296703c6289bdc33"
            ]
        ]
    },
    {
        "id": "6ae9074a8b15e781",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1205,
        "y": 480,
        "wires": [
            [
                "296703c6289bdc33"
            ]
        ]
    },
    {
        "id": "3d4c4cbfbb0d14fb",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1195,
        "y": 540,
        "wires": [
            [
                "296703c6289bdc33"
            ]
        ]
    },
    {
        "id": "3077a31b1b8f67dc",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1195,
        "y": 600,
        "wires": [
            [
                "296703c6289bdc33"
            ]
        ]
    },
    {
        "id": "9d04de6c8f4384d0",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1205,
        "y": 660,
        "wires": [
            [
                "296703c6289bdc33"
            ]
        ]
    },
    {
        "id": "856f9bb036398718",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1195,
        "y": 720,
        "wires": [
            [
                "296703c6289bdc33"
            ]
        ]
    },
    {
        "id": "e15c43e74cb750ca",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^mc_fault^deactivated^#",
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
        "payload": "~signal^mc_fault^deactivated^#",
        "payloadType": "str",
        "x": 205,
        "y": 230,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "94190e33aa880fb2",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^mc_fault^activated^#",
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
        "payload": "~signal^mc_fault^activated^#",
        "payloadType": "str",
        "x": 200,
        "y": 195,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "0ac403266abd1e5f",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 615,
        "y": 140,
        "wires": [
            [
                "2c66d364e20da372"
            ]
        ]
    },
    {
        "id": "352cf9143fe71089",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 625,
        "y": 175,
        "wires": [
            [
                "2c66d364e20da372"
            ]
        ]
    },
    {
        "id": "970a0c13611d5436",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 310,
        "y": 140,
        "wires": [
            [
                "1bd9f6e3b2f9a9dd"
            ]
        ]
    },
    {
        "id": "1bd9f6e3b2f9a9dd",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 430,
        "y": 140,
        "wires": [
            [
                "0ac403266abd1e5f",
                "352cf9143fe71089",
                "d8e13691cf4df859",
                "1d5c4a7a98ccf6b8",
                "160212b7f0fde164",
                "c0c76fc395d44df1",
                "47dcf32538ea0ba5",
                "51e608451503c354",
                "9340287ae3501fbe",
                "f12c8b28805e45a4",
                "e748876393344823",
                "4fed0c8f13daf8e2"
            ]
        ]
    },
    {
        "id": "d1ab3e9566bcbfab",
        "type": "serial in",
        "z": "8e30d240404d539c",
        "name": "",
        "serial": "ddb39cf2d3da96b2",
        "x": 130,
        "y": 115,
        "wires": [
            [
                "970a0c13611d5436",
                "e56f69c0c3ad27ed",
                "7fb102a3100e4930",
                "2d4fe5eeb97a76c5",
                "0e7cf83011f77920"
            ]
        ]
    },
    {
        "id": "d8e13691cf4df859",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_quality_check_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"quality_check\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 635,
        "y": 225,
        "wires": [
            [
                "513af497eb3cba08"
            ]
        ]
    },
    {
        "id": "1d5c4a7a98ccf6b8",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_quality_check_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"quality_check\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 260,
        "wires": [
            [
                "513af497eb3cba08"
            ]
        ]
    },
    {
        "id": "160212b7f0fde164",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_tool_change_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"tool_change\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 635,
        "y": 310,
        "wires": [
            [
                "fc0be66fed12a742"
            ]
        ]
    },
    {
        "id": "c0c76fc395d44df1",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_tool_change_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"tool_change\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 635,
        "y": 345,
        "wires": [
            [
                "fc0be66fed12a742"
            ]
        ]
    },
    {
        "id": "47dcf32538ea0ba5",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_arm_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 140,
        "wires": [
            [
                "4616888ee492e119",
                "f8d39934efd55636",
                "da6d3127178c99d7"
            ]
        ]
    },
    {
        "id": "51e608451503c354",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_arm_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 175,
        "wires": [
            [
                "4616888ee492e119",
                "5bf645df2ca0d56f",
                "da6d3127178c99d7"
            ]
        ]
    },
    {
        "id": "9340287ae3501fbe",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_roller_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 225,
        "wires": [
            [
                "c28cea2ef9793d1b",
                "81aeef868296952e",
                "61ce3c15f20db348"
            ]
        ]
    },
    {
        "id": "f12c8b28805e45a4",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_roller_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 260,
        "wires": [
            [
                "c28cea2ef9793d1b",
                "5bf645df2ca0d56f",
                "61ce3c15f20db348"
            ]
        ]
    },
    {
        "id": "e748876393344823",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_pin_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 950,
        "y": 310,
        "wires": [
            [
                "353995e18d2865fc",
                "0a9c7670589c2cc0",
                "a4622ac059e002a8"
            ]
        ]
    },
    {
        "id": "4fed0c8f13daf8e2",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_pin_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 345,
        "wires": [
            [
                "353995e18d2865fc",
                "5bf645df2ca0d56f",
                "a4622ac059e002a8"
            ]
        ]
    },
    {
        "id": "296703c6289bdc33",
        "type": "mysql",
        "z": "8e30d240404d539c",
        "mydb": "de33f8dbe22463fe",
        "name": "",
        "x": 1585,
        "y": 560,
        "wires": [
            []
        ]
    },
    {
        "id": "fd52cf51720e0b4c",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^tool_change^deactivated^#",
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
        "payload": "~signal^tool_change^deactivated^#",
        "payloadType": "str",
        "x": 210,
        "y": 320,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "a9eedec56734d05b",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^tool_change^activated^#",
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
        "payload": "~signal^tool_change^activated^#",
        "payloadType": "str",
        "x": 205,
        "y": 285,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "e1434593d4030a72",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^quality_check^deactivated^#",
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
        "payload": "~signal^quality_check^deactivated^#",
        "payloadType": "str",
        "x": 215,
        "y": 410,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "9117f698b61fc650",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^quality_check^activated^#",
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
        "payload": "~signal^quality_check^activated^#",
        "payloadType": "str",
        "x": 220,
        "y": 375,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "a72b70e11229eba2",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^arm_no_part^deactivated^#",
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
        "payload": "~signal^arm_no_part^deactivated^#",
        "payloadType": "str",
        "x": 225,
        "y": 500,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "f31862d74c5ab9cf",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^arm_no_part^activated^#",
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
        "payload": "~signal^arm_no_part^activated^#",
        "payloadType": "str",
        "x": 220,
        "y": 465,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "190436895163b90b",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^roller_no_part^deactivated^#",
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
        "payload": "~signal^roller_no_part^deactivated^#",
        "payloadType": "str",
        "x": 220,
        "y": 585,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "aa6f0e27ad0ab3da",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^roller_no_part^activated^#",
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
        "payload": "~signal^roller_no_part^activated^#",
        "payloadType": "str",
        "x": 225,
        "y": 550,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "73eb70a416c4eb76",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^pin_no_part^deactivated^#",
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
        "payload": "~signal^pin_no_part^deactivated^#",
        "payloadType": "str",
        "x": 225,
        "y": 670,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "4d37ab2a23c38628",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal^pin_no_part^activated^#",
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
        "payload": "~signal^pin_no_part^activated^#",
        "payloadType": "str",
        "x": 220,
        "y": 635,
        "wires": [
            [
                "970a0c13611d5436"
            ]
        ]
    },
    {
        "id": "e56f69c0c3ad27ed",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 75",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 295,
        "y": 65,
        "wires": []
    },
    {
        "id": "fe5a26199c093dd0",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 1180,
        "wires": [
            [
                "3b276e7f66840d3f"
            ]
        ]
    },
    {
        "id": "24149407d76e8825",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 925,
        "y": 1240,
        "wires": [
            [
                "154e1323d6c35346"
            ]
        ]
    },
    {
        "id": "963d1fbe19e3cac9",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 915,
        "y": 1300,
        "wires": [
            [
                "ae5faa0a39191bb7"
            ]
        ]
    },
    {
        "id": "d3254f0c4559e22a",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 915,
        "y": 1360,
        "wires": [
            [
                "655d6a1c696897d7"
            ]
        ]
    },
    {
        "id": "62a8c4d2a72fb1c4",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 1430,
        "wires": [
            [
                "3fa95b92143cfabe"
            ]
        ]
    },
    {
        "id": "fde4a77d01723386",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 915,
        "y": 1510,
        "wires": [
            [
                "43c9962614963fea"
            ]
        ]
    },
    {
        "id": "3b276e7f66840d3f",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1195,
        "y": 1180,
        "wires": [
            [
                "4576e7a7b709d445"
            ]
        ]
    },
    {
        "id": "154e1323d6c35346",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1215,
        "y": 1240,
        "wires": [
            [
                "4576e7a7b709d445"
            ]
        ]
    },
    {
        "id": "ae5faa0a39191bb7",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1205,
        "y": 1300,
        "wires": [
            [
                "4576e7a7b709d445"
            ]
        ]
    },
    {
        "id": "655d6a1c696897d7",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1205,
        "y": 1360,
        "wires": [
            [
                "4576e7a7b709d445"
            ]
        ]
    },
    {
        "id": "3fa95b92143cfabe",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1215,
        "y": 1420,
        "wires": [
            [
                "4576e7a7b709d445"
            ]
        ]
    },
    {
        "id": "43c9962614963fea",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1205,
        "y": 1480,
        "wires": [
            [
                "4576e7a7b709d445"
            ]
        ]
    },
    {
        "id": "43439b983337796b",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^mc_fault^deactivated^#",
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
        "payload": "~signal_iaa33^mc_fault^deactivated^#",
        "payloadType": "str",
        "x": 235,
        "y": 990,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "e654150ecaa6cf8b",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^mc_fault^activated^#",
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
        "payload": "~signal_iaa33^mc_fault^activated^#",
        "payloadType": "str",
        "x": 230,
        "y": 955,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "512ef7a5e8807a9e",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 625,
        "y": 900,
        "wires": [
            [
                "fe5a26199c093dd0"
            ]
        ]
    },
    {
        "id": "2e3c84a1175ee3d6",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 635,
        "y": 935,
        "wires": [
            [
                "fe5a26199c093dd0"
            ]
        ]
    },
    {
        "id": "7fb102a3100e4930",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 320,
        "y": 900,
        "wires": [
            [
                "54a73089170cc535"
            ]
        ]
    },
    {
        "id": "54a73089170cc535",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 440,
        "y": 900,
        "wires": [
            [
                "512ef7a5e8807a9e",
                "2e3c84a1175ee3d6",
                "410ddd3dc478fa46",
                "8dfefeb9a294cdfd",
                "2e94eaccfb9cb004",
                "70dcb54fb4d5ede5",
                "568c4c101ffd2f1f",
                "cf8e211f24792961",
                "e655a1b6a3103228",
                "2e39b0aa65bb1c7a",
                "1c36d978cbcda2c7",
                "522dbf12214a3dfb"
            ]
        ]
    },
    {
        "id": "410ddd3dc478fa46",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_quality_check_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"quality_check\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 985,
        "wires": [
            [
                "24149407d76e8825"
            ]
        ]
    },
    {
        "id": "8dfefeb9a294cdfd",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_quality_check_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"quality_check\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 655,
        "y": 1020,
        "wires": [
            [
                "24149407d76e8825"
            ]
        ]
    },
    {
        "id": "2e94eaccfb9cb004",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_tool_change_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"tool_change\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 645,
        "y": 1070,
        "wires": [
            [
                "963d1fbe19e3cac9"
            ]
        ]
    },
    {
        "id": "70dcb54fb4d5ede5",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_tool_change_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"tool_change\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 1105,
        "wires": [
            [
                "963d1fbe19e3cac9"
            ]
        ]
    },
    {
        "id": "568c4c101ffd2f1f",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_arm_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n    \n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 890,
        "wires": [
            [
                "d3254f0c4559e22a",
                "7e1cd272a8815d42",
                "0c83bb80d8322ce9",
                "e493cdc539676b41"
            ]
        ]
    },
    {
        "id": "cf8e211f24792961",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_arm_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 935,
        "wires": [
            [
                "d3254f0c4559e22a",
                "5bf645df2ca0d56f",
                "e493cdc539676b41"
            ]
        ]
    },
    {
        "id": "e655a1b6a3103228",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_roller_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 985,
        "wires": [
            [
                "62a8c4d2a72fb1c4",
                "ac26836b1e609758",
                "6c738004a6a2ce25"
            ]
        ]
    },
    {
        "id": "2e39b0aa65bb1c7a",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_roller_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 1020,
        "wires": [
            [
                "62a8c4d2a72fb1c4",
                "5bf645df2ca0d56f",
                "6c738004a6a2ce25"
            ]
        ]
    },
    {
        "id": "1c36d978cbcda2c7",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_pin_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 1070,
        "wires": [
            [
                "fde4a77d01723386",
                "21feb873945f398e",
                "7b8dd0a1ddc4149a"
            ]
        ]
    },
    {
        "id": "522dbf12214a3dfb",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_pin_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 1105,
        "wires": [
            [
                "fde4a77d01723386",
                "5bf645df2ca0d56f",
                "7b8dd0a1ddc4149a"
            ]
        ]
    },
    {
        "id": "f93321fdfc37988f",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^tool_change^deactivated^#",
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
        "payload": "~signal_iaa33^tool_change^deactivated^#",
        "payloadType": "str",
        "x": 240,
        "y": 1080,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "f535ae6fa4821908",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^tool_change^activated^#",
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
        "payload": "~signal_iaa33^tool_change^activated^#",
        "payloadType": "str",
        "x": 235,
        "y": 1045,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "83b54e5e2927a2c5",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^quality_check^deactivated^#",
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
        "payload": "~signal_iaa33^quality_check^deactivated^#",
        "payloadType": "str",
        "x": 255,
        "y": 1170,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "309254439ae71d49",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^quality_check^activated^#",
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
        "payload": "~signal_iaa33^quality_check^activated^#",
        "payloadType": "str",
        "x": 250,
        "y": 1135,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "58b6857e7f26b8d2",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^arm_no_part^deactivated^#",
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
        "payload": "~signal_iaa33^arm_no_part^deactivated^#",
        "payloadType": "str",
        "x": 255,
        "y": 1260,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "681886a59ba58f60",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^arm_no_part^activated^#",
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
        "payload": "~signal_iaa33^arm_no_part^activated^#",
        "payloadType": "str",
        "x": 250,
        "y": 1225,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "676ed976b2f54d1c",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^roller_no_part^deactivated^#",
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
        "payload": "~signal_iaa33^roller_no_part^deactivated^#",
        "payloadType": "str",
        "x": 260,
        "y": 1345,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "fa7491315907d09e",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^roller_no_part^activated^#",
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
        "payload": "~signal_iaa33^roller_no_part^activated^#",
        "payloadType": "str",
        "x": 255,
        "y": 1310,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "9e3b8e6e6c110260",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^pin_no_part^deactivated^#",
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
        "payload": "~signal_iaa33^pin_no_part^deactivated^#",
        "payloadType": "str",
        "x": 255,
        "y": 1430,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "cbf62460db934ab0",
        "type": "inject",
        "z": "8e30d240404d539c",
        "name": "~signal_iaa33^pin_no_part^activated^#",
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
        "payload": "~signal_iaa33^pin_no_part^activated^#",
        "payloadType": "str",
        "x": 250,
        "y": 1395,
        "wires": [
            [
                "7fb102a3100e4930"
            ]
        ]
    },
    {
        "id": "4576e7a7b709d445",
        "type": "mysql",
        "z": "8e30d240404d539c",
        "mydb": "7411ac616e5fc7a3",
        "name": "",
        "x": 1565,
        "y": 1295,
        "wires": [
            []
        ]
    },
    {
        "id": "089d96d726d8e094",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 1760,
        "wires": [
            [
                "c4c93cb7d9e84eeb"
            ]
        ]
    },
    {
        "id": "ae2ff416a7449b57",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 1820,
        "wires": [
            [
                "a96d94c3d3531c5b"
            ]
        ]
    },
    {
        "id": "c4c93cb7d9e84eeb",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 1760,
        "wires": [
            [
                "6f1d1786276228d9"
            ]
        ]
    },
    {
        "id": "a96d94c3d3531c5b",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 1820,
        "wires": [
            [
                "6f1d1786276228d9"
            ]
        ]
    },
    {
        "id": "de6c2dc40f93e617",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 240,
        "y": 1815,
        "wires": [
            [
                "2d4fe5eeb97a76c5"
            ]
        ]
    },
    {
        "id": "df02528337611aa4",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 235,
        "y": 1780,
        "wires": [
            [
                "2d4fe5eeb97a76c5"
            ]
        ]
    },
    {
        "id": "46354a577aab0233",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 1725,
        "wires": [
            [
                "089d96d726d8e094"
            ]
        ]
    },
    {
        "id": "d33c1543a3672cba",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 1760,
        "wires": [
            [
                "089d96d726d8e094"
            ]
        ]
    },
    {
        "id": "2d4fe5eeb97a76c5",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 325,
        "y": 1725,
        "wires": [
            [
                "44ff0abc427b382d"
            ]
        ]
    },
    {
        "id": "44ff0abc427b382d",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 445,
        "y": 1725,
        "wires": [
            [
                "46354a577aab0233",
                "d33c1543a3672cba",
                "41e21fd3617da7f8",
                "827811d870a445f1"
            ]
        ]
    },
    {
        "id": "41e21fd3617da7f8",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_hopper_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 1810,
        "wires": [
            [
                "ae2ff416a7449b57",
                "c3e7e344684c3796",
                "45d61ea24817a862"
            ]
        ]
    },
    {
        "id": "827811d870a445f1",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_hopper_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 1845,
        "wires": [
            [
                "ae2ff416a7449b57",
                "5bf645df2ca0d56f",
                "45d61ea24817a862"
            ]
        ]
    },
    {
        "id": "89b5b00e1caa333a",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 255,
        "y": 1905,
        "wires": [
            [
                "2d4fe5eeb97a76c5"
            ]
        ]
    },
    {
        "id": "73def94ee1d46abc",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 260,
        "y": 1870,
        "wires": [
            [
                "2d4fe5eeb97a76c5"
            ]
        ]
    },
    {
        "id": "6f1d1786276228d9",
        "type": "mysql",
        "z": "8e30d240404d539c",
        "mydb": "c3711faee88c2c59",
        "name": "",
        "x": 1590,
        "y": 1775,
        "wires": [
            []
        ]
    },
    {
        "id": "30b27b26be4eb5c6",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 2030,
        "wires": [
            [
                "dc1ea32a60303e3d"
            ]
        ]
    },
    {
        "id": "acb3cc617fe51d69",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 2090,
        "wires": [
            [
                "c035dea7cb64498b"
            ]
        ]
    },
    {
        "id": "dc1ea32a60303e3d",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 2030,
        "wires": [
            [
                "2ec1fb3d8e6ee0b3"
            ]
        ]
    },
    {
        "id": "c035dea7cb64498b",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1290,
        "y": 2090,
        "wires": [
            [
                "2ec1fb3d8e6ee0b3"
            ]
        ]
    },
    {
        "id": "2c31be723b43f5cf",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 240,
        "y": 2085,
        "wires": [
            [
                "0e7cf83011f77920"
            ]
        ]
    },
    {
        "id": "a2c3c914e1794150",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 235,
        "y": 2050,
        "wires": [
            [
                "0e7cf83011f77920"
            ]
        ]
    },
    {
        "id": "0cb0d611f3991be3",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 630,
        "y": 1995,
        "wires": [
            [
                "30b27b26be4eb5c6"
            ]
        ]
    },
    {
        "id": "d77594e96cdaa50e",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 640,
        "y": 2030,
        "wires": [
            [
                "30b27b26be4eb5c6"
            ]
        ]
    },
    {
        "id": "0e7cf83011f77920",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 325,
        "y": 1995,
        "wires": [
            [
                "9e02f49f72301849"
            ]
        ]
    },
    {
        "id": "9e02f49f72301849",
        "type": "string",
        "z": "8e30d240404d539c",
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
        "x": 445,
        "y": 1995,
        "wires": [
            [
                "0cb0d611f3991be3",
                "d77594e96cdaa50e",
                "eb34248bac92083d",
                "a49e8d325579c679"
            ]
        ]
    },
    {
        "id": "eb34248bac92083d",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_hopper_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 2080,
        "wires": [
            [
                "acb3cc617fe51d69",
                "cabddd7bd6de87fc",
                "984f5545efa11d47"
            ]
        ]
    },
    {
        "id": "a49e8d325579c679",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "signal_hopper_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 2115,
        "wires": [
            [
                "acb3cc617fe51d69",
                "5bf645df2ca0d56f",
                "984f5545efa11d47"
            ]
        ]
    },
    {
        "id": "f73ac14dfc8425ad",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 255,
        "y": 2175,
        "wires": [
            [
                "0e7cf83011f77920"
            ]
        ]
    },
    {
        "id": "d368115562b7eeb2",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 260,
        "y": 2140,
        "wires": [
            [
                "0e7cf83011f77920"
            ]
        ]
    },
    {
        "id": "2ec1fb3d8e6ee0b3",
        "type": "mysql",
        "z": "8e30d240404d539c",
        "mydb": "5f365ca3030d2193",
        "name": "",
        "x": 1590,
        "y": 2045,
        "wires": [
            []
        ]
    },
    {
        "id": "a65641852f421a31",
        "type": "mysql",
        "z": "8e30d240404d539c",
        "mydb": "",
        "name": "",
        "x": 3595,
        "y": 1585,
        "wires": [
            []
        ]
    },
    {
        "id": "0e46df351ed6ade8",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Build SQL Update",
        "func": "var id = msg.id;\nvar andon = msg.andon;\n\nif(msg.id == \"1\"){\n    msg.topic = `UPDATE andon_roller_arm SET andon='${andon}' WHERE id=${id}`;  \n    return msg;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3420,
        "y": 1585,
        "wires": [
            [
                "a65641852f421a31"
            ]
        ]
    },
    {
        "id": "4c8114ff75f0d65f",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "OR Gate",
        "func": "if (msg.payload.a == '1' || msg.payload.b == '1'|| msg.payload.c == '1' || msg.payload.d == '1') {\n    msg.payload = '1';\n} else {\n    msg.payload = 'aman!!!';\n}\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3075,
        "y": 1565,
        "wires": [
            [
                "299891c4daa83e50"
            ]
        ]
    },
    {
        "id": "46a11f3ca2f7b0c7",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "AND Gate",
        "func": "if (msg.payload.a == '1' && msg.payload.b == '1' && msg.payload.c == '1' && msg.payload.d == '1') {\n    msg.payload = '1';\n} else {\n    msg.payload = 'aman!!!';\n}\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3070,
        "y": 1615,
        "wires": [
            [
                "828d94ae0f8240ee"
            ]
        ]
    },
    {
        "id": "299891c4daa83e50",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "ANDON ON",
        "func": "if(msg.payload == '1'){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"ON\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3240,
        "y": 1565,
        "wires": [
            [
                "0e46df351ed6ade8"
            ]
        ]
    },
    {
        "id": "828d94ae0f8240ee",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "ANDON OFF",
        "func": "if(msg.payload == '1'){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"OFF\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3235,
        "y": 1615,
        "wires": [
            [
                "0e46df351ed6ade8"
            ]
        ]
    },
    {
        "id": "cdebe7d564dfdaaa",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 2815,
        "y": 1740,
        "wires": [
            [
                "1fd5f3ce1b0ce20d"
            ]
        ]
    },
    {
        "id": "1fd5f3ce1b0ce20d",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "on",
        "func": "msg.payload = {\n    \"action\": \"start\",\n    \"a\" : \"1\"\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2920,
        "y": 1560,
        "wires": [
            [
                "4c8114ff75f0d65f"
            ]
        ]
    },
    {
        "id": "5bf645df2ca0d56f",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "off",
        "func": "msg.payload = {\n    \"action\": \"stop\",\n    \"a\" : \"1\",\n    \"b\": \"1\",\n    \"c\" : \"1\",\n    \"d\" : \"1\"\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2925,
        "y": 1615,
        "wires": [
            [
                "46a11f3ca2f7b0c7"
            ]
        ]
    },
    {
        "id": "8cd62d545a81f795",
        "type": "inject",
        "z": "8e30d240404d539c",
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
        "x": 2815,
        "y": 1785,
        "wires": [
            [
                "5bf645df2ca0d56f"
            ]
        ]
    },
    {
        "id": "f8d39934efd55636",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iaa35_arm",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_arm = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2525,
        "y": 705,
        "wires": [
            [
                "9510df5a22099961"
            ]
        ]
    },
    {
        "id": "81aeef868296952e",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iaa35_roller",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2525,
        "y": 755,
        "wires": [
            [
                "9510df5a22099961"
            ]
        ]
    },
    {
        "id": "0a9c7670589c2cc0",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iaa35_pin",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_pin = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2520,
        "y": 800,
        "wires": [
            [
                "9510df5a22099961"
            ]
        ]
    },
    {
        "id": "7e1cd272a8815d42",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iaa33_arm",
        "func": "if(msg.payload.action === \"start\"){\n    msg.payload.iaa33_arm = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2530,
        "y": 940,
        "wires": [
            [
                "5f22fe04ab2f7f88",
                "23e19b9307076086"
            ]
        ]
    },
    {
        "id": "ac26836b1e609758",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iaa33_roller",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_roller = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2530,
        "y": 990,
        "wires": [
            [
                "5f22fe04ab2f7f88"
            ]
        ]
    },
    {
        "id": "21feb873945f398e",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iaa33_pin",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_pin = \"1\";\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2525,
        "y": 1040,
        "wires": [
            [
                "5f22fe04ab2f7f88"
            ]
        ]
    },
    {
        "id": "c3e7e344684c3796",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iam73_hopper",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam73_hopper = '1';\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2550,
        "y": 1230,
        "wires": [
            [
                "7cdb665c83168251"
            ]
        ]
    },
    {
        "id": "cabddd7bd6de87fc",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "iam72_hopper",
        "func": "if(msg.payload.action == \"1\"){\n    msg.payload.iam72_hopper = \"1\";\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2525,
        "y": 2075,
        "wires": [
            [
                "b1a1cb4b91560830"
            ]
        ]
    },
    {
        "id": "92a0ee84aca6307e",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 76",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 3020,
        "y": 1155,
        "wires": []
    },
    {
        "id": "5f22fe04ab2f7f88",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "IAA33 ON",
        "func": "if (msg.payload.iaa33_arm == '1' || msg.payload.iaa33_roller == '1' || msg.payload.iaa35_pin == '1') {\n    msg.payload.b = '1';\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2880,
        "y": 1315,
        "wires": [
            [
                "4c8114ff75f0d65f"
            ]
        ]
    },
    {
        "id": "9510df5a22099961",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "IAA35 ON",
        "func": "if(msg.payload.iaa35_arm === '1' || msg.payload.iaa35_roller === '1' || msg.payload.iaa35_pin === '1'){\n    msg.payload.a = '1';\n}\nreturn msg;\n\n\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2880,
        "y": 1275,
        "wires": [
            [
                "4c8114ff75f0d65f",
                "92a0ee84aca6307e"
            ]
        ]
    },
    {
        "id": "b1a1cb4b91560830",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "IAM72 ON",
        "func": "if (msg.payload.iam72_hopper == '1') {\n    msg.payload.d = '1';\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2890,
        "y": 1395,
        "wires": [
            [
                "4c8114ff75f0d65f"
            ]
        ]
    },
    {
        "id": "7cdb665c83168251",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "IAM73 ON",
        "func": "if(msg.payload.iam73_hopper == '1'){\n    msg.payload.c = '1';\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2890,
        "y": 1355,
        "wires": [
            [
                "4c8114ff75f0d65f"
            ]
        ]
    },
    {
        "id": "318ee568c6171ec0",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iaa33_arm",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2400,
        "y": 410,
        "wires": [
            [
                "aed3e2f5ad4dc6a3"
            ]
        ]
    },
    {
        "id": "f2a4a68c9004407f",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 2785,
        "y": 410,
        "wires": []
    },
    {
        "id": "aed3e2f5ad4dc6a3",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa33_arm.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 2605,
        "y": 410,
        "wires": [
            [
                "f2a4a68c9004407f"
            ]
        ]
    },
    {
        "id": "23e19b9307076086",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 77",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 2745,
        "y": 860,
        "wires": []
    },
    {
        "id": "0c83bb80d8322ce9",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 78",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1225,
        "y": 840,
        "wires": []
    },
    {
        "id": "f98c8ff574bc8f95",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1820,
        "y": 870,
        "wires": []
    },
    {
        "id": "949b1e4a3a993fad",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa33_arm.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 1615,
        "y": 870,
        "wires": [
            [
                "f98c8ff574bc8f95"
            ]
        ]
    },
    {
        "id": "e493cdc539676b41",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Arm: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n\n\n\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1415,
        "y": 870,
        "wires": [
            [
                "949b1e4a3a993fad"
            ]
        ]
    },
    {
        "id": "6c738004a6a2ce25",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Bearing: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 915,
        "wires": [
            [
                "4e687c2f95dbb867"
            ]
        ]
    },
    {
        "id": "4e687c2f95dbb867",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa33_bearing.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 1630,
        "y": 915,
        "wires": [
            [
                "5d7f708d9ab1f579"
            ]
        ]
    },
    {
        "id": "5d7f708d9ab1f579",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 79",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1825,
        "y": 915,
        "wires": []
    },
    {
        "id": "08b952601f210e90",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iaa33_bearing",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2410,
        "y": 450,
        "wires": [
            [
                "3ece23fd713876af"
            ]
        ]
    },
    {
        "id": "3ece23fd713876af",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa33_bearing.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 2615,
        "y": 450,
        "wires": [
            [
                "899dc0be04a5990f"
            ]
        ]
    },
    {
        "id": "899dc0be04a5990f",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 2785,
        "y": 450,
        "wires": []
    },
    {
        "id": "7b8dd0a1ddc4149a",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Pin: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 960,
        "wires": [
            [
                "34c89675cc3bc947"
            ]
        ]
    },
    {
        "id": "34c89675cc3bc947",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa33_pin.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 1610,
        "y": 960,
        "wires": [
            [
                "88a10b1ebb391756"
            ]
        ]
    },
    {
        "id": "88a10b1ebb391756",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 80",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1825,
        "y": 960,
        "wires": []
    },
    {
        "id": "07703f6d4b188184",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iaa33_pin",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2400,
        "y": 490,
        "wires": [
            [
                "347f2bb5ad6fb242"
            ]
        ]
    },
    {
        "id": "347f2bb5ad6fb242",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa33_pin.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 2595,
        "y": 490,
        "wires": [
            [
                "3fad552b089fcd88"
            ]
        ]
    },
    {
        "id": "3fad552b089fcd88",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 2785,
        "y": 490,
        "wires": []
    },
    {
        "id": "d426daab2571c004",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 81",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1825,
        "y": 155,
        "wires": []
    },
    {
        "id": "4d023919936aa5f1",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa35_arm.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 1620,
        "y": 155,
        "wires": [
            [
                "d426daab2571c004"
            ]
        ]
    },
    {
        "id": "da6d3127178c99d7",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Arm: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n\n\n\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 155,
        "wires": [
            [
                "4d023919936aa5f1"
            ]
        ]
    },
    {
        "id": "61ce3c15f20db348",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Bearing: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1425,
        "y": 200,
        "wires": [
            [
                "6420eddede27f411"
            ]
        ]
    },
    {
        "id": "6420eddede27f411",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa35_bearing.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 1635,
        "y": 200,
        "wires": [
            [
                "8b76ad0122df5ee2"
            ]
        ]
    },
    {
        "id": "8b76ad0122df5ee2",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 82",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1830,
        "y": 200,
        "wires": []
    },
    {
        "id": "a4622ac059e002a8",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Pin: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1425,
        "y": 245,
        "wires": [
            [
                "33ef531e50e77070"
            ]
        ]
    },
    {
        "id": "33ef531e50e77070",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa35_pin.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 1615,
        "y": 245,
        "wires": [
            [
                "cac6aadd64199cfe"
            ]
        ]
    },
    {
        "id": "cac6aadd64199cfe",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 83",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1830,
        "y": 245,
        "wires": []
    },
    {
        "id": "92b9f06161134b31",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iaa35_arm",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2400,
        "y": 270,
        "wires": [
            [
                "373f28f4428b3e3c"
            ]
        ]
    },
    {
        "id": "792e750f0de8aaf9",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 2785,
        "y": 270,
        "wires": []
    },
    {
        "id": "373f28f4428b3e3c",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa35_arm.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 2605,
        "y": 270,
        "wires": [
            [
                "792e750f0de8aaf9"
            ]
        ]
    },
    {
        "id": "334877c7cc67ef5b",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iaa35_bearing",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2410,
        "y": 310,
        "wires": [
            [
                "2a48f3a27baa56e3"
            ]
        ]
    },
    {
        "id": "2a48f3a27baa56e3",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa35_bearing.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 2615,
        "y": 310,
        "wires": [
            [
                "25a9c3bfeb692939"
            ]
        ]
    },
    {
        "id": "25a9c3bfeb692939",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 2785,
        "y": 310,
        "wires": []
    },
    {
        "id": "868b6efedf455f65",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iaa35_pin",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2400,
        "y": 350,
        "wires": [
            [
                "8dbb171769aa8c8b"
            ]
        ]
    },
    {
        "id": "8dbb171769aa8c8b",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iaa35_pin.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 2595,
        "y": 350,
        "wires": [
            [
                "69b1d6c1431dad26"
            ]
        ]
    },
    {
        "id": "69b1d6c1431dad26",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 2785,
        "y": 350,
        "wires": []
    },
    {
        "id": "a093637ab69e326d",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 84",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 2270,
        "y": 1875,
        "wires": []
    },
    {
        "id": "cdafb99bdb2f5343",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iam73_hopper.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 2075,
        "y": 1875,
        "wires": [
            [
                "a093637ab69e326d"
            ]
        ]
    },
    {
        "id": "45d61ea24817a862",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Hopper: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n\n\n\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1865,
        "y": 1875,
        "wires": [
            [
                "cdafb99bdb2f5343"
            ]
        ]
    },
    {
        "id": "984f5545efa11d47",
        "type": "function",
        "z": "8e30d240404d539c",
        "name": "Generate Payload",
        "func": "if (msg.payload.action === 'start') {\n    msg.payload = {\n        Supply_Hopper: 1,\n        key2: \"\"\n    };\n    return msg;\n}if(msg.payload.action === 'stop'){\n        msg.payload = {\n        _: 0,\n        key2: \"\"\n    };\n    return msg;\n}\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1870,
        "y": 1920,
        "wires": [
            [
                "f6c6adae229e16ce"
            ]
        ]
    },
    {
        "id": "f6c6adae229e16ce",
        "type": "file",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iam72_hopper.txt",
        "filenameType": "str",
        "appendNewline": false,
        "createDir": false,
        "overwriteFile": "true",
        "encoding": "none",
        "x": 2080,
        "y": 1920,
        "wires": [
            [
                "ec9e89179e8d05f1"
            ]
        ]
    },
    {
        "id": "ec9e89179e8d05f1",
        "type": "debug",
        "z": "8e30d240404d539c",
        "name": "debug 85",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 2275,
        "y": 1920,
        "wires": []
    },
    {
        "id": "29bfb496c18011b1",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iam_72_hopper",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2990,
        "y": 415,
        "wires": [
            [
                "d69fe3aa6738a88a"
            ]
        ]
    },
    {
        "id": "eccb49e36c1e3204",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 3380,
        "y": 415,
        "wires": []
    },
    {
        "id": "d69fe3aa6738a88a",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iam72_hopper.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 3210,
        "y": 415,
        "wires": [
            [
                "eccb49e36c1e3204"
            ]
        ]
    },
    {
        "id": "bda7aaa881bdee5c",
        "type": "http in",
        "z": "8e30d240404d539c",
        "name": "",
        "url": "/iam_73_hopper",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 2990,
        "y": 455,
        "wires": [
            [
                "eba63c35d59dc645"
            ]
        ]
    },
    {
        "id": "eba63c35d59dc645",
        "type": "file in",
        "z": "8e30d240404d539c",
        "name": "",
        "filename": "iam73_hopper.txt",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 3210,
        "y": 455,
        "wires": [
            [
                "42b3f4975957ac11"
            ]
        ]
    },
    {
        "id": "42b3f4975957ac11",
        "type": "http response",
        "z": "8e30d240404d539c",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 3380,
        "y": 455,
        "wires": []
    },
    {
        "id": "ddb39cf2d3da96b2",
        "type": "serial-port",
        "serialport": "COM4",
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
        "port": "3307",
        "db": "database_tps_energy",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "7411ac616e5fc7a3",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3307",
        "db": "database_tps_oee_iaa_33",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "c3711faee88c2c59",
        "type": "MySQLdatabase",
        "name": "database_tps_oee_iam_73",
        "host": "127.0.0.1",
        "port": "3307",
        "db": "database_tps_oee_iam_73",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5f365ca3030d2193",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3307",
        "db": "database_tps_oee_iam_72",
        "tz": "",
        "charset": "UTF8"
    }
]
