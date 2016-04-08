// CLASS of an pCars replays
function PCARSREPLAY(maxSize)
{
        // vars
        this.maxDatasetSize 	=	maxSize;	// set max size
        this.filterString		=	"";  		// a filter like "save only pratice/qualfying sessions"
        this.data				=	[];   		// contains all replay data
        
    
        return this;
}

//
function loadFromFile (path){
	
	//this.data = { lap1: {driver1: {posx: 21122; posy: 82766;}}}

	//this.clearDataSet();
	return 1;
}

function addDataset(data) {

	if ( this.data.length > this.maxDatasetSize ){
		// max size reached, do not add addtional entires
		return 0;
	}
	//this.data.raw.push({driver1, driver2, driver3});
	
	
	return 1;
}


function setFilter(str) {

	// clear all saved data of the object
	this.filterString = str;
	
	return 1;
}

function getDatasetSize() {
	
	return this.data.lentgh;
}

function clearDataSet() {

	// clear all saved data of the object
	this.data = [];
	
	return 1;
}


PCARSREPLAY.prototype.loadFromFile=loadFromFile;
PCARSREPLAY.prototype.addDataSet=addDataSet;
PCARSREPLAY.prototype.setFilter=setFilter;
PCARSREPLAY.prototype.clearDataset=clearDataset;
PCARSREPLAY.prototype.getDatasetSize=getDatasetSize;