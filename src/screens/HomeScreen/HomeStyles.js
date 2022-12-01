import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    albumContainer: {
        flexDirection: 'column',
        margin: 3,
        paddingBottom: 15,
    },
    albumsContainer: {
        backgroundColor: '#222222',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: 20,
        marginBottom: 0,
        padding: 10,
    },
    albumImage: {
        alignSelf: 'center',
        backgroundColor: '#FF9283',
        borderRadius: 10,
        height: 100,
        margin: 5,
        marginBottom: 10,
        width: 100,
    },
    albumInfo: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 12,
        marginStart: 5,
        marginBottom: 3,
    },
    bulletpoint: {
        backgroundColor: 'white',
        borderRadius: 100,
        height: 4,
        marginBottom: 3,
        marginHorizontal: 7,
        width: 4,
    },
    button: {
        backgroundColor: '#222222',
        borderRadius: 100,
        height: 125,
        justifyContent: 'center',
        marginHorizontal: 30,
        width: 125,
    },
    buttonIcon: {
        alignSelf: 'center',
        height: 100,
        width: 100,
    },
    buttonsContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 25,
    },
    cardContainer: {
        alignSelf: 'center',
        backgroundColor: '#373737',
        borderRadius: 20,
        paddingBottom: 20,
    },
    cardHeader: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContents: 'center',
        margin: 20,
        marginBottom: 0,
    },
    compText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    container: {
        flex: 1,
        marginBottom: 75,
    },
    imageContainer: {
        alignSelf: 'center',
        borderRadius: 20,
        height: 350,
        margin: 20,
        marginBottom: 10,
        width: 350,
    },
    nameText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginStart: 5,
    },
    nowPlayingContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#373737',
        borderRadius: 100,
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        marginBottom: 40,
        marginStart: 40,
    },
    nowPlayingImage: {
        alignSelf: 'center',
        borderRadius: 100,
        height: 30,
        marginStart: 10,
        resizeMode: 'center',
        width: 30,
    },
    nowPlayingText: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        marginStart: 40,
        marginBottom: 5,
    },
    profileImage: {
        alignSelf: 'center',
        borderRadius: 100,
        height: 50,
        width: 50,
    },
    title: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        margin: 30,
        marginBottom: 15,
    },
    text: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        marginHorizontal: 10,
    },
    topSBackground: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#222222',
        borderRadius: 15,
        flex: 1,
        margin: 5,
        padding: 10,
    },
    topSContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
    },
    topSData: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 12,
        justifyContent: 'center',
        lineHeight: 22,
        marginBottom: 5,
    },
})