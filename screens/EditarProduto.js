import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarProduto({ route, navigation }) {
  const { produto, index } = route.params;

  const [nome, setNome] = useState(produto.nome);
  const [preco, setPreco] = useState(produto.preco);

  const editarProduto = async () => {
    if (!nome || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      let produtosSalvos = await AsyncStorage.getItem('produtos');
      produtosSalvos = JSON.parse(produtosSalvos);
      
      produtosSalvos[index] = { nome, preco };

      await AsyncStorage.setItem('produtos', JSON.stringify(produtosSalvos));

      navigation.goBack();
      Alert.alert('Produto Editado', 'Produto editado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao editar o produto.');
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
      <Button title="Salvar Alterações" onPress={editarProduto} />
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
