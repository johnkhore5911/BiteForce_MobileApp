// // // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
// // // // // // // // // // // // // // import { BleManager } from 'react-native-ble-plx';
// // // // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';

// // // // // // // // // // // // // // const manager = new BleManager();

// // // // // // // // // // // // // // const Home = () => {
// // // // // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);
// // // // // // // // // // // // // //   const navigation = useNavigation();


// // // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // // // // //       requestPermissions();
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // // //       manager.destroy();
// // // // // // // // // // // // // //     };
// // // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // // // // //     if (Platform.OS === 'android' && Platform.Version >= 31) {
// // // // // // // // // // // // // //       await PermissionsAndroid.requestMultiple([
// // // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
// // // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
// // // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// // // // // // // // // // // // // //       ]);
// // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // //       const locationGranted = await PermissionsAndroid.request(
// // // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// // // // // // // // // // // // // //       );
// // // // // // // // // // // // // //       if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // // // // // // // //         console.log('Location permission denied');
// // // // // // // // // // // // // //       }
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // // // // //     setDevices([]); // Clear previous devices
// // // // // // // // // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // // // // // // // // //       if (error) {
// // // // // // // // // // // // // //         console.log(error);
// // // // // // // // // // // // // //         return;
// // // // // // // // // // // // // //       }

// // // // // // // // // // // // // //       setDevices((prevDevices) => {
// // // // // // // // // // // // // //         if (prevDevices.find((d) => d.id === device.id)) {
// // // // // // // // // // // // // //           return prevDevices;
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //         return [...prevDevices, device];
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // // // // //       manager.stopDeviceScan();
// // // // // // // // // // // // // //     }, 10000); // Stop scanning after 10 seconds
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   // const connectToDevice = async (device) => {
// // // // // // // // // // // // // //   //   try {
// // // // // // // // // // // // // //   //     const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // // // //   //     setConnectedDevice(connectedDevice);
// // // // // // // // // // // // // //   //     console.log('Connected to', connectedDevice.name);
// // // // // // // // // // // // // //   //     //navigate to main
// // // // // // // // // // // // // //   //     navigation.navigate("Main");
// // // // // // // // // // // // // //   //   } catch (error) {
// // // // // // // // // // // // // //   //     console.log('Error connecting to device:', error);
// // // // // // // // // // // // // //   //   }
// // // // // // // // // // // // // //   // };

// // // // // // // // // // // // // //   const connectToDevice = async (device) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // // // //       setConnectedDevice(connectedDevice);
// // // // // // // // // // // // // //       console.log('Connected to', connectedDevice.localName || connectedDevice.name);
// // // // // // // // // // // // // //       //navigate to main
// // // // // // // // // // // // // //       navigation.navigate("Main");
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       console.log('Error connecting to device:', error);
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <View style={{ padding: 20 }}>
// // // // // // // // // // // // // //       <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
// // // // // // // // // // // // // //         Bluetooth Device Scanner
// // // // // // // // // // // // // //       </Text>

// // // // // // // // // // // // // //       <Button title="Scan for Devices" onPress={scanDevices} />

// // // // // // // // // // // // // //       {connectedDevice ? (
// // // // // // // // // // // // // //         <Text style={{ margin: 20 }}>Connected to: {connectedDevice.name}</Text>
// // // // // // // // // // // // // //       ) : (
// // // // // // // // // // // // // //         // <FlatList
// // // // // // // // // // // // // //         //   data={devices}
// // // // // // // // // // // // // //         //   keyExtractor={(item) => item.id}
// // // // // // // // // // // // // //         //   renderItem={({ item }) => (
// // // // // // // // // // // // // //         //     <View style={{ margin: 10 }}>
// // // // // // // // // // // // // //         //       <Text>Name: {item.name || 'Unnamed device'}</Text>
// // // // // // // // // // // // // //         //       <Text>ID: {item.id}</Text>
// // // // // // // // // // // // // //         //       <Button title="Connect" onPress={() => connectToDevice(item)} />
// // // // // // // // // // // // // //         //     </View>
// // // // // // // // // // // // // //         //   )}
// // // // // // // // // // // // // //         // />
// // // // // // // // // // // // // //         <FlatList
// // // // // // // // // // // // // //         data={devices}
// // // // // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // // // // //           <View style={{ margin: 10 }}>
// // // // // // // // // // // // // //             <Text>Name: {item.localName || item.name || 'Unnamed device'}</Text>
// // // // // // // // // // // // // //             <Text>ID: {item.id}</Text>
// // // // // // // // // // // // // //             <Button title="Connect" onPress={() => connectToDevice(item)} />
// // // // // // // // // // // // // //           </View>
// // // // // // // // // // // // // //         )}
// // // // // // // // // // // // // //       />
// // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // //     </View>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default Home;

// // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
// // // // // // // // // // // // // import { BleManager } from 'react-native-ble-plx';
// // // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';

// // // // // // // // // // // // // const manager = new BleManager();

// // // // // // // // // // // // // const Home = () => {
// // // // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);
// // // // // // // // // // // // //   const navigation = useNavigation();

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // // // //       requestPermissions(); // Request necessary permissions
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       manager.destroy(); // Clean up BLE manager on component unmount
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   // Function to request permissions on Android
// // // // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // // // //     if (Platform.OS === 'android' && Platform.Version >= 31) {
// // // // // // // // // // // // //       await PermissionsAndroid.requestMultiple([
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// // // // // // // // // // // // //       ]);
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       const locationGranted = await PermissionsAndroid.request(
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// // // // // // // // // // // // //       );
// // // // // // // // // // // // //       if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // // // // // // //         console.log('Location permission denied');
// // // // // // // // // // // // //         Alert.alert('Permission Denied', 'Location permission is required for BLE scanning.');
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Function to start scanning for devices
// // // // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // // // //     setDevices([]); // Clear previous devices
// // // // // // // // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // // // // // // // //       if (error) {
// // // // // // // // // // // // //         console.log(error);
// // // // // // // // // // // // //         Alert.alert('Error', 'Failed to scan devices.');
// // // // // // // // // // // // //         return;
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       setDevices((prevDevices) => {
// // // // // // // // // // // // //         if (prevDevices.find((d) => d.id === device.id)) {
// // // // // // // // // // // // //           return prevDevices; // Avoid adding duplicate devices
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         return [...prevDevices, device];
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // // // //       manager.stopDeviceScan(); // Stop scanning after 10 seconds
// // // // // // // // // // // // //     }, 10000);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Function to connect to a device
// // // // // // // // // // // // //   const connectToDevice = async (device) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // // //       setConnectedDevice(connectedDevice);
// // // // // // // // // // // // //       console.log('Connected to', connectedDevice.localName || connectedDevice.name);
// // // // // // // // // // // // //       navigation.navigate("Main"); // Navigate to the main screen after connecting
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.log('Error connecting to device:', error);
// // // // // // // // // // // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name || device.localName}`);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Rendering the list of discovered devices
// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <View style={{ padding: 20 }}>
// // // // // // // // // // // // //       <Text style={{ fontSize: 20, textAlign: 'center' }}>Bluetooth Devices</Text>
// // // // // // // // // // // // //       <Button title="Scan Devices" onPress={scanDevices} />
// // // // // // // // // // // // //       <FlatList
// // // // // // // // // // // // //         data={devices}
// // // // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // // // //           <View style={{ marginVertical: 5 }}>
// // // // // // // // // // // // //             <Button
// // // // // // // // // // // // //               title={item.localName || item.name || 'Unnamed Device'}
// // // // // // // // // // // // //               onPress={() => connectToDevice(item)}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           </View>
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       />
// // // // // // // // // // // // //       {connectedDevice && (
// // // // // // // // // // // // //         <View style={{ marginTop: 20 }}>
// // // // // // // // // // // // //           <Text>Connected to: {connectedDevice.localName || connectedDevice.name}</Text>
// // // // // // // // // // // // //         </View>
// // // // // // // // // // // // //       )}
// // // // // // // // // // // // //     </View>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default Home;


// // // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
// // // // // // // // // // // // // import { BleManager } from 'react-native-ble-plx';
// // // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';

// // // // // // // // // // // // // const manager = new BleManager();

// // // // // // // // // // // // // const Home = () => {
// // // // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);
// // // // // // // // // // // // //   const navigation = useNavigation();

// // // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // // // //       requestPermissions(); // Request necessary permissions
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     return () => {
// // // // // // // // // // // // //       manager.destroy(); // Clean up BLE manager on component unmount
// // // // // // // // // // // // //     };
// // // // // // // // // // // // //   }, []);

// // // // // // // // // // // // //   // Function to request permissions on Android
// // // // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // // // //     if (Platform.OS === 'android' && Platform.Version >= 31) {
// // // // // // // // // // // // //       await PermissionsAndroid.requestMultiple([
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// // // // // // // // // // // // //       ]);
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       const locationGranted = await PermissionsAndroid.request(
// // // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// // // // // // // // // // // // //       );
// // // // // // // // // // // // //       if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // // // // // // //         console.log('Location permission denied');
// // // // // // // // // // // // //         Alert.alert('Permission Denied', 'Location permission is required for BLE scanning.');
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Function to start scanning for devices
// // // // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // // // //     setDevices([]); // Clear previous devices
// // // // // // // // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // // // // // // // //       if (error) {
// // // // // // // // // // // // //         console.log(error);
// // // // // // // // // // // // //         Alert.alert('Error', 'Failed to scan devices.');
// // // // // // // // // // // // //         return;
// // // // // // // // // // // // //       }

// // // // // // // // // // // // //       setDevices((prevDevices) => {
// // // // // // // // // // // // //         if (prevDevices.find((d) => d.id === device.id)) {
// // // // // // // // // // // // //           return prevDevices; // Avoid adding duplicate devices
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //         return [...prevDevices, device];
// // // // // // // // // // // // //       });
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // // // //       manager.stopDeviceScan(); // Stop scanning after 10 seconds
// // // // // // // // // // // // //     }, 10000);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Function to connect to a device
// // // // // // // // // // // // //   const connectToDevice = async (device) => {
// // // // // // // // // // // // //     try {
// // // // // // // // // // // // //       const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // // //       setConnectedDevice(connectedDevice);
// // // // // // // // // // // // //       console.log('Connected to', connectedDevice.localName || connectedDevice.name);
// // // // // // // // // // // // //       navigation.navigate("Main"); // Navigate to the main screen after connecting
// // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // //       console.log('Error connecting to device:', error);
// // // // // // // // // // // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name || device.localName}`);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Rendering the list of discovered devices
// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <View style={{ padding: 20 }}>
// // // // // // // // // // // // //       <Text style={{ fontSize: 20, textAlign: 'center' }}>Bluetooth Devices</Text>
// // // // // // // // // // // // //       <Button title="Scan Devices" onPress={scanDevices} />
// // // // // // // // // // // // //       <FlatList
// // // // // // // // // // // // //         data={devices}
// // // // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // // // //           <View style={{ marginVertical: 5 }}>
// // // // // // // // // // // // //             <Button
// // // // // // // // // // // // //               title={item.localName || item.name || 'Unnamed Device'}
// // // // // // // // // // // // //               onPress={() => connectToDevice(item)}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           </View>
// // // // // // // // // // // // //         )}
// // // // // // // // // // // // //       />
// // // // // // // // // // // // //       {connectedDevice && (
// // // // // // // // // // // // //         <View style={{ marginTop: 20 }}>
// // // // // // // // // // // // //           <Text style={{color:`red`}}>Connected to: {connectedDevice.localName || connectedDevice.name}</Text>
// // // // // // // // // // // // //         </View>
// // // // // // // // // // // // //       )}
// // // // // // // // // // // // //     </View>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default Home;
// // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
// // // // // // // // // // // // import { BleManager } from 'react-native-ble-plx';
// // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';

// // // // // // // // // // // // const manager = new BleManager();

// // // // // // // // // // // // const Home = () => {
// // // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);
// // // // // // // // // // // //   const navigation = useNavigation();

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // // //       requestPermissions(); // Request necessary permissions
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       manager.destroy(); // Clean up BLE manager on component unmount
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // Function to request permissions on Android
// // // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // // //     if (Platform.OS === 'android' && Platform.Version >= 31) {
// // // // // // // // // // // //       await PermissionsAndroid.requestMultiple([
// // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
// // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
// // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// // // // // // // // // // // //       ]);
// // // // // // // // // // // //     } else {
// // // // // // // // // // // //       const locationGranted = await PermissionsAndroid.request(
// // // // // // // // // // // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// // // // // // // // // // // //       );
// // // // // // // // // // // //       if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // // // // // //         console.log('Location permission denied');
// // // // // // // // // // // //         Alert.alert('Permission Denied', 'Location permission is required for BLE scanning.');
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Function to start scanning for devices
// // // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // // //     setDevices([]); // Clear previous devices
// // // // // // // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // // // // // // //       if (error) {
// // // // // // // // // // // //         console.log(error);
// // // // // // // // // // // //         Alert.alert('Error', 'Failed to scan devices.');
// // // // // // // // // // // //         return;
// // // // // // // // // // // //       }

// // // // // // // // // // // //       console.log('Discovered device:', device || device.name || 'Unnamed Device'); // Log the device name

// // // // // // // // // // // //       setDevices((prevDevices) => {
// // // // // // // // // // // //         if (prevDevices.find((d) => d.id === device.id)) {
// // // // // // // // // // // //           return prevDevices; // Avoid adding duplicate devices
// // // // // // // // // // // //         }
// // // // // // // // // // // //         return [...prevDevices, device];
// // // // // // // // // // // //       });
// // // // // // // // // // // //     });

// // // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // // //       manager.stopDeviceScan(); // Stop scanning after 10 seconds
// // // // // // // // // // // //     }, 10000);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Function to connect to a device
// // // // // // // // // // // //   const connectToDevice = async (device) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // //       setConnectedDevice(connectedDevice);
// // // // // // // // // // // //       console.log('Connected to', connectedDevice.localName || connectedDevice.name);
// // // // // // // // // // // //       navigation.navigate("Main"); // Navigate to the main screen after connecting
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.log('Error connecting to device:', error);
// // // // // // // // // // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name || device.localName}`);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Rendering the list of discovered devices
// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <View style={{ padding: 20 }}>
// // // // // // // // // // // //       <Text style={{ fontSize: 20, textAlign: 'center' }}>Bluetooth Devices</Text>
// // // // // // // // // // // //       <Button title="Scan Devices" onPress={scanDevices} />
// // // // // // // // // // // //       <FlatList
// // // // // // // // // // // //         data={devices}
// // // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // // //           <View style={{ marginVertical: 5 }}>
// // // // // // // // // // // //             <Button
// // // // // // // // // // // //               title={item.localName || item.name || 'Unnamed Device'}
// // // // // // // // // // // //               onPress={() => connectToDevice(item)}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </View>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       />
// // // // // // // // // // // //       {connectedDevice && (
// // // // // // // // // // // //         <View style={{ marginTop: 20 }}>
// // // // // // // // // // // //           <Text style={{ color: 'red' }}>
// // // // // // // // // // // //             Connected to: {connectedDevice.localName || connectedDevice.name}
// // // // // // // // // // // //           </Text>
// // // // // // // // // // // //         </View>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </View>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default Home;


// // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert, StyleSheet } from 'react-native';
// // // // // // // // // // // // import { BleManager } from 'react-native-ble-plx';
// // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';

// // // // // // // // // // // // const manager = new BleManager();

// // // // // // // // // // // // const Home = () => {
// // // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);
// // // // // // // // // // // //   const navigation = useNavigation();

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // // //       requestPermissions(); // Request necessary permissions
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       manager.destroy(); // Clean up BLE manager on component unmount
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   // Function to request permissions on Android
// // // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       if (Platform.OS === 'android' && Platform.Version >= 31) {
// // // // // // // // // // // //         const result = await PermissionsAndroid.requestMultiple([
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// // // // // // // // // // // //         ]);

// // // // // // // // // // // //         const allGranted = Object.values(result).every((status) => status === PermissionsAndroid.RESULTS.GRANTED);
// // // // // // // // // // // //         if (!allGranted) {
// // // // // // // // // // // //           Alert.alert('Permission Denied', 'Bluetooth and Location permissions are required.');
// // // // // // // // // // // //         }
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         const locationGranted = await PermissionsAndroid.request(
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// // // // // // // // // // // //         );
// // // // // // // // // // // //         if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // // // // // //           Alert.alert('Permission Denied', 'Location permission is required for BLE scanning.');
// // // // // // // // // // // //         }
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Permission request failed:', error);
// // // // // // // // // // // //       Alert.alert('Error', 'Failed to request permissions.');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Function to start scanning for devices
// // // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // // //     setDevices([]); // Clear previous devices
// // // // // // // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // // // // // // //       if (error) {
// // // // // // // // // // // //         console.error('Device scan error:', error);
// // // // // // // // // // // //         Alert.alert('Error', 'Failed to scan devices.');
// // // // // // // // // // // //         return;
// // // // // // // // // // // //       }
      
// // // // // // // // // // // //       console.log('Discovered device:', device || device.name || 'Unnamed Device'); // Log the device name

// // // // // // // // // // // //       // console.log('Discovered device:', device.name || device.localName || 'Unnamed Device');

// // // // // // // // // // // //       setDevices((prevDevices) => {
// // // // // // // // // // // //         if (prevDevices.find((d) => d.id === device.id)) {
// // // // // // // // // // // //           return prevDevices; // Avoid adding duplicate devices
// // // // // // // // // // // //         }
// // // // // // // // // // // //         return [...prevDevices, device];
// // // // // // // // // // // //       });
// // // // // // // // // // // //     });

// // // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // // //       manager.stopDeviceScan(); // Stop scanning after 10 seconds
// // // // // // // // // // // //     }, 10000);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Function to connect to a device
// // // // // // // // // // // //   const connectToDevice = async (device) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // //       setConnectedDevice(connectedDevice);
// // // // // // // // // // // //       console.log('Connected to', connectedDevice.localName || connectedDevice.name || 'Unnamed Device');
// // // // // // // // // // // //       Alert.alert('Connected', `Connected to ${connectedDevice.localName || connectedDevice.name}`);
// // // // // // // // // // // //       navigation.navigate('Main'); // Navigate to the main screen after connecting
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Error connecting to device:', error);
// // // // // // // // // // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name || device.localName || 'Unnamed Device'}`);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // UI for rendering discovered devices
// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <View style={styles.container}>
// // // // // // // // // // // //       <Text style={styles.title}>Bluetooth Devices</Text>
// // // // // // // // // // // //       <Button title="Scan Devices" onPress={scanDevices} />

// // // // // // // // // // // //       <FlatList
// // // // // // // // // // // //         data={devices}
// // // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // // //           <View style={styles.deviceContainer}>
// // // // // // // // // // // //             <Button
// // // // // // // // // // // //               title={item.localName || item.name || 'Unnamed Device'}
// // // // // // // // // // // //               onPress={() => connectToDevice(item)}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </View>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //         ListEmptyComponent={<Text style={styles.noDevicesText}>No devices found. Please scan.</Text>}
// // // // // // // // // // // //       />

// // // // // // // // // // // //       {connectedDevice && (
// // // // // // // // // // // //         <View style={styles.connectedDeviceContainer}>
// // // // // // // // // // // //           <Text style={styles.connectedDeviceText}>
// // // // // // // // // // // //             Connected to: {connectedDevice.localName || connectedDevice.name || 'Unnamed Device'}
// // // // // // // // // // // //           </Text>
// // // // // // // // // // // //         </View>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </View>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // // // //   container: {
// // // // // // // // // // // //     flex: 1,
// // // // // // // // // // // //     padding: 20,
// // // // // // // // // // // //     backgroundColor: '#f5f5f5',
// // // // // // // // // // // //   },
// // // // // // // // // // // //   title: {
// // // // // // // // // // // //     fontSize: 22,
// // // // // // // // // // // //     fontWeight: 'bold',
// // // // // // // // // // // //     textAlign: 'center',
// // // // // // // // // // // //     marginVertical: 10,
// // // // // // // // // // // //   },
// // // // // // // // // // // //   deviceContainer: {
// // // // // // // // // // // //     marginVertical: 5,
// // // // // // // // // // // //   },
// // // // // // // // // // // //   noDevicesText: {
// // // // // // // // // // // //     textAlign: 'center',
// // // // // // // // // // // //     marginVertical: 10,
// // // // // // // // // // // //     color: 'gray',
// // // // // // // // // // // //   },
// // // // // // // // // // // //   connectedDeviceContainer: {
// // // // // // // // // // // //     marginTop: 20,
// // // // // // // // // // // //     padding: 10,
// // // // // // // // // // // //     backgroundColor: '#e0f7fa',
// // // // // // // // // // // //     borderRadius: 5,
// // // // // // // // // // // //   },
// // // // // // // // // // // //   connectedDeviceText: {
// // // // // // // // // // // //     color: '#00796b',
// // // // // // // // // // // //     fontWeight: 'bold',
// // // // // // // // // // // //   },
// // // // // // // // // // // // });

// // // // // // // // // // // // export default Home;



// // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert, StyleSheet, ActivityIndicator } from 'react-native';
// // // // // // // // // // // // import { BleManager } from 'react-native-ble-plx';
// // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';

// // // // // // // // // // // // const manager = new BleManager();

// // // // // // // // // // // // const Home = () => {
// // // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);
// // // // // // // // // // // //   const [isConnecting, setIsConnecting] = useState(false);
// // // // // // // // // // // //   const navigation = useNavigation();

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // // //       requestPermissions(); // Request necessary permissions
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       manager.destroy(); // Clean up BLE manager on component unmount
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       if (Platform.OS === 'android' && Platform.Version >= 31) {
// // // // // // // // // // // //         const result = await PermissionsAndroid.requestMultiple([
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// // // // // // // // // // // //         ]);

// // // // // // // // // // // //         const allGranted = Object.values(result).every((status) => status === PermissionsAndroid.RESULTS.GRANTED);
// // // // // // // // // // // //         if (!allGranted) {
// // // // // // // // // // // //           Alert.alert('Permission Denied', 'Bluetooth and Location permissions are required.');
// // // // // // // // // // // //         }
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         const locationGranted = await PermissionsAndroid.request(
// // // // // // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// // // // // // // // // // // //         );
// // // // // // // // // // // //         if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // // // // // //           Alert.alert('Permission Denied', 'Location permission is required for BLE scanning.');
// // // // // // // // // // // //         }
// // // // // // // // // // // //       }
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Permission request failed:', error);
// // // // // // // // // // // //       Alert.alert('Error', 'Failed to request permissions.');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // // //     setDevices([]); // Clear previous devices
// // // // // // // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // // // // // // //       if (error) {
// // // // // // // // // // // //         console.error('Device scan error:', error);
// // // // // // // // // // // //         Alert.alert('Error', 'Failed to scan devices.');
// // // // // // // // // // // //         return;
// // // // // // // // // // // //       }
      
// // // // // // // // // // // //       if (device && (device.name || device.localName)) {
// // // // // // // // // // // //         setDevices((prevDevices) => {
// // // // // // // // // // // //           if (prevDevices.find((d) => d.id === device.id)) {
// // // // // // // // // // // //             return prevDevices; // Avoid adding duplicate devices
// // // // // // // // // // // //           }
// // // // // // // // // // // //           return [...prevDevices, device];
// // // // // // // // // // // //         });
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // // //       manager.stopDeviceScan(); // Stop scanning after 10 seconds
// // // // // // // // // // // //     }, 10000);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const connectToDevice = async (device) => {
// // // // // // // // // // // //     setIsConnecting(true);
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // //       setConnectedDevice(connectedDevice);
// // // // // // // // // // // //       console.log('Connected to', connectedDevice.localName || connectedDevice.name || 'Unnamed Device');
// // // // // // // // // // // //       Alert.alert('Connected', `Connected to ${connectedDevice.localName || connectedDevice.name}`);
// // // // // // // // // // // //       navigation.navigate('Main'); // Navigate to the main screen after connecting
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       console.error('Error connecting to device:', error);
// // // // // // // // // // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name || device.localName || 'Unnamed Device'}`);
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setIsConnecting(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <View style={styles.container}>
// // // // // // // // // // // //       <Text style={styles.title}>Bluetooth Devices</Text>
// // // // // // // // // // // //       <Button title="Scan Devices" onPress={scanDevices} />

// // // // // // // // // // // //       {isConnecting && <ActivityIndicator size="large" color="#0000ff" />}

// // // // // // // // // // // //       <FlatList
// // // // // // // // // // // //         data={devices}
// // // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // // //           <View style={styles.deviceContainer}>
// // // // // // // // // // // //             <Button
// // // // // // // // // // // //               title={item.localName || item.name || 'Unnamed Device'}
// // // // // // // // // // // //               onPress={() => connectToDevice(item)}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </View>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //         ListEmptyComponent={<Text style={styles.noDevicesText}>No devices found. Please scan.</Text>}
// // // // // // // // // // // //       />

// // // // // // // // // // // //       {connectedDevice && (
// // // // // // // // // // // //         <View style={styles.connectedDeviceContainer}>
// // // // // // // // // // // //           <Text style={styles.connectedDeviceText}>
// // // // // // // // // // // //             Connected to: {connectedDevice.localName || connectedDevice.name || 'Unnamed Device'}
// // // // // // // // // // // //           </Text>
// // // // // // // // // // // //         </View>
// // // // // // // // // // // //       )}
// // // // // // // // // // // //     </View>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // // // //   container: {
// // // // // // // // // // // //     flex: 1,
// // // // // // // // // // // //     padding: 20,
// // // // // // // // // // // //     backgroundColor: '#f5f5f5',
// // // // // // // // // // // //   },
// // // // // // // // // // // //   title: {
// // // // // // // // // // // //     fontSize: 22,
// // // // // // // // // // // //     fontWeight: 'bold',
// // // // // // // // // // // //     textAlign: 'center',
// // // // // // // // // // // //     marginVertical: 10,
// // // // // // // // // // // //   },
// // // // // // // // // // // //   deviceContainer: {
// // // // // // // // // // // //     marginVertical: 5,
// // // // // // // // // // // //   },
// // // // // // // // // // // //   noDevicesText: {
// // // // // // // // // // // //     textAlign: 'center',
// // // // // // // // // // // //     marginVertical: 10,
// // // // // // // // // // // //     color: 'gray',
// // // // // // // // // // // //   },
// // // // // // // // // // // //   connectedDeviceContainer: {
// // // // // // // // // // // //     marginTop: 20,
// // // // // // // // // // // //     padding: 10,
// // // // // // // // // // // //     backgroundColor: '#e0f7fa',
// // // // // // // // // // // //     borderRadius: 5,
// // // // // // // // // // // //   },
// // // // // // // // // // // //   connectedDeviceText: {
// // // // // // // // // // // //     color: '#00796b',
// // // // // // // // // // // //     fontWeight: 'bold',
// // // // // // // // // // // //   },
// // // // // // // // // // // // });

// // // // // // // // // // // // // export default Home;
// // // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert } from 'react-native';
// // // // // // // // // // // // import { BleManager } from 'react-native-ble-plx';

// // // // // // // // // // // // const manager = new BleManager();

// // // // // // // // // // // // const Home = () => {
// // // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);

// // // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // // //       requestPermissions();
// // // // // // // // // // // //     }

// // // // // // // // // // // //     return () => {
// // // // // // // // // // // //       manager.destroy();
// // // // // // // // // // // //     };
// // // // // // // // // // // //   }, []);

// // // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // // //     // Handle permissions here (similar to your previous implementation)
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // // //     setDevices([]);
// // // // // // // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // // // // // // //       if (error) {
// // // // // // // // // // // //         Alert.alert('Error', 'Failed to scan devices.');
// // // // // // // // // // // //         return;
// // // // // // // // // // // //       }
// // // // // // // // // // // //       if (device && device.name) {
// // // // // // // // // // // //         setDevices((prevDevices) => {
// // // // // // // // // // // //           if (!prevDevices.find((d) => d.id === device.id)) {
// // // // // // // // // // // //             return [...prevDevices, device];
// // // // // // // // // // // //           }
// // // // // // // // // // // //           return prevDevices;
// // // // // // // // // // // //         });
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     setTimeout(() => {
// // // // // // // // // // // //       manager.stopDeviceScan();
// // // // // // // // // // // //     }, 10000);
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const connectToDevice = async (device) => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const connectedDevice = await manager.connectToDevice(device.id);
// // // // // // // // // // // //       setConnectedDevice(connectedDevice);
// // // // // // // // // // // //       console.log('Connected to', connectedDevice.name);
// // // // // // // // // // // //       // Discover services and characteristics
// // // // // // // // // // // //       await connectedDevice.discoverAllServicesAndCharacteristics();
// // // // // // // // // // // //       // Read data from a specific characteristic
// // // // // // // // // // // //       const characteristic = await connectedDevice.readCharacteristicForService('YOUR_SERVICE_UUID', 'YOUR_CHARACTERISTIC_UUID');
// // // // // // // // // // // //       const data = characteristic.value; // This will be in base64
// // // // // // // // // // // //       const textData = atob(data); // Decode base64
// // // // // // // // // // // //       console.log('Received Data:', textData);
// // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // //       Alert.alert('Connection Failed', 'Could not connect to the device.');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <View>
// // // // // // // // // // // //       <Button title="Scan Devices" onPress={scanDevices} />
// // // // // // // // // // // //       <FlatList
// // // // // // // // // // // //         data={devices}
// // // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // // //           <Button title={item.name} onPress={() => connectToDevice(item)} />
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       />
// // // // // // // // // // // //       {connectedDevice && <Text>Connected to: {connectedDevice.name}</Text>}
// // // // // // // // // // // //     </View>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default Home;


// // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Alert } from 'react-native';
// // // // // // // // // // // import BleManager from 'react-native-ble-manager';

// // // // // // // // // // // const Home = () => {
// // // // // // // // // // //   const [devices, setDevices] = useState([]);
// // // // // // // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     BleManager.start({ showAlert: false });

// // // // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // // // //       requestPermissions();
// // // // // // // // // // //     }

// // // // // // // // // // //     return () => {
// // // // // // // // // // //       BleManager.stop({ showAlert: false });
// // // // // // // // // // //     };
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const requestPermissions = async () => {
// // // // // // // // // // //     // Similar permission request as in previous implementations
// // // // // // // // // // //   };

// // // // // // // // // // //   const scanDevices = () => {
// // // // // // // // // // //     setDevices([]);
// // // // // // // // // // //     BleManager.scan([], 5, true).then(() => {
// // // // // // // // // // //       // Scanning for devices
// // // // // // // // // // //       console.log('Scanning...');
// // // // // // // // // // //     });

// // // // // // // // // // //     // Listen for discovered devices
// // // // // // // // // // //     BleManager.getDiscoveredPeripherals().then((peripheralsArray) => {
// // // // // // // // // // //       setDevices(peripheralsArray);
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   const connectToDevice = (device) => {
// // // // // // // // // // //     BleManager.connect(device.id)
// // // // // // // // // // //       .then(() => {
// // // // // // // // // // //         setConnectedDevice(device);
// // // // // // // // // // //         console.log('Connected to', device.name);
// // // // // // // // // // //         // Retrieve data from a specific characteristic
// // // // // // // // // // //         return BleManager.read(device.id, 'YOUR_SERVICE_UUID', 'YOUR_CHARACTERISTIC_UUID');
// // // // // // // // // // //       })
// // // // // // // // // // //       .then((data) => {
// // // // // // // // // // //         const textData = String.fromCharCode.apply(null, data);
// // // // // // // // // // //         console.log('Received Data:', textData);
// // // // // // // // // // //       })
// // // // // // // // // // //       .catch((error) => {
// // // // // // // // // // //         Alert.alert('Connection Failed', 'Could not connect to the device.');
// // // // // // // // // // //       });
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <View>
// // // // // // // // // // //       <Button title="Scan Devices" onPress={scanDevices} />
// // // // // // // // // // //       <FlatList
// // // // // // // // // // //         data={devices}
// // // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // // //         renderItem={({ item }) => (
// // // // // // // // // // //           <Button title={item.name} onPress={() => connectToDevice(item)} />
// // // // // // // // // // //         )}
// // // // // // // // // // //       />
// // // // // // // // // // //       {connectedDevice && <Text>Connected to: {connectedDevice.name}</Text>}
// // // // // // // // // // //     </View>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default Home;


// // // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // // import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// // // // // // // // // // // import NfcManager, { NfcTech } from 'react-native-nfc-manager';

// // // // // // // // // // // const App = () => {
// // // // // // // // // // //   const [nfcEnabled, setNfcEnabled] = useState(false);
// // // // // // // // // // //   const [tagData, setTagData] = useState(null);

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     NfcManager.start();
// // // // // // // // // // //     checkNfcEnabled();

// // // // // // // // // // //     // Clean up NFC manager on component unmount
// // // // // // // // // // //     return () => {
// // // // // // // // // // //       NfcManager.stop();
// // // // // // // // // // //       NfcManager.setEventListenerPlatform();
// // // // // // // // // // //     };
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const checkNfcEnabled = async () => {
// // // // // // // // // // //     const isEnabled = await NfcManager.isEnabled();
// // // // // // // // // // //     setNfcEnabled(isEnabled);
// // // // // // // // // // //   };

// // // // // // // // // // //   const readNfcTag = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       await NfcManager.requestTechnology(NfcTech.Ndef);
// // // // // // // // // // //       const tag = await NfcManager.getTag();
// // // // // // // // // // //       setTagData(tag);
// // // // // // // // // // //       Alert.alert('NFC Tag Data', JSON.stringify(tag));
// // // // // // // // // // //     } catch (ex) {
// // // // // // // // // // //       console.warn('Error reading NFC tag:', ex);
// // // // // // // // // // //       Alert.alert('Error', 'Failed to read NFC tag.');
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       NfcManager.setEventListenerPlatform();
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <View style={styles.container}>
// // // // // // // // // // //       <Text style={styles.title}>NFC Scanner</Text>
// // // // // // // // // // //       <Text>{nfcEnabled ? 'NFC is enabled' : 'NFC is not enabled'}</Text>
// // // // // // // // // // //       <Button title="Scan NFC Tag" onPress={readNfcTag} />
// // // // // // // // // // //       {tagData && (
// // // // // // // // // // //         <View style={styles.tagDataContainer}>
// // // // // // // // // // //           <Text>Tag ID: {tagData.id}</Text>
// // // // // // // // // // //           <Text>Tag Type: {tagData.type}</Text>
// // // // // // // // // // //         </View>
// // // // // // // // // // //       )}
// // // // // // // // // // //     </View>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // // //   container: {
// // // // // // // // // // //     flex: 1,
// // // // // // // // // // //     padding: 20,
// // // // // // // // // // //     backgroundColor: '#f5f5f5',
// // // // // // // // // // //   },
// // // // // // // // // // //   title: {
// // // // // // // // // // //     fontSize: 22,
// // // // // // // // // // //     fontWeight: 'bold',
// // // // // // // // // // //     textAlign: 'center',
// // // // // // // // // // //     marginBottom: 20,
// // // // // // // // // // //   },
// // // // // // // // // // //   tagDataContainer: {
// // // // // // // // // // //     marginTop: 20,
// // // // // // // // // // //     padding: 10,
// // // // // // // // // // //     backgroundColor: '#e0f7fa',
// // // // // // // // // // //     borderRadius: 5,
// // // // // // // // // // //   },
// // // // // // // // // // // });

// // // // // // // // // // // export default App;


// // // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // // import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
// // // // // // // // // // import BluetoothClassic from 'react-native-bluetooth-classic';

// // // // // // // // // // const App = () => {
// // // // // // // // // //   const [devices, setDevices] = useState([]);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     BluetoothClassic.requestBluetoothPermissions();
// // // // // // // // // //     scanDevices();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const scanDevices = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const nearbyDevices = await BluetoothClassic.list();
// // // // // // // // // //       setDevices(nearbyDevices);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('Error fetching devices:', error);
// // // // // // // // // //       Alert.alert('Error', 'Failed to fetch nearby devices.');
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const renderDeviceItem = ({ item }) => (
// // // // // // // // // //     <View style={styles.deviceContainer}>
// // // // // // // // // //       <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
// // // // // // // // // //       <Text>{item.id}</Text>
// // // // // // // // // //     </View>
// // // // // // // // // //   );

// // // // // // // // // //   return (
// // // // // // // // // //     <View style={styles.container}>
// // // // // // // // // //       <Text style={styles.title}>Nearby Bluetooth Devices</Text>
// // // // // // // // // //       <Button title="Scan for Devices" onPress={scanDevices} />
// // // // // // // // // //       <FlatList
// // // // // // // // // //         data={devices}
// // // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // // //         renderItem={renderDeviceItem}
// // // // // // // // // //         ListEmptyComponent={<Text style={styles.noDevicesText}>No devices found.</Text>}
// // // // // // // // // //       />
// // // // // // // // // //     </View>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // // //   container: {
// // // // // // // // // //     flex: 1,
// // // // // // // // // //     padding: 20,
// // // // // // // // // //     backgroundColor: '#f5f5f5',
// // // // // // // // // //   },
// // // // // // // // // //   title: {
// // // // // // // // // //     fontSize: 22,
// // // // // // // // // //     fontWeight: 'bold',
// // // // // // // // // //     textAlign: 'center',
// // // // // // // // // //     marginBottom: 20,
// // // // // // // // // //   },
// // // // // // // // // //   deviceContainer: {
// // // // // // // // // //     padding: 10,
// // // // // // // // // //     borderBottomWidth: 1,
// // // // // // // // // //     borderBottomColor: '#ccc',
// // // // // // // // // //   },
// // // // // // // // // //   deviceName: {
// // // // // // // // // //     fontSize: 18,
// // // // // // // // // //   },
// // // // // // // // // //   noDevicesText: {
// // // // // // // // // //     textAlign: 'center',
// // // // // // // // // //     marginVertical: 20,
// // // // // // // // // //     color: 'gray',
// // // // // // // // // //   },
// // // // // // // // // // });

// // // // // // // // // // export default App;


// // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // import { View, Text, Button, FlatList, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
// // // // // // // // // import BluetoothClassic from 'react-native-bluetooth-classic';

// // // // // // // // // const App = () => {
// // // // // // // // //   const [devices, setDevices] = useState([]);

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     requestBluetoothPermissions();
// // // // // // // // //     scanDevices();
// // // // // // // // //   }, []);

// // // // // // // // //   const requestBluetoothPermissions = async () => {
// // // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // // //       try {
// // // // // // // // //         const granted = await PermissionsAndroid.request(
// // // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // // //           {
// // // // // // // // //             title: 'Location Permission Required',
// // // // // // // // //             message: 'This app needs location permission to scan for Bluetooth devices.',
// // // // // // // // //             buttonNeutral: 'Ask Me Later',
// // // // // // // // //             buttonNegative: 'Cancel',
// // // // // // // // //             buttonPositive: 'OK',
// // // // // // // // //           },
// // // // // // // // //         );
// // // // // // // // //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // // //           Alert.alert('Permission Denied', 'Bluetooth scanning requires location permission.');
// // // // // // // // //         }
// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.warn(err);
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const scanDevices = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const nearbyDevices = await BluetoothClassic.list();
// // // // // // // // //       setDevices(nearbyDevices);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching devices:', error);
// // // // // // // // //       Alert.alert('Error', 'Failed to fetch nearby devices.');
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const renderDeviceItem = ({ item }) => (
// // // // // // // // //     <View style={styles.deviceContainer}>
// // // // // // // // //       <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
// // // // // // // // //       <Text>{item.id}</Text>
// // // // // // // // //     </View>
// // // // // // // // //   );

// // // // // // // // //   return (
// // // // // // // // //     <View style={styles.container}>
// // // // // // // // //       <Text style={styles.title}>Nearby Bluetooth Devices</Text>
// // // // // // // // //       <Button title="Scan for Devices" onPress={scanDevices} />
// // // // // // // // //       <FlatList
// // // // // // // // //         data={devices}
// // // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // // //         renderItem={renderDeviceItem}
// // // // // // // // //         ListEmptyComponent={<Text style={styles.noDevicesText}>No devices found.</Text>}
// // // // // // // // //       />
// // // // // // // // //     </View>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // const styles = StyleSheet.create({
// // // // // // // // //   container: {
// // // // // // // // //     flex: 1,
// // // // // // // // //     padding: 20,
// // // // // // // // //     backgroundColor: '#f5f5f5',
// // // // // // // // //   },
// // // // // // // // //   title: {
// // // // // // // // //     fontSize: 22,
// // // // // // // // //     fontWeight: 'bold',
// // // // // // // // //     textAlign: 'center',
// // // // // // // // //     marginBottom: 20,
// // // // // // // // //   },
// // // // // // // // //   deviceContainer: {
// // // // // // // // //     padding: 10,
// // // // // // // // //     borderBottomWidth: 1,
// // // // // // // // //     borderBottomColor: '#ccc',
// // // // // // // // //   },
// // // // // // // // //   deviceName: {
// // // // // // // // //     fontSize: 18,
// // // // // // // // //   },
// // // // // // // // //   noDevicesText: {
// // // // // // // // //     textAlign: 'center',
// // // // // // // // //     marginVertical: 20,
// // // // // // // // //     color: 'gray',
// // // // // // // // //   },
// // // // // // // // // });

// // // // // // // // // export default App;


// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import { View, Text, Button, FlatList, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
// // // // // // // // import BluetoothClassic from 'react-native-bluetooth-classic';
// // // // // // // // console.log(BluetoothClassic)

// // // // // // // // const App = () => {
// // // // // // // //   const [devices, setDevices] = useState([]);

// // // // // // // //   useEffect(() => {
// // // // // // // //     requestBluetoothPermissions();
// // // // // // // //     scanDevices();
// // // // // // // //   }, []);

// // // // // // // //   const requestBluetoothPermissions = async () => {
// // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // //       try {
// // // // // // // //         const granted = await PermissionsAndroid.request(
// // // // // // // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// // // // // // // //           {
// // // // // // // //             title: 'Location Permission Required',
// // // // // // // //             message: 'This app needs location permission to scan for Bluetooth devices.',
// // // // // // // //             buttonNeutral: 'Ask Me Later',
// // // // // // // //             buttonNegative: 'Cancel',
// // // // // // // //             buttonPositive: 'OK',
// // // // // // // //           },
// // // // // // // //         );
// // // // // // // //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// // // // // // // //           Alert.alert('Permission Denied', 'Bluetooth scanning requires location permission.');
// // // // // // // //         }
// // // // // // // //       } catch (err) {
// // // // // // // //         console.warn(err);
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const scanDevices = async () => {
// // // // // // // //     try {
// // // // // // // //       const nearbyDevices = await BluetoothClassic.list(); // Ensure this method exists
// // // // // // // //       setDevices(nearbyDevices);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error fetching devices:', error);
// // // // // // // //       Alert.alert('Error', 'Failed to fetch nearby devices.');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const renderDeviceItem = ({ item }) => (
// // // // // // // //     <View style={styles.deviceContainer}>
// // // // // // // //       <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
// // // // // // // //       <Text>{item.id}</Text>
// // // // // // // //     </View>
// // // // // // // //   );

// // // // // // // //   return (
// // // // // // // //     <View style={styles.container}>
// // // // // // // //       <Text style={styles.title}>Nearby Bluetooth Devices</Text>
// // // // // // // //       <Button title="Scan for Devices" onPress={scanDevices} />
// // // // // // // //       <FlatList
// // // // // // // //         data={devices}
// // // // // // // //         keyExtractor={(item) => item.id}
// // // // // // // //         renderItem={renderDeviceItem}
// // // // // // // //         ListEmptyComponent={<Text style={styles.noDevicesText}>No devices found.</Text>}
// // // // // // // //       />
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const styles = StyleSheet.create({
// // // // // // // //   container: {
// // // // // // // //     flex: 1,
// // // // // // // //     padding: 20,
// // // // // // // //     backgroundColor: '#f5f5f5',
// // // // // // // //   },
// // // // // // // //   title: {
// // // // // // // //     fontSize: 22,
// // // // // // // //     fontWeight: 'bold',
// // // // // // // //     textAlign: 'center',
// // // // // // // //     marginBottom: 20,
// // // // // // // //   },
// // // // // // // //   deviceContainer: {
// // // // // // // //     padding: 10,
// // // // // // // //     borderBottomWidth: 1,
// // // // // // // //     borderBottomColor: '#ccc',
// // // // // // // //   },
// // // // // // // //   deviceName: {
// // // // // // // //     fontSize: 18,
// // // // // // // //   },
// // // // // // // //   noDevicesText: {
// // // // // // // //     textAlign: 'center',
// // // // // // // //     marginVertical: 20,
// // // // // // // //     color: 'gray',
// // // // // // // //   },
// // // // // // // // });

// // // // // // // // export default App;


// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import { View, Text, Button, FlatList, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
// // // // // // // import { BleManager } from 'react-native-ble-plx';

// // // // // // // const manager = new BleManager();

// // // // // // // const App = () => {
// // // // // // //   const [devices, setDevices] = useState([]);

// // // // // // //   useEffect(() => {
// // // // // // //     requestPermissions();
// // // // // // //     scanDevices();
    
// // // // // // //     return () => {
// // // // // // //       manager.destroy(); // Clean up on unmount
// // // // // // //     };
// // // // // // //   }, []);

// // // // // // //   const requestPermissions = async () => {
// // // // // // //     if (Platform.OS === 'android') {
// // // // // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const scanDevices = () => {
// // // // // // //     setDevices([]); // Clear previous devices
// // // // // // //     manager.startDeviceScan(null, null, (error, device) => {
// // // // // // //       if (error) {
// // // // // // //         console.error(error);
// // // // // // //         return;
// // // // // // //       }
      
// // // // // // //       setDevices((prevDevices) => {
// // // // // // //         if (prevDevices.find((d) => d.id === device.id)) {
// // // // // // //           return prevDevices; // Avoid duplicates
// // // // // // //         }
// // // // // // //         return [...prevDevices, device];
// // // // // // //       });
// // // // // // //     });

// // // // // // //     // Stop scanning after 10 seconds
// // // // // // //     setTimeout(() => {
// // // // // // //       manager.stopDeviceScan();
// // // // // // //     }, 10000);
// // // // // // //   };

// // // // // // //   const renderDeviceItem = ({ item }) => (
// // // // // // //     <View style={styles.deviceContainer}>
// // // // // // //       <Text style={styles.deviceName}>{item.name || 'Unnamed Device'}</Text>
// // // // // // //       <Text>{item.id}</Text>
// // // // // // //     </View>
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <View style={styles.container}>
// // // // // // //       <Text style={styles.title}>Nearby Bluetooth Devices</Text>
// // // // // // //       <Button title="Scan for Devices" onPress={scanDevices} />
// // // // // // //       <FlatList
// // // // // // //         data={devices}
// // // // // // //         keyExtractor={(item) => item.id}
// // // // // // //         renderItem={renderDeviceItem}
// // // // // // //         ListEmptyComponent={<Text style={styles.noDevicesText}>No devices found.</Text>}
// // // // // // //       />
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // };

// // // // // // // const styles = StyleSheet.create({
// // // // // // //   container: {
// // // // // // //     flex: 1,
// // // // // // //     padding: 20,
// // // // // // //     backgroundColor: '#f5f5f5',
// // // // // // //   },
// // // // // // //   title: {
// // // // // // //     fontSize: 22,
// // // // // // //     fontWeight: 'bold',
// // // // // // //     textAlign: 'center',
// // // // // // //     marginBottom: 20,
// // // // // // //   },
// // // // // // //   deviceContainer: {
// // // // // // //     padding: 10,
// // // // // // //     borderBottomWidth: 1,
// // // // // // //     borderBottomColor: '#ccc',
// // // // // // //   },
// // // // // // //   deviceName: {
// // // // // // //     fontSize: 18,
// // // // // // //   },
// // // // // // //   noDevicesText: {
// // // // // // //     textAlign: 'center',
// // // // // // //     marginVertical: 20,
// // // // // // //     color: 'gray',
// // // // // // //   },
// // // // // // // });

// // // // // // // export default App;


// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert, StyleSheet } from 'react-native';
// // // // // // import BluetoothSerial from 'react-native-bluetooth-serial-next';

// // // // // // const App = () => {
// // // // // //   const [devices, setDevices] = useState([]);
// // // // // //   const [connectedDevice, setConnectedDevice] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     requestPermissions();
// // // // // //     fetchPairedDevices();

// // // // // //     return () => {
// // // // // //       if (connectedDevice) {
// // // // // //         BluetoothSerial.disconnect(connectedDevice.id);
// // // // // //       }
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const requestPermissions = async () => {
// // // // // //     if (Platform.OS === 'android') {
// // // // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH);
// // // // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
// // // // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
// // // // // //     }
// // // // // //   };

// // // // // //   const fetchPairedDevices = async () => {
// // // // // //     try {
// // // // // //       const pairedDevices = await BluetoothSerial.list();
// // // // // //       setDevices(pairedDevices);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching paired devices:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   const connectToDevice = async (device) => {
// // // // // //     try {
// // // // // //       await BluetoothSerial.connect(device.id);
// // // // // //       setConnectedDevice(device);
// // // // // //       Alert.alert('Connected', `Connected to ${device.name}`);
// // // // // //       readData();
// // // // // //     } catch (error) {
// // // // // //       console.error('Connection error:', error);
// // // // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name}`);
// // // // // //     }
// // // // // //   };

// // // // // //   const readData = async () => {
// // // // // //     try {
// // // // // //       BluetoothSerial.on('data', (data) => {
// // // // // //         console.log('Received data:', data);
// // // // // //         Alert.alert('Data Received', data.data); // Display received data
// // // // // //       });
// // // // // //     } catch (error) {
// // // // // //       console.error('Error reading data:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={styles.container}>
// // // // // //       <Text style={styles.title}>Paired Bluetooth Devices</Text>
// // // // // //       <FlatList
// // // // // //         data={devices}
// // // // // //         keyExtractor={(item) => item.id}
// // // // // //         renderItem={({ item }) => (
// // // // // //           <View style={styles.deviceContainer}>
// // // // // //             <Text>{item.name || 'Unnamed Device'}</Text>
// // // // // //             <Button title="Connect" onPress={() => connectToDevice(item)} />
// // // // // //           </View>
// // // // // //         )}
// // // // // //         ListEmptyComponent={<Text>No paired devices found.</Text>}
// // // // // //       />
// // // // // //       {connectedDevice && <Text>Connected to: {connectedDevice.name}</Text>}
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: {
// // // // // //     flex: 1,
// // // // // //     padding: 20,
// // // // // //   },
// // // // // //   title: {
// // // // // //     fontSize: 22,
// // // // // //     fontWeight: 'bold',
// // // // // //     marginBottom: 20,
// // // // // //   },
// // // // // //   deviceContainer: {
// // // // // //     flexDirection: 'row',
// // // // // //     justifyContent: 'space-between',
// // // // // //     padding: 10,
// // // // // //     borderBottomWidth: 1,
// // // // // //     borderBottomColor: '#ccc',
// // // // // //   },
// // // // // // });

// // // // // // export default App;




// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert, StyleSheet } from 'react-native';
// // // // // import BluetoothSerial from 'react-native-bluetooth-serial-next';

// // // // // const App = () => {
// // // // //   const [devices, setDevices] = useState([]);
// // // // //   const [connectedDevice, setConnectedDevice] = useState(null);

// // // // //   useEffect(() => {
// // // // //     requestPermissions();
// // // // //     fetchPairedDevices();

// // // // //     return () => {
// // // // //       if (connectedDevice) {
// // // // //         BluetoothSerial.disconnect(connectedDevice.id);
// // // // //       }
// // // // //     };
// // // // //   }, []);

// // // // //   const requestPermissions = async () => {
// // // // //     if (Platform.OS === 'android') {
// // // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH);
// // // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
// // // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
// // // // //     }
// // // // //   };

// // // // //   const fetchPairedDevices = async () => {
// // // // //     try {
// // // // //       const pairedDevices = await BluetoothSerial.list();
// // // // //       setDevices(pairedDevices);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching paired devices:', error);
// // // // //     }
// // // // //   };

// // // // //   const connectToDevice = async (device) => {
// // // // //     try {
// // // // //       await BluetoothSerial.connect(device.id);
// // // // //       setConnectedDevice(device);
// // // // //       Alert.alert('Connected', `Connected to ${device.name}`);
// // // // //       readData();
// // // // //     } catch (error) {
// // // // //       console.error('Connection error:', error);
// // // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name}`);
// // // // //     }
// // // // //   };

// // // // //   const readData = async () => {
// // // // //     try {
// // // // //       BluetoothSerial.on('data', (data) => {
// // // // //         console.log('Received data:', data);
// // // // //         Alert.alert('Data Received', data.data); // Display received data
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error('Error reading data:', error);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={styles.container}>
// // // // //       <Text style={styles.title}>Paired Bluetooth Devices</Text>
// // // // //       <FlatList
// // // // //         data={devices}
// // // // //         keyExtractor={(item) => item.id}
// // // // //         renderItem={({ item }) => (
// // // // //           <View style={styles.deviceContainer}>
// // // // //             <Text>{item.name || 'Unnamed Device'}</Text>
// // // // //             <Button title="Connect" onPress={() => connectToDevice(item)} />
// // // // //           </View>
// // // // //         )}
// // // // //         ListEmptyComponent={<Text>No paired devices found.</Text>}
// // // // //       />
// // // // //       {connectedDevice && <Text>Connected to: {connectedDevice.name}</Text>}
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   container: {
// // // // //     flex: 1,
// // // // //     padding: 20,
// // // // //   },
// // // // //   title: {
// // // // //     fontSize: 22,
// // // // //     fontWeight: 'bold',
// // // // //     marginBottom: 20,
// // // // //   },
// // // // //   deviceContainer: {
// // // // //     flexDirection: 'row',
// // // // //     justifyContent: 'space-between',
// // // // //     padding: 10,
// // // // //     borderBottomWidth: 1,
// // // // //     borderBottomColor: '#ccc',
// // // // //   },
// // // // // });

// // // // // export default App;


// // // // import React, { useEffect, useState } from 'react';
// // // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, Alert, StyleSheet } from 'react-native';
// // // // import BluetoothSerial from 'react-native-bluetooth-serial-next';

// // // // const App = () => {
// // // //   const [devices, setDevices] = useState([]);
// // // //   const [connectedDevice, setConnectedDevice] = useState(null);

// // // //   useEffect(() => {
// // // //     requestPermissions();
// // // //     fetchPairedDevices();

// // // //     return () => {
// // // //       // Check if there is a connected device before attempting to disconnect
// // // //       if (connectedDevice) {
// // // //         BluetoothSerial.disconnect(connectedDevice.id)
// // // //           .catch((error) => console.error('Disconnection error:', error));
// // // //       }
// // // //     };
// // // //   }, [connectedDevice]);

// // // //   const requestPermissions = async () => {
// // // //     if (Platform.OS === 'android') {
// // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH);
// // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
// // // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
// // // //     }
// // // //   };

// // // //   const fetchPairedDevices = async () => {
// // // //     try {
// // // //       const pairedDevices = await BluetoothSerial.list();
// // // //       setDevices(pairedDevices);
// // // //     } catch (error) {
// // // //       console.error('Error fetching paired devices:', error);
// // // //     }
// // // //   };

// // // //   const connectToDevice = async (device) => {
// // // //     try {
// // // //       await BluetoothSerial.connect(device.id);
// // // //       setConnectedDevice(device);
// // // //       Alert.alert('Connected', `Connected to ${device.name}`);
// // // //       readData();
// // // //     } catch (error) {
// // // //       console.error('Connection error:', error);
// // // //       Alert.alert('Connection Failed', `Could not connect to ${device.name}`);
// // // //     }
// // // //   };

// // // //   const readData = async () => {
// // // //     try {
// // // //       BluetoothSerial.on('data', (data) => {
// // // //         console.log('Received data:', data);
// // // //         Alert.alert('Data Received', data.data); // Display received data
// // // //       });
// // // //     } catch (error) {
// // // //       console.error('Error reading data:', error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <Text style={styles.title}>Paired Bluetooth Devices</Text>
// // // //       <FlatList
// // // //         data={devices}
// // // //         keyExtractor={(item) => item.id}
// // // //         renderItem={({ item }) => (
// // // //           <View style={styles.deviceContainer}>
// // // //             <Text>{item.name || 'Unnamed Device'}</Text>
// // // //             <Button title="Connect" onPress={() => connectToDevice(item)} />
// // // //           </View>
// // // //         )}
// // // //         ListEmptyComponent={<Text>No paired devices found.</Text>}
// // // //       />
// // // //       {connectedDevice && <Text>Connected to: {connectedDevice.name}</Text>}
// // // //     </View>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: {
// // // //     flex: 1,
// // // //     padding: 20,
// // // //   },
// // // //   title: {
// // // //     fontSize: 22,
// // // //     fontWeight: 'bold',
// // // //     marginBottom: 20,
// // // //   },
// // // //   deviceContainer: {
// // // //     flexDirection: 'row',
// // // //     justifyContent: 'space-between',
// // // //     padding: 10,
// // // //     borderBottomWidth: 1,
// // // //     borderBottomColor: '#ccc',
// // // //   },
// // // // });

// // // // export default App;
// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, Button, FlatList, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
// // // import BleManager from 'react-native-ble-manager';

// // // const App = () => {
// // //   const [devices, setDevices] = useState([]);

// // //   useEffect(() => {
// // //     BleManager.start({ showAlert: false });

// // //     if (Platform.OS === 'android') {
// // //       requestPermissions();
// // //     }

// // //     return () => {
// // //       BleManager.disconnect(); // Clean up on unmount
// // //     };
// // //   }, []);

// // //   const requestPermissions = async () => {
// // //     if (Platform.OS === 'android') {
// // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH);
// // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
// // //       await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
// // //     }
// // //   };

// // //   const scanDevices = () => {
// // //     setDevices([]); // Clear previous devices
// // //     BleManager.scan([], 5, true).then(() => {
// // //       console.log('Scanning...');
// // //     });

// // //     // You can listen for the event here
// // //     BleManager.on('BleManagerDiscoverPeripheral', (peripheral) => {
// // //       setDevices((prevDevices) => {
// // //         if (prevDevices.find((d) => d.id === peripheral.id)) {
// // //           return prevDevices; // Avoid duplicates
// // //         }
// // //         return [...prevDevices, peripheral];
// // //       });
// // //     });
// // //   };

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.title}>Scan for BLE Devices</Text>
// // //       <Button title="Scan Devices" onPress={scanDevices} />
// // //       <FlatList
// // //         data={devices}
// // //         keyExtractor={(item) => item.id}
// // //         renderItem={({ item }) => (
// // //           <View style={styles.deviceContainer}>
// // //             <Text>{item.name || 'Unnamed Device'}</Text>
// // //           </View>
// // //         )}
// // //         ListEmptyComponent={<Text>No devices found.</Text>}
// // //       />
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 20,
// // //   },
// // //   title: {
// // //     fontSize: 22,
// // //     fontWeight: 'bold',
// // //     marginBottom: 20,
// // //   },
// // //   deviceContainer: {
// // //     padding: 10,
// // //     borderBottomWidth: 1,
// // //     borderBottomColor: '#ccc',
// // //   },
// // // });

// // // export default App;


// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   Button,
// //   FlatList,
// //   PermissionsAndroid,
// //   Platform,
// //   StyleSheet,
// //   Alert,
// // } from 'react-native';
// // import BleManager from 'react-native-ble-manager';

// // const App = () => {
// //   const [devices, setDevices] = useState([]);

// //   useEffect(() => {
// //     BleManager.start({ showAlert: false });

// //     if (Platform.OS === 'android') {
// //       requestPermissions();
// //     }

// //     return () => {
// //       BleManager.disconnect(); // Clean up on unmount
// //     };
// //   }, []);

// //   const requestPermissions = async () => {
// //     if (Platform.OS === 'android') {
// //       const permissions = [
// //         PermissionsAndroid.PERMISSIONS.BLUETOOTH,
// //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
// //         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
// //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //         PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
// //       ];

// //       try {
// //         const granted = await PermissionsAndroid.requestMultiple(permissions);
// //         const allGranted = Object.values(granted).every(
// //           (status) => status === PermissionsAndroid.RESULTS.GRANTED
// //         );

// //         if (!allGranted) {
// //           Alert.alert('Permissions Denied', 'All permissions are required for Bluetooth functionality.');
// //         }
// //       } catch (err) {
// //         console.warn(err);
// //       }
// //     }
// //   };

// //   const scanDevices = () => {
// //     setDevices([]); // Clear previous devices
// //     BleManager.scan([], 5, true).then(() => {
// //       console.log('Scanning...');
// //     });

// //     BleManager.on('BleManagerDiscoverPeripheral', (peripheral) => {
// //       setDevices((prevDevices) => {
// //         if (prevDevices.find((d) => d.id === peripheral.id)) {
// //           return prevDevices; // Avoid duplicates
// //         }
// //         return [...prevDevices, peripheral];
// //       });
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Scan for BLE Devices</Text>
// //       <Button title="Scan Devices" onPress={scanDevices} />
// //       <FlatList
// //         data={devices}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <View style={styles.deviceContainer}>
// //             <Text>{item.name || 'Unnamed Device'}</Text>
// //           </View>
// //         )}
// //         ListEmptyComponent={<Text>No devices found.</Text>}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   title: {
// //     fontSize: 22,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   deviceContainer: {
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //   },
// // });

// // export default App;


// // import React, { useEffect, useState } from 'react';
// // import { View, Text, Button, PermissionsAndroid, Platform, FlatList } from 'react-native';
// // import BleManager from 'react-native-ble';

// // const BluetoothScanner = () => {
// //   const [devices, setDevices] = useState([]);
  
// //   useEffect(() => {
// //     // Request permissions for Android
// //     const requestPermissions = async () => {
// //       if (Platform.OS === 'android') {
// //         await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// //         );
// //       }
// //     };

// //     requestPermissions();
// //     BleManager.start({ showAlert: false });

// //     return () => {
// //       BleManager.stop({ showAlert: false });
// //     };
// //   }, []);

// //   const scanDevices = () => {
// //     BleManager.scan([], 5, true).then(() => {
// //       console.log('Scanning...');
// //       setDevices([]);
// //       // Set up a listener for discovered devices
// //       BleManager.on('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
// //     });
// //   };

// //   const handleDiscoverPeripheral = (peripheral) => {
// //     console.log('Discovered peripheral:', peripheral);
// //     setDevices((prevDevices) => {
// //       // Check if the device is already in the list
// //       const existing = prevDevices.find(dev => dev.id === peripheral.id);
// //       if (!existing) {
// //         return [...prevDevices, peripheral];
// //       }
// //       return prevDevices;
// //     });
// //   };

// //   return (
// //     <View>
// //       <Button title="Scan Devices" onPress={scanDevices} />
// //       <FlatList
// //         data={devices}
// //         keyExtractor={(item) => item.id}
// //         renderItem={({ item }) => (
// //           <Text>{item.name || 'Unnamed device'}</Text>
// //         )}
// //       />
// //     </View>
// //   );
// // };

// // export default BluetoothScanner;

// // App.js
// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';
// import BleManager from 'react-native-ble-manager';
// import { NativeEventEmitter } from 'react-native';

// const bleManagerEmitter = new NativeEventEmitter(BleManager);

// const App = () => {
//   const [devices, setDevices] = useState([]);

//   useEffect(() => {
//     const initializeBluetooth = async () => {
//       await requestBluetoothPermissions();
//       BleManager.start({ showAlert: false });

//       // Listen for device discovery events
//       const discoverPeripheralListener = bleManagerEmitter.addListener(
//         'BleManagerDiscoverPeripheral',
//         handleDiscoverPeripheral
//       );

//       return () => {
//         // Cleanup listener on unmount
//         discoverPeripheralListener.remove();
//       };
//     };

//     initializeBluetooth();
//   }, []);

//   const handleDiscoverPeripheral = (peripheral) => {
//     setDevices((prevDevices) => {
//       const existingDevice = prevDevices.find(
//         (device) => device.id === peripheral.id
//       );
//       if (!existingDevice) {
//         return [...prevDevices, peripheral];
//       }
//       return prevDevices;
//     });
//   };

//   const requestBluetoothPermissions = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);

//       return (
//         granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
//           PermissionsAndroid.RESULTS.GRANTED &&
//         granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
//           PermissionsAndroid.RESULTS.GRANTED &&
//         granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
//           PermissionsAndroid.RESULTS.GRANTED
//       );
//     }
//     return true; // Assume permissions are granted for iOS
//   };

//   const scanDevices = () => {
//     BleManager.scan([], 5, true).then(() => {
//       console.log('Scanning...');
//     });
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 20, marginBottom: 20 }}>Bluetooth Devices</Text>
//       <Button title="Scan for Devices" onPress={scanDevices} />
//       <FlatList
//         data={devices}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               padding: 10,
//               borderBottomWidth: 1,
//               borderBottomColor: '#ccc',
//             }}>
//             <Text style={{ color: 'blue', fontWeight: 'bold' }}>
//               Name: {item.name || 'Unnamed Device'}
//             </Text>
//             <Text style={{ color: 'green' }}>
//               ID: {item.id}
//             </Text>
//             <Text style={{ color: 'orange' }}>
//               RSSI: {item.rssi !== undefined ? item.rssi : 'N/A'}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  PermissionsAndroid,
  Platform,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = ({ navigation }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const initializeBluetooth = async () => {
      await requestBluetoothPermissions();
      BleManager.start({ showAlert: false });

      const discoverPeripheralListener = bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral
      );

      return () => {
        // Cleanup listener on unmount
        discoverPeripheralListener.remove();
      };
    };

    initializeBluetooth();
  }, []);

  const handleDiscoverPeripheral = (peripheral) => {
    setDevices((prevDevices) => {
      const existingDevice = prevDevices.find(
        (device) => device.id === peripheral.id
      );
      if (!existingDevice) {
        return [...prevDevices, peripheral];
      }
      return prevDevices;
    });
  };

  const requestBluetoothPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      return (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true; // Assume permissions are granted for iOS
  };

  const scanDevices = () => {
    BleManager.scan([], 5, true).then(() => {
      console.log('Scanning...');
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Bluetooth Devices</Text>
      <Button title="Scan for Devices" onPress={scanDevices} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}>
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>
              Name: {item.name || 'Unnamed Device'}
            </Text>
            <Text style={{ color: 'green' }}>
              ID: {item.id}
            </Text>
            <Text style={{ color: 'orange' }}>
              RSSI: {item.rssi !== undefined ? item.rssi : 'N/A'}
            </Text>
            <Button
              title="Connect"
              onPress={() => navigation.navigate('Main')}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Home;
