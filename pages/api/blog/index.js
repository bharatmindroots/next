import connectMongo from '../../../utils/connectMongoose';
import Blog from '../../../Model/blogmodel';

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
          
          const Blogs = await Blog.find(
            {
                "$or":[
                    {title:{$regex:key,$options: "i"}}
                ]
            }
        ).limit(setlimit).skip(offsetval).sort(setSort);
          res.status(200).json({ success: true, data: Blogs })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      case 'POST':
        try {
          console.log(req.body);
          const Blogs = await Blog.create(req.body)
          res.status(201).json({ success: true, data: Blogs })
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