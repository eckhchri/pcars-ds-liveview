function PCARSTOOLBAR(){
	
	
	this.hideHeader		=	false;
	this.toolbartimer	=	1000;
	
	
}

function activateToolbar_Header(){
	
	$( ".TOOLBARHEADER" ).html( str_html );
	
	return 1;
}

function updateHeaderVar(aChanges){
	// set value in header toolbar
	$.each(aChanges, function (key, value) {
		$( "#" + key ).text(value);
	});
	
	
	return 1;
}

function activateToolbar_rPanel(){
	
	
	var str_html =	"<h3>Right Panel: Push</h3>" +
			"    	<p>To close, click off the panel, swipe left or right, hit the Esc key, or use the button below:</p>" +
			"		<div data-role='collapsible'>" +
			"			<h4>General Settings</h4>" +
			"		<form>" +
			"			<div class='ui-field-contain ui-mini'>" +
			"				<label for='select-native-1'>General:</label>	" +
			"				<select name='select-native-1' id='select-native-1'>" +
			"				<option value='1'>DS Mode</option>" +
			"				<option value='2'>CREST Mode</option>" +
			"				<option value='3'>PROXY Mode</option>" +
			"				</select>" +
			"			</div>" +
			"		</form>" +
			"" +
			"	<form>	" +
			"		<label for='url-2'>DS Url</label>	" +
			"		<input type='url' data-clear-btn='true' name='url-2' id='url-2' value=''>" +
			"		<label for='number-1'>DS Port</label>" +
			"		<input type='number' data-clear-btn='false' name='number-1' id='number-1' value=''>	" +
			"	</form>" +
			" </div>" +
			"" +
			"<div data-role='collapsible' >" +
			"	<h4>Display Settings</h4>" +
			"	<form>	    " +
			"		<fieldset data-role='controlgroup'>" +
			"			<legend>Display Options</legend>	" +
			"		<input type='checkbox' name='CB-DISPLAYDRIVERLIST' id='CB-DISPLAYDRIVERLIST'>" +
			"		<label for='CB-DISPLAYDRIVERLIST'>show driverlist</label>" +
			"		<input type='checkbox' name='CB-DISPLAYTRACKLIST' id='CB-DISPLAYTRACKLIST'>" +
			"		<label for='CB-DISPLAYTRACKLIST'>show tracklist</label>" +
			"		<input type='checkbox' name='CB-DISPLAYSTATISTICS' id='CB-DISPLAYSTATISTICS'>" +
			"		<label for='CB-DISPLAYSTATISTICS'>show statistics</label>" +
			"	</fieldset>" +
			"</form>" +
			"</div>" +
			"" +
			"<div data-role='collapsible'>" +
			"<h4>Other Settings</h4>" +
			"<form>" +
			"		<label for='slider-1'>Slider:</label>" +
			"			<input type='range' name='slider-1' id='slider-1' min='0' max='100' value='50'>		" +
			"</form>" +
			"<form>" +
			"	<div class='ui-field-contain' id='theme-selector'>" +
			"		<fieldset data-role='controlgroup' data-type='horizontal'>" +
			"			<legend>Theme:</legend>	" +
			"			<label for='a'>A</label>" +
			"			<input type='radio' name='theme' id='a' checked>" +
			"			<label for='b'>B</label>" +
			"			<input type='radio' name='theme' id='b'>" +
			"		</fieldset>" +
			"	</div>" +
			"</form>" +
			"</div>" +
			"<div data-role='collapsible'>" +
			"<h4>Replay Settings</h4>" +
			"<form>" +
			"	<div class='ui-field-contain' id='theme-selector'>" +
			"		<div data-role='rangeslider' data-mini='true'>" +
			"			<label for='range-4a'>Rangeslider:</label>	" +
			"			<input type='range' name='range-4a' id='range-4a' min='0' max='1500' value='100'>" +
			"			<label for='range-4b'>Rangeslider:</label>" +
			"			<input type='range' name='range-4b' id='range-4b' min='0' max='2500' value='500'>" +
			"	</div>" +
			"</form>" +
			"</div>";    
	
	$( ".TOOLBARRIGTHPANEL" ).html( str_html.replace(/\s+/g," ") );
	
	return 1;
}


PCARSTOOLBAR.prototype.activateToolbar_Header=activateToolbar_Header;
PCARSTOOLBAR.prototype.activateToolbar_rPanel=activateToolbar_rPanel;
PCARSTOOLBAR.prototype.updateHeaderVar=updateHeaderVar;










$( "#theme-selector input" ).on( "change", function( event ) {
				var themeClass = $( "#theme-selector input:checked" ).attr( "id" );

				$( "#testpage" ).removeClass( "ui-page-theme-a ui-page-theme-b" ).addClass( "ui-page-theme-" + themeClass );
				$( "#ui-body-test" ).removeClass( "ui-body-a ui-body-b" ).addClass( "ui-body-" + themeClass );
				$( "#ui-bar-test, #ui-bar-form" ).removeClass( "ui-bar-a ui-bar-b" ).addClass( "ui-bar-" + themeClass );
				$( ".ui-collapsible-content" ).removeClass( "ui-body-a ui-body-b" ).addClass( "ui-body-" + themeClass );
				$( ".theme" ).text( themeClass );
			});



