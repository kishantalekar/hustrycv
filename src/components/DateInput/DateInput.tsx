import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {View, Modal, TouchableOpacity, Text, Platform} from 'react-native';
import {TextInput} from '@/components/TextInput';
import {styles} from './DateInput.styles';

interface DateInputProps {
  date: string;
  onDateChange: (date: string) => void;
  label?: string;
  helperText?: string;
  style?: any;
}

export function DateInput({
  date,
  onDateChange,
  label = 'Date',
  helperText = 'MM/YYYY',
  style,
}: Readonly<DateInputProps>) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (selectedDate) {
      const formattedDate = `${
        selectedDate.getMonth() + 1
      }/${selectedDate.getFullYear()}`;
      onDateChange(formattedDate);
    }
  };

  const openPicker = () => {
    if (Platform.OS === 'ios') {
      setShowModal(true);
    } else {
      setShowPicker(true);
    }
  };

  const handleClear = () => {
    onDateChange('');
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDone = () => {
    handleDateChange(null, tempDate);
    setShowModal(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={openPicker} activeOpacity={0.7}>
        <TextInput
          label={label}
          value={date}
          onChangeText={onDateChange}
          leftIcon="event"
          helperText={helperText}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowPicker(false);
            if (date) {
              setTempDate(date);
              handleDateChange(event, date);
            }
          }}
        />
      )}

      {Platform.OS === 'ios' && showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClear}
                  style={styles.pickerButton}>
                  <Text style={styles.pickerButtonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDone}
                  style={styles.pickerButton}>
                  <Text style={[styles.pickerButtonText, styles.doneButton]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={(event, date) => {
                  if (date) {
                    setTempDate(date);
                  }
                }}
                style={styles.picker}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
