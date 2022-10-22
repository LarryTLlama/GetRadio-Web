 let notiAllow = null; 
 function inAppNoti(content, colour) {
	if(colour == "red") document.getElementById('notis').innerHTML += `<button style="width: 100%; text-align: center;" id="coolcancelbutton"><p>${content}</p></button>`;
	if(colour == "green") document.getElementById('notis').innerHTML += `<button style="width: 100%; text-align: center;" id="coolsavebutton"><p>${content}</p></button>`;
	setTimeout(() => {
		document.getElementById('notis').innerHTML = '';
	}, 3000)
 }

 function addCookie(val) {
	if(val == true) {
	document.cookie = "notifications=true";
	} else {
	document.cookie = "notifications=true";
	}
 }
 window.onload = onload();
async function onload() {
	
	if(!document.cookie) {
		document.cookie = "notifications=true";
		//document.getElementById('saver').innerHTML += `<button style="width: 100%; text-align: center;" id="coolcancelbutton"><p>Send notifications on every new track?</p><br><a href="javascipt:addCookie(true)">Yes! </a> <a href="javascript:addCookie(false)> No!</a> </button>`;
	}
	console.log(document.cookie)
	notiAllow = await Notification.requestPermission();
  
  $.getJSON( "https://de1.api.radio-browser.info/json/stations/topclick/20", function( data ) {
	var arr = [];
data.forEach(myFunction);
 
function myFunction(item, index) {
  if(item.codec === 'MP3') return arr.push(item)
}
	  
	//Button Images
	var favicon1 = document.getElementById('radioFav0').src = arr[0].favicon;
	var favicon2 = document.getElementById('radioFav1').src = arr[1].favicon;
	var favicon3 = document.getElementById('radioFav2').src = arr[2].favicon;
	var favicon4 = document.getElementById('radioFav3').src = arr[3].favicon;
	var favicon5 = document.getElementById('radioFav4').src = arr[4].favicon;
	var favicon6 = document.getElementById('radioFav5').src = arr[5].favicon;
	
	//Button Text
	var text1 = document.getElementById('content0').innerText = `Website: ${arr[0].homepage} 
	Tags: ${arr[0].tags}
	Country: ${arr[0].country}`
	var text2 = document.getElementById('content1').innerText = `Website: ${arr[1].homepage} 
	Tags: ${arr[1].tags}
	Country: ${arr[1].country}`
	var text3 = document.getElementById('content2').innerText = `Website: ${arr[2].homepage} 
	Tags: ${arr[2].tags}
	Country: ${arr[2].country}`
	var text4 = document.getElementById('content3').innerText = `Website: ${arr[3].homepage} 
	Tags: ${arr[3].tags}
	Country: ${arr[3].country}`
	var text5 = document.getElementById('content4').innerText = `Website: ${arr[4].homepage} 
	Tags: ${arr[4].tags}
	Country: ${arr[4].country}`
	var text6 = document.getElementById('content5').innerText = `Website: ${arr[5].homepage} 
	Tags: ${arr[5].tags}
	Country: ${arr[5].country}`
  
	//Button Title
	var title1 = document.getElementById('title0').innerText = arr[0].name;
	var title2 = document.getElementById('title1').innerText = arr[1].name;
	var title3 = document.getElementById('title2').innerText = arr[2].name;
	var title4 = document.getElementById('title3').innerText = arr[3].name;
	var title5 = document.getElementById('title4').innerText = arr[4].name;
	var title6 = document.getElementById('title5').innerText = arr[5].name;
	
	//Links to actually play the station ;)
	var feat1 = document.getElementById('feat0').href = `javascript:player('` + arr[0].stationuuid + `', true)`;
	var feat2 = document.getElementById('feat1').href = `javascript:player('` + arr[1].stationuuid + `', true)`;
	var feat3 = document.getElementById('feat2').href = `javascript:player('` + arr[2].stationuuid + `', true)`;
	var feat4 = document.getElementById('feat3').href = `javascript:player('` + arr[3].stationuuid + `', true)`;
	var feat5 = document.getElementById('feat4').href = `javascript:player('` + arr[4].stationuuid + `', true)`;
	var feat6 = document.getElementById('feat5').href = `javascript:player('` + arr[5].stationuuid + `', true)`;
  })
  }
let np = null;
let lastMeta = '';
let fetchInterval = null;
function player(uuid) {
	$.getJSON('https://de1.api.radio-browser.info/json/stations/byuuid/' + uuid, (res) => {
		console.log(uuid + `${res}`)
		if(np) np.stop();
		if(fetchInterval) {
			clearInterval(fetchInterval);
			fetchIntervall = null;
		}
		document.getElementById('songy').innerText = res[0].name;
		document.getElementById('radFav').src = res[0].favicon;
		function onMetadata(metadata) {
			if(lastMeta == metadata.StreamTitle) return;
			lastMeta = metadata.StreamTitle;
			document.getElementById("track").innerText = metadata.StreamTitle || "No song data provided";
		   
			if(metadata.title == '') return;
			if(document.cookie == "notifications=true") {
			new Notification(res[0].name,{
				body: metadata.StreamTitle,
				icon: res[0].favicon
			});
		}
			
		};
		np = new IcecastMetadataPlayer( 'https://protective-third-hedge.glitch.me/api/v1/stream?q=' + res[0].url.replace('https://', 'http://'), { onMetadata } );
	  	np.play();
		fetchInterval = setInterval(() => {
			$.getJSON('https://protective-third-hedge.glitch.me/api/v1/metadata?q=' + res[0].url.replace('https://', 'http://'), (response) => {
				onMetadata(response.data)
			})
		}, 5000)
	})
}

function playpause() {
if(!np) return;
if(np.state == "playing") {
	np.stop();
	document.getElementById('pauseplaybutton').className = "fa fa-play-circle";
} else if(np.state == "stopped") {
	np.play();
	document.getElementById('pauseplaybutton').className = "fa fa-pause-circle";
} else {
	return;
}
}

function cookie() {
	if(document.cookie == "notifications=true") {
		document.cookie = "notifications=false";
		inAppNoti('Stopped push notifications (you might need to refresh)!', 'red');
	} else {
		document.cookie = "notifications=true";
		inAppNoti('Added push notifications (you might need to refresh)! Enjoy! ', 'green');
	}
}
