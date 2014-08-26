function findDecDeg(coord) {
	var coordstr = coord.toString(); //converts to string
	var coordar = coordstr.split(','); //converts to array
	var decimalised = (parseFloat(coordar.slice(0,1)) + (parseFloat(coordar.slice(1,2))/60) + (parseFloat(coordar.slice(2,3))/3600)).toFixed(6);
	console.log(decimalised);
	return(decimalised);
};