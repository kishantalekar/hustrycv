/**
 * TemplateSelector — Phase 6.2 Redesign
 *
 * Improvements over the old component:
 *   - Category filter pills: All | Professional | Minimal | Modern | Creative | Technical
 *   - "Featured" and "New" badges on cards
 *   - 2-column grid with taller thumbnail (110 → 150px)
 *   - Smooth selection ring with primary color
 *   - Count badge showing number of templates per filter
 *   - Uses TemplateCategory directly from the engine types
 */

import React, {useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDER_RADIUS, COLORS, SHADOW, SPACING, TYPOGRAPHY} from '@/theme';
import {FONTS} from '@/constants';
import type {TemplateCategory} from '@/templates/engine/templateTypes';

// ─── Types ────────────────────────────────────────────────────────────────────

type Template = {
  id: string;
  name: string;
  image: any;
  category?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  getHTML: (data: any) => string;
};

type TemplateSelectorProps = {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  templates: Template[];
};

// ─── Category Pill Config ────────────────────────────────────────────────────

type FilterCategory = 'all' | TemplateCategory;

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: 'All',
  professional: 'Professional',
  minimal: 'Minimal',
  modern: 'Modern',
  creative: 'Creative',
  technical: 'Technical',
};

const FILTER_ORDER: FilterCategory[] = [
  'all',
  'professional',
  'modern',
  'minimal',
  'creative',
  'technical',
];

// ─── Category Pill ────────────────────────────────────────────────────────────

const CategoryPill = ({
  label,
  count,
  isActive,
  onPress,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.pill, isActive && styles.pillActive]}
    activeOpacity={0.7}>
    <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
      {label}
    </Text>
    <View style={[styles.pillBadge, isActive && styles.pillBadgeActive]}>
      <Text style={[styles.pillBadgeText, isActive && styles.pillBadgeTextActive]}>
        {count}
      </Text>
    </View>
  </TouchableOpacity>
);

// ─── Template Card ────────────────────────────────────────────────────────────

const TemplateCard = ({
  template,
  isSelected,
  onPress,
}: {
  template: Template;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.card, isSelected && styles.cardSelected]}
    onPress={onPress}
    activeOpacity={0.8}>
    {/* Thumbnail */}
    <View style={styles.imageContainer}>
      <Image source={template.image} style={styles.image} resizeMode="cover" />

      {/* Selection checkmark overlay */}
      {isSelected && (
        <View style={styles.selectedOverlay}>
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        </View>
      )}

      {/* Badges — top-right corner */}
      <View style={styles.badgeStack}>
        {template.isFeatured && (
          <View style={[styles.badge, styles.badgeFeatured]}>
            <Text style={styles.badgeText}>⭐</Text>
          </View>
        )}
        {template.isNew && (
          <View style={[styles.badge, styles.badgeNew]}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
      </View>
    </View>

    {/* Name */}
    <Text style={[styles.cardName, isSelected && styles.cardNameSelected]} numberOfLines={1}>
      {template.name}
    </Text>
  </TouchableOpacity>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
  templates,
}: TemplateSelectorProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Count per category (including 'all')
  const counts = useMemo(() => {
    const map: Record<string, number> = {all: templates.length};
    templates.forEach(t => {
      if (t.category) {
        map[t.category] = (map[t.category] ?? 0) + 1;
      }
    });
    return map;
  }, [templates]);

  // Filtered list
  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? templates
        : templates.filter(t => t.category === activeFilter),
    [templates, activeFilter],
  );

  return (
    <View style={styles.container}>
      {/* Title row */}
      <Text style={styles.title}>Choose a Template</Text>
      <Text style={styles.subtitle}>{templates.length} templates available</Text>

      {/* Category filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
        style={styles.pillsScroll}>
        {FILTER_ORDER.filter(f => (counts[f] ?? 0) > 0).map(filter => (
          <CategoryPill
            key={filter}
            label={FILTER_LABELS[filter]}
            count={counts[filter] ?? 0}
            isActive={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      {/* Template grid */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        scrollEnabled={false}
        renderItem={({item}) => (
          <TemplateCard
            template={item}
            isSelected={selectedTemplate === item.id}
            onPress={() => onSelectTemplate(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No templates in this category yet.</Text>
          </View>
        }
        contentContainerStyle={styles.gridContent}
      />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.size.xl,
    fontFamily: FONTS.FIRA_SANS.SEMIBOLD,
    color: COLORS.text.primary,
    marginHorizontal: SPACING.md,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },

  // ── Category Pills ──────────────────────────────────────────────────────────
  pillsScroll: {
    marginBottom: SPACING.md,
  },
  pillsRow: {
    paddingHorizontal: SPACING.md,
    gap: 8,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background.secondary,
    gap: 5,
  },
  pillActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pillText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontFamily: FONTS.FIRA_SANS.SEMIBOLD,
  },
  pillBadge: {
    backgroundColor: COLORS.background.tertiary,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
  },
  pillBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  pillBadgeText: {
    fontSize: 10,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
  },
  pillBadgeTextActive: {
    color: '#FFFFFF',
  },

  // ── Grid ────────────────────────────────────────────────────────────────────
  gridContent: {
    paddingHorizontal: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  gridRow: {
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },

  // ── Card ────────────────────────────────────────────────────────────────────
  card: {
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background.secondary,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOW.light,
  },
  cardSelected: {
    borderColor: COLORS.primary,
  },
  imageContainer: {
    width: '100%',
    height: 155,
    position: 'relative',
    backgroundColor: COLORS.background.tertiary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: `${COLORS.primary}22`,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 6,
  },
  checkmark: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  badgeStack: {
    position: 'absolute',
    top: 6,
    right: 6,
    gap: 4,
    alignItems: 'flex-end',
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  badgeFeatured: {
    backgroundColor: '#FEF3C7',
  },
  badgeNew: {
    backgroundColor: COLORS.primary,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.primary,
  },
  cardName: {
    fontSize: TYPOGRAPHY.size.sm,
    fontFamily: FONTS.FIRA_SANS.MEDIUM,
    color: COLORS.text.secondary,
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlign: 'center',
  },
  cardNameSelected: {
    color: COLORS.primary,
    fontFamily: FONTS.FIRA_SANS.SEMIBOLD,
  },

  // ── Empty ───────────────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.text.secondary,
  },
});
