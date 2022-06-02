import connectMongo from '../../../utils/connectMongoose';
import User from '../../../Model/usermodel';
export default async function handler (req, res) {
    const {
        query:{id}, 
        method 
    } = req
  
    await connectMongo()
  
    switch (method) {
      case 'GET':
        try {
          const Users = await User.findById(id)
          if(!Users){
              return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: Users })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break

        case 'DELETE':
        try {
          const Users = await User.deleteOne({_id: id})
          if(!Users){
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: Users })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
        case 'PUT':
        try {
          const Users = await User.findByIdAndUpdate(id, req.body,{new: true, runValidators: true })
          if(!Users){
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: Users })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
        default:
        res.status(400).json({ success: false })
        break
    }
  }