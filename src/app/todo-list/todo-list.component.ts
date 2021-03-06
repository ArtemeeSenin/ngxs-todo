import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TodoState} from '../../stores/todo/todo.state';
import {Observable} from 'rxjs';
import {ITodo, Todo} from '../../stores/todo/todo.actions';
import ToggleStatus = Todo.ToggleStatus;
import Delete = Todo.Delete;
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Select(TodoState.todoList) todos$: Observable<ITodo[]>;
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
  }

  handleTodoToggle(id: ITodo['id']) {
    this.store.dispatch(new ToggleStatus(id));
  }

  handleTodoDelete(id: ITodo['id']) {
    this.store.dispatch(new Delete(id));
  }

  handleTodoOpen(id: ITodo['id']) {
    this.router.navigate(['todos', id]);
  }

  trackById(index: number, item: ITodo): ITodo['id']{
    return item.id;
  }

}
