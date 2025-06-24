import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  // hobbies
  addHobbie: (hobbie: Omit<HobbieItem, 'id'>) => string;
  updateHobbie: (id: string, hobbie: Partial<HobbieItem>) => void;
  updateAllHobbies: (hobbies: HobbieItem[]) => void; // New method to update all hobbies in the resume data
  removeHobbie: (id: string) => void; // New function
  toggleHobbiesVisibility: (visible: boolean) => void;
};

export const createHobbiesSlice = (set: any): Actions => ({
  addHobbie: hobbie => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                hobbies: {
                  ...resume.sections.hobbies,
                  items: [
                    ...resume.sections.hobbies.items,
                    {...hobbie, id: newId},
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

  updateHobbie: (id, hobbie) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                hobbies: {
                  ...resume.sections.hobbies,
                  items: resume.sections.hobbies.items.map(item =>
                    item.id === id ? {...item, ...hobbie} : item,
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
  updateAllHobbies: hobbies =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                hobbies: {
                  ...resume.sections.hobbies,
                  items: hobbies,
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
  removeHobbie: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                hobbies: {
                  ...resume.sections.hobbies,
                  items: resume.sections.hobbies.items.filter(
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

  toggleHobbiesVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                hobbies: {
                  ...resume.sections.hobbies,
                  visible,
                },
              },
            }
          : resume,
      ),
    })),
});
