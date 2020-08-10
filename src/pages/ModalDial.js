import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Modal,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {countryCodes} from '../constants/dial';

export class ModalDial extends Component {
  state = {
    codeCountry: countryCodes,
    search: '',
  };

  _renderItem = ({item}) => {
    const dialItem = `${item.name} (${item.dial_code})`;
    const {dial, selectCountry} = this.props;
    return (
      <Pressable onPress={() => selectCountry(item)}>
        <View style={{padding: 16}}>
          <Text style={{fontWeight: dialItem === dial ? 'bold' : 'normal'}}>
            {item.name} ({item.dial_code})
          </Text>
        </View>
      </Pressable>
    );
  };

  _searchCountry = (text) => {
    //passing the inserted text in textinput
    const newData = countryCodes.filter(function (item) {
      //applying filter for the inserted text in search bar
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      codeCountry: newData,
      search: text,
    });
  };

  render() {
    const {closeModal} = this.props;

    return (
      <>
        <Modal
          {...this.props}
          animationType={'fade'}
          onRequestClose={closeModal}>
          <SafeAreaView style={{backgroundColor: '#f0f0f0', flex: 1}}>
            <View style={{overflow: 'hidden', paddingBottom: 5}}>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: 54,
                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: 1},
                  shadowOpacity: 0.4,
                  shadowRadius: 3,
                  elevation: 6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                }}>
                <Pressable onPress={closeModal}>
                  <Icon name="close" size={32} color={'#000'} />
                </Pressable>
                <Text style={{fontSize: 18}}>Pilih Negara</Text>
                <Icon name="close" size={32} color={'#fff'} />
              </View>
            </View>
            <View style={{marginVertical: 16}}>
              <TextInput
                placeholder="Cari Negara"
                style={{
                  backgroundColor: 'rgba(202, 207, 210, 0.36)',
                  marginHorizontal: 16,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
                value={this.state.search}
                onChangeText={(search) => this._searchCountry(search)}
              />
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                height: 1,
                shadowColor: '#000',
                shadowOffset: {width: 1, height: 1},
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 6,
              }}
            />
            <View>
              <FlatList
                data={this.state.codeCountry}
                keyExtractor={(item) => item.code}
                renderItem={this._renderItem}
                ItemSeparatorComponent={() => {
                  return (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: 'rgba(208, 211, 212, 0.5)',
                      }}
                    />
                  );
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </>
    );
  }
}

export default ModalDial;
