import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AddCollaboratorDTO, UpdateCollaboratorDTO } from './collaborators.dto'

@Injectable()
export class CollaboratorsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllByProjectId(projectId: string) {
    return this.prisma.projectCollaborator.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    })
  }

  async create(projectId: string, data: AddCollaboratorDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return this.prisma.projectCollaborator.create({
      data: {
        projectId,
        userId: data.userId,
        role: data.role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    })
  }

  update(projectId: string, userId: string, data: UpdateCollaboratorDTO) {
    const collaborator = this.prisma.projectCollaborator.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })

    if (!collaborator) {
      throw new Error('Collaborator not found')
    }

    return this.prisma.projectCollaborator.update({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      data: {
        role: data.role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    })
  }

  async remove(projectId: string, userId: string) {
    const collaborator = await this.prisma.projectCollaborator.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })

    if (!collaborator) {
      throw new NotFoundException('Collaborator not found')
    }

    if (collaborator.role === 'OWNER') {
      throw new BadRequestException('Cannot remove the owner of the project')
    }

    await this.prisma.projectCollaborator.delete({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    })
  }
}
