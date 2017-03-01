// define globals
var monthly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

$(document).on("ready", function() {
  getData();
});

function getData () {
  $.ajax({
    method: 'GET',
    url: monthly_quakes_endpoint,
    dataType: 'json',
    success: onSuccess,
    error: onError
  });
}

function onSuccess (data) {
  data.features.forEach(function (earthquake) {
    var currentTimeInMs = Date.now();
    var earthquakeTimeInMs = earthquake.properties.time;
    var time = (currentTimeInMs - earthquakeTimeInMs) / (1000*60*60);
    var title = earthquake.properties.title;
    $('#info').append('<strong>' + title + ' / ' + Math.round(time) + ' hours ago' + '</strong>' + '<br>');
  });
}

function onError(xhr, status, errorThrown) {
 alert("Sorry, there was a problem!");
 console.log("Error: " + errorThrown);
 console.log("Status: " + status);
 console.dir(xhr);
}



