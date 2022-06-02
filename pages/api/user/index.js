import connectMongo from '../../../utils/connectMongoose';
import User from '../../../Model/usermodel';
import bcrypt from 'bcrypt'
var jwt = require('jsonwebtoken');

export default async function handler (req, res) {
  
    const { method,
        query:
        {page, limit, s, sort}
     } = req
  
    await connectMongo()
  
    switch (method) {
      case 'GET':
        const setSort = {} 
        let setlimit = 10;
        if(limit)
          setlimit = limit;
        let setPage = 1;
        if(page)
        setPage = page;
        const offsetval = (parseInt(page)-1)*parseInt(setlimit);
        if(sort){
            const str = sort.split(':')
          setSort[str[0]] = str[1] === 'desc' ? -1:1
        }
        let key = '';
        if(s){
            key = s
        }
        try {
          
          const Users = await User.find(
            {
                "$or":[
                    {email:{$regex:key,$options: "i"}}
                ]
            }
        ).limit(setlimit).skip(offsetval).sort(setSort);
          res.status(200).json({ success: true, data: Users })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      case 'POST':
        const { email, password, first_name, last_name } = req.body 
        const hashedpassword = await bcrypt.hash(password, 16)

        try {
          const user = new User({
            email,
            password:hashedpassword,
            first_name,
            last_name,
        })

          const Users = await user.save()
          var token = jwt.sign({data:Users}, 'shhhhh');
          res.status(201).json({ success: true, token: token, data: Users})
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