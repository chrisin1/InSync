import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    albumBackground: {
        alignSelf: 'flex-start',
        backgroundColor: "#373737",
        borderRadius: 15,
        marginHorizontal: 10,
        overflow: "hidden",
        padding: 15,
        paddingBottom: 30,
    },
    albumsContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 35,
    },
    albumImage: {
        alignSelf: 'center',
        borderRadius: 15,
        height: 150,
        marginBottom: 10,
        width: 150,
    },
    albumInfo: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 14,
        marginBottom: 3,
        marginStart: 5,
        width: 150,
    },
    bulletpoint: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        height: 4,
        marginBottom: 10,
        marginHorizontal: 15,
        width: 4,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#FF9283',
        borderRadius: 100,
        height: 25,
        justifyContent: 'center',
        marginTop: 15,
        marginRight: 20,
        paddingHorizontal: 10,
    },
    buttonTitle: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold'
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        maxWidth: '75%'
    },
    headerContainer: {
        alignSelf: "baseline",
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 50,
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: 500
    },
    profileImage: {
        borderRadius: 100,
        height: 175,
        overflow: "hidden",
        width: 175,
    },
    statsContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    statsBox: {
        alignItems: "flex-start",
        flexDirection: 'column',
    },
    text: {
        color: 'white',
    },
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 30,
    },
    topSBackground: {
        alignSelf: 'stretch',
        backgroundColor: '#373737',
        borderRadius: 15,
        flex: 1,
        margin: 10,
        padding: 10,
    },
    topSContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    topSData: {
        alignSelf: 'flex-start',
        fontSize: 14,
        justifyContent: 'center',
        marginBottom: 5,
        marginStart: 10,
        paddingHorizontal: 10,
    },
});
