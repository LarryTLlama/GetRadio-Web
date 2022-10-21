function googleSearch() {
var track = document.getElementById('track').innerText
if((track === 'GetRadio') || (track === '')) {
return;
} else {
window.open(`https://www.google.com/search?q=` + track)
}
}

function spotifySearch() {
var track = document.getElementById('track').innerText
if((track === 'GetRadio') || (track === '')) {
return;
} else {
window.open(`https://open.spotify.com/search/` + track)
}
}

async function share() {
window.electronAPI.jsonFile('\\playerInfo.json')
var station = await window.electronAPI.jsonGet('info.uuid')
//var station = document.getElementById('songy').innerText
if((station === 'GetRadio') || (station === '')) {
return;
} else {
    navigator.clipboard.writeText(`https://larrytllama.github.io/GetRadio/share?q=` + station).then(() => {
        /* clipboard successfully set */
        new Notification('GetRadio', { body: 'Share link successfully copied to clipboard!', icon: '/placeholder.png'})
        console.log(track)
      }, () => {
        /* clipboard write failed */
        new Notification('GetRadio', { body: 'Failed to copy share link to clipboard', icon: '/placeholder.png'})

      });
//open(`https://larrytllama.github.io/GetRadio/share?q=` + track)
}
}