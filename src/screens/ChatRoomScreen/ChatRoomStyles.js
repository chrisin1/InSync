import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    backContainer: {
        alignSelf: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 30,
        marginBottom: 15,
    },

    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    backButton: {
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

    profileText: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5
    },

    profileContainer: {
        alignSelf: 'center',
        paddingBottom: 10,
        alignItems: 'center'
    },


    profileImage: {
        borderRadius: 100,
        height: 175,
        overflow: "hidden",
        width: 175,
        backgroundColor: '#FF9283'
    },
    
   

});