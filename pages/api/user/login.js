import connectMongo from '../../../utils/connectMongoose';
import User from '../../../Model/usermodel';
var jwt = require('jsonwebtoken');
export default async function handler (req, res) {
  
    const { method } = req
  
    await connectMongo()
  
    switch (method) {
      case 'POST':
        console.log(req.body);
        try {
          const user = await User.findOne({email : req.body.email})
          if(!user){
              return res.status(400).json({ success: false })
          }
          var token = jwt.sign({data:user}, 'shhhhh');
          res.status(201).json({ success: true, token : token})
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
    }
  }

  //mongodb+srv://next:nextnextnext@cluster0.uezig.mongodb.net/?retryWrites=true&w=majority