[
    {
        "id": "a082bfc0b389e543",
        "type": "inject",
        "z": "f88832762c676b94",
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
        "x": 325,
        "y": 155,
        "wires": [
            [
                "21fc47aaf1928cec"
            ]
        ]
    },
    {
        "id": "09dcaae574f1dcf6",
        "type": "mysql",
        "z": "f88832762c676b94",
        "mydb": "20b9be7945a83b3f",
        "name": "",
        "x": 3020,
        "y": 1025,
        "wires": [
            []
        ]
    },
    {
        "id": "93430d9834d2184f",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "parsing IAA36",
        "func": "\nif(msg.payload[1] === \"iaa36\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 135,
        "wires": [
            [
                "3e2191a75b82b937",
                "e6ef30a26e877991",
                "3eb0db386de28f57",
                "3ffb56cfb5f305e3",
                "791b6134ab74c80b",
                "8cc585ae873741ac",
                "bf9e5b56635f981e",
                "30ebcada90d9e8c9",
                "72d15db3fcaa3cc4",
                "d212cf55adaf95c6",
                "092c20dfbe05e760",
                "60b9b0cb9595b5b3",
                "b471fec5a06f14d1",
                "2e12b36413399e33",
                "c889e6485c11ebe9"
            ]
        ]
    },
    {
        "id": "21fc47aaf1928cec",
        "type": "string",
        "z": "f88832762c676b94",
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
        "x": 430,
        "y": 50,
        "wires": [
            [
                "93430d9834d2184f",
                "4",
                "2fbf62b16f959986",
                "53b3095bdc3948dd",
                "21954c27d8265d2c",
                "20d51f40a0fd8bd0",
                "0b43c3cedafb97f0"
            ]
        ]
    },
    {
        "id": "4",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "Parsed Data Output",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "x": 1040,
        "y": 45,
        "wires": []
    },
    {
        "id": "1f8be00a2a4d275a",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 87",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 165,
        "wires": []
    },
    {
        "id": "3e2191a75b82b937",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 88",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 130,
        "wires": []
    },
    {
        "id": "14d3c3ea94893a70",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 89",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 240,
        "wires": []
    },
    {
        "id": "e6ef30a26e877991",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"iaa36on_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 190,
        "wires": [
            [
                "1f8be00a2a4d275a"
            ]
        ]
    },
    {
        "id": "3eb0db386de28f57",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"iaa36off_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 225,
        "wires": [
            [
                "41a91be97bb8e247"
            ]
        ]
    },
    {
        "id": "41a91be97bb8e247",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 90",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 200,
        "wires": []
    },
    {
        "id": "639881dbec5e2835",
        "type": "comment",
        "z": "f88832762c676b94",
        "name": "IAA36",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 780,
        "y": 150,
        "wires": []
    },
    {
        "id": "3ffb56cfb5f305e3",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"iaa36on_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 280,
        "wires": [
            [
                "14d3c3ea94893a70"
            ]
        ]
    },
    {
        "id": "791b6134ab74c80b",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"iaa36off_fullwork\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 315,
        "wires": [
            [
                "294fede140c56557"
            ]
        ]
    },
    {
        "id": "294fede140c56557",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 91",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 280,
        "wires": []
    },
    {
        "id": "6e23b13241c8e415",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 92",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 330,
        "wires": []
    },
    {
        "id": "8cc585ae873741ac",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"iaa36on_qualitycheck\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 370,
        "wires": [
            [
                "6e23b13241c8e415"
            ]
        ]
    },
    {
        "id": "1862265bb997cb82",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 93",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 370,
        "wires": []
    },
    {
        "id": "bf9e5b56635f981e",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"iaa36off_qualitycheck\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 405,
        "wires": [
            [
                "1862265bb997cb82"
            ]
        ]
    },
    {
        "id": "72d15db3fcaa3cc4",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"iaa36off_toolchange\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 500,
        "wires": [
            [
                "9d72a9e271ea976a"
            ]
        ]
    },
    {
        "id": "30ebcada90d9e8c9",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"iaa36on_toolchange\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 465,
        "wires": [
            [
                "0ee56ee52f5d6a0b"
            ]
        ]
    },
    {
        "id": "d212cf55adaf95c6",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"iaa36on_arm\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 560,
        "wires": [
            [
                "45337acd1a911fdf"
            ]
        ]
    },
    {
        "id": "092c20dfbe05e760",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"iaa36off_arm\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 595,
        "wires": [
            [
                "f91edc93d6a9a395"
            ]
        ]
    },
    {
        "id": "0ee56ee52f5d6a0b",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 94",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 420,
        "wires": []
    },
    {
        "id": "9d72a9e271ea976a",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 95",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 460,
        "wires": []
    },
    {
        "id": "45337acd1a911fdf",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 96",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 510,
        "wires": []
    },
    {
        "id": "f91edc93d6a9a395",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 97",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 550,
        "wires": []
    },
    {
        "id": "60b9b0cb9595b5b3",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"iaa36on_pin\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 755,
        "wires": [
            [
                "fd7434b3f4429db0"
            ]
        ]
    },
    {
        "id": "b471fec5a06f14d1",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"iaa36off_pin\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 790,
        "wires": [
            [
                "8d7e4c22b5bb7d6a"
            ]
        ]
    },
    {
        "id": "fd7434b3f4429db0",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 98",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 695,
        "wires": []
    },
    {
        "id": "8d7e4c22b5bb7d6a",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 99",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 735,
        "wires": []
    },
    {
        "id": "2e12b36413399e33",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"iaa36on_roller\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 655,
        "wires": [
            [
                "f9807b24da0f168c"
            ]
        ]
    },
    {
        "id": "c889e6485c11ebe9",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"iaa36off_roller\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 690,
        "wires": [
            [
                "f8ab8981e4c3c9f4"
            ]
        ]
    },
    {
        "id": "f9807b24da0f168c",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 100",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1010,
        "y": 605,
        "wires": []
    },
    {
        "id": "f8ab8981e4c3c9f4",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 101",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1010,
        "y": 645,
        "wires": []
    },
    {
        "id": "2fbf62b16f959986",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "parsing IAA35",
        "func": "\nif(msg.payload[1] === \"iaa35\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 595,
        "y": 885,
        "wires": [
            [
                "3340c8f5d86a6719",
                "8ceaee415a87f810",
                "a8b73420a69e5c62",
                "42129b03dff2dbd2",
                "721c1cadb110d1ce",
                "0ecd6f635b637959",
                "d16cd393d4f65b48",
                "91f5a4e8f660651a",
                "1522c8a82f22949a",
                "9444e0d5df303718",
                "eed18c93b5fb9948",
                "5aae45b12c8c7009",
                "e29fac8b8c69b45f",
                "f1c0123fc2eefac5",
                "52ae5632f41b7b31"
            ]
        ]
    },
    {
        "id": "cfd8470a3c63ffe2",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 102",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 915,
        "wires": []
    },
    {
        "id": "3340c8f5d86a6719",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 103",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 880,
        "wires": []
    },
    {
        "id": "5c41a9a124e961a8",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 104",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 990,
        "wires": []
    },
    {
        "id": "8ceaee415a87f810",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"iaa35on_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 940,
        "wires": [
            [
                "cfd8470a3c63ffe2"
            ]
        ]
    },
    {
        "id": "a8b73420a69e5c62",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"iaa35off_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 975,
        "wires": [
            [
                "df550c51e9f0f93d"
            ]
        ]
    },
    {
        "id": "df550c51e9f0f93d",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 105",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 950,
        "wires": []
    },
    {
        "id": "1605e07f381bd328",
        "type": "comment",
        "z": "f88832762c676b94",
        "name": "IAA35",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 775,
        "y": 900,
        "wires": []
    },
    {
        "id": "42129b03dff2dbd2",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"iaa35on_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 1030,
        "wires": [
            [
                "5c41a9a124e961a8"
            ]
        ]
    },
    {
        "id": "721c1cadb110d1ce",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"iaa35off_fullwork\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 1065,
        "wires": [
            [
                "d0fc28e2c17e358e"
            ]
        ]
    },
    {
        "id": "d0fc28e2c17e358e",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 106",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1030,
        "wires": []
    },
    {
        "id": "8ffae0371d17fb25",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 107",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1080,
        "wires": []
    },
    {
        "id": "0ecd6f635b637959",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"iaa35on_qualitycheck\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1120,
        "wires": [
            [
                "8ffae0371d17fb25"
            ]
        ]
    },
    {
        "id": "ba5bf8ced153af9e",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 108",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1120,
        "wires": []
    },
    {
        "id": "d16cd393d4f65b48",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"iaa35off_qualitycheck\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1155,
        "wires": [
            [
                "ba5bf8ced153af9e"
            ]
        ]
    },
    {
        "id": "1522c8a82f22949a",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"iaa35off_toolchange\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1250,
        "wires": [
            [
                "c80b2eaecf636d7b"
            ]
        ]
    },
    {
        "id": "91f5a4e8f660651a",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"iaa35on_toolchange\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1215,
        "wires": [
            [
                "0e2f2dd1e6adccda"
            ]
        ]
    },
    {
        "id": "9444e0d5df303718",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"iaa35on_arm\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 775,
        "y": 1310,
        "wires": [
            [
                "b510c44235f0d4fc"
            ]
        ]
    },
    {
        "id": "eed18c93b5fb9948",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"iaa35off_arm\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 775,
        "y": 1345,
        "wires": [
            [
                "d09a273c8ee97eb6"
            ]
        ]
    },
    {
        "id": "0e2f2dd1e6adccda",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 109",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1170,
        "wires": []
    },
    {
        "id": "c80b2eaecf636d7b",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 110",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1210,
        "wires": []
    },
    {
        "id": "b510c44235f0d4fc",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 111",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1260,
        "wires": []
    },
    {
        "id": "d09a273c8ee97eb6",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 112",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1300,
        "wires": []
    },
    {
        "id": "5aae45b12c8c7009",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"iaa35on_pin\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 775,
        "y": 1505,
        "wires": [
            [
                "27d13601f9c22a79"
            ]
        ]
    },
    {
        "id": "e29fac8b8c69b45f",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"iaa35off_pin\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 775,
        "y": 1540,
        "wires": [
            [
                "79d7029ad83450a6"
            ]
        ]
    },
    {
        "id": "27d13601f9c22a79",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 113",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1445,
        "wires": []
    },
    {
        "id": "79d7029ad83450a6",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 114",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 1485,
        "wires": []
    },
    {
        "id": "f1c0123fc2eefac5",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"iaa35on_roller\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 1405,
        "wires": [
            [
                "2da0021175a2e8f4"
            ]
        ]
    },
    {
        "id": "52ae5632f41b7b31",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"iaa35off_roller\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 1440,
        "wires": [
            [
                "9b85ec6abe7d6a7b"
            ]
        ]
    },
    {
        "id": "2da0021175a2e8f4",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 115",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1005,
        "y": 1355,
        "wires": []
    },
    {
        "id": "9b85ec6abe7d6a7b",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 116",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1005,
        "y": 1395,
        "wires": []
    },
    {
        "id": "53b3095bdc3948dd",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "parsing IAA33",
        "func": "\nif(msg.payload[1] === \"iaa33\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a4: msg.payload[4],\n        a5: msg.payload[5],\n        a13: msg.payload[6],\n        a14: msg.payload[7],\n        a15: msg.payload[8]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 1655,
        "wires": [
            [
                "086beeba726d8057",
                "369fd908eefb6fde",
                "171dfec34b13a4c8",
                "1cb799addc505d2f",
                "b929f64570ea652f",
                "5810f01436c98b22",
                "2dc1d3ced2b39bb7",
                "d64125212167cbfb",
                "9bca7737b82a562d",
                "a8ab61541ebf9b44",
                "f177531ab140fa41",
                "47cb2eb83d2d1fd9",
                "f4ab6694d8f1d292",
                "a97b227875d7e7c5",
                "422e517eba4585d6"
            ]
        ]
    },
    {
        "id": "5a83912f4cac38ea",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 117",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1685,
        "wires": []
    },
    {
        "id": "086beeba726d8057",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 118",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1650,
        "wires": []
    },
    {
        "id": "3174f725195a122c",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 119",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1760,
        "wires": []
    },
    {
        "id": "369fd908eefb6fde",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"iaa33on_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 1710,
        "wires": [
            [
                "5a83912f4cac38ea"
            ]
        ]
    },
    {
        "id": "171dfec34b13a4c8",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaultoff",
        "func": "if(msg.payload.a2 === \"1\"){\n    msg.payload = \"iaa33off_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 1745,
        "wires": [
            [
                "3d11c2193e125368"
            ]
        ]
    },
    {
        "id": "3d11c2193e125368",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 120",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1720,
        "wires": []
    },
    {
        "id": "b5d6e64975408eed",
        "type": "comment",
        "z": "f88832762c676b94",
        "name": "IAA33",
        "info": "String dataOnA2 = \"*iaa33on_mcfault#\";\nString dataOnA3 = \"*iaa33on_fullwork#\";\nString dataOnA4 = \"*iaa33on_qualitycheck#\";\nString dataOnA5 = \"*iaa33on_toolchange#\";\nString dataOnA13 = \"*iaa33on_arm#\";\nString dataOnA14 = \"*iaa33on_roller#\";\nString dataOnA15 = \"*iaa33on_pin#\";\nString dataOffA2 = \"*iaa33off_mcfault#\";\nString dataOffA3 = \"*iaa33off_fullwork#\";\nString dataOffA4 = \"*iaa33off_qualitycheck#\";\nString dataOffA5 = \"*iaa33off_toolchange#\";\nString dataOffA13 = \"*iaa33off_arm#\";\nString dataOffA14 = \"*iaa33off_roller#\";\nString dataOffA15 = \"*iaa33off_pin#\";",
        "x": 780,
        "y": 1670,
        "wires": []
    },
    {
        "id": "1cb799addc505d2f",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"iaa33on_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 1800,
        "wires": [
            [
                "3174f725195a122c"
            ]
        ]
    },
    {
        "id": "b929f64570ea652f",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkoff",
        "func": "if (msg.payload.a3 === \"1\") {\n    msg.payload = \"iaa33off_fullwork\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 1835,
        "wires": [
            [
                "819571748ff0ce78"
            ]
        ]
    },
    {
        "id": "819571748ff0ce78",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 121",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1800,
        "wires": []
    },
    {
        "id": "646935ca4815b3b7",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 122",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1850,
        "wires": []
    },
    {
        "id": "5810f01436c98b22",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "qualitycheckon",
        "func": "if(msg.payload.a4 === \"0\"){\n    msg.payload = \"iaa33on_qualitycheck\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1890,
        "wires": [
            [
                "646935ca4815b3b7"
            ]
        ]
    },
    {
        "id": "96f8d72d47d97d31",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 123",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1890,
        "wires": []
    },
    {
        "id": "2dc1d3ced2b39bb7",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "qualitycheckoff",
        "func": "if(msg.payload.a4 === \"1\"){\n    msg.payload = \"iaa33off_qualitycheck\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1925,
        "wires": [
            [
                "96f8d72d47d97d31"
            ]
        ]
    },
    {
        "id": "9bca7737b82a562d",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "toolchangeoff",
        "func": "if(msg.payload.a5 === \"1\"){\n    msg.payload = \"iaa33off_toolchange\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 2020,
        "wires": [
            [
                "7ec0aab1e6fdc3b7"
            ]
        ]
    },
    {
        "id": "d64125212167cbfb",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "toolchangeon",
        "func": "if(msg.payload.a5 === \"0\"){\n    msg.payload = \"iaa33on_toolchange\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1985,
        "wires": [
            [
                "f123a50bb14f1e0b"
            ]
        ]
    },
    {
        "id": "a8ab61541ebf9b44",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "armon",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"iaa33on_arm\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 2080,
        "wires": [
            [
                "54eb0c90b46443e4"
            ]
        ]
    },
    {
        "id": "f177531ab140fa41",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "armoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"iaa33off_arm\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 2115,
        "wires": [
            [
                "866652b5613ca28d"
            ]
        ]
    },
    {
        "id": "f123a50bb14f1e0b",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 124",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1940,
        "wires": []
    },
    {
        "id": "7ec0aab1e6fdc3b7",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 125",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 1980,
        "wires": []
    },
    {
        "id": "54eb0c90b46443e4",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 126",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2030,
        "wires": []
    },
    {
        "id": "866652b5613ca28d",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 127",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2070,
        "wires": []
    },
    {
        "id": "47cb2eb83d2d1fd9",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "pinon",
        "func": "if(msg.payload.a15 === \"0\"){\n    msg.payload = \"iaa33on_pin\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 2275,
        "wires": [
            [
                "2f5c932198e5e0d1"
            ]
        ]
    },
    {
        "id": "f4ab6694d8f1d292",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "pinoff",
        "func": "if(msg.payload.a15 === \"1\"){\n    msg.payload = \"iaa33off_pin\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 2310,
        "wires": [
            [
                "20bfc89e7571549d"
            ]
        ]
    },
    {
        "id": "2f5c932198e5e0d1",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 128",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2215,
        "wires": []
    },
    {
        "id": "20bfc89e7571549d",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 129",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2255,
        "wires": []
    },
    {
        "id": "a97b227875d7e7c5",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "rolleron",
        "func": "if(msg.payload.a14 === \"0\"){\n    msg.payload = \"iaa33on_roller\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 2175,
        "wires": [
            [
                "253d3e4bf77138cb"
            ]
        ]
    },
    {
        "id": "422e517eba4585d6",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "rolleroff",
        "func": "if(msg.payload.a14 === \"1\"){\n    msg.payload = \"iaa33off_roller\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 2210,
        "wires": [
            [
                "ae2b4ee8c3c84a23"
            ]
        ]
    },
    {
        "id": "253d3e4bf77138cb",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 130",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1010,
        "y": 2125,
        "wires": []
    },
    {
        "id": "ae2b4ee8c3c84a23",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 131",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1010,
        "y": 2165,
        "wires": []
    },
    {
        "id": "d9dcf3b3577271b3",
        "type": "inject",
        "z": "f88832762c676b94",
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
        "x": 320,
        "y": 200,
        "wires": [
            [
                "21fc47aaf1928cec"
            ]
        ]
    },
    {
        "id": "21954c27d8265d2c",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "parsing IAM72",
        "func": "\nif(msg.payload[1] === \"iam72\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 600,
        "y": 2425,
        "wires": [
            [
                "46368589e2b729bb",
                "06e5cef1fcd40753",
                "e1bc1bc963e84bc7",
                "7d84b99eb4f18a5e",
                "14c31543ab5108cf",
                "594ce85b8c5ec839",
                "32a600acc1661a52"
            ]
        ]
    },
    {
        "id": "292620d21827d8ab",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 132",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2455,
        "wires": []
    },
    {
        "id": "46368589e2b729bb",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 133",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2420,
        "wires": []
    },
    {
        "id": "06e5cef1fcd40753",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"iam72on_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2480,
        "wires": [
            [
                "292620d21827d8ab"
            ]
        ]
    },
    {
        "id": "e1bc1bc963e84bc7",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"iam72off_mcfault\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2515,
        "wires": [
            [
                "91b2b6464abfd256"
            ]
        ]
    },
    {
        "id": "91b2b6464abfd256",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 135",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2490,
        "wires": []
    },
    {
        "id": "ad4123b326e42264",
        "type": "comment",
        "z": "f88832762c676b94",
        "name": "IAM72",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 780,
        "y": 2440,
        "wires": []
    },
    {
        "id": "7d84b99eb4f18a5e",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"iam72on_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2575,
        "wires": [
            [
                "5f3b8a2b691ca79c"
            ]
        ]
    },
    {
        "id": "14c31543ab5108cf",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"iam72off_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2610,
        "wires": [
            [
                "c912492df41638b4"
            ]
        ]
    },
    {
        "id": "5f3b8a2b691ca79c",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 136",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2525,
        "wires": []
    },
    {
        "id": "c912492df41638b4",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 137",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2560,
        "wires": []
    },
    {
        "id": "594ce85b8c5ec839",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"iam72on_hoppernopart\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 2670,
        "wires": [
            [
                "97fc84621d3c7a3a"
            ]
        ]
    },
    {
        "id": "32a600acc1661a52",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"iam72off_hoppernopart\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 2705,
        "wires": [
            [
                "834c5f76b4625203"
            ]
        ]
    },
    {
        "id": "834c5f76b4625203",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 138",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2630,
        "wires": []
    },
    {
        "id": "97fc84621d3c7a3a",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 139",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1000,
        "y": 2595,
        "wires": []
    },
    {
        "id": "20d51f40a0fd8bd0",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "parsing IAM73",
        "func": "\nif(msg.payload[1] === \"iam73\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 595,
        "y": 2810,
        "wires": [
            [
                "138ec2ef10b610af",
                "de72df291a0ecbee",
                "c00bf563debdcf2c",
                "59df44d57ce712e3",
                "dc039d368a3e8983",
                "bb605dcc91524240",
                "6af694673c61a45e"
            ]
        ]
    },
    {
        "id": "2704aa03e0630686",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 140",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 2840,
        "wires": []
    },
    {
        "id": "138ec2ef10b610af",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 141",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 2805,
        "wires": []
    },
    {
        "id": "de72df291a0ecbee",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"iam73on_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 2865,
        "wires": [
            [
                "2704aa03e0630686"
            ]
        ]
    },
    {
        "id": "c00bf563debdcf2c",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"iam73off_mcfault\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 2900,
        "wires": [
            [
                "3c7919bdfb27e960"
            ]
        ]
    },
    {
        "id": "3c7919bdfb27e960",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 142",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 2875,
        "wires": []
    },
    {
        "id": "daea4a67adf849ae",
        "type": "comment",
        "z": "f88832762c676b94",
        "name": "IAM73",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 775,
        "y": 2825,
        "wires": []
    },
    {
        "id": "59df44d57ce712e3",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"iam73on_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 2960,
        "wires": [
            [
                "859b4584ea443b8d"
            ]
        ]
    },
    {
        "id": "dc039d368a3e8983",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"iam73off_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 2995,
        "wires": [
            [
                "61360694ed37231f"
            ]
        ]
    },
    {
        "id": "859b4584ea443b8d",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 143",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 2910,
        "wires": []
    },
    {
        "id": "61360694ed37231f",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 144",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 2945,
        "wires": []
    },
    {
        "id": "bb605dcc91524240",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"iam73on_hoppernopart\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 3055,
        "wires": [
            [
                "479e5e2de155db48"
            ]
        ]
    },
    {
        "id": "6af694673c61a45e",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"iam73off_hoppernopart\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 3090,
        "wires": [
            [
                "418471a226a150bf"
            ]
        ]
    },
    {
        "id": "418471a226a150bf",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 145",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 3015,
        "wires": []
    },
    {
        "id": "479e5e2de155db48",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 146",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 2980,
        "wires": []
    },
    {
        "id": "0b43c3cedafb97f0",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "parsing IAM80",
        "func": "\nif(msg.payload[1] === \"iam80\"){\n    let output = {\n        a2: msg.payload[2],\n        a3: msg.payload[3],\n        a13: msg.payload[4]\n    };\n    msg.payload = output;\n    return msg;\n}\n\nelse {\n    return null;\n}\n\n\n\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 590,
        "y": 3210,
        "wires": [
            [
                "ddfa6bea6c3fc1cf",
                "c0e522a18ef5c487",
                "8299b34e739de2aa",
                "452c6a70051c96a0",
                "87eb48ad075c4c52",
                "0706b7c5ceb09b9c",
                "8acce9a8ba458de2"
            ]
        ]
    },
    {
        "id": "b9e1c7804f4a173a",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 147",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 990,
        "y": 3240,
        "wires": []
    },
    {
        "id": "ddfa6bea6c3fc1cf",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 148",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 990,
        "y": 3205,
        "wires": []
    },
    {
        "id": "c0e522a18ef5c487",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaulton",
        "func": "if(msg.payload.a2 === \"0\"){\n    msg.payload = \"iam80on_mcfault\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 3265,
        "wires": [
            [
                "b9e1c7804f4a173a"
            ]
        ]
    },
    {
        "id": "8299b34e739de2aa",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "mcfaultoff",
        "func": "if (msg.payload.a2 === \"1\") {\n    msg.payload = \"iam80off_mcfault\";\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 3300,
        "wires": [
            [
                "f9163989875ccfc5"
            ]
        ]
    },
    {
        "id": "f9163989875ccfc5",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 149",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 990,
        "y": 3275,
        "wires": []
    },
    {
        "id": "68e7e35c2925f297",
        "type": "comment",
        "z": "f88832762c676b94",
        "name": "IAM80",
        "info": "\nString dataOnA2 = \"*iam72on_mcfault#\";\nString dataOnA3 = \"*iam72on_fullwork#\";\nString dataOnA13 = \"*iam72on_hoppernopart#\";\nString dataOffA2 = \"*iam72off_mcfault#\";\nString dataOffA3 = \"*iam72off_fullwork#\";\nString dataOffA13 = \"*iam72off_hoppernopart#\";",
        "x": 770,
        "y": 3225,
        "wires": []
    },
    {
        "id": "452c6a70051c96a0",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkon",
        "func": "if(msg.payload.a3 === \"0\"){\n    msg.payload = \"iam80on_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 3360,
        "wires": [
            [
                "99e7c5a095b266da"
            ]
        ]
    },
    {
        "id": "87eb48ad075c4c52",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "fullworkoff",
        "func": "if(msg.payload.a3 === \"1\"){\n    msg.payload = \"iam80off_fullwork\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 780,
        "y": 3395,
        "wires": [
            [
                "2b6419a501c2ced3"
            ]
        ]
    },
    {
        "id": "99e7c5a095b266da",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 150",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 990,
        "y": 3310,
        "wires": []
    },
    {
        "id": "2b6419a501c2ced3",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 151",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 990,
        "y": 3345,
        "wires": []
    },
    {
        "id": "0706b7c5ceb09b9c",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "hoppernoparton",
        "func": "if(msg.payload.a13 === \"0\"){\n    msg.payload = \"iam80on_hoppernopart\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 3455,
        "wires": [
            [
                "5f65537baa871563"
            ]
        ]
    },
    {
        "id": "8acce9a8ba458de2",
        "type": "function",
        "z": "f88832762c676b94",
        "name": "hoppernopartoff",
        "func": "if(msg.payload.a13 === \"1\"){\n    msg.payload = \"iam80off_hoppernopart\";\n    return msg;\n}else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 3490,
        "wires": [
            [
                "eac6eb34ed8fc06b"
            ]
        ]
    },
    {
        "id": "eac6eb34ed8fc06b",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 152",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 990,
        "y": 3415,
        "wires": []
    },
    {
        "id": "5f65537baa871563",
        "type": "debug",
        "z": "f88832762c676b94",
        "name": "debug 153",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 990,
        "y": 3380,
        "wires": []
    },
    {
        "id": "20b9be7945a83b3f",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_oee_roller_arm",
        "tz": "",
        "charset": "UTF8"
    }
]