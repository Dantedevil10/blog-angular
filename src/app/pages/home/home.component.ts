import { Component } from '@angular/core';
import { PostCard } from '../../models/posts.model';
import { PostserviceService } from '../../services/postservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
[x: string]: any;

  posts$ = new Observable<PostCard[]>();

  constructor(private service : PostserviceService ){
    this.obterPosts();
  };

  obterPosts(){
    this.posts$ = this.service.getPosts();
  }

}
