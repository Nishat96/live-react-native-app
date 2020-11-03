import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, SafeAreaView, TextInput, Button, ScrollView, Dimensions } from 'react-native';
import Todo from './Todo';
import {BarChart, LineChart,} from "react-native-chart-kit";

const App = () => {
  
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState('');
  const [gigs, setGigs] = useState ([
    {
      description: 'Learn React Native',
      amount: 490.99,
      timestamp: new Date()
    },
    {
      description: 'Learn React Native',
      amount: 490.99,
      timestamp: new Date()
    }
  ]);
  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs])

  const addGigs = () => {
    setGigs([...gigs, {
      description: description,
      amount: amount,
      timestamp: new Date(),
    }])

    setDescription('');
    setAmount('')
  }
    return (
      <SafeAreaView >
        <View style={styles.mainSection}>
        <View style={styles.firstLabel}>
            <Text style={styles.titleText}>Live-React-Native</Text>
        </View>
        
        <View>
          <Text>Bezier Line Chart</Text>
          <LineChart style={styles.chart}
            data={{
              labels: [new Date(), "Tomorrow"],
              datasets: [
                {
                  data: [
                    gigs[0].amount * 100,
                    gigs[1].amount * 100,
                    Math.random() * 100,
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "green",
              backgroundGradientTo: "green",
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "yellow"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              marginHorizontal: 8,
              borderRadius: 16
            }}
          />
        </View>

        <Text>Net Income: ${total}</Text>
        <TextInput style={styles.input}
          value={description}
          placeholder='Enter a description'
          keyboardType='numeric'
          onChangeText={text => setDescription(text)}
        />
        <TextInput style={styles.input}
          value={amount}
          placeholder='Enter the amount you made ins USD($)'
          keyboardType='numeric'
          onChangeText={text => setAmount(text)}
        />
        <Button disabled={!amount && !description}onPress={addGigs} title='ADD GIGS'/>
        {gigs.map(gig => (
            <View>
              <Text>{gig.description}</Text>
              <Text>{gig.amount}</Text>
            </View>
        ))}
        </View>
      </SafeAreaView>
    );
};
const styles = StyleSheet.create({
        firstLabel: {
          padding: 30,
        },
        titleText : {
          fontSize: 30,
          fontWeight: 'bold'
        },
        input: {
          height: 40,
          borderColor: 'blue',
          borderWidth: 1,
          marginBottom: 10,
          padding: 20,
          marginTop: 20,
        },
        mainSection: {
          padding: 10,
        },
        chart: {
          paddingLeft: 60,
        },
})

export default App;