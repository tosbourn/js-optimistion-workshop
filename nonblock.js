(function(url){ //This anonymous function will be called immediately and it's contents are protected.
  var iframe = document.createElement('iframe'); //Lets make an iframe.
  (iframe.frameElement || iframe).style.cssText = "width: 0; height: 0; border: 0"; //Hide the iframe
  var where = document.getElementsByTagName('script'); //Find all script tags
  where = where[where.length - 1]; //Find the last script tag
  where.parentNode.insertBefore(iframe, where); //Put our iframe before the last script tag.
  var doc = iframe.contentWindow.document; //Grab the Window of the iframe
  doc.open().write('<body onload="'+
    'var js = document.createElement(\'script\');'+
    'js.src = \''+ url +'\';'+
    'document.body.appendChild(js);">'); //Edit the window to have this.
  doc.close(); //End of edits
})('http://www.jspatterns.com/files/meebo/asyncjs1.php'); //This is what is passed into the anonymous function.