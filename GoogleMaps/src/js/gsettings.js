function GoogleMapSettings()
{
	var __jqueryLoad = false;
	var __self = this;

	this.target = {
		id: null,
		fullMode : false,
		useJquery: false,
	};

	this.marker = {
		icon: null,
		list: null,
		windowInfoMode: 0,
		windowActive: null
	};

	this.map = {
		center : (new google.maps.LatLng(0,0)),
		zoom : 8,
		mapTypeId : google.maps.MapTypeId.ROADMAP,
		mapTypeControlOptions:
      	{
      		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      	}
	};

	this.personality = {

	};

	this.jquery = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";

	this.getProperty = function(field, property)
	{
		if(this.hasOwnProperty(field))
		{
			if(this[field].hasOwnProperty(property))
			{
				return this[field][property];
			}
		}

		return null;
	}

	this.has = function(field, property)
	{
		if(this.hasOwnProperty(field))
		{
			if(this[field].hasOwnProperty(property))
			{
				return true;
			}
		}

		return false;
	}	

	this.loadScript = function( src , callback)
	{
		var tag = document.createElement('script');
		tag.type = "text/javascript";
		tag.src = src;
		tag.onload = callback;
		document.body.appendChild(tag);

		return true;
	}

	this.loadJquery = function(callback)
	{ 
		if(__jqueryLoad) return;

		__self.loadScript(__self.jquery, callback);
		__jqueryLoad = true; 
	}

	this.isJqueryLoad = function()
	{
		return __jqueryLoad; 
	}
}