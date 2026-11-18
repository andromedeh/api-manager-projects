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
import {
  CommentFullDTO,
  CommentListItemDTO,
  CommentRequestDTO,
  UpdateRequestDTO,
} from './comments.dto'
import { CommentsService } from './comments.service'

@Controller({
  version: '1',
  path: 'projects/:projectId/tasks/:taskId/comments',
})
@UseInterceptors(ValidateResourcesIdsInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ValidateResourcesIds()
  @ApiPaginatedResponse(CommentListItemDTO)
  findAllByTask(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Query() query?: QueryPaginationDTO,
  ) {
    return this.commentsService.findAllByTask(taskId, query)
  }

  @Get(':commentId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: CommentFullDTO })
  findById(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    return this.commentsService.findById(taskId, commentId)
  }

  @Post()
  @ValidateResourcesIds()
  @ApiCreatedResponse({ type: CommentListItemDTO })
  @HttpCode(HttpStatus.CREATED)
  create(@Param('taskId', ParseUUIDPipe) taskId: string, @Body() data: CommentRequestDTO) {
    return this.commentsService.create(taskId, data)
  }

  @Put(':commentId')
  @ValidateResourcesIds()
  @ApiOkResponse({ type: CommentListItemDTO })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @Body() data: UpdateRequestDTO,
  ) {
    return this.commentsService.update(taskId, commentId, data)
  }

  @Delete(':commentId')
  @ValidateResourcesIds()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('taskId', ParseUUIDPipe) taskId: string,
    @Param('commentId', ParseUUIDPipe) commentId: string,
  ) {
    return this.commentsService.remove(taskId, commentId)
  }
}
