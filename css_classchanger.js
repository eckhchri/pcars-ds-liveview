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
		var CSSStyleHandle = setStyle(
				    '.marker{ display: none; } \n',
				    CSSStyleHandle );
		//remember object handle
		this.aCSSClasses['hideallsvgs']	=	(CSSStyleHandle);
		
		return 1;
	}
	
	//unhide svg ojects
	function UnHideAllSvg(){
		
		if(this.aCSSClasses['hideallsvgs']) setStyle( '', this.aCSSClasses['hideallsvgs'] );
		delete this.aCSSClasses['hideallsvgs'];
		
		return 1;
	}
	//color the first tree vehicles
	function ColorTop3vehicles(){
		
		var CSScls;
		if (this.aCSSDef['CSSTOP3VEHICLES']) {
					this.aCSSClasses['CSSTOP3VEHICLES'] = setStyle(this.aCSSDef['CSSTOP3VEHICLES'],CSScls);
		}else{
			if(log >= 2){console.log('++ WARNING ++ CSSClassChanger() missing CSS definition CSSTOP3VEHICLES: ', this.aCSSDef['CSSTOP3VEHICLES'] );}
		}
		
		return 1;
	}
	
	function ColorDynClasses(mode){


		var CSSStyleHandle = setStyle(
			    '.CSS_GT3 {fill: red;}\n',
			    CSSStyleHandle );
		//		remember object handle
		this.aCSSClasses['CSSDYNAMICS']	=	(CSSStyleHandle);
	
	return 1;
	}

CSSClassChanger.prototype.setStyle=setStyle;
CSSClassChanger.prototype.HideAllSvg=HideAllSvg;
CSSClassChanger.prototype.UnHideAllSvg=UnHideAllSvg;
CSSClassChanger.prototype.ClearAllCssClases=ClearAllCssClases;
CSSClassChanger.prototype.ColorTop3vehicles=ColorTop3vehicles;
CSSClassChanger.prototype.setDriverLabelStyle=setDriverLabelStyle;
CSSClassChanger.prototype.ColorDynClasses=ColorDynClasses;