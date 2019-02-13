import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Grid from './src/component/grid';
import YAxis from './src/component/y-axis';
import XAxis from './src/component/x-axis';
import BarChart from './src/component/bar-chart';
import axios from 'axios';

export default class App extends Component {
  state = { displayBalance: [] };

  componentDidMount() {
    this.getTransactionList();
  }

  getTransactionList = () => {
    let data = null; // To mock endpoint firing network request. Providing default data as below
    // const { data } = axios.get('someEndpoint');
    data = {
      totalSavings: {
        edges: [
          {
            node: {
              id: 'tranID1',
              date: '2018-09-01',
              amount: 200
            }
          },
          {
            node: {
              id: 'tranID2',
              date: '2018-08-01',
              amount: 100
            }
          },
          {
            node: {
              id: 'tranID3',
              date: '2018-08-21',
              amount: 250
            }
          },
          {
            node: {
              id: 'tranID4',
              date: '2018-10-23',
              amount: 300
            }
          },
          {
            node: {
              id: 'tranID4',
              date: '2018-11-30',
              amount: 500
            }
          },
          {
            node: {
              id: 'tranID5',
              date: '2018-12-01',
              amount: 20
            }
          },
          {
            node: {
              id: 'tranID6',
              date: '2018-12-15',
              amount: 230
            }
          }
        ]
      }
    };

    this.massageTransactionList({ data });
  };

  massageTransactionList = ({ data }) => {
    var monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var dataByMonth = data.totalSavings.edges.reduce(function(
      dataByMonth,
      datum
    ) {
      var date = new Date(datum.node.date);
      var value = datum.node.amount;
      var month = monthNames[date.getMonth()];
      var year = ('' + date.getFullYear()).slice(-2);
      var group = month + "'" + year;

      dataByMonth[group] = (dataByMonth[group] || 0) + value;

      return dataByMonth;
    },
    {});

    const finalResult = Object.keys(dataByMonth).map(function(group) {
      return { monthName: group, balance: dataByMonth[group] };
    });

    this.setState({ displayBalance: finalResult });
  };

  render() {
    const fill = 'rgb(134, 65, 244)';

    return (
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
        <View
          style={{
            flexDirection: 'row',
            display: 'flex',
            backgroundColor: 'white'
          }}
        >
          <YAxis
            contentInset={Styles.insetStyle}
            data={this.state.displayBalance}
            yAccessor={({ item }) => item.balance}
            formatLabel={value => value}
            numberOfTicks={10}
            style={{ flex: 0.1, marginBottom: 15 }}
            svg={{ fill }}
          />
          <View style={{ flex: 0.9 }}>
            <BarChart
              style={Styles.barChartStyle}
              data={this.state.displayBalance.map(x => x.balance)}
              svg={{ fill }}
              contentInset={Styles.insetStyle}
              numberOfTicks={10}
            >
              <Grid />
            </BarChart>
            <XAxis
              data={this.state.displayBalance}
              formatLabel={(_, index) =>
                this.state.displayBalance[index].monthName
              }
              contentInset={{ left: 40, right: 40 }}
              svg={{ fill, fontSize: 10 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  insetStyle: { top: 30, bottom: 30 },
  barChartStyle: { height: 500 }
});
