import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Alert, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const avatarOptions = [
  { id: 'avatar1', src: require('../../assets/avatar1.png') },
  { id: 'avatar2', src: require('../../assets/avatar2.jpg') },
  { id: 'avatar3', src: require('../../assets/avatar3.png') },
  { id: 'avatar4', src: require('../../assets/avatar4.png') },
  { id: 'avatar5', src: require('../../assets/avatar5.jpg') },
];

const AvatarCustomization = () => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('female');
  const [voice, setVoice] = useState('female');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].id);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAvatarUpload = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setCustomAvatarUrl(response.assets[0].uri || '');
        setSelectedAvatar('custom');
      }
    });
  };

  const handleSaveChanges = () => {
    if (!avatarName.trim()) {
      Alert.alert('Validation Error', 'Please give your AI companion a name!');
      return;
    }
    console.log('Save changes', { selectedAvatar, avatarName, age, gender, voice });
  };

  const currentAvatarSrc =
    selectedAvatar === 'custom' ? { uri: customAvatarUrl } : avatarOptions.find((a) => a.id === selectedAvatar)?.src || null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your AI Avatar</Text>

      <View style={styles.avatarSection}>
        <View style={styles.avatarContainer}>
          <Image source={currentAvatarSrc} style={styles.avatarImage} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Give your AI a name"
          value={avatarName}
          onChangeText={setAvatarName}
        />
      </View>

      <View style={styles.avatarOptions}>
        {avatarOptions.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            onPress={() => setSelectedAvatar(avatar.id)}
            style={[styles.avatarOption, selectedAvatar === avatar.id && styles.selectedOption]}
          >
            <Image source={avatar.src} style={styles.optionImage} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.customButton} onPress={() => setModalVisible(true)}>
          <Icon name="image-plus" size={20} color="#fff" />
          <Text style={styles.customText}>Custom</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Age: {age} years</Text>
      <Slider
        value={age}
        onValueChange={setAge}
        minimumValue={18}
        maximumValue={100}
        step={1}
        style={styles.slider}
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioGroup}>
        {['female', 'male'].map((g) => (
          <TouchableOpacity
            key={g}
            onPress={() => setGender(g)}
            style={[styles.radioButton, gender === g && styles.selectedRadio]}
          >
            <Text style={styles.radioLabel}>{g.charAt(0).toUpperCase() + g.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Voice Type</Text>
      <View style={styles.radioGroup}>
        {['female', 'male'].map((v) => (
          <TouchableOpacity
            key={v}
            onPress={() => setVoice(v)}
            style={[styles.radioButton, voice === v && styles.selectedRadio]}
          >
            <Text style={styles.radioLabel}>{v.charAt(0).toUpperCase() + v.slice(1)} Voice</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalOption} onPress={handleAvatarUpload}>
            <Text style={styles.modalText}>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalOption} onPress={() => Alert.alert('Capture functionality is not implemented.')}>
            <Text style={styles.modalText}>Capture Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  avatarOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  avatarOption: {
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#fff',
  },
  optionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  customButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    marginLeft: 10,
  },
  customText: {
    fontSize: 10,
    color: '#6B46C1',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  slider: {
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  selectedRadio: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  radioLabel: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  saveText: {
    color: '#6B46C1',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalOption: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  modalText: {
    color: '#6B46C1',
    fontWeight: 'bold',
  },
  modalClose: {
    marginTop: 20,
    backgroundColor: '#6B46C1',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AvatarCustomization;
