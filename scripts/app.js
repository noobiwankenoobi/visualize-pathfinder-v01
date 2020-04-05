
///////////////////
// BOARD OBJECT //
////////////////////////////////
const gridObject = {
    selectedAlgorithm: "dykstra",
    startingGridHeight: 25,
    startingGridWidth: 50,
    nodeArray: [],
    visitedNodes: [],
    grid: [],
}

// STARTING AND FINISHING NODES, HARDCODED FOR NOW
const START_NODE_ROW = 11;
const START_NODE_COL = 11;
const FINISH_NODE_ROW = 11;
const FINISH_NODE_COL = 38;


//////////////////////////
// CREATE INITIAL GRID //
//////////////////////////////////
function createInitialGrid(row, col) {
    const grid = [];
    const maxRows = gridObject.startingGridHeight;
    const maxCols = gridObject.startingGridWidth;
    
    for (let row = 0; row < maxRows; row++) {
        const currentRow = [];
        for (let col = 0; col < maxCols; col++) {
        currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    // Sets the grid to the gridObject to be accessed by initiateDykstraVisualization
    gridObject.grid = grid;
    // LOGS
    console.log("grid inside createInitialGrid =", grid)
    console.log("gridObject.grid inside createInitialGrid =", gridObject.grid)
    // grid is an array of arrays, each row being an array
    return grid; 
};

// RETURNS A NODE OBJECT
const createNode = (row, col) => {
    return {
      row,
      col,
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

function setInitialNodeClasses() {
    // Starting Node
    document.getElementById(`"node-${START_NODE_ROW}-${START_NODE_COL}"`).className = 'start-node';
    // End Node
    document.getElementById(`"node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}"`).className = 'finish-node';
    
    
    
}


////////////////////
// RUN ALGORITHM //
////////////////////////////
const selectedAlgorithm = gridObject.selectedAlgorithm;

function runCurrentAlgorithm(selectedAlgorithm) {
    if (selectedAlgorithm = "dykstra"){
        initiateDykstraVisualization()
    }
    
}

// Dykstra //
// We need to be able to find the unvisited nodes, give start node a distance of 0, give unvisited nodes a distance of Infinity, find the closest node, check its distance, check if it's already been visited, check if it's the finish node, check if it's a wall (keep going if it is), keep track of the unvisited nodes, keep track of the visited nodes in a collection so that we can then use it to trace back the shortest path and animate the shortest path, put visited nodes in a collection that we can then iterate through and animate in real time on an interval, actually the entire algo process will be on an interval to make it visually satisfying. Will allow the user to change the speed at some point. Will also allow users to create walls by clicking and dragging


function runDijkstraAlgorithm(grid, startNode, finishNode) {
    console.log("Dykstra's Algorithm is Running!")
    startNode.distance = 0;
    // visitedNodesInOrder starts out as an empty array
    const visitedNodesInOrder = [];
    // Passes getAllNodes the grid that it was passed, gets back the array of all unvisited nodes, assigns it to unvisitedNodes
    const unvisitedNodes = getAllNodes(grid);
    // Makes sure the function stops at the end of the unvisitedNodes array
    while (!!unvisitedNodes.length) {
      // Passes all the unvisitedNodes to the sort-by-distance function
      sortNodesByDistance(unvisitedNodes);
      // Takes the first node off the distance-sorted array and assigns it to closestNode
      const closestNode = unvisitedNodes.shift();
      // If the closestNode is a "wall", it gets skipped and the process continues
      if (closestNode.isWall) continue;
      // If the closestNode's distance is Infinity, the process is "trapped" and stops
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      // Gives the closestNode an "isVisited" of true
      closestNode.isVisited = true;
      // Pushes the closestNode into the empty visitedNodesInOrder array
      visitedNodesInOrder.push(closestNode);
      // LOGS
      console.log("visitedNodesInOrder inside runDykstraAlgorithm =", visitedNodesInOrder)
      // If closest node is the finishNode, return the visitedNodesInOrder array to be handled by...
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighborNodes(closestNode, grid);
    }
  }

  function sortNodesByDistance(unvisitedNodes) {
    // array.sort takes a "compareFunction" (a,b). It's getting passed the unvisitedNodes array from runDykstraAlgorithm. If nodeA's distance is greater than nodeB's distance, the compare function will return a *positive* value, and nodeB will be given an index that is less than nodeA's (nodeB moves left). If nodeA's distance is *less* than nodeB's, the function returns a negative value, nodeA is sorted to an index lower than nodeB's (nodeA moves left). Also, this doesn't create a copy of the array, it sorts the array in place
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }



function keepTrackOfVisitedNodes() {
    console.log("Keep track of visited nodes")
}

function updateUnvisitedNeighborNodes(node, grid) {
    const unvisitedNeighborNodes = getUnvisitedNeighborNodes(node, grid);
    for (const neighborNode of unvisitedNeighborNodes) {
      // Gives the neighborNodes a distance of the current node's distance +1
      neighborNode.distance = node.distance + 1;
      // Gives the node it was passed a "previousNode" of the current node
      neighborNode.previousNode = node;
    }
  }

function getUnvisitedNeighborNodes(node, grid) {
    const neighborNodes = [];
    const {col, row} = node;
    // making sure it doesn't get neighbors outside the boundaries of our grid
    if (row > 0) { neighborNodes.push(grid[row - 1][col]) };
    if (row < grid.length - 1) neighborNodes.push(grid[row + 1][col]);
    if (col > 0) neighborNodes.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighborNodes.push(grid[row][col + 1]);
    console.log("neighborNodes =", neighborNodes)
    // filters out any neighbor nodes that have already been visited and returns the neighborNodes array
    return neighborNodes.filter(neighborNode => !neighborNode.isVisited);
  }

//  Gets passed the grid then iterates through using for...of loop, pushes individual nodes into an array called allNodes and then returns it so the algorithm function runDykstraAlgorithm can use it. *Love* for...in loops \o/
function getAllNodes(grid) {
    const allNodes = [];
    for (const row of grid) {
        for (const node of row) {
        allNodes.push(node);
        }
    }
    return allNodes;
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    // Sets the finishNode to the currentNode and works backwards
    let currentNode = finishNode;
    while (currentNode !== null) {
        // Unshift adds each new element to the beginnin of the nodesInShortestPathOrder array
        nodesInShortestPathOrder.unshift(currentNode);
        // To continue the process, it resets the currentNode to the "previousNode" of that currentNode, then it continues until it reaches a node that doesn't have a previousNode, then it returns the nodesInShortestPathOrder array, to be called by initiateDykstraVisualization an be assigned to a const, then passed to the animateDykstraAlgorith function for the shortest path to be illuminated
        currentNode = currentNode.previousNode;
    }
    // LOGS
    console.log("nodesInShortestPathOrder inside getNodesInShortestPathOrder =", nodesInShortestPathOrder)

    // Returns the shortest path array, in order
    return nodesInShortestPathOrder;
}

// if (i === visitedNodesInOrder.length) {
//     setTimeout(() => {
//       this.animateShortestPath(nodesInShortestPathOrder);
//     }, 10 * i);
//     return;
//   }

////////////////////////////
// ANIMATE SHORTEST PATH //
////////////////////////////////////////
function animateShortestPath(nodesInShortestPathOrder) {
    console.log("nodesInShortestPathOrder =", nodesInShortestPathOrder)
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        shortestPathNode = nodesInShortestPathOrder[i];
        setTimeout(() => {
            document.getElementById(`"node-${shortestPathNode.row}-${shortestPathNode.col}"`).className = "node-shortest-path";
        }, 50 * i)        
    }
}

//////////////////////
// ANIMATE DYKSTRA //
/////////////////////////////////////////
function animateDykstraAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    console.log("animateDykstraAlgorithm is running!!")
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
        setTimeout(() => {
        const visitedNode = visitedNodesInOrder[i];
        document.getElementById(`"node-${visitedNode.row}-${visitedNode.col}"`).className = "node-visited";
        
        }, 10 * i);
        
    }   
    animateShortestPath(nodesInShortestPathOrder)
     
}

////////////////////////////////////
// INITIATE DYSTRA VISUALIZATION //
////////////////////////////////////////////////////////////
function initiateDykstraVisualization() {
    const grid = gridObject.grid;
    // console.log("grid inside initiateDykstraVisualization =", grid)
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    // Run the algo
    const visitedNodesInOrder = runDijkstraAlgorithm(grid, startNode, finishNode);
    // Passes the finishNode to the getNodesInShortestPathOrder function
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDykstraAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);animateShortestPath(nodesInShortestPathOrder);
    // LOGS IMPORTANT
    // console.log("visitedNodesInOrder inside initiateDykstraVisualization =", visitedNodesInOrder)
    // console.log("nodesInShortestPathOrder inside initiateDykstraVisualization =", visitedNodesInOrder)

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
    setInitialNodeClasses();

  })