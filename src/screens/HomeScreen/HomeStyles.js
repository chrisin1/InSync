import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 100,
    },
    cardContainer: {
        alignSelf: 'center',
        backgroundColor: '#373737',
        borderRadius: 20,
        flex: 1,
    },
    imageContainer: {
        alignSelf: 'center',
        borderRadius: 20,
        height: 350,
        margin: 20,
        marginBottom: 10,
        width: 350,
    },
    title: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        margin: 30,
    },
    nameText: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        margin: 20,
        marginBottom: 0,
    },
    compText: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginStart: 20,
    },
    detailsText: {
        alignSelf: 'flex-start',
        color: '#929292',
        fontSize: 14,
        fontWeight: 'normal',
        marginStart: 20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#222222',
        borderRadius: 100,
        height: 100,
        justifyContent: 'center',
        margin: 30,
        width: 100,
    },
    buttonIcon: {
        color: '#ff9283',
        height: 50,
        width: 50,
    },
    buttonContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})