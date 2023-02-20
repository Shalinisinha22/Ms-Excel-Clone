function colorPromise(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },1000)
    })
}

async function isGraphCylicTracePath(graphComponentMatrix, cycleResponse) {
    let [srcr, srcc] = cycleResponse;
    let visited = []; // Node visit trace
    let dfsVisited = []; // Stack visit trace

    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsVisitedRow = [];
        for (let j = 0; j < cols; j++) {
            visitedRow.push(false);
            dfsVisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsVisited.push(dfsVisitedRow);
    }

    let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
    if (response === true) return Promise.resolve(true);

    return Promise.resolve(false);
}

//    coloring cells for tracking
  
 async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited){
     visited[srcr][srcc] = true;
     dfsVisited[srcr][srcc] = true;


     let cell=document.querySelector(`.create-cell[rid="${srcr}"][cid="${srcc}"]`);
        cell.style.backgroundColor="lightblue";
       await  colorPromise()//wait for 1 sec
     
   for(let i=0;i<graphComponentMatrix[srcr][srcc].length;i++){
       let [nbrid,nbcid]=graphComponentMatrix[srcr][srcc][i];
   
       if(visited[nbrid][nbcid] === false){
         let response= await dfsCycleDetectionTracePath(graphComponentMatrix, nbrid, nbcid, visited, dfsVisited);
         if(response===true) {
            cell.style.backgroundColor="transparent";
            await  colorPromise();
             return Promise.resolve(true);

            }//found cycle no need to explore path
       }
   
       else if(visited[nbrid][nbcid]===true && dfsVisited[nbrid][nbcid]===true){
        let cyclicCell=document.querySelector(`.create-cell[rid="${nbrid}"][cid="${nbcid}"]`);
      
            cyclicCell.style.backgroundColor="lightsalmon";
            await  colorPromise();
     
            cyclicCell.style.backgroundColor="transparent";
            await  colorPromise();

            cell.style.backgroundColor="transparent";
            await  colorPromise();

            return Promise.resolve(true);
       } 
     }

     dfsVisited[srcr][srcc] = false;
     return Promise.resolve(false);
   
   }
 