import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native'
import { styles } from './styles'


// Container avec un background en dégradé linéaire (blanc, bleu)
function ContainerWhite ({children}) {
    return (
        <LinearGradient style={{flex: 1}} colors={['#f2fbff','#c4d4e4']}>
            <SafeAreaView style={styles.body}>{children}</SafeAreaView>
        </LinearGradient>
    )
}

// Idem mais avec le violet
function ContainerPurple ({children}) {
    return (
        <LinearGradient 
            locations={[0.5, 1.0]}
            style={{flex: 1}} 
            colors={['#6e64d8','#4520b2']}
        >
            <SafeAreaView style={styles.body}>{children}</SafeAreaView>
        </LinearGradient>
    )
}

export { ContainerWhite, ContainerPurple }