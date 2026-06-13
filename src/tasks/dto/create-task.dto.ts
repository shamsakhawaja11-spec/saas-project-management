// src/types/task.types.ts

export type TaskStatus = 'todo' | 'in_progress' | 'in_review' | 'done';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  position?: number;
  dueDate?: string;
  estimatedHours: number;
  boardId: string;
  assigneeId?: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  position?: number;
  dueDate?: string;
  estimatedHours?: number;
  boardId: string;
  assigneeId?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  position?: number;
  dueDate?: string;
  estimatedHours?: number;
  assigneeId?: string;
}