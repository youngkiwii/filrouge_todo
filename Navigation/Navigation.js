import React from 'react'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { TokenContext } from '../Contexte/Context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../Screen/HomeScreen';
import SignInScreen from '../Screen/SignInScreen';
import SignUpScreen from '../Screen/SignUpScreen';
import SignOutScreen from '../Screen/SignOutScreen';
import TodoListsScreen from '../Screen/TodoListsScreen';
import TodosScreen from '../Screen/TodosScreen';


export default function Navigation () {

    const Tab = createBottomTabNavigator();
    const Stack = createStackNavigator();

    const Todos = () => <Stack.Navigator>
        <Stack.Screen
            name="TodoListsStack"
            component={TodoListsScreen}
            options={{
                header: () => null
            }}
        />
        <Stack.Screen
            name="Todos"
            component={TodosScreen}
            options={{
                
            }}
        />
    </Stack.Navigator>

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <NavigationContainer>
                    {token == null ? (
                        <Tab.Navigator
                            sceneContainerStyle={{
                                backgroundColor: 'whitesmoke'
                            }}
                            screenOptions={{
                                tabBarStyle: {
                                  backgroundColor: 'midnightblue',
                                },
                              }}
                        >
                            <Tab.Screen 
                                name='SignIn'
                                component={SignInScreen}
                                options={{
                                    tabBarLabel: '',
                                }}
                            />
                            <Tab.Screen 
                                name='SignUp'
                                component={SignUpScreen}
                                options={{
                                    tabBarLabel: ''
                                }}
                            />
                        </Tab.Navigator>
                    ) : (
                        <Tab.Navigator
                            sceneContainerStyle={{
                                backgroundColor: 'whitesmoke'
                            }}
                            screenOptions={{
                                tabBarStyle: {
                                  backgroundColor: 'midnightblue',
                                },
                              }}
                        >
                            <Tab.Screen 
                                name='Home'
                                component={HomeScreen}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: () => <Icon name="home" size={30} color="white" />
                                }}
                            />
                            <Tab.Screen 
                                name='TodoLists'
                                component={Todos}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: () => <Icon name="list" size={30} color="white" />
                                }}
                            />
                            <Tab.Screen 
                                name='SignOut'
                                component={SignOutScreen}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: () => <Icon name="sign-out-alt" size={30} color="white" />
                                }}
                            />
                        </Tab.Navigator>
                    )}
                </NavigationContainer>
            )}
        </TokenContext.Consumer>
    );
}