import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoService } from 'src/todo/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post()
  addTodo(@Body('title') title: string, @Body('subtitle') subtitle: string) {
    this.todoService.addTodo(title, subtitle);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.removeTodoById(id);
  }
}
