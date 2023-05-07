import { Router } from "express";
import SetHome from './home';
import SetBlogs from './blogs';

const router = Router();

SetHome(router);
SetBlogs(router);
export default router;