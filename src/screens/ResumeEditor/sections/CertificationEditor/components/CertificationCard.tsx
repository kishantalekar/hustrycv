import {View, TouchableOpacity, Text} from 'react-native';
import {CustomIcon, TextInput, Button, DateInput} from '@/components';
import {styles} from './CertificationCard.styles';

interface CertificationCardProps {
  cert: {
    id: string;
    name: string;
    authority: string;
    certificationUrlOrCode: string;
    date: string;
  };
  toggleExpand: (id: string) => void;
  expandedItemId: string;
  updateCertification: (id: string, data: any) => void;
  removeCertification: (id: string) => void;
}
export function CertificationCard({
  cert,
  toggleExpand,
  expandedItemId,
  updateCertification,
  removeCertification,
}: Readonly<CertificationCardProps>) {
  return (
    <View key={cert.id} style={styles.certificationCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => toggleExpand(cert.id)}>
        <View>
          <Text style={styles.certificationName}>
            {cert.name || 'New Certification'}
          </Text>
        </View>
        <CustomIcon
          name={expandedItemId === cert.id ? 'expand-less' : 'expand-more'}
          size={24}
          color="#666"
        />
      </TouchableOpacity>
      {expandedItemId === cert.id && (
        <View style={styles.cardContent}>
          <TextInput
            label="Certification Name"
            placeholder="Enter certification name"
            value={cert.name}
            onChangeText={text =>
              updateCertification(cert.id, {...cert, name: text})
            }
          />
          <TextInput
            label="Authority"
            placeholder="Enter issuing authority"
            value={cert.authority}
            onChangeText={text =>
              updateCertification(cert.id, {...cert, authority: text})
            }
          />
          <TextInput
            label="Certification URL/Code"
            placeholder="Enter URL or certification code"
            value={cert.certificationUrlOrCode}
            onChangeText={text =>
              updateCertification(cert.id, {
                ...cert,
                certificationUrlOrCode: text,
              })
            }
          />
          <DateInput
            label="Issue Date"
            date={cert.date}
            onDateChange={date =>
              updateCertification(cert.id, {
                ...cert,
                date,
              })
            }
          />
          <Button
            title="Delete"
            onPress={() => removeCertification(cert.id)}
            variant="danger"
          />
        </View>
      )}
    </View>
  );
}
