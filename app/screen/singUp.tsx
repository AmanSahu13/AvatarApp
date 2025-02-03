import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons


const SignUpScreen: React.FC = () => {
  const [isEmail, setIsEmail] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);


  const handleCreateAccount = () => {
    if (isEmail && (!email || !password || !cpassword || !username)) {
      Alert.alert("Error", "Please fill all the fields.");
    } else if (!isEmail && (!phone || !password || !cpassword || !username)) {
      Alert.alert("Error", "Please fill all the fields.");
    } else if (password !== cpassword) {
      Alert.alert("Error", "Passwords do not match.");
    } else {
      const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(randomOtp);
      setShowOtpInput(true);
      // Remove the alert that shows the OTP for testing
      Alert.alert("OTP Sent", `Your OTP is: ${randomOtp}`); // For testing
      Alert.alert("OTP Sent", "An OTP has been sent to your email/phone.");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      Alert.alert("Success", "Account created successfully!");
      router.push({pathname:'/screen/index'}); // Redirect to next page
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Your AI Companion</Text>
        <Text style={styles.subtitle}>Start your journey with a personalized AI friend.</Text>
      </View>
      <View style={styles.formContainer}>
        {!showOtpInput ? (
          <>
            <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
            <TextInput placeholder="Full Name" style={styles.input} value={fullName} onChangeText={setFullName} />
            <TextInput placeholder="Email" keyboardType="email-address" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} value={phone} onChangeText={setPhone} />
            <View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!showCPassword}
                  style={styles.input}
                  value={cpassword}
                  onChangeText={setCPassword}
                />
                <TouchableOpacity style={styles.icon} onPress={() => setShowCPassword(!showCPassword)}>
                  <Ionicons name={showCPassword ? 'eye-off' : 'eye'} size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.otpText}>Enter OTP sent to your email/phone:</Text>
            <TextInput placeholder="Enter OTP" keyboardType="number-pad" style={styles.input} value={otp} onChangeText={setOtp} />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4B0082" },
  contentContainer: { padding: 16 },
  header: { flex: 1, alignItems: "center", marginVertical: 30 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#fff", textAlign: "center", marginTop: 8 },
  formContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 20, elevation: 10 },
  input: {
    borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: "#f9f9f9", flex: 1,
    paddingRight: 40,
  },
  button: { backgroundColor: "#4B0082", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  otpText: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
});

export default SignUpScreen;
