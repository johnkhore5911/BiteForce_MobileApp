// import React, { useState,useEffect } from 'react';
// import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Loader from './Loader';

// const PreWelcome = () => {
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();


//   const fetchPatientDetails = async userId => {
//     try {
//       const response2 = await axios.post(
//         'https://bite-force-server.vercel.app/api/v1/getPatientDetails',
//         {PatientId: userId},
//       );
//       console.log('Updated Patient Details: ', response2.data.patients);

//       // Store token in AsyncStorage
//       await AsyncStorage.setItem('token', response2.data.patients._id);
//       console.log('Saved token:', response2.data.patients._id);

//       // Navigate to PatientDetails screen
//       navigation.replace('PatientDetails', {item: response2.data.patients});
//     } catch (error) {
//       console.error('Error fetching patient details:', error);
//       // console.warn('Unable to fetch patient data.');
//     }
//   };



//   const checkType = async () => {
//     setLoading(true);
//     try {
//       const userType = await AsyncStorage.getItem('type');
//       console.log('User Type:', userType);

//       if (userType === 'Doctor') {
//         navigation.replace('Main'); // Navigate doctor to Home screen
//       } else if (userType === 'Patient') {
//         const userId = await AsyncStorage.getItem('token');
//         if (userId) {
//           // If token exists, fetch patient details and navigate
//           await fetchPatientDetails(userId);
//         } else {
//           // console.warn('No token found for Patient');
//         }
//       } else {
//         // console.warn('No user type found');
//       }
//     } catch (error) {
//       console.error('Error reading AsyncStorage:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkType(); // On component mount, check the user type
//   }, []);



//   const handlePress1 = () => {

//     const setType = async (value) => {
//       try {
//         await AsyncStorage.setItem('type', value);
//         console.log("saved type:",value);
//         // console.warn("saved type:",value);
//         console.log(value)
//       } catch (e) {
//           // console.warn("Error while saving userId in async storage",e);
//       }
//     };
//     setType('Doctor');

//     navigation.replace('Welcome');
//   };
//   const handlePress2 = async() => {

//     const setType = async (value) => {
//       try {
//         await AsyncStorage.setItem('type', value);
//         console.log("saved type:",value);
//         // console.warn("saved type:",value);
//         console.log(value)
//       } catch (e) {
//           // console.warn("Error while saving userId in async storage",e);
//       }
//     };
//     setType('Patient');

//     navigation.replace('LoginPatient');
//   };




// //   if (loading) {
// //     return <Loader />; // Show loader while fetching data
// //   }

//   return (
//     <LinearGradient colors={['#1E7E73', '#a8e063']} style={styles.container}>
//         <Text style={styles.title}>Who are you today? Your journey starts here.</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handlePress1()}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.buttonText}>I am a Doctor</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => handlePress2()}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.buttonText}>I am a Patient</Text>
//         </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// export default PreWelcome;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 40,
//     paddingHorizontal: 30, // Adjust padding for better centering
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 30,
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#56ab2f',
//     fontWeight: 'bold',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import Loader from './Loader';

// const PreWelcome = () => {
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   const fetchPatientDetails = async (userId) => {
//     try {
//       const response2 = await axios.post(
//         'https://bite-force-server.vercel.app/api/v1/getPatientDetails',
//         { PatientId: userId },
//       );
//       console.log('Updated Patient Details: ', response2.data.patients);

//       // Store token in AsyncStorage
//       await AsyncStorage.setItem('token', response2.data.patients._id);
//       console.log('Saved token:', response2.data.patients._id);

//       // Navigate to PatientDetails screen
//       navigation.replace('PatientDetails', { item: response2.data.patients });
//     } catch (error) {
//       console.error('Error fetching patient details:', error);
//     }
//   };

//   const checkType = async () => {
//     setLoading(true); // Set loading to true before starting the checks
//     try {
//       const userType = await AsyncStorage.getItem('type');
//       console.log('User Type:', userType);

//       if (userType === 'Doctor') {
//         navigation.replace('Main'); // Navigate doctor to Home screen
//       } else if (userType === 'Patient') {
//         const userId = await AsyncStorage.getItem('token');
//         if (userId) {
//           // If token exists, fetch patient details and navigate
//           await fetchPatientDetails(userId);
//         }
//       }
//     } catch (error) {
//       console.error('Error reading AsyncStorage:', error);
//     } finally {
//       setLoading(false); // Set loading to false once checks are done
//     }
//   };

//   useEffect(() => {
//     checkType(); // On component mount, check the user type
//   }, []);

//   const handlePress1 = async () => {
//     const setType = async (value) => {
//       try {
//         await AsyncStorage.setItem('type', value);
//         console.log("saved type:", value);
//       } catch (e) {
//         console.error("Error while saving userId in async storage", e);
//       }
//     };
//     await setType('Doctor'); // Ensure type is saved before navigating
//     navigation.replace('Welcome');
//   };

//   const handlePress2 = async () => {
//     const setType = async (value) => {
//       try {
//         await AsyncStorage.setItem('type', value);
//         console.log("saved type:", value);
//       } catch (e) {
//         console.error("Error while saving userId in async storage", e);
//       }
//     };
//     await setType('Patient'); // Ensure type is saved before navigating
//     navigation.replace('LoginPatient');
//   };

//   if (loading) {
//     return <Loader />; // Show loader while fetching data
//   }

//   return (
//     <LinearGradient colors={['#1E7E73', '#a8e063']} style={styles.container}>
//       <Text style={styles.title}>Who are you today? Your journey starts here.</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={handlePress1}
//         activeOpacity={0.8}
//       >
//         <Text style={styles.buttonText}>I am a Doctor</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={handlePress2}
//         activeOpacity={0.8}
//       >
//         <Text style={styles.buttonText}>I am a Patient</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// };

// export default PreWelcome;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 40,
//     paddingHorizontal: 30,
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     borderRadius: 30,
//     marginBottom: 20,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 1, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#56ab2f',
//     fontWeight: 'bold',
//   },
// });


import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SplashScreen from './SplashScreen'; // Import the SplashScreen component

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

      // Store token in AsyncStorage
      await AsyncStorage.setItem('token', response2.data.patients._id);
      console.log('Saved token:', response2.data.patients._id);

      // Navigate to PatientDetails screen
      navigation.replace('PatientDetails', { item: response2.data.patients });
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  // const checkType = async () => {
  //   setLoading(true); // Set loading to true before starting the checks
  //   try {
  //     const userType = await AsyncStorage.getItem('type');
  //     console.log('User Type:', userType);

  //     if (userType === 'Doctor') {
  //       navigation.replace('Main'); // Navigate doctor to Home screen
  //     } else if (userType === 'Patient') {
  //       const userId = await AsyncStorage.getItem('token');
  //       if (userId) {
  //         // If token exists, fetch patient details and navigate
  //         await fetchPatientDetails(userId);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error reading AsyncStorage:', error);
  //   } finally {
  //     setLoading(false); // Set loading to false once checks are done
  //   }
  // };



  const checkType = async () => {
    setLoading(true); // Set loading to true before starting the checks
    try {
        const userType = await AsyncStorage.getItem('type');
        console.log('User Type:', userType);

        if(userType===null){
          setLoading(false);
          setSplashVisible(false)
        }

        // Handle cases where userType is null
        if (userType === 'Doctor') {
            navigation.replace('Main'); // Navigate doctor to Home screen
        } else if (userType === 'Patient') {
            const userId = await AsyncStorage.getItem('token');
            if (userId) {
                // If token exists, fetch patient details and navigate
                await fetchPatientDetails(userId);
            } else {
                navigation.replace('LoginPatient'); // Navigate to login if no token
            }
        } else {
            // No user type set, you might want to show the PreWelcome screen here
            console.log('No user type found, staying on PreWelcome screen');
            // navigation.navigate("PreWelcome")
        }
    } catch (error) {
        console.error('Error reading AsyncStorage:', error);
    } finally {
        setLoading(false); // Set loading to false once checks are done
    }
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false); // Hide the splash screen after a delay
      checkType(); // Check the user type
    }, 1000); // Splash screen duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
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
    await setType('Doctor'); // Ensure type is saved before navigating
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
    await setType('Patient'); // Ensure type is saved before navigating
    navigation.replace('LoginPatient');
  };

  if (isSplashVisible) {
    return <SplashScreen />; // Render the splash screen instead of loader
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
