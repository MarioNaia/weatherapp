import React from 'react';
import { FlatList } from 'react-native';

import { Row, Separator } from '../components/Row';
import cities from '../data/cities';

export default ({ navigation }) => (
  <FlatList
    data={cities}
    keyExtractor={item => {
      return `${item.id}`;
    }}
    renderItem={({ item }) => {
      const name = `${item.name}`;

      return (
        <Row
          image={{ uri: item.photo }}
          title={name}
          subtitle={item.country}
          onPress={() => navigation.push('WeatherDetails', { contact: item })}
        />
      );
    }}
    ItemSeparatorComponent={Separator}
    ListHeaderComponent={() => <Separator />}
    ListFooterComponent={() => <Separator />}
    contentContainerStyle={{ paddingVertical: 20 }}
  />
);