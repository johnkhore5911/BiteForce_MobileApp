import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation, useRoute } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: '#000428',
  backgroundGradientFrom: '#004e92',
  backgroundGradientTo: '#000428',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const SlotGraph = () => {
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

  const [selectedData, setSelectedData] = useState({ value: null, label: null });
  const [displayedValue, setDisplayedValue] = useState(null); // New state for button click values

  const handleDataPointClick = (data) => {
    if (data && data.value !== undefined && data.dataset && data.dataset.labels) {
      const index = data.index;
      const label = data.dataset.labels[index];
      const value = data.value;
      setSelectedData({ value, label });
    }
  };

  const handleButtonClick = (key) => {
    // Show max value when button is clicked
    const maxValueKey = `Max${key}`;
    setDisplayedValue(item[maxValueKey]);
  };

  const processData = (key) => {
    return {
      labels: item[key].map((_, index) => `R${index + 1}`),
      datasets: [{ data: item[key], strokeWidth: 4 }]
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Bilateral Left</Text>
          <LineChart
            data={processData('BilateralLeft')}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            onDataPointClick={handleDataPointClick}
            style={styles.chartStyle}
            fromZero 
          />
          {selectedData.value !== null && selectedData.label !== null && (
            <Text style={styles.dataPointLabel}>
              {`Value: ${selectedData.value} (Day: ${selectedData.label})`}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick('BilateralLeft')}
          >
            <Text style={styles.buttonText}>Show Max Bilateral Left</Text>
          </TouchableOpacity>
          {displayedValue !== null && (
            <Text style={styles.displayedValue}>
              Max Value: {displayedValue}
            </Text>
          )}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Bilateral Right</Text>
          <LineChart
            data={processData('BilateralRight')}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            onDataPointClick={handleDataPointClick}
            style={styles.chartStyle}
            fromZero 
          />
          {selectedData.value !== null && selectedData.label !== null && (
            <Text style={styles.dataPointLabel}>
              {`Value: ${selectedData.value} (Day: ${selectedData.label})`}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick('BilateralRight')}
          >
            <Text style={styles.buttonText}>Show Max Bilateral Right</Text>
          </TouchableOpacity>
          {displayedValue !== null && (
            <Text style={styles.displayedValue}>
              Max Value: {displayedValue}
            </Text>
          )}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Incisors</Text>
          <LineChart
            data={processData('Incisors')}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            onDataPointClick={handleDataPointClick}
            style={styles.chartStyle}
            fromZero 
          />
          {selectedData.value !== null && selectedData.label !== null && (
            <Text style={styles.dataPointLabel}>
              {`Value: ${selectedData.value} (Day: ${selectedData.label})`}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick('Incisors')}
          >
            <Text style={styles.buttonText}>Show Max Incisors</Text>
          </TouchableOpacity>
          {displayedValue !== null && (
            <Text style={styles.displayedValue}>
              Max Value: {displayedValue}
            </Text>
          )}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Unilateral Left</Text>
          <LineChart
            data={processData('UnilateralLeft')}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            onDataPointClick={handleDataPointClick}
            style={styles.chartStyle}
            fromZero 
          />
          {selectedData.value !== null && selectedData.label !== null && (
            <Text style={styles.dataPointLabel}>
              {`Value: ${selectedData.value} (Day: ${selectedData.label})`}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick('UnilateralLeft')}
          >
            <Text style={styles.buttonText}>Show Max Unilateral Left</Text>
          </TouchableOpacity>
          {displayedValue !== null && (
            <Text style={styles.displayedValue}>
              Max Value: {displayedValue}
            </Text>
          )}
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Unilateral Right</Text>
          <LineChart
            data={processData('UnilateralRight')}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            onDataPointClick={handleDataPointClick}
            style={styles.chartStyle}
            fromZero 
          />
          {selectedData.value !== null && selectedData.label !== null && (
            <Text style={styles.dataPointLabel}>
              {`Value: ${selectedData.value} (Day: ${selectedData.label})`}
            </Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonClick('UnilateralRight')}
          >
            <Text style={styles.buttonText}>Show Max Unilateral Right</Text>
          </TouchableOpacity>
          {displayedValue !== null && (
            <Text style={styles.displayedValue}>
              Max Value: {displayedValue}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141E30',
  },
  scrollView: {
    marginHorizontal: 16,
  },
  chartContainer: {
    marginTop: 32,
    alignItems: 'center',
    backgroundColor: '#1E2A47',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  dataPointLabel: {
    fontSize: 16,
    marginTop: 8,
    color: '#ffda79',
  },
  button: {
    backgroundColor: '#ffa726',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  displayedValue: {
    marginTop: 10,
    fontSize: 18,
    color: '#f4d03f',
    fontWeight: 'bold',
  },
});

export default SlotGraph;
