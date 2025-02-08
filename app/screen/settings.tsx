import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const Settings = () => {
  const router = useRouter(); // Initialize useRouter

  // Handle delete chat history action
  const handleDeleteChatHistory = () => {
    Alert.alert('Chat History Deleted', 'Your chat history has been successfully deleted.', [
      { text: 'OK' },
    ]);
    // Add the logic to delete chat history, e.g., clearing local storage or API call
  };

  // Handle manage linked accounts
  const handleManageLinkedAccounts = () => {
    Alert.alert('Manage Linked Accounts', 'Here you can manage your linked accounts.', [
      { text: 'OK' },
    ]);
    // Add logic to navigate to linked accounts management screen
  };

  // Handle change password
  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Here you can change your password.', [
      { text: 'OK' },
    ]);
    // Add logic to navigate to change password screen
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => Alert.alert('Account Deleted', 'Your account has been successfully deleted.') },
    ]);
    // Add logic to delete account, e.g., API call
  };

  // Handle navigation to AvatarCreation page
  const handleAvatarCreation = () => {
    router.push('/screen/avatarCreation');
  };

  // Handle navigation to Dashboard page
  const handleDashboard = () => {
    router.push('/screen/Dashboard');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Section 1: Privacy Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Controls</Text>

        {/* Delete Chat History */}
        <TouchableOpacity style={styles.option} onPress={handleDeleteChatHistory}>
          <Text style={styles.optionText}>Delete Chat History</Text>
        </TouchableOpacity>

        {/* Data Security */}
        <View style={styles.option}>
          <Text style={styles.optionText}>Data Security</Text>
        </View>
      </View>

      {/* Section 2: Notification Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>

        {/* Missed Task */}
        <View style={styles.option}>
          <Text style={styles.optionText}>Missed Task</Text>
        </View>

        {/* Daily Agenda */}
        <View style={styles.option}>
          <Text style={styles.optionText}>Daily Agenda</Text>
        </View>
      </View>

      {/* Section 3: Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        {/* Manage Linked Accounts */}
        <TouchableOpacity style={styles.option} onPress={handleManageLinkedAccounts}>
          <Text style={styles.optionText}>Manage Linked Accounts</Text>
        </TouchableOpacity>

        {/* Change Password */}
        <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        {/* Delete Account */}
        <TouchableOpacity style={[styles.option, styles.deleteOption]} onPress={handleDeleteAccount}>
          <Text style={[styles.optionText, styles.deleteOptionText]}>Delete Account</Text>
        </TouchableOpacity>
      </View>

      {/* Section 4: Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigation</Text>

        {/* Go to Avatar Creation */}
        <TouchableOpacity style={styles.option} onPress={handleAvatarCreation}>
          <Text style={styles.optionText}>Go to Avatar Creation</Text>
        </TouchableOpacity>

        {/* Go to Dashboard */}
        <TouchableOpacity style={styles.option} onPress={handleDashboard}>
          <Text style={styles.optionText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#540681',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#540681',
    marginBottom: 10,
  },
  option: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#540681',
  },
  deleteOption: {
    backgroundColor: '#ffcccc',
  },
  deleteOptionText: {
    color: '#d32f2f',
  },
});

export default Settings;