let activeSheetColor="#95afc0";
let addSheet=document.querySelector(".addSheet");
let sheetsFolderCont=document.querySelector(".sheets-folder-cont");
addSheet.addEventListener("click",(e)=>{
     let sheet=document.createElement("div");
   sheet.setAttribute("class","sheet-folder");

     let allSheetFolders=document.querySelectorAll(".sheet-folder")
   sheet.setAttribute("id",allSheetFolders.length);

   sheet.innerHTML=`
         <div class="sheetContent">Sheet${allSheetFolders.length + 1}  </div> `
   sheetsFolderCont.appendChild(sheet)
   sheet.scrollIntoView();

//DB
     createSheetsDb();
     createGraphComponentMatrix();
     handleSheetActiveness(sheet);
     handleSheetRemoval(sheet)
   sheet.click()

})

function handleSheetActiveness(sheet){
sheet.addEventListener("click",(e)=>{
 let sheetIndex=Number(sheet.getAttribute("id")) ;
 handleSheetDb(sheetIndex);
 handleSheetProperties();
 handleSheetUi(sheet)



 })
}
function handleSheetDb(sheetIndex){
 sheetDB=collectedSheetDb[sheetIndex];
   graphComponentMatrix=collectedGraphComponentMatrix[sheetIndex]
}

function handleSheetProperties(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let cell=document.querySelector(`.create-cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }  }
let firstCell=document.querySelector(".create-cell")
firstCell.click();
}

function handleSheetUi(sheet){
    let allSheetFolders=document.querySelectorAll(".sheet-folder")
    for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].style.backgroundColor="transparent";

    }

  sheet.style.backgroundColor=activeSheetColor;
}

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        //0=>left click, 1=>scroll, 2=>right click
         if(e.button!==2){
            return;
         }
         let allSheetFolders=document.querySelectorAll(".sheet-folder")
         if(allSheetFolders.length===1){
          alert("You need to have atleast at one Sheet!!")
          return;
         }
         let response=confirm("Your sheet will be removed permanently. Are you Sure??")
         if(response!==true){
             return;
         }
         let sheetIndex=Number(sheet.getAttribute("id"));
         //DB removal
         collectedSheetDb.splice(sheetIndex,1);
         collectedGraphComponentMatrix.splice(sheetIndex,1)
         //Ui remove
         handleSheetUiRemoval(sheet)
         //by default DB to sheet1 (active)

      sheetDB=collectedSheetDb[0];
      graphComponentMatrix=collectedGraphComponentMatrix[0];
      handleSheetProperties()



    })
}

function handleSheetUiRemoval(sheet){
    sheet.remove();
    let allSheetFolders=document.querySelectorAll(".sheet-folder")
     for(let i=0;i<allSheetFolders.length;i++){
        allSheetFolders[i].setAttribute("id",i);
        let sheetContent=allSheetFolders[i].querySelector(".sheetContent");
        sheetContent.innerText=`Sheet${i+1}`
        allSheetFolders[i].style.backgroundColor="transparent";
     }
     allSheetFolders[0].style.backgroundColor=activeSheetColor;
}


function createSheetsDb(){
    let sheetDB=[];

for(let i=0;i<rows;i++){
   let sheetRow=[]; 
    for(let j=0;j<cols;j++){
     let cellProp= {
             bold:false,
             italic:false,
             undrline:false,
             alignment:"left",
             fontFamily:"monospace",
             fontSize:"14",
             fontColor:"#000000",
             bgColor:"#000000",//default
             value:"",
             formula:"",
             children:[]
     }
  sheetRow.push(cellProp)
    }
  sheetDB.push(sheetRow) 
}
collectedSheetDb.push(sheetDB)
}


function createGraphComponentMatrix(){
    let graphComponentMatrix=[];

  for(let i=0;i<rows;i++){
    let row=[];
    for(let j=0;j<cols;j++){
        //why array =>more than one child relation
       row.push([]);

    }
    graphComponentMatrix.push(row);
}
collectedGraphComponentMatrix.push(graphComponentMatrix)
}


