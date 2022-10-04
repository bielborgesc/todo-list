import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskService {

  constructor(private prisma: PrismaService) {}

  async create(createTaskInput: CreateTaskInput) {
    return await this.prisma.task.create({
      data: {title: createTaskInput.title}
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({where: {id}});
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return this.prisma.task.update({
      where: {id},
      data: {title: updateTaskInput.title},
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({where: {id}});
  }
}
