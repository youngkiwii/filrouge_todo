import React from 'react'
import { View, Text, Image} from 'react-native'
import { styles } from '../components/styles';
import { UsernameContext } from '../Contexte/Context';
import {ContainerWhite} from '../components/Container';
import { CustomButton } from '../components/UI/CustomButton';

// Écran d'accueil
export default function HomeScreen ({navigation}) {

    return (
            <UsernameContext.Consumer>
                {([username, setUsername]) => {
                    return (
                        <ContainerWhite>
                            <View style={styles.body}>
                                <View style={{width: "80%"}}>
                                    <Image style={{marginTop: 50, height: 200, width: 300}} source={require("../assets/statistics.png")}/>
                                    <View style={{marginTop: 100}}>
                                        <Text style={[styles.title, {fontSize: 44, marginTop: 50}]}>Bienvenue, {username} !</Text>
                                        <Text style={[styles.subtitle, {marginTop: 10, fontSize: 18}]}>Gérez vos tâches dans différentes catégories</Text>
                                        <CustomButton style={{marginTop: 20,width: '70%'}} text="Commencer" onPress={() => {navigation.navigate("TodoLists")}}/>
                                    </View>
                                </View>
                            </View>
                        </ContainerWhite>
                    );
                }}
            </UsernameContext.Consumer>
    );
}