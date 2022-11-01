import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        borderRadius: 100,
        height: 200,
        width: 200,
        alignSelf: "center",
        margin: 30,
        marginBottom: 50
    },
    input: {
        height: 48,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 50,
        marginRight: 50,
        paddingLeft: 20,
    },
    button: {
        backgroundColor: '#788eec',
        marginTop: 50,
        height: 48,
        width: 200,
        borderRadius: 100,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})