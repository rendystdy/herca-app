import { StyleSheet, Text, View, Modal, TextInput, KeyboardAvoidingView, TextInputProps, Pressable, TouchableOpacity, Button} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface IFormAttendance {
  visible: boolean,
  onRequestClose: () => void,
  onSubmit: (data:IData) => void
}

interface IData {
  name: string,
  date: string,
  clock_in: string,
  clock_out: string,
  user_id?: number
}

interface IInput extends TextInputProps {
  title: string,
  value: string,
  onChangeText: (val: string) => void,
  type?: string,
  setShow?: () => void,
}

const Input: React.FC<IInput> = ({title, value, onChangeText, type, setShow, ...restofprops}) => {


  if (type === 'datetime') {
    return (
      <View style={styles.wrapperInput}>
        <Text style={styles.titleInput}>{title}</Text>
        <TouchableOpacity onPress={setShow} style={styles.buttonShow} activeOpacity={0.8} />
        <TextInput editable style={styles.input} value={value} onChangeText={(val) => onChangeText(val)} {...restofprops} />
      </View>
    )
  }

  return (
    <View style={styles.wrapperInput}>
      <Text style={styles.titleInput}>{title}</Text>
      <TextInput style={styles.input} value={value} onChangeText={(val) => onChangeText(val)} {...restofprops} />
    </View>
  )
}

const FormAttendance: React.FC<IFormAttendance> = ({visible, onRequestClose, onSubmit}) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | any>(new Date());
  const [clockin, setClockIn] = useState<Date | any>(new Date());
  const [clockout, setClockOut] = useState<Date | any>(new Date());
  const [mode, setMode] = useState<'date' | 'datetime' | 'time' | 'countdown'>();
  const [show, setShow] = useState(false);
  const [type, setType] = useState<'date' | 'clockin' | 'clockout'>('date');

  const formatedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatedTimeClockin = clockin.toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const formatedTimeClockOut = clockout.toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const onChange = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);

    if (type === 'date') {
      setDate(currentDate);
    }
    if (type === 'clockin') {
      setClockIn(currentDate);
    }
    if (type === 'clockout') {
      setClockOut(currentDate);
    }
    
    return;
  };

  const showMode = (currentMode: 'date' | 'datetime' | 'time' | 'countdown') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = (paramType: 'date' | 'clockin' | 'clockout') => {
    showMode('date');
    setType(paramType);
  };

  const showTimepicker = (paramType: 'date' | 'clockin' | 'clockout') => {
    showMode('time');
    setType(paramType);
  };

  if (!visible) {
    return null;
  }

  const valueDate = (val: 'date' | 'clockin' | 'clockout') => {
    if (val === 'date') {
      return date;
    }

    if (val === 'clockin') {
      return clockin;
    }

    if (val === 'clockout') {
      return clockout;
    }

    return;
  }
  return (
    <KeyboardAvoidingView behavior='padding'>
      <View style={styles.container}>
        <Modal transparent visible={visible} onRequestClose={onRequestClose}>
          <View style={styles.containerModal}>
            <View style={styles.content}>
              <Input value={name} title='Name' onChangeText={setName} placeholder='Name' />
              <Input value={formatedDate.toString()} title='Date' onChangeText={setDate} placeholder='Date' type='datetime' setShow={() => showDatepicker('date')} />
              <Input value={formatedTimeClockin.toString()} title='Clock in' onChangeText={setClockIn} placeholder='Clock in' type='datetime' setShow={() => showTimepicker('clockin')} />
              <Input value={formatedTimeClockOut.toString()} title='Clock out' onChangeText={setClockOut} placeholder='Clock out' type='datetime' setShow={() => showTimepicker('clockout')} />
              <Button title='Submit' onPress={() => {
                const data: IData = {
                  name,
                  date,
                  clock_in: clockin,
                  clock_out: clockout
                }
                return onSubmit(data);
              }} />
            </View>
          </View>
        </Modal>
      </View>
      {show && <DateTimePicker minimumDate={new Date()} value={valueDate(type)} mode={mode} onChange={onChange} />}
    </KeyboardAvoidingView>
  )
}

export default FormAttendance

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  wrapperInput: {
    // backgroundColor: 'red',
    padding: 8
  },
  titleInput: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8
  },
  buttonShow: { position: 'absolute', zIndex: 2, top: 0, left: 0, right: 0, bottom: 0}
})