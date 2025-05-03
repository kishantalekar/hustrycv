import {View, TouchableOpacity, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Checkbox, DateInputRow} from '@/components';
import {TextInput} from '@/components/TextInput';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import {EducationItem} from '@/types';
import {styles} from './EducationEditor.styles';

interface EducationCardProps {
  edu: EducationItem;
  toggleExpand: (id: string) => void;
  expandedItems: any;
  updateEducation: (id: string, data: any) => void;
  removeEducation: (id: string) => void;
}
export function EducationCard({
  edu,
  toggleExpand,
  expandedItems,
  updateEducation,
  removeEducation,
}: Readonly<EducationCardProps>) {
  return (
    <View key={edu.id} style={styles.educationCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleExpand(edu.id)}>
        <View>
          <Text style={styles.institutionName}>
            {edu.institution.length ? edu.institution : 'Institute'}
          </Text>
          <Text style={styles.degree}>
            {edu.degree.length ? edu.degree : 'Degree'}
          </Text>
          {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
        </View>
        <Icon
          name={expandedItems[edu.id] ? 'expand-less' : 'expand-more'}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
      {expandedItems[edu.id] && (
        <View style={styles.cardContent}>
          <TextInput
            label="Institution Name"
            value={edu.institution}
            onChangeText={text =>
              updateEducation(edu.id, {...edu, institution: text})
            }
          />
          <TextInput
            label="Degree"
            value={edu.degree}
            onChangeText={text =>
              updateEducation(edu.id, {...edu, degree: text})
            }
          />
          <TextInput
            label="Location"
            value={edu.location}
            onChangeText={text =>
              updateEducation(edu.id, {
                ...edu,
                location: text,
              })
            }
            leftIcon="location-on"
            helperText="Optional"
          />
          <Divider style={globalStyles.divider} />
          <DateInputRow
            startDate={edu.startDate}
            endDate={edu.endDate}
            onStartDateChange={text =>
              updateEducation(edu.id, {
                ...edu,
                startDate: text,
              })
            }
            onEndDateChange={text =>
              updateEducation(edu.id, {
                ...edu,
                endDate: text,
              })
            }
            current={edu.current}
          />
          <Checkbox
            checked={edu.current}
            onValueChange={isCurrentlyStudying => {
              updateEducation(edu.id, {
                ...edu,
                current: isCurrentlyStudying,
                endDate: isCurrentlyStudying ? 'Present' : edu.endDate,
              });
            }}
            label="I am currently studying here"
            color={COLORS.primary}
          />
          <Divider style={globalStyles.divider} />
          <TextInput
            label="GPA"
            helperText="Enter your GPA or %"
            value={edu.gpa}
            onChangeText={text => updateEducation(edu.id, {...edu, gpa: text})}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeEducation(edu.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
