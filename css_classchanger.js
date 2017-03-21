// CLASS of an pCars Driver
function CSSClassChanger(aCSSDefinition){
	
	this.CurrentState	= "";
	this.aCSSClasses 	= new Array(); 	//Array of all handled CSS classes
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
	
	// a function to clear all css clases that were managed by this object
	function ClearAllCssClases(){
		
		for (var key in this.aCSSClasses){
			//delete css class from html DOM structure
			if(this.aCSSClasses[key]) setStyle( '', this.aCSSClasses[key] );			
			//delete from internale list
			delete this.aCSSClasses[key];
		}
		
		return 1;
	}
	
	//cut driverlabe to display only race position
	function setDriverLabelStyle(mode){
		
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

CSSClassChanger.prototype.setStyle=setStyle;
CSSClassChanger.prototype.HideAllSvg=HideAllSvg;
CSSClassChanger.prototype.UnHideAllSvg=UnHideAllSvg;
CSSClassChanger.prototype.ClearAllCssClases=ClearAllCssClases;
CSSClassChanger.prototype.ColorTop3vehicles=ColorTop3vehicles;
CSSClassChanger.prototype.setDriverLabelStyle=setDriverLabelStyle;
CSSClassChanger.prototype.ColorDynClasses=ColorDynClasses;
CSSClassChanger.prototype.ColorSameVName=ColorSameVName;
CSSClassChanger.prototype.ColorSameClass=ColorSameClass;