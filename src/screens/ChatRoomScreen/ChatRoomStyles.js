import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignSelf: 'space-evenly',
        flex: 1,
    },
    backContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        margin: 30,
        marginBottom: 0,
    },
    bottomContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 25,
        width: '75%',
    },
    buttonTitle: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold'
    },
    inputContainer: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 100,
        justifyContent: 'center',
        marginRight: 10,
        paddingHorizontal: 15,
    },
    messagesContainer: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        width: '75%'
    },
    profileText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    profileContainer: {
        alignSelf: 'center',
        paddingBottom: 10,
        alignItems: 'center'
    },
    profileImage: {
        borderRadius: 100,
        height: 150,
        overflow: "hidden",
        width: 150,
    },
});