import { Router } from "express";
import { BlogController } from '../controllers/blogs';
import { Blog } from "../models/blog";
export default function(router: Router) {

  const blogController = new BlogController();

  router.get('/blogs', (_, res) => {
    res.render('blogs');
  });

  router.get('/api/blogs', async(req, res) => {
    let limit;
    if(req.query.limit) {
      limit = +req.query.limit;
    }
    const blogs = await blogController.getBlogs(limit);
    res.send(blogs);
  });

  router.post('/api/blogs', async (req, res) => {
    const blogInstance = new Blog(req.body);
    const blog = await blogController.createBlog(blogInstance);
    res.status(200).send('Success, dude');
  });

  router.put('/api/blogs', async (req, res) => {
    const blogInstance = new Blog(req.body);
    const blog = await blogController.updateBlog(blogInstance);
    res.status(200).send('Success, dude');
  });
}