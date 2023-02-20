//storage
let collectedSheetDb=[]//contains all sheetDb
let sheetDB=[];

{
        let addSheet=document.querySelector(".addSheet");
         addSheet.click();
}

// for(let i=0;i<rows;i++){
//    let sheetRow=[]; 
//     for(let j=0;j<cols;j++){
//      let cellProp= {
//              bold:false,
//              italic:false,
//              undrline:false,
//              alignment:"left",
//              fontFamily:"monospace",
//              fontSize:"14",
//              fontColor:"#000000",
//              bgColor:"#rrggbb",//default
//              value:"",
//              formula:"",
//              children:[]
//      }
//     sheetRow.push(cellProp)
//     }
//     sheetDB.push(sheetRow) 
// }


//selectors for cell-properties

let bold =document.querySelector(".bold")
let italic =document.querySelector(".italic")
let underline =document.querySelector(".underline")
let alignment=document.querySelectorAll(".alignment")
let leftalign=alignment[0]
let centeralign=alignment[1]
let rightalign=alignment[2]
let fontsize=document.querySelector(".font-size-prop")
let fontfamily=document.querySelector(".font-family-prop")
let fontcolor=document.querySelector(".font-color-prop")
let bgcolor=document.querySelector(".bg-color-prop")


let activeColorProp="#7f7e7e"
let inactiveColorProp="rgb(230, 228, 237)"


//attach listener for property
  // properties
  // two way binding=>chande in data(in storage=>use of matrix),change in UI
bold.addEventListener("click",(e)=>{
        let adress=adressbar.value;
     
        let [cell,cellProp]= getCellAndCellProp(adress);

        //modification
       cellProp.bold=!cellProp.bold//storage
       cell.style.fontWeight=cellProp.bold?"bold":"normal";//ui change(1)
       bold.style.backgroundColor=cellProp.bold?activeColorProp:inactiveColorProp;//uichane(2)
})
italic.addEventListener("click",(e)=>{
        let adress=adressbar.value;
     
        let [cell,cellProp]= getCellAndCellProp(adress);

        //modification
       cellProp.italic=!cellProp.italic//storage
       cell.style.fontStyle=cellProp.italic?"italic":"normal";//ui change(1)
       italic.style.backgroundColor=cellProp.italic?activeColorProp:inactiveColorProp;
    
})
underline.addEventListener("click",(e)=>{
        let adress=adressbar.value;
     
        let [cell,cellProp]= getCellAndCellProp(adress);

        //modification
       cellProp.underline=!cellProp.underline//storage
       cell.style.textDecoration=cellProp.underline?"underline":"normal";//ui change(1)
       underline.style.backgroundColor=cellProp.underline?activeColorProp:inactiveColorProp;
})
fontsize.addEventListener("change",(e)=>{

        let adress=adressbar.value;
        let [cell,cellProp]= getCellAndCellProp(adress);

        cellProp.fontSize=fontsize.value;//data change
        cell.style.fontSize=cellProp.fontSize+"px";//ui change
        fontsize.value=cellProp.fontSize;//ui chamge(2)

    
})
fontfamily.addEventListener("change",(e)=>{
    
        let adress=adressbar.value;
        let [cell,cellProp]= getCellAndCellProp(adress);

        cellProp.fontFamily=fontfamily.value;
        cell.style.fontFamily=cellProp.fontFamily
        fontfamily.value=cellProp.fontFamily;

})
fontcolor.addEventListener("change",(e)=>{
        let adress=adressbar.value;
        let [cell,cellProp]= getCellAndCellProp(adress);

        cellProp.fontColor=fontcolor.value;
        cell.style.color=cellProp.fontColor;
        fontcolor.value=cellProp.fontColor;
    
})
bgcolor.addEventListener("change",(e)=>{
        let adress=adressbar.value;
        let [cell,cellProp]= getCellAndCellProp(adress);

        cellProp.bgColor=bgcolor.value;
        cell.style.backgroundColor=cellProp.bgColor;
        bgcolor.value=cellProp.bgColor ;
    
})
alignment.forEach((alignelem)=>{
        alignelem.addEventListener("click",(e)=>{
                let adress=adressbar.value;
                let [cell,cellProp]= getCellAndCellProp(adress);
                 
                 let alignValue=e.target.classList[1];
                 cellProp.alignment=alignValue//data change
                 cell.style.textAlign=cellProp.alignment//ui(1)
                 switch(alignValue){//ui change(2)
                   case "left":
                        leftalign.style.backgroundColor=activeColorProp
                        centeralign.style.backgroundColor=inactiveColorProp
                        rightalign.style.backgroundColor=inactiveColorProp
                        break;
                  case "center":
                        centeralign.style.backgroundColor=activeColorProp
                        leftalign.style.backgroundColor=inactiveColorProp
                        rightalign.style.backgroundColor=inactiveColorProp
                          break;
                  case "right":
                        centeralign.style.backgroundColor=inactiveColorProp
                        leftalign.style.backgroundColor=inactiveColorProp
                        rightalign.style.backgroundColor=activeColorProp
                      break;

                 }

        
        })
})

 



function getCellAndCellProp(adress){
   let[rid,cid]=decodeAdress(adress)
   //acess cell and storage object

   let cell=document.querySelector(`.create-cell[rid="${rid}"][cid="${cid}"]`);
   let cellProp=sheetDB[rid][cid]
   return [cell,cellProp];
    
}

function decodeAdress(adress){
        //adress=>A1
        let rid=Number(adress.slice(1)-1);//"1=>0"
        let cid=Number(adress.charCodeAt(0))-65;//"A=>65"
        return[rid,cid];
}


let allCells=document.querySelectorAll(".create-cell")
for(let i=0;i<allCells.length;i++){
        addListenerToAttachProperties(allCells[i])
}


function addListenerToAttachProperties(cell){
      
        cell.addEventListener("click",(e)=>{
                let adress=adressbar.value;
                let [rid,cid]= decodeAdress(adress); 
                let cellProp=sheetDB[rid][cid]
                //cellprop apply ui chamge(1)
                cell.style.fontWeight=cellProp.bold?"bold":"normal";
                cell.style.fontStyle=cellProp.italic?"italic":"normal";
                cell.style.textDecoration=cellProp.underline?"underline":"normal";
                cell.style.fontSize=cellProp.fontSize+"px";
                cell.style.fontFamily=cellProp.fontFamily;
                cell.style.color=cellProp.fontColor;
                cell.style.backgroundColor=cellProp.bgColor==="#000000"?" #f5f7f9":cellProp.bgColor;
                cell.style.textAlign=cellProp.alignment
              
                  //apply properties to container ui change(2)
                  bold.style.backgroundColor=cellProp.bold?activeColorProp:inactiveColorProp;
                  italic.style.backgroundColor=cellProp.italic?activeColorProp:inactiveColorProp;
                  underline.style.backgroundColor=cellProp.underline?activeColorProp:inactiveColorProp;
                  fontsize.value=cellProp.fontSize;
                  fontfamily.value=cellProp.fontFamily;
                  fontcolor.value=cellProp.fontColor;
                  bgcolor.value=cellProp.bgColor;
                  switch(cellProp.alignment){
                        case "left":
                             leftalign.style.backgroundColor=activeColorProp
                             centeralign.style.backgroundColor=inactiveColorProp
                             rightalign.style.backgroundColor=inactiveColorProp
                             break;
                       case "center":
                             centeralign.style.backgroundColor=activeColorProp
                             leftalign.style.backgroundColor=inactiveColorProp
                             rightalign.style.backgroundColor=inactiveColorProp
                               break;
                       case "right":
                             centeralign.style.backgroundColor=inactiveColorProp
                             leftalign.style.backgroundColor=inactiveColorProp
                             rightalign.style.backgroundColor=activeColorProp
                           break;
     
                      }
                      let formulabar=document.querySelector(".formula-bar") ;
                      formulabar.value=cellProp.formula;
                      cell.innerText=cellProp.value  
                  

                 
        })
}
