import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostCard } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  private urlPosts = "http://localhost:3000/PostCard";

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get<PostCard[]>(this.urlPosts);
  }
  getPostById(id:number){
    return this.http.get<PostCard>(`${this.urlPosts}/${id}`);
  }
}
