// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('PreWelcome'); // Navigate to your PreWelcome screen
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/dic.png')} // Replace with your logo path
        resizeMode='contain'
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to BiteForce</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Match your theme color
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
