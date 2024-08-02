[
    {
        "id": "9d38e8986ae1c85e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 855,
        "y": 405,
        "wires": [
            [
                "d4f046e54867ab5e"
            ]
        ]
    },
    {
        "id": "942fc5dab40550af",
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
        "x": 875,
        "y": 465,
        "wires": [
            [
                "49857a2888c71862"
            ]
        ]
    },
    {
        "id": "62b8fde44c9c70c3",
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
        "x": 865,
        "y": 525,
        "wires": [
            [
                "2d48e55c6fc190ae"
            ]
        ]
    },
    {
        "id": "8b8f91896ec14c8e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 865,
        "y": 585,
        "wires": [
            [
                "bca7c0ebeb47b6d1"
            ]
        ]
    },
    {
        "id": "28f176017d3d0fb7",
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
        "x": 875,
        "y": 645,
        "wires": [
            [
                "a6118e43064416fa"
            ]
        ]
    },
    {
        "id": "cb6d1f639b6adda7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 865,
        "y": 710,
        "wires": [
            [
                "0e3e11cec0205334"
            ]
        ]
    },
    {
        "id": "d4f046e54867ab5e",
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
        "x": 1145,
        "y": 405,
        "wires": [
            [
                "683a7d2d8a35f8cf"
            ]
        ]
    },
    {
        "id": "49857a2888c71862",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 465,
        "wires": [
            [
                "683a7d2d8a35f8cf"
            ]
        ]
    },
    {
        "id": "2d48e55c6fc190ae",
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
        "x": 1155,
        "y": 525,
        "wires": [
            [
                "683a7d2d8a35f8cf"
            ]
        ]
    },
    {
        "id": "bca7c0ebeb47b6d1",
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
        "x": 1155,
        "y": 585,
        "wires": [
            [
                "683a7d2d8a35f8cf"
            ]
        ]
    },
    {
        "id": "a6118e43064416fa",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 645,
        "wires": [
            [
                "683a7d2d8a35f8cf"
            ]
        ]
    },
    {
        "id": "0e3e11cec0205334",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1155,
        "y": 705,
        "wires": [
            [
                "683a7d2d8a35f8cf"
            ]
        ]
    },
    {
        "id": "90c72dddea660168",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 165,
        "y": 215,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "ccdbf3d28ccc3769",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 160,
        "y": 180,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "9a00819138de8d88",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 575,
        "y": 125,
        "wires": [
            [
                "9d38e8986ae1c85e"
            ]
        ]
    },
    {
        "id": "50cfabcbca9f6dd3",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 585,
        "y": 160,
        "wires": [
            [
                "9d38e8986ae1c85e"
            ]
        ]
    },
    {
        "id": "f43d23ecd00afeef",
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
        "x": 270,
        "y": 125,
        "wires": [
            [
                "da2963a132e22f83"
            ]
        ]
    },
    {
        "id": "da2963a132e22f83",
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
        "x": 390,
        "y": 125,
        "wires": [
            [
                "9a00819138de8d88",
                "50cfabcbca9f6dd3",
                "f4c295032c78d9ca",
                "b031c93aadd7be1b",
                "aae517ddf0699ea1",
                "70e2e552edac749a",
                "e912e8d34499d96e",
                "3ccfa28ce3bd848d",
                "3d806dc3d493800b",
                "a5e08d02fd84992e",
                "127db5a2922894ba",
                "9ad1422186dd0385"
            ]
        ]
    },
    {
        "id": "6788897951071148",
        "type": "serial in",
        "z": "24034456db30f6e3",
        "name": "",
        "serial": "4a3ca22424113665",
        "x": 110,
        "y": 100,
        "wires": [
            [
                "f43d23ecd00afeef",
                "a16ebab4fb2232b2",
                "8a7907fac214eecc",
                "e90a8f5943f6d794",
                "aa07161354d07f3a"
            ]
        ]
    },
    {
        "id": "f4c295032c78d9ca",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_quality_check_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"quality_check\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 595,
        "y": 210,
        "wires": [
            [
                "942fc5dab40550af"
            ]
        ]
    },
    {
        "id": "b031c93aadd7be1b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_quality_check_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"quality_check\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 605,
        "y": 245,
        "wires": [
            [
                "942fc5dab40550af"
            ]
        ]
    },
    {
        "id": "aae517ddf0699ea1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_tool_change_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"tool_change\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 595,
        "y": 295,
        "wires": [
            [
                "62b8fde44c9c70c3"
            ]
        ]
    },
    {
        "id": "70e2e552edac749a",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_tool_change_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"tool_change\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 595,
        "y": 330,
        "wires": [
            [
                "62b8fde44c9c70c3"
            ]
        ]
    },
    {
        "id": "e912e8d34499d96e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_arm_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 125,
        "wires": [
            [
                "8b8f91896ec14c8e",
                "a7a362ae7f885b9c"
            ]
        ]
    },
    {
        "id": "3ccfa28ce3bd848d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_arm_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 160,
        "wires": [
            [
                "8b8f91896ec14c8e",
                "ba2681166e357ee5"
            ]
        ]
    },
    {
        "id": "3d806dc3d493800b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_roller_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 210,
        "wires": [
            [
                "28f176017d3d0fb7",
                "4f771e6f8fd2757a"
            ]
        ]
    },
    {
        "id": "a5e08d02fd84992e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_roller_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 245,
        "wires": [
            [
                "28f176017d3d0fb7",
                "ab8e9987473d1ce7"
            ]
        ]
    },
    {
        "id": "127db5a2922894ba",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_pin_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 295,
        "wires": [
            [
                "cb6d1f639b6adda7",
                "6f61cf9ed16fbbc5"
            ]
        ]
    },
    {
        "id": "9ad1422186dd0385",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_pin_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 330,
        "wires": [
            [
                "cb6d1f639b6adda7",
                "c16f3456b1c705c8"
            ]
        ]
    },
    {
        "id": "683a7d2d8a35f8cf",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "de33f8dbe22463fe",
        "name": "",
        "x": 1545,
        "y": 545,
        "wires": [
            []
        ]
    },
    {
        "id": "0f81a6d627b88e9a",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 170,
        "y": 305,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "c6ed26bef10c0073",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 165,
        "y": 270,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "623f41db0d7911b7",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 175,
        "y": 395,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "a04e0d0126c8a867",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 180,
        "y": 360,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "31fd7a6e119e26ba",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 185,
        "y": 485,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "db3ca2df3c7594ca",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 180,
        "y": 450,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "3493c1d50752f61d",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 180,
        "y": 570,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "65719858c54e3132",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 185,
        "y": 535,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "e6fa5776ec19628f",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 185,
        "y": 655,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "30c3541656731b5f",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 180,
        "y": 620,
        "wires": [
            [
                "f43d23ecd00afeef"
            ]
        ]
    },
    {
        "id": "a16ebab4fb2232b2",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 75",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 255,
        "y": 50,
        "wires": []
    },
    {
        "id": "09970978e104a35b",
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
        "x": 865,
        "y": 1165,
        "wires": [
            [
                "732a0d8a860ce302"
            ]
        ]
    },
    {
        "id": "b7c87f3376464003",
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
        "x": 885,
        "y": 1225,
        "wires": [
            [
                "ecc5192dc3808f41"
            ]
        ]
    },
    {
        "id": "38a35b54f2c6f05b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 875,
        "y": 1285,
        "wires": [
            [
                "3b74290729fc295b"
            ]
        ]
    },
    {
        "id": "74b2249790080345",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 875,
        "y": 1345,
        "wires": [
            [
                "14b9c779cefa092e"
            ]
        ]
    },
    {
        "id": "34fe5013fd8593ad",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 890,
        "y": 1415,
        "wires": [
            [
                "a80806e713592710"
            ]
        ]
    },
    {
        "id": "3cdd3bae7230b43d",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 875,
        "y": 1495,
        "wires": [
            [
                "205fb0e8c69ce3ef"
            ]
        ]
    },
    {
        "id": "732a0d8a860ce302",
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
        "x": 1155,
        "y": 1165,
        "wires": [
            [
                "c774cdafafebfc4f"
            ]
        ]
    },
    {
        "id": "ecc5192dc3808f41",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1175,
        "y": 1225,
        "wires": [
            [
                "c774cdafafebfc4f"
            ]
        ]
    },
    {
        "id": "3b74290729fc295b",
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
        "x": 1165,
        "y": 1285,
        "wires": [
            [
                "c774cdafafebfc4f"
            ]
        ]
    },
    {
        "id": "14b9c779cefa092e",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 1345,
        "wires": [
            [
                "c774cdafafebfc4f"
            ]
        ]
    },
    {
        "id": "a80806e713592710",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1175,
        "y": 1405,
        "wires": [
            [
                "c774cdafafebfc4f"
            ]
        ]
    },
    {
        "id": "205fb0e8c69ce3ef",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 1465,
        "wires": [
            [
                "c774cdafafebfc4f"
            ]
        ]
    },
    {
        "id": "d45d169af9a56bd0",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 195,
        "y": 975,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "348312b3f40ddfa6",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 190,
        "y": 940,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "115d089b3c7258e1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 585,
        "y": 885,
        "wires": [
            [
                "09970978e104a35b"
            ]
        ]
    },
    {
        "id": "0bfa55d90c4511a7",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 595,
        "y": 920,
        "wires": [
            [
                "09970978e104a35b"
            ]
        ]
    },
    {
        "id": "8a7907fac214eecc",
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
        "x": 280,
        "y": 885,
        "wires": [
            [
                "0f28437d7f749d3a"
            ]
        ]
    },
    {
        "id": "0f28437d7f749d3a",
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
        "x": 400,
        "y": 885,
        "wires": [
            [
                "115d089b3c7258e1",
                "0bfa55d90c4511a7",
                "74d91d1ec79176ba",
                "9f91c8e2efbd8134",
                "3b244196ccb8c5d1",
                "f2311416809c8dbe",
                "fce01f6a2045d35b",
                "41389db5a4d958c6",
                "ff407a472211e2a1",
                "63a7b50a6ba01be1",
                "102b68c62fb79eaa",
                "db0a3f3102669abc"
            ]
        ]
    },
    {
        "id": "74d91d1ec79176ba",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_quality_check_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"quality_check\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 605,
        "y": 970,
        "wires": [
            [
                "b7c87f3376464003"
            ]
        ]
    },
    {
        "id": "9f91c8e2efbd8134",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_quality_check_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"quality_check\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 615,
        "y": 1005,
        "wires": [
            [
                "b7c87f3376464003"
            ]
        ]
    },
    {
        "id": "3b244196ccb8c5d1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_tool_change_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"tool_change\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 605,
        "y": 1055,
        "wires": [
            [
                "38a35b54f2c6f05b"
            ]
        ]
    },
    {
        "id": "f2311416809c8dbe",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_tool_change_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"tool_change\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 1090,
        "wires": [
            [
                "38a35b54f2c6f05b"
            ]
        ]
    },
    {
        "id": "fce01f6a2045d35b",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_arm_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n    \n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 875,
        "wires": [
            [
                "74b2249790080345",
                "1b5ead07cef895b7",
                "7b2e29f3b1cbffae"
            ]
        ]
    },
    {
        "id": "41389db5a4d958c6",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_arm_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"arm_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 920,
        "wires": [
            [
                "74b2249790080345",
                "362ee770344d7fae"
            ]
        ]
    },
    {
        "id": "ff407a472211e2a1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_roller_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 970,
        "wires": [
            [
                "34fe5013fd8593ad",
                "741d0cb9cc77baed"
            ]
        ]
    },
    {
        "id": "63a7b50a6ba01be1",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_roller_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"roller_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 1005,
        "wires": [
            [
                "34fe5013fd8593ad",
                "d2fbf90b6b5fddff"
            ]
        ]
    },
    {
        "id": "102b68c62fb79eaa",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_pin_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 1055,
        "wires": [
            [
                "3cdd3bae7230b43d",
                "8746fe3011deedec"
            ]
        ]
    },
    {
        "id": "db0a3f3102669abc",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "signal_pin_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iaa33\"){\n    if (data_signal == \"pin_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 1090,
        "wires": [
            [
                "3cdd3bae7230b43d",
                "e38184c2c17a80f3"
            ]
        ]
    },
    {
        "id": "a044ce83ea7841cc",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 200,
        "y": 1065,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "475801df825bf4d9",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 195,
        "y": 1030,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "6cbd8947a9defdb6",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 215,
        "y": 1155,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "0e0928283c2ff53a",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 210,
        "y": 1120,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "5a99a037ded946e7",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 215,
        "y": 1245,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "2949e4eb5e5e7fad",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 210,
        "y": 1210,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "3f22b3b133ebce0f",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 220,
        "y": 1330,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "8a722eaf499a7516",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 215,
        "y": 1295,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "ea734d0493c587de",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 215,
        "y": 1415,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "79003551a47ae5a0",
        "type": "inject",
        "z": "24034456db30f6e3",
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
        "x": 210,
        "y": 1380,
        "wires": [
            [
                "8a7907fac214eecc"
            ]
        ]
    },
    {
        "id": "c774cdafafebfc4f",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "787813855a4f46ed",
        "name": "",
        "x": 1525,
        "y": 1280,
        "wires": [
            []
        ]
    },
    {
        "id": "84f5189a930cea3a",
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
        "x": 940,
        "y": 1745,
        "wires": [
            [
                "a17c911a9429b237"
            ]
        ]
    },
    {
        "id": "c9d165b4cb762590",
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
        "x": 960,
        "y": 1805,
        "wires": [
            [
                "a2436b26626b1b50"
            ]
        ]
    },
    {
        "id": "a17c911a9429b237",
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
        "x": 1230,
        "y": 1745,
        "wires": [
            [
                "24219557b9dddad7"
            ]
        ]
    },
    {
        "id": "a2436b26626b1b50",
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
        "x": 1250,
        "y": 1805,
        "wires": [
            [
                "24219557b9dddad7"
            ]
        ]
    },
    {
        "id": "35800a7c571c907e",
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
        "x": 200,
        "y": 1800,
        "wires": [
            [
                "e90a8f5943f6d794"
            ]
        ]
    },
    {
        "id": "8501508e922b44f2",
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
        "x": 195,
        "y": 1765,
        "wires": [
            [
                "e90a8f5943f6d794"
            ]
        ]
    },
    {
        "id": "64672681bdf1c99f",
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
        "x": 590,
        "y": 1710,
        "wires": [
            [
                "84f5189a930cea3a",
                "cb984a3e3063c03e"
            ]
        ]
    },
    {
        "id": "2d9b512ee0eec103",
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
        "x": 600,
        "y": 1745,
        "wires": [
            [
                "84f5189a930cea3a",
                "9ad1361942a92a68"
            ]
        ]
    },
    {
        "id": "e90a8f5943f6d794",
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
        "x": 285,
        "y": 1710,
        "wires": [
            [
                "5a77b70d3d1f9337"
            ]
        ]
    },
    {
        "id": "5a77b70d3d1f9337",
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
        "x": 405,
        "y": 1710,
        "wires": [
            [
                "64672681bdf1c99f",
                "2d9b512ee0eec103",
                "c482393dd7f9b5cc",
                "2c1c66054bc76683"
            ]
        ]
    },
    {
        "id": "c482393dd7f9b5cc",
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
        "x": 620,
        "y": 1850,
        "wires": [
            [
                "c9d165b4cb762590",
                "a5c2bd74801a17b0"
            ]
        ]
    },
    {
        "id": "2c1c66054bc76683",
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
        "x": 620,
        "y": 1885,
        "wires": [
            [
                "c9d165b4cb762590",
                "803087a08a7e0291"
            ]
        ]
    },
    {
        "id": "364ec1aef189f068",
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
        "x": 215,
        "y": 1890,
        "wires": [
            [
                "e90a8f5943f6d794"
            ]
        ]
    },
    {
        "id": "b2bf255729e4b96b",
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
        "x": 220,
        "y": 1855,
        "wires": [
            [
                "e90a8f5943f6d794"
            ]
        ]
    },
    {
        "id": "24219557b9dddad7",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "7dcb3745c1f6d11e",
        "name": "",
        "x": 1550,
        "y": 1760,
        "wires": [
            []
        ]
    },
    {
        "id": "67fe5a2bcd19aa32",
        "type": "function",
        "z": "24034456db30f6e3",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 2015,
        "wires": [
            [
                "3c7a0ae2b8effd5e"
            ]
        ]
    },
    {
        "id": "c1dab48707e96db2",
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
        "x": 960,
        "y": 2075,
        "wires": [
            [
                "53946d235fa9341e"
            ]
        ]
    },
    {
        "id": "3c7a0ae2b8effd5e",
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
        "x": 1230,
        "y": 2015,
        "wires": [
            [
                "eb328280ef82a192"
            ]
        ]
    },
    {
        "id": "53946d235fa9341e",
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
        "x": 1250,
        "y": 2075,
        "wires": [
            [
                "eb328280ef82a192"
            ]
        ]
    },
    {
        "id": "1187c3f74231df4a",
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
        "x": 200,
        "y": 2070,
        "wires": [
            [
                "aa07161354d07f3a"
            ]
        ]
    },
    {
        "id": "07283887318ebce1",
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
        "x": 195,
        "y": 2035,
        "wires": [
            [
                "aa07161354d07f3a"
            ]
        ]
    },
    {
        "id": "2b9e33537cf90ad9",
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
        "x": 590,
        "y": 1980,
        "wires": [
            [
                "67fe5a2bcd19aa32",
                "a307b9a8b05566b3"
            ]
        ]
    },
    {
        "id": "1340adf38711b7ef",
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
        "x": 600,
        "y": 2015,
        "wires": [
            [
                "67fe5a2bcd19aa32",
                "9fb992a21be7f3d9"
            ]
        ]
    },
    {
        "id": "aa07161354d07f3a",
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
        "x": 285,
        "y": 1980,
        "wires": [
            [
                "0e2d6d0760a53735"
            ]
        ]
    },
    {
        "id": "0e2d6d0760a53735",
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
        "x": 405,
        "y": 1980,
        "wires": [
            [
                "2b9e33537cf90ad9",
                "1340adf38711b7ef",
                "35403897d0fb4596",
                "b4074b37202f5537"
            ]
        ]
    },
    {
        "id": "35403897d0fb4596",
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
        "x": 625,
        "y": 2185,
        "wires": [
            [
                "c1dab48707e96db2",
                "d97cabc8eec484cd"
            ]
        ]
    },
    {
        "id": "b4074b37202f5537",
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
        "x": 625,
        "y": 2225,
        "wires": [
            [
                "c1dab48707e96db2",
                "da454441eba4afd7"
            ]
        ]
    },
    {
        "id": "105fcab9278ad18e",
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
        "x": 215,
        "y": 2160,
        "wires": [
            [
                "aa07161354d07f3a"
            ]
        ]
    },
    {
        "id": "0573b8e16d398692",
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
        "x": 220,
        "y": 2125,
        "wires": [
            [
                "aa07161354d07f3a"
            ]
        ]
    },
    {
        "id": "eb328280ef82a192",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "51e6297883dcba65",
        "name": "",
        "x": 1550,
        "y": 2030,
        "wires": [
            []
        ]
    },
    {
        "id": "3907649e4f54e539",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 2615,
        "y": 1140,
        "wires": [
            []
        ]
    },
    {
        "id": "c42dc406a178cb96",
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
        "x": 2980,
        "y": 1405,
        "wires": [
            [
                "061b3c9fcc444f57"
            ]
        ]
    },
    {
        "id": "ea682a398cf883e3",
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
        "x": 2635,
        "y": 1385,
        "wires": [
            [
                "5faa9b44f5689740"
            ]
        ]
    },
    {
        "id": "bc6872fee325d076",
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
        "x": 2590,
        "y": 1455,
        "wires": [
            [
                "b0c518f8c8bffb0f"
            ]
        ]
    },
    {
        "id": "5faa9b44f5689740",
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
        "x": 2800,
        "y": 1385,
        "wires": [
            [
                "c42dc406a178cb96"
            ]
        ]
    },
    {
        "id": "b0c518f8c8bffb0f",
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
        "x": 2795,
        "y": 1435,
        "wires": [
            [
                "c42dc406a178cb96"
            ]
        ]
    },
    {
        "id": "a24ba7e284b4459c",
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
        "x": 2565,
        "y": 1565,
        "wires": [
            [
                "f9acc455e7727997"
            ]
        ]
    },
    {
        "id": "f9acc455e7727997",
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
        "x": 2765,
        "y": 1525,
        "wires": [
            [
                "5faa9b44f5689740"
            ]
        ]
    },
    {
        "id": "93551421394d8435",
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
        "x": 2765,
        "y": 1600,
        "wires": [
            [
                "bc6872fee325d076"
            ]
        ]
    },
    {
        "id": "a7a362ae7f885b9c",
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
        "x": 1930,
        "y": 630,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "4f771e6f8fd2757a",
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
        "x": 1930,
        "y": 700,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "6f61cf9ed16fbbc5",
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
        "x": 1930,
        "y": 770,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "1b5ead07cef895b7",
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
        "x": 1935,
        "y": 935,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "741d0cb9cc77baed",
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
        "x": 1935,
        "y": 1005,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "8746fe3011deedec",
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
        "x": 1935,
        "y": 1075,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "a5c2bd74801a17b0",
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
        "x": 1920,
        "y": 1970,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "d97cabc8eec484cd",
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
        "x": 1920,
        "y": 2165,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "7b2e29f3b1cbffae",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 78",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1185,
        "y": 825,
        "wires": []
    },
    {
        "id": "88b68c5f1d7ec675",
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
        "x": 2270,
        "y": 1345,
        "wires": [
            [
                "3907649e4f54e539",
                "1fda8458f11850f2"
            ]
        ]
    },
    {
        "id": "cb984a3e3063c03e",
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
        "x": 1920,
        "y": 1900,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "a307b9a8b05566b3",
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
        "x": 1920,
        "y": 2095,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "ea682a398cf883e3"
            ]
        ]
    },
    {
        "id": "9ad1361942a92a68",
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
        "x": 1920,
        "y": 1935,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "803087a08a7e0291",
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
        "x": 1920,
        "y": 2005,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "9fb992a21be7f3d9",
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
        "x": 1920,
        "y": 2130,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "da454441eba4afd7",
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
        "x": 1920,
        "y": 2200,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "ba2681166e357ee5",
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
        "x": 1930,
        "y": 665,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "b0c518f8c8bffb0f",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "ab8e9987473d1ce7",
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
        "x": 1930,
        "y": 735,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "c16f3456b1c705c8",
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
        "x": 1930,
        "y": 805,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "362ee770344d7fae",
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
        "x": 1935,
        "y": 970,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "d2fbf90b6b5fddff",
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
        "x": 1935,
        "y": 1040,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "e38184c2c17a80f3",
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
        "x": 1935,
        "y": 1110,
        "wires": [
            [
                "88b68c5f1d7ec675",
                "e49480a37b8130d1"
            ]
        ]
    },
    {
        "id": "1fda8458f11850f2",
        "type": "debug",
        "z": "24034456db30f6e3",
        "name": "debug 79",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 2795,
        "y": 1245,
        "wires": []
    },
    {
        "id": "79810df2ee3729c1",
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
        "x": 2565,
        "y": 1610,
        "wires": [
            [
                "93551421394d8435"
            ]
        ]
    },
    {
        "id": "e49480a37b8130d1",
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
        "x": 2645,
        "y": 1685,
        "wires": [
            [
                "b0c518f8c8bffb0f"
            ]
        ]
    },
    {
        "id": "061b3c9fcc444f57",
        "type": "mysql",
        "z": "24034456db30f6e3",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 3250,
        "y": 1375,
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
    }
]
