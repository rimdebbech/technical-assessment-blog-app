import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../services/blogs.service';
@Component({
  selector: 'app-blogs-form',
  templateUrl: './blogs-form.component.html',
  styleUrls: ['./blogs-form.component.scss']
})
export class BlogsFormComponent implements OnInit {

  constructor(private blogsService: BlogsService, private route: Router) { }

  ngOnInit(): void {
  }

  name = new FormControl('');

  blogsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  onSubmit() {
    var blog = {"title": this.blogsForm.value["title"], 
                "author": this.blogsForm.value["author"],
                "content": this.blogsForm.value["content"],
                "upvote": 0, 
                "downvote": 0 }
    this.blogsService.addBlog(blog).subscribe((data: any)=>{
      console.log(data);
    }) 

    this.route.navigate(['blogsList']);
  }
}
