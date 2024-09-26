// // MaxValuesDisplay.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const MaxValuesGraph = ({ maxBilateralLeft, maxBilateralRight, maxUnilateralLeft, maxUnilateralRight, maxIncisors }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Max Values:</Text>
//       <Text style={styles.text}>Max Bilateral Left: {maxBilateralLeft.flat().join(', ')}</Text>
//       <Text style={styles.text}>Max Bilateral Right: {maxBilateralRight.flat().join(', ')}</Text>
//       <Text style={styles.text}>Max Unilateral Left: {maxUnilateralLeft.flat().join(', ')}</Text>
//       <Text style={styles.text}>Max Unilateral Right: {maxUnilateralRight.flat().join(', ')}</Text>
//       <Text style={styles.text}>Max Incisors: {maxIncisors.flat().join(', ')}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   // container: {
//   //   marginHorizontal: 20,
//   //   paddingVertical: 20,
//   //   backgroundColor: '#fff',
//   //   borderRadius: 10,
//   //   shadowColor: '#000',
//   //   shadowOffset: { width: 0, height: 2 },
//   //   shadowOpacity: 0.1,
//   //   shadowRadius: 4,
//   //   elevation: 5,
//   // },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   text: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 5,
//   },
// });

// export default MaxValuesGraph;



import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const MaxValuesGraph = ({ maxBilateralLeft, maxBilateralRight, maxUnilateralLeft, maxUnilateralRight, maxIncisors }) => {

  // Define common chart config
  const chartConfig = {
    backgroundGradientFrom: '#141E30',
    backgroundGradientTo: '#243B55',
    color: (opacity = 1) => `rgba(244, 208, 63, ${opacity})`, // Gradient color for line
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 1, 
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Max Values Graph</Text>

      <View style={styles.graphContainer}>
        <Text style={styles.label}>Max Bilateral Left</Text>
        <LineChart
          data={{
            labels: maxBilateralLeft.map((_, index) => `${index + 1}`), // X-axis labels
            datasets: [{ data: maxBilateralLeft }],
          }}
          width={screenWidth - 40} // from react-native
          height={220}
          chartConfig={chartConfig}
          bezier
          fromZero 
          style={styles.chart}
        />
      </View>

      <View style={styles.graphContainer}>
        <Text style={styles.label}>Max Bilateral Right</Text>
        <LineChart
          data={{
            labels: maxBilateralRight.map((_, index) => `${index + 1}`),
            datasets: [{ data: maxBilateralRight }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero 
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.graphContainer}>
        <Text style={styles.label}>Max Unilateral Left</Text>
        <LineChart
          data={{
            labels: maxUnilateralLeft.map((_, index) => `${index + 1}`),
            datasets: [{ data: maxUnilateralLeft }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          fromZero 
        />
      </View>

      <View style={styles.graphContainer}>
        <Text style={styles.label}>Max Unilateral Right</Text>
        <LineChart
          data={{
            labels: maxUnilateralRight.map((_, index) => `${index + 1}`),
            datasets: [{ data: maxUnilateralRight }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          fromZero 
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.graphContainer}>
        <Text style={styles.label}>Max Incisors</Text>
        <LineChart
          data={{
            labels: maxIncisors.map((_, index) => `${index + 1}`),
            datasets: [{ data: maxIncisors }],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          fromZero 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: '#141E30',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f4d03f',
    marginBottom: 20,
    textAlign: 'center',
  },
  graphContainer: {
    marginBottom: 30,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MaxValuesGraph;
