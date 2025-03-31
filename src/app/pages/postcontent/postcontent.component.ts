import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PostCard } from '../../models/posts.model';
import { PostserviceService } from '../../services/postservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-postcontent',
  templateUrl: './postcontent.component.html',
  styleUrl: './postcontent.component.sass'
})
export class PostcontentComponent {

  posts$ = new Observable<PostCard[]>();
  post? : PostCard;
  id :number;

  constructor(private service:PostserviceService,private route:ActivatedRoute,private router:Router){
    const id = Number(this.route.snapshot.paramMap.get("id"))
    this.id = id

    this.getPost();
    this.obterPosts();
  }

  getPost(){
    this.service.getPostById(this.id).subscribe((p)=>{this.post = p});
  }
  obterPosts(){
    this.posts$ = this.service.getPosts();
  }
  openNewPost(id:number){
    this.id = Number(id)
    this.router.navigate(['post/'+ this.id]).then(() => {
      window.location.reload();
      window.scrollTo(0,0)
    });
  }
}
