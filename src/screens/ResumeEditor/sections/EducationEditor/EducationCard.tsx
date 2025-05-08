import {
  CardHeader,
  Checkbox,
  CollapsibleCard,
  DateInputRow,
} from '@/components';
import {TextInput} from '@/components/TextInput';
import {globalStyles} from '@/styles/globalStyles';
import {COLORS} from '@/theme';
import {EducationItem} from '@/types';
import {View} from 'react-native';
import {Divider} from 'react-native-paper';

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
  const header = (
    <CardHeader
      title={edu.institution}
      subtitle={edu.degree}
      location={edu.location}
      titlePlaceholder="Institution Name"
      subtitlePlaceholder="Degree"
    />
  );
  return (
    <CollapsibleCard
      expanded={expandedItems[edu.id]}
      onToggle={() => toggleExpand(edu.id)}
      header={header}
      id={edu.id}
      handleDelete={removeEducation}>
      <View>
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
          onChangeText={text => updateEducation(edu.id, {...edu, degree: text})}
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
      </View>
    </CollapsibleCard>
  );
}
