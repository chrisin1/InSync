import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    backContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        margin: 15,
        marginRight: 50,
        marginTop: 50,
    },
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        margin: 50,
        marginTop: -80,
    },
    logo: {
        alignSelf: 'center',
        borderRadius: 100,
        height: 200,
        marginBottom: 50,
        width: 200
    },
    profileUpload: {
        alignSelf: 'center',
        marginLeft: 0,
        marginTop: -40,
        marginBottom: 50,
    },
    input: {
        backgroundColor: '#373737',
        borderRadius: 100,
        color: 'white',
        height: 48,
        marginBottom: 20,
        marginHorizontal: 50,
        marginTop: 5,
        outlineStyle: 'none',
        overflow: 'hidden',
        paddingLeft: 20, // input text padding
        width: 500,
    },
    inputTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 55,
    },
    button: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#FF9283',
        borderRadius: 100,
        height: 48,
        justifyContent: 'center',
        marginTop: 50,
        width: 150,
    },
    buttonTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }
})