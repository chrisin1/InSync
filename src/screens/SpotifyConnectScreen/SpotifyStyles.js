import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        paddingBottom: 50,
    },
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        margin: 50
    },
    text: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 30,
        fontWeight: 300,
        margin: 30,
        marginBottom: 50,
        marginHorizontal: 150,
        textAlign: 'center',
    },
    logo: {
        alignSelf: 'center',
        borderRadius: 200,
        height: 250,
        width: 250
    },
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FF9283',
        borderRadius: 100,
        height: 48,
        justifyContent: 'center',
        width: 250,
    },
    buttonTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },
})