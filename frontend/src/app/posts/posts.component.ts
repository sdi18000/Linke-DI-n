import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Post } from '../Post/post';
import { PostService } from '../post.service';
import { formatDate } from '@angular/common';
import { UserDataService } from '../user-data.service';
import { DeclareInterestService } from '../declare-interest.service';
import { proffessional } from '../Proffessional/proffessional';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  formdata: any;
  comment_form: any;
  post: any;
  posts: Post[] = new Array();
  proffessional: proffessional

  constructor(private postService: PostService, private userData: UserDataService,
    private di: DeclareInterestService, private cs: CommentService) {

    this.proffessional = this.userData.proffessional;
  }

  ngOnInit(): void {
    this.formdata = new FormGroup({ 
      title: new FormControl(""),
      body: new FormControl(""),
    });

    this.comment_form = new FormGroup({ 
      body: new FormControl(""),
    });

    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    })
  }

  onClickSubmit(data: any) {
    this.post = new Post(this.proffessional.id_proffessional, data.title, data.body, formatDate(new Date(), "YYYY-MM-dd hh:mm:ss", "en-US"));
    console.log("Created post: " + this.post);
    this.postService.createPost(this.post).subscribe(data => {
      console.log(data);
    })
  }
  
  onClickPostComment(data: any, post: Post){
    console.log(data);
    console.log(post);
    this.cs.postComment(this.proffessional.id_proffessional, post.id_post, data.body);
  }
  
  declareInterest(post: Post){
    console.log(post);
    this.di.declareInterest(this.proffessional.id_proffessional, post.id_post);
  }
}
