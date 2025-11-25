import { create } from 'zustand';
import { Project, User } from '@/types/project';
import { MOCK_PROJECTS, MOCK_USERS } from '@/utils/mockData';
import { calculateHealthScore, getDaysSinceUpdate } from '@/utils/calculations';

interface ProjectStore {
  projects: Project[];
  users: User[];
  currentUser: User;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  addComment: (projectId: string, message: string) => void;
  getProjectsWithCalculations: () => Project[];
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: MOCK_PROJECTS,
  users: MOCK_USERS,
  currentUser: MOCK_USERS[0],
  selectedProject: null,

  setSelectedProject: (project) => set({ selectedProject: project }),

  updateProject: (projectId, updates) => {
    set((state) => {
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return state;

      const updatedProjects = [...state.projects];
      const oldProject = updatedProjects[projectIndex];
      const newProject = {
        ...oldProject,
        ...updates,
        updatedAt: new Date(),
        lastUpdateBy: state.currentUser.id,
      };

      updatedProjects[projectIndex] = newProject;

      return {
        projects: updatedProjects,
        selectedProject: state.selectedProject?.id === projectId ? newProject : state.selectedProject,
      };
    });
  },

  addComment: (projectId, message) => {
    set((state) => {
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex === -1) return state;

      const updatedProjects = [...state.projects];
      const project = updatedProjects[projectIndex];
      
      const newEvent = {
        id: `evt-${Date.now()}`,
        type: "comment" as const,
        author: state.currentUser.id,
        message,
        timestamp: new Date(),
      };

      const updatedProject = {
        ...project,
        timeline: [...project.timeline, newEvent],
        updatedAt: new Date(),
        lastUpdateBy: state.currentUser.id,
      };

      updatedProjects[projectIndex] = updatedProject;

      return {
        projects: updatedProjects,
        selectedProject: state.selectedProject?.id === projectId ? updatedProject : state.selectedProject,
      };
    });
  },

  getProjectsWithCalculations: () => {
    return get().projects.map((project) => ({
      ...project,
      healthScore: calculateHealthScore(project),
      daysSinceUpdate: getDaysSinceUpdate(project),
    }));
  },
}));
