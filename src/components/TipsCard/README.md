# TipsCard Component

A flexible and user-friendly tips component that can be used throughout the app to provide contextual guidance without being intrusive.

## Features

- **Multiple Variants**: Default, compact, and floating styles
- **Smart Dismissal**: Show once, auto-hide, or manual dismissal
- **Animations**: Fade and slide animations
- **Contextual Tips**: Predefined tip sets for different screens
- **Customizable**: Colors, sizes, and positioning
- **Non-intrusive**: Designed to help without bothering users

## Basic Usage

```tsx
import TipsCard, {TipSets} from '@/components/TipsCard';

// Simple usage with predefined tips
<TipsCard tips={TipSets.skills} variant="default" dismissible={true} />;
```

## Props

| Prop              | Type                                 | Default   | Description                        |
| ----------------- | ------------------------------------ | --------- | ---------------------------------- |
| `title`           | string                               | "Tips"    | Header title for the tips card     |
| `tips`            | TipItem[]                            | required  | Array of tip items to display      |
| `variant`         | 'default' \| 'compact' \| 'floating' | 'default' | Visual style variant               |
| `dismissible`     | boolean                              | true      | Whether users can dismiss the tips |
| `onDismiss`       | function                             | -         | Callback when tips are dismissed   |
| `autoHide`        | boolean                              | false     | Automatically hide after delay     |
| `autoHideDelay`   | number                               | 5000      | Delay in ms before auto-hiding     |
| `showOnce`        | boolean                              | false     | Show only once per user            |
| `storageKey`      | string                               | -         | Key for storing dismissal state    |
| `position`        | 'top' \| 'bottom' \| 'inline'        | 'inline'  | Positioning of the tips            |
| `animationType`   | 'slide' \| 'fade' \| 'none'          | 'fade'    | Animation type                     |
| `maxWidth`        | number                               | -         | Maximum width constraint           |
| `backgroundColor` | string                               | -         | Custom background color            |
| `borderColor`     | string                               | -         | Custom border color                |

## Variants

### Default

Standard tips card with full padding and shadows.

```tsx
<TipsCard tips={TipSets.work} variant="default" />
```

### Compact

Smaller, more subtle tips card for tight spaces.

```tsx
<TipsCard tips={TipSets.skills} variant="compact" />
```

### Floating

Floating overlay tips for non-intrusive guidance.

```tsx
<TipsCard
  tips={TipSets.preview}
  variant="floating"
  position="floating"
  autoHide={true}
  autoHideDelay={5000}
/>
```

## Predefined Tip Sets

Use `TipSets` for consistent tips across screens:

- `TipSets.skills` - Skills management tips
- `TipSets.work` - Work experience tips
- `TipSets.education` - Education section tips
- `TipSets.projects` - Projects section tips
- `TipSets.preview` - Resume preview tips
- `TipSets.dashboard` - Dashboard navigation tips
- `TipSets.onboarding` - Onboarding guidance

## Smart Tips with TipsManager

```tsx
import {TipsManager} from '@/components/TipsCard';

const tipsManager = TipsManager.getInstance();

// Get contextual tips based on user state
const tips = tipsManager.getContextualTips({
  screen: 'skills',
  hasData: false,
  isFirstTime: true,
  userLevel: 'beginner',
});

<TipsCard tips={tips} />;
```

## Best Practices

### 1. Non-intrusive Guidance

```tsx
// Good: Show once and allow dismissal
<TipsCard
  tips={TipSets.skills}
  showOnce={true}
  storageKey="skills_tips_shown"
  dismissible={true}
/>

// Avoid: Persistent, non-dismissible tips
<TipsCard
  tips={TipSets.skills}
  dismissible={false}
  showOnce={false}
/>
```

### 2. Context-Appropriate Variants

```tsx
// Good: Compact for forms, floating for overlays
<TipsCard variant="compact" tips={formTips} />
<TipsCard variant="floating" tips={previewTips} />

// Good: Auto-hide for temporary guidance
<TipsCard
  variant="floating"
  autoHide={true}
  autoHideDelay={4000}
/>
```

### 3. Smart Timing

```tsx
// Good: Show tips when users need them
const EmptySkillsState = () => (
  <>
    <EmptyStateMessage />
    <TipsCard tips={TipUtils.createEmptyStateTips('skill')} variant="compact" />
  </>
);

// Good: Progressive disclosure
const AdvancedFeatureTips = ({userLevel}) => {
  if (userLevel === 'beginner') return null;

  return <TipsCard tips={advancedTips} variant="compact" autoHide={true} />;
};
```

## Screen-Specific Examples

### Skills Editor

```tsx
<TipsCard
  tips={TipSets.skills}
  variant="default"
  dismissible={true}
  showOnce={true}
  storageKey="skills_tips_shown"
  animationType="fade"
/>
```

### Dashboard

```tsx
<TipsCard
  tips={TipSets.dashboard}
  variant="compact"
  dismissible={true}
  showOnce={true}
  storageKey="dashboard_tips_shown"
/>
```

### Preview Screen

```tsx
<TipsCard
  tips={TipSets.preview}
  variant="floating"
  position="floating"
  autoHide={true}
  autoHideDelay={5000}
  animationType="slide"
/>
```

## Custom Tips

```tsx
const customTips = [
  {
    icon: 'star',
    text: 'Use action verbs to describe achievements',
    iconColor: COLORS.primary,
  },
  {
    icon: 'trending-up',
    text: 'Quantify impact with numbers',
    iconColor: '#4CAF50',
  },
];

<TipsCard
  title="Pro Tips"
  tips={customTips}
  backgroundColor="#F8F9FA"
  borderColor={COLORS.primary}
/>;
```

## Utility Functions

```tsx
import {TipUtils} from '@/components/TipsCard';

// Quick single tip
const quickTip = TipUtils.createQuickTip(
  'Save frequently to avoid losing work',
);

// Empty state tips
const emptyTips = TipUtils.createEmptyStateTips('project');

// Validation tips
const validationTips = TipUtils.createValidationTips();
```

## Accessibility

- All tips include proper semantic markup
- Dismiss buttons have adequate hit targets
- Color contrast meets WCAG guidelines
- Screen reader friendly

## Performance

- Tips are rendered only when visible
- Animations use native driver for smooth performance
- AsyncStorage operations are optimized
- Minimal re-renders with proper memoization
