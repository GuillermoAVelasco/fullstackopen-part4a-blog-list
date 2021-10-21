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
const mostBlogs  = (blogs) => {
  const xx=_.countBy(_.map(blogs,'author'), reducer)

  const values=Object.values(xx)
  const keys=Object.keys(xx)
  const maximo=(max,e)=> max=Math.max(max,e)
  const max=values.reduce(maximo,0)
  const index = values.findIndex(e => { 
    return e === max
  });

  return JSON.parse(`{"author":"${keys[index].substr(0,keys[0].length-1)}","blogs":${values[index]}}`)

/*
  return keys.map((e,i)=> {   
    const cadena=`{"author":"${e.substr(0,e.length-1)}","blogs":${values[i]}}`
    return JSON.parse(cadena)    
})
*/
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