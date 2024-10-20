if ( 
    msg.payload.iaa33_pin == "1" || msg.payload.iaa33_roller == "1" || 
    msg.payload.iaa33_arm == "1" || msg.payload.iaa35_pin == "1" || 
    msg.payload.iaa35_roller == "1" || msg.payload.iaa35_arm == "1" ||
    msg.payload.iaa36_pin == "1" || msg.payload.iaa36_roller == "1" ||
    msg.payload.iaa36_arm == "1" || msg.payload.iam72_hopper == "1" ||
    msg.payload.iam72_mc_fault == "1" || msg.payload.iam73_hopper == "1" || 
    msg.payload.iam73_mc_fault == "1" || msg.payload.iam80_hopper == "1" ||
    msg.payload.iam80_mc_fault == "1" || msg.payload.ispbr3_mc_fault == "1"
) {
    msg.payload = '1';
} else if(
    msg.payload.iaa33_pin != "1" || msg.payload.iaa33_roller != "1" || 
    msg.payload.iaa33_arm != "1" || msg.payload.iaa35_pin != "1" || 
    msg.payload.iaa35_roller != "1" || msg.payload.iaa35_arm != "1" ||
    msg.payload.iaa36_pin != "1" || msg.payload.iaa36_roller != "1" ||
    msg.payload.iaa36_arm != "1" || msg.payload.iam72_hopper != "1" ||
    msg.payload.iam72_mc_fault != "1" || msg.payload.iam73_hopper != "1" || 
    msg.payload.iam73_mc_fault != "1" || msg.payload.iam80_hopper != "1" ||
    msg.payload.iam80_mc_fault != "1" || msg.payload.ispbr3_mc_fault != "1"
){
    msg.payload = '1';
}
return msg;