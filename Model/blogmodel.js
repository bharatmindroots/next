import mongoose from 'mongoose'

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String
})

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)