// CLASS of an pCars replays
function PCARSRECORDER(config)
{
        // vars
        this.maxRecordSize 			=	config.maxRecordSize;						// set max array size
		this.DataVersion 			=	config.DataVersion;							// version of the data format etc
		this.FileContentPrefix		=	"___PCARSCompressedJSONC_v01___";			// content prefix to identifiy the typ of compression for import decision, should be exactly 26 for slice file while import
		this.isLzwComprEnabled 		= 	false;
        
		//TODO: Maybe allocate Array with maxRecordSize for optimize performance
		this.CurrentDataSize	=	0;							// in kbyte
		this.data				=	new Array();				       
		this.aStatistics		=	new Array();				// array of severals statistics
	
	
		if(log >= 3){console.log("---+++ Instance of PCARSRECORDER created:   ", this);}
	
        return this;
}

function getStatistics (){
	// size of array => this.getDatasetSize();
	// used memory
	// version
	// ...
	
	return {number: this.getDatasetSize(), size: this.memorySizeOf (this.data)};
}

function getDatasetSize() {
	return this.data.length;
}

function clearDataSet() {
	// clear all saved data of the object
	// TODO: or let array exist and only clear CurrentDataSize?? or this.data.lenght=0 ??
	this.data 				=	[]; 
	this.CurrentDataSize	=	0;
	
	return 1;
}

function exportDataCompressed(filename){

	// do not export empty array
	if (this.data.length >= 1){
	
		SaveAsFile(
				//Compress a JSON object as a Gzipped string after compress it using JSONC +  JSON to Array
				this.FileContentPrefix + JSONC.pack(	JSON.stringify(this.data), this.isLzwComprEnabled ),				
				filename,
				"text/plain;charset=utf-8");	
	}else{
		alert("Data Array empty. No Export possible")
	}
	
	return 1;
}

function importData(compressedData){
	// SOURCE could be:  URL, LOCAL, HASH
	//this.data = { lap1: {driver1: {posx: 21122; posy: 82766;}}}
	//TODO: if URL/LOCAL check data format version from
	//TODO:  //$.map( JSONC.pack( JSON.stringify(this.data), true ) , function(el) { return el }),	

	
	//ToDo: first clear all existing data  this.DataVersion
	//this.clearDataSet();
	
	
	//Slice datastream
	
	//if (compressed)
	//if(log >= 3){console.log('+++++++++++ PCARSREC importData(uncompressed data): ', this.unCompressData(compressedData) );};	
	//alert (  JSONC.unpack( JSONC.pack(JSON.stringify(this.data), true ) , true ) );	
	//var	jsonstringified			=	JSON.stringify(this.data);
	//if(log >= 3){console.log('+++++++++++ PCARSREC jsonstringified:  ', jsonstringified );};		
	//var teststringCompressed	= 	JSONC.pack(	jsonstringified	, true );
	//if(log >= 3){console.log('+++++++++++ PCARSREC teststringCompressed:  ', teststringCompressed);};		
	//var teststringUnCompressed	= 	JSONC.unpack(	teststringCompressed	);
	//if(log >= 3){console.log('+++++++++++ PCARSREC compare:  ', jsonstringified + " ----------- " + teststringCompressed + " ----------- " + teststringUnCompressed  );};	
	

	this.data 	=	JSON.parse( 
							JSONC.unpack(compressedData, this.isLzwComprEnabled) 
						);
	if(log >= 3){console.log('+++++++++++ PCARSREC parsed :  ', this.data );};	
	
/*	
	console.log('+++++++++++ PCARSREC this.data:  ', this.data );
	
	var	jsonstringified			=	JSON.stringify( this.data );	
	console.log('+++++++++++ PCARSREC jsonstringified:  ', jsonstringified + " (---size:" + jsonstringified.length + " ---)");
	
	var compressed	=	JSONC.pack( jsonstringified, this.isLzwComprEnabled	);
	console.log('+++++++++++ PCARSREC compressed:  ', compressed  + " (---size:" + compressed.length + " ---)");
			
	var uncompressed	=	JSONC.unpack( compressed , this.isLzwComprEnabled	);
	console.log('+++++++++++ PCARSREC uncompressed:  ', uncompressed + " (---size:" + uncompressed.length + " ---)");
	
	var parsed	=	JSON.parse( uncompressed	);
	console.log('+++++++++++ PCARSREC parsed:  ', parsed + " (---size:" + parsed.length + " ---)");
*/
		
	return 1;
}

function unCompressData(compressedStr, LzwComprEna){

	return JSONC.unpack( compressedStr, LzwComprEna);
}


function addDataset(dataset) {
	// TODO:  define Format
	if(log >= 3){console.log("---+++ PCARSRECORDER data added:   ", dataset);}

	// TODO: really needed or could be deletd because of performance issues?
//	if ( this.data.length > this.maxDatasetSize ){		
//		return 0;
//	}
			
    this.data.push(	dataset	);
	this.CurrentDataSize++;
		
	return 1;
}

function memorySizeOf(obj) {
    var bytes = 0;

    function sizeOf(obj) {
        if(obj !== null && obj !== undefined) {
            switch(typeof obj) {
            case 'number':
                bytes += 8;
                break;
            case 'string':
                bytes += obj.length * 2;
                break;
            case 'boolean':
                bytes += 4;
                break;
            case 'object':
                var objClass = Object.prototype.toString.call(obj).slice(8, -1);
                if(objClass === 'Object' || objClass === 'Array') {
                    for(var key in obj) {
                        if(!obj.hasOwnProperty(key)) continue;
                        sizeOf(obj[key]);
                    }
                } else bytes += obj.toString().length * 2;
                break;
            }
        }
        return bytes;
    };

    function formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
        else return(bytes / 1073741824).toFixed(3) + " GiB";
    };

    return formatByteSize(sizeOf(obj));
};



PCARSRECORDER.prototype.getStatistics	=	getStatistics;
PCARSRECORDER.prototype.getDatasetSize	=	getDatasetSize;
PCARSRECORDER.prototype.clearDataSet	=	clearDataSet;
PCARSRECORDER.prototype.importData		=	importData;
PCARSRECORDER.prototype.addDataset		=	addDataset;
PCARSRECORDER.prototype.memorySizeOf	=	memorySizeOf;
PCARSRECORDER.prototype.exportDataCompressed	=	exportDataCompressed;
PCARSRECORDER.prototype.unCompressData	=	unCompressData;