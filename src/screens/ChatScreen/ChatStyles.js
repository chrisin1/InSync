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
        backgroundColor: '#FF9382',
        borderRadius: 100,
        marginRight: 20
    },
    name: {
        fontsize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
    text: {
        fontSize: 14,
        fontWeight: 300,
        color: 'white',
        opacity: '60%',
    },
    rightContainer: {
        justifyContent: 'space-evenly',
        paddingVertical: 15,
        width: 300,
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