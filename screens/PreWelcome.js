import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SplashScreen from './SplashScreen'; 

const PreWelcome = () => {
  const [loading, setLoading] = useState(true);
  const [isSplashVisible, setSplashVisible] = useState(true);
  const navigation = useNavigation();

  const fetchPatientDetails = async (userId) => {
    try {
      const response2 = await axios.post(
        'https://bite-force-server.vercel.app/api/v1/getPatientDetails',
        { PatientId: userId },
      );
      console.log('Updated Patient Details: ', response2.data.patients);

      await AsyncStorage.setItem('token', response2.data.patients._id);
      console.log('Saved token:', response2.data.patients._id);

      navigation.replace('PatientDetails', { item: response2.data.patients });
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };


  const checkType = async () => {
    setLoading(true); 
    try {
        const userType = await AsyncStorage.getItem('type');
        console.log('User Type:', userType);

        if(userType===null){
          setLoading(false);
          setSplashVisible(false)
        }

        if (userType === 'Doctor') {
            navigation.replace('Main'); 
        } else if (userType === 'Patient') {
            const userId = await AsyncStorage.getItem('token');
            if (userId) {
                await fetchPatientDetails(userId);
            } else {
                navigation.replace('LoginPatient'); 
            }
        } else {
            console.log('No user type found, staying on PreWelcome screen');
        }
    } catch (error) {
        console.error('Error reading AsyncStorage:', error);
    } finally {
        setLoading(false); 
    }
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false); 
      checkType(); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  const handlePress1 = async () => {
    const setType = async (value) => {
      try {
        await AsyncStorage.setItem('type', value);
        console.log("Saved type:", value);
      } catch (e) {
        console.error("Error while saving userId in async storage", e);
      }
    };
    await setType('Doctor'); 
    navigation.replace('Welcome');
  };

  const handlePress2 = async () => {
    const setType = async (value) => {
      try {
        await AsyncStorage.setItem('type', value);
        console.log("Saved type:", value);
      } catch (e) {
        console.error("Error while saving userId in async storage", e);
      }
    };
    await setType('Patient'); 
    navigation.replace('LoginPatient');
  };

  if (isSplashVisible) {
    return <SplashScreen />; 
  }

  return (
    <LinearGradient colors={['#1E7E73', '#a8e063']} style={styles.container}>
      <Text style={styles.title}>Who are you today? Your journey starts here.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress1}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>I am a Doctor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress2}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>I am a Patient</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default PreWelcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#56ab2f',
    fontWeight: 'bold',
  },
});
