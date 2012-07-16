function GoogleMapWindowInfo( settings )
{
	var __settings = (settings instanceof GoogleMapSettings)?settings:null;
	var __activeWindow = null;
	var __listeners = {};

	var __initStandart = function(marker)
	{
		var l = function(event)
		{
			if(!!__activeWindow) __activeWindow.close();

			var map = marker.marker.getMap();
			var pos = marker.marker.getPosition();
  			var infowindow = new google.maps.InfoWindow(
      		{ 
      			content: '<div class="map-window-info">\
      					  <p class="map-title">'+marker.title+'</p>\
      					  <p class="map-info">'+marker.descr+'</p></div>'
      		});

    		infowindow.open(map,marker.marker);
    		infowindow.setPosition(pos);

    		google.maps.event.addListener(
    			infowindow,
    			'closeclick',
    			function()
    			{
    				__activeWindow = null;

    				var backs = marker.callbacks.focusout||{};
		    		for(var k in backs) backs[k]();
    			}
    		);

    		var backs = marker.callbacks.click||{};
    		for(var k in backs) backs[k](event);

     		__activeWindow = infowindow;	
    		map.setCenter(pos);
		};

		if(marker.id != null) __listeners[marker.id] = l;

		google.maps.event.addListener(marker.marker,'click',function(e){l(e);});		
	}

	var __initWithJquery = function(marker)
	{

	}

	this.initWindow = function( marker )
	{
		if(__settings == null) return;

		if(!__settings.marker.windowInfoMode)
		{
			__initStandart(marker);
		}
		else if(__settings.marker.windowInfoMode)
		{
			__initWithJquery(marker);
		}	
	}

	this.getListener = function(id)
	{
		if(__listeners.hasOwnProperty(id))
		{
			return __listeners[id];
		}

		return null;
	}

	this.getActiveWindowPos = function()
	{
		if(__activeWindow != null)
		{
			return __activeWindow.getPosition();
		}
		
		return null; 
	}

	this.closeActive = function()
	{
		if(__activeWindow != null)
		{
			__activeWindow.close();
			__activeWindow = null;
		}		
	}
}