function GoogleMapElements()
{
	this.addPersonal = function(d)
	{
		var div = document.createElement('div');
		div.index = element.index;

		var targ = new element.target({"opts":d.opts.opts||{},
									   "div":div,
									   "map":d.map,
									   "markers":d.markers});
		d.map.controls[d.opts.position].push(div);
	}	

	this.addPersonalList = function(d)
	{
		if(!d.list instanceof Object) return;

		for(var key in d.list)
		{
			var div = document.createElement('div');
			div.index = d.list[key].index;

			var targ = new d.list[key].target({
				"map": d.map,
				"markers": d.markers,
				"div": div,
				"opts": d.list[key].opts||{}
			});
			d.map.controls[d.list[key].position].push(div);
		}
	}
}

function GoogleMapObjectList(opts)
{
	var __item = 'map-object-current';
	var __clsuff = '-closer';
	var __butId = 'map-object-list';
	var __butText = "Список объектов";

	var __init = (function()
	{
		var settings = opts.opts;

		opts.div.id = __butId;
		opts.div.innerHTML = __butText;

		var vport = $('#'+settings.target_id),
			targ = $('<div>',{'id':settings.info_id,'active':'false'}),
			closer = $('<div>',{'id':settings.info_id+__clsuff});

		targ.appendTo(vport);
		targ.click(function(event){
			if($(event.target).hasClass(__item))
			{
				var listener = opts.markers.getMarkerListener($(event.target).attr('index'));
				if(listener != null)
				{
					listener.call();
					closer.click();
				}		
			}
		});

			
		closer.appendTo(targ)
		closer.click(function(){
			targ.attr('active','false').hide();
		});

		$('#'+__butId).live("click",function(){

			var size = opts.markers.length(),
				open = targ.attr('active'),
				elems = $('.'+__item);

			if(open == 'true')
			{
				targ.attr('active','false').hide();
				return false;
			}

			if(size==elems.length)
			{
				targ.attr('active','true').show();
				return false;
			}

			elems.detach();

			for(var i = 0;i<size;i++)
			{
				var marker = opts.markers.getMarker(i);
				if(marker.init)
				{
					targ.append("<div class='"+__item+"' index='"+i+"'>"+marker.title+"</div>");
				}
			}

			targ.css({'margin-left':(parseInt(vport.outerWidth()) - parseInt(targ.outerWidth()))/2 + 'px',
					  'margin-top':(parseInt(vport.outerHeight()) - parseInt(targ.outerHeight()))/2 + 'px'})
			targ.attr('active','true').show();

			return false;
		});
	})();
}

function GoogleMapFocusButton(opts)
{
	var _id = 'map-focus-button';
	var _html = '<img src="./img/target.png"/>';
	var _descr = 'Закрыть открытое информационное окно.';

	var __init = (function()
	{
		var settings = opts.opts;
		var markSize = opts.markers.length();

		opts.div.id = _id;
		opts.div.innerHTML = _html;
		opts.div.title = _descr;
		opts.div.style.display = 'none';
		opts.div.onclick = function()
		{
			opts.markers.disableActiveMarker();
			opts.div.style.display = 'none';
		}

		var click = function(event)
		{
			opts.div.style.display = 'block';
		}

		var focusout = function()
		{
			opts.div.style.display = 'none';
		}

		for(var i = 0;i<markSize;i++)
		{
			opts.markers.setMarkerCallback(i,'click',click);
			opts.markers.setMarkerCallback(i,'focusout',focusout);
		}
		
	})();
}