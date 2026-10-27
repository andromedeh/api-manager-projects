import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common'
import { TaskDTO } from './tasks.dto'
import { TasksService } from './tasks.service'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.tasksService.findAllByProject(projectId)
  }

  @Get(':taskId')
  async findOne(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    const task = await this.tasksService.findById(projectId, taskId)
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }
    return task
  }

  @Post()
  create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: TaskDTO) {
    return this.tasksService.create(projectId, data)
  }

  @Put(':taskId')
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: TaskDTO,
  ) {
    const task = await this.tasksService.findById(projectId, taskId)
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }
    return this.tasksService.update(projectId, taskId, data)
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    const task = await this.tasksService.findById(projectId, taskId)
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND)
    }
    return this.tasksService.delete(projectId, taskId)
  }
}
