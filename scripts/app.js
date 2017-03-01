// define globals

var map;
$(document).on("ready", function() {
  initMap();
  getData();
});

function getData () {
  var monthly_quakes_endpoint = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

  $.ajax({
    method: 'GET',
    url: monthly_quakes_endpoint,
    dataType: 'json',
    success: onSuccess,
    error: onError
  });
}


function initMap() {

  var myLatLng = {lat: 37.78, lng: -122.44};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: myLatLng
  });

}

function onSuccess (data) {
  data.features.forEach(function (earthquake) {
    var currentTimeInMs = Date.now();
    var earthquakeTimeInMs = earthquake.properties.time;
    var time = (currentTimeInMs - earthquakeTimeInMs) / (1000*60*60);
    var title = earthquake.properties.title;
    new google.maps.Marker({
      position: new google.maps.LatLng(
        earthquake.geometry.coordinates[1],
        earthquake.geometry.coordinates[0]
      ),
      map: map,
      title: earthquake.properties.title
    });
    $('#info').append('<strong>' + title + '</strong>' + ' / ' + Math.round(time) + ' hours ago' + '<br>');
  });
}

function onError(xhr, status, errorThrown) {
 alert("Sorry, there was a problem!");
 console.log("Error: " + errorThrown);
 console.log("Status: " + status);
 console.dir(xhr);
}



