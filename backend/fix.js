const mongoose = require('mongoose'); 
mongoose.connect('mongodb://devashishasthana7_db_user:gvWEXlTky3gYtwwX@ac-em8xvbu-shard-00-00.gxdth4e.mongodb.net:27017/collegesphere?ssl=true&authSource=admin').then(async () => { 
  const User = require('./models/User'); 
  const College = require('./models/College'); 
  const correctCollege = await College.findOne({ name: 'karankhushcollege' }); 
  if (correctCollege) { 
    await User.updateOne({ email: 'institute@karankhushcollege.com' }, { $set: { collegeId: correctCollege._id, fullName: 'karankhushcollege Rep' } }); 
    console.log('Fixed user link to', correctCollege.name); 
  } else { 
    console.log('College not found'); 
  } 
  process.exit(0); 
});
