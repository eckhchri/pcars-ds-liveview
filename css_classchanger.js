// CLASS of an pCars Driver
function CSSClassChanger ()
{

	this.aCSSClasses = new Array(); 	//Array of all handled CSS Clases
	
	return this;

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

	// hide svg objects during change of race session
	function HideAllSvg()
	{
		
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
	

CSSClassChanger.prototype.setStyle=setStyle;
CSSClassChanger.prototype.HideAllSvg=HideAllSvg;
CSSClassChanger.prototype.UnHideAllSvg=UnHideAllSvg;
