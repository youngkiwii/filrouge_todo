import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { UsernameContext } from '../Contexte/Context';

export default function HomeScreen ({navigation}) {

    return (
        <UsernameContext.Consumer>
            {([username, setUsername]) => {
                return (
                    <>
                        <Text>Welcome !</Text>
                        <Text>You are logged as {username} !</Text>
                    </>
                );
            }}
        </UsernameContext.Consumer>
    );
}