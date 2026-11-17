import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from 'node_modules/@nestjs/swagger/dist/decorators/api-property.decorator'

export class CommentRequestDTO {
  @ApiProperty({ description: 'The content of the comment' })
  @IsString()
  @IsNotEmpty()
  content: string
}

export class UpdateRequestDTO extends CommentRequestDTO {}

class CommentAuthorDTO {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() email: string
  @ApiProperty({ nullable: true }) avatar: string | null
}

export class CommentListItemDTO {
  @ApiProperty() id: string
  @ApiProperty() content: string
  @ApiProperty() taskId: string
  @ApiProperty() authorId: string
  @ApiProperty({ format: 'date-time' }) createdAt: Date
  @ApiProperty() updatedAt: Date
  @ApiProperty({ type: CommentAuthorDTO }) author: CommentAuthorDTO
}

class CommentTaskDTO {
  @ApiProperty() id: string
  @ApiProperty() title: string
  @ApiProperty() projectId: string
}

export class CommentFullDTO extends CommentListItemDTO {
  @ApiProperty({ type: CommentTaskDTO }) task: CommentTaskDTO
}
