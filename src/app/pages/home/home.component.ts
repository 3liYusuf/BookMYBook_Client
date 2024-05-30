import { Component, OnInit } from '@angular/core';
import { Book, BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  books:Book[] =[];
  constructor(public bookService:BookService){}
  
  ngOnInit(): void {
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
