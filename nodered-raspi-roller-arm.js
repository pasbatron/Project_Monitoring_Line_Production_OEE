[
    {
        "id": "160546c642ab071d",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 420,
        "wires": [
            [
                "a4a247b1761fb432"
            ]
        ]
    },
    {
        "id": "ea9da75ef1829f61",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "232c4e9d220b689a"
            ]
        ]
    },
    {
        "id": "eaea0ed17a24846f",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "effacf6a21f6491a"
            ]
        ]
    },
    {
        "id": "b2eb1f8961eaefda",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "73f24fd75d419778"
            ]
        ]
    },
    {
        "id": "143cf276d17e3f3d",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "d6d1729969099041"
            ]
        ]
    },
    {
        "id": "3e758ab0099705f1",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "be1670dd764ff239"
            ]
        ]
    },
    {
        "id": "a4a247b1761fb432",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "acb6fd66d6c7e50a"
            ]
        ]
    },
    {
        "id": "232c4e9d220b689a",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "acb6fd66d6c7e50a"
            ]
        ]
    },
    {
        "id": "effacf6a21f6491a",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "acb6fd66d6c7e50a"
            ]
        ]
    },
    {
        "id": "73f24fd75d419778",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "acb6fd66d6c7e50a"
            ]
        ]
    },
    {
        "id": "d6d1729969099041",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "acb6fd66d6c7e50a"
            ]
        ]
    },
    {
        "id": "be1670dd764ff239",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "acb6fd66d6c7e50a"
            ]
        ]
    },
    {
        "id": "37e33177bd693cfe",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 135,
        "y": 215,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "c0b5101a1ee2bb5c",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 140,
        "y": 180,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "38815fb76815c331",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 120,
        "wires": [
            [
                "160546c642ab071d"
            ]
        ]
    },
    {
        "id": "c64ce63556ff4348",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 555,
        "y": 160,
        "wires": [
            [
                "160546c642ab071d"
            ]
        ]
    },
    {
        "id": "407de5790c2e3bb0",
        "type": "string",
        "z": "7d5d59cd7e772c15",
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
        "x": 290,
        "y": 120,
        "wires": [
            [
                "38815fb76815c331",
                "c64ce63556ff4348",
                "ea7ed12459def959",
                "313ca03a59a3c25b",
                "6afc215de1e99c97",
                "0c988214c74423ba",
                "d831b80dc78a5ff5",
                "528767e037a91dfc",
                "520b063fa229c967",
                "7c956586449ca7f8",
                "587a8939d089fe7e",
                "04b4876b3de1a990"
            ]
        ]
    },
    {
        "id": "24b4ac9992e45770",
        "type": "serial in",
        "z": "7d5d59cd7e772c15",
        "name": "",
        "serial": "4a3ca22424113665",
        "x": 110,
        "y": 100,
        "wires": [
            [
                "407de5790c2e3bb0",
                "a2020e815aa2719b",
                "dea537837a23ae01",
                "60abc71f639221e1",
                "77e67141a61af440"
            ]
        ]
    },
    {
        "id": "ea7ed12459def959",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35on_qualitycheck",
        "func": "var data_condition;\n\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 575,
        "y": 210,
        "wires": [
            [
                "ea9da75ef1829f61"
            ]
        ]
    },
    {
        "id": "313ca03a59a3c25b",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 575,
        "y": 245,
        "wires": [
            [
                "ea9da75ef1829f61"
            ]
        ]
    },
    {
        "id": "6afc215de1e99c97",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35on_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 575,
        "y": 295,
        "wires": [
            [
                "eaea0ed17a24846f"
            ]
        ]
    },
    {
        "id": "0c988214c74423ba",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 575,
        "y": 330,
        "wires": [
            [
                "eaea0ed17a24846f"
            ]
        ]
    },
    {
        "id": "d831b80dc78a5ff5",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 125,
        "wires": [
            [
                "b2eb1f8961eaefda",
                "03380be889f2dab6"
            ]
        ]
    },
    {
        "id": "528767e037a91dfc",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 160,
        "wires": [
            [
                "b2eb1f8961eaefda",
                "26278ecd1067a995"
            ]
        ]
    },
    {
        "id": "520b063fa229c967",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35on_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 210,
        "wires": [
            [
                "143cf276d17e3f3d",
                "f7dffe7d8602920c"
            ]
        ]
    },
    {
        "id": "7c956586449ca7f8",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal35off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 245,
        "wires": [
            [
                "143cf276d17e3f3d",
                "461ef6aa5e661be2"
            ]
        ]
    },
    {
        "id": "587a8939d089fe7e",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35on_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 295,
        "wires": [
            [
                "3e758ab0099705f1",
                "d96779f2e9737230"
            ]
        ]
    },
    {
        "id": "04b4876b3de1a990",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal35off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal35off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 330,
        "wires": [
            [
                "3e758ab0099705f1",
                "dbe62f86e18a6ad0"
            ]
        ]
    },
    {
        "id": "acb6fd66d6c7e50a",
        "type": "mysql",
        "z": "7d5d59cd7e772c15",
        "mydb": "de33f8dbe22463fe",
        "name": "",
        "x": 1545,
        "y": 545,
        "wires": [
            []
        ]
    },
    {
        "id": "0385f4d4295acb38",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 140,
        "y": 305,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "309a84975e2394d4",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 145,
        "y": 270,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "0b543f0ee94d9a9c",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 145,
        "y": 395,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "79ac64fed621bd32",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 150,
        "y": 360,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "573ea4cff47d2d01",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 135,
        "y": 485,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "b0b0250a7706b177",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 140,
        "y": 450,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "ce2038cac516881c",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 130,
        "y": 570,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "48d5cf169ff2ada1",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 135,
        "y": 535,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "09ba71d3a848e3a2",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 125,
        "y": 655,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "80245b934681fdf8",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 130,
        "y": 620,
        "wires": [
            [
                "407de5790c2e3bb0"
            ]
        ]
    },
    {
        "id": "a2020e815aa2719b",
        "type": "debug",
        "z": "7d5d59cd7e772c15",
        "name": "debug 75",
        "active": true,
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
        "id": "0af074a0dd9cf6eb",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 860,
        "y": 1220,
        "wires": [
            [
                "bdd71d96c3cefec9"
            ]
        ]
    },
    {
        "id": "bc284c244b537797",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 1280,
        "wires": [
            [
                "d5ce177948a40d34"
            ]
        ]
    },
    {
        "id": "81ae3b8c32d6be57",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1340,
        "wires": [
            [
                "8e917708386f3ef8"
            ]
        ]
    },
    {
        "id": "0cf4049198d504a7",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1400,
        "wires": [
            [
                "03d29035ebb64e3a"
            ]
        ]
    },
    {
        "id": "b13668ba46da8bbd",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 885,
        "y": 1470,
        "wires": [
            [
                "f289d4a454b018e0"
            ]
        ]
    },
    {
        "id": "2455690ad1013eff",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 1550,
        "wires": [
            [
                "58c9e25f9b607f84"
            ]
        ]
    },
    {
        "id": "bdd71d96c3cefec9",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1150,
        "y": 1220,
        "wires": [
            [
                "22f013a9d3c7db5b"
            ]
        ]
    },
    {
        "id": "d5ce177948a40d34",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1280,
        "wires": [
            [
                "22f013a9d3c7db5b"
            ]
        ]
    },
    {
        "id": "8e917708386f3ef8",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1340,
        "wires": [
            [
                "22f013a9d3c7db5b"
            ]
        ]
    },
    {
        "id": "03d29035ebb64e3a",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1400,
        "wires": [
            [
                "22f013a9d3c7db5b"
            ]
        ]
    },
    {
        "id": "f289d4a454b018e0",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1460,
        "wires": [
            [
                "22f013a9d3c7db5b"
            ]
        ]
    },
    {
        "id": "58c9e25f9b607f84",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1520,
        "wires": [
            [
                "22f013a9d3c7db5b"
            ]
        ]
    },
    {
        "id": "dea537837a23ae01",
        "type": "string",
        "z": "7d5d59cd7e772c15",
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
        "x": 280,
        "y": 885,
        "wires": [
            [
                "e6deecf308dec06c",
                "cb8c38493beaf69e",
                "9aa9e95e172c45b9",
                "217da006f096a27c",
                "c31f66765ec3d01d",
                "17acfaadd409d134",
                "db9e9543bb10739f",
                "fe608baec0104af9",
                "dd9ba385994ef1ce",
                "8d8fdfbbcb7d14fd",
                "39f86e6ebdd4869f",
                "bb70640f80c8c8ea"
            ]
        ]
    },
    {
        "id": "22f013a9d3c7db5b",
        "type": "mysql",
        "z": "7d5d59cd7e772c15",
        "mydb": "787813855a4f46ed",
        "name": "",
        "x": 1520,
        "y": 1335,
        "wires": [
            []
        ]
    },
    {
        "id": "51049cc427415ecd",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 2280,
        "wires": [
            [
                "f0af530ec9cbd160"
            ]
        ]
    },
    {
        "id": "a009053b9d11ddb5",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1045,
        "y": 2340,
        "wires": [
            [
                "f352389ca61b131b"
            ]
        ]
    },
    {
        "id": "f0af530ec9cbd160",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1315,
        "y": 2280,
        "wires": [
            [
                "21487bbd0c3cd089"
            ]
        ]
    },
    {
        "id": "f352389ca61b131b",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1335,
        "y": 2340,
        "wires": [
            [
                "21487bbd0c3cd089"
            ]
        ]
    },
    {
        "id": "e351218adc999f7e",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "60abc71f639221e1"
            ]
        ]
    },
    {
        "id": "e76283a7d9c149af",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "60abc71f639221e1"
            ]
        ]
    },
    {
        "id": "f44a5494f70da8fa",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 675,
        "y": 2245,
        "wires": [
            [
                "51049cc427415ecd",
                "32468070cc1f7145"
            ]
        ]
    },
    {
        "id": "ba1a85d8a1157fad",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 2280,
        "wires": [
            [
                "51049cc427415ecd",
                "394f28c476d8ac08"
            ]
        ]
    },
    {
        "id": "60abc71f639221e1",
        "type": "string",
        "z": "7d5d59cd7e772c15",
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
                "a830448302f1e985"
            ]
        ]
    },
    {
        "id": "a830448302f1e985",
        "type": "string",
        "z": "7d5d59cd7e772c15",
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
                "f44a5494f70da8fa",
                "ba1a85d8a1157fad",
                "82395438ebf52dca",
                "3be180c53660f9ab"
            ]
        ]
    },
    {
        "id": "82395438ebf52dca",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_hopper_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 705,
        "y": 2385,
        "wires": [
            [
                "a009053b9d11ddb5",
                "08a2a5de50f5707d"
            ]
        ]
    },
    {
        "id": "3be180c53660f9ab",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_hopper_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam73\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 705,
        "y": 2420,
        "wires": [
            [
                "a009053b9d11ddb5",
                "8844e42fcd630793"
            ]
        ]
    },
    {
        "id": "4af12506cdd516c0",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "60abc71f639221e1"
            ]
        ]
    },
    {
        "id": "3fd9341d0f55951b",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "60abc71f639221e1"
            ]
        ]
    },
    {
        "id": "21487bbd0c3cd089",
        "type": "mysql",
        "z": "7d5d59cd7e772c15",
        "mydb": "7dcb3745c1f6d11e",
        "name": "",
        "x": 1635,
        "y": 2295,
        "wires": [
            []
        ]
    },
    {
        "id": "da892bc7b3d70953",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 2550,
        "wires": [
            [
                "9e6da5d6d4966545"
            ]
        ]
    },
    {
        "id": "b55dcffcef9144d9",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1045,
        "y": 2610,
        "wires": [
            [
                "e79d34d063ec6321"
            ]
        ]
    },
    {
        "id": "9e6da5d6d4966545",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1315,
        "y": 2550,
        "wires": [
            [
                "438706a182f4ac58"
            ]
        ]
    },
    {
        "id": "e79d34d063ec6321",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1335,
        "y": 2610,
        "wires": [
            [
                "438706a182f4ac58"
            ]
        ]
    },
    {
        "id": "0afab438de1bf484",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "77e67141a61af440"
            ]
        ]
    },
    {
        "id": "519a89a368153964",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "77e67141a61af440"
            ]
        ]
    },
    {
        "id": "7bd3635e8a349633",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_mc_fault_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"mc_fault\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 675,
        "y": 2515,
        "wires": [
            [
                "da892bc7b3d70953",
                "6860e1e43fb08ac8"
            ]
        ]
    },
    {
        "id": "7a6b6e59f2732d2b",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_mc_fault_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"mc_fault\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 685,
        "y": 2550,
        "wires": [
            [
                "da892bc7b3d70953",
                "94e649cab7b67c4b"
            ]
        ]
    },
    {
        "id": "77e67141a61af440",
        "type": "string",
        "z": "7d5d59cd7e772c15",
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
                "90c9631e98e0e2de"
            ]
        ]
    },
    {
        "id": "90c9631e98e0e2de",
        "type": "string",
        "z": "7d5d59cd7e772c15",
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
                "7bd3635e8a349633",
                "7a6b6e59f2732d2b",
                "aec0d57cddb48cbd",
                "dd40e615168c4de1"
            ]
        ]
    },
    {
        "id": "aec0d57cddb48cbd",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_hopper_no_part_activated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"activated\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2720,
        "wires": [
            [
                "b55dcffcef9144d9",
                "c0223304d34d3b93"
            ]
        ]
    },
    {
        "id": "dd40e615168c4de1",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal_hopper_no_part_deactivated",
        "func": "var data_condition;\nvar data_signal;\nvar data_status;\n\n\ndata_condition = msg.payload[0]\ndata_signal = msg.payload[1]\ndata_status = msg.payload[2]\n\nif (data_condition == \"signal_iam72\"){\n    if (data_signal == \"hopper_no_part\" && data_status == \"deactivated\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n    }\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2760,
        "wires": [
            [
                "b55dcffcef9144d9",
                "b7c85c268d9c2c96"
            ]
        ]
    },
    {
        "id": "40e651de9d69833a",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "77e67141a61af440"
            ]
        ]
    },
    {
        "id": "326a320d7b8a73f1",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "77e67141a61af440"
            ]
        ]
    },
    {
        "id": "438706a182f4ac58",
        "type": "mysql",
        "z": "7d5d59cd7e772c15",
        "mydb": "51e6297883dcba65",
        "name": "",
        "x": 1635,
        "y": 2565,
        "wires": [
            []
        ]
    },
    {
        "id": "8c828f21634b143f",
        "type": "mysql",
        "z": "7d5d59cd7e772c15",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 2710,
        "y": 880,
        "wires": [
            []
        ]
    },
    {
        "id": "411e2d21ce1184a9",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "bdc21d4650b17653"
            ]
        ]
    },
    {
        "id": "9ef00c112de7ba6e",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "1aad6246cae1aacd"
            ]
        ]
    },
    {
        "id": "ae7d4203701ac756",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "bbd1f223c65a649f"
            ]
        ]
    },
    {
        "id": "1aad6246cae1aacd",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "411e2d21ce1184a9"
            ]
        ]
    },
    {
        "id": "bbd1f223c65a649f",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "411e2d21ce1184a9"
            ]
        ]
    },
    {
        "id": "8c7eb2232bfaedb0",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "d648f8b48dbb122b"
            ]
        ]
    },
    {
        "id": "d648f8b48dbb122b",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "1aad6246cae1aacd"
            ]
        ]
    },
    {
        "id": "a479bf806e18d23d",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "ae7d4203701ac756"
            ]
        ]
    },
    {
        "id": "03380be889f2dab6",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "f7dffe7d8602920c",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "d96779f2e9737230",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "f6b9d8b4e85b47cf",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "c75b6093af8105e9",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "70b103dae4fa4dea",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "08a2a5de50f5707d",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "c0223304d34d3b93",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "f91d27c4a0443d96",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "01719966c4f74477",
                "8c828f21634b143f"
            ]
        ]
    },
    {
        "id": "32468070cc1f7145",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "6860e1e43fb08ac8",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "9ef00c112de7ba6e"
            ]
        ]
    },
    {
        "id": "394f28c476d8ac08",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "8844e42fcd630793",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "94e649cab7b67c4b",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "b7c85c268d9c2c96",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "26278ecd1067a995",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "bbd1f223c65a649f",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "461ef6aa5e661be2",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "dbe62f86e18a6ad0",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "ce1420eddbb73f1c",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "a044a299794b1f98",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "bbec29456d5a6cc1",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "f91d27c4a0443d96",
                "fb9f7b620a0b6ee0"
            ]
        ]
    },
    {
        "id": "01719966c4f74477",
        "type": "debug",
        "z": "7d5d59cd7e772c15",
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
        "id": "f6d008e3416fb46f",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
                "a479bf806e18d23d"
            ]
        ]
    },
    {
        "id": "fb9f7b620a0b6ee0",
        "type": "function",
        "z": "7d5d59cd7e772c15",
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
                "bbd1f223c65a649f"
            ]
        ]
    },
    {
        "id": "bdc21d4650b17653",
        "type": "mysql",
        "z": "7d5d59cd7e772c15",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 3250,
        "y": 1375,
        "wires": [
            []
        ]
    },
    {
        "id": "db9e9543bb10739f",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 880,
        "wires": [
            [
                "0af074a0dd9cf6eb"
            ]
        ]
    },
    {
        "id": "fe608baec0104af9",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 915,
        "wires": [
            [
                "0af074a0dd9cf6eb"
            ]
        ]
    },
    {
        "id": "dd9ba385994ef1ce",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 965,
        "wires": [
            [
                "bc284c244b537797"
            ]
        ]
    },
    {
        "id": "8d8fdfbbcb7d14fd",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 1000,
        "wires": [
            [
                "bc284c244b537797"
            ]
        ]
    },
    {
        "id": "39f86e6ebdd4869f",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 1050,
        "wires": [
            [
                "81ae3b8c32d6be57"
            ]
        ]
    },
    {
        "id": "bb70640f80c8c8ea",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 1085,
        "wires": [
            [
                "81ae3b8c32d6be57"
            ]
        ]
    },
    {
        "id": "e6deecf308dec06c",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 885,
        "y": 880,
        "wires": [
            [
                "0cf4049198d504a7",
                "f6b9d8b4e85b47cf"
            ]
        ]
    },
    {
        "id": "cb8c38493beaf69e",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 885,
        "y": 915,
        "wires": [
            [
                "0cf4049198d504a7",
                "ce1420eddbb73f1c"
            ]
        ]
    },
    {
        "id": "9aa9e95e172c45b9",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 965,
        "wires": [
            [
                "b13668ba46da8bbd",
                "c75b6093af8105e9"
            ]
        ]
    },
    {
        "id": "217da006f096a27c",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 1000,
        "wires": [
            [
                "b13668ba46da8bbd",
                "a044a299794b1f98"
            ]
        ]
    },
    {
        "id": "c31f66765ec3d01d",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"signal33on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 885,
        "y": 1050,
        "wires": [
            [
                "2455690ad1013eff",
                "70b103dae4fa4dea"
            ]
        ]
    },
    {
        "id": "17acfaadd409d134",
        "type": "function",
        "z": "7d5d59cd7e772c15",
        "name": "signal33off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"signal33off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 885,
        "y": 1085,
        "wires": [
            [
                "2455690ad1013eff",
                "bbec29456d5a6cc1"
            ]
        ]
    },
    {
        "id": "a19fd5d7851fa69d",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 155,
        "y": 975,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "6aa7b165faa5a336",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 160,
        "y": 940,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "df91c8a14baa7f5d",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 160,
        "y": 1065,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "835d42fba79dc1e7",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 165,
        "y": 1030,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "acbc1906874d82fa",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 165,
        "y": 1155,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "139947bde65deed2",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 170,
        "y": 1120,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "6e64034c0f781db8",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 155,
        "y": 1245,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "6dfda08004e7707b",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 160,
        "y": 1210,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "44b99560db66cd0d",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 150,
        "y": 1330,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "68d45ea40a536da4",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 155,
        "y": 1295,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "6270d7af7e31788d",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 145,
        "y": 1415,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "98af8ca62c1d824c",
        "type": "inject",
        "z": "7d5d59cd7e772c15",
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
        "x": 150,
        "y": 1380,
        "wires": [
            [
                "dea537837a23ae01"
            ]
        ]
    },
    {
        "id": "4a3ca22424113665",
        "type": "serial-port",
        "name": "",
        "serialport": "COM5",
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
