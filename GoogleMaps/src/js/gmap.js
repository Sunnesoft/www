function GoogleMap()
{
	var __markers = null;
	var __map = null;
	var __settings = new GoogleMapSettings();
	var __elements = new GoogleMapElements();

	var __renderMarkers = function(callback)
	{
		if(__settings.has("marker","list"))
		{
			if(typeof(__settings.marker.list) == "string")
			{
				$.getJSON(__settings.marker.list)
					.done(function(data)
					{
						__settings.marker.list = data;
						__markers = new GoogleMapMarkers(__settings,__map);
						callback();
					})
					.fail(function(err)
					{

					});

				return;
			}

			if(__settings.marker.list instanceof Object)
			{
				__markers = new GoogleMapMarkers(__settings,__map);
				callback();

				return;
			}
		}
	}

	var __joinObject = function(obj1,obj2)
	{
		if(!obj1 instanceof Object) return null;

		if(obj2 instanceof Object)
		{
			for(var key in obj2)
			{
				if(obj2.hasOwnProperty(key))
				{
					if(obj2[key] instanceof Object &&
						obj1[key] instanceof Object)
					{
						obj1[key] = __joinObject(obj1[key],obj2[key]);		
					}
					else
					{
						obj1[key] = obj2[key];
					}
				}
			}

			return obj1;
		}		
	}

	this.init = function(opts)
	{
		__settings = __joinObject(__settings,opts);

		return true;
	}

	this.render = function()
	{
		if(__settings.target.id == null || __map != null) return;

		__map = new google.maps.Map(document.getElementById(__settings.target.id),
									__settings.map);

		google.maps.event.addListener(__map,'zoom_changed',function(e){
			__map.setCenter(__markers.getActiveMarkerPos());
		});	

		var run = function()
		{
			__renderMarkers(function(){
				__elements.addPersonalList({"list":__settings.personality,
											"map":__map,
											"markers":__markers});
			});					
		};

		if(__settings.target.useJquery)
		{
			__settings.loadJquery(run);
		}
		else
		{
			run();
		}
	}
}