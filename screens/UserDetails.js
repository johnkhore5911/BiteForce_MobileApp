import React, { useState, useEffect, useDebugValue } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import MaxValuesGraph from '../InsideScreens/MaxValuesGraph';

const { height } = Dimensions.get('window');

const UserDetails = ({ route }) => {
  console.log("Inside userDetails")

  const navigation = useNavigation();
  // const userDetails = route.params;
  const [userDetails, setUserData] = useState(route.params || {});
  const refreshData = () => {
    // Fetch updated data or update the state
    setUserData(route.params);
  };
  

  const [slots, setSlots] = useState([]);
  const [showReadings, setShowReading] = useState(true);
  const [loading, setLoading] = useState(true); // Loader state for slots

  const [maxBilateralLeft, setMaxBilateralLeft] = useState([]);
  const [maxBilateralRight, setMaxBilateralRight] = useState([]);
  const [maxUnilateralLeft, setMaxUnilateralLeft] = useState([]);
  const [maxUnilateralRight, setMaxUnilateralRight] = useState([]);
  const [maxIncisors, setMaxIncisors] = useState([]);

  const addSlot = ({ userDetails }) => {
    navigation.navigate('GetIP', { userId: userDetails.item._id, userDetails });
  };

  const renderSlotItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("SlotGraph", { item })}>
      <View style={styles.slotContainer}>
        <Text style={styles.slotTitle}>Slot ID: {item.id}</Text>
        <Text style={styles.slotText}>Unilateral Left: {item.UnilateralLeft.join(', ')}</Text>
        <Text style={styles.slotText}>Unilateral Right: {item.UnilateralRight.join(', ')}</Text>
        <Text style={styles.slotText}>Bilateral Left: {item.BilateralLeft.join(', ')}</Text>
        <Text style={styles.slotText}>Bilateral Right: {item.BilateralRight.join(', ')}</Text>
        <Text style={styles.slotText}>Incisors: {item.Incisors.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  const fetchSlots = async () => {
    try {
      console.log("Fetching slots in userDetails")
      const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatientSlot", {
        PatientId: userDetails.item._id
      });
      setSlots(response.data.patients);

      const bilateralLeft = [];
      const bilateralRight = [];
      const unilateralLeft = [];
      const unilateralRight = [];
      const incisors = [];

      response.data.patients.forEach(patient => {
        bilateralLeft.push(patient.MaxBilateralLeft);
        bilateralRight.push(patient.MaxBilateralRight);
        unilateralLeft.push(patient.MaxUnilateralLeft);
        unilateralRight.push(patient.MaxUnilateralRight);
        incisors.push(patient.MaxIncisors);
      });

      setMaxBilateralLeft(bilateralLeft);
      setMaxBilateralRight(bilateralRight);
      setMaxUnilateralLeft(unilateralLeft);
      setMaxUnilateralRight(unilateralRight);
      setMaxIncisors(incisors);
    } catch (error) {
      console.error("Error while fetching patient slot data", error);
    } finally {
      setLoading(false); // Hide loader once slots are fetched
    }
  };

  const fetchPatients = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatientSlot", {
        PatientId: userDetails.item._id
      });
      console.log("response.data.patients: ", response.data.patients);
      setSlots(response.data.patients);

      const bilateralLeft = [];
      const bilateralRight = [];
      const unilateralLeft = [];
      const unilateralRight = [];
      const incisors = [];

      response.data.patients.forEach(patient => {
        bilateralLeft.push(patient.MaxBilateralLeft);
        bilateralRight.push(patient.MaxBilateralRight);
        unilateralLeft.push(patient.MaxUnilateralLeft);
        unilateralRight.push(patient.MaxUnilateralRight);
        incisors.push(patient.MaxIncisors);
      });

      setMaxBilateralLeft(bilateralLeft);
      setMaxBilateralRight(bilateralRight);
      setMaxUnilateralLeft(unilateralLeft);
      setMaxUnilateralRight(unilateralRight);
      setMaxIncisors(incisors);
    } catch (error) {
      console.error("Error while fetching patient slot data", error);
      // console.warn("Not able to get Patient slot data");
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    refreshData()
    fetchSlots();
  }, [navigation]);

    useEffect(() => {
    fetchSlots();
  }, [userDetails]);


  // useEffect(() => {
  //   fetchSlots(); // Initial fetch
  //   const intervalId = setInterval(fetchSlots, 6000); // Fetch every 6 seconds

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []); 

  

  // Render header
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Patient Details</Text>
      <Text style={styles.headerSubtitle}>Patient ID: {userDetails.item.PatientId}</Text>
      <Text style={styles.headerSubtitle}>Name: {userDetails.item.name}</Text>
      <Text style={styles.headerSubtitle}>Age: {userDetails.item.Age}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addSlot({ userDetails })}>
        <Text style={styles.addButtonText}>Add New Slot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchPatients}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>

      <View style={styles.toggleView}>
        <TouchableOpacity onPress={() => setShowReading(true)}>
          {/* <AntDesign
            name="filetext1"
            size={30}
            color={showReadings ? "#6200ee" : "#ccc"}
          /> */}
          <Text style={showReadings ? styles.toggleActive : styles.toggleInactive}>Readings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowReading(false)}>
          {/* <Entypo
            name="bar-graph"
            size={30}
            color={!showReadings ? "#6200ee" : "#ccc"}
          /> */}
          <Text style={!showReadings ? styles.toggleActive : styles.toggleInactive}>Graphs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render graph or list
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />;
    }

    if (showReadings) {
      return (
        <FlatList
          data={slots}
          renderItem={renderSlotItem}
          keyExtractor={(item) => item._id}
        />
      );
    }

    return (
      <View style={styles.graphPlaceholder}>

        <MaxValuesGraph
          maxBilateralLeft={maxBilateralLeft}
          maxBilateralRight={maxBilateralRight}
          maxUnilateralLeft={maxUnilateralLeft}
          maxUnilateralRight={maxUnilateralRight}
          maxIncisors={maxIncisors}
        />
      </View>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderContent}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  refreshButton: {
    backgroundColor: '#03dac6',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  refreshButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#6200ee',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#03dac6',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  toggleView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  toggleActive: {
    color: '#6200ee',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  toggleInactive: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
  },
  slotContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  slotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  slotText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  graphPlaceholder: {
    // padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 20,
  },
  graphText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  loader: {
    marginTop: 20,
  },
});

export default UserDetails;
