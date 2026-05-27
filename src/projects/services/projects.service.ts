import { Injectable, NotFoundException } from "@nestjs/common";
import { ProjectsRepository } from "../repositories";
import { CreateProjectDto, UpdateProjectDto } from "../dto";
import { Project } from "../entities/project.entity";

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectsRepository) {}

  async create(createProjectDto: CreateProjectDto, workspaceId: string): Promise<Project> {
    const project = this.projectsRepository.create({
      ...createProjectDto,  // ❌ Was: CreateProjectDto (wrong)
      workspaceId,
    });
    return this.projectsRepository.save(project);
  }

  async findOne(id: string, workspaceId: string): Promise<Project> {
    const project = await this.projectsRepository.findByIdAndWorkspaceId(id, workspaceId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async findAll(workspaceId: string): Promise<Project[]> {
    return this.projectsRepository.findByWorkspaceId(workspaceId);
  }

  async update(id: string, workspaceId: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.findOne(id, workspaceId); // Verify ownership
    await this.projectsRepository.update(id, updateProjectDto);
    return this.findOne(id, workspaceId);
  }

  async remove(id: string, workspaceId: string): Promise<void> {
    await this.findOne(id, workspaceId);
    await this.projectsRepository.delete(id);
  }
}