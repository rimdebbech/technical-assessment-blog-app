import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss']
})
export class BlogsListComponent implements OnInit {

  constructor(private blogsService: BlogsService) { }


  blogs:any;
  ngOnInit(): void {
    this.blogsService.getAllBlogs().subscribe((data: any)=>{
      console.log(data);
      this.blogs = data;
      this.dataSource = new MatTableDataSource(this.blogs);
    }) 
  }
  dataSource:any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    console.log("hello");
    
  }

  upvote(blog:any){
    blog.upvote = blog.upvote + 1;
    this.blogsService.updateBlogById(blog.id,blog).subscribe((data: any)=>{
      console.log(data);
    }) 
  }

  downvote(blog:any){
    blog.downvote = blog.downvote + 1;
    this.blogsService.updateBlogById(blog.id,blog).subscribe((data: any)=>{
      console.log(data);
    }) 
  }
}
