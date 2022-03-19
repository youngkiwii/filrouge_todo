import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
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

    const TodosNavigator = () => 
        <Stack.Navigator 
            screenOptions={{
                headerTransparent: true,
            }}>
            <Stack.Screen
                name="TodoListsStack"
                component={TodoListsScreen}
                options={{
                    header: () => null,
                }}
            />
            <Stack.Screen
                name="Todos"
                component={TodosScreen}
                options={{
                    headerTitle: "",
                    headerBackTitle: "Retour",
                    headerLeft: (props) => 
                        <TouchableOpacity {...props} style={{marginLeft: 15, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'gray'}}>
                            <Icon size={14} name={'arrow-left'}/>
                        </TouchableOpacity>,
                }}
            />
        </Stack.Navigator>

    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <NavigationContainer>
                    {token == null ? (
                        <Tab.Navigator
                            screenOptions={{
                                headerShown: false,
                                tabBarStyle: {
                                    backgroundColor: 'transparent',
                                    borderTopWidth: 0,
                                    position: 'absolute'
                                },
                              }}
                        >
                            <Tab.Screen 
                                name='SignIn'
                                component={SignInScreen}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: (tabInfo) => <Icon name="sign-in" size={30} color={tabInfo.focused ? "dodgerblue" : "gray"} />
                                }}
                            />
                            <Tab.Screen 
                                name='SignUp'
                                component={SignUpScreen}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: (tabInfo) => <Icon name="user-plus" size={30} color={tabInfo.focused ? "dodgerblue" : "gray"} />
                                }}
                            />
                        </Tab.Navigator>
                    ) : (
                        <Tab.Navigator
                            screenOptions={{
                                headerShown: false,
                                tabBarStyle: {
                                    backgroundColor: 'transparent',
                                    borderTopWidth: 0,
                                    position: 'absolute'
                                },
                              }}
                        >
                            <Tab.Screen 
                                name='Home'
                                component={HomeScreen}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: (tabInfo) => <Icon name="home" size={30} color={tabInfo.focused ? "dodgerblue" : "gray"} />,
                                    headerTitle: ""
                                }}
                            />
                            <Tab.Screen 
                                name='TodoLists'
                                component={TodosNavigator}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: (tabInfo) => <Icon name="list" size={30} color={tabInfo.focused ? "dodgerblue" : "gray"} />,
                                    headerTitle: ""
                                }}
                            />
                            <Tab.Screen 
                                name='SignOut'
                                component={SignOutScreen}
                                options={{
                                    tabBarLabel: '',
                                    tabBarIcon: (tabInfo) => <Icon name="sign-out" size={30} color={tabInfo.focused ? "dodgerblue" : "gray"} />,
                                    headerTitle: ""
                                }}
                            />
                        </Tab.Navigator>
                    )}
                </NavigationContainer>
            )}
        </TokenContext.Consumer>
    );
}