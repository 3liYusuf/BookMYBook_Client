import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  constructor(public bookService:BookService, public authService:AuthService, public http:HttpClient){}
  
  async ngOnInit() {
      this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks().subscribe({
      next:(res)=>{
this.books = res.data;        
      }
    })
  }
}
