import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const avatarOptions = [
  { id: 'avatar1', src: '/placeholder.svg?height=100&width=100&text=1', alt: 'Avatar 1' },
  { id: 'avatar2', src: '/placeholder.svg?height=100&width=100&text=2', alt: 'Avatar 2' },
  { id: 'avatar3', src: '/placeholder.svg?height=100&width=100&text=3', alt: 'Avatar 3' },
  { id: 'avatar4', src: '/placeholder.svg?height=100&width=100&text=4', alt: 'Avatar 4' },
  { id: 'avatar5', src: '/placeholder.svg?height=100&width=100&text=5', alt: 'Avatar 5' },
  { id: 'custom', src: '', alt: 'Custom Avatar' },
];

const AvatarCreationPage = ({ navigation }: any) => {
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("female");
  const [voice, setVoice] = useState("female");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].id);
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");

  const handleAvatarUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAvatarUrl(url);
      setSelectedAvatar('custom');
    }
  };

  const handleSaveChanges = () => {
    Alert.alert("Avatar Created", "Your AI avatar has been created successfully!");
    navigation.navigate('Dashboard'); // Navigate to dashboard or next page
  };

  const currentAvatarSrc = selectedAvatar === 'custom'
    ? customAvatarUrl
    : avatarOptions.find(a => a.id === selectedAvatar)?.src || '/placeholder.svg';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Customize Your AI Avatar</Text>

        {/* Avatar Preview and Selection */}
        <View style={styles.avatarSelectionContainer}>
          <Image source={{ uri: currentAvatarSrc }} style={styles.avatarImage} />
          <View style={styles.avatarOptionsContainer}>
            {avatarOptions.slice(0, 5).map((avatar) => (
              <TouchableOpacity
                key={avatar.id}
                style={[styles.avatarOption, selectedAvatar === avatar.id && styles.selectedAvatar]}
                onPress={() => setSelectedAvatar(avatar.id)}
              >
                <Image source={{ uri: avatar.src }} style={styles.avatarOptionImage} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.uploadAvatarButton}
              onPress={handleAvatarUpload}
            >
              <FontAwesome name="upload" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Customization Controls */}
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
          <TouchableOpacity
            style={[styles.radioButton, gender === 'female' && styles.selectedRadioButton]}
            onPress={() => setGender('female')}
          >
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, gender === 'male' && styles.selectedRadioButton]}
            onPress={() => setGender('male')}
          >
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Voice</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, voice === 'female' && styles.selectedRadioButton]}
            onPress={() => setVoice('female')}
          >
            <Text style={styles.radioText}>Female Voice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, voice === 'male' && styles.selectedRadioButton]}
            onPress={() => setVoice('male')}
          >
            <Text style={styles.radioText}>Male Voice</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background for the page
    padding: 16,
  },
  card: {
    backgroundColor: '#fff', // White background for the card
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    borderColor: '#4B0082',
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082', // Purple color for the title
    textAlign: 'center',
    marginBottom: 16,
  },
  avatarSelectionContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#4B0082', // Purple border for avatar
  },
  avatarOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  avatarOption: {
    marginHorizontal: 8,
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: '#4B0082', // Purple border for selected avatar
  },
  avatarOptionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  uploadAvatarButton: {
    backgroundColor: '#4B0082', // Purple button for avatar upload
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    color: '#4B0082', // Purple color for labels
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  radioButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#4B0082', // Purple border color for radio buttons
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    backgroundColor: '#4B0082', // Purple background for selected radio button
  },
  radioText: {
    color: '#4B0082', // Purple text for radio button options
  },
  saveButton: {
    backgroundColor: '#4B0082', // Purple background for save button
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff', // White text for save button
    fontWeight: 'bold',
  },
});

export default AvatarCreationPage;
