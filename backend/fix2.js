const mongoose = require('mongoose'); 
mongoose.connect('mongodb://devashishasthana7_db_user:gvWEXlTky3gYtwwX@ac-em8xvbu-shard-00-00.gxdth4e.mongodb.net:27017/collegesphere?ssl=true&authSource=admin').then(async () => { 
  const College = require('./models/College'); 
  await College.updateOne({ name: 'karankhushcollege' }, { $set: { totalFees: '9' } }); 
  console.log('Fixed typo in DB'); 
  process.exit(0); 
});
