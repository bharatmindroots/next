import connectMongo from '../../../utils/connectMongoose';
import Blog from '../../../Model/blogmodel';
export default async function handler (req, res) {
    const {
        query:{id}, 
        method 
    } = req
  
    await connectMongo()
  
    switch (method) {
      case 'GET':
        try {
          const Blogs = await Blog.findById(id)
          if(!Blogs){
              return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: Blogs })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break

        case 'DELETE':
        try {
          const Blogs = await Blog.deleteOne({_id: id})
          if(!Blogs){
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: Blogs })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
        case 'PUT':
        try {
          const Blogs = await Blog.findByIdAndUpdate(id, req.body,{new: true, runValidators: true })
          if(!Blogs){
            return res.status(400).json({ success: false })
          }
          res.status(200).json({ success: true, data: Blogs })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
        default:
        res.status(400).json({ success: false })
        break
    }
  }