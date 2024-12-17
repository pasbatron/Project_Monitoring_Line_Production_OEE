[
    {
        "id": "05550434ed7e19b1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1781,
        "y": 1552,
        "wires": [
            [
                "bcacd6df340bf5a0"
            ]
        ]
    },
    {
        "id": "f5cc347c196156d4",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1796,
        "y": 1597,
        "wires": [
            [
                "da8697afbc47e7e1"
            ]
        ]
    },
    {
        "id": "3cae0ec6ab829b10",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1786,
        "y": 1657,
        "wires": [
            [
                "4f43b7be71c1a82d"
            ]
        ]
    },
    {
        "id": "d71099d8686eeba6",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1786,
        "y": 1717,
        "wires": [
            [
                "51d7c895ff0e02d6"
            ]
        ]
    },
    {
        "id": "b01ebea423b42296",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1796,
        "y": 1777,
        "wires": [
            [
                "edd6e87f9667feed"
            ]
        ]
    },
    {
        "id": "41d64a5382cd5f2e",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1786,
        "y": 1842,
        "wires": [
            [
                "dc1646a8e1f2b8b7"
            ]
        ]
    },
    {
        "id": "bcacd6df340bf5a0",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2066,
        "y": 1537,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "da8697afbc47e7e1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2086,
        "y": 1597,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "4f43b7be71c1a82d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2076,
        "y": 1657,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "51d7c895ff0e02d6",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2076,
        "y": 1717,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "edd6e87f9667feed",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2086,
        "y": 1777,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "dc1646a8e1f2b8b7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2076,
        "y": 1837,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "74856ba04d69a7ef",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2896,
        "y": 1522,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "f8ef8a41b966126e",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2901,
        "y": 1487,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "a8c29c1603d3b411",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1461,
        "y": 1252,
        "wires": [
            [
                "05550434ed7e19b1"
            ]
        ]
    },
    {
        "id": "51cd0b73a9c5c3fb",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1466,
        "y": 1292,
        "wires": [
            [
                "05550434ed7e19b1"
            ]
        ]
    },
    {
        "id": "84cba524a89c9ea1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35on_qualitycheck",
        "func": "var data_condition;\ndata_condition = msg.payload;\nif (data_condition == \"iaa35on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1486,
        "y": 1342,
        "wires": [
            [
                "f5cc347c196156d4"
            ]
        ]
    },
    {
        "id": "711c7c2e067c5b5a",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1486,
        "y": 1377,
        "wires": [
            [
                "f5cc347c196156d4"
            ]
        ]
    },
    {
        "id": "136ffca2fa9a1ec0",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35on_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1486,
        "y": 1427,
        "wires": [
            [
                "3cae0ec6ab829b10"
            ]
        ]
    },
    {
        "id": "2e818ffeb9eb49d6",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1486,
        "y": 1462,
        "wires": [
            [
                "3cae0ec6ab829b10"
            ]
        ]
    },
    {
        "id": "d444aa2eda5b98f7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1456,
        "y": 1547,
        "wires": [
            [
                "d71099d8686eeba6",
                "bfe7282d50792310"
            ]
        ]
    },
    {
        "id": "332c03b7eed875b1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1456,
        "y": 1582,
        "wires": [
            [
                "d71099d8686eeba6",
                "4a29c7461ba17632"
            ]
        ]
    },
    {
        "id": "6041def7227de55c",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35on_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1466,
        "y": 1632,
        "wires": [
            [
                "b01ebea423b42296",
                "fc2508aded5dd134"
            ]
        ]
    },
    {
        "id": "3841fb50f94cb20d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa35off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1466,
        "y": 1667,
        "wires": [
            [
                "b01ebea423b42296",
                "508c6850880247ce"
            ]
        ]
    },
    {
        "id": "253032ec4f93e2bb",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35on_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1456,
        "y": 1717,
        "wires": [
            [
                "41d64a5382cd5f2e",
                "18c8444586587ee2"
            ]
        ]
    },
    {
        "id": "81b7bf74d69326df",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa35off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1456,
        "y": 1752,
        "wires": [
            [
                "41d64a5382cd5f2e",
                "6ffec3e6a2f51634"
            ]
        ]
    },
    {
        "id": "552602b1bde8c715",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2901,
        "y": 1612,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "28e8b9f3759ad734",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2906,
        "y": 1577,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "b3b80acad9cdbcb6",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2906,
        "y": 1702,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "7ab43dc3eb1e8614",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2911,
        "y": 1667,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "f27e9a7e87793974",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2896,
        "y": 1792,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "96f1d5d91446f5e9",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2901,
        "y": 1757,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "367ac8733fe964ef",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2891,
        "y": 1877,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "58bbf3e70709371e",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2896,
        "y": 1842,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "1efed65556d6526d",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2886,
        "y": 1962,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "1d0edc50a2f85fab",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2891,
        "y": 1927,
        "wires": [
            [
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "2e5a50fdcb804965",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1746,
        "y": 2257,
        "wires": [
            [
                "5de25478bb6288a9"
            ]
        ]
    },
    {
        "id": "7f640e11aeb47a83",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1766,
        "y": 2317,
        "wires": [
            [
                "f5204b994699e979"
            ]
        ]
    },
    {
        "id": "74d8aa54a2ebf258",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1756,
        "y": 2377,
        "wires": [
            [
                "c3cdda8c61a39651"
            ]
        ]
    },
    {
        "id": "75d9d1703e7ce2c7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1756,
        "y": 2437,
        "wires": [
            [
                "ceae0b74a2101658"
            ]
        ]
    },
    {
        "id": "e88cc59a1265908d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1771,
        "y": 2507,
        "wires": [
            [
                "61787ca5ccf4263e"
            ]
        ]
    },
    {
        "id": "2c08ffcd2f3b8a01",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1756,
        "y": 2587,
        "wires": [
            [
                "1d180318a305fb1f"
            ]
        ]
    },
    {
        "id": "5de25478bb6288a9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2036,
        "y": 2257,
        "wires": [
            [
                "059081e5ec4762cf"
            ]
        ]
    },
    {
        "id": "f5204b994699e979",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2056,
        "y": 2317,
        "wires": [
            [
                "059081e5ec4762cf"
            ]
        ]
    },
    {
        "id": "c3cdda8c61a39651",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2046,
        "y": 2377,
        "wires": [
            [
                "059081e5ec4762cf"
            ]
        ]
    },
    {
        "id": "ceae0b74a2101658",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2046,
        "y": 2437,
        "wires": [
            [
                "059081e5ec4762cf"
            ]
        ]
    },
    {
        "id": "61787ca5ccf4263e",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2056,
        "y": 2497,
        "wires": [
            [
                "059081e5ec4762cf"
            ]
        ]
    },
    {
        "id": "1d180318a305fb1f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2046,
        "y": 2557,
        "wires": [
            [
                "059081e5ec4762cf"
            ]
        ]
    },
    {
        "id": "d24a5121f49cfcef",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1781,
        "y": 3237,
        "wires": [
            [
                "35da26a2b40b4254"
            ]
        ]
    },
    {
        "id": "f7acfc10c2403961",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1801,
        "y": 3297,
        "wires": [
            [
                "c64125468bbeb031"
            ]
        ]
    },
    {
        "id": "35da26a2b40b4254",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2071,
        "y": 3237,
        "wires": [
            [
                "4877036c4871a81e"
            ]
        ]
    },
    {
        "id": "c64125468bbeb031",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2091,
        "y": 3297,
        "wires": [
            [
                "4877036c4871a81e"
            ]
        ]
    },
    {
        "id": "64883416e7d6d508",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2911,
        "y": 3187,
        "wires": [
            [
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "797299bb1b0fed51",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2916,
        "y": 3152,
        "wires": [
            [
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "c0c769bc2107e9b2",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2926,
        "y": 3277,
        "wires": [
            [
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "c26e29b0c2740d2c",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2931,
        "y": 3242,
        "wires": [
            [
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "9fa99cd246401bee",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1786,
        "y": 2867,
        "wires": [
            [
                "4c03fc0f5c0349f0"
            ]
        ]
    },
    {
        "id": "fe6698c15eebab8d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1801,
        "y": 2907,
        "wires": [
            [
                "2b2b99cc7df3c160"
            ]
        ]
    },
    {
        "id": "4c03fc0f5c0349f0",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2056,
        "y": 2957,
        "wires": [
            [
                "ee62ba4203dc98e1"
            ]
        ]
    },
    {
        "id": "2b2b99cc7df3c160",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2076,
        "y": 3017,
        "wires": [
            [
                "ee62ba4203dc98e1"
            ]
        ]
    },
    {
        "id": "57b7a08c2fe62269",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2891,
        "y": 2857,
        "wires": [
            [
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "2ae6a7382d19143d",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2896,
        "y": 2822,
        "wires": [
            [
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "638d24c371af602e",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1421,
        "y": 2902,
        "wires": [
            [
                "9fa99cd246401bee",
                "9f7c750fc09dc4c3"
            ]
        ]
    },
    {
        "id": "64f7c4cd47d3c93d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1421,
        "y": 2937,
        "wires": [
            [
                "9fa99cd246401bee",
                "49e02b7d14c6c8d1"
            ]
        ]
    },
    {
        "id": "0b6bab6cf6a3fa11",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1441,
        "y": 2977,
        "wires": [
            [
                "fe6698c15eebab8d",
                "d2272aeaea6b7e3c"
            ]
        ]
    },
    {
        "id": "5d3602421c1e2fde",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam72off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1441,
        "y": 3017,
        "wires": [
            [
                "fe6698c15eebab8d",
                "fb989f3a5ed0b6d0"
            ]
        ]
    },
    {
        "id": "54fc09ea66bec704",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2906,
        "y": 2947,
        "wires": [
            [
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "8c6b84578fd0e312",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2911,
        "y": 2912,
        "wires": [
            [
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "e4179c252a661067",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Build SQL Update",
        "func": "var id = msg.id;\nvar andon = msg.andon;\n\nif(msg.id == \"1\"){\n    msg.topic = `UPDATE table_andon SET andon='${andon}' WHERE id=${id}`;  \n    return msg;\n}\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 5000,
        "y": 815,
        "wires": [
            [
                "c07a3e93fa85ba2e"
            ]
        ]
    },
    {
        "id": "68446f38e24f57d9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ON ANDON",
        "func": "if (\n    msg.payload.iaa33_pin === \"1\" || msg.payload.iaa33_roller === \"1\" ||\n    msg.payload.iaa33_arm === \"1\" || msg.payload.iaa35_pin === \"1\" ||\n    msg.payload.iaa35_roller === \"1\" || msg.payload.iaa35_arm === \"1\" ||\n    msg.payload.iaa36_pin === \"1\" || msg.payload.iaa36_roller === \"1\" ||\n    msg.payload.iaa36_arm === \"1\" || msg.payload.iam72_hopper === \"1\" ||\n    msg.payload.iam72_mc_fault === \"1\" || msg.payload.iam73_hopper === \"1\" ||\n    msg.payload.iam73_mc_fault === \"1\" || msg.payload.iam80_hopper === \"1\" ||\n    msg.payload.iam80_mc_fault === \"1\" || msg.payload.ispbr3_mc_fault === \"1\"\n) {\n    msg.payload = { \"status\": \"1\" };\n    return msg;\n} else if(    \n    msg.payload.iaa33_pin !== \"1\" || msg.payload.iaa33_roller !== \"1\" ||\n    msg.payload.iaa33_arm !== \"1\" || msg.payload.iaa35_pin !== \"1\" ||\n    msg.payload.iaa35_roller !== \"1\" || msg.payload.iaa35_arm !== \"1\" ||\n    msg.payload.iaa36_pin !== \"1\" || msg.payload.iaa36_roller !== \"1\" ||\n    msg.payload.iaa36_arm !== \"1\" || msg.payload.iam72_hopper !== \"1\" ||\n    msg.payload.iam72_mc_fault !== \"1\" || msg.payload.iam73_hopper !== \"1\" ||\n    msg.payload.iam73_mc_fault !== \"1\" || msg.payload.iam80_hopper !== \"1\" ||\n    msg.payload.iam80_mc_fault !== \"1\" || msg.payload.ispbr3_mc_fault !== \"1\") {\n    msg.payload = { \"status\": \"0\" };\n    return msg;\n    \n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4170,
        "y": 790,
        "wires": [
            [
                "ef262c1885dbc298"
            ]
        ]
    },
    {
        "id": "4e7153e2f38412da",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ANDON ON",
        "func": "if(msg.payload === \"1\"){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"ON\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4815,
        "y": 790,
        "wires": [
            [
                "e4179c252a661067"
            ]
        ]
    },
    {
        "id": "8793caab3d140912",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ANDON OFF",
        "func": "if(msg.payload === '0'){\n    var msg = {\n        payload: \"\",\n        id: 1,\n        andon: \"OFF\"\n    };\n}\n\n\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4815,
        "y": 840,
        "wires": [
            [
                "e4179c252a661067"
            ]
        ]
    },
    {
        "id": "8ae384403af283e8",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "{\"status\":\"1\"}",
        "payloadType": "json",
        "x": 4520,
        "y": 750,
        "wires": [
            [
                "ef262c1885dbc298"
            ]
        ]
    },
    {
        "id": "ef262c1885dbc298",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "on",
        "func": "\n\nif(msg.payload.status === \"1\"){\n    msg.payload = \"1\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4630,
        "y": 790,
        "wires": [
            [
                "4e7153e2f38412da",
                "51ac5058e6d5eacd"
            ]
        ]
    },
    {
        "id": "5493334257079ecf",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "off",
        "func": "\nif(msg.payload.status === \"0\"){\n    msg.payload = \"0\";\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4630,
        "y": 825,
        "wires": [
            [
                "8793caab3d140912",
                "092fa90ea181515f"
            ]
        ]
    },
    {
        "id": "bfe7282d50792310",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35_arm_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_arm = true;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 895,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "a34012b984f30970"
            ]
        ]
    },
    {
        "id": "fc2508aded5dd134",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_roller = true;\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 935,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "49b81f84539b911a"
            ]
        ]
    },
    {
        "id": "18c8444586587ee2",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa35_pin = true;\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 975,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "8f1358c68a70541c"
            ]
        ]
    },
    {
        "id": "ceba73a4d9ff3251",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33_arm_on",
        "func": "if(msg.payload.action === \"start\"){\n    msg.payload.iaa33_arm = true;\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1015,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "1a1b8b918a68fe53"
            ]
        ]
    },
    {
        "id": "156555793a39b710",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_roller = true;\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1055,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "943cc64e2511a884"
            ]
        ]
    },
    {
        "id": "c6f17c4e1e8f0b9a",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa33_pin = true;\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1095,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "22cbb453e17eeed1"
            ]
        ]
    },
    {
        "id": "5192607cf66e0540",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1260,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "f6ea6820ad6574ba",
                "51787370be82d06e"
            ]
        ]
    },
    {
        "id": "d2272aeaea6b7e3c",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload = true;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1180,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "c3f712fa0fc80f91",
                "3732353b1c90b92f"
            ]
        ]
    },
    {
        "id": "4de045edb465565b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "INSERT DATA CORE DASHBOARD",
        "func": "\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iaa35_arm\nif (msg.payload.iaa35_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_pin\nif (msg.payload.iaa35_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa35_roller\nif (msg.payload.iaa35_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa35_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa35_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n// Kondisi untuk iaa33_arm\nif (msg.payload.iaa33_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_pin\nif (msg.payload.iaa33_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa33_roller\nif (msg.payload.iaa33_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa33_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iaa36_arm\nif (msg.payload.iaa36_arm == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_arm = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_arm == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_arm = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa36_pin\nif (msg.payload.iaa36_pin == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_pin = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_pin == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_pin = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iaa36_roller\nif (msg.payload.iaa36_roller == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_bearing = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iaa36_roller == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iaa36_bearing = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk iam72_mc_fault\nif (msg.payload.iam72_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam72_hopper\nif (msg.payload.iam72_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam72_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam72_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n// Kondisi untuk iam73_mc_fault\nif (msg.payload.iam73_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam73_hopper\nif (msg.payload.iam73_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam73_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam73_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n// Kondisi untuk iam80_mc_fault\nif (msg.payload.iam80_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam80_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n// Kondisi untuk iam80_hopper\nif (msg.payload.iam80_hopper == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_hopper = 0\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.iam80_hopper == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET iam80_hopper = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// Kondisi untuk ispbr3_mc_fault\nif (msg.payload.ispbr3_mc_fault == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_mc_fault = 1\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\nif (msg.payload.ispbr3_mc_fault == \"0\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_mc_fault = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n\n// MEMATIKAN DASHOBAR PROCESS BAREL\nif (msg.payload.ispbr3_fullwork == \"1\") {\n    var query = `\n    UPDATE table_condition_andon\n    SET ispbr3_arm_nr = 2, ispbr3_arm_d31e = 2\n    WHERE id = 1\n    `;\n    msg.topic = query;\n    return msg;\n}\n\n\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4250,
        "y": 1040,
        "wires": [
            [
                "c46dcbaa47042fb7",
                "6583da8f95a8d05a"
            ]
        ]
    },
    {
        "id": "aa61bc5e3d674061",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam73_mc_fault = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1220,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "dccad9802994ebe7"
            ]
        ]
    },
    {
        "id": "9f7c750fc09dc4c3",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam72_mc_fault = true;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1140,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "0f39c8369c12671b"
            ]
        ]
    },
    {
        "id": "b20cfb58b2af9989",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam73_mc_fault = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1950,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "87380e0dc18bac7e"
            ]
        ]
    },
    {
        "id": "8d5dd73d767d3784",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam73_hopper = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1990,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "1ba8c5ccf8934771"
            ]
        ]
    },
    {
        "id": "49e02b7d14c6c8d1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam72_mc_fault = false;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1870,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "8aab7ca5ce00f215"
            ]
        ]
    },
    {
        "id": "fb989f3a5ed0b6d0",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam72_hopper = false;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1910,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "724d1c570f796325"
            ]
        ]
    },
    {
        "id": "4a29c7461ba17632",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35_arm_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa35_arm = false;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1625,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "b7a71af368063261"
            ]
        ]
    },
    {
        "id": "508c6850880247ce",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa35_roller = false;\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1665,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "0da9a393d234e7a8"
            ]
        ]
    },
    {
        "id": "6ffec3e6a2f51634",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa35_pin_off",
        "func": "if (msg.payload.action == \"stop\") {\n    msg.payload.iaa35_pin = false;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1705,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "be461e5265e5b124"
            ]
        ]
    },
    {
        "id": "f8e325ed926eed78",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33_arm_off",
        "func": "if(msg.payload.action === \"stop\"){\n    msg.payload.iaa33_arm = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1745,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "b3fd018a45e96c4f"
            ]
        ]
    },
    {
        "id": "b3d534f622a33036",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa33_roller = false;\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1785,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "037efcd42780bdb1"
            ]
        ]
    },
    {
        "id": "99aed0118eb0ba47",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33_pin_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa33_pin = false;\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1825,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "115f49ac0db432aa"
            ]
        ]
    },
    {
        "id": "c46dcbaa47042fb7",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 79",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4516,
        "y": 1072,
        "wires": []
    },
    {
        "id": "f21da314a93c058f",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "{\"status\":\"0\"}",
        "payloadType": "json",
        "x": 4520,
        "y": 870,
        "wires": [
            [
                "5493334257079ecf"
            ]
        ]
    },
    {
        "id": "e065ec5b809bc050",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ANDON OFF",
        "func": "if (\n    msg.payload.iaa33_pin === \"0\" && msg.payload.iaa33_roller === \"0\" &&\n    msg.payload.iaa33_arm === \"0\" && msg.payload.iaa35_pin === \"0\" &&\n    msg.payload.iaa35_roller === \"0\" && msg.payload.iaa35_arm === \"0\" &&\n    msg.payload.iaa36_pin === \"0\" && msg.payload.iaa36_roller === \"0\" &&\n    msg.payload.iaa36_arm === \"0\" && msg.payload.iam72_hopper === \"0\" &&\n    msg.payload.iam72_mc_fault === \"0\" && msg.payload.iam73_hopper === \"0\" &&\n    msg.payload.iam73_mc_fault === \"0\"\n)  {\n    msg.payload = { \"status\": \"0\" };\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4170,
        "y": 830,
        "wires": [
            [
                "5493334257079ecf"
            ]
        ]
    },
    {
        "id": "afed795c1e92bd95",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1446,
        "y": 1912,
        "wires": [
            [
                "2e5a50fdcb804965"
            ]
        ]
    },
    {
        "id": "0c985c025ec1fe28",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1446,
        "y": 1952,
        "wires": [
            [
                "2e5a50fdcb804965"
            ]
        ]
    },
    {
        "id": "251d3066f9b8e6f7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1466,
        "y": 2002,
        "wires": [
            [
                "7f640e11aeb47a83"
            ]
        ]
    },
    {
        "id": "edd4912de665b56d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1466,
        "y": 2037,
        "wires": [
            [
                "7f640e11aeb47a83"
            ]
        ]
    },
    {
        "id": "95e6c470762c1d5d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1466,
        "y": 2087,
        "wires": [
            [
                "74d8aa54a2ebf258"
            ]
        ]
    },
    {
        "id": "33ace849c7a13887",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1466,
        "y": 2122,
        "wires": [
            [
                "74d8aa54a2ebf258"
            ]
        ]
    },
    {
        "id": "796ca0c806f53e58",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1436,
        "y": 2202,
        "wires": [
            [
                "75d9d1703e7ce2c7",
                "ceba73a4d9ff3251"
            ]
        ]
    },
    {
        "id": "0df24f5694665e33",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1436,
        "y": 2237,
        "wires": [
            [
                "75d9d1703e7ce2c7",
                "f8e325ed926eed78"
            ]
        ]
    },
    {
        "id": "ed228f773d4629f9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1446,
        "y": 2287,
        "wires": [
            [
                "e88cc59a1265908d",
                "156555793a39b710"
            ]
        ]
    },
    {
        "id": "1af1480e24407130",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1446,
        "y": 2322,
        "wires": [
            [
                "e88cc59a1265908d",
                "b3d534f622a33036"
            ]
        ]
    },
    {
        "id": "25d59eb9b814cf04",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa33on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1436,
        "y": 2372,
        "wires": [
            [
                "2c08ffcd2f3b8a01",
                "c6f17c4e1e8f0b9a"
            ]
        ]
    },
    {
        "id": "37f6caebf13624d1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa33off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa33off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1436,
        "y": 2407,
        "wires": [
            [
                "2c08ffcd2f3b8a01",
                "99aed0118eb0ba47"
            ]
        ]
    },
    {
        "id": "cfc1e22a0180c9c3",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2901,
        "y": 2187,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "38b6fe3b57f98eca",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2906,
        "y": 2152,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "94f0c8c3e0c55ffe",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2906,
        "y": 2277,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "930649306c96b686",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2911,
        "y": 2242,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "2f3fc3958a8b37d7",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2911,
        "y": 2367,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "6229a2758a56d865",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2916,
        "y": 2332,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "5a745d7ff5628ebb",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2901,
        "y": 2457,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "11b6749afbb83652",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2906,
        "y": 2422,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "71453c5e60c173ee",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2896,
        "y": 2542,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "d6fabee935aa9aad",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2901,
        "y": 2507,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "36841911ef98d942",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2891,
        "y": 2627,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "bb5a9bdc793230bd",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2896,
        "y": 2592,
        "wires": [
            [
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "0ad5bdc23ce98050",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "insert_iaa33",
        "func": "\nvar line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (msg.payload[0] == \"30\") {\n    line_name = 'Roller Arm IAA35'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_montiv_roller_arm_iaa_33 (id, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n};\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2016,
        "y": 382,
        "wires": [
            [
                "059081e5ec4762cf"
            ]
        ]
    },
    {
        "id": "8295949e1ce784f2",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "insert_iaa35",
        "func": "\nvar line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (msg.payload[0] == \"31\") {\n    line_name = 'Roller Arm IAA33'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_montiv_roller_arm_iaa_35 (id, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n};\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2016,
        "y": 422,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "8427be1c043a8193",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 1716,
        "y": 382,
        "wires": [
            [
                "873d8e8a926a1521"
            ]
        ]
    },
    {
        "id": "aaf6be5a6cf26094",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 80",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1386,
        "y": 2842,
        "wires": []
    },
    {
        "id": "61f7042cc04a856d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1791,
        "y": 852,
        "wires": [
            [
                "6a18d9f13e868a87"
            ]
        ]
    },
    {
        "id": "575f42c6a4992af3",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration quality_check",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1811,
        "y": 912,
        "wires": [
            [
                "1d8e73190613fc3d"
            ]
        ]
    },
    {
        "id": "99e44131f6bb09da",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1801,
        "y": 972,
        "wires": [
            [
                "e6dc60b10ab0373a"
            ]
        ]
    },
    {
        "id": "5fc53dd44465973f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1801,
        "y": 1032,
        "wires": [
            [
                "e91a14ec815557c1"
            ]
        ]
    },
    {
        "id": "3a5ca7d9d991fe47",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1816,
        "y": 1102,
        "wires": [
            [
                "933a2e3d474c8965"
            ]
        ]
    },
    {
        "id": "37f28cb168894713",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1801,
        "y": 1182,
        "wires": [
            [
                "0f931f1b8c746195"
            ]
        ]
    },
    {
        "id": "6a18d9f13e868a87",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2081,
        "y": 852,
        "wires": [
            [
                "783f0a68776f24ad"
            ]
        ]
    },
    {
        "id": "1d8e73190613fc3d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2101,
        "y": 912,
        "wires": [
            [
                "783f0a68776f24ad"
            ]
        ]
    },
    {
        "id": "e6dc60b10ab0373a",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL tool_change",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_tool_change (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2091,
        "y": 972,
        "wires": [
            [
                "783f0a68776f24ad"
            ]
        ]
    },
    {
        "id": "e91a14ec815557c1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2091,
        "y": 1032,
        "wires": [
            [
                "783f0a68776f24ad"
            ]
        ]
    },
    {
        "id": "933a2e3d474c8965",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2101,
        "y": 1092,
        "wires": [
            [
                "783f0a68776f24ad"
            ]
        ]
    },
    {
        "id": "0f931f1b8c746195",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2091,
        "y": 1152,
        "wires": [
            [
                "783f0a68776f24ad"
            ]
        ]
    },
    {
        "id": "37f0cedce35e707c",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1491,
        "y": 512,
        "wires": [
            [
                "61f7042cc04a856d"
            ]
        ]
    },
    {
        "id": "fedbd0958df27f3b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_mcfault\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1491,
        "y": 547,
        "wires": [
            [
                "61f7042cc04a856d"
            ]
        ]
    },
    {
        "id": "5266bbf57c978620",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36on_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1511,
        "y": 597,
        "wires": [
            [
                "575f42c6a4992af3"
            ]
        ]
    },
    {
        "id": "bd58b7a05b38e2ca",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36off_qualitycheck",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36off_qualitycheck\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1511,
        "y": 632,
        "wires": [
            [
                "575f42c6a4992af3"
            ]
        ]
    },
    {
        "id": "c22be0e64eb58f6b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36on_toolchange",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_toolchange\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1511,
        "y": 682,
        "wires": [
            [
                "99e44131f6bb09da"
            ]
        ]
    },
    {
        "id": "24fc8d2c9e8a4653",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam36off_toolchange",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iam36off_toolchange\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1511,
        "y": 717,
        "wires": [
            [
                "99e44131f6bb09da"
            ]
        ]
    },
    {
        "id": "5d6ba8823761c7fd",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36on_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_arm\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1481,
        "y": 802,
        "wires": [
            [
                "5fc53dd44465973f",
                "40a94dd6d8d1edfa"
            ]
        ]
    },
    {
        "id": "c03cea476ead85ce",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36off_arm",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_arm\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1481,
        "y": 837,
        "wires": [
            [
                "5fc53dd44465973f",
                "b5a885e8119acd03"
            ]
        ]
    },
    {
        "id": "c0453ffe01cb3dd6",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36on_roller",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36on_roller\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1491,
        "y": 887,
        "wires": [
            [
                "3a5ca7d9d991fe47",
                "cea9d65fee0bf3da"
            ]
        ]
    },
    {
        "id": "33b95938ea8691ee",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36off_roller",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36off_roller\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1491,
        "y": 922,
        "wires": [
            [
                "3a5ca7d9d991fe47",
                "f632e602bc48f963"
            ]
        ]
    },
    {
        "id": "4cfd1de07f4a8db6",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36on_pin",
        "func": "var data_condition;\n\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iaa36on_pin\"){\n        msg.payload = {\n            \"action\": \"start\"\n        };\n        return msg;\n}\n\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1481,
        "y": 972,
        "wires": [
            [
                "37f28cb168894713",
                "0f121d647b0adc87"
            ]
        ]
    },
    {
        "id": "7fef3fef80e00cf5",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36off_pin",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\n\nif (data_condition == \"iaa36off_pin\"){\n        msg.payload = {\n            \"action\": \"stop\"\n        };\n        return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1481,
        "y": 1007,
        "wires": [
            [
                "37f28cb168894713",
                "a6c0ddf343540818"
            ]
        ]
    },
    {
        "id": "4c7f461a88ddcdcc",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2926,
        "y": 782,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "5fa005e01dae5124",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2931,
        "y": 747,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "9f0e7432a17f6968",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2931,
        "y": 872,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "e53fe4a243f064bc",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2936,
        "y": 837,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "10a9778de785d01f",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2936,
        "y": 962,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "426ab6f2d6d04af5",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2941,
        "y": 927,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "732088d3b2aa6ebc",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2926,
        "y": 1052,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "b668f6ae931b0571",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2931,
        "y": 1017,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "51d401bb266ba56b",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2921,
        "y": 1137,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "af9aefe22152521e",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2926,
        "y": 1102,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "250b26fa8133b3bd",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2916,
        "y": 1222,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "9bab371380efb6de",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2921,
        "y": 1187,
        "wires": [
            [
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "e327e3b9e4ea71eb",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1791,
        "y": 3497,
        "wires": [
            [
                "209946a2b8a28077"
            ]
        ]
    },
    {
        "id": "e7d7606a0ddb4e83",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration hopper_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1806,
        "y": 3537,
        "wires": [
            [
                "3f83f3b09a718b21"
            ]
        ]
    },
    {
        "id": "209946a2b8a28077",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_mc_fault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2106,
        "y": 3492,
        "wires": [
            [
                "d92dec28757d29dc"
            ]
        ]
    },
    {
        "id": "3f83f3b09a718b21",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL hopper_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_hopper_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2121,
        "y": 3552,
        "wires": [
            [
                "d92dec28757d29dc"
            ]
        ]
    },
    {
        "id": "392e6f830ee89b42",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2921,
        "y": 3482,
        "wires": [
            [
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "4e5257c1a34e24c6",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2926,
        "y": 3447,
        "wires": [
            [
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "2c8a26c9206c5606",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1421,
        "y": 3462,
        "wires": [
            [
                "e327e3b9e4ea71eb",
                "1ef0f512b047c865"
            ]
        ]
    },
    {
        "id": "dc26606f69935961",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1421,
        "y": 3497,
        "wires": [
            [
                "e327e3b9e4ea71eb",
                "75d4267813fc80c7"
            ]
        ]
    },
    {
        "id": "ca2803a3547e2be6",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1441,
        "y": 3537,
        "wires": [
            [
                "e7d7606a0ddb4e83",
                "9bbc8e15f3280b58"
            ]
        ]
    },
    {
        "id": "e95b51c367b03083",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam80off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1441,
        "y": 3577,
        "wires": [
            [
                "e7d7606a0ddb4e83",
                "f72adfb2806ffc0f"
            ]
        ]
    },
    {
        "id": "eb76eed737009a05",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2936,
        "y": 3572,
        "wires": [
            [
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "ad746d6e42d907a6",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "x": 2941,
        "y": 3537,
        "wires": [
            [
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "ee1abcac7b5f9382",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 81",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1381,
        "y": 3417,
        "wires": []
    },
    {
        "id": "36c49a6edac48b97",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1421,
        "y": 3172,
        "wires": [
            [
                "d24a5121f49cfcef",
                "aa61bc5e3d674061"
            ]
        ]
    },
    {
        "id": "ec24eab5d1a5cfcb",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1421,
        "y": 3207,
        "wires": [
            [
                "d24a5121f49cfcef",
                "b20cfb58b2af9989"
            ]
        ]
    },
    {
        "id": "c42b13aff6b86fb3",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73on_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73on_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1441,
        "y": 3247,
        "wires": [
            [
                "f7acfc10c2403961",
                "5192607cf66e0540"
            ]
        ]
    },
    {
        "id": "86829717b87839c9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73off_hoppernopart",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"iam73off_hoppernopart\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1441,
        "y": 3287,
        "wires": [
            [
                "f7acfc10c2403961",
                "8d5dd73d767d3784"
            ]
        ]
    },
    {
        "id": "1c38061de572b965",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 82",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1361,
        "y": 3112,
        "wires": []
    },
    {
        "id": "40a94dd6d8d1edfa",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36_arm_on",
        "func": "if(msg.payload.action === \"start\"){\n    msg.payload.iaa36_arm = true;\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 775,
        "wires": [
            [
                "68446f38e24f57d9",
                "4de045edb465565b",
                "337d457656490d5e"
            ]
        ]
    },
    {
        "id": "cea9d65fee0bf3da",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36_roller_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa36_roller = true;\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 815,
        "wires": [
            [
                "68446f38e24f57d9",
                "4de045edb465565b",
                "27c37da7e5fbe5af"
            ]
        ]
    },
    {
        "id": "0f121d647b0adc87",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36_pin_on",
        "func": "if(msg.payload.action == \"start\"){\n    msg.payload.iaa36_pin = true;\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 855,
        "wires": [
            [
                "68446f38e24f57d9",
                "4de045edb465565b",
                "81cbcf8aeb7a84db"
            ]
        ]
    },
    {
        "id": "b5a885e8119acd03",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36_arm_off",
        "func": "if(msg.payload.action === \"stop\"){\n    msg.payload.iaa36_arm = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1505,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "0b323bf66d12fcd7"
            ]
        ]
    },
    {
        "id": "f632e602bc48f963",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36_roller_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa36_roller = false;\n    return msg;\n}\n\nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1545,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "017c393c1010ec21"
            ]
        ]
    },
    {
        "id": "a6c0ddf343540818",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iaa36_pin_off",
        "func": "if(msg.payload.action == \"stop\"){\n    msg.payload.iaa36_pin = false;\n    return msg;\n}\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3685,
        "y": 1585,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "ec6cf47f7f4815aa"
            ]
        ]
    },
    {
        "id": "9bbc8e15f3280b58",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1340,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "8b9068e15eed68ce",
                "1c4d73b10972de91"
            ]
        ]
    },
    {
        "id": "1ef0f512b047c865",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam80_mc_fault = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1300,
        "wires": [
            [
                "4de045edb465565b",
                "979c28cc3a6561b5",
                "68446f38e24f57d9"
            ]
        ]
    },
    {
        "id": "75d4267813fc80c7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam80_mc_fault = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 2035,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "909a5a6e04146867"
            ]
        ]
    },
    {
        "id": "f72adfb2806ffc0f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80_hopper_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.iam80_hopper = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 2075,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "534a4ac4d90ee582"
            ]
        ]
    },
    {
        "id": "03f8317b324b575a",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration mc_fault",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1841,
        "y": 4067,
        "wires": [
            [
                "9f427ff41c1992e9"
            ]
        ]
    },
    {
        "id": "da60e713d367043f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration ispbr3on_fullwork",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1856,
        "y": 4127,
        "wires": [
            [
                "7ed6c72d1a2fe9c9"
            ]
        ]
    },
    {
        "id": "9f427ff41c1992e9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL mc_fault",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_mcfault (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2156,
        "y": 4062,
        "wires": [
            [
                "30937aa561c540fb"
            ]
        ]
    },
    {
        "id": "7ed6c72d1a2fe9c9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL ispbr3on_fullwork",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_fullwork (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2191,
        "y": 4127,
        "wires": [
            [
                "30937aa561c540fb"
            ]
        ]
    },
    {
        "id": "2b2db905def76a77",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3off_mcfault#",
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
        "payload": "*ispbr3off_mcfault#",
        "payloadType": "str",
        "x": 2936,
        "y": 4067,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "875422b2a8858e3f",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3on_mcfault#",
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
        "payload": "*ispbr3on_mcfault#",
        "payloadType": "str",
        "x": 2941,
        "y": 4032,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "b91081eb93862cfe",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ispbr3on_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_mcfault\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1471,
        "y": 4032,
        "wires": [
            [
                "03f8317b324b575a",
                "98c3e104170944b8"
            ]
        ]
    },
    {
        "id": "466cd0225de4f953",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ispbr3off_mcfault",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_mcfault\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1471,
        "y": 4067,
        "wires": [
            [
                "03f8317b324b575a",
                "94e8892063a0f925"
            ]
        ]
    },
    {
        "id": "3037326cddabc2c3",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3on_fullwork#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_fullwork\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1471,
        "y": 4107,
        "wires": [
            [
                "da60e713d367043f",
                "245d9305fbd9e07f"
            ]
        ]
    },
    {
        "id": "04ce5c2676dff099",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3off_fullwork#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_fullwork\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1471,
        "y": 4147,
        "wires": [
            [
                "da60e713d367043f",
                "3855f0f1cdb9fd81"
            ]
        ]
    },
    {
        "id": "d151eba2c80a5c66",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3off_qualitycheck#",
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
        "payload": "*ispbr3off_qualitycheck#",
        "payloadType": "str",
        "x": 2946,
        "y": 4297,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "0a6523df05c3a7b6",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3on_qualitycheck#",
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
        "payload": "*ispbr3on_qualitycheck#",
        "payloadType": "str",
        "x": 2951,
        "y": 4262,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "6cfa5e74fc9343b4",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 83",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1436,
        "y": 3952,
        "wires": []
    },
    {
        "id": "96769cb99ff40095",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3off_qualitycheckmtc#",
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
        "payload": "*ispbr3off_qualitycheckmtc#",
        "payloadType": "str",
        "x": 2956,
        "y": 4407,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "33515ad3bd230e82",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3on_qualitycheckmtc#",
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
        "payload": "*ispbr3on_qualitycheckmtc#",
        "payloadType": "str",
        "x": 2961,
        "y": 4372,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "ef842def333b946f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3on_qualitycheck#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_qualitycheck\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1491,
        "y": 4187,
        "wires": [
            [
                "966ed376dd271ac1"
            ]
        ]
    },
    {
        "id": "023d1deda1d40749",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3off_qualitycheck#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_qualitycheck\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1491,
        "y": 4227,
        "wires": [
            [
                "966ed376dd271ac1"
            ]
        ]
    },
    {
        "id": "966ed376dd271ac1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration ispbr3on_qualitycheck",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1871,
        "y": 4202,
        "wires": [
            [
                "4180d0225240b5dc"
            ]
        ]
    },
    {
        "id": "4180d0225240b5dc",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL ispbr3on_qualitycheck",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_qualitycheck (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2206,
        "y": 4202,
        "wires": [
            [
                "30937aa561c540fb"
            ]
        ]
    },
    {
        "id": "d1c2b3627719a487",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3on_fullwork#",
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
        "payload": "*ispbr3on_fullwork#",
        "payloadType": "str",
        "x": 2936,
        "y": 4142,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "663e579fec749640",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3off_fullwork#",
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
        "payload": "*ispbr3off_fullwork#",
        "payloadType": "str",
        "x": 2931,
        "y": 4177,
        "wires": [
            [
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "dc9857262cc53c20",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3on_qualitycheckmtc#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3on_qualitycheckmtc\") {\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1501,
        "y": 4267,
        "wires": [
            [
                "f54f24c7c8c00697"
            ]
        ]
    },
    {
        "id": "bf40b93b2edc678e",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "*ispbr3off_qualitycheckmtc#",
        "func": "var data_condition;\n\ndata_condition = msg.payload;\n\nif (data_condition == \"ispbr3off_qualitycheckmtc\") {\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1501,
        "y": 4307,
        "wires": [
            [
                "f54f24c7c8c00697"
            ]
        ]
    },
    {
        "id": "f54f24c7c8c00697",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration ispbr3on_qualitycheckmtc",
        "func": "// Initialize context variables if not already set\nif (!context.state) {\n    context.state = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nswitch (action) {\n    case \"start\":\n        if (context.state.pauseTime) {\n            // Resuming from pause\n            context.state.pausedDuration += (new Date() - context.state.pauseTime);\n            context.state.pauseTime = null;\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n        } else {\n            // Starting new\n            context.state.startTime = new Date();\n            context.state.stopTime = null;\n            context.state.duration = 0; // Reset duration on start\n            context.state.pausedDuration = 0; // Reset paused duration on start\n            node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n        }\n        break;\n    \n    case \"stop\":\n        if (context.state.startTime) {\n            context.state.stopTime = new Date();\n            context.state.duration = (context.state.stopTime - context.state.startTime - context.state.pausedDuration) / 1000; // Calculate duration in seconds\n            msg.payload = { duration: context.state.duration };\n            node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.state.duration} sec` });\n            return msg; // Send message with the duration\n        }\n        break;\n    \n    case \"pause\":\n        if (context.state.startTime && !context.state.pauseTime) {\n            context.state.pauseTime = new Date();\n            node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n        }\n        break;\n    \n    case \"reset\":\n        context.state.startTime = null;\n        context.state.stopTime = null;\n        context.state.pauseTime = null;\n        context.state.duration = 0;\n        context.state.pausedDuration = 0;\n        node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n        break;\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1881,
        "y": 4282,
        "wires": [
            [
                "be56e49cd0e63ade"
            ]
        ]
    },
    {
        "id": "be56e49cd0e63ade",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL ispbr3on_qualitycheckmtc",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_ispbr3on_qualitycheckmtc (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2236,
        "y": 4282,
        "wires": [
            [
                "30937aa561c540fb"
            ]
        ]
    },
    {
        "id": "98c3e104170944b8",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ispbr3_mc_fault_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.ispbr3_mc_fault = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1385,
        "wires": [
            [
                "4de045edb465565b",
                "68446f38e24f57d9",
                "86c2f317cbb5c1f0"
            ]
        ]
    },
    {
        "id": "94e8892063a0f925",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ispbr3_mc_fault_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.ispbr3_mc_fault = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 2115,
        "wires": [
            [
                "4de045edb465565b",
                "e065ec5b809bc050",
                "ef16a6c7f35051cc"
            ]
        ]
    },
    {
        "id": "245d9305fbd9e07f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ispbr3_fullwork_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.ispbr3_fullwork = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3695,
        "y": 1430,
        "wires": [
            [
                "4de045edb465565b",
                "22e2fed50b6fde08"
            ]
        ]
    },
    {
        "id": "3855f0f1cdb9fd81",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "ispbr3_fullwork_off",
        "func": "if(msg.payload.action == 'stop'){\n    msg.payload.ispbr3_fullwork = false;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 3693,
        "y": 2154,
        "wires": [
            [
                "4de045edb465565b",
                "1b4062e317de888b"
            ]
        ]
    },
    {
        "id": "d319c31df527cebb",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "get_loading_time_iaa35_on",
        "func": "var data_condition;\ndata_condition = msg.payload[0];\nif (data_condition == \"30\"){\n    msg.payload = {\n        \"action\": \"start\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2261,
        "y": 292,
        "wires": [
            [
                "3786ef0fbdaa2b09"
            ]
        ]
    },
    {
        "id": "017970ab6671e6ba",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "get_loading_time_iaa35_off",
        "func": "var data_condition;\ndata_condition = msg.payload[0];\nif (data_condition == \"30-off\"){\n    msg.payload = {\n        \"action\": \"stop\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2261,
        "y": 327,
        "wires": [
            [
                "3786ef0fbdaa2b09"
            ]
        ]
    },
    {
        "id": "e9cc3636091fc89c",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "30,1,2,3,4,5,6,7,",
        "payloadType": "str",
        "x": 1746,
        "y": 262,
        "wires": [
            [
                "4cc5d50d423a4c28"
            ]
        ]
    },
    {
        "id": "08835f98ca25309b",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "30-off,1,2,3,4,5,6,7,",
        "payloadType": "str",
        "x": 1756,
        "y": 297,
        "wires": [
            [
                "4cc5d50d423a4c28"
            ]
        ]
    },
    {
        "id": "5d09f554aed49e61",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "get_loading_time_iaa35_pause",
        "func": "var data_condition;\ndata_condition = msg.payload[0];\nif (data_condition == \"30-pause\"){\n    msg.payload = {\n        \"action\": \"pause\"\n    };\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2271,
        "y": 362,
        "wires": [
            [
                "3786ef0fbdaa2b09"
            ]
        ]
    },
    {
        "id": "45a4170a942abf44",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "30-pause,1,2,3,4,5,6,7,",
        "payloadType": "str",
        "x": 1766,
        "y": 332,
        "wires": [
            [
                "4cc5d50d423a4c28"
            ]
        ]
    },
    {
        "id": "3786ef0fbdaa2b09",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "get_loading_time_iaa35",
        "func": "// Initialize context variables if not already set\nif (!context.startTime) {\n    context.startTime = null;\n}\nif (!context.stopTime) {\n    context.stopTime = null;\n}\nif (!context.pauseTime) {\n    context.pauseTime = null;\n}\nif (!context.duration) {\n    context.duration = 0;\n}\nif (!context.pausedDuration) {\n    context.pausedDuration = 0;\n}\nif (!context.interval) {\n    context.interval = null;\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.pauseTime) {\n        // Resuming from pause\n        context.pausedDuration += (new Date() - context.pauseTime);\n        context.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.startTime = new Date();\n        context.stopTime = null;\n        context.duration = 0; // Reset duration on start\n        context.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n\n        // Clear any existing interval\n        if (context.interval) {\n            clearInterval(context.interval);\n        }\n\n        // Start a new interval to update the running time\n        context.interval = setInterval(() => {\n            if (context.startTime) {\n                let currentTime = new Date();\n                let runningTime = (currentTime - context.startTime - context.pausedDuration) / 1000; // Convert to seconds\n                let displayTime = Math.floor(runningTime); // Round to nearest second\n                node.status({ fill: \"green\", shape: \"dot\", text: `Running: ${displayTime} sec` });\n                \n                // Output the current running time to a debug or another node\n                msg.payload = { runningTime: displayTime };\n                node.send(msg); // Send message with current running time\n            }\n        }, 1000); // Update every second\n    }\n} else if (action === \"stop\") {\n    if (context.startTime) {\n        context.stopTime = new Date();\n        context.duration = (context.stopTime - context.startTime - context.pausedDuration) / 1000; // Calculate total duration in seconds\n\n        // Clear the interval when stopping\n        if (context.interval) {\n            clearInterval(context.interval);\n            context.interval = null;\n        }\n\n        msg.payload = { duration: context.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.duration} sec` });\n        return msg; // Send message with the total duration\n    }\n} else if (action === \"pause\") {\n    if (context.startTime && !context.pauseTime) {\n        context.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n\n        // Clear the interval while paused\n        if (context.interval) {\n            clearInterval(context.interval);\n            context.interval = null;\n        }\n    }\n} else if (action === \"reset\") {\n    context.startTime = null;\n    context.stopTime = null;\n    context.pauseTime = null;\n    context.duration = 0;\n    context.pausedDuration = 0;\n\n    // Clear the interval on reset\n    if (context.interval) {\n        clearInterval(context.interval);\n        context.interval = null;\n    }\n\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 2,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2561,
        "y": 192,
        "wires": [
            [
                "98cd9e6c15f773de",
                "d73c4f1b8a2a91ab"
            ]
        ]
    },
    {
        "id": "98cd9e6c15f773de",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL get_loading_time",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_loading_time (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2861,
        "y": 362,
        "wires": [
            [
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "d73c4f1b8a2a91ab",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "update_loading_time_persecond",
        "func": "var getObj;\ngetObj = msg.payload.runningTime;\n\nif (getObj) {\n    let sql = `INSERT INTO timer_durations_loading_time_persecond (timer_id, duration) VALUES (1, ${getObj})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2856,
        "y": 317,
        "wires": [
            [
                "727ed4c88a05c8f8",
                "4c7d071467db7c5d"
            ]
        ]
    },
    {
        "id": "727ed4c88a05c8f8",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 86",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.runningTime",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3071,
        "y": 287,
        "wires": []
    },
    {
        "id": "45ea86c4db04f369",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*^iaa36^data^#",
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
        "payload": "*^iaa36^1^1^1^0^1^0^1^#",
        "payloadType": "str",
        "x": 216,
        "y": 482,
        "wires": [
            [
                "3c20511b16befb6f"
            ]
        ]
    },
    {
        "id": "792759bbe4493b1c",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "parsing IAA36",
        "func": "\nif(msg.payload[1] === \"iaa36\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 496,
        "y": 267,
        "wires": [
            [
                "4d391d1a8cf4f2e2",
                "119e854567e3a928",
                "86186938747531bd",
                "7e5216534a2c76d9",
                "43c923c65fba381a",
                "51f344690d299054",
                "681d85110cfffb0b",
                "7f3634020de643c6",
                "652114a977b45806",
                "d42a2b3b0baf3fa5",
                "bcb524442ce6e532",
                "ba72cf0468e97137",
                "a9337c307e98127b",
                "0e5914c730efcbca",
                "bce8a9a5b3c72521"
            ]
        ]
    },
    {
        "id": "8d9bf53b167b336b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "Parsed Data Output",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 500,
        "y": 80,
        "wires": []
    },
    {
        "id": "02b3515d5677c70a",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 154",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 297,
        "wires": []
    },
    {
        "id": "4d391d1a8cf4f2e2",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 155",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 262,
        "wires": []
    },
    {
        "id": "25d32460496af816",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 156",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 372,
        "wires": []
    },
    {
        "id": "119e854567e3a928",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iaa36on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 322,
        "wires": [
            [
                "02b3515d5677c70a",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "86186938747531bd",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"*iaa36off_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 357,
        "wires": [
            [
                "4c0e508e63c39f48",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "4c0e508e63c39f48",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 157",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 332,
        "wires": []
    },
    {
        "id": "34ddb731483d0216",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAA36",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 676,
        "y": 282,
        "wires": []
    },
    {
        "id": "7e5216534a2c76d9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iaa36on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 412,
        "wires": [
            [
                "25d32460496af816",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "43c923c65fba381a",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"*iaa36off_fullwork#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 447,
        "wires": [
            [
                "2ab2bcf7cec5748b",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "2ab2bcf7cec5748b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 158",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 412,
        "wires": []
    },
    {
        "id": "ee704eac4aa05b25",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 159",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 462,
        "wires": []
    },
    {
        "id": "51f344690d299054",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"*iaa36on_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 502,
        "wires": [
            [
                "ee704eac4aa05b25",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "f66e579a6540ffec",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 160",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 502,
        "wires": []
    },
    {
        "id": "681d85110cfffb0b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"*iaa36off_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 537,
        "wires": [
            [
                "f66e579a6540ffec",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "652114a977b45806",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"*iaa36off_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 632,
        "wires": [
            [
                "ee4137e4df96f0a5",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "7f3634020de643c6",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"*iaa36on_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 597,
        "wires": [
            [
                "970a5f5161091197",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "d42a2b3b0baf3fa5",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iaa36on_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 692,
        "wires": [
            [
                "1eb3ab746efd4d58",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "bcb524442ce6e532",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iaa36off_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 727,
        "wires": [
            [
                "fc3796c758ce3413",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "970a5f5161091197",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 161",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 552,
        "wires": []
    },
    {
        "id": "ee4137e4df96f0a5",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 162",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 592,
        "wires": []
    },
    {
        "id": "1eb3ab746efd4d58",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 163",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 642,
        "wires": []
    },
    {
        "id": "fc3796c758ce3413",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 164",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 682,
        "wires": []
    },
    {
        "id": "ba72cf0468e97137",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"*iaa36on_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 887,
        "wires": [
            [
                "d9670975544be6b2",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "a9337c307e98127b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"*iaa36off_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 922,
        "wires": [
            [
                "14866882914ae636",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "d9670975544be6b2",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 165",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 827,
        "wires": []
    },
    {
        "id": "14866882914ae636",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 166",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 867,
        "wires": []
    },
    {
        "id": "0e5914c730efcbca",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"*iaa36on_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 787,
        "wires": [
            [
                "156a1f4782ad2002",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "bce8a9a5b3c72521",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"*iaa36off_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 822,
        "wires": [
            [
                "fe2740f12e501cee",
                "4a9c3f285d858baa"
            ]
        ]
    },
    {
        "id": "156a1f4782ad2002",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 167",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 906,
        "y": 737,
        "wires": []
    },
    {
        "id": "fe2740f12e501cee",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 168",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 906,
        "y": 777,
        "wires": []
    },
    {
        "id": "a2ae74ce4e89c7f5",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "parsing IAA35",
        "func": "\nif(msg.payload[1] === \"iaa35\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 491,
        "y": 1017,
        "wires": [
            [
                "6798cd5cbb1176ba",
                "5573969c242da2cf",
                "f8703b50f43dba66",
                "fbe13b3009e09a06",
                "9311601cba1afc35",
                "b55ababe4aa781bc",
                "fd9783e24b6dfdde",
                "c47f2e0f6d745f36",
                "31e2af1d81d2b8c8",
                "507dab5bbe260d1f",
                "df58acdf6120a9db",
                "48a87e0878bad956",
                "88f16b5237dcd1d5",
                "07653229efb5b7dd",
                "4138e3dee4eb6686"
            ]
        ]
    },
    {
        "id": "a187f1f4814506f9",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 169",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1047,
        "wires": []
    },
    {
        "id": "6798cd5cbb1176ba",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 170",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1012,
        "wires": []
    },
    {
        "id": "0df5c3fe11e08561",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 171",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1122,
        "wires": []
    },
    {
        "id": "5573969c242da2cf",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iaa35on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 1072,
        "wires": [
            [
                "a187f1f4814506f9",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "f8703b50f43dba66",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"*iaa35off_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 1107,
        "wires": [
            [
                "804fe906e74c6d13",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "804fe906e74c6d13",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 172",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1082,
        "wires": []
    },
    {
        "id": "7c6294a23a76f0c2",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAA35",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 671,
        "y": 1032,
        "wires": []
    },
    {
        "id": "fbe13b3009e09a06",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iaa35on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 1162,
        "wires": [
            [
                "0df5c3fe11e08561",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "9311601cba1afc35",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"*iaa35off_fullwork#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 1197,
        "wires": [
            [
                "787879fa28cbf24e",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "787879fa28cbf24e",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 173",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1162,
        "wires": []
    },
    {
        "id": "d34562ac3e9c8f15",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 174",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1212,
        "wires": []
    },
    {
        "id": "b55ababe4aa781bc",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"*iaa35on_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 701,
        "y": 1252,
        "wires": [
            [
                "d34562ac3e9c8f15",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "ec654c2937bcd0ea",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 175",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1252,
        "wires": []
    },
    {
        "id": "fd9783e24b6dfdde",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"*iaa35off_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 701,
        "y": 1287,
        "wires": [
            [
                "ec654c2937bcd0ea",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "31e2af1d81d2b8c8",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"*iaa35off_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 701,
        "y": 1382,
        "wires": [
            [
                "b2eab130addc641e",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "c47f2e0f6d745f36",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"*iaa35on_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 701,
        "y": 1347,
        "wires": [
            [
                "420578d620f68f4c",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "507dab5bbe260d1f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iaa35on_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 671,
        "y": 1442,
        "wires": [
            [
                "ddb12d115c19a1a5",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "df58acdf6120a9db",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iaa35off_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 671,
        "y": 1477,
        "wires": [
            [
                "2f719ed454b33cc6",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "420578d620f68f4c",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 176",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1302,
        "wires": []
    },
    {
        "id": "b2eab130addc641e",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 177",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1342,
        "wires": []
    },
    {
        "id": "ddb12d115c19a1a5",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 178",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1392,
        "wires": []
    },
    {
        "id": "2f719ed454b33cc6",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 179",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1432,
        "wires": []
    },
    {
        "id": "48a87e0878bad956",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"*iaa35on_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 671,
        "y": 1637,
        "wires": [
            [
                "bb2192205bb48270",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "88f16b5237dcd1d5",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"*iaa35off_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 671,
        "y": 1672,
        "wires": [
            [
                "a46292200518f79d",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "bb2192205bb48270",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 180",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1577,
        "wires": []
    },
    {
        "id": "a46292200518f79d",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 181",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 1617,
        "wires": []
    },
    {
        "id": "07653229efb5b7dd",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"*iaa35on_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 1537,
        "wires": [
            [
                "8a66f192e8b5d661",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "4138e3dee4eb6686",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"*iaa35off_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 1572,
        "wires": [
            [
                "6916109d6851b970",
                "a59db757e42dcc8d"
            ]
        ]
    },
    {
        "id": "8a66f192e8b5d661",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 182",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 901,
        "y": 1487,
        "wires": []
    },
    {
        "id": "6916109d6851b970",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 183",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 901,
        "y": 1527,
        "wires": []
    },
    {
        "id": "d870e46e39b76ab8",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "parsing IAA33",
        "func": "\nif(msg.payload[1] === \"iaa33\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 496,
        "y": 1787,
        "wires": [
            [
                "51014fe0bb10397b",
                "999d94e5ef244d96",
                "ce0cd79b60997885",
                "bdb25b05d11ed90a",
                "c9d050780ec46298",
                "decb3ac2ead6a80d",
                "afcc71303da048ce",
                "28ec891e36daa231",
                "04fd8db71c060211",
                "c2e03862f2b5e9fd",
                "d170841c1d521c14",
                "a0aa584828b1bd23",
                "894aa9f12d1ccb89",
                "26353738c589aeae",
                "45adf98a0b5f68b4"
            ]
        ]
    },
    {
        "id": "d43041c882bb28af",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 184",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 1817,
        "wires": []
    },
    {
        "id": "51014fe0bb10397b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 185",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 1782,
        "wires": []
    },
    {
        "id": "4eceb3342a690b6b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 186",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 1892,
        "wires": []
    },
    {
        "id": "999d94e5ef244d96",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iaa33on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 1842,
        "wires": [
            [
                "d43041c882bb28af",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "ce0cd79b60997885",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"*iaa33off_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 1877,
        "wires": [
            [
                "418c6d7e8add80b5",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "418c6d7e8add80b5",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 187",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 1852,
        "wires": []
    },
    {
        "id": "5afd5cc96dc4894f",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAA33",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 676,
        "y": 1802,
        "wires": []
    },
    {
        "id": "bdb25b05d11ed90a",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iaa33on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 1932,
        "wires": [
            [
                "4eceb3342a690b6b",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "c9d050780ec46298",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"*iaa33off_fullwork#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 1967,
        "wires": [
            [
                "2f1994e8b84add1e",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "2f1994e8b84add1e",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 188",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 1932,
        "wires": []
    },
    {
        "id": "b7fe52fc3dd3ab50",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 189",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 1982,
        "wires": []
    },
    {
        "id": "decb3ac2ead6a80d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"*iaa33on_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 2022,
        "wires": [
            [
                "b7fe52fc3dd3ab50",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "caef17a403826a27",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 190",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2022,
        "wires": []
    },
    {
        "id": "afcc71303da048ce",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"*iaa33off_qualitycheck#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 2057,
        "wires": [
            [
                "caef17a403826a27",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "04fd8db71c060211",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"*iaa33off_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 2152,
        "wires": [
            [
                "0c058aae7cb52891",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "28ec891e36daa231",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"*iaa33on_toolchange#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 2117,
        "wires": [
            [
                "96a6f637e36d68ec",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "c2e03862f2b5e9fd",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iaa33on_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 2212,
        "wires": [
            [
                "54da9cc984cb51bf",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "d170841c1d521c14",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iaa33off_arm#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 2247,
        "wires": [
            [
                "79c2ee7c072cc371",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "96a6f637e36d68ec",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 191",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2072,
        "wires": []
    },
    {
        "id": "0c058aae7cb52891",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 192",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2112,
        "wires": []
    },
    {
        "id": "54da9cc984cb51bf",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 193",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2162,
        "wires": []
    },
    {
        "id": "79c2ee7c072cc371",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 194",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2202,
        "wires": []
    },
    {
        "id": "a0aa584828b1bd23",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"*iaa33on_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 2407,
        "wires": [
            [
                "20ad187c1833e054",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "894aa9f12d1ccb89",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"*iaa33off_pin#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 2442,
        "wires": [
            [
                "132ddb038cc8ae1b",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "20ad187c1833e054",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 195",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2347,
        "wires": []
    },
    {
        "id": "132ddb038cc8ae1b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 196",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2387,
        "wires": []
    },
    {
        "id": "26353738c589aeae",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"*iaa33on_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 2307,
        "wires": [
            [
                "d082fb65870126d8",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "45adf98a0b5f68b4",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"*iaa33off_roller#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 2342,
        "wires": [
            [
                "38ca761675d347ec",
                "70e0bab056707dc9"
            ]
        ]
    },
    {
        "id": "d082fb65870126d8",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 197",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 906,
        "y": 2257,
        "wires": []
    },
    {
        "id": "38ca761675d347ec",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 198",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 906,
        "y": 2297,
        "wires": []
    },
    {
        "id": "849cf17be95ab39b",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*^iam72^data^#",
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
        "payload": "*^iam80^0^0^0^#",
        "payloadType": "str",
        "x": 211,
        "y": 527,
        "wires": [
            [
                "3c20511b16befb6f"
            ]
        ]
    },
    {
        "id": "9a5440ed37e52d0b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "parsing IAM72",
        "func": "\nif(msg.payload[1] === \"iam72\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 496,
        "y": 2557,
        "wires": [
            [
                "6cc8fd6bf3774a39",
                "bbfdf7097110dd14",
                "e0b6d11f46bd4940",
                "c3f348f09002e28d",
                "df31a787e93d71bd",
                "70082fc63a50a955",
                "f430f6314dbc09b4"
            ]
        ]
    },
    {
        "id": "2ae0c99a3dcb1b06",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 199",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2587,
        "wires": []
    },
    {
        "id": "6cc8fd6bf3774a39",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 200",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2552,
        "wires": []
    },
    {
        "id": "bbfdf7097110dd14",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iam72on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 2612,
        "wires": [
            [
                "2ae0c99a3dcb1b06",
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "e0b6d11f46bd4940",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*iam72off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 2647,
        "wires": [
            [
                "53c78f118060f704",
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "53c78f118060f704",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 201",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2622,
        "wires": []
    },
    {
        "id": "da161436145db9bd",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAM72",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 676,
        "y": 2572,
        "wires": []
    },
    {
        "id": "c3f348f09002e28d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iam72on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 2707,
        "wires": [
            [
                "1057da5d5d9a6e7b",
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "df31a787e93d71bd",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*iam72off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 2742,
        "wires": [
            [
                "21240f3ffbc263d9",
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "1057da5d5d9a6e7b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 202",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2657,
        "wires": []
    },
    {
        "id": "21240f3ffbc263d9",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 203",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2692,
        "wires": []
    },
    {
        "id": "70082fc63a50a955",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iam72on_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 2802,
        "wires": [
            [
                "dc93bebc90571baa",
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "f430f6314dbc09b4",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iam72off_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 706,
        "y": 2837,
        "wires": [
            [
                "3018284d820c849c",
                "94b2879d647a75f2"
            ]
        ]
    },
    {
        "id": "3018284d820c849c",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 204",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2762,
        "wires": []
    },
    {
        "id": "dc93bebc90571baa",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 205",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 2727,
        "wires": []
    },
    {
        "id": "1bee06f0d84281d4",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "parsing IAM73",
        "func": "\nif(msg.payload[1] === \"iam73\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 491,
        "y": 2942,
        "wires": [
            [
                "cab1f81b702f4423",
                "dc6487ee6d8a0351",
                "8bee6deabbc015db",
                "be0b2ff6ac97b1a7",
                "6277f308b9060c96",
                "f85bbfa8cda50eef",
                "8f20719247816d88"
            ]
        ]
    },
    {
        "id": "18459e97f4e76dd9",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 206",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 2972,
        "wires": []
    },
    {
        "id": "cab1f81b702f4423",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 207",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 2937,
        "wires": []
    },
    {
        "id": "dc6487ee6d8a0351",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iam73on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 2997,
        "wires": [
            [
                "18459e97f4e76dd9",
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "8bee6deabbc015db",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*iam73off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 3032,
        "wires": [
            [
                "df93b917f1b8998e",
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "df93b917f1b8998e",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 208",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 3007,
        "wires": []
    },
    {
        "id": "6b8f15b5fa2e2817",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAM73",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 671,
        "y": 2957,
        "wires": []
    },
    {
        "id": "be0b2ff6ac97b1a7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iam73on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 3092,
        "wires": [
            [
                "d931b37c1fa74895",
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "6277f308b9060c96",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*iam73off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 681,
        "y": 3127,
        "wires": [
            [
                "e2cc0dca025e873b",
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "d931b37c1fa74895",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 209",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 3042,
        "wires": []
    },
    {
        "id": "e2cc0dca025e873b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 210",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 3077,
        "wires": []
    },
    {
        "id": "f85bbfa8cda50eef",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iam73on_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 701,
        "y": 3187,
        "wires": [
            [
                "dde11c8bc5c8d37f",
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "8f20719247816d88",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iam73off_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 701,
        "y": 3222,
        "wires": [
            [
                "5feda155e44409d4",
                "bf0f3f9c63f35041"
            ]
        ]
    },
    {
        "id": "5feda155e44409d4",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 211",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 3147,
        "wires": []
    },
    {
        "id": "dde11c8bc5c8d37f",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 212",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 891,
        "y": 3112,
        "wires": []
    },
    {
        "id": "f62cb4224d64e9f0",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "parsing IAM80",
        "func": "\nif(msg.payload[1] === \"iam80\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 486,
        "y": 3342,
        "wires": [
            [
                "4fdc75e96471d90b",
                "934731f88bd73a75",
                "c810b117f1b41d27",
                "ae421634061b2bef",
                "99f91b8f14822528",
                "bb5f51c97a5cd0db",
                "ebdd8a4c8b018ec9"
            ]
        ]
    },
    {
        "id": "9e7bc48f48fac224",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 213",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 886,
        "y": 3372,
        "wires": []
    },
    {
        "id": "4fdc75e96471d90b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 214",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 886,
        "y": 3337,
        "wires": []
    },
    {
        "id": "934731f88bd73a75",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*iam80on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 3397,
        "wires": [
            [
                "9e7bc48f48fac224",
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "c810b117f1b41d27",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*iam80off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 3432,
        "wires": [
            [
                "8a1d2dce7a3e69b1",
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "8a1d2dce7a3e69b1",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 215",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 886,
        "y": 3407,
        "wires": []
    },
    {
        "id": "394ac7feea6dafb4",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAM80",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 666,
        "y": 3357,
        "wires": []
    },
    {
        "id": "ae421634061b2bef",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*iam80on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 3492,
        "wires": [
            [
                "7efebcc9999fa9bd",
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "99f91b8f14822528",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*iam80off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 676,
        "y": 3527,
        "wires": [
            [
                "99ee30f3f7c2cdcf",
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "7efebcc9999fa9bd",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 216",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 886,
        "y": 3442,
        "wires": []
    },
    {
        "id": "99ee30f3f7c2cdcf",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 217",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 886,
        "y": 3477,
        "wires": []
    },
    {
        "id": "bb5f51c97a5cd0db",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"*iam80on_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 696,
        "y": 3587,
        "wires": [
            [
                "e8d776dca16248ad",
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "ebdd8a4c8b018ec9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"*iam80off_hoppernopart#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 696,
        "y": 3622,
        "wires": [
            [
                "eae2b72f7355213a",
                "5037a7307f812b60"
            ]
        ]
    },
    {
        "id": "eae2b72f7355213a",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 218",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 886,
        "y": 3547,
        "wires": []
    },
    {
        "id": "e8d776dca16248ad",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 219",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 886,
        "y": 3512,
        "wires": []
    },
    {
        "id": "a5060545f111b75b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "parsing ISPBR3",
        "func": "\nif(msg.payload[1] === \"ispbr3\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 496,
        "y": 3772,
        "wires": [
            [
                "4417dfb6c1184573",
                "34dbae411b013ade",
                "90f3ba906d18f252",
                "ad866e8cd1627c4f",
                "2b51eda1b14dc01f"
            ]
        ]
    },
    {
        "id": "6a7c778730d4e9c1",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 220",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 3802,
        "wires": []
    },
    {
        "id": "4417dfb6c1184573",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 221",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 730,
        "y": 3720,
        "wires": []
    },
    {
        "id": "34dbae411b013ade",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"*ispbr3on_mcfault#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 3827,
        "wires": [
            [
                "6a7c778730d4e9c1",
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "90f3ba906d18f252",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"*ispbr3off_mcfault#\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 3862,
        "wires": [
            [
                "2a8eb4c2c8bbf3ef",
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "2a8eb4c2c8bbf3ef",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 222",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 3837,
        "wires": []
    },
    {
        "id": "2f22c57ddf2d6f4b",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "ISPBR3",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 676,
        "y": 3787,
        "wires": []
    },
    {
        "id": "ad866e8cd1627c4f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"*ispbr3on_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 3922,
        "wires": [
            [
                "3b04c1d2d0ac6c13",
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "2b51eda1b14dc01f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"*ispbr3off_fullwork#\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 686,
        "y": 3957,
        "wires": [
            [
                "4cf7210c136cda3c",
                "e658bf1095402a5f"
            ]
        ]
    },
    {
        "id": "3b04c1d2d0ac6c13",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 223",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 3872,
        "wires": []
    },
    {
        "id": "4cf7210c136cda3c",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 224",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 896,
        "y": 3907,
        "wires": []
    },
    {
        "id": "ccae9d10d1b2e3da",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "*^ispbr3^data^#",
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
        "payload": "*^ispbr3^1^1^0^#",
        "payloadType": "str",
        "x": 211,
        "y": 572,
        "wires": [
            [
                "3c20511b16befb6f"
            ]
        ]
    },
    {
        "id": "51ac5058e6d5eacd",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 225",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4780,
        "y": 705,
        "wires": []
    },
    {
        "id": "092fa90ea181515f",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 226",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4780,
        "y": 910,
        "wires": []
    },
    {
        "id": "337d457656490d5e",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 227",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa36_arm",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 40,
        "wires": []
    },
    {
        "id": "45b4af81c0652236",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "D31E ON",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": "",
        "topic": "",
        "payload": "*^andonNR^on^#",
        "payloadType": "str",
        "x": 5020,
        "y": 1116,
        "wires": [
            [
                "5d015e6ebd303b18"
            ]
        ]
    },
    {
        "id": "41ea17ae7c09a4b6",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "D31E OFF",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": "",
        "topic": "",
        "payload": "*^andonNR^off^#",
        "payloadType": "str",
        "x": 5020,
        "y": 1156,
        "wires": [
            [
                "5d015e6ebd303b18"
            ]
        ]
    },
    {
        "id": "5d015e6ebd303b18",
        "type": "mqtt out",
        "z": "e0eb1e3689d12af2",
        "name": "",
        "topic": "oee_commands",
        "qos": "",
        "retain": "",
        "respTopic": "",
        "contentType": "",
        "userProps": "",
        "correl": "",
        "expiry": "",
        "broker": "ea9a9cb2e2bd0379",
        "x": 5340,
        "y": 1300,
        "wires": []
    },
    {
        "id": "27c37da7e5fbe5af",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 248",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa36_roller",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 80,
        "wires": []
    },
    {
        "id": "81cbcf8aeb7a84db",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 249",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa36_pin",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 120,
        "wires": []
    },
    {
        "id": "a34012b984f30970",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 250",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa35_arm",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 160,
        "wires": []
    },
    {
        "id": "49b81f84539b911a",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 251",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa35_roller",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 200,
        "wires": []
    },
    {
        "id": "8f1358c68a70541c",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 252",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa35_pin",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 240,
        "wires": []
    },
    {
        "id": "1a1b8b918a68fe53",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 253",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa33_arm",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 280,
        "wires": []
    },
    {
        "id": "943cc64e2511a884",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 254",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa33_roller",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 320,
        "wires": []
    },
    {
        "id": "22cbb453e17eeed1",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 255",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa33_pin",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 360,
        "wires": []
    },
    {
        "id": "0f39c8369c12671b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 256",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam72_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 400,
        "wires": []
    },
    {
        "id": "c3f712fa0fc80f91",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 257",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam72_hopper",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 440,
        "wires": []
    },
    {
        "id": "dccad9802994ebe7",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 258",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam73_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 480,
        "wires": []
    },
    {
        "id": "f6ea6820ad6574ba",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 259",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam73_hopper",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 520,
        "wires": []
    },
    {
        "id": "979c28cc3a6561b5",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 260",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam80_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 560,
        "wires": []
    },
    {
        "id": "8b9068e15eed68ce",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 261",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam80_hopper",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 600,
        "wires": []
    },
    {
        "id": "86c2f317cbb5c1f0",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 262",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.ispbr3_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 640,
        "wires": []
    },
    {
        "id": "22e2fed50b6fde08",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 263",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.ispbr3_fullwork",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3954,
        "y": 680,
        "wires": []
    },
    {
        "id": "0b323bf66d12fcd7",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 264",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa36_arm",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2284,
        "wires": []
    },
    {
        "id": "017c393c1010ec21",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 265",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa36_roller",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2324,
        "wires": []
    },
    {
        "id": "ec6cf47f7f4815aa",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 266",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa36_pin",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2364,
        "wires": []
    },
    {
        "id": "b7a71af368063261",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 267",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa35_arm",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2404,
        "wires": []
    },
    {
        "id": "0da9a393d234e7a8",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 268",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa35_roller",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2444,
        "wires": []
    },
    {
        "id": "be461e5265e5b124",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 269",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa35_pin",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2484,
        "wires": []
    },
    {
        "id": "b3fd018a45e96c4f",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 270",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa33_arm",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2524,
        "wires": []
    },
    {
        "id": "037efcd42780bdb1",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 271",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa33_roller",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2564,
        "wires": []
    },
    {
        "id": "115f49ac0db432aa",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 272",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iaa33_pin",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2604,
        "wires": []
    },
    {
        "id": "8aab7ca5ce00f215",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 273",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam72_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2644,
        "wires": []
    },
    {
        "id": "724d1c570f796325",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 274",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam72_hopper",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2684,
        "wires": []
    },
    {
        "id": "87380e0dc18bac7e",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 275",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam73_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2724,
        "wires": []
    },
    {
        "id": "1ba8c5ccf8934771",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 276",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam73_hopper",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2764,
        "wires": []
    },
    {
        "id": "909a5a6e04146867",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 277",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam80_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2804,
        "wires": []
    },
    {
        "id": "534a4ac4d90ee582",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 278",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.iam80_hopper",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2844,
        "wires": []
    },
    {
        "id": "ef16a6c7f35051cc",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 279",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.ispbr3_mc_fault",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2884,
        "wires": []
    },
    {
        "id": "1b4062e317de888b",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 280",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload.ispbr3_fullwork",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 3938,
        "y": 2924,
        "wires": []
    },
    {
        "id": "ba8b1b8138f77d18",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "Serial_IN",
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
        "x": 180,
        "y": 60,
        "wires": [
            []
        ]
    },
    {
        "id": "0c3365793984ac6a",
        "type": "mqtt in",
        "z": "e0eb1e3689d12af2",
        "name": "",
        "topic": "oee_status",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "ea9a9cb2e2bd0379",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 4420,
        "y": 1800,
        "wires": [
            [
                "9939227e979acdd7",
                "904daed8eb2b34fc",
                "3c20511b16befb6f"
            ]
        ]
    },
    {
        "id": "54e2cf6ab212516b",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "Reset",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 5134,
        "y": 1852,
        "wires": [
            [
                "fd97e3c034948f6b"
            ]
        ]
    },
    {
        "id": "3732353b1c90b92f",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "IAM72_ON",
        "func": "if (!flow.get(\"input1Sent\")) {\n    \n    flow.set(\"input1Sent\", true);\n    return { payload: true, topic: \"nr\" };\n    \n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "flow.set(\"input1Sent\", false);",
        "finalize": "",
        "libs": [],
        "x": 4442,
        "y": 1312,
        "wires": [
            [
                "7ecbc5a34ff4e3ec"
            ]
        ]
    },
    {
        "id": "51787370be82d06e",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "IAM73_ON",
        "func": "if (!flow.get(\"input2Sent\")) {\n    flow.set(\"input2Sent\", true);\n    return { payload: true, topic: \"nr\" };\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "flow.set(\"input2Sent\", false);",
        "finalize": "",
        "libs": [],
        "x": 4442,
        "y": 1348,
        "wires": [
            [
                "7ecbc5a34ff4e3ec"
            ]
        ]
    },
    {
        "id": "fd97e3c034948f6b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Reset Inputs",
        "func": "// Reset both input statuses\nflow.set(\"input1Sent\", false);\nflow.set(\"input2Sent\", false);\nflow.set(\"input3Sent\", false);\nreturn { payload: \"Inputs reset, ready to send again.\" };",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 5314,
        "y": 1852,
        "wires": [
            []
        ]
    },
    {
        "id": "1c4d73b10972de91",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "IAM80_ON",
        "func": "if (!flow.get(\"input3Sent\")) {\n    msg.topic = true;\n    flow.set(\"input3Sent\", true);\n    return { payload: true, topic: \"d31e\" };\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "flow.set(\"input2Sent\", false);",
        "finalize": "",
        "libs": [],
        "x": 4442,
        "y": 1384,
        "wires": [
            [
                "7ecbc5a34ff4e3ec"
            ]
        ]
    },
    {
        "id": "7ecbc5a34ff4e3ec",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "antrian_andon",
        "func": "let queue = flow.get(\"queue\") || [];\nqueue.push(msg.topic);\nflow.set(\"queue\", queue);\nreturn { payload: queue };",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4660,
        "y": 1340,
        "wires": [
            [
                "55f5c42bed010b28",
                "3ca10bcf6adc4f0e"
            ]
        ]
    },
    {
        "id": "ad97083c64e1a945",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "Reset Index[0]",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 5134,
        "y": 1780,
        "wires": [
            [
                "ab1fb3d6216b3c6d"
            ]
        ]
    },
    {
        "id": "6dc34fd592fcc4a4",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "Reset All",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 4940,
        "y": 1840,
        "wires": [
            [
                "8dac3888bc2af5bb"
            ]
        ]
    },
    {
        "id": "ab1fb3d6216b3c6d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Remove Index[0]",
        "func": "let queue = flow.get(\"queue\") || [];\nif (queue.length > 0) {\n    queue.shift(); // Remove the first element\n}\nflow.set(\"queue\", queue);\nreturn { payload: queue };",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 5330,
        "y": 1780,
        "wires": [
            []
        ]
    },
    {
        "id": "8dac3888bc2af5bb",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Clear Queue",
        "func": "flow.set(\"queue\", []);\nreturn { payload: \"Queue cleared\" };",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 5310,
        "y": 1816,
        "wires": [
            []
        ]
    },
    {
        "id": "55f5c42bed010b28",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "Queue Status",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 4880,
        "y": 1300,
        "wires": []
    },
    {
        "id": "dc20d9557018be4c",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "true",
        "payloadType": "bool",
        "x": 4150,
        "y": 1496,
        "wires": [
            [
                "51787370be82d06e"
            ]
        ]
    },
    {
        "id": "a4999490c90301be",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "true",
        "payloadType": "bool",
        "x": 4150,
        "y": 1532,
        "wires": [
            [
                "1c4d73b10972de91"
            ]
        ]
    },
    {
        "id": "27c178c03c3cb2ce",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "true",
        "payloadType": "bool",
        "x": 4150,
        "y": 1460,
        "wires": [
            [
                "3732353b1c90b92f"
            ]
        ]
    },
    {
        "id": "2fe66dfe0df4f953",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "get_full_work",
        "func": "let barel = msg.payload[1];\nlet after_proses = msg.payload[3];\n\nif(barel === \"ispbr3\" && after_proses === \"0\"){\n    msg.payload = \"*^andonNR^off^#\";\n    return msg;\n}\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4950,
        "y": 1660,
        "wires": [
            [
                "5d015e6ebd303b18"
            ]
        ]
    },
    {
        "id": "3ca10bcf6adc4f0e",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Control_andon_barel",
        "func": "let andon_gas = msg.payload[0];\n\n\nif(andon_gas === \"d31e\"){\n    msg.payload = \"*^andonNR^on^#\";\n    return msg;\n} else if(andon_gas === \"nr\"){\n    msg.payload = \"*^andonD31E^on^#\";\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4900,
        "y": 1340,
        "wires": [
            [
                "5d015e6ebd303b18"
            ]
        ]
    },
    {
        "id": "a59db757e42dcc8d",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1216,
        "y": 1267,
        "wires": [
            [
                "a8c29c1603d3b411",
                "51cd0b73a9c5c3fb",
                "84cba524a89c9ea1",
                "711c7c2e067c5b5a",
                "136ffca2fa9a1ec0",
                "2e818ffeb9eb49d6",
                "d444aa2eda5b98f7",
                "332c03b7eed875b1",
                "6041def7227de55c",
                "3841fb50f94cb20d",
                "253032ec4f93e2bb",
                "81b7bf74d69326df"
            ]
        ]
    },
    {
        "id": "70e0bab056707dc9",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1231,
        "y": 1932,
        "wires": [
            [
                "796ca0c806f53e58",
                "0df24f5694665e33",
                "ed228f773d4629f9",
                "1af1480e24407130",
                "25d59eb9b814cf04",
                "37f6caebf13624d1",
                "afed795c1e92bd95",
                "0c985c025ec1fe28",
                "251d3066f9b8e6f7",
                "edd4912de665b56d",
                "95e6c470762c1d5d",
                "33ace849c7a13887"
            ]
        ]
    },
    {
        "id": "94b2879d647a75f2",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1211,
        "y": 2967,
        "wires": [
            [
                "638d24c371af602e",
                "64f7c4cd47d3c93d",
                "0b6bab6cf6a3fa11",
                "5d3602421c1e2fde",
                "aaf6be5a6cf26094"
            ]
        ]
    },
    {
        "id": "873d8e8a926a1521",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1856,
        "y": 382,
        "wires": [
            [
                "0ad5bdc23ce98050",
                "8295949e1ce784f2",
                "d319c31df527cebb",
                "017970ab6671e6ba"
            ]
        ]
    },
    {
        "id": "4a9c3f285d858baa",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1216,
        "y": 532,
        "wires": [
            [
                "5d6ba8823761c7fd",
                "c03cea476ead85ce",
                "c0453ffe01cb3dd6",
                "33b95938ea8691ee",
                "4cfd1de07f4a8db6",
                "7fef3fef80e00cf5",
                "37f0cedce35e707c",
                "fedbd0958df27f3b",
                "5266bbf57c978620",
                "bd58b7a05b38e2ca",
                "c22be0e64eb58f6b",
                "24fc8d2c9e8a4653"
            ]
        ]
    },
    {
        "id": "5037a7307f812b60",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1231,
        "y": 3517,
        "wires": [
            [
                "2c8a26c9206c5606",
                "dc26606f69935961",
                "ca2803a3547e2be6",
                "e95b51c367b03083",
                "ee1abcac7b5f9382"
            ]
        ]
    },
    {
        "id": "bf0f3f9c63f35041",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1211,
        "y": 3237,
        "wires": [
            [
                "36c49a6edac48b97",
                "ec24eab5d1a5cfcb",
                "c42b13aff6b86fb3",
                "86829717b87839c9",
                "1c38061de572b965"
            ]
        ]
    },
    {
        "id": "e658bf1095402a5f",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1236,
        "y": 3762,
        "wires": [
            [
                "b91081eb93862cfe",
                "466cd0225de4f953",
                "3037326cddabc2c3",
                "04ce5c2676dff099",
                "6cfa5e74fc9343b4",
                "ef842def333b946f",
                "023d1deda1d40749",
                "dc9857262cc53c20",
                "bf40b93b2edc678e"
            ]
        ]
    },
    {
        "id": "4cc5d50d423a4c28",
        "type": "string",
        "z": "e0eb1e3689d12af2",
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
        "x": 1931,
        "y": 262,
        "wires": [
            [
                "d319c31df527cebb",
                "017970ab6671e6ba",
                "5d09f554aed49e61"
            ]
        ]
    },
    {
        "id": "3c20511b16befb6f",
        "type": "string",
        "z": "e0eb1e3689d12af2",
        "name": "always_send",
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
            },
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
        "x": 326,
        "y": 182,
        "wires": [
            [
                "792759bbe4493b1c",
                "a2ae74ce4e89c7f5",
                "d870e46e39b76ab8",
                "1bee06f0d84281d4",
                "f62cb4224d64e9f0",
                "a5060545f111b75b",
                "9a5440ed37e52d0b",
                "8d9bf53b167b336b"
            ]
        ]
    },
    {
        "id": "9939227e979acdd7",
        "type": "string",
        "z": "e0eb1e3689d12af2",
        "name": "",
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
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "10"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 4670,
        "y": 1800,
        "wires": [
            [
                "2fe66dfe0df4f953",
                "f1d1d9a5cfcf4c9d"
            ]
        ]
    },
    {
        "id": "4c7d071467db7c5d",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "62990f32ac22a85e",
        "name": "",
        "x": 2416,
        "y": 1687,
        "wires": [
            []
        ]
    },
    {
        "id": "059081e5ec4762cf",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "18c7aa0014d44912",
        "name": "",
        "x": 2366,
        "y": 2382,
        "wires": [
            []
        ]
    },
    {
        "id": "4877036c4871a81e",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "7dcb3745c1f6d11e",
        "name": "",
        "x": 2391,
        "y": 3252,
        "wires": [
            []
        ]
    },
    {
        "id": "ee62ba4203dc98e1",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "51e6297883dcba65",
        "name": "",
        "x": 2361,
        "y": 2977,
        "wires": [
            []
        ]
    },
    {
        "id": "783f0a68776f24ad",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "f3c84c2a50e35eda",
        "name": "",
        "x": 2401,
        "y": 1017,
        "wires": [
            []
        ]
    },
    {
        "id": "d92dec28757d29dc",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "79205502032234cb",
        "name": "",
        "x": 2421,
        "y": 3537,
        "wires": [
            []
        ]
    },
    {
        "id": "30937aa561c540fb",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "d9976337d8f1a2e5",
        "name": "",
        "x": 2506,
        "y": 4237,
        "wires": [
            []
        ]
    },
    {
        "id": "6583da8f95a8d05a",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 4586,
        "y": 1012,
        "wires": [
            []
        ]
    },
    {
        "id": "c07a3e93fa85ba2e",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 5255,
        "y": 815,
        "wires": [
            []
        ]
    },
    {
        "id": "4fca510459d2910f",
        "type": "serial in",
        "z": "e0eb1e3689d12af2",
        "name": "",
        "serial": "2ff36052d3d56ff4",
        "x": 150,
        "y": 120,
        "wires": [
            [
                "3c20511b16befb6f",
                "d319c31df527cebb",
                "017970ab6671e6ba",
                "873d8e8a926a1521"
            ]
        ]
    },
    {
        "id": "41f0edb0b903da54",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "NR ON",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": "",
        "topic": "",
        "payload": "*^andonD31E^on^#",
        "payloadType": "str",
        "x": 4830,
        "y": 1120,
        "wires": [
            [
                "5d015e6ebd303b18"
            ]
        ]
    },
    {
        "id": "5f37d3a0b42f7a21",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "NR OFF",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": "",
        "topic": "",
        "payload": "*^andonD31E^off^#",
        "payloadType": "str",
        "x": 4840,
        "y": 1160,
        "wires": [
            [
                "5d015e6ebd303b18"
            ]
        ]
    },
    {
        "id": "f1d1d9a5cfcf4c9d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "get_full_work",
        "func": "let barel = msg.payload[1];\nlet after_proses = msg.payload[3];\n\nif(barel === \"ispbr3\" && after_proses === \"0\"){\n    msg.payload = \"*^andonD31E^off^#\";\n    return msg;\n}\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4950,
        "y": 1700,
        "wires": [
            [
                "5d015e6ebd303b18",
                "ab1fb3d6216b3c6d",
                "fd97e3c034948f6b"
            ]
        ]
    },
    {
        "id": "c655dfd2f5490928",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
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
        "payload": "\"*^ispbr3^1^0^1^1^#\"",
        "payloadType": "str",
        "x": 4460,
        "y": 1700,
        "wires": [
            [
                "9939227e979acdd7"
            ]
        ]
    },
    {
        "id": "904daed8eb2b34fc",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 281",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4730,
        "y": 1660,
        "wires": []
    },
    {
        "id": "ea9a9cb2e2bd0379",
        "type": "mqtt-broker",
        "name": "",
        "broker": "10.42.0.1",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "62990f32ac22a85e",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_35",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "18c7aa0014d44912",
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
        "id": "f3c84c2a50e35eda",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iaa_36",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "79205502032234cb",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_iam_80",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "d9976337d8f1a2e5",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_ispbr3",
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
        "id": "2ff36052d3d56ff4",
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
        "responsetimeout": "1000"
    }
]
