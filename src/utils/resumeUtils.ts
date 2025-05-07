import {CustomSectionItem, Resume, Section} from '@/types';
import {SocialLink} from '@/types/common/social.types';

/**
 * Calculates the completion percentage of a resume
 * @param resume The resume object to calculate progress for
 * @returns A number between 0-100 representing completion percentage
 */
export const calculateProgress = (resume: Resume): number => {
  let totalFields = 0;
  let filledFields = 0;

  // Required fields configuration
  const requiredFields = {
    basics: ['name', 'email', 'phone'],
    work: ['company', 'position', 'startDate', 'description'],
    education: ['institution', 'degree', 'startDate'],
    skills: ['name'],
    projects: ['name', 'description'],
    certifications: ['name', 'authority', 'date'],
    socials: ['label', 'url'],
  };

  // Check basics section
  requiredFields.basics.forEach(field => {
    totalFields++;
    if (resume.basics[field as keyof typeof resume.basics]) {
      filledFields++;
    }
  });

  // Social links
  resume.basics.socials.forEach(social => {
    requiredFields.socials.forEach(field => {
      totalFields++;
      if (social[field as keyof SocialLink]?.trim()) {
        filledFields++;
      }
    });
  });

  // Helper function to count section fields
  const countSection = <T>(
    section: Section<T>,
    fields: string[],
    minItems = 1,
  ) => {
    if (!section.visible) return;

    // Require minimum items for visible sections
    const items = section.items.length >= minItems ? section.items : [{} as T];

    items.forEach(item => {
      fields.forEach(field => {
        totalFields++;
        const value = item[field as keyof T];
        if (typeof value === 'string' ? value?.trim() : value) {
          filledFields++;
        }
      });
    });
  };

  // Count fields for each section
  countSection(resume.sections.work, requiredFields.work);
  countSection(resume.sections.education, requiredFields.education);
  countSection(resume.sections.skills, requiredFields.skills);
  countSection(resume.sections.projects, requiredFields.projects);
  countSection(resume.sections.certifications, requiredFields.certifications);

  // Custom sections
  resume.sections.customSections.forEach(section => {
    if (!section.visible) return;

    const items =
      section.items.length > 0 ? section.items : [{} as CustomSectionItem];
    items.forEach(item => {
      Object.entries(item).forEach(([key, value]) => {
        if (key !== 'id') {
          totalFields++;
          if (value) filledFields++;
        }
      });
    });
  });

  return totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
};

/**
 * Determines the completion status text based on progress percentage
 * @param progress The progress percentage (0-100)
 * @returns A string representing the completion status
 */
// export const getCompletionStatus = (progress: number): string => {
//   if (progress < 30) return 'Just started';
//   if (progress < 70) return 'In progress';
//   return 'Almost complete';
// };
export const getCompletionStatus = (progress: number): string => {
  if (progress === 0) return 'Not started';
  if (progress < 25) return 'Basic info added';
  if (progress < 50) return 'Core sections started';
  if (progress < 75) return 'Substantial progress';
  if (progress < 90) return 'Finalizing details';
  if (progress < 100) return 'Review and polish';
  return 'Ready to apply!';
};
