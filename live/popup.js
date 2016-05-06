// Update the relevant fields with the new data
function setDOMInfo(info) {
  var trimArtist = info.total.slice(0,info.total.indexOf('VEVO'));
  document.getElementById('artistName').textContent   = trimArtist;
  //document.getElementById('inputs').textContent  = info.inputs;
  //document.getElementById('buttons').textContent = info.buttons;
  //updateArtistInfo(trimArtist);
  var resp = $.getJSON("http://api.songkick.com/api/3.0/search/artists.json",{query:trimArtist,apikey:"PK2781I3XauJ6wS1"},
    function(data){
      // unpack the JSON response
      var artistID = extractSKArtistID(data);
      setArtistPhoto(artistID);
    });
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'DOMInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script)
        setDOMInfo);
  });
});

function extractSKArtistID(data){
  console.log(data.resultsPage.results.artist[0].id);
  return artistID = data.resultsPage.results.artist[0].id; 
}

function setArtistPhoto(artistID)
{
  image = document.getElementById('artistPhoto');
  image.src = "http://images.sk-static.com/images/media/profile_images/artists/" + artistID +"/large_avatar";
}