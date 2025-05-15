type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  // Resume Management
  getActiveResume: () => Resume;
  setActiveResume: (id: string) => void;
  addResume: (newResume: Resume) => string;
  deleteResume: (id: string) => void;
  updateResumeTemplateId: (templateId: string) => void;

  // Metadata Management
  updateMetadata: (metadata: Partial<Metadata>) => void;
};

export const createResumeSlice = (set: any, get: () => State): Actions => ({
  getActiveResume: () => {
    const state = get();
    return state.resumes.find(
      resume => resume.metadata.id === state.activeResumeId,
    )!;
  },

  setActiveResume: (id: string) =>
    set({
      activeResumeId: id,
    }),

  addResume: (newResume: Resume) => {
    const id = newResume.metadata.id;
    set((state: State) => ({
      resumes: [...state.resumes, newResume],
    }));
    return id;
  },

  deleteResume: id =>
    set((state: State) => ({
      resumes: state.resumes.filter(resume => resume.metadata.id !== id),
      activeResumeId:
        state.activeResumeId === id
          ? state.resumes[0]?.metadata.id
          : state.activeResumeId,
    })),

  updateResumeTemplateId: templateId => {
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              metadata: {
                ...resume.metadata,
                templateId,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    }));
  },

  updateMetadata: metadata =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              metadata: {
                ...resume.metadata,
                ...metadata,
                updatedAt: new Date().toISOString(),
              },
            }
          : resume,
      ),
    })),
});
