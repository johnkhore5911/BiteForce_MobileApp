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
