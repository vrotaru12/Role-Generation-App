const path = require('path')
const fs = require('fs-extra')
const { roles: roleDefinitions } = require('./config');
var archiver = require('archiver');

var parseString = require("xml2js").parseString,
xml2js = require("xml2js");

var output = fs.createWriteStream(__dirname + '/FBS_ROLES.zip');
var archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

async function roleGen() {

    let targetDir = path.join(__dirname, 'target')
    let roles = Object.keys(roleDefinitions)

    for (let role of roles) {
        let xmlPath = path.join(__dirname, 'xml', `${role.toLowerCase()}.xml`)
        let roleArr = roleDefinitions[role]
        
        for (let roleName of roleArr) {
            let targetPath = path.join(targetDir, `${roleName.replace(/\s/g, '')}.xml`)
            await fs.copy(xmlPath, targetPath);



            fs.readFile(`./target/${roleName}.xml`, "utf-8", function(err, data) {
                if (err) console.log(err);
               
                parseString(data, function(err, result) {
                    if (err) console.log(err);
                    
                    let acronym = roleName.split("_").pop();
                    let newDescription = result["role"]["$"].description.replace("CORP", acronym);
                    
                   
                    result["role"]["$"].description = newDescription;
                        
                    
                    var builder = new xml2js.Builder(); 
                    var xml = builder.buildObject(result);
                
                    fs.writeFile(`./target/${roleName}.xml`, xml, function(err, data) {
                        if (err) console.log(err);
                    });
                });
            });
            
        }
    }


archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      console.log('something went wrong');
    } else {
      throw err;
    }
});
   
archive.on('error', function(err) {
    throw err;
});
   
  archive.pipe(output);
  var file1 = __dirname + '/config/CONFIG.txt';
  archive.append(fs.createReadStream(file1), { name: 'CONFIG.txt' });
  archive.directory('target/', 'roles');
  archive.finalize();
}

roleGen()