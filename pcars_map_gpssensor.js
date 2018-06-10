function GPSSensor(initData) {
	
	//			constructor(initData) {				
					//state information
		               var _div = null;
		               var _data = initData;
		               var _projection = null;	


//		               this._div = null;
//		               this._data = initData;
//		               this._projection = null;
		               
		             //  return this;
					
		//		}
	
	
               

              function transform(d) {
//         	    transform(d) {            	   
                   var padding = 10;                   
                   d = new google.maps.LatLng(d.Lat, d.Long);
                   d = _projection.fromLatLngToDivPixel(d);
                   return d3.select(this) 
                       .style("left", (d.x - padding) + "px")
                       .style("top", (d.y - padding) + "px");
               }
               
               function transformWithEase(d) {
//         	   transformWithEase(d) {
                   var padding = 10;
                   d = new google.maps.LatLng(d.Lat, d.Long);
                   d = _projection.fromLatLngToDivPixel(d);
                   return d3.select(this)
                       .transition().duration(DisplayDuration)
                       .style("left", (d.x - padding) + "px")
                       .style("top", (d.y - padding) + "px");
               }

               //superclass methods for google maps
              this.onAdd = function() {
//            	onAdd (){
                   _div = d3.select(this.getPanes().overlayLayer)
                            .append("div")
                            .attr("class", "stations");
               }               
                              
             this.draw = function () {
//            	draw(){
                   var padding = 10;
                   _projection = this.getProjection();		  
               }

              this.onRemove = function () {
//               onRemove () {
                   _div.remove();
               }


               // todo: known issue: Beim Wechsel der Position, bleibt eine "Leiche" auf der Karte uebrig, weil Key "Pos - Name" zusammensetzt
               // easyt solution:  deleting leading position number 
               this.update = function (data) {  
//               update (data) {
            	   
				    if (!_div){	return 1;} // prevent situation where _div is undefined 
				    
					var marker;
					var padding = 10;
	
					//update internal data which drive redrawing on zoom_changed
console.log("TODO GPSSensor; data: ", data);					
					_data = data.slice();
					   
					//Detect time between StopTransitionDelay set to "true" and now
					var CurrentTime = Date.now();
					var StopTransitionDelay_TimeRun = CurrentTime - StopTransitionDelay_StartTime;
					
					if( StopTransitionDelay == "true" ){
													
							marker = _div.selectAll(".stations, svg")
								.data(_data, function (d) { return d.Key; })
								.each(transform) // update existing markers
								.enter().append("svg:svg")
								.each(transform)
								.attr("class", function (d){ return d.CSSTextClasses });
			
							//reset to default after zoom event finished. 
							//A zoom change in Google Maps takes some time. If the worker runs have a short interval you need a minimum time where the transformWithEase have to be interrupted
							if (StopTransitionDelay_TimeRun > StopTransitionDelay_minTimeRun) {StopTransitionDelay = "false";}
					
					}else{
									
							marker = _div.selectAll(".stations, svg")
								.data(_data, function (d) { return d.Key; })
								.each(transformWithEase) // update existing markers
								.enter().append("svg:svg")
								.each(transform)
								.attr("class", function (d){ return d.CSSTextClasses });
			
							//reset to default after zoom event finished
							//StopTransitionDelay = "false";
					}
				
					// Add a circle.
					marker.append("svg:circle")
						.attr("r", 4.5)
						.attr("cx", padding)
						.attr("cy", padding)
						.attr("class", function (d){ return d.CSSCircleClasses } );
		
					// Add a label.
					marker.append("svg:text")
						.attr("x", padding + 7)
						.attr("y", padding)
						.attr("dy", ".31em")
						//todo !!!!!!!!!!!!!!!!!!!!   very uggly implementation !!! only temporary workaround
						//      it seem that the function within .text(...) will called only once at the beginning
						//      question: is it possible to call _div.selectAll("svg") and set text style direct in loop() ??
						.text(function (d) {
							//if(log >= 4){console.log("+++++ d: " , d );}
		
							for (var i = 0; i < aSensorData.length; i++){
								if (aSensorData[i].Key == d.Key){
									//if(log >= 3){console.log("Match found ---- Update MarkerLabel: " , aSensorData[i].MarkerLabel);}
									return  aSensorData[i].MarkerLabel;
								}
							}
							return d.MarkerLabel;
						})
						
					// Update CSS classes new
					var svgs = _div.selectAll("circle")
								.data(_data, function (d){ return d.Key; })
								.attr("class" ,(function(d){ return d.CSSCircleClasses; }));
					
					// Update labels new
					var svgs = _div.selectAll("text")
								.data(_data, function (d){ return d.Key; })							
								.text(function(d){ return d.MarkerLabel; });
		
					// delete unneeded svg objects from dom tree
					this.CleanupDriverObjects(_data);			
			
		  	} //end update()
            
		  	this.CleanupDriverObjects = function(data) {
//            CleanupDriverObjects (data) {
		  		// remapping of array of drivers to array of key
		  		var aTmp = {};
		  		for ( i = 0; i < data.length; i++) {
		  			aTmp[data[i].Key] = "";
		  		}
		  		
		  		d3.selectAll("svg, .driverlabel")
		  			.filter(".driverlabel")			// needed to prevent action to other svg in this project like LapChart
		  			.each(function( d ) {
		  					if ( aTmp[d.Key] == undefined ) {		  								
		  						this.remove(); 	// delete svg object / ghots cars
		  					}	
		  			});
		  	} // end CleanupDriverObjects()

			this.interruptTransition = function (){
//            interruptTransition (){
		  		// interrupt transition while zoom event
				if(_div != null){					
					_div.selectAll("svg, .driverlabel").interrupt();
				}
            } // end interruptTransition()
            
}; // end GPSSensor(initData)