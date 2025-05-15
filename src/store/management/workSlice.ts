import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  addWorkExperience: (experience: Omit<WorkItem, 'id'>) => string;
  updateWorkExperience: (id: string, experience: Partial<WorkItem>) => void;
  updateAllWorkExperiences: (experiences: WorkItem[]) => void; // New method
  removeWorkExperience: (id: string) => void;
  toggleWorkVisibility: (visible: boolean) => void;
};

export const createWorkSlice = (set: any): Actions => ({
  addWorkExperience: experience => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {
                  ...resume.sections.work,
                  items: [
                    ...resume.sections.work.items,
                    {...experience, id: newId},
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
  updateWorkExperience: (id, experience) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {
                  ...resume.sections.work,
                  items: resume.sections.work.items.map(item =>
                    item.id === id ? {...item, ...experience} : item,
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

  updateAllWorkExperiences: experiences =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {
                  ...resume.sections.work,
                  items: experiences,
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

  removeWorkExperience: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {
                  ...resume.sections.work,
                  items: resume.sections.work.items.filter(
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

  toggleWorkVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                work: {...resume.sections.work, visible},
              },
            }
          : resume,
      ),
    })),
});
