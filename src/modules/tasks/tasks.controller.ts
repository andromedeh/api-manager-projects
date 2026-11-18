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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { ApiPaginatedResponse } from 'src/common/decorators/swagger/api-paginated-response'
import { ValidateResourcesIds } from 'src/common/decorators/validate-resources-ids.decorator'
import { QueryPaginationDTO } from 'src/common/dtos/query-pagination.dto'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard'
import { ValidateResourcesIdsInterceptor } from 'src/common/interceptors/validate-resources-ids/validate-resources-ids.interceptor'
import { TaskFullDTO, TaskListItemDTO, TaskRequestDTO } from './tasks.dto'
import { TasksService } from './tasks.service'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ValidateResourcesIds()
  @ApiPaginatedResponse(TaskListItemDTO)
  findAll(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Query() query?: QueryPaginationDTO,
  ) {
    return this.tasksService.findAllByProject(projectId, query)
  }

  @Get(':taskId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: TaskFullDTO })
  async findOne(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return await this.tasksService.findById(projectId, taskId)
  }

  @Post()
  @ValidateResourcesIds()
  @ApiCreatedResponse({ type: TaskListItemDTO })
  @HttpCode(HttpStatus.CREATED)
  create(@Param('projectId', ParseUUIDPipe) projectId: string, @Body() data: TaskRequestDTO) {
    return this.tasksService.create(projectId, data)
  }

  @Put(':taskId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: TaskListItemDTO })
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Body() data: TaskRequestDTO,
  ) {
    return this.tasksService.update(projectId, taskId, data)
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ValidateResourcesIds()
  @ApiNoContentResponse({ description: 'Task deleted' })
  async remove(
    @Param('projectId', ParseUUIDPipe) projectId: string,
    @Param('taskId', ParseUUIDPipe) taskId: string,
  ) {
    return this.tasksService.delete(projectId, taskId)
  }
}
