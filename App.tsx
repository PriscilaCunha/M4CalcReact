/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState('');

  useEffect(() => {
    (async function handleHistory(){
      setHistory(await AsyncStorage.getItem('history') || '')
    })();
  }, []);

  async function handleHistory(){
    if(num1 && num2 && result){
      var historyFormat = `${num1} + ${num2} = ${result}`;
      setHistory( historyFormat + '\n' + history);
      await AsyncStorage.setItem('history', historyFormat);
    }
  }

  function handleSum(){
    setResult(parseInt(num1) + parseInt(num2));
  }

  function handleSumClick(){
    handleSum();
    handleHistory();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Primeiro número'
        keyboardType='numeric'
        value={num1}
        onChangeText={(num) => setNum1(num)}
      />

      <TextInput
        style={styles.input}
        placeholder='Segundo número'
        keyboardType='numeric'
        value={num2}
        onChangeText={(num) => setNum2(num)}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSumClick}>
        <Text style={styles.buttonText}>Somar</Text>
      </TouchableOpacity>

      <Text style={styles.resultText}>{result ? `A soma é: ${result}` : ''}</Text>

      <Text style={styles.resultText}>History:</Text>
      <Text style={styles.resultText}>{history ? history : ''}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#0000FF',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
  },
  resultText: {
    marginTop: 10,
    color: '#000',
    fontSize: 22,
  },
});
