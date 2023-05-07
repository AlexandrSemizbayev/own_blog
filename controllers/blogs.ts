import { Pool } from "pg";
import { config } from "../db/config";
import { Blog } from "../models/blog";

const setupQuery = `
  CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    content TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL
  );
`;

export class BlogController {
  pool: Pool;
  constructor() {
    this.pool = new Pool(config);
    this.makeRequest(setupQuery);
  };

  private async makeRequest(query: string = setupQuery) {
    const res = await this.pool.query(query);
    return res;
  }

  async init() {
    this.pool = new Pool();
    await this.pool.connect();
    this.makeRequest(setupQuery);
  }

  async getBlogs(limit: number = 20) {
    const query = `
      SELECT *
      FROM blogs
      ORDER BY timestamp DESC
      LIMIT ${limit};
    `;
    const result = await this.makeRequest(query);
    return result.rows || {};
  }

  createBlog({title,content, image_url}: Blog) {
    const query = `
    INSERT INTO blogs (title, content, image_url)
    VALUES ('${title}', '${content}', '${image_url}');
    `;
    console.log(query);
    this.makeRequest(query);
  }

  updateBlog(blog: Blog) {
    const {id} = blog;
    let changedFields = '';
    const changableFields = {
      title: blog.title,
      content: blog.content,
      image_url: blog.image_url,
    };
    Object.keys(changableFields).forEach((key, index, arr) => {
      changedFields += `${key} = ${blog[key]}${index < arr.length - 1 ? ',' : ''}`;
    })
    const query = `
      UPDATE blogs
      SET ${changedFields}
      WHERE id = ${id};
    `;
    console.log(query);
  }
}
