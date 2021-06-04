import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private REST_API_SERVER = "http://127.0.0.1:8000/";

  constructor(private httpClient: HttpClient) { }

  public getAllBlogs(){
    return this.httpClient.get(this.REST_API_SERVER+"blogs");
  }

  public getBlogById(id: any){
    return this.httpClient.get(this.REST_API_SERVER+"get_blog_by_id/"+id);
  }

  public addBlog(blog: any){
    return this.httpClient.post(this.REST_API_SERVER+"add_blog", blog);
  }

  public updateBlogById(id:any, blog: any){
    return this.httpClient.put(this.REST_API_SERVER+"update_blog_by_id/"+id, blog);
  }

  public updateBlogByTitle(title:any, blog: any){
    return this.httpClient.put(this.REST_API_SERVER+"update_blog_by_title/"+title, blog);
  }

  public deleteBlog(id:any, blog: any){
    return this.httpClient.delete(this.REST_API_SERVER+"delete_blog_by_id/"+id, blog);
  }
}
