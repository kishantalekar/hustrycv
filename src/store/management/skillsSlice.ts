import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  addSkill: (skill: Omit<SkillItem, 'id'>) => string;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void; // New function
  toggleSkillsVisibility: (visible: boolean) => void;
};

export const createSkillsSlice = (set: any): Actions => ({
  addSkill: skill => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {
                  ...resume.sections.skills,
                  items: [
                    ...resume.sections.skills.items,
                    {...skill, id: newId},
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

  updateSkill: (id, skill) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {
                  ...resume.sections.skills,
                  items: resume.sections.skills.items.map(item =>
                    item.id === id ? {...item, ...skill} : item,
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

  removeSkill: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {
                  ...resume.sections.skills,
                  items: resume.sections.skills.items.filter(
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

  toggleSkillsVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                skills: {...resume.sections.skills, visible},
              },
            }
          : resume,
      ),
    })),
});
