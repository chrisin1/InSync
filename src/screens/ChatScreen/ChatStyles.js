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
        height: 60,
        width: 60,
        borderRadius: 30,
        marginRight: 10
    },
    
    name: {
        fontsize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    text: {
        fontSize: 14,
        color: 'white'
    },
    rightContainer: {
        paddingBottom: 20,
        width: 300
        
    },
    chatContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    row: {
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
   
})