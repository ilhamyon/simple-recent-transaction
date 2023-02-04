import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import {Transaction} from '../pages/TransactionList';
import {StackParamList} from '../utils/ScreenNavigation';
import {
  formatIndonesianDate,
  formatRupiah,
  getStyleBankName,
} from '../utils/TextFormatter';
import StatusLabel from './StatusLabel';

interface Props {
  item: Transaction;
}

const TransactionCard: React.FC<Props> = ({item}) => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const onNavigate = () => navigation.navigate('Details', {data: item});
  return (
    <TouchableOpacity style={getStyleCard(item.status)} onPress={onNavigate}>
      <View style={[styles.rowItems, {justifyContent: 'space-between'}]}>
        <View>
          <View style={styles.rowItems}>
            <Text style={getStyleBankName(item.sender_bank)}>
              {item.sender_bank}
            </Text>
            <Image
              style={styles.icon}
              source={require('../images/arrow_right.png')}
            />
            <Text style={getStyleBankName(item.beneficiary_bank)}>
              {item.beneficiary_bank}
            </Text>
          </View>
          <Text style={[styles.itemText, {textTransform: 'uppercase'}]}>
            {item.beneficiary_name}
          </Text>
          <View style={styles.rowItems}>
            <Text style={styles.itemText}>{formatRupiah(item.amount)}</Text>
            <Text style={styles.bulletItem}>{'\u2B24'}</Text>
            <Text style={styles.itemText}>
              {formatIndonesianDate(item.created_at)}
            </Text>
          </View>
        </View>
        <StatusLabel status={item.status} />
      </View>
    </TouchableOpacity>
  );
};

function getStyleCard(status: string): ViewStyle {
  return {
    flex: 1,
    margin: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderLeftWidth: 5,
    borderLeftColor: status === 'SUCCESS' ? 'mediumseagreen' : 'coral',
    backgroundColor: 'white',
  };
}

const styles = StyleSheet.create({
  itemText: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
  },
  bulletItem: {
    marginHorizontal: 4,
    color: 'black',
    fontSize: 8,
    marginTop: 4,
  },
  rowItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
    height: '75%',
    width: '10%',
  },
});

export default TransactionCard;
