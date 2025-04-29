# Blueprint Resume Project Rules

## Technology Stack

- React Native
- TypeScript

## Component Architecture

### Component Organization

1. Create reusable components for common UI elements:

   - Form inputs (TextInput, Select, DatePicker)
   - Section containers (WorkSection, EducationSection)
   - List items (WorkItem, EducationItem, SkillItem)
   - Preview components (ResumePreview)

2. Component Structure:
   - Each component should have its own directory
   - Include index.ts for exports
   - Separate types in ComponentName.types.ts
   - Styles in ComponentName.styles.ts

### State Management

1. Use Zustand for global state management
2. Follow the store pattern in useResumeStore.ts
3. Separate concerns into different slices (metadata, basics, sections)

### Templates

1. Create modular template components
2. Extract common styles into shared style utilities
3. Use template-specific components for unique layouts

## Code Reusability

### DRY Principles

1. Create shared interfaces for common data structures:

   - Section interfaces (work, education, skills)
   - Item interfaces (WorkItem, EducationItem)
   - Basic information interfaces

2. Utility Functions:
   - Date formatting
   - Input validation
   - Data transformation

### Styling Guidelines

1. Use consistent styling patterns:

   - Shared color palette
   - Typography scale
   - Spacing system

2. Create reusable style components:
   - Section containers
   - Form layouts
   - List items

## Data Structure

Follow the established resume schema:

```typescript
interface Resume {
  metadata: Metadata;
  basics: Basics;
  sections: {
    work: Section<WorkItem>;
    education: Section<EducationItem>;
    skills: Section<SkillItem>;
    projects: Section<ProjectItem>;
    certifications: Section<CertificateItem>;
    customSections: Section<CustomSectionItem>[];
  };
}
```

## Best Practices

1. Type Safety:

   - Use TypeScript interfaces for all components
   - Avoid any type
   - Implement proper type guards

2. Performance:

   - Implement proper memoization
   - Optimize re-renders
   - Use proper list virtualization

3. Accessibility:

   - Follow WCAG guidelines
   - Implement proper keyboard navigation
   - Use semantic HTML elements

4. Testing:

   - Write unit tests for components
   - Test utility functions
   - Implement integration tests

5. Error Handling:
   - Implement proper error boundaries
   - Add input validation
   - Handle edge cases
