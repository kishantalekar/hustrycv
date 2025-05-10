import {ProjectItem, Resume} from '@/types';
import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  addProject: (project: Omit<ProjectItem, 'id'>) => string;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void; // New function
  toggleProjectsVisibility: (visible: boolean) => void;
};

export const createProjectsSlice = (set: any): Actions => ({
  addProject: project => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {
                  ...resume.sections.projects,
                  items: [
                    ...resume.sections.projects.items,
                    {...project, id: newId},
                  ],
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    }));
    return newId;
  },

  updateProject: (id, project) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {
                  ...resume.sections.projects,
                  items: resume.sections.projects.items.map(item =>
                    item.id === id ? {...item, ...project} : item,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  removeProject: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {
                  ...resume.sections.projects,
                  items: resume.sections.projects.items.filter(
                    item => item.id !== id,
                  ),
                },
              },
              metadata: {
                ...resume.metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),

  toggleProjectsVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                projects: {...resume.sections.projects, visible},
              },
            }
          : resume,
      ),
    })),
});
