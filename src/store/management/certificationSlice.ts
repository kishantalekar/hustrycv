import {v4 as uuidv4} from 'uuid';

type State = {
  resumes: Resume[];
  activeResumeId: string;
};

type Actions = {
  // Certifications
  addCertification: (certification: Omit<CertificateItem, 'id'>) => string;
  updateCertification: (
    id: string,
    certification: Partial<CertificateItem>,
  ) => void;
  removeCertification: (id: string) => void;
  toggleCertificationVisibility: (visible: boolean) => void;
};

export const createCertificationsSlice = (set: any): Actions => ({
  addCertification: certification => {
    const newId = uuidv4();
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {
                  ...resume.sections.certifications,
                  items: [
                    ...resume.sections.certifications.items,
                    {...certification, id: newId},
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

  updateCertification: (id, certification) =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {
                  ...resume.sections.certifications,
                  items: resume.sections.certifications.items.map(item =>
                    item.id === id ? {...item, ...certification} : item,
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

  removeCertification: id =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {
                  ...resume.sections.certifications,
                  items: resume.sections.certifications.items.filter(
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

  toggleCertificationVisibility: visible =>
    set((state: State) => ({
      resumes: state.resumes.map(resume =>
        resume.metadata.id === state.activeResumeId
          ? {
              ...resume,
              sections: {
                ...resume.sections,
                certifications: {
                  ...resume.sections.certifications,
                  visible,
                },
              },
            }
          : resume,
      ),
    })),
});
