let query = location.search;
let value = query.split('=');
let end_status = value[1];

if(end_status === 'ok1') {
    $('#step1').addClass('endstep');

}else if(end_status === 'ok2') {
    $('#step1').addClass('endstep');
    $('#step2').addClass('endstep');

}else if(end_status === 'ok3') {
    $('#step1').addClass('endstep');
    $('#step2').addClass('endstep');
    $('#step3').addClass('endstep');

}else if(end_status === 'ok4') {
    $('#step1').addClass('endstep');
    $('#step2').addClass('endstep');
    $('#step3').addClass('endstep');
    $('#step4').addClass('endstep');
    $('#step5').removeClass('hidden');

}else if (end_status === 'ok5'){
    $('#step1').addClass('endstep');
    $('#step2').addClass('endstep');
    $('#step3').addClass('endstep');
    $('#step4').addClass('endstep');
    $('#step5').removeClass('hidden');

}else {
    console.log(end_status);
}
