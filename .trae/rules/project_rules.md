# Blueprint Resume Project Rules

## Technology Stack

- React Native
- TypeScript

## Project Structure

### Component Organization

1. Core Components (`src/components/`):

   - Common UI Elements:

     - `src/components/Button/Button.tsx`
     - `src/components/TextInput/TextInput.tsx`
     - `src/components/Typography/Typography.tsx`

   - Section Components:

     - `src/components/WorkSection/`
     - `src/components/EducationSection/`
     - `src/components/SkillSection/`

   - Preview Components:
     - `src/components/ResumePreview/`

2. Component Structure:
   ```
   src/components/ComponentName/
   ├── index.ts
   ├── ComponentName.tsx
   ├── ComponentName.types.ts
   └── ComponentName.styles.ts
   ```

### Assets and Resources

1. Animations (`src/assets/animations/`):

   - Lottie animation files
   - Loading states
   - Transitions

2. Constants and Styles:
   - `src/constants/fonts.ts`: Font definitions
   - `src/styles/globalStyles.ts`: Global styling constants

### Utilities

1. Helper Functions (`src/utils/`):
   - `fileUtils.ts`: File handling operations
   - `navigation.ts`: Navigation helpers
   - `pdfUtils.ts`: PDF generation and handling

### Documentation

1. Storybook (`src/stories/`):
   - Component documentation
   - Usage examples
   - Interactive testing

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

## Color System

### Primary Colors

1. Primary Orange (#FA6607):

   - Use for primary buttons and key highlights
   - Apply to main call-to-action elements
   - Limit usage to ~10% of UI for maximum impact

2. Accent Colors:

   - Teal/Cyan (#00C2C4): Secondary buttons, link highlights
   - Deep Blue (#1565C0): Navigation bars, info labels
   - Success Green (#4CAF50): Positive actions, confirmation buttons

3. Background and Text:
   - Background (#F9FAFB): Main surface color
   - Primary Text (#333333): Main content, headings
   - Secondary Text (#828282): Supporting text, captions

### Usage Guidelines

1. Component Applications:

   - Buttons:

     - Primary: Orange (#FA6607) with white text
     - Secondary: Teal (#00C2C4) or Blue (#1565C0)
     - Success: Green (#4CAF50)

   - Forms:

     - Input borders: Light gray
     - Focus state: Teal (#00C2C4)
     - Placeholder text: Secondary gray (#828282)

   - Navigation:
     - Background: White or #F9FAFB
     - Active items: Orange or Teal accents
     - Inactive items: Dark gray or blue

2. Hierarchy Rules:

   - Follow 60-30-10 distribution:
     - 60% neutral colors (backgrounds)
     - 30% secondary colors (teal/blue)
     - 10% primary orange (key actions)

3. Accessibility:

   - Maintain WCAG 2.0 contrast ratios (≥4.5:1)
   - Use dark text (#333333) on light backgrounds
   - Ensure sufficient contrast for all interactive elements

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
