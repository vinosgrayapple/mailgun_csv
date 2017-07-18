const myDate = new Date;
const zipFolder = require('folder-zip-sync')
const zipFileName = (`ShopAW_${myDate.getDate()}_${myDate.getMonth()+1}_${myDate.getFullYear()}_${myDate.toTimeString().split(" ")[0].replace(/:/g, "_")}.zip`);
// console.log(zipFileName);

 

function run() {
zipFolder('./csv', zipFileName, ['privateFile.txt']);
 }
if (module.parent) {
    exports.run = run;
    exports.zipFileName = zipFileName;
    exports.myDate = myDate;

} else {
    run();
}
