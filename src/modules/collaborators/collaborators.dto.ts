import { ApiProperty } from '@nestjs/swagger'
import { CollaboratorRole } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AddCollaboratorDTO {
  @ApiProperty({ description: 'User ID to add as a collaborator' })
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty({
    description: 'Collaborator role',
    enum: CollaboratorRole,
    default: CollaboratorRole.EDITOR,
    required: false,
  })
  @IsOptional()
  @IsEnum(CollaboratorRole)
  role?: CollaboratorRole = CollaboratorRole.EDITOR
}

export class UpdateCollaboratorDTO {
  @ApiProperty({
    description: 'New collaborator role',
    enum: CollaboratorRole,
  })
  @IsNotEmpty()
  @IsEnum(CollaboratorRole)
  role: CollaboratorRole
}

class CollaboratorUserDTO {
  @ApiProperty() id: string
  @ApiProperty() name: string
  @ApiProperty() email: string
  @ApiProperty({ nullable: true }) avatar: string | null
}

export class CollaboratorListItemDTO {
  @ApiProperty() id: string
  @ApiProperty({ enum: CollaboratorRole }) role: CollaboratorRole
  @ApiProperty() projectId: string
  @ApiProperty() userId: string
  @ApiProperty({ format: 'date-time' }) createdAt: Date
  @ApiProperty({ type: CollaboratorUserDTO }) user: CollaboratorUserDTO
}
