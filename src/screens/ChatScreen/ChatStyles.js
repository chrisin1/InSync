import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        margin: 50
    },
    image: {
        height: 75,
        width: 75,
        borderRadius: 100,
        marginRight: 20
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 3,
        color: 'white',
    },
    text: {
        fontSize: 14,
        fontWeight: 200,
        color: 'white',
        opacity: '60%',
        maxWidth: 300,
    },
    rightContainer: {
        justifyContent: 'space-evenly',
        paddingVertical: 15,
        width: 350,
    },
    chatContainer: {
        flexDirection: 'row',
        margin: 5,
        padding: 10,
    },
    row: {
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
   
})