import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    },
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    imageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    imageLabel: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    link: {
        color: '#FF9283',
        fontSize: 14,
        fontWeight: 'bold'
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        overflow: "hidden"
    },
    songs: {
        marginLeft: 250,
        marginTop: 32,
        marginBottom: 6,
        alignItems: "center",
        fontSize: 10
    },
    songIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    songItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    text: {
        color: 'white',
        fontSize: 14
    },
    
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    }
    
});
