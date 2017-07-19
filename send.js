const api_key = 'key-f544ca91176297118e3f99590758c858';
const domain = 'sandbox1ae123b39ea84cbeb43013560d508d81.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
const exec = require('child_process').exec;
const fs = require('fs');
const Zip = require('./zip'); 

fs.watch('csv', (event, filename) => {
// console.log(event);
if (fs.readdirSync('csv').length) {
  setTimeout(()=>{},6000);
if (!fs.existsSync(Zip.zipFileName)) {
  // start mailgun    
  Zip.run();  
   const data = {
  from: 'Комаричев Сергей <komarichev.aw@gmail.com>',
  to: 'komarichev@gmail.com',
  subject: 'ShopArtWinery ' + Zip.myDate.toDateString() + " " + Zip.myDate.toTimeString().split(" ")[0],
  text: 'ShopArtWinery ' + Zip.myDate.toDateString(),
  attachment: Zip.zipFileName 
};

mailgun.messages().send(data, (error, body) => {
  console.log('=============================================');
  if (error) {
    throw error;
  }
  console.log("Архив поставлен в очередь! %s %s\n Скоро отправим!",(new Date).toDateString(), (new Date).toTimeString().split(" ")[0]);
  console.log('=============================================');
    const filesCSV = fs.readdirSync('csv');
    const listForDelete=[];
    
    filesCSV.map(file => {
      listForDelete.push('./csv/' + file);
    });
  listForDelete.push(Zip.zipFileName);
  listForDelete.map(item => {
      fs.stat(item, function (err, stats) {
    if (err) { return console.error(err)}
      console.log('Размер файла "%s"  -  %s Кб.', item, Math.round(stats.size / 1024));
      fs.unlink(item,function(err){
        if(err) return console.log(err);
        //console.log('File   deleted successfully');
    }); 
    });
      

   });





});

 }//end mailgun
 // Zip.zipFileName="";
filesCSV=[];
listForDelete=[];
}


});






 


