// CLASS of an pCars Driver
function CSSClassChanger(aCSSDefinition){
	
	this.CurrentState	= "";
	this.aCSSClasses 	= new Array(); 	//Array of all handled CSS classes
	this.sLastDriverSelectionClass = 'initial_value'; 
	// structure:
	//		aCSSClasses['hideallsvgs']
	//		aCSSClasses['CSSTOP3VEHICLES']
	//		...
		
	this.aCSSDef = {}; 
	this.aCSSDef = aCSSDefinition;	// copy CSS definitions into local varaibale
	
	//return this;
}

	// usage:
	// add class:	
	//				var object_TestCSSClass = setStyle(
	//                     '.TestCSSClass{ fill: grey; } \n',
	//                     object_TestCSSClass );
	// remove class:
	// 					if(object_TestCSSClass) setStyle( '', object_TestCSSClass );
	//
	function setStyle(cssText) {
				
		var sheet = document.createElement('style');
		sheet.type = 'text/css';
		/* Optional */ window.customSheet = sheet;
		(document.head || document.getElementsByTagName('head')[0]).appendChild(sheet);
	    return (setStyle = function(cssText, node) {
			if(!node || node.parentNode !== sheet)
	            return sheet.appendChild(document.createTextNode(cssText));
			node.nodeValue = cssText;
			return node;
		})(cssText);
	};
	
	// a function to clear all css classes that were managed by this object
	function ClearAllCssClases(){
		
		for (var key in this.aCSSClasses){
			//delete css class from html DOM structure
			if(this.aCSSClasses[key]) setStyle( '', this.aCSSClasses[key] );			
			//delete from internale list
			delete this.aCSSClasses[key];
		}
		
		return 1;
	}
	
	// a function to a specifc css class
	function ClearSpecificCssClases( sCssRegisterationKey ){
		
		if ( this.aCSSClasses[sCssRegisterationKey]){
			//delete css class from html DOM structure
			if(this.aCSSClasses[sCssRegisterationKey]) setStyle( '', this.aCSSClasses[sCssRegisterationKey] );			
			//delete from internale list
			delete this.aCSSClasses[sCssRegisterationKey];
		}
		
		return 1;
	}
	
	
	//cut driverlabe to display only race position
	function setDriverLabelStyle(mode, options){
		
		switch (mode){
		
		case "cutdriverlabel":
			//delete this.aCSSClasses['styledriverlabel'];
			var CSSStyleHandle = setStyle(
				    '.driverlabel{\n'				+ 								    			    
						'/*max-width: 29px;*/\n'	+
						'max-width: 5ch; \n'		+
						'overflow: hidden; \n'		+
						'text-overflow: clip; \n'	+
						'white-space: nowrap; \n'	+
					'}\n',
				    CSSStyleHandle );
		
			//remember object handle
			this.aCSSClasses['styledriverlabel']	=	(CSSStyleHandle);
			break;
			
		case "normal":
			
			setStyle( '', this.aCSSClasses['styledriverlabel'] );
			
			delete this.aCSSClasses['styledriverlabel'];
			break;
		
		case "update_opacity_drivers":
						
			//delete style before create a new one
			if ( this.aCSSClasses['opacity_drivers'] ){
				setStyle( '', this.aCSSClasses['opacity_drivers'] );
				delete this.aCSSClasses['opacity_drivers'];
			}
			
			//set new style
			var CSSStyleHandle = setStyle(
					'.CSS_OPACITY_DRIVER{\n'		+
			        '	opacity:	'+ 		options['opacity_driver']		+';\n'			+		
			        '}\n',					
				    CSSStyleHandle );
		
			//remember object handle
			this.aCSSClasses['opacity_drivers']	=	(CSSStyleHandle);
					
			break;
		
		}		
	}	

	// hide svg objects during change of race session
	function HideAllSvg() {
		/*
		//clear all other individual CSS definitions
		this.ClearAllCssClases();		
		//remember object handle
		this.aCSSClasses['hideallsvgs']	= setStyle(   'svg.driverlabel{ display: none; } \n');	
		*/
		
		//20170321 - use this instead of CSS classes because "delete this.aCSSClasses['hideallsvgs'];" did not work. Marker are still hidden
		$(".stations").hide();
		
		return 1;
	}
	
	//unhide svg ojects
	function UnHideAllSvg(){				
		//set an empty style to unhide markers
		/*
		if ( this.aCSSClasses['hideallsvgs'] ){  // only call it if a hide class exists			
			this.aCSSClasses['hideallsvgs']	= setStyle(   'svg.driverlabel{ display: block; } \n');
			delete this.aCSSClasses['hideallsvgs'];
		}
		*/
		//Workaround: because unhide not working correctly as workaround we use ClearAllCssClases()
		//this.ClearAllCssClases();		
		
		//20170321 - use this instead of CSS classes because "delete this.aCSSClasses['hideallsvgs'];" did not work. Marker are still hidden
		$(".stations").show();
		
		return 1;
	}
	
	//set opacity level for filtered out driver objects from drivers table
	function HideSpecificDrivers( ObjectsRemainDisplayed ){
		
		//TODO: maybe find a better way to map key and value. array.map() function??
		var assarray	= [];
		for (var i = 0; i < ObjectsRemainDisplayed.length; i++){		
			assarray[""+ ObjectsRemainDisplayed[i]] = i;
		}
		
		


/*	
		//Jquery variant
		var regex 		= /^(\d\W-\W)(.*)/;
		
		$( ".driverlabel" ).each(function( index ){
							
				if(log >= 3){console.log('------- HideSpecificDrivers: TEXT: ', $(this).children("text")[0].innerHTML );}
				
				//extract player name to match with array from drivertable
				var driverlabel = $(this).children("text")[0].innerHTML;
												
				if( new RegExp(regex).test(driverlabel) ){
					
					if( assarray[ ""+ driverlabel.match(regex)[2] ] != undefined ){
						
						$(this).removeClass('CSS_OPACITY_DRIVER');
						if(log >= 3){console.log('------- HideSpecificDrivers: Remove Class to this: ', $(this) );}
						
					}else{

						if(log >= 3){console.log('------- HideSpecificDrivers: ADD Class ', $(this) );}
						if(log >= 3){console.log('------- HideSpecificDrivers: ADD Class current CLASSES: ', $(this).attr('class') );}
						
						$(this).addClass('CSS_OPACITY_DRIVER');
						
						if(log >= 3){console.log('------- HideSpecificDrivers: ADD Class AFTER ERROR: ', $(this).error() );}
						if(log >= 3){console.log('------- HideSpecificDrivers: ADD Class AFTER current CLASSES: ', $(this).attr('class') );}
						
					}
					//alert( driverlabel.match(regex)[2] );				
				}

								
		});
*/								


 		//D3 variant => has Problems while add/remove classes
		d3.selectAll(".driverlabel")
		.each(function(d, i) {
		
			//if(log >= 3){console.log('------- HideSpecificDrivers: this D3: ', d );}
			//decision if hide or unhide an object
			if ( assarray[""+ d.Key] != undefined ){																				
				d3.select(this)		
				.classed("CSS_OPACITY_DRIVER", false);	// this D3 function works like an RemoveClass()							 												
			}else{			
				d3.select(this)
				.classed("CSS_OPACITY_DRIVER", true);	// this D3 function works like an addClass()				
			}									
		});
		
		
	}
	
	//color the first tree vehicles
	function ColorTop3vehicles(){
		
		//clear all other individual CSS definitions
		this.ClearAllCssClases();
		
		var CSScls;		
		this.aCSSClasses['CSSTOP3VEHICLES'] = setStyle(this.aCSSDef['CSSTOP3VEHICLES'],CSScls);
				
		return 1;
	}
	
	//
	function ColorDynClasses(mode){
		 
		//		remember object handle
		this.aCSSClasses['CSSDYNAMICS']	=	setStyle( 'circle.CSS_Vehicle_GT4 {fill: gold; stroke-width: 3px \n}' );
		
		return 1;		
	}
	
	//color same vehicles names
	function ColorSameVName( aVNames ){
		
		//clear all other individual CSS definitions
		this.ClearAllCssClases();
		
		var cnt = 0;
		for (var key in aVNames){						
			//generate new CSS styl and remember it
			this.aCSSClasses['CSName'+cnt]	=	setStyle('circle.CSS_VehicleName_' + key + CSSDEFINITIONS['CSSCOLORSELECTION'][cnt]);			
			cnt++;
		}
								
		return 1;		
	}	
	
	//all cars from same class get same color
	function ColorSameClass( aVCls ){	
		
		//clear all other individual CSS definitions
		this.ClearAllCssClases();
		
		var cnt = 0;
		for (var key in aVCls){			
			//generate new CSS styl and remember it
			this.aCSSClasses['CSClass'+cnt]	=	setStyle('circle.CSS_VehicleClass_' + key + CSSDEFINITIONS['CSSCOLORSELECTION'][cnt] );			
			cnt++;
		}
			
		return 1;
	}
	
	//all cars for human drivers
	function ColorHumanDrivers(){	
		
		//clear all other individual CSS definitions
		this.ClearAllCssClases();
		
		// style Human
		var cnt = 0;
		this.aCSSClasses['CSClass'+cnt]	=	setStyle('circle.CSS_IsHumanPlayer' + CSSDEFINITIONS['CSSCOLORSELECTION'][cnt] ); 
		
		// style AI
		cnt++;
		this.aCSSClasses['CSClass'+cnt]			= setStyle(
				'circle.CSS_IsAiPlayer{\n'		+
		        '	opacity:	0.35;\n'	+		
		        '}\n',					
			    );		
							
		return 1;
	}
	
	//all cars for AI drivers
	function ColorAiDrivers(){	
		
		//clear all other individual CSS definitions
		this.ClearAllCssClases();
				
		// style AI
		var cnt = 0;
		this.aCSSClasses['CSClass'+cnt]	=	setStyle('circle.CSS_IsAiPlayer' + CSSDEFINITIONS['CSSCOLORSELECTION'][cnt] );	
				
		// style Humans
		cnt++;
		this.aCSSClasses['CSClass'+cnt]			= setStyle(
				'circle.CSS_IsHumanPlayer{\n'		+
		        '	opacity:	0.35;\n'	+		
		        '}\n',					
			    );		
		
		
		return 1;
	}
	
	/* color the selected row/driver from driver table
	 * param {int}
	 * 
	 * return {string} returns true if all is fine, null in case of errors/missing parameters
	 */			
	function ColorSelectedVehicle(oRowData, bCancleColoration ){
		
		var sCssClassRegistrationName = 'CSSDRIVERSELECTION';
		
		// set default value if parameter is missing
		if (!bCancleColoration){
			bCancleColoration = false; 
		}
		
		// remove CSS class attributes and decolorized marker
		if (bCancleColoration && this.aCSSClasses[sCssClassRegistrationName]){
			this.ClearSpecificCssClases(sCssClassRegistrationName);
			this.sLastDriverSelectionClass = 'initial_value';
			return true;
		}
		
		// check if driver name is defined
		if (oRowData.drivername === undefined){
			return null;
		}
		var sDriverName = oRowData.drivername+'';
		
		
		//build CSS class name of a specific driver
		var sClassName = "circle.CSS_DriverName_" + new PCARSdriver()._normalizeString(sDriverName);		
		
		// set new css class attributes
		if ( this.sLastDriverSelectionClass != sClassName ){
			//injection of css attributes
			this.aCSSClasses[sCssClassRegistrationName]	=	setStyle( sClassName + CSSDRIVERSELECTION );
			this.sLastDriverSelectionClass = sClassName;
		}
		
		/*
			//console.log("SICECKHA ColorSelectedVehicle getelement():", 			document.querySelectorAll(sClassName) );
			//console.log("SICECKHA ColorSelectedVehicle getelement():", 			document.getElementsByClassName(sClassName); );		
		*/
			
		
		return true;
	}
	

CSSClassChanger.prototype.setStyle=setStyle;
CSSClassChanger.prototype.HideAllSvg=HideAllSvg;
CSSClassChanger.prototype.UnHideAllSvg=UnHideAllSvg;
CSSClassChanger.prototype.HideSpecificDrivers=HideSpecificDrivers;
CSSClassChanger.prototype.ClearAllCssClases=ClearAllCssClases;
CSSClassChanger.prototype.ClearSpecificCssClases=ClearSpecificCssClases;
CSSClassChanger.prototype.ColorTop3vehicles=ColorTop3vehicles;
CSSClassChanger.prototype.setDriverLabelStyle=setDriverLabelStyle;
CSSClassChanger.prototype.ColorDynClasses=ColorDynClasses;
CSSClassChanger.prototype.ColorSameVName=ColorSameVName;
CSSClassChanger.prototype.ColorSameClass=ColorSameClass;
CSSClassChanger.prototype.ColorHumanDrivers=ColorHumanDrivers;
CSSClassChanger.prototype.ColorAiDrivers=ColorAiDrivers;
CSSClassChanger.prototype.ColorSelectedVehicle=ColorSelectedVehicle;
