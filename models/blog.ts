export class Blog {
  id: number | null;
  title: string;
  image_url: string;
  content: string;
  timestamp: string | null;
  [key:string]: any;
  constructor(blog: Blog) {
    this.id = blog.id || null;
    this.title = blog.title || '';
    this.image_url = blog.image_url || '';
    this.content = blog.content || '';
    this.timestamp = blog.timestamp || null;
  }
}