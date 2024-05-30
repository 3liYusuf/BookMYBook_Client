import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiUrls} from '../api.urls';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(public http:HttpClient) { }

  getBooks(){
    return this.http.get<Response<Book[]>>(`${apiUrls.bookServiceApi}`)
  }
}


export type Book ={
  _id: string;
  title: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  __v: number;
}

export type Response<T> = {
  success:boolean;
  status:number;
  message:string;
  data:T;
}
