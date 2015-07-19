var baseUrl = "http://jobs.github.com/positions.json?";
var description = "description=";
var location_param = "location=";
var searchData;
var map;
var geocoder;

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); console.log("heck"); }    
});

function search () {
    // body...
    var language = document.getElementById('search-bar').value;
    var url = baseUrl;
    url = url + description + language;
    console.log(url);
    $.ajax({
    type:"GET", 
    url: url, 
    success: function(data) {
        searchData = data;
        console.log(url);
        showJobs(searchData);
        }, 
    error: function(jqXHR, textStatus, errorThrown) {
            alert(jqXHR.status);
            console.log("hello");
        }
});
}
  function codeAddress(address, job) {

    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            title: "title"
        });

  var contentString = '<div id="content" style="height:400px; width:600px; ">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<img src="' + job.company_logo + '" style="width:100px; float:right;" alt="">' +
      '<h1 id="firstHeading" class="firstHeading">' + job.company + '</h1>'+
      '<div id="bodyContent">'+
      job.description +
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });


    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

      } else {
      }
    });
  }
  function makeJobMarker(job){
    var location = job.location;
    var company = job.company;
    console.log(company);
    codeAddress(location, job);
  }
  function showJobs(jobs){
    for (var i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        makeJobMarker(job);
    };
  }
function initialize() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 5,
    center: {lat: 37.397, lng: -97},
    disableDefaultUI: true
  });
}

google.maps.event.addDomListener(window, 'load', initialize);