import React from 'react'
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { TokenContext } from '../Contexte/Context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

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
                        <Tab.Navigator>
                            <Tab.Screen 
                                name='SignIn'
                                component={SignInScreen}
                            />
                            <Tab.Screen 
                                name='SignUp'
                                component={SignUpScreen}
                            />
                        </Tab.Navigator>
                    ) : (
                        <Tab.Navigator>
                            <Tab.Screen 
                                name='Home'
                                component={HomeScreen}
                            />
                            <Tab.Screen 
                                name='TodoLists'
                                component={Todos}
                            />
                            <Tab.Screen 
                                name='SignOut'
                                component={SignOutScreen}
                            />
                        </Tab.Navigator>
                    )}
                </NavigationContainer>
            )}
        </TokenContext.Consumer>
    );
}