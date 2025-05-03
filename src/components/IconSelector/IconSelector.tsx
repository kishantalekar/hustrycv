import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {CustomIcon} from '@/components/CustomIcon/CustomIcon';
import {TextInput} from '@/components/TextInput';
import {iconSets} from './iconSets';
import {IconVariant} from '../CustomIcon';

interface IconSelectorProps {
  onSelect: (icon: string, iconVariant: IconVariant) => void;
  onClose: () => void;
}

interface IconItem {
  name: string;
  variant: IconVariant;
}

const allIcons: IconItem[] = [
  ...iconSets.flatMap(set =>
    set.icons.map(icon => ({
      name: icon,
      variant: set.variant,
    })),
  ),
];

export function IconSelector({onSelect, onClose}: Readonly<IconSelectorProps>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredIcons = allIcons.filter(icon => {
    return icon.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Icon</Text>
        <TouchableOpacity onPress={onClose}>
          <CustomIcon variant="material" name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search icons..."
        leftIcon="search"
        style={styles.searchInput}
      />

      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={filteredIcons}
        numColumns={5}
        keyExtractor={item => `${item.variant}-${item.name}`}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onSelect(item.name, item.variant)}>
            <CustomIcon
              variant={item.variant || 'material'}
              name={item.name}
              size={24}
              color="#666"
            />
            {/* <Text style={styles.iconName}>{item.name}</Text> */}
          </TouchableOpacity>
        )}
        style={styles.iconGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  searchInput: {
    marginBottom: 16,
  },
  iconGrid: {
    flex: 1,
  },
  iconButton: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  iconName: {
    fontSize: 12,
    color: '#666',
    // marginTop: 4,
    textAlign: 'center',
  },
});
