import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { apiUrls } from 'src/app/api.urls';
import { AuthService } from 'src/app/services/auth.service';
import { Book, BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  books:Book[] =[];
  booksSubscription!: Subscription;

  constructor(public bookService:BookService, public authService:AuthService, public http:HttpClient){}
  
  ngOnInit() {
    this.getBooks();
  }

  ngOnDestroy() {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }

  getBooks() {
    this.booksSubscription = this.bookService.getBooks().subscribe({
      next: (res: any) => {
        this.books = res.data;
      },
      error: (error) => {
        // Handle error appropriately (e.g., display error message)
        console.error('Error fetching books:', error);
      }
    });
  }
}
