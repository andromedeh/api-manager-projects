import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ValidateResourcesIds } from 'src/common/decorators/validate-resources-ids.decorator'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptors/validate-resources-ids/validate-resources-ids.interceptor'
import { TaskDTO } from './tasks.dto'
import { TasksService } from './tasks.service'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ValidateResourcesIds()
  findAll(@Param('projectId', ParseUUIDPipe) projectId: string) {
    return this.tasksService.findAllByProject(projectId)
  }

  @Get(':taskId')
  @ValidateResourcesIds()
  async findOne(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return await this.tasksService.findById(projectId, taskId)
  }

  @Post()
  @ValidateResourcesIds()
  create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: TaskDTO) {
    return this.tasksService.create(projectId, data)
  }

  @Put(':taskId')
  @ValidateResourcesIds()
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: TaskDTO,
  ) {
    return this.tasksService.update(projectId, taskId, data)
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  async remove(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.delete(projectId, taskId)
  }
}
