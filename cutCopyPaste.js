//range 

let ctrlKey;
document.addEventListener("keydown",(e)=>{
    ctrlKey=e.ctrlKey;//true

})
document.addEventListener("keyup",(e)=>{
    ctrlKey=e.ctrlKey;//false
    
})

let copy=document.querySelector(".copy")
let cut=document.querySelector(".cut")
let paste=document.querySelector(".paste")

for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell=document.querySelector(`.create-cell[rid="${i}"][cid="${j}"]`)
        handleSelectedCell(cell)

    }
}

let rangeStorage=[];

function handleSelectedCell(cell){
   cell.addEventListener("click",(e)=>{
     //select cells range work
     if(!ctrlKey) return;

     if(rangeStorage.length >= 2){
        defaultSelectedCellsUi(); 
        rangeStorage=[]; 
     } 

     //ui
     cell.style.border="3px solid  #218c74"

     //db
     
     let rid=Number(cell.getAttribute("rid"))

     let cid=Number(cell.getAttribute("cid"))

     rangeStorage.push([rid,cid])
    //  console.log(rangeStorage)

   })
}
function defaultSelectedCellsUi(){
    for(let i=0;i<rangeStorage.length;i++){
        let cell=document.querySelector(`.create-cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`)
        //remove ui
        cell.style.border=" 1px solid #e7e8ea";      
    }
}

//copy
//maintain storage
let copydata=[];
copy.addEventListener("click",(e)=>{
    if(rangeStorage.length < 2) return;

    copydata=[];


let [strRow,strCol,endRow,endCol]=[rangeStorage[0][0],rangeStorage[0][1],rangeStorage[1][0],rangeStorage[1][1]];

  for(let i=strRow;i<=endRow;i++){
    let copyRow=[];
      for(let j=strCol;j<=endCol;j++){
         let cellProp=sheetDB[i][j];
         copyRow.push(cellProp);
          
      }
      copydata.push(copyRow)//[[{}]]
  } 
  console.log(copydata) 
  defaultSelectedCellsUi() 
})

paste.addEventListener("click",(e)=>{

    //paste cell work
     if(rangeStorage.length < 2) return;

    let adress=adressbar.value;
    let [strRow,strCol]=decodeAdress(adress)//target
 
    let colDiff= Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);
    let rowDiff= Math.abs(rangeStorage[0][0] - rangeStorage[1][0] );
    let endRow= strRow + rowDiff
    let endCol=strCol + colDiff

    for(let i=strRow ,r=0;i<=endRow;i++,r++){//r refres copydata row, c refers copydata column
        for(let j=strCol,c=0;j<=endCol;j++,c++){
            let cell=document.querySelector(`.create-cell[rid="${i}"][cid="${j}"]`)

            if(!cell) continue;

            //DB
            let data= copydata[r][c]//obj
            let cellProp=sheetDB[i][j]
              
            cellProp.value=data.value
            cellProp.bold=data.bold
            cellProp.italic=data.italic
            cellProp.underline=data.underline
            cellProp.alignment=data.alignment
            cellProp.fontFamily=data.fontFamily
            cellProp.fontSize=data.fontSize
            cellProp.fontColor=data.fontColor
            cellProp.bgColor=data.bgColor
            

             //ui

             cell.click()
        

        }
    }  
    
})
cut.addEventListener("click",(e)=>{

    if(rangeStorage.length < 2) return;
    
  
    let [strRow,strCol,endRow,endCol]=[rangeStorage[0][0],rangeStorage[0][1],rangeStorage[1][0],rangeStorage[1][1]];

  for(let i=strRow;i<=endRow;i++){
  
      for(let j=strCol;j<=endCol;j++){
         let cellProp=sheetDB[i][j];

//DB
      
         cellProp.value=""
         cellProp.bold=false
         cellProp.italic=false
         cellProp.underline=false
         cellProp.alignment="left"
         cellProp.fontFamily="monospace"
         cellProp.fontSize="14"
         cellProp.fontColor="#000000"
         cellProp.bgColor="#000000"


         //ui
     
         let cell=document.querySelector(`.create-cell[rid="${i}"][cid="${j}"]`)
      
         cell.click();
          
      }
    
  }
  defaultSelectedCellsUi() 

})


