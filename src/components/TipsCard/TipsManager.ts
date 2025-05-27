import {TipItem} from './TipsCard.types';

// Predefined tip sets for different screens
export const TipSets = {
  swipe: [
    {
      icon: 'swipe',
      text: 'Swipe right to left to delete this item',
    },
  ],
  reorder: [
    {
      icon: 'drag-handle',
      text: 'Click the top right icon to rearrange the sections',
    },
  ],
  skills: [
    {
      icon: 'swipe',
      text: 'Swipe right to left to delete a skill',
    },
    {
      icon: 'drag-handle',
      text: 'Click the top right icon to rearrange skills',
    },
  ] as TipItem[],

  work: [
    {
      icon: 'add',
      text: 'Tap the + button to add work experience',
    },
    {
      icon: 'edit',
      text: 'Tap any field to edit your work details',
    },
    {
      icon: 'date-range',
      text: 'Use "Present" for your current job',
    },
  ] as TipItem[],

  education: [
    {
      icon: 'school',
      text: 'Add your most recent education first',
    },
    {
      icon: 'grade',
      text: "Include GPA only if it's above 3.5",
    },
  ] as TipItem[],

  projects: [
    {
      icon: 'code',
      text: 'Include links to live demos or repositories',
    },
    {
      icon: 'description',
      text: 'Focus on impact and technologies used',
    },
  ] as TipItem[],

  preview: [
    {
      icon: 'visibility',
      text: 'Tap templates to see how your resume looks',
    },
    {
      icon: 'download',
      text: "Download when you're happy with the design",
    },
  ] as TipItem[],

  dashboard: [
    {
      icon: 'add-circle',
      text: 'Create multiple resumes for different roles',
    },
    {
      icon: 'upload',
      text: 'Upload existing resume to get started quickly',
    },
  ] as TipItem[],

  onboarding: [
    {
      icon: 'swipe',
      text: 'Swipe or use arrows to navigate',
    },
    {
      icon: 'skip-next',
      text: "Skip anytime if you're ready to start",
    },
  ] as TipItem[],
};

// Context-aware tip suggestions
export class TipsManager {
  private static instance: TipsManager;
  private shownTips: Set<string> = new Set();

  static getInstance(): TipsManager {
    if (!TipsManager.instance) {
      TipsManager.instance = new TipsManager();
    }
    return TipsManager.instance;
  }

  // Get tips for a specific screen/context
  getTipsForContext(context: keyof typeof TipSets): TipItem[] {
    return TipSets[context] || [];
  }

  // Get contextual tips based on user state
  getContextualTips(context: {
    screen: string;
    hasData?: boolean;
    isFirstTime?: boolean;
    userLevel?: 'beginner' | 'intermediate' | 'advanced';
  }): TipItem[] {
    const {
      screen,
      hasData = false,
      isFirstTime = false,
      userLevel = 'beginner',
    } = context;

    // Return different tips based on context
    switch (screen) {
      case 'skills':
        if (!hasData) {
          return [
            {
              icon: 'add',
              text: 'Start by adding your top 5-8 skills',
            },
            {
              icon: 'star',
              text: 'Focus on skills relevant to your target job',
            },
          ];
        }
        return TipSets.skills;

      case 'work':
        if (!hasData) {
          return [
            {
              icon: 'work',
              text: 'Add your work experience starting with the most recent',
            },
            {
              icon: 'format-list-bulleted',
              text: 'Use bullet points to describe your achievements',
            },
          ];
        }
        return TipSets.work;

      default:
        return this.getTipsForContext(screen as keyof typeof TipSets);
    }
  }

  // Mark a tip as shown
  markTipAsShown(tipId: string): void {
    this.shownTips.add(tipId);
  }

  // Check if tip has been shown
  hasTipBeenShown(tipId: string): boolean {
    return this.shownTips.has(tipId);
  }

  // Get smart tips based on user behavior
  getSmartTips(userActions: {
    hasAddedItems?: boolean;
    hasEditedItems?: boolean;
    timeSpentOnScreen?: number;
    errorCount?: number;
  }): TipItem[] {
    const tips: TipItem[] = [];

    if (
      userActions.timeSpentOnScreen &&
      userActions.timeSpentOnScreen > 30000
    ) {
      tips.push({
        icon: 'help',
        text: 'Need help? Check our examples for inspiration',
      });
    }

    if (userActions.errorCount && userActions.errorCount > 2) {
      tips.push({
        icon: 'info',
        text: 'Take your time - you can always edit later',
      });
    }

    return tips;
  }
}

// Utility functions for common tip scenarios
export const TipUtils = {
  // Create a quick tip for floating display
  createQuickTip: (text: string, icon: string = 'lightbulb'): TipItem => ({
    icon,
    text,
  }),

  // Create tips for empty states
  createEmptyStateTips: (itemType: string): TipItem[] => [
    {
      icon: 'add',
      text: `Tap the + button to add your first ${itemType}`,
    },
    {
      icon: 'help',
      text: `Don't worry, you can always edit or remove ${itemType} later`,
    },
  ],

  // Create tips for form validation
  createValidationTips: (): TipItem[] => [
    {
      icon: 'check-circle',
      text: 'Required fields are marked with *',
    },
    {
      icon: 'save',
      text: 'Your progress is saved automatically',
    },
  ],
};
