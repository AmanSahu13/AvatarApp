import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Navigation = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation Page</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/screen/dashboard')}
      >
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/screen/avatarCreation')}
      >
        <Text style={styles.buttonText}>Go to Avatar Creation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./settings')}
      >
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#540681',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#540681',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Navigation;
