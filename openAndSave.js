let download=document.querySelector(".download")
let upload=document.querySelector(".upload")

//download 

download.addEventListener("click",(e)=>{
  let jsonData= JSON.stringify([sheetDB,graphComponentMatrix]);
  let file=new Blob([jsonData],{type:"application/json"});

  let a=document.createElement("a")
  a.href=URL.createObjectURL(file)
  a.download="SheetData.json";
  a.click();



})

//upload
upload.addEventListener("click",(e)=>{
//open file explorer
  let input=document.createElement("input")
  input.setAttribute("type","file")
  input.click()


  input.addEventListener("change",(e)=>{
    let fr=new FileReader();
    let files=input.files;
    let fileObj=files[0]
    fr.readAsText(fileObj);
    fr.addEventListener("load",(e)=>{
   let readSheetdata=  JSON.parse(fr.result);

   //basic sheet will be created with default data

    addSheet.click();

    //sheetDB,graphComponent
    sheetDB=readSheetdata[0]
    graphComponentMatrix=readSheetdata[1];
    collectedSheetDb[collectedSheetDb.length-1]=sheetDB;
    collectedGraphComponentMatrix[collectedGraphComponentMatrix.length-1]=graphComponentMatrix;

    handleSheetProperties();
    









    })
  })
})


