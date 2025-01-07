import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  role: 'user' | 'ai';
  content: string;
  isVoice: boolean;
}

interface DashboardProps {
  route: any; // added route prop to access passed data
}

const Dashboard = ({ route }: DashboardProps) => {
    const { selectedAvatar, avatarName, age, gender, voice } = route?.params || {};
    // Access passed props
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = (content: string, isVoice: boolean) => {
    if (content.trim()) {
      setMessages(prev => [...prev, { role: 'user', content, isVoice }]);
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = `I received your ${isVoice ? 'voice' : 'text'} message: "${content}". How can I assist you further?`;
        setMessages(prev => [...prev, { role: 'ai', content: aiResponse, isVoice }]);
        if (isVoice) {
          speakAiResponse(aiResponse);
        }
      }, 1000);
    }
    setInput('');
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    // Simulate voice recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      const voiceContent = "This is a simulated voice input.";
      handleSendMessage(voiceContent, true);
    }, 3000);
  };

  const speakAiResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Text-to-speech not supported in this browser.");
    }
  };

  const toggleChatMode = () => {
    setIsVoiceMode(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>AI Companion Dashboard</Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.grid}>
            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              {/* Display the selected avatar */}
              <Avatar
                size="xlarge"
                rounded
                source={selectedAvatar ? { uri: selectedAvatar } : require('../screen/avatarCreation')} // fallback to default if undefined
                overlayContainerStyle={styles.avatar}
              />
              <Text style={styles.aiText}>{avatarName || "Your AI Companion"}</Text>
              <Text style={styles.aiDescription}>
                {`I am a ${age}-year-old ${gender} with a ${voice} voice.`}
              </Text>
              <TouchableOpacity onPress={toggleChatMode} style={styles.button}>
                <Text style={styles.buttonText}>
                  {isVoiceMode ? 'Switch to Text Chat' : 'Switch to Voice Chat'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Interaction Section */}
            <View style={styles.messagesContainer}>
              <ScrollView ref={scrollViewRef} style={styles.scrollArea}>
                {messages.map((message, index) => (
                  <View key={index} style={[styles.message, message.role === 'user' ? styles.userMessage : styles.aiMessage]}>
                    <Avatar size="small" rounded title={message.role === 'user' ? 'U' : 'A'} />
                    <View style={styles.messageContent}>
                      {message.isVoice && <Ionicons name="mic" size={16} color="gray" />}
                      <Text style={styles.messageText}>{message.content}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.inputContainer}>
                {isVoiceMode ? (
                  <TouchableOpacity
                    onPress={handleVoiceInput}
                    style={[styles.recordButton, isRecording ? styles.recording : {}]}
                    disabled={isRecording}
                  >
                    <Ionicons name={isRecording ? 'mic-off' : 'mic'} size={20} color="white" />
                    <Text style={styles.recordButtonText}>{isRecording ? 'Recording...' : 'Speak'}</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TextInput
                      style={styles.input}
                      value={input}
                      onChangeText={setInput}
                      onSubmitEditing={() => handleSendMessage(input, false)}
                      placeholder="Type your message..."
                    />
                    <TouchableOpacity onPress={() => handleSendMessage(input, false)} style={styles.sendButton}>
                      <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// Styles go here...

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6a1b9a',
      justifyContent: 'center',
      padding: 16,
    },
    card: {
      backgroundColor: '#9c4dcc',
      borderRadius: 8,
      overflow: 'hidden',
      maxWidth: '100%',
    },
    cardHeader: {
      borderBottomWidth: 1,
      borderBottomColor: '#7c4dff',
      padding: 16,
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    cardContent: {
      padding: 16,
    },
    grid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    avatarSection: {
      alignItems: 'center',
      gap: 8,
    },
    aiText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
    aiDescription: {
      textAlign: 'center',
      color: '#e1bee7',
    },
    button: {
      backgroundColor: '#7c4dff',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      marginTop: 16,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    messagesContainer: {
      flex: 1,
    },
    scrollArea: {
      marginBottom: 16,
    },
    message: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    userMessage: {
      justifyContent: 'flex-end',
    },
    aiMessage: {
      justifyContent: 'flex-start',
    },
    messageContent: {
      maxWidth: '80%',
      backgroundColor: '#7c4dff',
      padding: 12,
      borderRadius: 8,
      marginLeft: 8,
    },
    messageText: {
      color: 'white',
    },
    inputContainer: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    input: {
      flex: 1,
      backgroundColor: '#7c4dff',
      borderRadius: 8,
      padding: 12,
      color: 'white',
      fontSize: 16,
    },
    sendButton: {
      backgroundColor: '#7c4dff',
      padding: 12,
      borderRadius: 50,
    },
    recordButton: {
      backgroundColor: '#7c4dff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      flex: 1,
    },
    recording: {
      backgroundColor: '#d32f2f',
    },
    recordButtonText: {
      marginLeft: 8,
      color: 'white',
      fontSize: 16,
    },
    avatar: {
      borderWidth: 2,
      borderColor: '#7c4dff',  // Adjust color as per your design
      borderRadius: 50,  // Makes the avatar round
    },
});

export default Dashboard;
