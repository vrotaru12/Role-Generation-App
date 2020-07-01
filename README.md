# Role Generator Utility

## Description

Role Generator Utility is a tool that generates roles defined in xml files and exports them as zip, ready to be installed into Mastercontrol environment. This tool also checks if there are not similar IDS of the file names after converting them into 18 characters IDS.

## Installing Dependencies

### Node js

Install Node js on your computer:
    Source: https://nodejs.org/en/download/
Check the install by opening command line and running the following command:

```bash
node -v
```
This command will return version of your 'node js' installed if the install was successful and 'node command not found' if 'node js' install has failed on your computer.

## Usage
1. Go in `config/roles` directory and for each `@ROLE GROUP` from workbook create a `.js` file that will contain the list of roles with the acronym at the end.

EX: 
`@ROLE GROUP`.js 
inside of the file:
```
let roles = [LIST OF ROLES NEED TO GO HERE]
module.exports = roles
```

2. Modify ‘xml’ folder with corresponding rights for each role group. Name of the file should be the same as the name of `@ROLE GROUP` in `config/roles/ROLE_GROUP.js file`. As the rights for all these roles are the same as the CORP roles from FBS solutions we can just copy FBS_Solution_CORP.xml file and rename it as needed. CORP in the description should be present in order to be modified with corresponding acronym in new `.xml` file that will be generated in `target` folder.


EX: 
`@ROLE GROUP`.xml 

(`NO CHANGES ARE REQUIRED HERE, except file name`)

3. Before running/re-running the tool check there is no `target` directory or `FBS_ROLES.zip` already created in this utility.
To execute the script, open command line/ bash and run the following command by navigating to the `/Role Gen` directory to generate the roles:

 ```bash
 node index.js
 ```
 Make sure you are runnning the command where `index.js` and `verify.js` are located.
 By running this command, `target` directory and `FBS_ROLES.zip` will be generated in the same directory where the command was executed.

4. In the same `/Role Gen` directory run the following command to check if there are no similar IDS:

 ```bash
 node verify.js
 ```
By running this command, the files with the similar IDS will be listed in the console or a message `There are no similar IDS` will be returned if there are no similar IDS. Once there are no similar IDs in roles generated then the zip can be installed into MasterControl environment, otherwise name of the files reported as having similar IDs need to change.

