

var map;
var marker;
var panorama;
var sv = new google.maps.StreetViewService();
var origGuessRadius = 15000;
var guessRadius = origGuessRadius;
var antarcticaGuessRadius = 50;
//var move = true;
//var userMove = true; 
var move = false;
var userMove = false; 

function initialize() {

	// define starting position
	//var startLatLng = new google.maps.LatLng(-34.426877,172.677569);
	//var startPOV = {
	//	heading: -94.61285624115608,
	//	pitch: -6.512494032401798
	//	};
	//var startPanoId = "";
	
	//var startLatLng = new google.maps.LatLng(34.382816,133.81918700000006);
	//var startPOV = {
	//	heading: 168.67769302465837,
	//	pitch: -22.17911371648465
	//	};
	//var startPanoId = "";
	
	//var startLatLng = new google.maps.LatLng(58.510765,-6.254835);
	//var startPOV = {
	//	heading: 59.09, //29.09
	//	pitch: -8.64
	//	};
	//var startPanoId = "";	
	
	var startLatLng = new google.maps.LatLng(45.59378,6.387059);
	var startPOV = {
		heading: -74.80941654130463-20,
		pitch: -2.09764660998822
		};
	var startPanoId = "";
		
	// parse url for lat/lng/yaw/pitch
	var llyp = gup( 'llyp' );
	llyp = llyp.replace(/%2C/g,",");
	if (llyp == "") {
	} else {
		var llyp_array = llyp.split(",");
		var llyp_lat = llyp_array[0];
		var llyp_lng = llyp_array[1];
		var llyp_yaw = llyp_array[2];
		var llyp_pitch = llyp_array[3];
		eval("startLatLng = new google.maps.LatLng(" + llyp_lat + "," + llyp_lng + ");");
		eval("startPOV = {heading:" + llyp_yaw + ",pitch:" + llyp_pitch + "};");
		startPanoId = '';
	}		
	
	// initialize command panel map
	var mapOptions = {
		center: startLatLng,
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		streetViewControl: false,
		mapTypeControl: false
		};
	map = new google.maps.Map( document.getElementById('map-canvas'), mapOptions);
	
	// initialize marker
	marker = new google.maps.Marker({
		position: startLatLng,
		map: map
		});
	
	// initialize panorama
	var panoramaOptions = {
		position: startLatLng,
		pov: startPOV,
		addressControl: true
		};
	panorama  = new google.maps.StreetViewPanorama(document.getElementById("pano"), panoramaOptions);
	
	if (startPanoId.length != 0) {
		panorama.setPano(startPanoId);
	}
	
	// initialize mouse listeners
	$("#pano").on("mouseenter", function () {
		move = false;
	});
	$("#pano").on("mouseleave", function () {
		move = true;
	});
	
	// rotate pov	
	window.setInterval(function() {
		var currPov = panorama.getPov();
			if (userMove) {
				if (move) {
					currPov.heading  += 0.1;
					panorama.setPov(currPov);
				}
				//panorama.setPov(currPov);
			}
		}, 10);
	
	
	// parse url for continent mask
	var loc = gup( 'loc' );
	if (loc == "") {
	} else {
		document.continents.continents[0].checked = false;
		document.continents.continents[1].checked = false;
		document.continents.continents[2].checked = false;
		document.continents.continents[3].checked = false;
		document.continents.continents[4].checked = false;
		document.continents.continents[5].checked = false;
		document.continents.continents[6].checked = false;	
		
		if (loc.charAt(0) == "1") {
				document.continents.continents[0].checked = true;}

		if (loc.charAt(1) == "1") {
				document.continents.continents[1].checked = true;}				

		if (loc.charAt(2) == "1") {
				document.continents.continents[2].checked = true;}		

		if (loc.charAt(3) == "1") {
				document.continents.continents[3].checked = true;}				

		if (loc.charAt(4) == "1") {
				document.continents.continents[4].checked = true;}			

		if (loc.charAt(5) == "1") {
				document.continents.continents[5].checked = true;}		

		if (loc.charAt(6) == "1") {
				document.continents.continents[6].checked = true;}					
			
	}
	
	// parse url for auto selection
	var auto = gup( 'auto' );
	if (auto == "10s") {
		document.getElementById('autoonmed').checked = true;
		setTimeout('next();', 1500);
	}
	if (auto == "30s") {
		document.getElementById('autoonslow').checked = true;
		setTimeout('next();', 1500);
	}	
	
	// parse url for video embed
	var vid = gup( 'vid' );
	if (vid == "") {
	} else {
		document.getElementById('audio').innerHTML = '<iframe width="32" height="27" src="https://web.archive.org/web/20240122220808/http://www.youtube.com/embed/' + vid + '?autoplay=1" frameborder="0"></iframe>'
	}
	
}

function next() {

	// parse continent mask
	var NorthAmerica = 0;
	var Europe = 0;
	var Africa = 0;
	var Asia = 0;
	var Australia = 0;
	var SouthAmerica = 0;
	var Antarctica = 0;
	
	if (document.continents.continents[5].checked) {
		NorthAmerica = 1; }
	if (document.continents.continents[4].checked) {
		Europe = 1; }
	if (document.continents.continents[0].checked) {
		Africa = 1; }
	if (document.continents.continents[2].checked) {
		Asia = 1; }
	if (document.continents.continents[3].checked) {
		Australia = 1; }
	if (document.continents.continents[6].checked) {
		SouthAmerica = 1; }
	if (document.continents.continents[1].checked) {
		Antarctica = 1; }
		
	if (!document.continents.continents[0].checked && !document.continents.continents[1].checked && !document.continents.continents[2].checked && !document.continents.continents[3].checked && !document.continents.continents[4].checked  && !document.continents.continents[5].checked  && !document.continents.continents[6].checked) {
		NorthAmerica = 1;
		Europe = 1;
		Africa = 1;
		Asia = 1;
		Australia = 1;
		SouthAmerica = 1;
		Antarctica = 1;
	}
	
	// generate valid location
	validLocation = 0;
	
	while(validLocation<1) {
		var randLat = Math.random()*180-90;
		var randLong = Math.random()*360-180;
		
		//NORTH AMERICAN STREETVIEW COUNTRIES
		if (NorthAmerica==1 && (randLat < 40.111689) &&  (randLat > 31.578535) && (randLong < -73.388672) && (randLong > -126.5625)) {
			validLocation = 1;
		}
		
		if (NorthAmerica==1 && (randLat < 33.651208) &&  (randLat > 12.297068) && (randLong < -78.925781) && (randLong > -119.091797)) {
			validLocation = 1;
		}
		
		if (NorthAmerica==1 && (randLat < 50.625073) &&  (randLat > 39.571822) && (randLong < -52.822266) && (randLong > -125.771484)) {
			validLocation = 1;
		}
		
		if (NorthAmerica==1 && (randLat < 56.218923) &&  (randLat > 46.679594) && (randLong < -94.921875) && (randLong > -129.199219)) {
			validLocation = 1;
		}
		
		if (NorthAmerica==1 && (randLat < 71.045529) &&  (randLat > 53.014783) && (randLong < -116.015625) && (randLong > -153.544922)) {
			validLocation = 1;
		}
		
		if (NorthAmerica==1 && (randLat < 23.137834) &&  (randLat > 18.154986) && (randLong < -154.116211) && (randLong > -161.389160)) {
			validLocation = 1;
		}
		
		if (NorthAmerica==1 && (randLat < 50.625073) &&  (randLat > 31.128199) && (randLong < -102.744141) && (randLong > -126.474609)) {
			validLocation = 1;
		}
		
		//EUROPEAN STREETVIEW COUNTRIES
		if (Europe==1 && (randLat < 61.980267) &&  (randLat > 34.307144) && (randLong < 20.654297) && (randLong > -11.953125)) {
			validLocation = 1;
		}
		
		if (Europe==1 && (randLat < 70.612614) &&  (randLat > 54.162434) && (randLong < 31.376953) && (randLong > 4.570313)) {
			validLocation = 1;
		}
		
		if (Europe==1 && (randLat < 55.3915921070334) &&  (randLat > 51.31688050404585) && (randLong < -5.55908203125) && (randLong > -10.65673828125)) {
			validLocation = 1;
		}
		
		if (Europe==1 && (randLat < 58.74540696858028) &&  (randLat > 55.4040698270061) && (randLong < -1.8017578125) && (randLong > -7.75634765625)) {
			validLocation = 1;
		}
		
		if (Europe==1 && (randLat < 59.44507509904714) &&  (randLat > 58.63121664342478) && (randLong < -2.30712890625) && (randLong > -3.6474609375)) {
			validLocation = 1;
		}
		
		if (Europe==1 && (randLat < 60.866312474622596) &&  (randLat > 59.833775202184206) && (randLong < -0.59326171875) && (randLong > -1.8017578125)) {
			validLocation = 1;
		}
	
		
		//AFRICAN STREETVIEW COUNTRIES
		if (Africa==1 && (randLat < -22.87744) &&  (randLat > -31.147006) && (randLong < 31.992188) && (randLong > 22.719727)) {
			validLocation = 1;
		}
		
		if (Africa==1 && (randLat < -31.071756) &&  (randLat > -34.885931) && (randLong < 29.641113) && (randLong > 17.753906)) {
			validLocation = 1;
		}
		
		if (Africa==1 && (randLat < 28.719496) &&  (randLat > 27.605671) && (randLong < -15.216064) && (randLong > -17.072754)) {
			validLocation = 1;
		}
		
		if (Africa==1 && (randLat < -16.767727) &&  (randLat > -36.000230) && (randLong < 37.045898) && (randLong > 14.721680)) {
			validLocation = 1;
		}		
		
		//ASIAN STREETVIEW COUNTRIES
		if (Asia==1 && (randLat < 44.276671) &&  (randLat > 34.089061) && (randLong < 143.129883) && (randLong > 138.383789)) {
			validLocation = 1;
		}
		
		if (Asia==1 && (randLat < 38.203655) &&  (randLat > 29.993002) && (randLong < 138.55957) && (randLong > 129.155273)) {
			validLocation = 1;
		}
		
		if (Asia==1 && (randLat < 28.497661) &&  (randLat > 25.938287) && (randLong < 129.946289) && (randLong > 127.419434)) {
			validLocation = 1;
		}
		
		if (Asia==1 && (randLat < 25.080624) &&  (randLat > 24.126702) && (randLong < 125.491333) && (randLong > 123.535767)) {
			validLocation = 1;
		}
		
		if (Asia==1 && (randLat < 25.353955) &&  (randLat > 21.769703) && (randLong < 122.124023) && (randLong > 119.893799)) {
			validLocation = 1;
		}
		
		if (Asia==1 && (randLat < 22.614011) &&  (randLat > 22.044913) && (randLong < 114.359436) && (randLong > 113.442078)) {
			validLocation = 1;
		}
		
		if (Asia==1 && (randLat < 1.503581) &&  (randLat > 1.227628) && (randLong < 104.015808) && (randLong > 103.596954)) {
			validLocation = 1;
		}
		
		if (Asia==1 && (randLat < 20.744556) &&  (randLat > 7.652300) && (randLong < 104.996338) && (randLong > 98.102417)) {
			validLocation = 1;
		}		
		
		
		
		//AUSTRALIAN STREETVIEW COUNTRIES
		if (Australia==1 && (randLat < -33.72434) &&  (randLat > -47.398349) && (randLong < 178.857422) && (randLong > 165.673828)) {
			validLocation = 1;
		}
		
		if (Australia==1 && (randLat < -10.660608) &&  (randLat > -37.09024) && (randLong < 138.164063) && (randLong > 111.884766)) {
			validLocation = 1;
		}
		
		if (Australia==1 && (randLat < -9.102097) &&  (randLat > -44.465151) && (randLong < 154.951172) && (randLong > 136.230469)) {
			validLocation = 1;
		}
		
		//SOUTH AMERICAN STREETVIEW COUNTRIES
		if (SouthAmerica==1 && (randLat < -17.86374708440522) &&  (randLat > -20.879342971957897) && (randLong < -42.86865234375) && (randLong > -44.989013671875)) {
			validLocation = 1;
		}
		
		if (SouthAmerica==1 && (randLat < -19.770419081436607) &&  (randLat > -19.813222194938504) && (randLong < -45.649566650390625) && (randLong > -45.71685791015625)) {
			validLocation = 1;
		}
		
		if (SouthAmerica==1 && (randLat < -21.089625396733936) &&  (randLat > -21.179609858280518) && (randLong < -44.14684295654297) && (randLong > -44.29412841796875)) {
			validLocation = 1;
		}
		
		if (SouthAmerica==1 && (randLat < -22.080549718325063) &&  (randLat > -23.039297747769726) && (randLong < -41.8524169921875) && (randLong > -44.3023681640625)) {
			validLocation = 1;
		}
		
		if (SouthAmerica==1 && (randLat < -22.553147478403194) &&  (randLat > -24.497146320571886) && (randLong < -45.59326171875) && (randLong > -47.691650390625)) {
			validLocation = 1;
		}
		
		if (SouthAmerica==1 && (randLat < 15.151672) &&  (randLat > -56.860986) && (randLong < -32.475586) && (randLong > -84.902344)) {
			validLocation = 1;
		}		
		
		//ANTARCTICA STREETVIEW COUNTRIES
		//FOR CASE WHEN OTHERS ARE CHECKED
		if (Antarctica==1 && (NorthAmerica==1 || SouthAmerica==1 || Asia==1 || Europe==1 || Australia==1 || Africa==1)) {
			if (Antarctica==1 && (randLat < -62.59340009224205) &&  (randLat > -62.59713336759491) && (randLong < -59.89346981048584) && (randLong > -59.907803535461426)) {
				validLocation = 1;
			}
		}
		//FOR CASE WHEN ONLY ANTARCTICA
		if (Antarctica==1 && !(NorthAmerica==1 || SouthAmerica==1 || Asia==1 || Europe==1 || Australia==1 || Africa==1)) {
			validLocation = 1;
		
			randLat = Math.random()*0.003733275352857-62.597133367594918;
			randLong = Math.random()*0.014333724975586-59.907803535461426;
			
			guessRadius = antarcticaGuessRadius;
			
		}
	}	
	
	// submit guess
	var nextGuess = new google.maps.LatLng(randLat,randLong);
	document.getElementById('spinner').style.visibility = 'visible';
	
	//alert(guessRadius);
	sv.getPanoramaByLocation(nextGuess, guessRadius, processSVData);

}

function processSVData(data,status) {

	if (status == google.maps.StreetViewStatus.OK) {
	
		// reset pov		
		//if (panorama.getPov().pitch != 0) {
		//	var currPOV = {
		//		heading: 270,
		//		pitch: 0
		//		};
		//	panorama.setPov(currPOV);
		//}
	
		// reset panorama
		var markerPanoID = data.location.pano;
		panorama.setPano(markerPanoID);
		
		// reset map
		map.setCenter(data.location.latLng);		
		
		// reset marker
		marker.setPosition(data.location.latLng);
		
		// reset spinner
		document.getElementById('spinner').style.visibility = 'hidden';	
		
		// auto on
		if(document.getElementById('autoonmed').checked) {
			setTimeout('next();', 10000); }	
		if(document.getElementById('autoonslow').checked) {
			setTimeout('next();', 30000); }
			
		//alert(guessRadius)
			
		// reset guess radius
		guessRadius = origGuessRadius;
	
	} else {
	
		// increase guess radius exponentially and retry
		var growthCoeff = 1;
		guessRadius = Math.round(guessRadius*growthCoeff);
		next();	
	}
	
}


google.maps.event.addDomListener(window, 'load', initialize);

// ===================== slow pan =====================

function slowpan_on(boolVal) {
	userMove = boolVal;
}



// ===================== supporting functions ===================== 

function hotkey(e) {
	var keynum

	if(window.event) // IE
		{keynum = e.keyCode}
	else if(e.which) // Netscape/Firefox/Opera
		{keynum = e.which}

	if (keynum == 13 || keynum == 32) {next();}
}

function gup(name)
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
	return "";
  else
	return results[1];
}
