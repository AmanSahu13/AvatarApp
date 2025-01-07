// import '../components/gesture-handler';
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SignInScreen: React.FC = () => {
  const [isEmail, setIsEmail] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    if (isEmail && (!email || !password)) {
      Alert.alert("Error", "Please enter your email and password.");
    } else if (!isEmail && (!phone || !password)) {
      Alert.alert("Error", "Please enter your phone number and password.");
    } else {
      Alert.alert("Success", "Signed in successfully!");
      router.push("./screen/avatarCreation"); // Redirect to avatar creation page after successful sign-in
    }
  };

  const handleSignUpRedirect = () => {
    router.push("./screen/singUp"); // Redirect to sign-up page
  };

  const handleForgotPassword = () => {
    router.push("./screen/forgotPassword"); // Redirect to forgot password page
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey with your AI Companion.</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Sign In</Text>
        <Text style={styles.formSubtitle}>Enter your credentials below</Text>
        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => setIsEmail(true)}>
            <Text style={[styles.switchOption, isEmail && styles.activeSwitchOption]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsEmail(false)}>
            <Text style={[styles.switchOption, !isEmail && styles.activeSwitchOption]}>Phone</Text>
          </TouchableOpacity>
        </View>
        {!isEmail && (
          <TextInput
            placeholder="Phone number"
            keyboardType="phone-pad"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />
        )}
        {isEmail && (
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        )}
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>OR CONTINUE WITH</Text>
        <View style={styles.socialContainer}>
          <FontAwesome name="github" size={24} color="#fff" style={styles.socialIcon} />
          <FontAwesome name="twitter" size={24} color="#fff" style={styles.socialIcon} />
        </View>
        <TouchableOpacity onPress={handleSignUpRedirect}>
          <Text style={styles.signUpText}>
            Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4B0082",
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flex: 1,
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B0082",
    textAlign: "center",
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  switchOption: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    color: "#666",
  },
  activeSwitchOption: {
    backgroundColor: "#4B0082",
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#4B0082",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#4B0082",
    fontSize: 14,
    marginBottom: 16,
  },
  orText: {
    textAlign: "center",
    color: "#666",
    marginVertical: 16,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  socialIcon: {
    marginHorizontal: 16,
    backgroundColor: "#4B0082",
    padding: 8,
    borderRadius: 24,
  },
  signUpText: {
    textAlign: "center",
    color: "#666",
  },
  signUpLink: {
    color: "#4B0082",
    fontWeight: "bold",
  },
});

export default SignInScreen;
