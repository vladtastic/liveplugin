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

      //old stuff
      //var artistID = extractSKArtistID(data);
      //setArtistPhoto(artistID);

      unpackJSON(data);

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

function unpackJSON(data){

  console.log("Unpacking JSON");

  var innerResults = data.resultsPage.results.artist[0];

  extractArtistID(innerResults, setArtistPhoto );

  extractDisplayName(innerResults, setArtistName );

}

function extractArtistID( data, callback )
{
  if( callback && typeof(callback) === "function" )
  {
      return callback(data.id);
  }

  else
  {
    alert(typeof(callback));
  }

}

function extractDisplayName( data, callback )
{
  if( callback && typeof(callback) === "function" )
  {
      return callback(data.displayName);
  }

  else
  {
    alert(typeof(callback));
  }
}

function extractTourEndDate(data)
{
  return data.OnTourUntil;
}

function extractURI(data)
{
  return data.uri;
}

function extractIdentifier(data)
{
  //extract the different identifiers from data.identifier[0]
}



function setArtistPhoto(artistID)
{
  image = document.getElementById('artistPhoto');
  image.src = "http://images.sk-static.com/images/media/profile_images/artists/" + artistID +"/large_avatar";
}

function setArtistName(artistName)
{
  document.getElementById('artistName').textContent = artistName;
}