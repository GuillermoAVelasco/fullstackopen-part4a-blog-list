var _ = require('lodash');
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response,next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
        })
      .catch(e=>next(e))
})
  
blogsRouter.post('/', (request, response,next) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
        })      
      .catch(e=>next(e))
})

const reducer= (sum)=>{ return sum+1}
const mostBlogs = (blogs) => {
  const xx=_.countBy(_.map(blogs,'author'), reducer)

  const values=Object.values(xx)
  const keys=Object.keys(xx)
  
  return keys.map((e,i)=> {
    const cadena=`{"${e.substr(0,e.length-1)}":"${values[i]}"}`
    return JSON.parse(cadena)    
})
}

blogsRouter.get('/mostBlogs', (request, response,next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(mostBlogs(blogs))
      })
    .catch(e=>next(e))
})


module.exports = blogsRouter