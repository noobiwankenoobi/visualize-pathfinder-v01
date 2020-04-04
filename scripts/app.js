


///////////////////
// BOARD OBJECT //
////////////////////////////////
const boardObject = {
    selectedAlgorithm: "dykstra"
}



// CREATE BOARD //
function createInitialBoard(boardHeight, boardWidth) {

}

const selectedAlgorithm = boardObject.selectedAlgorithm;

function runCurrentAlgorithm(selectedAlgorithm) {
    if (selectedAlgorithm = "dykstra"){
        runDykstraAlgorithm()
    }
    
}

function runDykstraAlgorithm() {
    console.log("Dykstra's Algorithm is Running!")

}

/////////////////////////////
// BUTTON EVENT LISTENERS //
/////////////////////////////////////////
const addHandlers = () => {
    // Nav Links
    $('#activate-button').on('click', runCurrentAlgorithm);
    
  }

///////////////////
// ON PAGE LOAD //
/////////////////////////////////
$(() => {
    addHandlers();
  })