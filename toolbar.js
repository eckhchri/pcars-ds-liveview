$( "#theme-selector input" ).on( "change", function( event ) {
				var themeClass = $( "#theme-selector input:checked" ).attr( "id" );

				$( "#testpage" ).removeClass( "ui-page-theme-a ui-page-theme-b" ).addClass( "ui-page-theme-" + themeClass );
				$( "#ui-body-test" ).removeClass( "ui-body-a ui-body-b" ).addClass( "ui-body-" + themeClass );
				$( "#ui-bar-test, #ui-bar-form" ).removeClass( "ui-bar-a ui-bar-b" ).addClass( "ui-bar-" + themeClass );
				$( ".ui-collapsible-content" ).removeClass( "ui-body-a ui-body-b" ).addClass( "ui-body-" + themeClass );
				$( ".theme" ).text( themeClass );
			});



