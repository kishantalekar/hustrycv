import {CardHeader, CollapsibleCard, CustomIcon, TextInput} from '@/components';
import {FONTS} from '@/constants';
import {globalStyles} from '@/styles';
import {COLORS} from '@/theme';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface HobbiesCardProps {
  hobbie: HobbieItem;
  toggleExpand: (id: string) => void;
  expandedItemId: string;
  updateHobbie: (id: string, data: any) => void;
  removeHobbie: (id: string) => void;
  isDraggableListVisible: boolean;
  drag?: () => void;
  openIconSelector: () => void;
}
export const HobbiesCard = ({
  hobbie,
  onPress,
  toggleExpand,
  expandedItemId,
  updateHobbie,
  removeHobbie,
  isDraggableListVisible,
  drag,
  openIconSelector,
}: HobbiesCardProps) => {
  const header = (
    <CardHeader
      title={hobbie?.name}
      //   subtitle={hobbie?.keywords.join(', ')}
      titlePlaceholder="Hobbie name"
      subtitlePlaceholder="Keywords"
      rightIcon={isDraggableListVisible ? 'drag-handle' : undefined}
      containerStyle={isDraggableListVisible ? globalStyles.card : undefined}
    />
  );
  if (isDraggableListVisible) {
    return <TouchableOpacity onPressIn={drag}>{header}</TouchableOpacity>;
  }
  console.log('hobbie', hobbie.link);
  return (
    <CollapsibleCard
      handleDelete={removeHobbie}
      header={header}
      expanded={expandedItemId === hobbie.id}
      id={hobbie.id}
      onToggle={() => toggleExpand(hobbie.id)}>
      <View>
        <TextInput
          label="Name"
          placeholder=""
          value={hobbie?.name}
          onChangeText={text =>
            updateHobbie(hobbie.id, {...hobbie, name: text})
          }
        />

        <TouchableOpacity
          style={styles.iconSelectorButton}
          onPress={() => openIconSelector()}>
          <CustomIcon
            variant={hobbie?.link?.iconVariant}
            name={hobbie?.link?.icon ?? 'link'}
            size={20}
            color={COLORS.text.secondary}
          />
          <Text style={styles.iconSelectorText}>Change Icon</Text>
        </TouchableOpacity>
      </View>
    </CollapsibleCard>
  );
};

const styles = StyleSheet.create({
  //   keywordsList: {
  //     flexDirection: 'row',
  //     flexWrap: 'wrap',
  //     gap: SPACING.sm,
  //   },

  iconSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  iconSelectorText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text.secondary,
    fontFamily: FONTS.FIRA_SANS.REGULAR,
  },
});

// for keywords input code , incase needed
// eslint-disable-next-line no-lone-blocks
{
  /* <TextInput
          label="Keywords"
          helperText="You can add multiple keywords by separating them with a comma or pressing enter."
          value={keyword}
          onChangeText={text => {
            // if the text includes comma then Split the text by comma and get the first part without comma and then add it to the keywords array
            if (text.includes(',') && text.trim().length > 0) {
              const word = text.split(',')[0].trim();
              const updatedKeywords = [...hobbie.keywords, word];
              updateHobbie(hobbie.id, {...hobbie, keywords: updatedKeywords});
              setKeyword('');
            } else {
              setKeyword(text);
            }
          }}
          onSubmitEditing={() => {
            if (keyword.trim()) {
              const updatedKeywords = [...hobbie.keywords, keyword.trim()];
              updateHobbie(hobbie.id, {...hobbie, keywords: updatedKeywords});
              setKeyword('');
            }
          }}
        /> */
}

{
  /* <View style={styles.keywordsList}>
          {hobbie?.keywords &&
            hobbie?.keywords?.map((keys, index) => (
              <KeywordItem
                key={index}
                keyword={keys}
                onRemove={() =>
                  updateHobbie(hobbie.id, {
                    ...hobbie,
                    keywords: hobbie.keywords?.filter((_, i) => i !== index),
                  })
                }
              />
            ))}
        </View> */
}
