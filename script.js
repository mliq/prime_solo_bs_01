var apikey = 'b5749836178866bb15f4b41b15ac30c692573f21'; // Put your API key here
var i = 0;
var str;
var imgURL;

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    str = '';

    for(i = 0;i < 9; i++){
        console.log(results[i]);

        //image
        if(!results[i].image){
            imgURL = "sad_face.jpg";
        } else {
            imgURL = results[i].image.small_url;
        }

        str += "<div class='well col-md-4'>" +
            "<img class='hidden-sm hidden-xs' src=" + imgURL + "><br>"
        + "</div>";

    }
    $('.results').append(str);
}

$(document).ready(function() {

	// Start the search here!
	search('batman');
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
