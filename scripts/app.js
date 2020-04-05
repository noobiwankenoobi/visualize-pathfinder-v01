
///////////////////
// BOARD OBJECT //
////////////////////////////////
const gridObject = {
    selectedAlgorithm: "dykstra",
    startingGridHeight: 25,
    startingGridWidth: 50,
    nodeArray: [],
    visitedNodes: [],
}

// STARTING AND FINISHING NODES, HARDCODED FOR NOW
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


//////////////////////////
// CREATE INITIAL GRID //
//////////////////////////////////
function createInitialGrid(row, col) {
    const grid = [];
    const maxRows = gridObject.startingGridHeight;
    const maxCols = gridObject.startingGridWidth;
    console.log("maxRows=", maxRows)
    console.log("maxCols=", maxCols)
    for (let row = 0; row < maxRows; row++) {
        const currentRow = [];
        for (let col = 0; col < maxCols; col++) {
        currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    // console.log("GRID[0] IS", grid[0])
    return grid; 
};

// RETURNS A NODE OBJECT
const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      isWeight: false,
      previousNode: null,
    };
  };

// RENDER THE CREATED INITIAL GRID
function renderInitialGrid () {

    let grid = createInitialGrid();

    for (let i = 0; i < grid.length; i++) {
        currentRow = grid[i];
        table = document.getElementById('node-grid');
        row = table.insertRow(i);

        for (let j = 0; j < currentRow.length; j++) {
            let currentNode = currentRow[j]
            let rowId = currentNode.row;
            let colId = currentNode.col;
            
            // INSERT CELL AND GIVE IDs
            row.insertCell(j).setAttribute('id', `"node-${rowId}-${colId}"`);
           
            // LOGS
            // console.log("rowID= ", rowId);
            // console.log("currentRow[j] =", currentNode); 
        }
    }
    // return assignClassToNode()
}

function assignClassToNode() {
    console.log("GIVE CLASS NODE IS RUNNING");
    
}

function setStartingdNodeClass() {
    const startingNode = document.getElementById(`"node-${START_NODE_ROW}-${START_NODE_COL}"`).className = 'start-node';
    console.log(startingNode)
    
    
}


////////////////////
// RUN ALGORITHM //
////////////////////////////
const selectedAlgorithm = gridObject.selectedAlgorithm;

function runCurrentAlgorithm(selectedAlgorithm) {
    if (selectedAlgorithm = "dykstra"){
        runDykstraAlgorithm()
    }
    
}

function runDykstraAlgorithm() {
    console.log("Dykstra's Algorithm is Running!")

}

function keepTrackOfVisitedNodes() {
    console.log("Keep track of visited nodes")
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
    renderInitialGrid();
    setStartingdNodeClass();
    // createInitialGrid();
  })