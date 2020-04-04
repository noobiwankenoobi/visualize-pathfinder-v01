
///////////////////
// BOARD OBJECT //
////////////////////////////////
const gridObject = {
    selectedAlgorithm: "dykstra",
    startingGridHeight: 25,
    startingGridWidth: 50,
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
    console.log("rows=", maxRows)
    console.log("cols=", maxCols)
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

  // use insertRow() !!!!
function renderInitialGrid () {
    grid = createInitialGrid();
    // console.log("grid.length is=", grid.length);
    // console.log("grid inside renderGrid is=", grid)
    for (let i = 0; i < grid.length; i++) {
        currentRow = grid[i];
        table = document.getElementById('node-grid');
        row = document.createElement('tr');
        table.append(document.createElement('tr'))

        for (let j = 0; j < currentRow.length; j++) {
            currentNode = currentRow[j];
            console.log("currentRow is=", currentRow)
            console.log("currentNode is=", currentNode);
            // tableData = ;
            row.append(document.createElement('td'))
            
        }
    }

}




//         tableRow = document.createElement('tr');
//         table.append(currentRow)

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
    renderInitialGrid()
    // createInitialGrid();
  })