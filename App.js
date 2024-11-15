import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TelaLogin from './screens/TelaLogin';
import TelaCadastro from './screens/TelaCadastro';
import RecSenha from './screens/RecSenha';
import Home from './screens/Home';
import Cliente from './screens/Cliente';
import Produto from './screens/Produto';
import Estoque from './screens/Estoque';
import EditarProduto from './screens/EditarProduto';
import { Button, View, Alert } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer({ navigation }) {
  // Função para sair
  const sair = () => {
    Alert.alert(
      "Deseja realmente sair?", // Título
      "Se você sair, precisará fazer login novamente.", // Mensagem
      [
        {
          text: "Cancelar", // Opção para cancelar
          style: "cancel"
        },
        {
          text: "Sim", // Confirmação para sair
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('usuario'); // Remove o usuário do AsyncStorage
              navigation.reset({
                index: 0,
                routes: [{ name: 'TelaLogin' }], // Redireciona para a TelaLogin
              });
            } catch (error) {
              console.log('Erro ao sair', error);
            }
          }
        }
      ]
    );
  };

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cliente" component={Cliente} />
      <Drawer.Screen name="Cadastrar Produto" component={Produto} />
      <Drawer.Screen name="Estoque" component={Estoque} />
      
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{ headerShown: false }} // Para esconder o cabeçalho na tela de login
        />
        <Stack.Screen
          name="TelaCadastro"
          component={TelaCadastro}
          options={{ headerShown: false }} // Opcional, se você quiser esconder o cabeçalho
        />
        <Stack.Screen
          name="RecSenha"
          component={RecSenha}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MyDrawer} // Navegação com Drawer é chamada dentro da "Home"
          options={{ headerShown: false }} // Esconde o cabeçalho na tela Home
        />
        <Stack.Screen 
          name="EditarProduto" 
          component={EditarProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
