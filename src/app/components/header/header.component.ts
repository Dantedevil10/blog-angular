import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { PostCard } from '../../models/posts.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PostserviceService } from '../../services/postservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass'
})
export class HeaderComponent {

  searchQuery = '';
  suggestions: PostCard[] = [];
  private searchSubject = new Subject<string>();

  constructor(private postService: PostserviceService) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300), // Aguarda 300ms para evitar chamadas excessivas
      distinctUntilChanged(), // Evita buscas repetidas para o mesmo termo
      switchMap(query => this.searchPosts(query))
    ).subscribe(results => {
      this.suggestions = results;
    });
  }

  onSearchChange() {
    if (this.searchQuery.trim() && this.searchQuery) {
      this.searchSubject.next(this.searchQuery);
    } else {
      this.suggestions = [];
    }

    
  }

  searchPosts(query: string): Observable<PostCard[]> {
    return new Observable(observer => {
      this.postService.getPosts().subscribe(posts => {
        const filteredPosts = posts.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase())
        );
        observer.next(filteredPosts);
        observer.complete();
      });
    });
  }

}
