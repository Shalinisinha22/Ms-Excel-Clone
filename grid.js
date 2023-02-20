let rows=100;
let cols=26;


let adressColCont=document.querySelector(".adress-col-cont")

for(let i=0;i<rows;i++){
    let adressCol=document.createElement("div")
    adressCol.setAttribute("class","adress-col")
    adressCol.innerText=i+1;
    adressColCont.appendChild(adressCol)
}

let adressRowCont=document.querySelector(".adress-row-cont")
for(let i=0;i<cols;i++){
    let adressRow=document.createElement("div")
    adressRow.setAttribute("class","adress-row")
    adressRow.innerText=String.fromCharCode(65 + i);
    adressRowCont.appendChild(adressRow)
    
}

let cellCont=document.querySelector(".cells-container")


let adressbar=document.querySelector(".adress-bar")

for(let i=0;i<rows;i++){
 let createRow=document.createElement("div")
 createRow.setAttribute("class","create-row")

 for(let j=0;j<cols;j++){
    let createCell=document.createElement("div")
    createCell.setAttribute("class","create-cell")
    createCell.setAttribute("contenteditable","true")
    createCell.setAttribute("spellcheck","false");
    //attributes for for cell and storage identification
    createCell.setAttribute("rid",i)
    createCell.setAttribute("cid",j)
    createRow.appendChild(createCell)
    cellAdressListener(createCell,i,j)
   
 }
 cellCont.appendChild(createRow)

}
function cellAdressListener(cell,i,j){
  cell.addEventListener("click",(e)=>{

    let rowAdress=i+1;
    let colAdress=String.fromCharCode(65+j)
    let adress=`${colAdress}${rowAdress}`
    adressbar.setAttribute("value",adress)
  })


   
}
//by default click on first cell via DOM
// let firstCell=document.querySelector(".create-cell")
// firstCell.click();

// let home=document.querySelector(".home")
// home.style.backgroundColor="#b2b4b6"