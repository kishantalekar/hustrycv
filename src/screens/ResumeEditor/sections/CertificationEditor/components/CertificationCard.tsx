import {CardHeader, CollapsibleCard, DateInput, TextInput} from '@/components';
import {View} from 'react-native';

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
  const header = (
    <CardHeader
      title={cert.name}
      subtitle={cert.authority}
      titlePlaceholder="Certification name"
      subtitlePlaceholder="Issuing authority"
    />
  );
  return (
    <CollapsibleCard
      handleDelete={removeCertification}
      header={header}
      expanded={expandedItemId === cert.id}
      id={cert.id}
      onToggle={() => toggleExpand(cert.id)}>
      <View>
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
      </View>
    </CollapsibleCard>
  );
}
