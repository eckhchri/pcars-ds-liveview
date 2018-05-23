function HTMLCONTROL(){
	
	
	return this;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
// HTML DRIVERCOLOR selection functions
function DRIVERCOLOR_SetActiveElement( value ){
	
	$("#DRIVERCOLOR").val( value ).change();
	return 1;
}

function DRIVERCOLOR_AddSelElement( new_val, display_text ){

// deactivate becaus of special charaters in driver name cause error, like  
// https://github.com/eckhchri/pcars-ds-liveview/issues/73	
//	if (  $("#DRIVERCOLOR option[value='" + new_val + "']").length == 0 ){
	if ( $("#DRIVERCOLOR option[value=\"" + new_val + "\"]").length == 0 ){ 
		
		$('#DRIVERCOLOR').append($('<option>', {
			value: new_val,
			text: display_text
		}));
	}

	return 1;
}

function DRIVERCOLOR_DelSelElement( val2delete ){
	
	$("#DRIVERCOLOR option[value='" + val2delete + "']").remove();
	return 1;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//HTML DRIVERCOLOR selection functions
function APIMODE_SetSelection( value ){
	
	$("#APIMODE").val( value ).change();	
	
	return 1;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//HTML MAPTYPE selection functions
function MAPTYPE_SetSelection( value ){

	$("#MAPTYPE").val( value ).change();	
	return 1;
}


/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//HTML MAPTYPE selection functions
function addMaptypeOption( id , aData){
	
	for (var key in aData){
	
		$('#MAPTYPE').append($('<option/>', { 
	        value: aData[key]['value'],
	        text : aData[key]['display_value'], 
	    }));
	}
		
	return 1;
}
	
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//HTML content changer by object id
function ChangeHtmlContentByID( id , innerhtml ){
	
	// go through all elements with this specific id
	// info: 'body ' in front is needed to find all elements
	$('body ' + id ).each(function(){				
		$( this ).html( innerhtml );			   
	});
	
	return 1;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//Prototyping
HTMLCONTROL.prototype.DRIVERCOLOR_SetActiveElement=DRIVERCOLOR_SetActiveElement;
HTMLCONTROL.prototype.DRIVERCOLOR_AddSelElement=DRIVERCOLOR_AddSelElement;
HTMLCONTROL.prototype.DRIVERCOLOR_DelSelElement=DRIVERCOLOR_DelSelElement;
HTMLCONTROL.prototype.APIMODE_SetSelection=APIMODE_SetSelection;
HTMLCONTROL.prototype.MAPTYPE_SetSelection=MAPTYPE_SetSelection;
HTMLCONTROL.prototype.addMaptypeOption=addMaptypeOption;
HTMLCONTROL.prototype.ChangeHtmlContentByID=ChangeHtmlContentByID;