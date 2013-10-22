
getElements("section1", "section2");

function getElements () {
	var element_ids = [];
	var count = 0;
	for (count = 0; count < arguments.length; count++) {
		element_ids[count] = document.getElementById(arguments[count]);
	}
	
	for (count = 0; count < element_ids.length; count++){
		console.log(element_ids[count]);
	}
}
