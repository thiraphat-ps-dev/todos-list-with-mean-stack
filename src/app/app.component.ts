import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todos-with-mean-stack';
  todo: string;
  completed: boolean;
  dataTodos: any[] = [];
  constructor(private http: HttpClient) {}

  getTodos() {
    this.http.get<any>('http://localhost:3000/todos').subscribe((result) => {
      this.dataTodos = result.data.reverse();
    });
  }

  onSubmit(data) {
    this.http
      .post<any>('http://localhost:3000/todos', data)
      .subscribe((result) => {
        this.getTodos();
        this.todo = '';
      });
  }

  onToggleStatus(id, status) {
    this.http
      .patch<any>(`http://localhost:3000/todos/${id}`, { completed: !status })
      .subscribe((result) => {
        this.getTodos();
      });
  }

  deleteTodo(id) {
    this.http
      .delete<any>(`http://localhost:3000/todos/${id}`)
      .subscribe((result) => {
        this.getTodos();
      });
  }

  ngOnInit(): void {
    this.getTodos();
  }
}
