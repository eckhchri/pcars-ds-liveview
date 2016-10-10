// CLASS of an pCars replays
function PCARSRECORDER(config)
{
        // vars
        this.maxRecordSize 		=	config.maxRecordSize;	// set max array size
		this.DataVersion 		=	config.DataVersion;		// version of the data format etc
        
		//TODO: Maybe allocate Array with maxRecordSize for optimize performance
		this.CurrentDataSize	=	0;
        this.data				=	[];   						// contains all replay data, each line includes one data record
		this.aStatistics		=	[];							// array of severals statistics
	
	
		if(log >= 3){console.log("---+++ Instance of PCARSRECORDER created:   ", this);}
	
        return this;
}

function getStatistics (){
	// size of array => this.getDatasetSize();
	// used memory
	// version
	// ...
	
	return 1;
}

function getDatasetSize() {
	return this.CurrentDataSize;
}

function clearDataSet() {
	// clear all saved data of the object
	// TODO: or let array exist and only clear CurrentDataSize?? or this.data.lenght=0 ??
	this.data = []; 
	this.CurrentDataSize	=	0;
	
	return 1;
}

function loadData (path){
	// SOURCE could be:  URL, LOCAL, HASH
	//this.data = { lap1: {driver1: {posx: 21122; posy: 82766;}}}
	
	//TODO: if URL/LOCAL check data format version from
	
	// first clear all existing data  this.DataVersion
	this.clearDataSet();
	
	return 1;
}

function addDataset(racedata) {
	// TODO:  define Format
	if(log >= 3){console.log("---+++ PCARSRECORDER data added:   ", racedata);}

	// TODO: really needed or could be deletd because of performance issues?
//	if ( this.data.length > this.maxDatasetSize ){
		// max size reached, do not add addtional entires
//		return 0;
//	}
	//this.data.raw.push({driver1, driver2, driver3});
	
	
	return 1;
}



PCARSRECORDER.prototype.getStatistics	=	getStatistics;
PCARSRECORDER.prototype.getDatasetSize	=	getDatasetSize;
PCARSRECORDER.prototype.clearDataSet	=	clearDataSet;
PCARSRECORDER.prototype.loadData		=	loadData;
PCARSRECORDER.prototype.addDataset		=	addDataset;