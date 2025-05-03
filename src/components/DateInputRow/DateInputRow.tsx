import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {View, Modal, TouchableOpacity, Text, Platform} from 'react-native';
import {TextInput} from '@/components/TextInput';
import {styles} from './DateInputRow.styles';
import {DateInputRowProps} from './DateInputRow.types';

/**
 * A reusable component for displaying a row with start and end date inputs
 */
export function DateInputRow({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startDateHelperText = 'MM/YYYY',
  endDateHelperText = 'MM/YYYY or Present',
  style,
  current = false,
}: Readonly<DateInputRowProps>) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  // For iOS modal picker
  const [showModal, setShowModal] = useState(false);
  const [activeField, setActiveField] = useState<'start' | 'end' | null>(null);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowStartPicker(false);
      setShowEndPicker(false);
    }

    if (selectedDate) {
      const formattedDate = `${
        selectedDate.getMonth() + 1
      }/${selectedDate.getFullYear()}`;
      if (activeField === 'start') {
        onStartDateChange(formattedDate);
      } else if (activeField === 'end') {
        onEndDateChange(formattedDate);
      }
    }
  };

  const openPicker = (field: 'start' | 'end') => {
    setActiveField(field);
    if (Platform.OS === 'ios') {
      setShowModal(true);
    } else {
      if (field === 'start') {
        setShowStartPicker(true);
      } else {
        setShowEndPicker(true);
      }
    }
  };

  const handleClear = () => {
    if (activeField === 'start') {
      onStartDateChange('');
    } else if (activeField === 'end') {
      onEndDateChange('');
    }
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
    <View style={[styles.row, style]}>
      <TouchableOpacity
        style={styles.flex1}
        onPress={() => openPicker('start')}
        activeOpacity={0.7}>
        <TextInput
          label="Start Date"
          value={startDate}
          onChangeText={onStartDateChange}
          leftIcon="event"
          helperText={startDateHelperText}
          containerStyle={styles.flex1}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.flex1}
        onPress={() => openPicker('end')}
        activeOpacity={0.7}>
        <TextInput
          label={current ? 'Status' : 'End Date'}
          value={endDate}
          onChangeText={onEndDateChange}
          leftIcon="event"
          helperText={endDateHelperText}
          containerStyle={styles.flex1}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {/* Android date pickers */}
      {Platform.OS === 'android' && showStartPicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) {
              setTempDate(date);
              handleDateChange(event, date);
            }
          }}
        />
      )}

      {Platform.OS === 'android' && showEndPicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) {
              setTempDate(date);
              handleDateChange(event, date);
            }
          }}
        />
      )}

      {/* iOS modal picker */}
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
