// CLASS of an pCars replays
function PCARSRECORDER(config)
{
        // vars
        this.maxRecordSize 		=	config.maxRecordSize;			// set max array size
		this.DataVersion 		=	config.DataVersion;				// version of the data format etc
		this.FileContentPrefix	=	"___PCARSCompressedJSONC___";	// content prefix to identifiy the typ of compression for import decision
        
		//TODO: Maybe allocate Array with maxRecordSize for optimize performance
		this.CurrentDataSize	=	0;							// in kbyte
		this.data				=	[];
        this.data.racedata		=	[];   						// contains all replay data, each line includes one data record
		this.data.common		=	[];   						// contains all replay data, each line includes one data record
		this.aStatistics		=	[];							// array of severals statistics
	
	
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
	return this.CurrentDataSize;
}

function clearDataSet() {
	// clear all saved data of the object
	// TODO: or let array exist and only clear CurrentDataSize?? or this.data.lenght=0 ??
	this.data.racedata 		=	[]; 
	this.CurrentDataSize	=	0;
	
	return 1;
}

function exportDataCompressed(filename){

	// do not export empty array
	if (this.data.racedata.length >= 1){
		
		//TODO: Change structure to this.data.racedata and add Information like 	ExportFormatVersion=1.0				
		SaveAsFile(
				//Compress a JSON object as a Gzipped string after compress it using JSONC +  JSON to Array
				this.FileContentPrefix + JSONC.pack(JSON.stringify(this.data), true ),				
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
	
	//Test data
	compressedData 		= this.FileContentPrefix + JSONC.pack(JSON.stringify(this.data), true );
	var isCompressed 	= false;
	
	// first clear all existing data  this.DataVersion
	this.clearDataSet();
	
	
	//if (compressed)
	
	
	return 1;
}



function addDataset(dataset) {
	// TODO:  define Format
	if(log >= 3){console.log("---+++ PCARSRECORDER data added:   ", dataset);}

	// TODO: really needed or could be deletd because of performance issues?
//	if ( this.data.length > this.maxDatasetSize ){
		// max size reached, do not add addtional entires
//		return 0;
//	}
			
    this.data.racedata.push(dataset);
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