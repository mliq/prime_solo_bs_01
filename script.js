var apikey = 'b5749836178866bb15f4b41b15ac30c692573f21'; // Put your API key here
var i = 0;
var str;
var imgURL;

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    str = '';

    for (i = 0; i < 9; i++) {
        console.log(results[i]);

        //image
        if (!results[i].image) {
            imgURL = "sad_face.jpg";
        } else {
            imgURL = results[i].image.small_url;
        }
        // Put in rows
        if( i % 3 == 0){
            str += "<div class='row'>"
        }
        str += "<div class='well col-md-4 col-sm-6 col-xs-6'>" +
            "<img class='hidden-sm hidden-xs' src=" + imgURL + ">"
            + "<br><p class='lead'>" + results[i].name
            + "</p><br>" + results[i].deck
            + "<br><button class='btn-success btn'>Remove Title</button>"
            + "</div>";
        if( (i+1) % 3 == 0){
            str += "</div>"
        }

    }
    $('.results').append(str).hide().fadeIn(1000);

    $('.btn').on('click', function () {
        $(this).parent('div').fadeOut(1000);
    });
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
