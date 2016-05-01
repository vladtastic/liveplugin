function detectVevoPage()
{
  var results = document.querySelector('head meta[content="vevo/"]');

  if (results != null)
  {
    //alert('This is a VEVO page!');
    return true;
  }

  return false;
}


// Inform the background page that 
// this tab should have a page-action
if (detectVevoPage())
{
  chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data 
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var domInfo = {
      //total:   document.querySelectorAll('*').length
      total:   document.getElementById('watch7-user-header').querySelector('.yt-user-info a').innerHTML
    };

    // Directly respond to the sender (popup), 
    // through the specified callback */
    response(domInfo);
  }
});

//alert($("#watch7-user-header div a").text);