// // // import React, {useEffect, useState} from 'react';
// // // import {
// // //   Text,
// // //   View,
// // //   StatusBar,
// // //   SafeAreaView,
// // //   useColorScheme,
// // //   Button,
// // //   StyleSheet,
// // //   TouchableOpacity
// // // } from 'react-native';
// // // import BlSerial from 'react-native-bluetooth-serial';
// // // import firestore from '@react-native-firebase/firestore';
// // // import { useNavigation, useRoute } from '@react-navigation/native';


// // // const Gloves = ({route}) => {
// // //   const {userId} = route.params; // Assuming userId is passed as a parameter
// // //   const [unilateralLeft, setUnilateralLeft] = useState([]);
// // //   const [unilateralRight, setUnilateralRight] = useState([]);
// // //   const [bilateralLeft, setBilateralLeft] = useState([]);
// // //   const [bilateralRight, setBilateralRight] = useState([]);
// // //   const [incisors, setIncisors] = useState([]);

// // //   const delimiter = '\n';
// // //   let buffer = '';

// // //   const onLoad = async () => {
// // //     let isMounted = true;

// // //     while (isMounted) {
// // //       const result = await BlSerial.readFromDevice();
// // //       if (result !== '' && result !== '0') {
// // //         buffer += result;

// // //         let delimiterIndex;
// // //         while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
// // //           const completeData = buffer.substring(0, delimiterIndex);
// // //           buffer = buffer.substring(delimiterIndex + 1);

// // //           if (completeData !== '') {
// // //             console.log('Result: ', completeData);
// // //             const [mode, force] = completeData.split(': ');
// // //             const parsedForce = parseFloat(force);
// // //             if (mode === 'Unilateral Left') {
// // //               setUnilateralLeft(prev => [...prev, parsedForce]);
// // //             }
// // //             if (mode === 'Unilateral Right') {
// // //               setUnilateralRight(prev => [...prev, parsedForce]);
// // //             }
// // //             if (mode === 'Bilateral Left') {
// // //               setBilateralLeft(prev => [...prev, parsedForce]);
// // //             }
// // //             if (mode === 'Bilateral Right') {
// // //               setBilateralRight(prev => [...prev, parsedForce]);
// // //             }
// // //             if (mode === 'Incisors') {
// // //               setIncisors(prev => [...prev, parsedForce]);
// // //             }
// // //           }
// // //         }
// // //       }
// // //     }

// // //     return () => {
// // //       isMounted = false;
// // //     };
// // //   };

// // //   const saveData = async () => {
// // //     try {
// // //       await firestore()
// // //         .collection('users')
// // //         .doc(userId)
// // //         .collection('slots')
// // //         .add({
// // //           bilateralLeft,
// // //           bilateralRight,
// // //           incisors,
// // //           unilateralLeft,
// // //           unilateralRight,
// // //         });
// // //       console.log('Data saved to Firestore!');
// // //     } catch (error) {
// // //       console.error('Error saving data: ', error);
// // //     }
// // //     navigation.goBack();
    
// // //   };

// // //   useEffect(() => {
// // //     const cleanup = onLoad();
// // //     return cleanup;
// // //   }, []);
// // //   const navigation = useNavigation();

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       <View>
// // //         <Text style={styles.Heading}>
// // //           BiteForce
// // //         </Text>
// // //         <View>
// // //           <Text style={styles.modeText}>
// // //             Unilateral Left: {unilateralLeft.join(', ')}
// // //           </Text>
// // //         </View>
// // //         <View>
// // //           <Text style={styles.modeText}>
// // //             Unilateral Right: {unilateralRight.join(', ')}
// // //           </Text>
// // //         </View>
// // //         <View>
// // //           <Text style={styles.modeText}>
// // //             Bilateral Left: {bilateralLeft.join(', ')}
// // //           </Text>
// // //         </View>
// // //         <View>
// // //           <Text style={styles.modeText}>
// // //             Bilateral Right: {bilateralRight.join(', ')}
// // //           </Text>
// // //         </View>
// // //         <View>
// // //           <Text style={styles.modeText}>
// // //             Incisors: {incisors.join(', ')}
// // //           </Text>
// // //         </View>
// // //         <TouchableOpacity style={styles.button} onPress={saveData}>
// // //         <Text style={styles.buttonText}>Save Data</Text>
// // //       </TouchableOpacity>

// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default Gloves;

// // // const styles = StyleSheet.create({
// // //   container:{
// // //     flex: 1,
// // //     paddingTop:20,
// // //     padding:5,
// // //     // color:`black`,
// // //     backgroundColor: '#f2f3f5',
// // //   },
// // //   Heading:{
// // //     fontSize:20,
// // //     marginBottom:5,
// // //     fontWeight:`bold`
// // //   },
// // //   button: {
// // //     paddingVertical: 10,
// // //     paddingHorizontal: 20,
// // //     backgroundColor: '#111',
// // //     borderRadius: 10,
// // //     position: 'relative',
// // //     marginBottom:10,
// // //     marginTop:10,
// // //     marginBottom:20
// // //   },
// // //   buttonText: {
// // //     color: 'white',
// // //     textAlign: 'center',
// // //   },
// // //   modeText:{
// // //     fontSize:18,
    
// // //   }
// // // })

// // import React, {useEffect, useState} from 'react';
// // import {
// //   Text,
// //   View,
// //   SafeAreaView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert
// // } from 'react-native';
// // import BlSerial from 'react-native-bluetooth-serial';
// // import firestore from '@react-native-firebase/firestore';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import axios from 'axios';

// // const Gloves = ({route}) => {
// //   const {userId} = route.params; // Assuming userId is passed as a parameter
// //   const {userDetails}= route.params;
// //   // const [userDetails,setuserDetails]= useState();
// //   console.log("userId in BiteForce: ",userId);
// //   console.log("userDetails in BiteForce: ",userDetails);
// //   const [unilateralLeft, setUnilateralLeft] = useState([60,43,65,32,80]);
// //   const [unilateralRight, setUnilateralRight] = useState([43,67,54]);
// //   const [bilateralLeft, setBilateralLeft] = useState([20]);
// //   const [bilateralRight, setBilateralRight] = useState([10]);
// //   const [incisors, setIncisors] = useState([32,54,76,87,92]);
// //   const [details, setDetails] = useState();



// //   const delimiter = '\n';
// //   let buffer = '';

// //   const onLoad = async () => {
// //     let isMounted = true;

// //     while (isMounted) {
// //       const result = await BlSerial.readFromDevice();
// //       if (result !== '' && result !== '0') {
// //         buffer += result;

// //         let delimiterIndex;
// //         while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
// //           const completeData = buffer.substring(0, delimiterIndex);
// //           buffer = buffer.substring(delimiterIndex + 1);

// //           if (completeData !== '') {
// //             console.log('Result: ', completeData);
// //             const [mode, force] = completeData.split(': ');
// //             const parsedForce = parseFloat(force);
// //             if (mode === 'Unilateral Left') {
// //               setUnilateralLeft(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Unilateral Right') {
// //               setUnilateralRight(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Bilateral Left') {
// //               setBilateralLeft(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Bilateral Right') {
// //               setBilateralRight(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Incisors') {
// //               setIncisors(prev => [...prev, parsedForce]);
// //             }
// //           }
// //         }
// //       }
// //     }

// //     return () => {
// //       isMounted = false;
// //     };
// //   };

// //   const saveData = async () => {

// //     const maxBilateralLeft = bilateralLeft.length > 0 ? Math.max(...bilateralLeft) : 0;
// //     const maxBilateralRight = bilateralRight.length > 0 ? Math.max(...bilateralRight) : 0;
// //     const maxUnilateralLeft = unilateralLeft.length > 0 ? Math.max(...unilateralLeft) : 0;
// //     const maxUnilateralRight = unilateralRight.length > 0 ? Math.max(...unilateralRight) : 0;
// //     const maxIncisors = incisors.length > 0 ? Math.max(...incisors) : 0;

// //     try {
// //       const response = await axios.post("http://192.168.18.208:3000/api/v1/savePatientSlot", {
// //         PatientId: userId,
// //         BilateralLeft:bilateralLeft,
// //         BilateralRight:bilateralRight,
// //         UnilateralLeft:unilateralLeft,
// //         UnilateralRight:unilateralRight,
// //         Incisors:incisors,
// //         MaxBilateralLeft:maxBilateralLeft,
// //         MaxBilateralRight:maxBilateralRight,
// //         MaxUnilateralLeft:maxUnilateralLeft,
// //         MaxUnilateralRight:maxUnilateralRight,
// //         MaxIncisors:maxIncisors
// //       });
// //       // setUsers(response.data.patients);
// //       console.log("Success:",response.data);
// //       Alert.alert("Success! 🎉","Reading Saved Sucessfully");

// //       // now use the userId and again fetch the userDetails, I am fetching it again
// //       await fetchPatientsDetails();
// //     } catch (error) {
// //       console.error('Error saving data: ', error);
// //     }
// //     // navigation.goBack();
// //     console.log("details:",details);
// //     // navigation.navigate('UserDetails', {item:details });
// //   };

// //   useEffect(() => {
// //     const cleanup = onLoad();
// //     return cleanup;
// //   }, []);

// //   const navigation = useNavigation();


// //   const fetchPatientsDetails = async () => {
// //     try {
// //       const response = await axios.post("http://192.168.18.208:3000/api/v1/getPatientDetails",
// //         {PatientId:userDetails.item._id}
// //       );
// //       // console.log("response.data.patients: ",response.data.patients);
// //       console.log("This is the Updated Details of the Patient: ",response.data.patients);
// //       // setDetails(response.data.patients);
// //     navigation.navigate('UserDetails', {item:response.data.patients });

// //       // setSlots(response.data.patients);
// //       // setUsers(response.data.patients);
// //     } catch (error) {
// //       console.error("Error while fetching patient slot data", error);
// //       console.warn("Not able to get Patient slot data");
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.Heading}>BiteForce Monitor</Text>
// //       <View style={styles.dataContainer}>
// //         <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
// //       </View>
// //       <TouchableOpacity style={styles.button} onPress={saveData}>
// //         <Text style={styles.buttonText}>Save Data</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // };

// // export default Gloves;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   Heading: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#0B1120',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   dataContainer: {
// //     backgroundColor: '#ffffff',
// //     padding: 15,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     marginBottom: 20,
// //   },
// //   modeText: {
// //     fontSize: 18,
// //     color: '#333',
// //     marginBottom: 10,
// //     fontWeight: '600',
// //   },
// //   button: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     backgroundColor: '#1CAC78',
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 5 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });


// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   View,
// //   SafeAreaView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert
// // } from 'react-native';
// // // import BlSerial from 'react-native-bluetooth-serial';
// // // import firestore from '@react-native-firebase/firestore';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import axios from 'axios';

// // const BiteForceMonitor = ({ route }) => {
// //   const { userId, userDetails } = route.params;
// //   const [unilateralLeft, setUnilateralLeft] = useState([]);
// //   const [unilateralRight, setUnilateralRight] = useState([]);
// //   const [bilateralLeft, setBilateralLeft] = useState([]);
// //   const [bilateralRight, setBilateralRight] = useState([]);
// //   const [incisors, setIncisors] = useState([]);  
// //   const [details, setDetails] = useState();

// //   const delimiter = '\n';
// //   let buffer = '';

// //   useEffect(() => {
// //     let isMounted = true;

// //     const onLoad = async () => {
// //       while (isMounted) {
// //         const result = await BlSerial.readFromDevice();
// //         if (result !== '' && result !== '0') {
// //           buffer += result;

// //           let delimiterIndex;
// //           while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
// //             const completeData = buffer.substring(0, delimiterIndex);
// //             buffer = buffer.substring(delimiterIndex + 1);

// //             if (completeData !== '') {
// //               console.log('Result: ', completeData);
// //               const [mode, force] = completeData.split(': ');
// //               const parsedForce = parseFloat(force);
// //               if (mode === 'Unilateral Left') {
// //                 setUnilateralLeft(prev => [...prev, parsedForce]);
// //               }
// //               if (mode === 'Unilateral Right') {
// //                 setUnilateralRight(prev => [...prev, parsedForce]);
// //               }
// //               if (mode === 'Bilateral Left') {
// //                 setBilateralLeft(prev => [...prev, parsedForce]);
// //               }
// //               if (mode === 'Bilateral Right') {
// //                 setBilateralRight(prev => [...prev, parsedForce]);
// //               }
// //               if (mode === 'Incisors') {
// //                 setIncisors(prev => [...prev, parsedForce]);
// //               }
// //             }
// //           }
// //         }
// //       }
// //     };

// //     onLoad();

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);

// //   const saveData = async () => {
// //     const maxBilateralLeft = bilateralLeft.length > 0 ? Math.max(...bilateralLeft) : 0;
// //     const maxBilateralRight = bilateralRight.length > 0 ? Math.max(...bilateralRight) : 0;
// //     const maxUnilateralLeft = unilateralLeft.length > 0 ? Math.max(...unilateralLeft) : 0;
// //     const maxUnilateralRight = unilateralRight.length > 0 ? Math.max(...unilateralRight) : 0;
// //     const maxIncisors = incisors.length > 0 ? Math.max(...incisors) : 0;
// //     if (bilateralLeft.length==0) bilateralLeft.push(0);
// //     if (bilateralRight.length==0) bilateralRight.push(0);
// //     if (unilateralLeft.length==0) unilateralLeft.push(0);
// //     if (unilateralRight.length==0) unilateralRight.push(0);
// //     if (incisors.length==0) incisors.push(0);

// //     try {
// //       const response = await axios.post("https://bite-force-server.vercel.app/api/v1/savePatientSlot", {
// //         PatientId: userId,
// //         BilateralLeft: bilateralLeft,
// //         BilateralRight: bilateralRight,
// //         UnilateralLeft: unilateralLeft,
// //         UnilateralRight: unilateralRight,
// //         Incisors: incisors,
// //         MaxBilateralLeft: maxBilateralLeft,
// //         MaxBilateralRight: maxBilateralRight,
// //         MaxUnilateralLeft: maxUnilateralLeft,
// //         MaxUnilateralRight: maxUnilateralRight,
// //         MaxIncisors: maxIncisors
// //       });
// //       console.log("Success:", response.data);
// //       Alert.alert("Success! 🎉", "Reading Saved Successfully");

// //       await fetchPatientsDetails();
// //     } catch (error) {
// //       console.error('Error saving data: ', error);
// //     }
// //   };

// //   const fetchPatientsDetails = async () => {
// //     try {
// //       const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatientDetails",
// //         { PatientId: userDetails.item._id }
// //       );
// //       console.log("This is the Updated Details of the Patient: ", response.data.patients);
// //       setDetails(response.data.patients);
// //       navigation.navigate('UserDetails', { item: response.data.patients });
// //     } catch (error) {
// //       console.error("Error while fetching patient slot data", error);
// //       console.warn("Not able to get Patient slot data");
// //     }
// //   };

// //   const navigation = useNavigation();

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.Heading}>BiteForce Monitor</Text>
// //       <View style={styles.dataContainer}>
// //         <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
// //       </View>
// //       <TouchableOpacity style={styles.button} onPress={saveData}>
// //         <Text style={styles.buttonText}>Save Data</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // };

// // export default BiteForceMonitor;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   Heading: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#0B1120',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   dataContainer: {
// //     backgroundColor: '#ffffff',
// //     padding: 15,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     marginBottom: 20,
// //   },
// //   modeText: {
// //     fontSize: 18,
// //     color: '#333',
// //     marginBottom: 10,
// //     fontWeight: '600',
// //   },
// //   button: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     backgroundColor: '#1CAC78',
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 5 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });


// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   View,
// //   SafeAreaView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert
// // } from 'react-native';
// // import { BleManager } from 'react-native-ble-plx';
// // import { PermissionsAndroid } from 'react-native';

// // const BiteForceMonitor = () => {
// //   const [manager] = useState(new BleManager());
// //   const [data, setData] = useState('');

// //   useEffect(() => {
// //     requestPermissions();
// //     const subscription = manager.onStateChange((state) => {
// //       if (state === 'PoweredOn') {
// //         manager.stopDeviceScan();
// //         // Start scanning for devices
// //         scanForDevices();
// //         subscription.remove();
// //       }
// //     }, true);
    
// //     return () => {
// //       manager.destroy();
// //     };
// //   }, [manager]);

// //   const requestPermissions = async () => {
// //     try {
// //       const granted = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// //       );
// //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// //         Alert.alert('Permission Denied!', 'Location permission is required to scan for Bluetooth devices.');
// //       }
// //     } catch (err) {
// //       console.warn(err);
// //     }
// //   };

// //   const scanForDevices = () => {
// //     manager.startDeviceScan(null, null, (error, device) => {
// //       if (error) {
// //         console.error(error);
// //         return;
// //       }

// //       if (device) {
// //         console.log('Found device:', device.name);
// //         // Replace 'DEVICE_NAME' with your device's name or ID
// //         if (device.name === 'DEVICE_NAME') {
// //           manager.stopDeviceScan();
// //           connectToDevice(device);
// //         }
// //       }
// //     });
// //   };

// //   const connectToDevice = async (device) => {
// //     try {
// //       const connectedDevice = await manager.connectToDevice(device.id);
// //       console.log('Connected to:', connectedDevice.name);
// //       await manager.discoverAllServicesAndCharacteristics(connectedDevice.id);
// //       // Replace 'CHARACTERISTIC_UUID' with your characteristic's UUID
// //       const characteristic = await manager.readCharacteristicForDevice(device.id, 'SERVICE_UUID', 'CHARACTERISTIC_UUID');
// //       const value = characteristic.value; // Base64 encoded string
// //       const decodedValue = atob(value); // Decode the value
// //       setData(decodedValue);
// //       console.log('Data read:', decodedValue);
// //     } catch (error) {
// //       console.error('Connection error:', error);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.heading}>BiteForce Monitor</Text>
// //       <View style={styles.dataContainer}>
// //         <Text style={styles.dataText}>Data: {data}</Text>
// //       </View>
// //       <TouchableOpacity style={styles.button} onPress={() => { /* Add functionality if needed */ }}>
// //         <Text style={styles.buttonText}>Refresh Data</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // };

// // export default BiteForceMonitor;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   heading: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#0B1120',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   dataContainer: {
// //     backgroundColor: '#ffffff',
// //     padding: 15,
// //     borderRadius: 12,
// //     marginBottom: 20,
// //   },
// //   dataText: {
// //     fontSize: 18,
// //     color: '#333',
// //   },
// //   button: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     backgroundColor: '#1CAC78',
// //     borderRadius: 10,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });


// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   View,
// //   SafeAreaView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert,
// //   PermissionsAndroid,
// // } from 'react-native';
// // import BlSerial from 'react-native-bluetooth-classic';
// // import axios from 'axios';
// // import { useNavigation, useRoute } from '@react-navigation/native';

// // const BiteForceMonitor = ({ route }) => {
// //   const { userId, userDetails } = route.params || {}; // Add default fallback to prevent null errors
// //   const [unilateralLeft, setUnilateralLeft] = useState([]);
// //   const [unilateralRight, setUnilateralRight] = useState([]);
// //   const [bilateralLeft, setBilateralLeft] = useState([]);
// //   const [bilateralRight, setBilateralRight] = useState([]);
// //   const [incisors, setIncisors] = useState([]);
// //   const [details, setDetails] = useState();
// //   const navigation = useNavigation();
// //   const delimiter = '\n';
// //   let buffer = '';

// //   // Function to request location permissions
// //   const requestPermissions = async () => {
// //     try {
// //       const fineLocationGranted = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// //       );

// //       if (fineLocationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
// //         Alert.alert('Permission Denied!', 'Location permission is required to scan for Bluetooth devices.');
// //       }
// //     } catch (err) {
// //       console.warn(err);
// //     }
// //   };

// //   const connectToBluetoothDevice = async () => {
// //     try {
// //       const device = await BlSerial.connect('your_device_address'); // Use your device's MAC address
// //       if (!device) {
// //         Alert.alert('Error', 'Failed to connect to the Bluetooth device.');
// //       }
// //       console.log('Bluetooth device connected successfully');
// //     } catch (error) {
// //       console.error('Bluetooth connection error: ', error);
// //       Alert.alert('Bluetooth Connection Error', 'Unable to connect to Bluetooth device.');
// //     }
// //   };

// //   useEffect(() => {
// //     requestPermissions(); // Request location permissions

// //     let isMounted = true;

// //     const onLoad = async () => {
// //       try {
// //         await connectToBluetoothDevice(); // Ensure connection before reading data

// //         while (isMounted) {
// //           const result = await BlSerial.readFromDevice();
// //           if (result && result !== '0') {
// //             buffer += result;

// //             let delimiterIndex;
// //             while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
// //               const completeData = buffer.substring(0, delimiterIndex);
// //               buffer = buffer.substring(delimiterIndex + 1);

// //               if (completeData !== '') {
// //                 console.log('Result: ', completeData);
// //                 const [mode, force] = completeData.split(': ');
// //                 const parsedForce = parseFloat(force);
// //                 if (mode === 'Unilateral Left') {
// //                   setUnilateralLeft(prev => [...prev, parsedForce]);
// //                 }
// //                 if (mode === 'Unilateral Right') {
// //                   setUnilateralRight(prev => [...prev, parsedForce]);
// //                 }
// //                 if (mode === 'Bilateral Left') {
// //                   setBilateralLeft(prev => [...prev, parsedForce]);
// //                 }
// //                 if (mode === 'Bilateral Right') {
// //                   setBilateralRight(prev => [...prev, parsedForce]);
// //                 }
// //                 if (mode === 'Incisors') {
// //                   setIncisors(prev => [...prev, parsedForce]);
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       } catch (error) {
// //         console.error('Error reading data: ', error);
// //       }
// //     };

// //     onLoad();

// //     return () => {
// //       isMounted = false;
// //     };
// //   }, []);

// //   const saveData = async () => {
// //     const maxBilateralLeft = bilateralLeft.length > 0 ? Math.max(...bilateralLeft) : 0;
// //     const maxBilateralRight = bilateralRight.length > 0 ? Math.max(...bilateralRight) : 0;
// //     const maxUnilateralLeft = unilateralLeft.length > 0 ? Math.max(...unilateralLeft) : 0;
// //     const maxUnilateralRight = unilateralRight.length > 0 ? Math.max(...unilateralRight) : 0;
// //     const maxIncisors = incisors.length > 0 ? Math.max(...incisors) : 0;

// //     // Ensure arrays are not empty
// //     if (bilateralLeft.length === 0) bilateralLeft.push(0);
// //     if (bilateralRight.length === 0) bilateralRight.push(0);
// //     if (unilateralLeft.length === 0) unilateralLeft.push(0);
// //     if (unilateralRight.length === 0) unilateralRight.push(0);
// //     if (incisors.length === 0) incisors.push(0);

// //     try {
// //       const response = await axios.post("https://bite-force-server.vercel.app/api/v1/savePatientSlot", {
// //         PatientId: userId || '', // Ensure it's not undefined
// //         BilateralLeft: bilateralLeft,
// //         BilateralRight: bilateralRight,
// //         UnilateralLeft: unilateralLeft,
// //         UnilateralRight: unilateralRight,
// //         Incisors: incisors,
// //         MaxBilateralLeft: maxBilateralLeft,
// //         MaxBilateralRight: maxBilateralRight,
// //         MaxUnilateralLeft: maxUnilateralLeft,
// //         MaxUnilateralRight: maxUnilateralRight,
// //         MaxIncisors: maxIncisors
// //       });
// //       console.log("Success:", response.data);
// //       Alert.alert("Success! 🎉", "Reading Saved Successfully");

// //       await fetchPatientsDetails();
// //     } catch (error) {
// //       console.error('Error saving data: ', error);
// //     }
// //   };

// //   const fetchPatientsDetails = async () => {
// //     try {
// //       const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatientDetails",
// //         { PatientId: userDetails?.item?._id } // Ensure userDetails is available
// //       );
// //       console.log("This is the Updated Details of the Patient: ", response.data.patients);
// //       setDetails(response.data.patients);
// //       navigation.navigate('UserDetails', { item: response.data.patients });
// //     } catch (error) {
// //       console.error("Error while fetching patient slot data", error);
// //       console.warn("Not able to get Patient slot data");
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.Heading}>BiteForce Monitor</Text>
// //       <View style={styles.dataContainer}>
// //         <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
// //       </View>
// //       <TouchableOpacity style={styles.button} onPress={saveData}>
// //         <Text style={styles.buttonText}>Save Data</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // };

// // export default BiteForceMonitor;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   Heading: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#0B1120',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   dataContainer: {
// //     backgroundColor: '#ffffff',
// //     padding: 15,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     marginBottom: 20,
// //   },
// //   modeText: {
// //     fontSize: 18,
// //     color: '#333',
// //     marginBottom: 10,
// //     fontWeight: '600',
// //   },
// //   button: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     backgroundColor: '#1CAC78',
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 5 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// // });





// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   View,
// //   SafeAreaView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';
// // import axios from 'axios';
// // import { useNavigation, useRoute } from '@react-navigation/native';

// // const BiteForceMonitor = ({ route }) => {
// //   const { userId, userDetails } = route.params || {}; // Add default fallback to prevent null errors
// //   const [unilateralLeft, setUnilateralLeft] = useState([]);
// //   const [unilateralRight, setUnilateralRight] = useState([]);
// //   const [bilateralLeft, setBilateralLeft] = useState([]);
// //   const [bilateralRight, setBilateralRight] = useState([]);
// //   const [incisors, setIncisors] = useState([]);
// //   const [details, setDetails] = useState();
// //   // const navigation = useNavigation();
// //   const [error, setError] = useState('');

// //   const fetchDataFromESP32 = async () => {
// //     try {
// //       const response = await axios.get('http://192.168.4.1/data'); // Update with your ESP32's IP and endpoint
// //       const { mode, force } = response.data; // Assuming the response data structure

// //       if(force==0.02 || force==0){
// //         return;
// //       }

// //       const parsedForce = parseFloat(force);

// //       switch (mode) {
// //         case 'Unilateral Left':
// //           setUnilateralLeft((prev) => [...prev, parsedForce]);
// //           break;
// //         case 'Unilateral Right':
// //           setUnilateralRight((prev) => [...prev, parsedForce]);
// //           break;
// //         case 'Bilateral Left':
// //           setBilateralLeft((prev) => [...prev, parsedForce]);
// //           break;
// //         case 'Bilateral Right':
// //           setBilateralRight((prev) => [...prev, parsedForce]);
// //           break;
// //         case 'Incisors':
// //           setIncisors((prev) => [...prev, parsedForce]);
// //           break;
// //         default:
// //           console.warn('Unknown mode:', mode);
// //       }
// //     } catch (err) {
// //       setError('Failed to fetch data from ESP32');
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     // Fetch data initially
// //     fetchDataFromESP32();

// //     // Set up interval to fetch data every second
// //     const interval = setInterval(fetchDataFromESP32, 1000); // Every 1 second

// //     // Clean up the interval on component unmount
// //     return () => clearInterval(interval);
// //   }, []);

// //   const saveData = async () => {
// //     const maxBilateralLeft = bilateralLeft.length > 1 ? Math.max(...bilateralLeft) : 0;
// //     const maxBilateralRight = bilateralRight.length > 1 ? Math.max(...bilateralRight) : 0;
// //     const maxUnilateralLeft = unilateralLeft.length > 1 ? Math.max(...unilateralLeft) : 0;
// //     const maxUnilateralRight = unilateralRight.length > 1 ? Math.max(...unilateralRight) : 0;
// //     const maxIncisors = incisors.length > 1 ? Math.max(...incisors) : 0;

// //     // Ensure arrays are not empty
// //     if (bilateralLeft.length === 0) bilateralLeft.push(0);
// //     if (bilateralRight.length === 0) bilateralRight.push(0);
// //     if (unilateralLeft.length === 0) unilateralLeft.push(0);
// //     if (unilateralRight.length === 0) unilateralRight.push(0);
// //     if (incisors.length === 0) incisors.push(0);

// //     try {
// //       const response = await axios.post("https://bite-force-server.vercel.app/api/v1/savePatientSlot", {
// //         PatientId: userId || '', 
// //         BilateralLeft: bilateralLeft,
// //         BilateralRight: bilateralRight,
// //         UnilateralLeft: unilateralLeft,
// //         UnilateralRight: unilateralRight,
// //         Incisors: incisors,
// //         MaxBilateralLeft: maxBilateralLeft,
// //         MaxBilateralRight: maxBilateralRight,
// //         MaxUnilateralLeft: maxUnilateralLeft,
// //         MaxUnilateralRight: maxUnilateralRight,
// //         MaxIncisors: maxIncisors
// //       });
// //       console.log("Success:", response.data);
// //       Alert.alert("Success! 🎉", "Reading Saved Successfully");
// //     } catch (error) {
// //       console.error('Error saving data: ', error);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.Heading}>BiteForce Monitor</Text>
// //       <View style={styles.dataContainer}>
// //         <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
// //       </View>
// //       {error ? <Text style={styles.error}>{error}</Text> : null}
// //       <TouchableOpacity style={styles.button} onPress={saveData}>
// //         <Text style={styles.buttonText}>Save Data</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // };

// // export default BiteForceMonitor;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   Heading: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#0B1120',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   dataContainer: {
// //     backgroundColor: '#ffffff',
// //     padding: 15,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     marginBottom: 20,
// //   },
// //   modeText: {
// //     fontSize: 18,
// //     color: '#333',
// //     marginBottom: 10,
// //     fontWeight: '600',
// //   },
// //   button: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     backgroundColor: '#1CAC78',
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 5 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   error: {
// //     color: 'red',
// //     marginTop: 20,
// //   },
// // });




// // import React, { useEffect, useState } from 'react';
// // import {
// //   Text,
// //   View,
// //   SafeAreaView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';
// // import axios from 'axios';
// // import { useNavigation, useRoute } from '@react-navigation/native';

// // const BiteForceMonitor = ({ route }) => {
// //   const { userId, userDetails } = route.params || {}; // Add default fallback to prevent null errors
// //   const [unilateralLeft, setUnilateralLeft] = useState([]);
// //   const [unilateralRight, setUnilateralRight] = useState([]);
// //   const [bilateralLeft, setBilateralLeft] = useState([]);
// //   const [bilateralRight, setBilateralRight] = useState([]);
// //   const [incisors, setIncisors] = useState([]);
// //   const [error, setError] = useState('');

// //   const fetchDataFromESP32 = async () => {
// //     try {
// //       const response = await axios.get('http://192.168.4.1/data'); // Update with your ESP32's IP and endpoint
// //       const { mode, force } = response.data; // Assuming the response data structure

// //       // Skip processing if the force value is the same
// //       if (force == 0.02 || force == 0) {
// //         return;
// //       }

// //       const parsedForce = parseFloat(force);

// //       // Helper function to add force value if it doesn't exist
// //       const addValueIfNotExists = (setStateFunc, stateArray) => {
// //         if (!stateArray.includes(parsedForce)) {
// //           setStateFunc((prev) => [...prev, parsedForce]);
// //         }
// //       };

// //       switch (mode) {
// //         case 'Unilateral Left':
// //           addValueIfNotExists(setUnilateralLeft, unilateralLeft);
// //           break;
// //         case 'Unilateral Right':
// //           addValueIfNotExists(setUnilateralRight, unilateralRight);
// //           break;
// //         case 'Bilateral Left':
// //           addValueIfNotExists(setBilateralLeft, bilateralLeft);
// //           break;
// //         case 'Bilateral Right':
// //           addValueIfNotExists(setBilateralRight, bilateralRight);
// //           break;
// //         case 'Incisors':
// //           addValueIfNotExists(setIncisors, incisors);
// //           break;
// //         default:
// //           console.warn('Unknown mode:', mode);
// //       }
// //     } catch (err) {
// //       setError('Failed to fetch data from ESP32');
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     // Fetch data initially
// //     fetchDataFromESP32();

// //     // Set up interval to fetch data every second
// //     const interval = setInterval(fetchDataFromESP32, 4000); // Every 1 second

// //     // Clean up the interval on component unmount
// //     return () => clearInterval(interval);
// //   }, []);

// //   const saveData = async () => {
// //     const maxBilateralLeft = bilateralLeft.length > 1 ? Math.max(...bilateralLeft) : 0;
// //     const maxBilateralRight = bilateralRight.length > 1 ? Math.max(...bilateralRight) : 0;
// //     const maxUnilateralLeft = unilateralLeft.length > 1 ? Math.max(...unilateralLeft) : 0;
// //     const maxUnilateralRight = unilateralRight.length > 1 ? Math.max(...unilateralRight) : 0;
// //     const maxIncisors = incisors.length > 1 ? Math.max(...incisors) : 0;

// //     // Ensure arrays are not empty
// //     if (bilateralLeft.length === 0) bilateralLeft.push(0);
// //     if (bilateralRight.length === 0) bilateralRight.push(0);
// //     if (unilateralLeft.length === 0) unilateralLeft.push(0);
// //     if (unilateralRight.length === 0) unilateralRight.push(0);
// //     if (incisors.length === 0) incisors.push(0);

// //     try {
// //       const response = await axios.post("https://bite-force-server.vercel.app/api/v1/savePatientSlot", {
// //         PatientId: userId || '', 
// //         BilateralLeft: bilateralLeft,
// //         BilateralRight: bilateralRight,
// //         UnilateralLeft: unilateralLeft,
// //         UnilateralRight: unilateralRight,
// //         Incisors: incisors,
// //         MaxBilateralLeft: maxBilateralLeft,
// //         MaxBilateralRight: maxBilateralRight,
// //         MaxUnilateralLeft: maxUnilateralLeft,
// //         MaxUnilateralRight: maxUnilateralRight,
// //         MaxIncisors: maxIncisors
// //       });
// //       console.log("Success:", response.data);
// //       Alert.alert("Success! 🎉", "Reading Saved Successfully");
// //     } catch (error) {
// //       console.error('Error saving data: ', error);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <Text style={styles.Heading}>BiteForce Monitor</Text>
// //       <View style={styles.dataContainer}>
// //         <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
// //         <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
// //         <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
// //       </View>
// //       {error ? <Text style={styles.error}>{error}</Text> : null}
// //       <TouchableOpacity style={styles.button} onPress={saveData}>
// //         <Text style={styles.buttonText}>Save Data</Text>
// //       </TouchableOpacity>
// //     </SafeAreaView>
// //   );
// // };

// // export default BiteForceMonitor;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f8f9fa',
// //     padding: 20,
// //     justifyContent: 'center',
// //   },
// //   Heading: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#0B1120',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   dataContainer: {
// //     backgroundColor: '#ffffff',
// //     padding: 15,
// //     borderRadius: 12,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     marginBottom: 20,
// //   },
// //   modeText: {
// //     fontSize: 18,
// //     color: '#333',
// //     marginBottom: 10,
// //     fontWeight: '600',
// //   },
// //   button: {
// //     paddingVertical: 15,
// //     paddingHorizontal: 30,
// //     backgroundColor: '#1CAC78',
// //     borderRadius: 10,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 5 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     alignItems: 'center',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   error: {
// //     color: 'red',
// //     marginTop: 20,
// //   },
// // });




// import React, { useEffect, useState } from 'react';
// import {
//   Text,
//   View,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const BiteForceMonitor = ({ route }) => {
//   const { userId, userDetails } = route.params || {}; // Add default fallback to prevent null errors
//   const [unilateralLeft, setUnilateralLeft] = useState([]);
//   const [unilateralRight, setUnilateralRight] = useState([]);
//   const [bilateralLeft, setBilateralLeft] = useState([]);
//   const [bilateralRight, setBilateralRight] = useState([]);
//   const [incisors, setIncisors] = useState([]);
//   const [error, setError] = useState('');

//   const fetchDataFromESP32 = async () => {
//     try {
//       const response = await axios.get('http://192.168.4.1/data'); // Update with your ESP32's IP and endpoint
//       const { mode, force } = response.data; // Assuming the response data structure

//         // Skip processing if the force value is the same
//         if (force == 0.02 || force == 0 || force === lastReceivedForce) {
//           return; // Ignore if unchanged or invalid
//       }

//       lastReceivedForce = force; // Store the latest received force

//       const parsedForce = parseFloat(force);


//       // Helper function to add force value if it doesn't exist
//       const addValueIfNotExists = (setStateFunc, stateArray) => {
//         if (!stateArray.includes(parsedForce)) {
//           setStateFunc((prev) => [...prev, parsedForce]);
//         }
//       };

//       switch (mode) {
//         case 'Unilateral Left':
//           addValueIfNotExists(setUnilateralLeft, unilateralLeft);
//           break;
//         case 'Unilateral Right':
//           addValueIfNotExists(setUnilateralRight, unilateralRight);
//           break;
//         case 'Bilateral Left':
//           addValueIfNotExists(setBilateralLeft, bilateralLeft);
//           break;
//         case 'Bilateral Right':
//           addValueIfNotExists(setBilateralRight, bilateralRight);
//           break;
//         case 'Incisors':
//           addValueIfNotExists(setIncisors, incisors);
//           break;
//         default:
//           console.warn('Unknown mode:', mode);
//       }
//     } catch (err) {
//       setError('Failed to fetch data from ESP32');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     // Fetch data initially
//     fetchDataFromESP32();

//     // Set up interval to fetch data every second
//     const interval = setInterval(fetchDataFromESP32, 1200); // Every 1 second

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   const saveData = async () => {
//     const maxBilateralLeft = bilateralLeft.length > 1 ? Math.max(...bilateralLeft) : 0;
//     const maxBilateralRight = bilateralRight.length > 1 ? Math.max(...bilateralRight) : 0;
//     const maxUnilateralLeft = unilateralLeft.length > 1 ? Math.max(...unilateralLeft) : 0;
//     const maxUnilateralRight = unilateralRight.length > 1 ? Math.max(...unilateralRight) : 0;
//     const maxIncisors = incisors.length > 1 ? Math.max(...incisors) : 0;

//     // Ensure arrays are not empty
//     if (bilateralLeft.length === 0) bilateralLeft.push(0);
//     if (bilateralRight.length === 0) bilateralRight.push(0);
//     if (unilateralLeft.length === 0) unilateralLeft.push(0);
//     if (unilateralRight.length === 0) unilateralRight.push(0);
//     if (incisors.length === 0) incisors.push(0);

//     try {
//       const response = await axios.post("https://bite-force-server.vercel.app/api/v1/savePatientSlot", {
//         PatientId: userId || '', 
//         BilateralLeft: bilateralLeft,
//         BilateralRight: bilateralRight,
//         UnilateralLeft: unilateralLeft,
//         UnilateralRight: unilateralRight,
//         Incisors: incisors,
//         MaxBilateralLeft: maxBilateralLeft,
//         MaxBilateralRight: maxBilateralRight,
//         MaxUnilateralLeft: maxUnilateralLeft,
//         MaxUnilateralRight: maxUnilateralRight,
//         MaxIncisors: maxIncisors
//       });
//       console.log("Success:", response.data);
//       Alert.alert("Success! 🎉", "Reading Saved Successfully");
//     } catch (error) {
//       console.error('Error saving data: ', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.Heading}>BiteForce Monitor</Text>
//       <View style={styles.dataContainer}>
//         <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
//         <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
//         <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
//         <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
//         <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
//       </View>
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <TouchableOpacity style={styles.button} onPress={saveData}>
//         <Text style={styles.buttonText}>Save Data</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default BiteForceMonitor;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   Heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#0B1120',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   dataContainer: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     marginBottom: 20,
//   },
//   modeText: {
//     fontSize: 18,
//     color: '#333',
//     marginBottom: 10,
//     fontWeight: '600',
//   },
//   button: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     backgroundColor: '#1CAC78',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   error: {
//     color: 'red',
//     marginTop: 20,
//   },
// });


// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button } from 'react-native';
// import axios from 'axios';

// const YourComponent = () => {
//     const [forceData, setForceData] = useState([]);
//     const [error, setError] = useState(null);
//     const lastReceivedForce = useRef(0); // Using useRef to keep track of the last received force

//     useEffect(() => {
//         const intervalId = setInterval(fetchDataFromESP32, 1000); // Fetch data every second
//         return () => clearInterval(intervalId); // Cleanup on unmount
//     }, []);

//     const fetchDataFromESP32 = async () => {
//         try {
//             const response = await axios.get('http://192.168.4.1/data');
//             const { mode, force } = response.data;

//             // Check if force is unchanged or invalid
//             if (force == 0.02 || force == 0 || force === lastReceivedForce.current) {
//                 return; // Ignore if unchanged or invalid
//             }

//             lastReceivedForce.current = force; // Update the last received force

//             const parsedForce = parseFloat(force);

//             // Update the force data state (or any other logic you have)
//             setForceData(prevData => [...prevData, { mode, force: parsedForce }]);
//         } catch (err) {
//             setError('Failed to fetch data from ESP32');
//             console.error(err);
//         }
//     };

//     return (
//         <View>
//             {error && <Text>{error}</Text>}
//             {forceData.map((data, index) => (
//                 <Text key={index}>{`Mode: ${data.mode}, Force: ${data.force}`}</Text>
//             ))}
//             <Button title="Refresh" onPress={fetchDataFromESP32} />
//         </View>
//     );
// };

// export default YourComponent;




import React, { useEffect, useState, useRef, useDebugValue } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const BiteForceMonitor = ({ route }) => {
  const { userId, userDetails } = route.params || {}; // Add default fallback to prevent null errors
  console.log(userDetails)
  const [unilateralLeft, setUnilateralLeft] = useState([]);
  const [unilateralRight, setUnilateralRight] = useState([]);
  const [bilateralLeft, setBilateralLeft] = useState([]);
  const [bilateralRight, setBilateralRight] = useState([]);
  const [incisors, setIncisors] = useState([]);
  const [error, setError] = useState('');
  const lastReceivedForce = useRef(0); // Use a ref to store the last received force
  const navigation=useNavigation();

  const fetchDataFromESP32 = async () => {
    try {
      const response = await axios.get('http://192.168.4.1/data'); // Update with your ESP32's IP and endpoint
      const { mode, force } = response.data; // Assuming the response data structure

      // Check if the force is unchanged or invalid
      if (force == 0.02 || force == 0  ||  force == -1 || force === lastReceivedForce.current) {
        return; // Ignore if unchanged or invalid
      }

      lastReceivedForce.current = force; // Update the last received force

      const parsedForce = parseFloat(force);

      // Helper function to add force value if it doesn't exist
      const addValueIfNotExists = (setStateFunc, stateArray) => {
        if (!stateArray.includes(parsedForce)) {
          setStateFunc((prev) => [...prev, parsedForce]);
        }
      };

      switch (mode) {
        case 'Unilateral Left':
          addValueIfNotExists(setUnilateralLeft, unilateralLeft);
          break;
        case 'Unilateral Right':
          addValueIfNotExists(setUnilateralRight, unilateralRight);
          break;
        case 'Bilateral Left':
          addValueIfNotExists(setBilateralLeft, bilateralLeft);
          break;
        case 'Bilateral Right':
          addValueIfNotExists(setBilateralRight, bilateralRight);
          break;
        case 'Incisors':
          addValueIfNotExists(setIncisors, incisors);
          break;
        default:
          console.warn('Unknown mode:', mode);
      }
    } catch (err) {
      setError('Failed to fetch data from ESP32');
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchDataFromESP32();

    // Set up interval to fetch data every second
    const interval = setInterval(fetchDataFromESP32, 1200); // Every 1.2 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const saveData = async () => {
    const maxBilateralLeft = bilateralLeft.length > 1 ? Math.max(...bilateralLeft) : 0;
    const maxBilateralRight = bilateralRight.length > 1 ? Math.max(...bilateralRight) : 0;
    const maxUnilateralLeft = unilateralLeft.length > 1 ? Math.max(...unilateralLeft) : 0;
    const maxUnilateralRight = unilateralRight.length > 1 ? Math.max(...unilateralRight) : 0;
    const maxIncisors = incisors.length > 1 ? Math.max(...incisors) : 0;

    // Ensure arrays are not empty
    if (bilateralLeft.length === 0) bilateralLeft.push(0);
    if (bilateralRight.length === 0) bilateralRight.push(0);
    if (unilateralLeft.length === 0) unilateralLeft.push(0);
    if (unilateralRight.length === 0) unilateralRight.push(0);
    if (incisors.length === 0) incisors.push(0);

    try {
      const response = await axios.post("https://bite-force-server.vercel.app/api/v1/savePatientSlot", {
        PatientId: userId || '', 
        BilateralLeft: bilateralLeft,
        BilateralRight: bilateralRight,
        UnilateralLeft: unilateralLeft,
        UnilateralRight: unilateralRight,
        Incisors: incisors,
        MaxBilateralLeft: maxBilateralLeft,
        MaxBilateralRight: maxBilateralRight,
        MaxUnilateralLeft: maxUnilateralLeft,
        MaxUnilateralRight: maxUnilateralRight,
        MaxIncisors: maxIncisors
      });
      console.log("Success:", response.data);
      Alert.alert("Success! 🎉", "Reading Saved Successfully");
      // navigation.navigate('UserDetails', {item:details });
      // navigation.navigate('UserDetails', { item:userDetails });

      // Navigate to Main first
    // navigation.navigate('Main',{ item: userDetails } );
    navigation.navigate('UserDetails', { item: userDetails });


    // Then navigate to UserDetails after a brief delay
    setTimeout(() => {
      navigation.navigate('UserDetails', { item: userDetails });
    }, 200);

      
      console.log("Saved , now back: ", userDetails);
      // navigation.goBack();

      
    } catch (error) {
      // console.error('Error saving data: ', error);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contain}>
        <Text style={styles.instructionText}>Connect to BiteForce Wifi</Text>
        <Text style={styles.instructionText}>Before saving data Please connect to your internet</Text>
      </View>
      <Text style={styles.Heading}>BiteForce Monitor</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
        <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
        <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
        <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
        <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
      </View>
      {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BiteForceMonitor;

const styles = StyleSheet.create({
  contain:{
  },
  instructionText: {
    // textAlign:`left`,
    paddingLeft:10,
    fontSize: 16,
    color: '#007BFF', // A blue color for better visibility
    // textAlign: 'center',
    position:`relative`,
    bottom:80,
    marginBottom: 10,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  Heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1120',
    textAlign: 'center',
    marginBottom: 20,
  },
  dataContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  modeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#1CAC78',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
});


