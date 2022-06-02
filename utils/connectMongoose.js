import mongoose from 'mongoose'

// mongodb connection
const dbConnect = () =>{
mongoose.connect(`${process.env.MONGO_URI}`, 
	{
        useNewUrlParser: true,
        useUnifiedTopology: true,
	}
).then(() => {
	console.log('Mongodb connected!')
}).catch(err => console.log(err));
}
export default dbConnect

