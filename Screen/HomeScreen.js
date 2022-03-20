import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { styles } from '../components/styles';
import { UsernameContext } from '../Contexte/Context';
import { LinearGradient } from 'expo-linear-gradient';
import {ContainerWhite} from '../components/Container';

export default function HomeScreen ({navigation}) {

    return (
            <UsernameContext.Consumer>
                {([username, setUsername]) => {
                    return (
                        <ContainerWhite>
                            <View style={styles.body}>
                                <View style={{width: "70%"}}>
                                    <Text style={styles.title}>Bienvenue, {username} !</Text>
                                    
                                </View>
                            </View>
                        </ContainerWhite>
                    );
                }}
            </UsernameContext.Consumer>
    );
}