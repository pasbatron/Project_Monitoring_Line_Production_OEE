let data = msg.payload.trim();

// Check if the data matches the expected format
if (data.startsWith('*^iaa36^') && data.endsWith('^#')) {
    // Remove the starting and ending markers
    let parsedData = data.slice(9, -2).split('^');
    
    // Create an object to hold the parsed values
    let output = {
        a2: parsedData[0],
        a3: parsedData[1],
        a4: parsedData[2],
        a5: parsedData[3],
        a13: parsedData[4],
        a14: parsedData[5],
        a15: parsedData[6]
    };
    
    // Return the parsed values as the new message payload
    msg.payload = output;
    return msg;
} else {
    // If the data doesn't match the format, discard it
    return null;
}