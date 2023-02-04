import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackParamList} from '../utils/ScreenNavigation';
import {
  formatIndonesianDate,
  formatRupiah,
  getStyleBankName,
} from '../utils/TextFormatter';

type Props = NativeStackScreenProps<StackParamList, 'Details'>;

const TransactionDetails = ({navigation, route}: Props) => {
  const {data} = route.params;

  const onPressBack = () => navigation.goBack();

  return (
    <View>
      <View style={styles.section}>
        <View style={styles.rowItems}>
          <Text style={styles.headerText}>{`ID TRANSAKSI: #${data.id}`}</Text>
          <Image
            style={styles.iconCopy}
            source={require('../images/copy.png')}
          />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.rowFarItems}>
          <Text style={styles.headerText}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity onPress={onPressBack}>
            <Text style={styles.closeButton}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.rowItems}>
          <Text style={getStyleBankName(data.sender_bank)}>
            {data.sender_bank}
          </Text>
          <Image
            style={styles.iconArrow}
            source={require('../images/arrow_right.png')}
          />
          <Text style={getStyleBankName(data.beneficiary_bank)}>
            {data.beneficiary_bank}
          </Text>
        </View>
        <View style={styles.rowItems}>
          <View style={styles.leftSideItems}>
            <Text style={styles.headerText}>- {data.beneficiary_name}</Text>
            <Text style={styles.itemText}>{data.account_number}</Text>
          </View>
          <View style={styles.rightSideItems}>
            <Text style={styles.headerText}>NOMINAL</Text>
            <Text style={styles.itemText}>{formatRupiah(data.amount)}</Text>
          </View>
        </View>
        <View style={styles.rowItems}>
          <View style={styles.leftSideItems}>
            <Text style={styles.headerText}>BERITA TRANSFER</Text>
            <Text style={styles.itemText}>{data.remark}</Text>
          </View>
          <View style={styles.rightSideItems}>
            <Text style={styles.headerText}>KODE UNIK</Text>
            <Text style={styles.itemText}>{data.unique_code}</Text>
          </View>
        </View>

        <Text style={styles.headerText}>WAKTU DIBUAT</Text>
        <Text style={styles.itemText}>
          {formatIndonesianDate(data.created_at)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
  },
  itemText: {
    fontSize: 14,
    color: 'black',
  },
  rowItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFarItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSideItems: {
    flex: 3,
    marginBottom: 20,
  },
  rightSideItems: {
    flex: 2,
    marginBottom: 20,
  },
  iconCopy: {
    tintColor: 'coral',
    marginLeft: 5,
    height: '100%',
    width: '5%',
  },
  iconArrow: {
    marginHorizontal: 5,
    height: '75%',
    width: '5%',
  },
  closeButton: {
    color: 'coral',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default TransactionDetails;
