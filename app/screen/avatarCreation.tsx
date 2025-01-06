import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import Slider from '@react-native-community/slider';
import { RadioButton } from 'react-native-paper'; // Import RadioButton from react-native-paper

const avatarOptions = [
  { id: 'avatar1', src: require('../../assets/avatar1.png') },
  { id: 'avatar2', src: require('../../assets/avatar2.jpg') },
  { id: 'avatar3', src: require('../../assets/avatar3.png') },
  { id: 'avatar4', src: require('../../assets/avatar4.png') },
  { id: 'avatar5', src: require('../../assets/avatar5.jpg') },
];

type RootStackParamList = {
  Dashboard: undefined;
  // Define other routes if necessary
};

type AvatarCreationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

const AvatarCustomization = () => {
  const navigation = useNavigation<AvatarCreationScreenNavigationProp>();
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('female');
  const [voice, setVoice] = useState('female');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].id);
  const [avatarName, setAvatarName] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [customAvatarsCount, setCustomAvatarsCount] = useState(0); // Track number of uploaded avatars
  const [avatarOptionsState, setAvatarOptions] = useState(avatarOptions); // Manage avatars dynamically

  const handleVoiceTest = () => {
    console.log('Testing voice:', voice);
  };

  const handleAvatarUpload = async () => {
    if (customAvatarsCount >= 5) {
      Alert.alert('Limit Reached', 'You can only upload up to 5 avatars.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newAvatar = {
        id: `avatar${avatarOptionsState.length + 1}`, // Generate new ID for custom avatar
        src: { uri: result.assets[0].uri }, // Store custom avatar URI
        alt: `Custom Avatar ${avatarOptionsState.length + 1}`,
      };

      setAvatarOptions([...avatarOptionsState, newAvatar]); // Add custom avatar to avatar options
      setCustomAvatarsCount(customAvatarsCount + 1); // Increment custom avatars count
      setSelectedAvatar(newAvatar.id); // Select the custom avatar
    }
    setShowOptions(false);
  };

  const handleSaveChanges = () => {
    if (!avatarName.trim()) {
      Alert.alert('Validation Error', 'Please give your AI companion a name!');
      return;
    }
    console.log('Save changes', { selectedAvatar, avatarName, age, gender, voice });
    navigation.navigate('Dashboard');
  };

  const currentAvatarSrc =
    selectedAvatar === 'custom'
      ? { uri: avatarOptionsState.find((a) => a.id === selectedAvatar)?.src.uri }
      : avatarOptionsState.find((a) => a.id === selectedAvatar)?.src;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
            placeholderTextColor="#A78BFA"
          />
        </View>

        <View style={styles.avatarOptions}>
          {avatarOptionsState.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              onPress={() => setSelectedAvatar(avatar.id)}
              style={[styles.avatarOption, selectedAvatar === avatar.id && styles.selectedOption]}
            >
              <Image source={avatar.src} style={styles.optionImage} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.customButton} onPress={() => setShowOptions(true)}>
            <Ionicons name="image" size={24} color="#7C3AED" />
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
            <View key={g} style={styles.radioButton}>
              <RadioButton
                value={g}
                status={gender === g ? 'checked' : 'unchecked'}
                onPress={() => setGender(g)}
                color="#7C3AED"
              />
              <Text style={styles.radioLabel}>{g.charAt(0).toUpperCase() + g.slice(1)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.label}>Voice Type</Text>
        <View style={styles.radioGroup}>
          {['female', 'male'].map((v) => (
            <View key={v} style={styles.radioButton}>
              <RadioButton
                value={v}
                status={voice === v ? 'checked' : 'unchecked'}
                onPress={() => setVoice(v)}
                color="#7C3AED"
              />
              <Text style={styles.radioLabel}>{v.charAt(0).toUpperCase() + v.slice(1)} Voice</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showOptions} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalOption} onPress={handleAvatarUpload}>
              <Text style={styles.modalOptionText}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => setShowOptions(false)}>
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#540681',
    padding: 20,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
    color: '#540681',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  saveText: {
    color: '#540681',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#7C3AED',
  },
});

export default AvatarCustomization;
