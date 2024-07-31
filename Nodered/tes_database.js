[
    {
        "id": "d1f0b9f5.48814",
        "type": "inject",
        "z": "969a48b7aefa4d8e",
        "name": "Trigger Random Data",
        "props": [],
        "repeat": "1",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 225,
        "y": 100,
        "wires": [
            [
                "bd4e9d4c.0372c8"
            ]
        ]
    },
    {
        "id": "bd4e9d4c.0372c8",
        "type": "function",
        "z": "969a48b7aefa4d8e",
        "name": "Generate Random Data",
        "func": "// Fungsi untuk menghasilkan angka random antara min dan max\nfunction getRandomInt(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\n\n// Menghasilkan data random\nvar data = {\n    iaa33_bearing: getRandomInt(0, 10),\n    iaa33_pin: getRandomInt(0, 10),\n    iaa33_arm: getRandomInt(0, 10),\n    iaa35_bearing: getRandomInt(0, 10),\n    iaa35_pin: getRandomInt(0, 10),\n    iaa35_arm: getRandomInt(0, 10),\n    iaa36_bearing: getRandomInt(0, 10),\n    iam36_pin: getRandomInt(0, 10),\n    iam36_arm: getRandomInt(0, 10),\n    iam72_hopper: getRandomInt(0, 10),\n    iam72_mc_fault: getRandomInt(0, 10),\n    iam73_hopper: getRandomInt(0, 10),\n    iam73_mc_fault: getRandomInt(0, 10),\n    iam80_hopper: getRandomInt(0, 10),\n    iam80_mc_fault: getRandomInt(0, 10)\n};\n\n// Format data untuk query MySQL\nvar query = `\n    UPDATE table_condition_andon\n    SET iaa33_bearing = ${data.iaa33_bearing},\n        iaa33_pin = ${data.iaa33_pin},\n        iaa33_arm = ${data.iaa33_arm},\n        iaa35_bearing = ${data.iaa35_bearing},\n        iaa35_pin = ${data.iaa35_pin},\n        iaa35_arm = ${data.iaa35_arm},\n        iaa36_bearing = ${data.iaa36_bearing},\n        iaa36_pin = ${data.iam36_pin},\n        iaa36_arm = ${data.iam36_arm},\n        iam72_hopper = ${data.iam72_hopper},\n        iam72_mc_fault = ${data.iam72_mc_fault},\n        iam73_hopper = ${data.iam73_hopper},\n        iam73_mc_fault = ${data.iam73_mc_fault},\n        iam80_hopper = ${data.iam80_hopper},\n        iam80_mc_fault = ${data.iam80_mc_fault}\n    WHERE id = 1\n`;\n\n// Set payload ke query\nmsg.topic = query; // pastikan ini adalah string\nreturn msg;\n",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 135,
        "wires": [
            [
                "c8f0a0b2.2f5698"
            ]
        ]
    },
    {
        "id": "c8f0a0b2.2f5698",
        "type": "mysql",
        "z": "969a48b7aefa4d8e",
        "mydb": "d4c7c07e.d9e338",
        "name": "MySQL Database",
        "x": 735,
        "y": 125,
        "wires": [
            []
        ]
    },
    {
        "id": "d4c7c07e.d9e338",
        "type": "MySQLdatabase",
        "name": "database_tps_oee_roller_arm",
        "host": "localhost",
        "port": "3306",
        "db": "database_tps_oee_roller_arm",
        "tz": "",
        "charset": ""
    }
]
