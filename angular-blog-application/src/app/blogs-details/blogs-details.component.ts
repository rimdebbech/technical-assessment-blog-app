import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs-details',
  templateUrl: './blogs-details.component.html',
  styleUrls: ['./blogs-details.component.scss']
})
export class BlogsDetailsComponent implements OnInit {

  constructor(private blogsService: BlogsService, private route: ActivatedRoute) { }

  blog:any;
  id: any;

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id');

    this.blogsService.getBlogById(this.id).subscribe((data: any)=>{

      this.blog = data[0];
      console.log(this.blog);
    }) 
  }

  upvote(blog:any){
    blog.upvote = blog.upvote + 1;
    this.blogsService.updateBlogById(this.id,blog).subscribe((data: any)=>{
      console.log(data);
    }) 
  }

  downvote(blog:any){
    blog.downvote = blog.downvote + 1;
    this.blogsService.updateBlogById(this.id,blog).subscribe((data: any)=>{
      console.log(data);
    }) 
  }

}
