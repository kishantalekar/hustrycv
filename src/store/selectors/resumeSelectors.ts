import {ResumeState} from '../useResumeStore';

export const selectActiveResume = (state: ResumeState) =>
  state.resumes.find(r => r.metadata.id === state.activeResumeId);

export const selectMetadata = (state: ResumeState) =>
  selectActiveResume(state)?.metadata;

export const selectBasics = (state: ResumeState) =>
  selectActiveResume(state)?.basics;

export const selectWorkSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.work;

export const selectEducationSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.education;

export const selectSkillsSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.skills;

export const selectProjectsSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.projects;

export const selectCertificationsSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.certifications;

export const selectHobbiesSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.hobbies;

export const selectStrengthsSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.strengths;

export const selectReferencesSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.references;

export const selectLanguagesSection = (state: ResumeState) =>
  selectActiveResume(state)?.sections.languages;

export const selectCustomSections = (state: ResumeState) =>
  selectActiveResume(state)?.sections.customSections;
