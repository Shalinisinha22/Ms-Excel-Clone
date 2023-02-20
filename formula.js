// blur=>cell se move kr jte hai(first compare to click)
// focus=>cell pe ho(first compare to blur)

for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell=document.querySelector(`.create-cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
            let adress=adressbar.value;
           let [cell,cellProp]= getCellAndCellProp(adress);
           let enteredData=cell.innerText;
           if(enteredData === cellProp.value) return;

           cellProp.value=enteredData;
           //if data modified remove pc relation ,empty formula then update children with modified value
           removeChildFromParent(cellProp.formula);
           cellProp.formula = "";
           updateChildrenCells(adress);
        //    console.log(cellProp)
        })
    }
}


let formulabar=document.querySelector(".formula-bar");
//formula evaluation(normal xpression=>(10+20),dependency expression=>(a1+b2))

formulabar.addEventListener("keydown",async(e)=>{
    let formula=formulabar.value;
    if(e.key === "Enter" && formula){

//If change in formula then remove child from parent and add new formula and add new parent child relation


  let adress=adressbar.value;
   let [cell,cellProp]= getCellAndCellProp(adress);

   if(formula!==cellProp.formula) removeChildFromParent(cellProp.formula);


   addChildToGraphComponent(formula,adress);
//    console.log(graphComponentMatrix)
  
   //check formula is cycilc or not 
   
   let cycleResponse =  isGraphCyclic(graphComponentMatrix);
   if (cycleResponse) {
    //    alert("Your formula is cyclic");
       let response = confirm("Your formula is cyclic. Do you want to trace your path?");
       while (response === true) {
           // Keep on tracking color until user is satisfied
           await isGraphCylicTracePath(graphComponentMatrix, cycleResponse); 
           // I want to complete full  iteration of color tracking, so I will attach await here also
           response = confirm("Your formula is cyclic. Do you want to trace your path?");
       }


  removeChildFromGraphComponent(formula,adress);
   return;
   }



   let evaluatedValue=evaluateFormula(formula);
      //to update ui and cellprop in DB
   setCellUiAndCellProp(evaluatedValue,formula,adress);
    //establish parentchild relation
    addChildToParent(formula);
    // console.log(sheetDB)
    updateChildrenCells(adress);
  
 }
})

function addChildToGraphComponent(formula,childAdress){
    let[crid,ccid] =  decodeAdress(childAdress)
    let encodedFormula=formula.split(" ")
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue=encodedFormula[i].charCodeAt(0)
        if(asciivalue>=65 && asciivalue<=90){
          
            let [prid,pcid]=decodeAdress(encodedFormula[i])
            //B1:A1+10
            graphComponentMatrix[prid][pcid].push([crid,ccid]);
          
        }
    }
   
   }

function removeChildFromGraphComponent(formula,childAdress){
    let[crid,ccid] =  decodeAdress(childAdress)
    let encodedFormula=formula.split(" ")
    for(let i=0;i<encodedFormula.length;i++){
        let asciivalue=encodedFormula[i].charCodeAt(0);
        if(asciivalue>=65 && asciivalue<=90){
          
            let [prid,pcid]=decodeAdress(encodedFormula[i])
            graphComponentMatrix[prid][pcid].pop();
        }
    }

}



function updateChildrenCells(parentAdress){
    let [parentCell, parentCellProp]=getCellAndCellProp(parentAdress);
    let children=parentCellProp.children;
    for(let i=0;i<children.length;i++)
     {
        let childAdress=children[i];
        let[childCell,childCellProp]=getCellAndCellProp(childAdress)
        let childFormula=childCellProp.formula;
     let evaluatedValue= evaluateFormula(childFormula)
     setCellUiAndCellProp(evaluatedValue,childFormula,childAdress);
     updateChildrenCells(childAdress);   
}

}

function addChildToParent(formula){
    let childadress=adressbar.value;
    let encodedFormula=formula.split(" ")//formula must be space separated
    for(let j=0;j<encodedFormula.length;j++){
        let asciivalue=encodedFormula[j].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [parentCell,parentcellProp]= getCellAndCellProp(encodedFormula[j]);
            parentcellProp.children.push(childadress)

        }

    }
}

function removeChildFromParent(formula){

   let childadress=adressbar.value;
    let encodedFormula=formula.split(" ")//formula must be space separated
    for(let j=0;j<encodedFormula.length;j++){
        let asciivalue=encodedFormula[j].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [parentCell,parentCellProp]= getCellAndCellProp(encodedFormula[j]);
            let index=parentCellProp.children.indexOf(childadress)
            parentCellProp.children.splice(index,1)

        }

    }
}

function evaluateFormula(formula){
    let encodedFormula=formula.split(" ")//formula must be space separated
    for(let j=0;j<encodedFormula.length;j++){
        let asciivalue=encodedFormula[j].charCodeAt(0);
        if(asciivalue >= 65 && asciivalue <= 90){
            let [cell,cellProp]= getCellAndCellProp(encodedFormula[j]);
            encodedFormula[j]=cellProp.value;
            // console.log(cellProp)
        }
    }
    let decodedFormula=encodedFormula.join(" ");  
    return eval(decodedFormula);
}

function setCellUiAndCellProp(evaluatedValue,formula,adress){
  
   let [cell,cellProp] =getCellAndCellProp(adress)
   cell.innerText=evaluatedValue;//ui
   cellProp.value=evaluatedValue;
   cellProp.formula=formula

}

// async function isGraphCylicTracePath(graphComponentMatrix, cycleResponse) {
//     let [srcr, srcc] = cycleResponse;
//     let visited = []; // Node visit trace
//     let dfsVisited = []; // Stack visit trace

//     for (let i = 0; i < rows; i++) {
//         let visitedRow = [];
//         let dfsVisitedRow = [];
//         for (let j = 0; j < cols; j++) {
//             visitedRow.push(false);
//             dfsVisitedRow.push(false);
//         }
//         visited.push(visitedRow);
//         dfsVisited.push(dfsVisitedRow);
//     }

//     let response = await dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited);
//     if (response === true) return Promise.resolve(true);

//     return Promise.resolve(false);
// }
// async function dfsCycleDetectionTracePath(graphComponentMatrix, srcr, srcc, visited, dfsVisited){
//     visited[srcr][srcc] = true;
//     dfsVisited[srcr][srcc] = true;


//     let cell=document.querySelector(`.create-cell[rid="${srcr}"][cid="${srcc}"]`);
//        cell.style.backgroundColor="lightblue";
//       await  colorPromise()//wait for 1 sec
    
//   for(let i=0;i<graphComponentMatrix[srcr][srcc].length;i++){
//       let [nbrid,nbcid]=graphComponentMatrix[srcr][srcc][i];
  
//       if(visited[nbrid][nbcid] === false){
//         let response= await dfsCycleDetectionTracePath(graphComponentMatrix, nbrid, nbcid, visited, dfsVisited);
//         if(response===true) {
//            cell.style.backgroundColor="transparent";
//            await  colorPromise();
//             return Promise.resolve(true);

//            }//found cycle no need to explore path
//       }
  
//       else if(visited[nbrid][nbcid]===true && dfsVisited[nbrid][nbcid]===true){
//        let cyclicCell=document.querySelector(`.create-cell[rid="${nbrid}"][cid="${nbcid}"]`);
     
//            cyclicCell.style.backgroundColor="lightsalmon";
//            await  colorPromise();
    
//            cyclicCell.style.backgroundColor="transparent";
//            await  colorPromise();

//            cell.style.backgroundColor="transparent";
//            await  colorPromise();

//            return Promise.resolve(true);
//       } 
//     }

//     dfsVisited[srcr][srcc] = false;
//     return Promise.resolve(false);
  
//   }

//   function colorPromise(){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve();
//         },1000)
//     })
// }
