import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  status: String;
}

const StatusLabel: React.FC<Props> = ({status}) => {
  const isSuccess = status === 'SUCCESS';
  return (
    <View>
      <Text style={isSuccess ? styles.labelSuccess : styles.labelPending}>
        {isSuccess ? 'Berhasil' : 'Pengecekan'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelSuccess: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: 'mediumseagreen',
    color: 'white',
    fontWeight: 'bold',
  },
  labelPending: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: 'coral',
    borderWidth: 2,
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
  },
});

export default StatusLabel;
