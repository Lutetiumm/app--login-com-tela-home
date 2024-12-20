import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Produto() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  const salvarProduto = async () => {
    if (!nome || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      let produtos = await AsyncStorage.getItem('produtos');
      produtos = produtos ? JSON.parse(produtos) : [];

      produtos.push({ nome, preco });

      await AsyncStorage.setItem('produtos', JSON.stringify(produtos));

      setNome('');
      setPreco('');

      Alert.alert('Produto Cadastrado', 'Produto cadastrado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar produto.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do Produto"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />
      <Button title="Salvar Produto" onPress={salvarProduto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});
