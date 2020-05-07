$.fn.singleAndDouble = function(singleClickFunc, doubleClickFunc) {
  // This means it'll take a minimum of 200ms to take the single
  // click action. If it's too short the single and double actions
  // will be called.
  // The default time between clicks on windows is 500ms (http://en.wikipedia.org/wiki/Double-click)
  // Adjust accordingly. 
  var timeOut = 200;
  var timeoutID = 0;
  var ignoreSingleClicks = false;
  
  this.on('click', function(event) {
    if (!ignoreSingleClicks) {
      // The double click generates two single click events
      // and then a double click event so we always clear
      // the last timeoutID
      clearTimeout(timeoutID);
      
      timeoutID = setTimeout(function() {
        singleClickFunc(event);
      }, timeOut);
    }
  });
  
  this.on('dblclick', function(event) {
    clearTimeout(timeoutID);
    ignoreSingleClicks = true;
    
    setTimeout(function() {
      ignoreSingleClicks = false;
    }, timeOut);
    
    doubleClickFunc(event);
  });
  
};

var singleClickCalled = false;

$('#clickme').singleAndDouble(
  function(event) {
    singleClickCalled = true;
    
    $('#result').html('single');
    
    setTimeout(function() {
      singleClickCalled = false;
    }, 300);
  },
  function(event) {
    if (singleClickCalled) {
      // This is actually an error state
      // it should never happen. The timeout would need
      // to be adjusted because it may be too close
      $('#result').html('single-double');
    }
    else {
      $('#result').html('double');
    }
    
    singleClickCalled = false;
  }
);