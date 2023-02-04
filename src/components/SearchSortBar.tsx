import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioButton from './RadioButton';

interface Props {
  onSearch: (text: string) => void;
  onSort: (text: string) => void;
}

const SearchSortBar: React.FC<Props> = ({onSearch, onSort}) => {
  const [text, setText] = useState('');
  const [selectedSort, setSelectedSort] = useState('URUTKAN');
  const [modalVisible, setModalVisible] = useState(false);

  const sortItems = [
    'URUTKAN',
    'Nama A-Z',
    'Nama Z-A',
    'Tanggal Terbaru',
    'Tanggal Terlama',
  ];

  const onOpenModal = () => {
    setModalVisible(true);
  };
  const onCloseModal = () => {
    setModalVisible(false);
  };
  const onSubmitSearch = () => onSearch(text);
  const renderModalRadioItem: ListRenderItem<string> = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemModal}
        onPress={() => {
          setSelectedSort(item);
          onSort(item);
          setModalVisible(false);
        }}>
        <RadioButton isSelected={item === selectedSort} />
        <Text style={styles.textModal}>{item}</Text>
      </TouchableOpacity>
    ),
    [onSort, selectedSort],
  );
  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <View style={styles.bar}>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={onCloseModal}>
        <TouchableOpacity style={styles.mainModal} onPress={onCloseModal}>
          <View style={styles.centerModal}>
            <View style={styles.flatModal}>
              <FlatList
                data={sortItems}
                renderItem={renderModalRadioItem}
                keyExtractor={keyExtractor}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.searchRowItems}>
        <TouchableOpacity style={styles.button} onPress={onSubmitSearch}>
          <Image
            style={styles.iconSearch}
            source={require('../images/search.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholderTextColor={'gray'}
          onChangeText={setText}
          onSubmitEditing={onSubmitSearch}
          placeholder="Cari nama, bank, atau nominal"
          value={text}
        />
      </View>
      <TouchableOpacity style={styles.sortRowItems} onPress={onOpenModal}>
        <Text style={styles.textDropdown}>{showLabel(selectedSort)}</Text>
        <Image
          style={styles.iconDropdown}
          source={require('../images/dropdown.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

function showLabel(selected: string) {
  switch (selected) {
    case 'Tanggal Terbaru':
      return 'Terbaru';
    case 'Tanggal Terlama':
      return 'Terlama';
    default:
      return selected;
  }
}

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  searchRowItems: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortRowItems: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    flex: 1,
    marginRight: 2,
    color: 'black',
  },
  button: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSearch: {
    height: 20,
    width: 20,
    tintColor: 'gray',
  },
  iconDropdown: {
    height: 15,
    width: 15,
    tintColor: 'coral',
  },
  textDropdown: {
    fontWeight: 'bold',
    color: 'coral',
    marginRight: 8,
  },
  mainModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerModal: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 20,
    elevation: 5,
  },
  flatModal: {
    flex: 1,
  },
  itemModal: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
  },
  textModal: {
    color: 'black',
    marginLeft: 10,
    flexDirection: 'row',
    flexGrow: 1,
  },
});

export default SearchSortBar;
