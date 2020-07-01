const path = require('path')
const fs = require('fs-extra')
const testFolder = './target';



function convertID(role){
    var piece = role.replace(/_/g,"").replace(/\s/g,"");
    if(piece.length < 18 ){
        var b = 18 - piece.length;
        for (var i in b){
            piece = "0"+ piece;
        }
    }
    else{
        piece =  piece.slice(piece.length -18, piece.length);
    }
    return piece;
}

function find_duplicate_in_array(arr) {
    const lookup = arr.reduce((a, e) => {
        a[e.fileID] = ++a[e.fileID] || 0;
        return a;
      }, {});

       return arr.filter(e => lookup[e.fileID])

}

async function roleIDCheck() {
    let arr =[]
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            arr.push({"fileName":file, "fileID": convertID(file.split('.').slice(0, -1).join('.'))})
        });

        var result = find_duplicate_in_array(arr)
        if (result.length == 0 ){
            console.log("There are no similar IDs");
        }else{
            console.log("You have the following files containing the same ID:");
            for( let i=0; i<result.length; i++){
                console.log(result[i].fileName);
            }
        }
      });
  
}

roleIDCheck()