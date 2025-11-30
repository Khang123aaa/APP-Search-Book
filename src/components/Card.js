// src/components/Card.js
import React, {memo}from 'react';
import { VStack, Box, Divider } from 'native-base';
import { StyleSheet, Platform } from 'react-native';

const Card = props => {
  return (
    <Box border="1" borderRadius="md" style={{ ...styles.card, ...props.style }}>
      <VStack space="4" divider={<Divider />}>
        <Box px="4">
          {props.children}
        </Box>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height:0 },
    shadowRadius: 16,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#470000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.2,
        elevation: 1,
      },
      android: {},
    }),
  }
});

export default memo(Card);