import { Todo } from './todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TodoService {
  todoArray: Todo[] = [];

  addTodo(title: string, subtitle: string) {
    console.log(`title ${title}, subtitle ${subtitle}`);

    const todo = new Todo();
    todo.id = uuidv4();
    todo.title = title;
    todo.subtitle = subtitle;

    this.todoArray.push(todo);
  }

  getTodos() {
    return this.todoArray;
  }

  removeTodoById(id: string) {
    const todo = this.todoArray.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }

    this.todoArray = this.todoArray.filter((todo) => todo.id !== id);

    return this.todoArray;
  }
}
