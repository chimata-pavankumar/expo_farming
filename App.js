import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ToastAndroid, Keyboard, FlatList, Modal, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Total from './screens/total';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Menu from './screens/logomenu';
const Stack = createStackNavigator();
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { BlurView } from 'expo-blur';
import * as yup from 'yup';


function Separator() {
  return <View style={styles.separator} />;
}

function DataTransfer({ details, navigation }) {

  return (
    <View >
      <FlatList
        data={details}
        renderItem={({ item }) => (

          <TouchableOpacity onPress={() => navigation.navigate('IndividualsInfo', details)} style={{ height: 40, flexDirection: 'row', backgroundColor: 'orangered', borderRadius: 3, }}>
            <View style={{ flex: 3, marginLeft: 5 }} >
              <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
            </View>
          </TouchableOpacity>

        )}
        keyExtractor={(item) => (parseInt(item.id) + 1).toString()}

      />
    </View>
  )
}



function CustomHeader({ navigation, header }) {
  return (
    <View style={{ flexDirection: 'row', height: 60, borderWidth: 1, borderColor: '#101010' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 21, fontWeight: 'bold', color: 'red' }}>{header}</Text></View>
    </View>
  )
}


function CustomHead({ navigation, header }) {
  return (
    <View style={{ flexDirection: 'row', height: 60, borderWidth: 1, borderColor: '#101010' }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
        <Ionicons name="md-arrow-round-back" size={28} color="yellowgreen" />
      </TouchableOpacity>

      <View style={{ flex: 1.5, alignItems: 'center' }}><Text style={{ fontSize: 21, fontWeight: 'bold', color: 'red' }}>{header}</Text></View>
      <View style={{ flex: 1 }}></View>

    </View>
  )
}


function Customindividual({ navigation, header }) {
  return (
    <View style={{ flexDirection: 'row', height: 60, }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1, paddingLeft: 10, paddingTop: 5 }}>
        <Ionicons name="md-arrow-round-back" size={28} color="yellowgreen" />
      </TouchableOpacity>

      <View style={{ flex: 7, alignItems: 'center', marginRight: 15, marginTop: 5 }}><Text style={{ fontSize: 21, fontWeight: 'bold', color: 'red' }}>{header}</Text></View>

    </View>
  )
}


function Home({ navigation }) {

  const [datevisiblity, setDatevisibility] = useState(false);
  const [choosedate, setChoosedate] = useState('DD-MM-YYYY');
  const datecancel = () => {
    setDatevisibility(false);
  }
  const dateconfirm = (date) => {

    const data = moment(date).format('MMMM, Do')
    setChoosedate(data.toString());
    datecancel();
  }

  const touchshow = () => {
    setDatevisibility(true);
  }
  const [checked, setChecked] = useState('2');
  console.log({ choosedate });
  const wheel = { checked };
  const [details, setDetails] = useState([{ id: '1', name: 'Touch here for data', place: 'place', hour: '1', minutes: '10', choosedate: [{ choosedate }['choosedate']], wheeler: ['2'] }]);
  const nData = (data) => {
    setDetails((prevDetails) => {
      return [{ name: data.name, place: data.place, hour: data.hour, minutes: data.minutes, choosedate: choosedate, wheeler: checked, id: (parseInt(prevDetails.id) + 1).toString() },
      ...prevDetails];
    });
  }

  const errorhandler = yup.object({

    name: yup.string().required().min(3),
    place: yup.string().required().min(3),
    hour: yup.string().required().min(1),
    minutes: yup.string().required().min(1),
  })

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, backgroundColor: '#101010' }}>
        <View style={{ marginTop: Constants.statusBarHeight, marginBottom: 0 }}>
          <CustomHeader navigation={navigation} header={'HOME'} style={{ marginTop: Constants.statusBarHeight }} />
          <Text style={{ color: 'white', fontSize: 23, fontWeight: "bold", textAlign: 'center', marginVertical: 10 }}>Enter Details</Text>


          <Formik
            initialValues={{ name: '', place: '', hour: '', minutes: '', choosedate: { choosedate }['choosedate'], checked: { checked }['checked'] }}
            validationSchema={errorhandler}
            onSubmit={(values, actions) => {
              nData(values);
              actions.resetForm();
            }}
          >
            {(props) => (
              <View style={{ padding: 38, paddingBottom: 10, paddingTop: 0 }}>
                <TextInput
                  style={styles.textinput, { borderWidth: 1, height: 40, color: 'white', backgroundColor: '#191919', borderBottomColor: 'white', borderRadius: 7 }}
                  placeholder='Enter Name'
                  onChangeText={props.handleChange('name')}
                  value={props.values.name}
                />
                <Text style={{ fontSize: 10, color: 'white' }}>{props.touched.name && props.errors.name}</Text>
                <TextInput
                  style={styles.textinput, { borderWidth: 1, height: 40, color: 'white', backgroundColor: '#191919', borderBottomColor: 'white', borderRadius: 7 }}

                  placeholder='Enter place'
                  onChangeText={props.handleChange('place')}
                  value={props.values.place}
                />
                <Text style={{ fontSize: 10, color: 'white', marginBottom: 10 }}>{props.touched.place && props.errors.place}</Text>
                <View style={{ flexDirection: 'row', marginBottom: 0, height: 40, }}>
                  <View style={{ flex: 1 }}>
                    <TextInput

                      style={[styles.textinput, { alignItems: 'center', color: 'white', marginRight: 5, textAlign: 'center', backgroundColor: '#191919', borderWidth: 1, borderRadius: 7, borderColor: '#191919', borderBottomColor: 'white' }]}
                      placeholder='Hour'
                      onChangeText={props.handleChange('hour')}

                      value={props.values.hour}
                      keyboardType='numeric'
                    />

                  </View>

                  <View style={{ flex: 1 }}>
                    <TextInput
                      style={[styles.textinput, { marginBottom: 0, marginLeft: 5, color: 'white', textAlign: 'center', backgroundColor: '#191919', borderWidth: 1, borderColor: '#191919', borderBottomColor: 'white', borderRadius: 7 }]}
                      placeholder='Minutes'
                      onChangeText={props.handleChange('minutes')}
                      defaultValue='0'
                      value={props.values.minutes}
                      keyboardType='numeric'
                    />

                  </View>

                </View>
                <View style={{ flexDirection: 'row', marginBottom: 3 }}>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 10, color: 'white' }}>{props.touched.hour && props.errors.hour}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: 10, color: 'white' }}>{props.touched.minutes && props.errors.minutes}</Text>
                  </View>
                </View>


                <DateTimePickerModal
                  isVisible={datevisiblity}
                  onConfirm={dateconfirm}
                  onCancel={datecancel}
                  mode={'date'}
                  datePickerModeAndroid={'spinner'}
                />
                <View style={{ flexDirection: 'row', height: 40, marginBottom: 15, backgroundColor: '#191919', borderWidth: 1, borderBottomColor: 'white', borderRadius: 7 }}>
                  <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={touchshow}><Text style={{ fontSize: 20, color: 'white' }}>Tap For Date :</Text></TouchableOpacity>
                  <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{choosedate}</Text></View>
                </View>


                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <View style={{ flex: 1, flexDirection: 'row', marginRight: 9 }}>
                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919', borderWidth: 1, borderColor: '#191919', borderBottomColor: 'white' }}>
                      <Text style={{ color: 'white' }}>2 Wheeler</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#191919', borderWidth: 1, borderBottomColor: 'white', borderColor: '#191919', alignItems: 'center' }}>
                      <RadioButton
                        value="2"
                        status={checked === '2' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('2')}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                    <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919', borderWidth: 1, borderColor: '#191919', borderBottomColor: 'white' }}>
                      <Text style={{ color: 'white' }}>4 Wheeler</Text>
                    </View>
                    <View style={{
                      flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#191919', borderWidth: 1, borderColor: '#191919', borderBottomColor: 'white'
                    }}>
                      <RadioButton
                        value="4"
                        status={checked === '4' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('4')}
                      />
                    </View>
                  </View>
                </View>


                <Button title="Submit" color='red' onPress={props.handleSubmit} />

              </View>
            )}
          </Formik>

        </View>

        <Separator />

        <FlatList
          data={details}
          renderItem={({ item }) => (

            <TouchableOpacity onPress={() => navigation.navigate('IndividualsInfo', item)} style={{ height: 48, flexDirection: 'row', backgroundColor: '#191919', borderRadius: 3, }}>
              <View style={{ flex: 4, marginLeft: 5, justifyContent: 'center' }} >
                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
              </View>
              <TouchableHighlight style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AntDesign name='caretdown' size={18} color="white" />
              </TouchableHighlight>
            </TouchableOpacity>

          )}
          keyExtractor={(item) => item.id}
        />
        <Button title='See All' onPress={() => navigation.navigate('Member', details)} />
      </View>
    </TouchableWithoutFeedback >

  );
}


function Members({ route, navigation }) {
  const detail = route.params;
  const showToastNoData = () => {

    ToastAndroid.show("No Data To Refresh", ToastAndroid.SHORT);
  };
  const showToastError = () => {
    ToastAndroid.show("Data Error", ToastAndroid.SHORT);
  };
  const showToastRefreshed = () => {
    ToastAndroid.show("Data Refreshed", ToastAndroid.SHORT);
  };



  return (

    <View style={{ flex: 1, backgroundColor: '#101010' }}>
      <View style={{ marginTop: Constants.statusBarHeight, flex: 1, marginBottom: 100 }}>
        <CustomHead navigation={navigation} header={'Members'} />

        <FlatList
          data={detail}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.text} onPress={() => navigation.navigate('IndividualsInfo', item)} >

              <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>

            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

    </View >

  );
}



function Finalamount({ detai }) {
  const [num, setNum] = useState(0);
  const [mnny, setMnny] = useState(0);
  const showToastData = () => {

    ToastAndroid.show("Data Added", ToastAndroid.SHORT);
  };
  if (detai[num]) {
    if ((detai[0].wheeler).toString() === '2') {
      setMnny(mnny + (detai[0].hour * 1800) + (detai[0].minutes * 30));
      setNum(num + 1);
    } else {
      setMnny(mnny + (detai[0].hour * 2400) + (detai[0].minutes * 40));
      setNum(num + 1);
    }
  } else {
    showToastData();
  }
  return (
    <View><Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', color: 'yellowgreen' }}>TOTAL AMOUNT :   {mnny}</Text></View>
  )
}

function IndividualsInfo({ route, navigation }) {
  const details = route.params;
  const [datevisiblity, setDatevisibility] = useState(false);
  const [choosedate, setChoosedate] = useState('DD-MM-YYYY');
  const [detai, setDetai] = useState([
    { id: details.id, hour: details.hour, minutes: details.minutes, choosedate: details.choosedate, wheeler: details.wheeler },
  ]);

  const datecancel = () => {
    setDatevisibility(false);
  }
  const dateconfirm = (date) => {

    const data = moment(date).format('MMMM, Do')
    setChoosedate(data.toString());
    datecancel();
  }

  const touchshow = () => {
    setDatevisibility(true);
  }
  const [checked, setChecked] = useState('2');

  const [model, setModel] = useState(false);

  const nData = (data) => {
    setModel(false);

    setDetai((prevDetai) => {
      return [{ hour: data.hour, minutes: data.minutes, choosedate: choosedate, wheeler: checked },
      ...prevDetai];
    });

  }


  return (
    <View style={{ flex: 1, backgroundColor: '#101010' }}>
      <View style={{ marginTop: Constants.statusBarHeight, flex: 1, marginBottom: 100 }}>
        <Customindividual navigation={navigation} header={'IndividualsInfo'} />

        <TouchableOpacity onPress={() => setModel(true)} style={{ alignItems: 'flex-end', paddingRight: 15 }}><Ionicons name="md-add" size={24} color="yellowgreen" /></TouchableOpacity>

        <View >
          <View style={{ margin: 15 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>NAME : {details.name}</Text>
          </View>
          <View style={{ margin: 15, marginTop: 0 }}>

            <Text style={{ color: 'white', fontSize: 15 }}>PLACE : {details.place}</Text>

          </View>

          <View style={{ marginLeft: 15, marginBottom: 5 }}>
            <Finalamount detai={detai} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 40, borderRadius: 10, borderWidth: 1, backgroundColor: 'red', borderColor: 'black' }}>
          <View style={{ flex: 1, alignItems: 'center', padding: 0 }}>
            <Text style={{ color: 'white', fontWeight: "bold", fontSize: 15 }}>DATE</Text>

            <View style={{ backgroundColor: 'black', borderWidth: 1, borderTopLeftRadius: 8, width: '100%', alignItems: 'center' }}>

              <FlatList
                data={detai}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, alignItems: 'center', }}>

                    <Text style={{ padding: 8, color: 'white', fontSize: 15, flexDirection: "row" }}>{item.choosedate}</Text>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>

          </View>
          <View style={{ flex: .5, alignItems: 'center', paddingBottom: 1 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>TIME</Text>
            <View style={{ backgroundColor: 'black', borderWidth: 1, width: '100%', alignItems: 'center' }}>

              <FlatList
                data={detai}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, alignItems: 'center' }}>

                    <Text style={{ padding: 8, color: 'white', fontSize: 15, flexDirection: 'row' }}>{item.hour}h:{item.minutes}m</Text>

                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>

          <View style={{ flex: .5, alignItems: 'center', padding: 0 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>WHEELS</Text>
            <View style={{ backgroundColor: 'black', borderWidth: 1, width: '100%', alignItems: 'center' }}>

              <FlatList
                data={detai}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, alignItems: 'center' }}>

                    <Text style={{ padding: 8, color: 'white', fontSize: 15, flexDirection: 'row' }}>{item.wheeler}</Text>

                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>

          <View style={{ flex: .5, alignItems: 'center', paddingBottom: 1 }}>
            <Text style={{ color: 'white', fontSize: 15 }}>MONEY</Text>
            <View style={{ backgroundColor: 'black', borderWidth: 1, borderTopRightRadius: 8, width: '100%', alignItems: 'center' }}>
              <FlatList
                data={detai}
                renderItem={({ item }) => (
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    {((item.wheeler).toString() === '2') ? <Text style={{ padding: 8, color: 'white', fontSize: 15, flexDirection: 'row' }}>{item.hour * 1800 + item.minutes * 30}</Text> : <Text style={{ padding: 8, color: 'white', fontSize: 15, flexDirection: 'row' }}>{item.hour * 2400 + item.minutes * 40}</Text>}

                  </View>
                )}
                keyExtractor={(item) => item.id}
              />


            </View>
          </View>

        </View>
      </View>

      <Modal visible={model} transparent={true} animationType={'slide'}>
        <BlurView intensity={140} tint='dark' style={[StyleSheet.absoluteFill, { height: 400, marginTop: 150, marginBottom: 200, marginLeft: 20, marginRight: 20, borderRadius: 10 }]}>
          <TouchableHighlight onPress={() => setModel(!model)} style={{ alignItems: 'flex-end' }}>
            <Entypo name="cross" size={40} color="red" />
          </TouchableHighlight>
          <View>
            <Text style={{ marginTop: Constants.statusBarHeight, textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white', marginBottom: 28 }}>Enter Details</Text>
            <Formik
              initialValues={{ hour: '', minutes: '', choosedate: { choosedate }['choosedate'], checked: { checked }['checked'] }}
              onSubmit={(values, actions) => {
                nData(values);
                actions.resetForm();
              }}
            >
              {(props) => (
                <View style={{ paddingLeft: 28, paddingRight: 28 }}>
                  <View style={{ flexDirection: 'row', marginBottom: 10, height: 38, }}>
                    <View style={{ flex: 1, }}>
                      <TextInput
                        style={[styles.textinput, { alignItems: 'center', color: 'white', backgroundColor: '#191919', marginRight: 5, textAlign: 'center', borderRadius: 7, }]}
                        placeholder='Hour'
                        onChangeText={props.handleChange('hour')}
                        value={props.values.hour}
                        keyboardType='numeric'
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <TextInput
                        style={[styles.textinput, { marginBottom: 30, marginLeft: 5, color: 'white', backgroundColor: '#191919', textAlign: 'center' }]}
                        placeholder='Minutes'
                        onChangeText={props.handleChange('minutes')}
                        value={props.values.minutes}
                        keyboardType='numeric'
                      />
                    </View>

                  </View>

                  <DateTimePickerModal
                    isVisible={datevisiblity}
                    onConfirm={dateconfirm}
                    onCancel={datecancel}
                    mode={'date'}
                    datePickerModeAndroid={'spinner'}
                  />
                  <View style={{ flexDirection: 'row', height: 40, marginBottom: 15, borderWidth: 1, borderColor: '#191919', borderBottomColor: 'white', borderRadius: 7 }}>
                    <TouchableNativeFeedback style={{ flex: 1, }} onPress={touchshow}><Text style={{ color: 'white', marginTop: 8, fontSize: 15, fontWeight: 'bold' }}>Tap For Date :</Text></TouchableNativeFeedback>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingLeft: 8, flex: 1, marginBottom: 15 }}><Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{choosedate}</Text></View>
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginRight: 9, borderWidth: 1, borderColor: '#191919', borderBottomColor: 'white', borderRadius: 7 }}>
                      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>2 Wheeler</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <RadioButton
                          value="2"
                          status={checked === '2' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('2')}
                        />
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: '#191919', borderBottomColor: 'white', borderRadius: 7 }}>
                      <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>4 Wheeler</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <RadioButton
                          value='4'
                          status={checked === '4' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('4')}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={{ marginTop: 30 }}>
                    <Button title="Submit" color='yellowgreen' onPress={props.handleSubmit} />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </BlurView>
      </Modal>

    </View >
  )
}



export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: 'yellowgreen', headerTitleStyle: { marginRight: 15, textAlign: 'center', fontWeight: 'bold' } }} >
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Home',
          headerShown: false,
        }} />
        <Stack.Screen name="Member" component={Members} options={{ title: 'Member', headerShown: false }} />
        <Stack.Screen name="IndividualsInfo" component={IndividualsInfo} options={{ title: 'IndividualsInfo', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}




const styles = StyleSheet.create({
  separator: {
    marginTop: 10,
    marginHorizontal: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },

  textinput: {
    borderBottomWidth: 2,
    borderColor: 'white',
    height: 40,
    marginBottom: 0,
    color: 'white',

  },
  text: {
    marginTop: 5,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 1, height: 7
    },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },

  latest: {
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 0,
    alignItems: 'center',
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'yellowgreen',
    borderRadius: 10,
    shadowColor: 'white',
    shadowOffset: {
      width: 1, height: 7
    },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  nonBlurredContent: {
    alignItems: 'center',
    justifyContent: 'center',

  },
});