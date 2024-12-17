[
    {
        "id": "c2763519567b3df7",
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
        "x": 2211,
        "y": 1582,
        "wires": [
            [
                "651d382ba37d6ed8"
            ]
        ]
    },
    {
        "id": "a7fb74b226a5ed5e",
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
        "x": 2226,
        "y": 1627,
        "wires": [
            [
                "e8c892935657b5a1"
            ]
        ]
    },
    {
        "id": "6e26b7d6437a12dc",
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
        "x": 2216,
        "y": 1687,
        "wires": [
            [
                "f795945dc0a6431a"
            ]
        ]
    },
    {
        "id": "8f3b239d0c4267e7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2216,
        "y": 1747,
        "wires": [
            [
                "9c52fb7a4369ef8b"
            ]
        ]
    },
    {
        "id": "68986687906d716d",
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
        "x": 2226,
        "y": 1807,
        "wires": [
            [
                "3eb86fc8266753c8"
            ]
        ]
    },
    {
        "id": "5a3d07f3d12af7c7",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2216,
        "y": 1872,
        "wires": [
            [
                "5ef05d04ffab662e"
            ]
        ]
    },
    {
        "id": "651d382ba37d6ed8",
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
        "x": 2496,
        "y": 1567,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "e8c892935657b5a1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2516,
        "y": 1627,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "f795945dc0a6431a",
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
        "x": 2506,
        "y": 1687,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "9c52fb7a4369ef8b",
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
        "x": 2506,
        "y": 1747,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "3eb86fc8266753c8",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2516,
        "y": 1807,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "5ef05d04ffab662e",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2506,
        "y": 1867,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "e661011093ce21d7",
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
        "x": 3326,
        "y": 1552,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "c22005e2e03e61e7",
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
        "x": 3331,
        "y": 1517,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "e2faeb5fbb82e625",
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
        "x": 1891,
        "y": 1282,
        "wires": [
            [
                "c2763519567b3df7"
            ]
        ]
    },
    {
        "id": "279f11bf2b702045",
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
        "x": 1896,
        "y": 1322,
        "wires": [
            [
                "c2763519567b3df7"
            ]
        ]
    },
    {
        "id": "4be03cbaa5dcc317",
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
        "x": 1916,
        "y": 1372,
        "wires": [
            [
                "a7fb74b226a5ed5e"
            ]
        ]
    },
    {
        "id": "edd96dec40b1f940",
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
        "x": 1916,
        "y": 1407,
        "wires": [
            [
                "a7fb74b226a5ed5e"
            ]
        ]
    },
    {
        "id": "920185743ede5d10",
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
        "x": 1916,
        "y": 1457,
        "wires": [
            [
                "6e26b7d6437a12dc"
            ]
        ]
    },
    {
        "id": "45fee3208b3f5e5f",
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
        "x": 1916,
        "y": 1492,
        "wires": [
            [
                "6e26b7d6437a12dc"
            ]
        ]
    },
    {
        "id": "6075b0b5890a5212",
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
        "x": 1886,
        "y": 1577,
        "wires": [
            [
                "8f3b239d0c4267e7",
                "4e196f4e5c1b2ce3"
            ]
        ]
    },
    {
        "id": "d8acb0d5ed1fc8eb",
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
        "x": 1886,
        "y": 1612,
        "wires": [
            [
                "8f3b239d0c4267e7",
                "4bdf323fb2cfe641"
            ]
        ]
    },
    {
        "id": "4b5a74b8c69421f3",
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
        "x": 1896,
        "y": 1662,
        "wires": [
            [
                "68986687906d716d",
                "2f56693f093d6211"
            ]
        ]
    },
    {
        "id": "88e3fb720687c63f",
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
        "x": 1896,
        "y": 1697,
        "wires": [
            [
                "68986687906d716d",
                "8c87b3de4c3e93f6"
            ]
        ]
    },
    {
        "id": "f99531e576a66bf7",
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
        "x": 1886,
        "y": 1747,
        "wires": [
            [
                "5a3d07f3d12af7c7",
                "ac094e33e1a13df8"
            ]
        ]
    },
    {
        "id": "837e335eaf847542",
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
        "x": 1886,
        "y": 1782,
        "wires": [
            [
                "5a3d07f3d12af7c7",
                "5cc787cac0eeb889"
            ]
        ]
    },
    {
        "id": "8f397a9e5030b4ab",
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
        "x": 3331,
        "y": 1642,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "2bfbbb52a625e7a0",
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
        "x": 3336,
        "y": 1607,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "f5c482abfd3ab082",
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
        "x": 3336,
        "y": 1732,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "57333021b3430c40",
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
        "x": 3341,
        "y": 1697,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "8b175fd46c7b87c4",
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
        "x": 3326,
        "y": 1822,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "d0a6f7c7995ffec0",
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
        "x": 3331,
        "y": 1787,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "76b5f9e0f8877b33",
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
        "x": 3321,
        "y": 1907,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "dc68e17308d3194c",
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
        "x": 3326,
        "y": 1872,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "732640e5943f6672",
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
        "x": 3316,
        "y": 1992,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "c5295e122779b820",
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
        "x": 3321,
        "y": 1957,
        "wires": [
            [
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "22f59f8392c9c71f",
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
        "x": 2176,
        "y": 2287,
        "wires": [
            [
                "7238c96cecd0f15c"
            ]
        ]
    },
    {
        "id": "90bb19727897c32b",
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
        "x": 2196,
        "y": 2347,
        "wires": [
            [
                "603e62acb89744f0"
            ]
        ]
    },
    {
        "id": "dff7ebac4c7e1d89",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2186,
        "y": 2407,
        "wires": [
            [
                "7ddd5f459eacccfa"
            ]
        ]
    },
    {
        "id": "b66e4d065a4d60c5",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2186,
        "y": 2467,
        "wires": [
            [
                "8099b848d3398309"
            ]
        ]
    },
    {
        "id": "276af206d5fe9323",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2201,
        "y": 2537,
        "wires": [
            [
                "b76a4597b4bfdc2b"
            ]
        ]
    },
    {
        "id": "edf785d54c50115c",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2186,
        "y": 2617,
        "wires": [
            [
                "68677e9a6a619723"
            ]
        ]
    },
    {
        "id": "7238c96cecd0f15c",
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
        "x": 2466,
        "y": 2287,
        "wires": [
            [
                "8d9748b8fea706b9"
            ]
        ]
    },
    {
        "id": "603e62acb89744f0",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2486,
        "y": 2347,
        "wires": [
            [
                "8d9748b8fea706b9"
            ]
        ]
    },
    {
        "id": "7ddd5f459eacccfa",
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
        "x": 2476,
        "y": 2407,
        "wires": [
            [
                "8d9748b8fea706b9"
            ]
        ]
    },
    {
        "id": "8099b848d3398309",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2476,
        "y": 2467,
        "wires": [
            [
                "8d9748b8fea706b9"
            ]
        ]
    },
    {
        "id": "b76a4597b4bfdc2b",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2486,
        "y": 2527,
        "wires": [
            [
                "8d9748b8fea706b9"
            ]
        ]
    },
    {
        "id": "68677e9a6a619723",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2476,
        "y": 2587,
        "wires": [
            [
                "8d9748b8fea706b9"
            ]
        ]
    },
    {
        "id": "841c500740755550",
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
        "x": 2211,
        "y": 3267,
        "wires": [
            [
                "2bf11c78a487e683"
            ]
        ]
    },
    {
        "id": "78fda5d9529ae54a",
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
        "x": 2231,
        "y": 3327,
        "wires": [
            [
                "eb59ef954cb512ba"
            ]
        ]
    },
    {
        "id": "2bf11c78a487e683",
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
        "x": 2501,
        "y": 3267,
        "wires": [
            [
                "5da3bfdf0ff71639"
            ]
        ]
    },
    {
        "id": "eb59ef954cb512ba",
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
        "x": 2521,
        "y": 3327,
        "wires": [
            [
                "5da3bfdf0ff71639"
            ]
        ]
    },
    {
        "id": "289928fdc8d5e50b",
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
        "x": 3341,
        "y": 3217,
        "wires": [
            [
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "99d3f4d9026c4161",
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
        "x": 3346,
        "y": 3182,
        "wires": [
            [
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "caa2dde8b29c8eb4",
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
        "x": 3356,
        "y": 3307,
        "wires": [
            [
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "15ba8ff84cd182ce",
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
        "x": 3361,
        "y": 3272,
        "wires": [
            [
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "5fac4c6878fc198d",
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
        "x": 2216,
        "y": 2897,
        "wires": [
            [
                "f5df3d4ea91ee903"
            ]
        ]
    },
    {
        "id": "065faa449ccb7fec",
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
        "x": 2231,
        "y": 2937,
        "wires": [
            [
                "5a2ba490012784cb"
            ]
        ]
    },
    {
        "id": "f5df3d4ea91ee903",
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
        "x": 2486,
        "y": 2987,
        "wires": [
            [
                "a9a6fea75d47955d"
            ]
        ]
    },
    {
        "id": "5a2ba490012784cb",
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
        "x": 2506,
        "y": 3047,
        "wires": [
            [
                "a9a6fea75d47955d"
            ]
        ]
    },
    {
        "id": "585418b62490cbbf",
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
        "x": 3321,
        "y": 2887,
        "wires": [
            [
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "224991329b30a8d4",
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
        "x": 3326,
        "y": 2852,
        "wires": [
            [
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "bb43fe8eca1cbd34",
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
        "x": 1851,
        "y": 2932,
        "wires": [
            [
                "5fac4c6878fc198d",
                "abeb5133c4b9afe3"
            ]
        ]
    },
    {
        "id": "60a119dec467b46b",
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
        "x": 1851,
        "y": 2967,
        "wires": [
            [
                "5fac4c6878fc198d",
                "4a8f4e90c0e35115"
            ]
        ]
    },
    {
        "id": "93706604f282bf3f",
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
        "x": 1871,
        "y": 3007,
        "wires": [
            [
                "065faa449ccb7fec",
                "bfc41b55f2d416ea"
            ]
        ]
    },
    {
        "id": "fcd385cf651a9294",
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
        "x": 1871,
        "y": 3047,
        "wires": [
            [
                "065faa449ccb7fec",
                "ef2de5dcc36cdab5"
            ]
        ]
    },
    {
        "id": "10e26c1297d4f95e",
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
        "x": 3336,
        "y": 2977,
        "wires": [
            [
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "807e1ed27ee6cba1",
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
        "x": 3341,
        "y": 2942,
        "wires": [
            [
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "72c18ce0e6a43482",
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
        "x": 5320,
        "y": 845,
        "wires": [
            [
                "f6e4579fc75dfe58"
            ]
        ]
    },
    {
        "id": "e2e8f1523213f122",
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
        "x": 4600,
        "y": 820,
        "wires": [
            [
                "055e9e3fea18a07e"
            ]
        ]
    },
    {
        "id": "27ea0941671197dd",
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
        "x": 5135,
        "y": 820,
        "wires": [
            [
                "72c18ce0e6a43482"
            ]
        ]
    },
    {
        "id": "219eacac824da60f",
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
        "x": 5135,
        "y": 870,
        "wires": [
            [
                "72c18ce0e6a43482"
            ]
        ]
    },
    {
        "id": "11de866285f4957e",
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
        "x": 4840,
        "y": 780,
        "wires": [
            [
                "055e9e3fea18a07e"
            ]
        ]
    },
    {
        "id": "055e9e3fea18a07e",
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
        "x": 4950,
        "y": 820,
        "wires": [
            [
                "27ea0941671197dd",
                "3d1f2e9c8c5d5126"
            ]
        ]
    },
    {
        "id": "11193766bcad4a61",
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
        "x": 4950,
        "y": 855,
        "wires": [
            [
                "219eacac824da60f",
                "0463e5911d8769dd"
            ]
        ]
    },
    {
        "id": "4e196f4e5c1b2ce3",
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
        "x": 4115,
        "y": 925,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "edc7cc308f53e743"
            ]
        ]
    },
    {
        "id": "2f56693f093d6211",
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
        "x": 4115,
        "y": 965,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "5a3fd35d2a382185"
            ]
        ]
    },
    {
        "id": "ac094e33e1a13df8",
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
        "x": 4115,
        "y": 1005,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "bdb1f0e9e79749f3"
            ]
        ]
    },
    {
        "id": "82f4b516c27ee617",
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
        "x": 4115,
        "y": 1045,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "bb63a63d9eb22c58"
            ]
        ]
    },
    {
        "id": "579f8cc53d1fd8d0",
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
        "x": 4115,
        "y": 1085,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "119b6f6a3e7a908a"
            ]
        ]
    },
    {
        "id": "ebaaaf7aadbcaab9",
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
        "x": 4115,
        "y": 1125,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "68e1b33f52eba09c"
            ]
        ]
    },
    {
        "id": "5b33bcd33ffb1edb",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam73_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam73_hopper = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4125,
        "y": 1290,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "ed756116f940ded0",
                "60fb8adb18782676"
            ]
        ]
    },
    {
        "id": "bfc41b55f2d416ea",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam72_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam72_hopper = true;\n    return msg;\n}\n\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4125,
        "y": 1210,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "c1280f682ea80896",
                "363cf992e07e39a8"
            ]
        ]
    },
    {
        "id": "5e4c990e4ff494ae",
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
        "x": 4680,
        "y": 1070,
        "wires": [
            [
                "b9414b202fde74c4",
                "99162f465d7426f8"
            ]
        ]
    },
    {
        "id": "f5a810b15dc068d3",
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
        "x": 4125,
        "y": 1250,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "06f841b5a90c3709"
            ]
        ]
    },
    {
        "id": "abeb5133c4b9afe3",
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
        "x": 4125,
        "y": 1170,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "d901b9c8c755e6a4"
            ]
        ]
    },
    {
        "id": "2416b63f3c4e8f73",
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
        "x": 4125,
        "y": 1980,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "627e531e3e39974a"
            ]
        ]
    },
    {
        "id": "360acfaaf7f999eb",
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
        "x": 4125,
        "y": 2020,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "5956a548ded1e2e2"
            ]
        ]
    },
    {
        "id": "4a8f4e90c0e35115",
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
        "x": 4125,
        "y": 1900,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "0fa9775e48d7132c"
            ]
        ]
    },
    {
        "id": "ef2de5dcc36cdab5",
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
        "x": 4125,
        "y": 1940,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "7232685da07b77e2"
            ]
        ]
    },
    {
        "id": "4bdf323fb2cfe641",
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
        "x": 4115,
        "y": 1655,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "c8860d26db709045"
            ]
        ]
    },
    {
        "id": "8c87b3de4c3e93f6",
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
        "x": 4115,
        "y": 1695,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "c79f7eb4ef8505a2"
            ]
        ]
    },
    {
        "id": "5cc787cac0eeb889",
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
        "x": 4115,
        "y": 1735,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "105aa4b59aa212ba"
            ]
        ]
    },
    {
        "id": "fb348c5ddfbf2f52",
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
        "x": 4115,
        "y": 1775,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "30df78b080304e0b"
            ]
        ]
    },
    {
        "id": "3c1059912637df3e",
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
        "x": 4115,
        "y": 1815,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "523e9da3faf3b330"
            ]
        ]
    },
    {
        "id": "ef4cd3545d453a63",
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
        "x": 4115,
        "y": 1855,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "6cd7cb3ab3284c43"
            ]
        ]
    },
    {
        "id": "b9414b202fde74c4",
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
        "x": 4946,
        "y": 1102,
        "wires": []
    },
    {
        "id": "f6bed5aa662b19ef",
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
        "x": 4840,
        "y": 900,
        "wires": [
            [
                "11193766bcad4a61"
            ]
        ]
    },
    {
        "id": "95a0a8e747b9b62f",
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
        "x": 4600,
        "y": 860,
        "wires": [
            [
                "11193766bcad4a61"
            ]
        ]
    },
    {
        "id": "daa13e0549b7dfd1",
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
        "x": 1876,
        "y": 1942,
        "wires": [
            [
                "22f59f8392c9c71f"
            ]
        ]
    },
    {
        "id": "49155fc763a82495",
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
        "x": 1876,
        "y": 1982,
        "wires": [
            [
                "22f59f8392c9c71f"
            ]
        ]
    },
    {
        "id": "f69b872892a35c1c",
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
        "x": 1896,
        "y": 2032,
        "wires": [
            [
                "90bb19727897c32b"
            ]
        ]
    },
    {
        "id": "e15b287abfcc8e67",
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
        "x": 1896,
        "y": 2067,
        "wires": [
            [
                "90bb19727897c32b"
            ]
        ]
    },
    {
        "id": "ef6532a4c6c6f46c",
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
        "x": 1896,
        "y": 2117,
        "wires": [
            [
                "dff7ebac4c7e1d89"
            ]
        ]
    },
    {
        "id": "a3cecdb3986b2867",
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
        "x": 1896,
        "y": 2152,
        "wires": [
            [
                "dff7ebac4c7e1d89"
            ]
        ]
    },
    {
        "id": "ceef7fe642450262",
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
        "x": 1866,
        "y": 2232,
        "wires": [
            [
                "b66e4d065a4d60c5",
                "82f4b516c27ee617"
            ]
        ]
    },
    {
        "id": "e9da9cbdd572149c",
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
        "x": 1866,
        "y": 2267,
        "wires": [
            [
                "b66e4d065a4d60c5",
                "fb348c5ddfbf2f52"
            ]
        ]
    },
    {
        "id": "8da9cd59f1650fbf",
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
        "x": 1876,
        "y": 2317,
        "wires": [
            [
                "276af206d5fe9323",
                "579f8cc53d1fd8d0"
            ]
        ]
    },
    {
        "id": "b0c3624fbdb8c8e2",
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
        "x": 1876,
        "y": 2352,
        "wires": [
            [
                "276af206d5fe9323",
                "3c1059912637df3e"
            ]
        ]
    },
    {
        "id": "c8753d81bb10771a",
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
        "x": 1866,
        "y": 2402,
        "wires": [
            [
                "edf785d54c50115c",
                "ebaaaf7aadbcaab9"
            ]
        ]
    },
    {
        "id": "5127806dfddffa3a",
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
        "x": 1866,
        "y": 2437,
        "wires": [
            [
                "edf785d54c50115c",
                "ef4cd3545d453a63"
            ]
        ]
    },
    {
        "id": "1db9e6d4945468a1",
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
        "x": 3331,
        "y": 2217,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "7a4a1aa10c79d6e0",
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
        "x": 3336,
        "y": 2182,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "e8618177c94867a4",
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
        "x": 3336,
        "y": 2307,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "46afb5227442a180",
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
        "x": 3341,
        "y": 2272,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "a583eb9375541c7a",
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
        "x": 3341,
        "y": 2397,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "9e12f312e777f87a",
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
        "x": 3346,
        "y": 2362,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "445a3d4a48f3f67c",
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
        "x": 3331,
        "y": 2487,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "f05f0ace6ca3a3a6",
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
        "x": 3336,
        "y": 2452,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "ee55809e72bb1ee3",
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
        "x": 3326,
        "y": 2572,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "7c579dcf4d626723",
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
        "x": 3331,
        "y": 2537,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "481b600723eb1682",
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
        "x": 3321,
        "y": 2657,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "e703e40c856fcc2c",
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
        "x": 3326,
        "y": 2622,
        "wires": [
            [
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "1c78e977ae6b41c8",
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
        "x": 2446,
        "y": 412,
        "wires": [
            [
                "8d9748b8fea706b9"
            ]
        ]
    },
    {
        "id": "5f9c20891d13dabf",
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
        "x": 2446,
        "y": 452,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "e7b0bd6856d77360",
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
        "x": 2146,
        "y": 412,
        "wires": [
            [
                "d6f5bf41c84c9eea"
            ]
        ]
    },
    {
        "id": "30585a3c3d889fc8",
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
        "x": 1816,
        "y": 2872,
        "wires": []
    },
    {
        "id": "912a52b78c611f5b",
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
        "x": 2221,
        "y": 882,
        "wires": [
            [
                "e7264368add9d91b"
            ]
        ]
    },
    {
        "id": "f786675dd7062d51",
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
        "x": 2241,
        "y": 942,
        "wires": [
            [
                "1518482937c711b1"
            ]
        ]
    },
    {
        "id": "756b08a815a116de",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration tool_change",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        startTime: null,\n        stopTime: null,\n        pauseTime: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pauseTime) {\n        // Resuming from pause\n        context.timer.pausedDuration += (new Date() - context.timer.pauseTime);\n        context.timer.pauseTime = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.startTime = new Date();\n        context.timer.stopTime = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.startTime) {\n        context.timer.stopTime = new Date();\n        context.timer.duration = (context.timer.stopTime - context.timer.startTime - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.startTime && !context.timer.pauseTime) {\n        context.timer.pauseTime = new Date();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.startTime = null;\n    context.timer.stopTime = null;\n    context.timer.pauseTime = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 1,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2231,
        "y": 1002,
        "wires": [
            [
                "1a7899f1d5d40f0a"
            ]
        ]
    },
    {
        "id": "3afaccd1e7af13ef",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration arm_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.time) {\n    context.time = {\n        start: null,\n        stop: null,\n        pause: null,\n        diff: 0,\n        pausedDiff: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.time.pause) {\n        // Resuming from pause\n        context.time.pausedDiff += (new Date().getTime() - context.time.pause);\n        context.time.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.time.start = new Date().getTime();\n        context.time.stop = null;\n        context.time.diff = 0; // Reset diff on start\n        context.time.pausedDiff = 0; // Reset paused diff on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.time.start) {\n        context.time.stop = new Date().getTime();\n        context.time.diff = (context.time.stop - context.time.start - context.time.pausedDiff) / 1000; // Calculate diff in seconds\n        msg.payload = { duration: context.time.diff };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.time.diff} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.time.start && !context.time.pause) {\n        context.time.pause = new Date().getTime();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.time.start = null;\n    context.time.stop = null;\n    context.time.pause = null;\n    context.time.diff = 0;\n    context.time.pausedDiff = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2231,
        "y": 1062,
        "wires": [
            [
                "0f1048c8175710f8"
            ]
        ]
    },
    {
        "id": "7b65602b9d533cf9",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration roller_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.timer) {\n    context.timer = {\n        start: null,\n        end: null,\n        pause: null,\n        duration: 0,\n        pausedDuration: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.timer.pause) {\n        // Resuming from pause\n        context.timer.pausedDuration += (Date.now() - context.timer.pause);\n        context.timer.pause = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.timer.start = Date.now();\n        context.timer.end = null;\n        context.timer.duration = 0; // Reset duration on start\n        context.timer.pausedDuration = 0; // Reset paused duration on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.timer.start) {\n        context.timer.end = Date.now();\n        context.timer.duration = (context.timer.end - context.timer.start - context.timer.pausedDuration) / 1000; // Calculate duration in seconds\n        msg.payload = { duration: context.timer.duration };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.timer.duration} sec` });\n        return msg; // Send message with the duration\n    }\n} else if (action === \"pause\") {\n    if (context.timer.start && !context.timer.pause) {\n        context.timer.pause = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.timer.start = null;\n    context.timer.end = null;\n    context.timer.pause = null;\n    context.timer.duration = 0;\n    context.timer.pausedDuration = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2246,
        "y": 1132,
        "wires": [
            [
                "2095dd4789257836"
            ]
        ]
    },
    {
        "id": "ab9fef83f4d14c28",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Calculate Duration pin_no_part",
        "func": "// Initialize context variables if not already set\nif (!context.session) {\n    context.session = {\n        started: null,\n        stopped: null,\n        paused: null,\n        timeElapsed: 0,\n        pausedTimeElapsed: 0\n    };\n}\n\n// Get the action from the input message\nlet action = msg.payload.action;\n\n// Handle the different actions\nif (action === \"start\") {\n    if (context.session.paused) {\n        // Resuming from pause\n        context.session.pausedTimeElapsed += (Date.now() - context.session.paused);\n        context.session.paused = null;\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Resumed\" });\n    } else {\n        // Starting new\n        context.session.started = Date.now();\n        context.session.stopped = null;\n        context.session.timeElapsed = 0; // Reset timeElapsed on start\n        context.session.pausedTimeElapsed = 0; // Reset pausedTimeElapsed on start\n        node.status({ fill: \"green\", shape: \"dot\", text: \"Started\" });\n    }\n} else if (action === \"stop\") {\n    if (context.session.started) {\n        context.session.stopped = Date.now();\n        context.session.timeElapsed = (context.session.stopped - context.session.started - context.session.pausedTimeElapsed) / 1000; // Calculate timeElapsed in seconds\n        msg.payload = { duration: context.session.timeElapsed };\n        node.status({ fill: \"red\", shape: \"dot\", text: `Stopped: ${context.session.timeElapsed} sec` });\n        return msg; // Send message with the timeElapsed\n    }\n} else if (action === \"pause\") {\n    if (context.session.started && !context.session.paused) {\n        context.session.paused = Date.now();\n        node.status({ fill: \"yellow\", shape: \"dot\", text: \"Paused\" });\n    }\n} else if (action === \"reset\") {\n    context.session.started = null;\n    context.session.stopped = null;\n    context.session.paused = null;\n    context.session.timeElapsed = 0;\n    context.session.pausedTimeElapsed = 0;\n    node.status({ fill: \"blue\", shape: \"dot\", text: \"Reset\" });\n}\n\n// Do not send a message for start and reset actions\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2231,
        "y": 1212,
        "wires": [
            [
                "5959ae552c5620cd"
            ]
        ]
    },
    {
        "id": "e7264368add9d91b",
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
        "x": 2511,
        "y": 882,
        "wires": [
            [
                "879f8366bd50b38e"
            ]
        ]
    },
    {
        "id": "1518482937c711b1",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL quality_check",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_quality_check (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2531,
        "y": 942,
        "wires": [
            [
                "879f8366bd50b38e"
            ]
        ]
    },
    {
        "id": "1a7899f1d5d40f0a",
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
        "x": 2521,
        "y": 1002,
        "wires": [
            [
                "879f8366bd50b38e"
            ]
        ]
    },
    {
        "id": "0f1048c8175710f8",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL arm_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_arm_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2521,
        "y": 1062,
        "wires": [
            [
                "879f8366bd50b38e"
            ]
        ]
    },
    {
        "id": "2095dd4789257836",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL roller_no_part",
        "func": " if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n     let sql = `INSERT INTO timer_durations_roller_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2531,
        "y": 1122,
        "wires": [
            [
                "879f8366bd50b38e"
            ]
        ]
    },
    {
        "id": "5959ae552c5620cd",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Save to MySQL pin_no_part",
        "func": "if (msg.payload.duration) {\n    let duration = msg.payload.duration;\n    let sql = `INSERT INTO timer_durations_pin_no_part (timer_id, duration) VALUES (1, ${duration})`;\n    msg.topic = sql;\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2521,
        "y": 1182,
        "wires": [
            [
                "879f8366bd50b38e"
            ]
        ]
    },
    {
        "id": "56f93cc39113693e",
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
        "x": 1921,
        "y": 542,
        "wires": [
            [
                "912a52b78c611f5b"
            ]
        ]
    },
    {
        "id": "8adbd54cab6d0038",
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
        "x": 1921,
        "y": 577,
        "wires": [
            [
                "912a52b78c611f5b"
            ]
        ]
    },
    {
        "id": "c4b60a766263bc46",
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
        "x": 1941,
        "y": 627,
        "wires": [
            [
                "f786675dd7062d51"
            ]
        ]
    },
    {
        "id": "4e456295aa507b44",
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
        "x": 1941,
        "y": 662,
        "wires": [
            [
                "f786675dd7062d51"
            ]
        ]
    },
    {
        "id": "33a670113f1f2c02",
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
        "x": 1941,
        "y": 712,
        "wires": [
            [
                "756b08a815a116de"
            ]
        ]
    },
    {
        "id": "470c9a1ca19ad337",
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
        "x": 1941,
        "y": 747,
        "wires": [
            [
                "756b08a815a116de"
            ]
        ]
    },
    {
        "id": "fe9f28f3e7448126",
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
        "x": 1911,
        "y": 832,
        "wires": [
            [
                "3afaccd1e7af13ef",
                "6f46cf89139a91cb"
            ]
        ]
    },
    {
        "id": "370cbd84b09e928d",
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
        "x": 1911,
        "y": 867,
        "wires": [
            [
                "3afaccd1e7af13ef",
                "dd059aa34e5460c3"
            ]
        ]
    },
    {
        "id": "d092a4ad463769c0",
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
        "x": 1921,
        "y": 917,
        "wires": [
            [
                "7b65602b9d533cf9",
                "7e29141a5672b5d8"
            ]
        ]
    },
    {
        "id": "02dd2e3802ba64a7",
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
        "x": 1921,
        "y": 952,
        "wires": [
            [
                "7b65602b9d533cf9",
                "b48ff9bacf19ac38"
            ]
        ]
    },
    {
        "id": "2dc6ae30b352312b",
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
        "x": 1911,
        "y": 1002,
        "wires": [
            [
                "ab9fef83f4d14c28",
                "24c128e41a29ef47"
            ]
        ]
    },
    {
        "id": "16558b5d4849fae3",
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
        "x": 1911,
        "y": 1037,
        "wires": [
            [
                "ab9fef83f4d14c28",
                "c622eef2fd074b90"
            ]
        ]
    },
    {
        "id": "32b4f4e1ee8111a9",
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
        "x": 3356,
        "y": 812,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "c098109b1a1ee5e0",
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
        "x": 3361,
        "y": 777,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "91cd74ea221979ea",
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
        "x": 3361,
        "y": 902,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "7273ff2f2464c22d",
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
        "x": 3366,
        "y": 867,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "bb168b3253ce8985",
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
        "x": 3366,
        "y": 992,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "2a69d7c01c5be55e",
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
        "x": 3371,
        "y": 957,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "7e58da00ab33ef60",
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
        "x": 3356,
        "y": 1082,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "8665db467e359c48",
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
        "x": 3361,
        "y": 1047,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "043f0e5f98664cb1",
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
        "x": 3351,
        "y": 1167,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "99935d8ace555b90",
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
        "x": 3356,
        "y": 1132,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "2647326d564a6560",
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
        "x": 3346,
        "y": 1252,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "b64361ac7a8d6689",
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
        "x": 3351,
        "y": 1217,
        "wires": [
            [
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "6e26cce78d83e878",
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
        "x": 2221,
        "y": 3527,
        "wires": [
            [
                "8fcab4d32a010ce9"
            ]
        ]
    },
    {
        "id": "7712f5a7a892ee3b",
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
        "x": 2236,
        "y": 3567,
        "wires": [
            [
                "b14fb661c060cde4"
            ]
        ]
    },
    {
        "id": "8fcab4d32a010ce9",
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
        "x": 2536,
        "y": 3522,
        "wires": [
            [
                "361196ef433e621f"
            ]
        ]
    },
    {
        "id": "b14fb661c060cde4",
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
        "x": 2551,
        "y": 3582,
        "wires": [
            [
                "361196ef433e621f"
            ]
        ]
    },
    {
        "id": "39fd840475ea30b4",
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
        "x": 3351,
        "y": 3512,
        "wires": [
            [
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "2f55f5ee497b6d1b",
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
        "x": 3356,
        "y": 3477,
        "wires": [
            [
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "a7e0702752a84d00",
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
        "x": 1851,
        "y": 3492,
        "wires": [
            [
                "6e26cce78d83e878",
                "824c30a75a9d5c35"
            ]
        ]
    },
    {
        "id": "5b2f38a880c261c7",
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
        "x": 1851,
        "y": 3527,
        "wires": [
            [
                "6e26cce78d83e878",
                "4d845ceca5ea6b37"
            ]
        ]
    },
    {
        "id": "1ca075a778453ed5",
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
        "x": 1871,
        "y": 3567,
        "wires": [
            [
                "7712f5a7a892ee3b",
                "d42932dc249cddb8"
            ]
        ]
    },
    {
        "id": "39cb9542dbbf0f17",
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
        "x": 1871,
        "y": 3607,
        "wires": [
            [
                "7712f5a7a892ee3b",
                "18e44c4aa4e569ce"
            ]
        ]
    },
    {
        "id": "54c73b4dc9ad4ed4",
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
        "x": 3366,
        "y": 3602,
        "wires": [
            [
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "c0d55808ad9fbae2",
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
        "x": 3371,
        "y": 3567,
        "wires": [
            [
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "ebf1f8479807092e",
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
        "x": 1811,
        "y": 3447,
        "wires": []
    },
    {
        "id": "6d68b50301ce0613",
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
        "x": 1851,
        "y": 3202,
        "wires": [
            [
                "841c500740755550",
                "f5a810b15dc068d3"
            ]
        ]
    },
    {
        "id": "75b7e96b4d9a336e",
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
        "x": 1851,
        "y": 3237,
        "wires": [
            [
                "841c500740755550",
                "2416b63f3c4e8f73"
            ]
        ]
    },
    {
        "id": "4f30ca8b1434f195",
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
        "x": 1871,
        "y": 3277,
        "wires": [
            [
                "78fda5d9529ae54a",
                "5b33bcd33ffb1edb"
            ]
        ]
    },
    {
        "id": "5240103e20a6f9ae",
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
        "x": 1871,
        "y": 3317,
        "wires": [
            [
                "78fda5d9529ae54a",
                "360acfaaf7f999eb"
            ]
        ]
    },
    {
        "id": "a7e2c1ce9443688c",
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
        "x": 1791,
        "y": 3142,
        "wires": []
    },
    {
        "id": "6f46cf89139a91cb",
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
        "x": 4115,
        "y": 805,
        "wires": [
            [
                "e2e8f1523213f122",
                "5e4c990e4ff494ae",
                "a6fa77b4ca02cee7"
            ]
        ]
    },
    {
        "id": "7e29141a5672b5d8",
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
        "x": 4115,
        "y": 845,
        "wires": [
            [
                "e2e8f1523213f122",
                "5e4c990e4ff494ae",
                "c4f857cdccf911d3"
            ]
        ]
    },
    {
        "id": "24c128e41a29ef47",
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
        "x": 4115,
        "y": 885,
        "wires": [
            [
                "e2e8f1523213f122",
                "5e4c990e4ff494ae",
                "9854b6ef83042a42"
            ]
        ]
    },
    {
        "id": "dd059aa34e5460c3",
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
        "x": 4115,
        "y": 1535,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "f80f1bb25fc041bf"
            ]
        ]
    },
    {
        "id": "b48ff9bacf19ac38",
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
        "x": 4115,
        "y": 1575,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "c4fd84de6604ed2f"
            ]
        ]
    },
    {
        "id": "c622eef2fd074b90",
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
        "x": 4115,
        "y": 1615,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "1355b296d8c9ace0"
            ]
        ]
    },
    {
        "id": "d42932dc249cddb8",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "iam80_hopper_on",
        "func": "if(msg.payload.action == 'start'){\n    msg.payload.iam80_hopper = true;\n    return msg;\n}\n\nelse {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 4125,
        "y": 1370,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "a0f395388227cd4c",
                "3bc0c0a4648ec8cb"
            ]
        ]
    },
    {
        "id": "824c30a75a9d5c35",
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
        "x": 4125,
        "y": 1330,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "1ec6e1aa0746fcfb",
                "e2e8f1523213f122"
            ]
        ]
    },
    {
        "id": "4d845ceca5ea6b37",
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
        "x": 4125,
        "y": 2065,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "7184becd69d53a9f"
            ]
        ]
    },
    {
        "id": "18e44c4aa4e569ce",
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
        "x": 4125,
        "y": 2105,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "3b786d236618559a"
            ]
        ]
    },
    {
        "id": "7b473a6f48f181f0",
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
        "x": 2271,
        "y": 4097,
        "wires": [
            [
                "d225743638ea620a"
            ]
        ]
    },
    {
        "id": "d8a8ac67e88dc5be",
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
        "x": 2286,
        "y": 4157,
        "wires": [
            [
                "b4d111123e4b4970"
            ]
        ]
    },
    {
        "id": "d225743638ea620a",
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
        "x": 2586,
        "y": 4092,
        "wires": [
            [
                "2ff0b3e878ac551e"
            ]
        ]
    },
    {
        "id": "b4d111123e4b4970",
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
        "x": 2621,
        "y": 4157,
        "wires": [
            [
                "2ff0b3e878ac551e"
            ]
        ]
    },
    {
        "id": "32d3dd9b75d0a59e",
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
        "x": 3366,
        "y": 4097,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "a53f509c77132bef",
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
        "x": 3371,
        "y": 4062,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "b8b330765b608451",
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
        "x": 1901,
        "y": 4062,
        "wires": [
            [
                "7b473a6f48f181f0",
                "8cbb2c403c553b2f"
            ]
        ]
    },
    {
        "id": "7c66ab7e3039a6f7",
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
        "x": 1901,
        "y": 4097,
        "wires": [
            [
                "7b473a6f48f181f0",
                "df99c8befc10a412"
            ]
        ]
    },
    {
        "id": "15b4a09b317f886a",
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
        "x": 1901,
        "y": 4137,
        "wires": [
            [
                "d8a8ac67e88dc5be",
                "80d0720c7988a5e9"
            ]
        ]
    },
    {
        "id": "7888db272694dcc2",
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
        "x": 1901,
        "y": 4177,
        "wires": [
            [
                "d8a8ac67e88dc5be",
                "54bf3df64e1f8c17"
            ]
        ]
    },
    {
        "id": "4a91eb3c07cd7ef8",
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
        "x": 3376,
        "y": 4327,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "1a3dd92cddcfa213",
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
        "x": 3381,
        "y": 4292,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "a1aeed5b3cc42de9",
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
        "x": 1866,
        "y": 3982,
        "wires": []
    },
    {
        "id": "9273b71487e279e2",
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
        "x": 3386,
        "y": 4437,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "58b3ef6fd1191e9c",
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
        "x": 3391,
        "y": 4402,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "abc6e5cb91a8ef14",
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
        "x": 1921,
        "y": 4217,
        "wires": [
            [
                "471652c22c600b96"
            ]
        ]
    },
    {
        "id": "1e4255eda9eb2e34",
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
        "x": 1921,
        "y": 4257,
        "wires": [
            [
                "471652c22c600b96"
            ]
        ]
    },
    {
        "id": "471652c22c600b96",
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
        "x": 2301,
        "y": 4232,
        "wires": [
            [
                "9fd5f7fabf7c73fd"
            ]
        ]
    },
    {
        "id": "9fd5f7fabf7c73fd",
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
        "x": 2636,
        "y": 4232,
        "wires": [
            [
                "2ff0b3e878ac551e"
            ]
        ]
    },
    {
        "id": "c03f96a327c4ef7f",
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
        "x": 3366,
        "y": 4172,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "86a12aee496f294d",
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
        "x": 3361,
        "y": 4207,
        "wires": [
            [
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "5a9cacfdf7fc36fd",
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
        "x": 1931,
        "y": 4297,
        "wires": [
            [
                "9c1008d00c61a98a"
            ]
        ]
    },
    {
        "id": "8dd057e11515b9a5",
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
        "x": 1931,
        "y": 4337,
        "wires": [
            [
                "9c1008d00c61a98a"
            ]
        ]
    },
    {
        "id": "9c1008d00c61a98a",
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
        "x": 2311,
        "y": 4312,
        "wires": [
            [
                "84333c55cf91f54c"
            ]
        ]
    },
    {
        "id": "84333c55cf91f54c",
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
        "x": 2666,
        "y": 4312,
        "wires": [
            [
                "2ff0b3e878ac551e"
            ]
        ]
    },
    {
        "id": "8cbb2c403c553b2f",
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
        "x": 4125,
        "y": 1415,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "e2e8f1523213f122",
                "e1f8da8fa14a6578"
            ]
        ]
    },
    {
        "id": "df99c8befc10a412",
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
        "x": 4125,
        "y": 2145,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "95a0a8e747b9b62f",
                "f26502a8af92e8ce"
            ]
        ]
    },
    {
        "id": "80d0720c7988a5e9",
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
        "x": 4125,
        "y": 1460,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "3fd983b00dd7bc91"
            ]
        ]
    },
    {
        "id": "54bf3df64e1f8c17",
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
        "x": 4123,
        "y": 2184,
        "wires": [
            [
                "5e4c990e4ff494ae",
                "83ed9d6037565a4c"
            ]
        ]
    },
    {
        "id": "aef3b8daf6fde103",
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
        "x": 2691,
        "y": 322,
        "wires": [
            [
                "e6a956eb6bf62ad2"
            ]
        ]
    },
    {
        "id": "c1337c3e24fa99f4",
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
        "x": 2691,
        "y": 357,
        "wires": [
            [
                "e6a956eb6bf62ad2"
            ]
        ]
    },
    {
        "id": "e5186e3f94543fca",
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
        "x": 2176,
        "y": 292,
        "wires": [
            [
                "7b14ab05889d1c1a"
            ]
        ]
    },
    {
        "id": "b9362b461b99d0ba",
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
        "x": 2186,
        "y": 327,
        "wires": [
            [
                "7b14ab05889d1c1a"
            ]
        ]
    },
    {
        "id": "6e053c376cb29fd8",
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
        "x": 2701,
        "y": 392,
        "wires": [
            [
                "e6a956eb6bf62ad2"
            ]
        ]
    },
    {
        "id": "f1387b07c0f71b90",
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
        "x": 2196,
        "y": 362,
        "wires": [
            [
                "7b14ab05889d1c1a"
            ]
        ]
    },
    {
        "id": "e6a956eb6bf62ad2",
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
        "x": 2991,
        "y": 222,
        "wires": [
            [
                "c09a2caa5304bfbd",
                "9acb82a40e619613"
            ]
        ]
    },
    {
        "id": "c09a2caa5304bfbd",
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
        "x": 3291,
        "y": 392,
        "wires": [
            [
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "9acb82a40e619613",
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
        "x": 3286,
        "y": 347,
        "wires": [
            [
                "c17745dbf991b1d6",
                "e328d43a6172d071"
            ]
        ]
    },
    {
        "id": "c17745dbf991b1d6",
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
        "x": 3501,
        "y": 317,
        "wires": []
    },
    {
        "id": "936d4245659d4d43",
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
        "x": 646,
        "y": 512,
        "wires": [
            [
                "514c9189d1cfa57d"
            ]
        ]
    },
    {
        "id": "19518df1856e4ad1",
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
        "x": 926,
        "y": 297,
        "wires": [
            [
                "d6c23ce03937fee2",
                "b7ddc952f6be7a73",
                "2719a0bffec1fc8b",
                "01968fff0d704770",
                "73766bebf9e2571c",
                "db5dace569bfd3b6",
                "f87012de0425f273",
                "7c603969aee12729",
                "98b3fee588cd50a9",
                "bd2fc53693dd4520",
                "32d7b4a937719d9c",
                "160aa95d96969091",
                "b407c34991b1610f",
                "19d66a43b617302d",
                "f02379d9b96fd713"
            ]
        ]
    },
    {
        "id": "132a1061bf3a2aab",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "Parsed Data Output",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 930,
        "y": 110,
        "wires": []
    },
    {
        "id": "f3681b2aed442fc1",
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
        "x": 1326,
        "y": 327,
        "wires": []
    },
    {
        "id": "d6c23ce03937fee2",
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
        "x": 1326,
        "y": 292,
        "wires": []
    },
    {
        "id": "cd6068a0d41635a5",
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
        "x": 1326,
        "y": 402,
        "wires": []
    },
    {
        "id": "b7ddc952f6be7a73",
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
        "x": 1116,
        "y": 352,
        "wires": [
            [
                "f3681b2aed442fc1",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "2719a0bffec1fc8b",
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
        "x": 1116,
        "y": 387,
        "wires": [
            [
                "a47e052e03b4bb8b",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "a47e052e03b4bb8b",
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
        "x": 1326,
        "y": 362,
        "wires": []
    },
    {
        "id": "09c7ea15eea6dc0a",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAA36",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 1106,
        "y": 312,
        "wires": []
    },
    {
        "id": "01968fff0d704770",
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
        "x": 1116,
        "y": 442,
        "wires": [
            [
                "cd6068a0d41635a5",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "73766bebf9e2571c",
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
        "x": 1116,
        "y": 477,
        "wires": [
            [
                "3ae0ad86c4fe830c",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "3ae0ad86c4fe830c",
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
        "x": 1326,
        "y": 442,
        "wires": []
    },
    {
        "id": "77980ad626daf195",
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
        "x": 1326,
        "y": 492,
        "wires": []
    },
    {
        "id": "db5dace569bfd3b6",
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
        "x": 1136,
        "y": 532,
        "wires": [
            [
                "77980ad626daf195",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "bf3af1e82f6207a4",
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
        "x": 1326,
        "y": 532,
        "wires": []
    },
    {
        "id": "f87012de0425f273",
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
        "x": 1136,
        "y": 567,
        "wires": [
            [
                "bf3af1e82f6207a4",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "98b3fee588cd50a9",
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
        "x": 1136,
        "y": 662,
        "wires": [
            [
                "8b8aad3d5bcf24cc",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "7c603969aee12729",
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
        "x": 1136,
        "y": 627,
        "wires": [
            [
                "4b9c53d180369215",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "bd2fc53693dd4520",
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
        "x": 1106,
        "y": 722,
        "wires": [
            [
                "438d90db12575484",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "32d7b4a937719d9c",
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
        "x": 1106,
        "y": 757,
        "wires": [
            [
                "35263edec65127db",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "4b9c53d180369215",
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
        "x": 1326,
        "y": 582,
        "wires": []
    },
    {
        "id": "8b8aad3d5bcf24cc",
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
        "x": 1326,
        "y": 622,
        "wires": []
    },
    {
        "id": "438d90db12575484",
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
        "x": 1326,
        "y": 672,
        "wires": []
    },
    {
        "id": "35263edec65127db",
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
        "x": 1326,
        "y": 712,
        "wires": []
    },
    {
        "id": "160aa95d96969091",
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
        "x": 1106,
        "y": 917,
        "wires": [
            [
                "31957f55f00cb17c",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "b407c34991b1610f",
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
        "x": 1106,
        "y": 952,
        "wires": [
            [
                "8145a70941a6a290",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "31957f55f00cb17c",
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
        "x": 1326,
        "y": 857,
        "wires": []
    },
    {
        "id": "8145a70941a6a290",
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
        "x": 1326,
        "y": 897,
        "wires": []
    },
    {
        "id": "19d66a43b617302d",
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
        "x": 1111,
        "y": 817,
        "wires": [
            [
                "94c3e129729c78d0",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "f02379d9b96fd713",
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
        "x": 1111,
        "y": 852,
        "wires": [
            [
                "b690c9c2060e6cba",
                "fe5c511a9b21fab3"
            ]
        ]
    },
    {
        "id": "94c3e129729c78d0",
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
        "x": 1336,
        "y": 767,
        "wires": []
    },
    {
        "id": "b690c9c2060e6cba",
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
        "x": 1336,
        "y": 807,
        "wires": []
    },
    {
        "id": "d544e563a80e030a",
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
        "x": 921,
        "y": 1047,
        "wires": [
            [
                "f0acdf834be7c33b",
                "96c023e4c3619e12",
                "f6900a7bfd28a616",
                "14d87a3a6df0b2b0",
                "7002782ba2672dc5",
                "3acd7a2f6a8279a0",
                "51f673b556274d15",
                "953ce4cf98d68326",
                "9c03a2186759a223",
                "af75bff0b03bfdea",
                "ac3a498a7581efa9",
                "aaaf5c1035e27d7c",
                "924eafa573032703",
                "d579aa104517808b",
                "6fc75f1e3819e51b"
            ]
        ]
    },
    {
        "id": "69b7f862953e3646",
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
        "x": 1321,
        "y": 1077,
        "wires": []
    },
    {
        "id": "f0acdf834be7c33b",
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
        "x": 1321,
        "y": 1042,
        "wires": []
    },
    {
        "id": "c8370e9376174c2d",
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
        "x": 1321,
        "y": 1152,
        "wires": []
    },
    {
        "id": "96c023e4c3619e12",
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
        "x": 1111,
        "y": 1102,
        "wires": [
            [
                "69b7f862953e3646",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "f6900a7bfd28a616",
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
        "x": 1111,
        "y": 1137,
        "wires": [
            [
                "53c7639cebab1375",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "53c7639cebab1375",
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
        "x": 1321,
        "y": 1112,
        "wires": []
    },
    {
        "id": "ac363711a3840293",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAA35",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 1101,
        "y": 1062,
        "wires": []
    },
    {
        "id": "14d87a3a6df0b2b0",
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
        "x": 1111,
        "y": 1192,
        "wires": [
            [
                "c8370e9376174c2d",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "7002782ba2672dc5",
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
        "x": 1111,
        "y": 1227,
        "wires": [
            [
                "c91c2582da36e5f1",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "c91c2582da36e5f1",
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
        "x": 1321,
        "y": 1192,
        "wires": []
    },
    {
        "id": "d3bf268476a34ed8",
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
        "x": 1321,
        "y": 1242,
        "wires": []
    },
    {
        "id": "3acd7a2f6a8279a0",
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
        "x": 1131,
        "y": 1282,
        "wires": [
            [
                "d3bf268476a34ed8",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "caa5ea54b96c3c4d",
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
        "x": 1321,
        "y": 1282,
        "wires": []
    },
    {
        "id": "51f673b556274d15",
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
        "x": 1131,
        "y": 1317,
        "wires": [
            [
                "caa5ea54b96c3c4d",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "9c03a2186759a223",
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
        "x": 1131,
        "y": 1412,
        "wires": [
            [
                "bc61108aa9c72426",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "953ce4cf98d68326",
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
        "x": 1131,
        "y": 1377,
        "wires": [
            [
                "74ed463bc5a0ee16",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "af75bff0b03bfdea",
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
        "x": 1101,
        "y": 1472,
        "wires": [
            [
                "08142fa73b57285c",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "ac3a498a7581efa9",
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
        "x": 1101,
        "y": 1507,
        "wires": [
            [
                "33b21b35b5d4184b",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "74ed463bc5a0ee16",
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
        "x": 1321,
        "y": 1332,
        "wires": []
    },
    {
        "id": "bc61108aa9c72426",
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
        "x": 1321,
        "y": 1372,
        "wires": []
    },
    {
        "id": "08142fa73b57285c",
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
        "x": 1321,
        "y": 1422,
        "wires": []
    },
    {
        "id": "33b21b35b5d4184b",
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
        "x": 1321,
        "y": 1462,
        "wires": []
    },
    {
        "id": "aaaf5c1035e27d7c",
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
        "x": 1101,
        "y": 1667,
        "wires": [
            [
                "d9effa998ccb6f12",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "924eafa573032703",
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
        "x": 1101,
        "y": 1702,
        "wires": [
            [
                "cfcc23a98f2beea9",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "d9effa998ccb6f12",
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
        "x": 1321,
        "y": 1607,
        "wires": []
    },
    {
        "id": "cfcc23a98f2beea9",
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
        "x": 1321,
        "y": 1647,
        "wires": []
    },
    {
        "id": "d579aa104517808b",
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
        "x": 1106,
        "y": 1567,
        "wires": [
            [
                "5e25c6f81d3da644",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "6fc75f1e3819e51b",
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
        "x": 1106,
        "y": 1602,
        "wires": [
            [
                "485f636a5c4eb58b",
                "e4f57bf9dd70467e"
            ]
        ]
    },
    {
        "id": "5e25c6f81d3da644",
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
        "x": 1331,
        "y": 1517,
        "wires": []
    },
    {
        "id": "485f636a5c4eb58b",
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
        "x": 1331,
        "y": 1557,
        "wires": []
    },
    {
        "id": "e99d3b47f62de967",
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
        "x": 926,
        "y": 1817,
        "wires": [
            [
                "29a780286cf136ed",
                "b9b1808bd9866524",
                "d6acbe773be1cde5",
                "8042e2ce35dca698",
                "e67987cd62d88905",
                "d867bdbfe35da105",
                "79df1ad8c60d92f2",
                "4d93dd49d0a5de16",
                "6bb57aa5c9d1df80",
                "7bc0d1259292142a",
                "bcd0d5b3e1c086cf",
                "ca3ba399086adb1d",
                "9064b6fdedf88dc3",
                "e0a79f98241510c4",
                "f1073ab33bd8da8c"
            ]
        ]
    },
    {
        "id": "8d920e85992bea95",
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
        "x": 1326,
        "y": 1847,
        "wires": []
    },
    {
        "id": "29a780286cf136ed",
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
        "x": 1326,
        "y": 1812,
        "wires": []
    },
    {
        "id": "d61e1a1296e31ccf",
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
        "x": 1326,
        "y": 1922,
        "wires": []
    },
    {
        "id": "b9b1808bd9866524",
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
        "x": 1116,
        "y": 1872,
        "wires": [
            [
                "8d920e85992bea95",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "d6acbe773be1cde5",
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
        "x": 1116,
        "y": 1907,
        "wires": [
            [
                "32a95ce95bd303d6",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "32a95ce95bd303d6",
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
        "x": 1326,
        "y": 1882,
        "wires": []
    },
    {
        "id": "b3b21df5298f4c04",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAA33",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 1106,
        "y": 1832,
        "wires": []
    },
    {
        "id": "8042e2ce35dca698",
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
        "x": 1116,
        "y": 1962,
        "wires": [
            [
                "d61e1a1296e31ccf",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "e67987cd62d88905",
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
        "x": 1116,
        "y": 1997,
        "wires": [
            [
                "45d16bfbd5f03bb1",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "45d16bfbd5f03bb1",
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
        "x": 1326,
        "y": 1962,
        "wires": []
    },
    {
        "id": "8725adc155d46546",
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
        "x": 1326,
        "y": 2012,
        "wires": []
    },
    {
        "id": "d867bdbfe35da105",
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
        "x": 1136,
        "y": 2052,
        "wires": [
            [
                "8725adc155d46546",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "d54cdd3d8967633c",
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
        "x": 1326,
        "y": 2052,
        "wires": []
    },
    {
        "id": "79df1ad8c60d92f2",
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
        "x": 1136,
        "y": 2087,
        "wires": [
            [
                "d54cdd3d8967633c",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "6bb57aa5c9d1df80",
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
        "x": 1136,
        "y": 2182,
        "wires": [
            [
                "fce3f79a4ff02e4f",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "4d93dd49d0a5de16",
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
        "x": 1136,
        "y": 2147,
        "wires": [
            [
                "8614fa911a2cdb0b",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "7bc0d1259292142a",
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
        "x": 1106,
        "y": 2242,
        "wires": [
            [
                "c2918f567a12e439",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "bcd0d5b3e1c086cf",
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
        "x": 1106,
        "y": 2277,
        "wires": [
            [
                "01fbe3f55638a015",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "8614fa911a2cdb0b",
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
        "x": 1326,
        "y": 2102,
        "wires": []
    },
    {
        "id": "fce3f79a4ff02e4f",
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
        "x": 1326,
        "y": 2142,
        "wires": []
    },
    {
        "id": "c2918f567a12e439",
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
        "x": 1326,
        "y": 2192,
        "wires": []
    },
    {
        "id": "01fbe3f55638a015",
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
        "x": 1326,
        "y": 2232,
        "wires": []
    },
    {
        "id": "ca3ba399086adb1d",
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
        "x": 1106,
        "y": 2437,
        "wires": [
            [
                "324950b32bc9b186",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "9064b6fdedf88dc3",
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
        "x": 1106,
        "y": 2472,
        "wires": [
            [
                "32b3ef061982bd86",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "324950b32bc9b186",
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
        "x": 1326,
        "y": 2377,
        "wires": []
    },
    {
        "id": "32b3ef061982bd86",
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
        "x": 1326,
        "y": 2417,
        "wires": []
    },
    {
        "id": "e0a79f98241510c4",
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
        "x": 1111,
        "y": 2337,
        "wires": [
            [
                "c74dc207c6450d2f",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "f1073ab33bd8da8c",
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
        "x": 1111,
        "y": 2372,
        "wires": [
            [
                "75216d602e035848",
                "fc780fea75a678bf"
            ]
        ]
    },
    {
        "id": "c74dc207c6450d2f",
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
        "x": 1336,
        "y": 2287,
        "wires": []
    },
    {
        "id": "75216d602e035848",
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
        "x": 1336,
        "y": 2327,
        "wires": []
    },
    {
        "id": "ce7d9369c9d3a472",
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
        "x": 641,
        "y": 557,
        "wires": [
            [
                "514c9189d1cfa57d"
            ]
        ]
    },
    {
        "id": "5742be0e10cbfed7",
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
        "x": 926,
        "y": 2587,
        "wires": [
            [
                "22f393ea1126b694",
                "3d38fd39f5c86f5c",
                "898f4a5db882bc93",
                "d57fb4a84a414f6f",
                "b39f89da0e1ee217",
                "b48c2d9c24cb7c13",
                "d1f338195ca81a84"
            ]
        ]
    },
    {
        "id": "b43041c5d0fc8e9f",
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
        "x": 1326,
        "y": 2617,
        "wires": []
    },
    {
        "id": "22f393ea1126b694",
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
        "x": 1326,
        "y": 2582,
        "wires": []
    },
    {
        "id": "3d38fd39f5c86f5c",
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
        "x": 1116,
        "y": 2642,
        "wires": [
            [
                "b43041c5d0fc8e9f",
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "898f4a5db882bc93",
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
        "x": 1116,
        "y": 2677,
        "wires": [
            [
                "127b3ded054f6692",
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "127b3ded054f6692",
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
        "x": 1326,
        "y": 2652,
        "wires": []
    },
    {
        "id": "02cafcf93c8b9d07",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAM72",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 1106,
        "y": 2602,
        "wires": []
    },
    {
        "id": "d57fb4a84a414f6f",
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
        "x": 1116,
        "y": 2737,
        "wires": [
            [
                "6f35e153880d394c",
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "b39f89da0e1ee217",
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
        "x": 1116,
        "y": 2772,
        "wires": [
            [
                "53a1845577f402f5",
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "6f35e153880d394c",
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
        "x": 1326,
        "y": 2687,
        "wires": []
    },
    {
        "id": "53a1845577f402f5",
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
        "x": 1326,
        "y": 2722,
        "wires": []
    },
    {
        "id": "b48c2d9c24cb7c13",
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
        "x": 1136,
        "y": 2832,
        "wires": [
            [
                "5d79b90d82cab3c6",
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "d1f338195ca81a84",
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
        "x": 1136,
        "y": 2867,
        "wires": [
            [
                "97bc1c2399126d43",
                "b7842ac57eeda816"
            ]
        ]
    },
    {
        "id": "97bc1c2399126d43",
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
        "x": 1326,
        "y": 2792,
        "wires": []
    },
    {
        "id": "5d79b90d82cab3c6",
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
        "x": 1326,
        "y": 2757,
        "wires": []
    },
    {
        "id": "14441c3a8b56ed55",
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
        "x": 921,
        "y": 2972,
        "wires": [
            [
                "9c873643b9073aed",
                "19ecfcd30cce8e54",
                "e62b723b6c9f771e",
                "ce0dfc7e033f4d55",
                "1e62fce1a0b9f6fa",
                "2d9d9d6927daa8ee",
                "e42253d41df21861"
            ]
        ]
    },
    {
        "id": "35676c9fc1ab59fa",
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
        "x": 1321,
        "y": 3002,
        "wires": []
    },
    {
        "id": "9c873643b9073aed",
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
        "x": 1321,
        "y": 2967,
        "wires": []
    },
    {
        "id": "19ecfcd30cce8e54",
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
        "x": 1111,
        "y": 3027,
        "wires": [
            [
                "35676c9fc1ab59fa",
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "e62b723b6c9f771e",
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
        "x": 1111,
        "y": 3062,
        "wires": [
            [
                "d45a47312e7c0c81",
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "d45a47312e7c0c81",
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
        "x": 1321,
        "y": 3037,
        "wires": []
    },
    {
        "id": "cc89a17b134f63bc",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAM73",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 1101,
        "y": 2987,
        "wires": []
    },
    {
        "id": "ce0dfc7e033f4d55",
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
        "x": 1111,
        "y": 3122,
        "wires": [
            [
                "13eccc1213f79d3c",
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "1e62fce1a0b9f6fa",
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
        "x": 1111,
        "y": 3157,
        "wires": [
            [
                "9bd2b0d8cb24cb52",
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "13eccc1213f79d3c",
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
        "x": 1321,
        "y": 3072,
        "wires": []
    },
    {
        "id": "9bd2b0d8cb24cb52",
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
        "x": 1321,
        "y": 3107,
        "wires": []
    },
    {
        "id": "2d9d9d6927daa8ee",
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
        "x": 1131,
        "y": 3217,
        "wires": [
            [
                "137b7efe880ed532",
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "e42253d41df21861",
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
        "x": 1131,
        "y": 3252,
        "wires": [
            [
                "d03b3e8e6c4859c4",
                "0d8c6635e30bf7d8"
            ]
        ]
    },
    {
        "id": "d03b3e8e6c4859c4",
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
        "x": 1321,
        "y": 3177,
        "wires": []
    },
    {
        "id": "137b7efe880ed532",
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
        "x": 1321,
        "y": 3142,
        "wires": []
    },
    {
        "id": "77225fe18a85e620",
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
        "x": 916,
        "y": 3372,
        "wires": [
            [
                "2c610edae767a69d",
                "64e0396dfeb22aa4",
                "c05d555167c02656",
                "fa7d082b471eb3d2",
                "8884cb3a7016b64a",
                "a1cf4b10b58c3a66",
                "8e6f342055f0f25a"
            ]
        ]
    },
    {
        "id": "4e1d2545ac930dce",
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
        "x": 1316,
        "y": 3402,
        "wires": []
    },
    {
        "id": "2c610edae767a69d",
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
        "x": 1316,
        "y": 3367,
        "wires": []
    },
    {
        "id": "64e0396dfeb22aa4",
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
        "x": 1106,
        "y": 3427,
        "wires": [
            [
                "4e1d2545ac930dce",
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "c05d555167c02656",
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
        "x": 1106,
        "y": 3462,
        "wires": [
            [
                "de6e3242e7dab9f1",
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "de6e3242e7dab9f1",
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
        "x": 1316,
        "y": 3437,
        "wires": []
    },
    {
        "id": "8b7fa25a392bc6fd",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "IAM80",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 1096,
        "y": 3387,
        "wires": []
    },
    {
        "id": "fa7d082b471eb3d2",
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
        "x": 1106,
        "y": 3522,
        "wires": [
            [
                "8dfd8d27a440222e",
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "8884cb3a7016b64a",
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
        "x": 1106,
        "y": 3557,
        "wires": [
            [
                "de9de56e861742ca",
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "8dfd8d27a440222e",
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
        "x": 1316,
        "y": 3472,
        "wires": []
    },
    {
        "id": "de9de56e861742ca",
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
        "x": 1316,
        "y": 3507,
        "wires": []
    },
    {
        "id": "a1cf4b10b58c3a66",
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
        "x": 1126,
        "y": 3617,
        "wires": [
            [
                "d1552153a58af531",
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "8e6f342055f0f25a",
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
        "x": 1126,
        "y": 3652,
        "wires": [
            [
                "10f5891faedced23",
                "15074e4f85875846"
            ]
        ]
    },
    {
        "id": "10f5891faedced23",
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
        "x": 1316,
        "y": 3577,
        "wires": []
    },
    {
        "id": "d1552153a58af531",
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
        "x": 1316,
        "y": 3542,
        "wires": []
    },
    {
        "id": "86fa036699020817",
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
        "x": 926,
        "y": 3802,
        "wires": [
            [
                "959a51be27f05115",
                "9f98bac93734b3c7",
                "4c456e5673d0f785",
                "c73d2a8b58d68406",
                "15ee2e4e01c90b85"
            ]
        ]
    },
    {
        "id": "b2756ce7f1e72040",
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
        "x": 1326,
        "y": 3832,
        "wires": []
    },
    {
        "id": "959a51be27f05115",
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
        "x": 1326,
        "y": 3797,
        "wires": []
    },
    {
        "id": "9f98bac93734b3c7",
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
        "x": 1116,
        "y": 3857,
        "wires": [
            [
                "b2756ce7f1e72040",
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "4c456e5673d0f785",
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
        "x": 1116,
        "y": 3892,
        "wires": [
            [
                "d152e5ddbb00aa38",
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "d152e5ddbb00aa38",
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
        "x": 1326,
        "y": 3867,
        "wires": []
    },
    {
        "id": "b55291783658cdc5",
        "type": "comment",
        "z": "e0eb1e3689d12af2",
        "name": "ISPBR3",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 1106,
        "y": 3817,
        "wires": []
    },
    {
        "id": "c73d2a8b58d68406",
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
        "x": 1116,
        "y": 3952,
        "wires": [
            [
                "0dfb9cc9c5446c9f",
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "15ee2e4e01c90b85",
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
        "x": 1116,
        "y": 3987,
        "wires": [
            [
                "a9f17f214ee76eda",
                "e7b38672778133a1"
            ]
        ]
    },
    {
        "id": "0dfb9cc9c5446c9f",
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
        "x": 1326,
        "y": 3902,
        "wires": []
    },
    {
        "id": "a9f17f214ee76eda",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 224",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1326,
        "y": 3937,
        "wires": []
    },
    {
        "id": "5ce1566fabae94d7",
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
        "x": 641,
        "y": 602,
        "wires": [
            [
                "514c9189d1cfa57d"
            ]
        ]
    },
    {
        "id": "3d1f2e9c8c5d5126",
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
        "x": 5100,
        "y": 735,
        "wires": []
    },
    {
        "id": "0463e5911d8769dd",
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
        "x": 5100,
        "y": 940,
        "wires": []
    },
    {
        "id": "a6fa77b4ca02cee7",
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
        "x": 4384,
        "y": 70,
        "wires": []
    },
    {
        "id": "8b4d1744e45cbf05",
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
        "payload": "*^andonNR^on^#",
        "payloadType": "str",
        "x": 5520,
        "y": 1210,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "7914048df74b0eef",
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
        "payload": "*^andonNR^off^#",
        "payloadType": "str",
        "x": 5530,
        "y": 1250,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "d6ea2a5137ffbb92",
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
        "x": 5770,
        "y": 1330,
        "wires": []
    },
    {
        "id": "1393ac15d0da6992",
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
        "payload": "*^andonD31E^on^#",
        "payloadType": "str",
        "x": 5800,
        "y": 1500,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "4839228cfadf3a93",
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
        "payload": "*^andonD31E^off^#",
        "payloadType": "str",
        "x": 5800,
        "y": 1540,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "c4f857cdccf911d3",
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
        "x": 4384,
        "y": 110,
        "wires": []
    },
    {
        "id": "9854b6ef83042a42",
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
        "x": 4384,
        "y": 150,
        "wires": []
    },
    {
        "id": "edc7cc308f53e743",
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
        "x": 4384,
        "y": 190,
        "wires": []
    },
    {
        "id": "5a3fd35d2a382185",
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
        "x": 4384,
        "y": 230,
        "wires": []
    },
    {
        "id": "bdb1f0e9e79749f3",
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
        "x": 4384,
        "y": 270,
        "wires": []
    },
    {
        "id": "bb63a63d9eb22c58",
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
        "x": 4384,
        "y": 310,
        "wires": []
    },
    {
        "id": "119b6f6a3e7a908a",
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
        "x": 4384,
        "y": 350,
        "wires": []
    },
    {
        "id": "68e1b33f52eba09c",
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
        "x": 4384,
        "y": 390,
        "wires": []
    },
    {
        "id": "d901b9c8c755e6a4",
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
        "x": 4384,
        "y": 430,
        "wires": []
    },
    {
        "id": "c1280f682ea80896",
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
        "x": 4384,
        "y": 470,
        "wires": []
    },
    {
        "id": "06f841b5a90c3709",
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
        "x": 4384,
        "y": 510,
        "wires": []
    },
    {
        "id": "ed756116f940ded0",
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
        "x": 4384,
        "y": 550,
        "wires": []
    },
    {
        "id": "1ec6e1aa0746fcfb",
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
        "x": 4384,
        "y": 590,
        "wires": []
    },
    {
        "id": "a0f395388227cd4c",
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
        "x": 4384,
        "y": 630,
        "wires": []
    },
    {
        "id": "e1f8da8fa14a6578",
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
        "x": 4384,
        "y": 670,
        "wires": []
    },
    {
        "id": "3fd983b00dd7bc91",
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
        "x": 4384,
        "y": 710,
        "wires": []
    },
    {
        "id": "f80f1bb25fc041bf",
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
        "x": 4368,
        "y": 2314,
        "wires": []
    },
    {
        "id": "c4fd84de6604ed2f",
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
        "x": 4368,
        "y": 2354,
        "wires": []
    },
    {
        "id": "1355b296d8c9ace0",
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
        "x": 4368,
        "y": 2394,
        "wires": []
    },
    {
        "id": "c8860d26db709045",
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
        "x": 4368,
        "y": 2434,
        "wires": []
    },
    {
        "id": "c79f7eb4ef8505a2",
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
        "x": 4368,
        "y": 2474,
        "wires": []
    },
    {
        "id": "105aa4b59aa212ba",
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
        "x": 4368,
        "y": 2514,
        "wires": []
    },
    {
        "id": "30df78b080304e0b",
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
        "x": 4368,
        "y": 2554,
        "wires": []
    },
    {
        "id": "523e9da3faf3b330",
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
        "x": 4368,
        "y": 2594,
        "wires": []
    },
    {
        "id": "6cd7cb3ab3284c43",
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
        "x": 4368,
        "y": 2634,
        "wires": []
    },
    {
        "id": "0fa9775e48d7132c",
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
        "x": 4368,
        "y": 2674,
        "wires": []
    },
    {
        "id": "7232685da07b77e2",
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
        "x": 4368,
        "y": 2714,
        "wires": []
    },
    {
        "id": "627e531e3e39974a",
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
        "x": 4368,
        "y": 2754,
        "wires": []
    },
    {
        "id": "5956a548ded1e2e2",
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
        "x": 4368,
        "y": 2794,
        "wires": []
    },
    {
        "id": "7184becd69d53a9f",
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
        "x": 4368,
        "y": 2834,
        "wires": []
    },
    {
        "id": "3b786d236618559a",
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
        "x": 4368,
        "y": 2874,
        "wires": []
    },
    {
        "id": "f26502a8af92e8ce",
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
        "x": 4368,
        "y": 2914,
        "wires": []
    },
    {
        "id": "83ed9d6037565a4c",
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
        "x": 4368,
        "y": 2954,
        "wires": []
    },
    {
        "id": "d14d44ccb3782816",
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
        "x": 170,
        "y": 70,
        "wires": [
            []
        ]
    },
    {
        "id": "9f118eb66decb9cf",
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
        "x": 4740,
        "y": 1530,
        "wires": [
            [
                "c13314e9061031d7",
                "1c82d52e3a891847"
            ]
        ]
    },
    {
        "id": "26bd47b1a565b86b",
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
        "x": 5470,
        "y": 1862,
        "wires": [
            [
                "3044574d7bf62f0f"
            ]
        ]
    },
    {
        "id": "60092f7627c08d84",
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
        "x": 4880,
        "y": 1860,
        "wires": [
            [
                "78060fc12392e178"
            ]
        ]
    },
    {
        "id": "e58907afa064b095",
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
        "x": 4880,
        "y": 1896,
        "wires": [
            [
                "78060fc12392e178"
            ]
        ]
    },
    {
        "id": "3044574d7bf62f0f",
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
        "x": 5650,
        "y": 1862,
        "wires": [
            []
        ]
    },
    {
        "id": "ff87b38f2ae94643",
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
        "x": 4880,
        "y": 1932,
        "wires": [
            [
                "78060fc12392e178"
            ]
        ]
    },
    {
        "id": "78060fc12392e178",
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
        "x": 5090,
        "y": 1890,
        "wires": [
            [
                "5aaaf2592b4b8901"
            ]
        ]
    },
    {
        "id": "0661e4bf2b8718e7",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "Reset Index[0]",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 5470,
        "y": 1790,
        "wires": [
            [
                "e91a933bd2176087"
            ]
        ]
    },
    {
        "id": "f1094ffedade652c",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "Reset All",
        "props": [],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 5480,
        "y": 1826,
        "wires": [
            [
                "4d78f162eeac157b"
            ]
        ]
    },
    {
        "id": "e91a933bd2176087",
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
        "x": 5666,
        "y": 1790,
        "wires": [
            []
        ]
    },
    {
        "id": "4d78f162eeac157b",
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
        "x": 5646,
        "y": 1826,
        "wires": [
            []
        ]
    },
    {
        "id": "a8a831df406af759",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "Queue Status",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 5310,
        "y": 1160,
        "wires": []
    },
    {
        "id": "55b9295ec973ca85",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "",
        "props": [
            {
                "p": "payload.iam73_hopper",
                "v": "true",
                "vt": "bool"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 4688,
        "y": 2034,
        "wires": [
            [
                "e58907afa064b095"
            ]
        ]
    },
    {
        "id": "3abecf362cb3a688",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "",
        "props": [
            {
                "p": "payload.iam80_hopper",
                "v": "true",
                "vt": "bool"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 4688,
        "y": 2070,
        "wires": [
            [
                "ff87b38f2ae94643"
            ]
        ]
    },
    {
        "id": "5eefb957db0ff722",
        "type": "inject",
        "z": "e0eb1e3689d12af2",
        "name": "",
        "props": [
            {
                "p": "payload.iam72_hopper",
                "v": "true",
                "vt": "bool"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 4688,
        "y": 1998,
        "wires": [
            [
                "60092f7627c08d84"
            ]
        ]
    },
    {
        "id": "9d4c57f5b489f683",
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
        "x": 5180,
        "y": 1510,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "5aaaf2592b4b8901",
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
        "x": 5270,
        "y": 1930,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "e4f57bf9dd70467e",
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
        "x": 1646,
        "y": 1297,
        "wires": [
            [
                "e2faeb5fbb82e625",
                "279f11bf2b702045",
                "4be03cbaa5dcc317",
                "edd96dec40b1f940",
                "920185743ede5d10",
                "45fee3208b3f5e5f",
                "6075b0b5890a5212",
                "d8acb0d5ed1fc8eb",
                "4b5a74b8c69421f3",
                "88e3fb720687c63f",
                "f99531e576a66bf7",
                "837e335eaf847542"
            ]
        ]
    },
    {
        "id": "fc780fea75a678bf",
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
        "x": 1661,
        "y": 1962,
        "wires": [
            [
                "ceef7fe642450262",
                "e9da9cbdd572149c",
                "8da9cd59f1650fbf",
                "b0c3624fbdb8c8e2",
                "c8753d81bb10771a",
                "5127806dfddffa3a",
                "daa13e0549b7dfd1",
                "49155fc763a82495",
                "f69b872892a35c1c",
                "e15b287abfcc8e67",
                "ef6532a4c6c6f46c",
                "a3cecdb3986b2867"
            ]
        ]
    },
    {
        "id": "b7842ac57eeda816",
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
        "x": 1641,
        "y": 2997,
        "wires": [
            [
                "bb43fe8eca1cbd34",
                "60a119dec467b46b",
                "93706604f282bf3f",
                "fcd385cf651a9294",
                "30585a3c3d889fc8"
            ]
        ]
    },
    {
        "id": "d6f5bf41c84c9eea",
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
        "x": 2286,
        "y": 412,
        "wires": [
            [
                "1c78e977ae6b41c8",
                "5f9c20891d13dabf",
                "aef3b8daf6fde103",
                "c1337c3e24fa99f4"
            ]
        ]
    },
    {
        "id": "fe5c511a9b21fab3",
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
        "x": 1646,
        "y": 562,
        "wires": [
            [
                "fe9f28f3e7448126",
                "370cbd84b09e928d",
                "d092a4ad463769c0",
                "02dd2e3802ba64a7",
                "2dc6ae30b352312b",
                "16558b5d4849fae3",
                "56f93cc39113693e",
                "8adbd54cab6d0038",
                "c4b60a766263bc46",
                "4e456295aa507b44",
                "33a670113f1f2c02",
                "470c9a1ca19ad337"
            ]
        ]
    },
    {
        "id": "15074e4f85875846",
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
        "x": 1661,
        "y": 3547,
        "wires": [
            [
                "a7e0702752a84d00",
                "5b2f38a880c261c7",
                "1ca075a778453ed5",
                "39cb9542dbbf0f17",
                "ebf1f8479807092e"
            ]
        ]
    },
    {
        "id": "0d8c6635e30bf7d8",
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
        "x": 1641,
        "y": 3267,
        "wires": [
            [
                "6d68b50301ce0613",
                "75b7e96b4d9a336e",
                "4f30ca8b1434f195",
                "5240103e20a6f9ae",
                "a7e2c1ce9443688c"
            ]
        ]
    },
    {
        "id": "e7b38672778133a1",
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
        "x": 1666,
        "y": 3792,
        "wires": [
            [
                "b8b330765b608451",
                "7c66ab7e3039a6f7",
                "15b4a09b317f886a",
                "7888db272694dcc2",
                "a1aeed5b3cc42de9",
                "abc6e5cb91a8ef14",
                "1e4255eda9eb2e34",
                "5a9cacfdf7fc36fd",
                "8dd057e11515b9a5"
            ]
        ]
    },
    {
        "id": "7b14ab05889d1c1a",
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
        "x": 2361,
        "y": 292,
        "wires": [
            [
                "aef3b8daf6fde103",
                "c1337c3e24fa99f4",
                "6e053c376cb29fd8"
            ]
        ]
    },
    {
        "id": "514c9189d1cfa57d",
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
        "x": 756,
        "y": 212,
        "wires": [
            [
                "19518df1856e4ad1",
                "d544e563a80e030a",
                "e99d3b47f62de967",
                "14441c3a8b56ed55",
                "77225fe18a85e620",
                "86fa036699020817",
                "5742be0e10cbfed7",
                "132a1061bf3a2aab"
            ]
        ]
    },
    {
        "id": "c13314e9061031d7",
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
        "x": 4910,
        "y": 1530,
        "wires": [
            [
                "9d4c57f5b489f683",
                "6f42f984bfb2b15f",
                "28ecd284ec622a6d"
            ]
        ]
    },
    {
        "id": "e328d43a6172d071",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "62990f32ac22a85e",
        "name": "",
        "x": 2846,
        "y": 1717,
        "wires": [
            []
        ]
    },
    {
        "id": "8d9748b8fea706b9",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "18c7aa0014d44912",
        "name": "",
        "x": 2796,
        "y": 2412,
        "wires": [
            []
        ]
    },
    {
        "id": "5da3bfdf0ff71639",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "7dcb3745c1f6d11e",
        "name": "",
        "x": 2821,
        "y": 3282,
        "wires": [
            []
        ]
    },
    {
        "id": "a9a6fea75d47955d",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "51e6297883dcba65",
        "name": "",
        "x": 2791,
        "y": 3007,
        "wires": [
            []
        ]
    },
    {
        "id": "879f8366bd50b38e",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "f3c84c2a50e35eda",
        "name": "",
        "x": 2831,
        "y": 1047,
        "wires": [
            []
        ]
    },
    {
        "id": "361196ef433e621f",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "79205502032234cb",
        "name": "",
        "x": 2851,
        "y": 3567,
        "wires": [
            []
        ]
    },
    {
        "id": "2ff0b3e878ac551e",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "d9976337d8f1a2e5",
        "name": "",
        "x": 2936,
        "y": 4267,
        "wires": [
            []
        ]
    },
    {
        "id": "99162f465d7426f8",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 5016,
        "y": 1042,
        "wires": [
            []
        ]
    },
    {
        "id": "f6e4579fc75dfe58",
        "type": "mysql",
        "z": "e0eb1e3689d12af2",
        "mydb": "90f875a253a55c6f",
        "name": "",
        "x": 5575,
        "y": 845,
        "wires": [
            []
        ]
    },
    {
        "id": "95aca09dd408c0a8",
        "type": "serial in",
        "z": "e0eb1e3689d12af2",
        "name": "",
        "serial": "6041935c01dca937",
        "x": 180,
        "y": 120,
        "wires": [
            [
                "514c9189d1cfa57d",
                "aef3b8daf6fde103",
                "c1337c3e24fa99f4",
                "d6f5bf41c84c9eea"
            ]
        ]
    },
    {
        "id": "2976b30de20f4c01",
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
        "x": 5340,
        "y": 1214,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "057d4c0ec8954784",
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
        "x": 5350,
        "y": 1254,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "6f42f984bfb2b15f",
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
        "x": 5180,
        "y": 1550,
        "wires": [
            [
                "d6ea2a5137ffbb92"
            ]
        ]
    },
    {
        "id": "ddfcb8ac1f0cdeb7",
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
        "x": 4710,
        "y": 1470,
        "wires": [
            [
                "c13314e9061031d7"
            ]
        ]
    },
    {
        "id": "1c82d52e3a891847",
        "type": "debug",
        "z": "e0eb1e3689d12af2",
        "name": "debug 281",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 4930,
        "y": 1570,
        "wires": []
    },
    {
        "id": "363cf992e07e39a8",
        "type": "trigger",
        "z": "e0eb1e3689d12af2",
        "name": "Wait to be reset",
        "op1": "d31e",
        "op2": "Reset Triggered",
        "op1type": "str",
        "op2type": "str",
        "duration": "0",
        "extend": false,
        "overrideDelay": false,
        "units": "s",
        "reset": "reset",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 4830,
        "y": 1210,
        "wires": [
            [
                "535ad963538a231a"
            ]
        ]
    },
    {
        "id": "60fb8adb18782676",
        "type": "trigger",
        "z": "e0eb1e3689d12af2",
        "name": "Wait to be reset",
        "op1": "d31e",
        "op2": "Reset Triggered",
        "op1type": "str",
        "op2type": "str",
        "duration": "0",
        "extend": false,
        "overrideDelay": false,
        "units": "s",
        "reset": "reset",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 4830,
        "y": 1260,
        "wires": [
            [
                "535ad963538a231a"
            ]
        ]
    },
    {
        "id": "3bc0c0a4648ec8cb",
        "type": "trigger",
        "z": "e0eb1e3689d12af2",
        "name": "Wait to be reset",
        "op1": "nr",
        "op2": "Reset Triggered",
        "op1type": "str",
        "op2type": "str",
        "duration": "0",
        "extend": false,
        "overrideDelay": false,
        "units": "s",
        "reset": "reset",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 4830,
        "y": 1310,
        "wires": [
            [
                "535ad963538a231a"
            ]
        ]
    },
    {
        "id": "535ad963538a231a",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "Control_andon_barel",
        "func": "let andon_gas = msg.payload;\n\n\nif(andon_gas === \"d31e\"){\n    msg.payload = \"*^andonNR^on^#\";\n    return msg;\n} else if(andon_gas === \"nr\"){\n    msg.payload = \"*^andonD31E^on^#\";\n    return msg;\n}\n\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 5130,
        "y": 1310,
        "wires": [
            [
                "d6ea2a5137ffbb92",
                "a8a831df406af759"
            ]
        ]
    },
    {
        "id": "28ecd284ec622a6d",
        "type": "function",
        "z": "e0eb1e3689d12af2",
        "name": "reset_andon",
        "func": "let barel = msg.payload[1];\nlet after_proses = msg.payload[3];\n\nif(barel === \"ispbr3\" && after_proses === \"0\"){\n    msg.payload = \"reset\";\n    return msg;\n}\nelse{\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 5180,
        "y": 1470,
        "wires": [
            [
                "3bc0c0a4648ec8cb",
                "60fb8adb18782676",
                "363cf992e07e39a8"
            ]
        ]
    },
    {
        "id": "ea9a9cb2e2bd0379",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.1.10",
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
        "id": "6041935c01dca937",
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
