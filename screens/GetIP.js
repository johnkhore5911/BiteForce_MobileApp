import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { useNavigation } from '@react-navigation/native';

const App = ({ route }) => {
  const { userId, userDetails } = route.params || {};
  const [ipAddress, setIpAddress] = useState('');
  const navigation = useNavigation();

  const fetchIpAddress = () => {
    NetworkInfo.getIPAddress()
      .then(ip => {
        setIpAddress(ip); 
      })
      .catch(error => {
        console.error("Error fetching IP address: ", error);
        Alert.alert("Error", "Could not fetch IP address.");
      });
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  const addSlot = ({ userDetails }) => {
    navigation.navigate('BiteForceMonitor', { userId: userDetails.item._id, userDetails });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BiteForce Monitor</Text>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Please connect to the "BiteForce" Wi-Fi before proceeding to monitor the patient's data.
        </Text>
      </View>

      {ipAddress ? (
        <Text style={styles.ipAddress}>Connected IP: {ipAddress}</Text>
      ) : (
        <Text style={styles.ipAddress}>Fetching IP address...</Text>
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => addSlot({ userDetails })}>
        <Text style={styles.addButtonText}>Add New Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFB',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#03dac6',
  },
  instructionContainer: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffeeba',
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 16,
    color: '#856404',
    textAlign: 'center',
  },
  ipAddress: {
    fontSize: 18,
    marginBottom: 30,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#03dac6',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
