function GoogleMapMarkers(settings,map)
{
	var __markers = [];
	var __self = this; 
	var __window = new GoogleMapWindowInfo(settings);

	this.attach = function( conf )
	{
		__markers.push({
			"marker": new google.maps.Marker(conf.info),
			"title": conf.title||null,
			"description": conf.descr||null,
			"init": true,
			"id": conf.hasOwnProperty('id')?conf.id:null,
			"callbacks": conf.callbacks||{}
		});

		__self.addWindowInfo(__markers.length-1);
	}

	this.detach = function( number )
	{
		if(__markers.hasOwnProperty(number))
		{
			__markers[number].marker.setMap(null);
			__markers[number].init = false;
		}
	}

	this.detachAll = function()
	{
		for(var key in __markers)
		{
			__markers[key].marker.setMap(null);
			__markers[key].init = false;
		}
	}

	this.clear = function()
	{
		for(var key in __markers)
		{
			__markers[key].marker.setMap(null);
			__markers.unshift();
		}

		__markers = [];
	}

	this.length = function()
	{
		return __markers.length;
	}

	this.getMarker = function(number)
	{
		if(__markers.hasOwnProperty(number))
		{
			return __markers[number];
		}		

		return null;
	}

	this.getMarkerListener = function(number)
	{
		if(__markers.hasOwnProperty(number))
		{
			return __window.getListener(__markers[number].id);
		}	

		return null;		
	}

	this.getActiveMarkerPos = function()
	{
		return __window.getActiveWindowPos();
	}

	this.disableActiveMarker = function()
	{
		return __window.closeActive();
	}


	this.setMarkerCallback = function(number,event,back)
	{
		if(__markers.hasOwnProperty(number))
		{
			__markers[number].callbacks[event] = __markers[number].callbacks[event]||[];
			__markers[number].callbacks[event].push(back);
		}	
	}

	this.delMarkerCallbacks = function(number,event)
	{
		if(__markers.hasOwnProperty(number))
		{
			__markers[number].callbacks[event].splice(0,
				__markers[number].callbacks[event].length);
		}	
	}


	this.addWindowInfo = function(number)
	{
		if(__markers.hasOwnProperty(number))
		{
			if(!!__markers[number].title || !!__markers[number].descr)
			{
				__window.initWindow(__markers[number]);		
			}			
		}	
	}

	var __init = (function()
	{
		var opts = settings.marker||null;

		if(opts instanceof Object)
		{
			var icon = opts.icon||null;
			var animation = opts.animation||google.maps.Animation.DROP;

			if(opts.hasOwnProperty("list"))
			{
				for(var key in opts.list)
				{
					var conf = {					      
						"position": new google.maps.LatLng(opts.list[key].lat,
					      								 opts.list[key].lng),
					    "map": map,
					    "animation": animation,
					    "icon":icon
					};
					
					__markers.push({
						"marker": new google.maps.Marker(conf),
						"title": opts.list[key].title||null,
						"descr": opts.list[key].descr||null,
						"init": true,
						"id": opts.list[key].hasOwnProperty('id')?opts.list[key].id:null,
						"callbacks": opts.list[key].callbacks||{}
					});

					__self.addWindowInfo(__markers.length-1);
				}
			}
			return true;
		}

		return false;
	})();
}