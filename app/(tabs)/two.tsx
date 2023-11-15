import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

import FormAttendance from '../../components/FormAttendance';
import { Text, View } from '../../components/Themed';
import Attendance from '../../constants/Attendance';
import Users from '../../constants/Users';

interface IItem {
  item: {
      user_id: number;
      date: string;
      clock_in: string;
      clock_out: string;
  }
}

interface IUser {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  email: string;
}

interface IData {
  name: string,
  date: string,
  clock_in: string,
  clock_out: string,
  user_id?: number
}

export default function TabTwoScreen() {
  const [listOfAttendance, setListOfAttendance] = useState(Attendance.data);
  const [users, setUsers] = useState(Users.data);
  const [visible, setVisible] = useState(false);
  
  const setModal = () => {
    setVisible(!visible);
  }
  const getNameByUserId = (userId: number) => {
    const result = Users.data.filter(item => item.id === userId);
  
    return result.length > 0 ? result[0].name : 'Uknown';
  }

  const handleSubmit = (data: IData) => {
    console.log('data', data)
    const dataUsers = users;

    const payloadUser: IUser = {
      avatar: "https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg?w=826",
      email: 'xxx@gmail.com',
      id: listOfAttendance.length + 1,
      name: data.name,
      phone: '08XXX-XXX-XXX'
    }

    dataUsers.push(payloadUser);

    setUsers(dataUsers);

    const formatedDate = data.date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  
    const formatedTimeClockin = data.clock_in.toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  
    const formatedTimeClockOut = data.clock_out.toLocaleDateString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });

    const payload: any = {
      clock_in: formatedTimeClockin.toString(),
      clock_out: formatedTimeClockOut.toString(),
      date: formatedDate.toString(),
      user_id: listOfAttendance.length + 1
    }
    const listAttandance = listOfAttendance;

    listAttandance.push(payload);


    setListOfAttendance(listAttandance);
    setVisible(false);
  }

  const renderItem = ({item}: IItem) => {
    return (
      <View style={styles.wrapper}>
        <Text>{getNameByUserId(item.user_id)}</Text>
        <View style={styles.separator} />
        <View>
          <View style={styles.row}>
            <Text style={styles.title}>Date:</Text>
            <Text>{item.date}</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.row, {marginRight: 8}]}>
              <Text style={styles.title}>Clock in:</Text>
              <Text style={{width:60}} numberOfLines={1}>{item.clock_in}</Text>
            </View>
            <View style={[styles.row, {marginRight: 8}]}>
              <Text style={styles.title}>Clock out:</Text>
              <Text style={{width:60}} numberOfLines={1}>{item.clock_out}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={setModal}>
        <Text style={styles.textButton}>Add</Text>
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 6
        }}
        data={listOfAttendance}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        keyExtractor={(_, i) => i.toString()}
      />
      <FormAttendance visible={visible} onRequestClose={setModal} onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8
  },
  separator: {
    // marginVertical: 30,
    height: '100%',
    width: 1,
    backgroundColor: 'black'
  },
  wrapper: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  gap: {
    height: 6
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: 'lightblue',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 12
  },
  textButton: {
    fontWeight: '600',
    fontSize: 18,
    letterSpacing: 1,
  }
});
