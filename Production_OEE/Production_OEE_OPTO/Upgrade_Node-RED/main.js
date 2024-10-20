


let data = msg.payload.trim();
if (data.startsWith('*^iaa36^') && data.endsWith('^#')) {
    let parsedData = data.slice(9, -2).split('^');
    let output = {
        a2: parsedData[0],
        a3: parsedData[1],
        a4: parsedData[2],
        a5: parsedData[3],
        a13: parsedData[4],
        a14: parsedData[5],
        a15: parsedData[6]
    };


    if(output.a2 === "1"){
        msg.payload = "*iaa36on_mcfault#";
    }else if(output.a2 === "0"){
        msg.payload = "*iaa36off_mcfault#"
    }
    
    if(output.a3 === "1"){
        msg.payload = "*iaa36on_fullwork#"
    }else if(output.a3 === "0"){
        msg.payload = "*iaa36off_fullwork#"
    }
    
    
    if(output.a4 === "1"){
        msg.payload = "*iaa36on_toolchange#"
    }else if(output.a4 === "0"){
        msg.payload = "*iaa36off_toolchange#"
    }
    
    if(output.a5 === "1"){
        msg.payload = "*iaa36on_qualitycheck#"
    }else if(output.a5 === "0"){
        msg.payload = "*iaa36off_qualitycheck#"
    }
    
    
    if(output.a13 === "1"){
        msg.payload = "*iaa36on_arm#"
    }else if(output.a13 === "0"){
        msg.payload = "*iaa36off_arm#"
    }
    
    
    if(output.a14 === "1"){
        msg.payload = "*iaa36on_roller#"
    }else if(output.a14 === "0"){
        msg.payload = "*iaa36off_roller#"
    }
    
    if(output.a15 === "1"){
        msg.payload = "*iaa36on_pin#"
    }else if(output.a15 === "0"){
        msg.payload = "*iaa36off_pin#"
    }


    // msg.payload = output;
    // return msg;
} else {
    return null;
}