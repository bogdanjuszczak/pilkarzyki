$(document).ready(function(){
	$('.switch').bootstrapSwitch();
});

var socket = io.connect('10.2.3.57');

socket.on('values', function(data){
    if( data.motion == 1  )
    {
        data.motion = "Yes";
    }
    else
    {
        data. motion = "No";
    }

    $('#motion').html(data.motion);

});


