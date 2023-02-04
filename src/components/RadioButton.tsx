import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  isSelected: boolean;
}

const RadioButton: React.FC<Props> = ({isSelected}) => {
  return (
    <View style={styles.outerRing}>
      {isSelected ? <View style={styles.innerRing} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'coral',
  },
});

export default RadioButton;
