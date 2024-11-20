function loadPastReviews(){
	// list of variables used to get the past reviews
	var request = new XMLHttpRequest();
	var sReviews;
	var jReviews;

	// path which contains the list of past reviews which are stored as JSON
	var data = 'data/reviews.json';

	request.open("GET", data, false);
	request.send();

	// parse the data
	sReviews = request.responseText.trim();

	jReviews = JSON.parse(sReviews);
	console.log(jReviews);

	seePastReviews(jReviews);
}

// output each review into website
function seePastReviews(jReviews){
	var past_reviews = document.getElementById("past-reviews");
	var i;

	// checks whether there are any past reviews stored
	// if there are, then add in subtitle for Past Reviews
	if (jReviews.length > 0){
		past_reviews.innerHTML += "<h3>Past Reviews</h3><br>";
	}

	// output each review element into website accordingly
	for (i=0; i < jReviews.length; i++){
        	past_reviews.innerHTML += "Name: <input type=\"text\" id=\"past-name-"+i+"\" readonly /><br>";
        	document.getElementById("past-name-"+i).setAttribute("value", jReviews[i].name);
        	past_reviews.innerHTML += "Date/Time: <input style=\"width: 15%;\" id=\"past-date-"+i+"\" value="+jReviews[i].date+" readonly /><input style=\"width: 15%;\" type=\"time\" id=\"past-time-"+i+"\" value="+jReviews[i].time+" readonly /><br>";
        	document.getElementById("past-date-"+i).setAttribute("value", jReviews[i].date);
        	document.getElementById("past-time-"+i).setAttribute("value", jReviews[i].time);
        	past_reviews.innerHTML += "Message: <br><textarea style=\"resize: none;\"cols=\"110\" rows=10 id=\"past-message-"+i+"\" readonly></textarea><br>";
        	document.getElementById("past-message-"+i).innerHTML += jReviews[i].message;
        	if (i != jReviews.length-1)
            		past_reviews.innerHTML += "<hr style=\"border: 2.55px dashed rgb(255, 0, 0);\">";
    }
}

// partially complete function - sends fully written review and stores it inside JSON file
function sendReviews(){
	// path which contains the JSON file to store the review

	var data = 'data/reviews.json';

	var fdata = new FormData();
	var request = new XMLHttpRequest();
	var jresp;

	// HTML elements from where to get the data from
	var inpName = document.getElementById("inpName");
	var inpDate = document.getElementById("inpDate");
	var inpTime = document.getElementById("inpTime");
	var inpMessage = document.getElementById("inpMessage");

	// populate the data we are going to send
	fdata.append("name", inpName.value);
	fdata.append("date", inpDate.value);
	fdata.append("time", inpTime.value);
	fdata.append("message", inpMessage.value);

	// send the data
	request.open("POST", "/echo", false);
	request.send(fdata);

	// receive and parse the output data
	jresp = JSON.parse(request.responseText);
	console.log(jresp);

	// write data to a JSON file - had problems with this
	/*fs.writeFile(data, jresp, err => {
		if (err){
			throw err;
		}
		console.log("JSON data is saved in file!");
	});*/
}
