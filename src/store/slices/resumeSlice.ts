import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Record<string, Resume>;
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
  duplicateResume: (id: string, newTitle?: string) => string;
};

export const createResumeSlice = (set: any, get: () => State): Actions => ({
  getActiveResume: () => {
    const state = get();
    return state.resumes[state.activeResumeId];
  },

  setActiveResume: (id: string) =>
    set({
      activeResumeId: id,
    }),

  addResume: (newResume: Resume) => {
    const id = newResume.metadata.id;
    set((state: State) => ({
      resumes: { ...state.resumes, [id]: newResume },
    }));
    return id;
  },

  deleteResume: id =>
    set((state: State) => {
      const { [id]: _removed, ...remainingResumes } = state.resumes;
      const remainingIds = Object.keys(remainingResumes);
      return {
        resumes: remainingResumes,
        activeResumeId:
          state.activeResumeId === id
            ? remainingIds[0] || ''
            : state.activeResumeId,
      };
    }),

  updateResumeTemplateId: templateId => {
    set((state: State) => {
      const resume = state.resumes[state.activeResumeId];
      if (!resume) return state;
      return {
        resumes: {
          ...state.resumes,
          [state.activeResumeId]: {
            ...resume,
            metadata: {
              ...resume.metadata,
              templateId,
              updatedAt: new Date().toISOString(),
            },
          },
        },
      };
    });
  },

  updateMetadata: metadata =>
    set((state: State) => {
      const resume = state.resumes[state.activeResumeId];
      if (!resume) return state;
      return {
        resumes: {
          ...state.resumes,
          [state.activeResumeId]: {
            ...resume,
            metadata: {
              ...resume.metadata,
              ...metadata,
              updatedAt: new Date().toISOString(),
            },
          },
        },
      };
    }),

  duplicateResume: (id, newTitle) => {
    const state = get();
    const original = state.resumes[id];
    if (!original) return id;

    const newId = uuidv4();
    const duplicated: Resume = JSON.parse(JSON.stringify(original));
    duplicated.metadata.id = newId;
    duplicated.metadata.title = newTitle || `${original.metadata.title} (Copy)`;
    duplicated.metadata.createdAt = new Date().toISOString();
    duplicated.metadata.updatedAt = new Date().toISOString();

    set((s: State) => ({
      resumes: { ...s.resumes, [newId]: duplicated },
    }));

    return newId;
  },
});
