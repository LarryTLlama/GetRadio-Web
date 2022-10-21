var player;

async function searcher(term) {
	if(`${term}` == 'undefined') return;
	//window.electronAPI.jsonFile('/playerInfo.json')	

	var newurl = "http://de1.api.radio-browser.info/json/stations/byname/" + term;
	
	$.getJSON(newurl , function( data ) {
		
function length() {
	let arr = [];
	data.forEach(item => {
	if(item.codec === 'MP3') {
		arr.push(item);
	}
	})
	return arr.length;
}

		if(length() === 0) return document.getElementById('res').innerHTML = `<h2>We found no results for: ${term}!</h2>
		<br>
		<p>Check if the station's name has changed, or is used under a different name, and try again!</p>
		`


		document.getElementById('res').innerHTML = `<h2>${length()} Results Found</h2><br>`
data.forEach(item => {
	if(item.codec === 'MP3') {
return document.getElementById('res').innerHTML = `${document.getElementById('res').innerHTML} <button class="step arrow-right">
  <a id="feat0" href='javascript:player("${item.stationuuid}", true)' style="color: white; text-decoration: none;">
  <div class="left"> 
  <img id="radioFav0" class="bimg" src="${item.favicon || "placeholder.png"}"></img>
  </div>
  <div class="right"> 
  <h2 id="title0" >${item.name}</h2>
  <p id="content0">Tags: ${item.tags}<br>
  Country: ${item.country}<br></p>
  </div>
  </a>
  </button>
  <br><br>`	
	}
});
	})
	

}