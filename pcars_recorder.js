// CLASS of an pCars replays
function PCARSRECORDER(config)
{
        // vars
        this.maxRecordSize 			=	config.maxRecordSize;						// set max array size
		this.DataVersion 			=	config.DataVersion;							// version of the data format etc
		this.FileContentPrefix		=	"___PCARSCompressedJSONC_v01___";			// content prefix to identifiy the typ of compression for import decision, should be exactly 26 for slice file while import
		this.FileNameInArchive		=	"data.pcars";
		this.isLzwComprEnabled 		= 	false;
        
		//TODO: Maybe allocate Array with maxRecordSize for optimize performance
		this.CurrentDataSize	=	0;							// in kbyte
		this.data				=	new Array();				       
		this.aStatistics		=	new Array();				// array of severals statistics
	
	
		if(log >= 3){console.log("---+++ Instance of PCARSRECORDER created:   ", this);}
	
        return this;
}

function getStatistics(){
	// size of array => this.getDatasetSize();
	// used memory
	// version
	// ...
	
	return {number: this.getDatasetSize(), size: this.memorySizeOf (this.data)};
}

function getDatasetSize(){
	return this.data.length;
}

function getCurrentData(){
	//export the curent array of data
	return this.data;
}

function clearDataSet() {
	// clear all saved data of the object
	// TODO: or let array exist and only clear CurrentDataSize?? or this.data.lenght=0 ??
	this.data 				=	[]; 
	this.CurrentDataSize	=	0;
	
	return 1;
}

function resetRacestats(aStats){

/*
	for (var value in aStats) {
		if (aStats.hasOwnProperty(value)) {
			delete aStats[value];
		}
	}
*/
	
	aStats = {};
	aStats['drivers']	= {};
	
	if(log >= 3){console.log("Reset Race Statistik ! Size after Deletion: ", aStats);}
	
	return aStats;
}

function exportDataCompressed(filename){

	// do not export an empty array
	if (this.data.length >= 1){
	
		var zip = new JSZip();
		zip.file( this.FileNameInArchive , JSON.stringify( this.data ) 	);
		
		//add version information in extra file
		zip.file("version.txt" , "CompressionVersion_ZIP_v2");
		
		//generate zip archive
		zip.generateAsync({type:"blob", compression: "DEFLATE", compressionOptions : {level:9} })
		.then(function(content) {
			// using FileSaver.js, save zip file
			saveAs(content, filename);
		});
								
	}else{
		alert("Data Array empty. No Export possible")
	}
	
	return 1;
}


function importData(compressedData){

	//if(log >= 3){console.log('+++++++++++ PCARSREC importData(). Importing new compressed data: ', compressedData );};
	
	var new_zip = new JSZip();
	new_zip.loadAsync(compressedData)
	.then(function(zip) {
		// select file within zip archive by filename
		//TODO: replace "data.pcars"  this.FileNameInArchive . Cast to String needed?	
		return zip.file( "data.pcars" ).async("string");
	})		
	.then(function success(uncompressedData) {
    			
		uncompressedData = JSON.parse(uncompressedData);
		//TODO: really needed to save import to this.data?????????????????????????????????????????
		//this.data = uncompressedData;		  
		initDemoData(uncompressedData, "yes"); //-> Async Call
				
      }, function error(e) {
		alert("Error unzip: " + e);
      });
		
	return 1;
}

function addDataset(dataset) {
	// TODO:  define Format
	//if(log >= 3){console.log("---+++ PCARSRECORDER data added:   ", dataset);}

	// TODO: really needed or could be deletd because of performance issues?
//	if ( this.data.length > this.maxDatasetSize ){		
//		return 0;
//	}
			
    this.data.push(	dataset	);    
	this.CurrentDataSize++;		
		
	return 1;
}

function memorySizeOf(obj) {
	
	//todo: check if it is possible to optimized MemSizeCalculation
	return "disabled";
	
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
PCARSRECORDER.prototype.getCurrentData 	=	getCurrentData;
PCARSRECORDER.prototype.clearDataSet	=	clearDataSet;
PCARSRECORDER.prototype.importData		=	importData;
PCARSRECORDER.prototype.addDataset		=	addDataset;
PCARSRECORDER.prototype.memorySizeOf	=	memorySizeOf;
PCARSRECORDER.prototype.exportDataCompressed	=	exportDataCompressed;
PCARSRECORDER.prototype.resetRacestats = resetRacestats;
