function getAngle(time){
	if(time){
		var fields = time.split(':');
		var hour = fields[0];
		var minute = fields[1];
		
		var hourValue = hour*30;
		var minuteValue = minute*0.5;
		var angle = minute*6;
		var totalAngle = (hourValue + minuteValue) - angle;
		
		document.getElementById('result').style.display = "block";
		document.getElementById('time').innerHTML = hour + ':' +minute;
		document.getElementById('angle').innerHTML = totalAngle + ' degrees';
	}
	else{
		alert("Please select time.");
	}
}