import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        flex: 1
    },
    title: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e3357'
    },
    subtitle: {
        color: '#2e3357'
    },
    button: {
        backgroundColor: '#5450d6',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    btnOutline: {
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#5450d6',
        padding: 10,
        borderRadius: 10
    },
    input: {
        width: "75%",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#d1dbed",
        marginTop: 10
    }
});

export { styles }