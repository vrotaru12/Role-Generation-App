# Role Generator Utility

## Description

Role Generator Utility is a tool that generates roles defined in xml files and exports them as zip, ready to be installed into specfic environments. This tool also checks if there are not similar IDS of the file names after converting them into 18 characters IDS. The purpose of this app is to generate dinamically multiple roles with different names but with common fragment of the name for all of them. 

## Installing Dependencies

### Node js

Install Node js on your computer:
   ` Source: https://nodejs.org/en/download/`
Check the install by opening command line and running the following command:

```bash
node -v
```
This command will return version of your 'node js' installed if the install was successful and 'node command not found' if 'node js' install has failed on your computer.
Once `node` is installed on your computer run the following command :
```
npm install
```
### Archiver 
Archiver is a streaming interface for archive generation and it needs to be installed :
```
npm install archiver --save

```
### xml2js
Simple XML to JavaScript object converter. It supports bi-directional conversion. 
```
npm install xml2js
```

## Usage
1. In `config/roles` directory there are `.js` files that will contain the list of roles with common fragment of the name.

```
let roles = [LIST OF ROLES NEED TO GO HERE]
module.exports = roles
```

2. In ‘xml’ folder there are rights defined for each role group. The name of the file coresponding to each role group should be the same as the name of the file in previous step. There is `CORP` in the description of xml file and this one should be present in order to be modified with corresponding acronym in the new `.xml` file that will be generated in `target` folder.
As ex:
```
<role description="CORP MOC Reasearch and Development">
     <enterprise id="corporate" />

     <!-- Portal Rights-->
     <right id="0000000000INFOCARD" />
     <right id="0000000000MYRECENT" />
     <right id="000000PORTALSEARCH" />

     <!-- Process Rights-->
     <right id="000000FORMAPPROVAL" />
     <right id="0000000000000FORMS" />
     <right id="00000STARTFORMTASK" />
     <right id="00000FORMSTRACKING" />

     <!-- Vault Rights-->
     <vault id="MOC Forms Open">
          <right id="000000FINDINFOCARD" />
          <right id="00000000VIEWNATIVE" />
          <right id="00000000000VIEWPDF" />
     </vault>

     <vault id="MOC Forms Closed">
          <right id="000000FINDINFOCARD" />
          <right id="00000000VIEWNATIVE" />
          <right id="00000000000VIEWPDF" />
     </vault>

     <vault id="MOC Forms Archive">
          <right id="000000FINDINFOCARD" />
          <right id="00000000VIEWNATIVE" />
          <right id="00000000000VIEWPDF" />
     </vault>

</role>

```

3. Before running/re-running the tool check there is no `target` directory or `FBS_ROLES.zip` already created in this utility.
To execute the script, open command line/ bash and run the following command by navigating to the `/Role Gen` directory to generate the roles:

 ```bash
 node index.js
 ```
 Make sure you are runnning the command from the folder where `index.js` and `verify.js` are located.
 By running this command, `target` directory and `FBS_ROLES.zip` will be generated in the same directory where the command was executed.

4. In the same `/Role Gen` directory run the following command to check if there are no similar IDS:

 ```bash
 node verify.js
 ```
By running this command, the files with the similar IDS will be listed in the console or a message `There are no similar IDS` will be returned if there are no similar IDS. Once there are no similar IDs in roles generated then the zip can be installed into MasterControl environment, otherwise name of the files reported as having similar IDs need to change.

