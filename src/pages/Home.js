import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import ModalDial from './ModalDial';

const Home = ({navigation}) => {
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [visible, setVisible] = useState(false);
  const [dialName, setDialName] = useState('Indonesia');
  const [dialCode, setDialCode] = useState('+62');
  const [err, setErr] = useState('Contoh: 08XXXXXXXXXX');

  const _sendMessage = () => {
    let num = `${dialCode}${number.substr(1)}`;
    let url = `https://api.whatsapp.com/send?phone=${num}&text=${text}`;
    navigation.navigate('Send', {url});
  };

  const _selectCountry = (item) => {
    setDialCode(item.dial_code);
    setDialName(item.name);
    setVisible(false);
  };

  const _closeModal = () => {
    setVisible(false);
  };

  const changeNumber = (num) => {
    phoneValidate(num);
    setNumber(num);
  };

  const phoneValidate = (phone) => {
    let phoneErr;
    !phone
      ? (phoneErr = 'Contoh: 08XXXXXXXXXX')
      : phone.charAt(0) !== '0'
      ? (phoneErr = 'Telepon tidak valid')
      : phone.length < 10 || phone.length > 15
      ? (phoneErr = 'Minimal 10 - 15 karakter')
      : (phoneErr = '');
    setErr(phoneErr);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalDial
        visible={visible}
        closeModal={_closeModal}
        dial={`${dialName} (${dialCode})`}
        selectCountry={(item) => _selectCountry(item)}
      />
      <View>
        <Pressable onPress={() => setVisible(true)}>
          <View style={styles.dial}>
            <Text style={styles.textDial}>
              {dialName} ({dialCode})
            </Text>
            <Icon name={'chevron-down'} size={26} />
          </View>
        </Pressable>
        <View style={styles.input}>
          <TextInput
            placeholder={'Nomor HP'}
            style={styles.inputHP}
            onChangeText={(number) => changeNumber(number)}
            value={number}
            keyboardType={'number-pad'}
          />
          {err ? (
            <Text
              style={[
                styles.textHP,
                {color: err.split(' ')[0] === 'Contoh:' ? 'black' : 'red'},
              ]}>
              {err}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.input}>
          <TextInput
            multiline={true}
            placeholder={'Pesan'}
            style={styles.inputPesan}
            onChangeText={(text) => setText(text)}
            value={text}
            blurOnSubmit={true}
            returnKeyType={'send'}
            onSubmitEditing={_sendMessage}
          />
        </View>
      </View>
      <Pressable
        disabled={err ? true : false}
        style={[
          styles.bottom,
          {
            backgroundColor: !err
              ? 'rgb(3, 230, 119)'
              : 'rgba(3, 230, 119, 0.36)',
          },
        ]}
        onPress={_sendMessage}>
        <View>
          <Text style={styles.textBottom}>Kirim</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dial: {
    backgroundColor: 'rgba(202, 207, 210, 0.36)',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    height: 54,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
  },
  textDial: {
    fontSize: 16,
  },
  input: {
    marginHorizontal: 16,
  },
  inputHP: {
    backgroundColor: 'rgba(202, 207, 210, 0.36)',
    height: 54,
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  textHP: {
    marginTop: 8,
    marginLeft: 8,
  },
  inputPesan: {
    backgroundColor: 'rgba(202, 207, 210, 0.36)',
    height: 'auto',
    minHeight: 54,
    borderRadius: 8,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBottom: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Home;
