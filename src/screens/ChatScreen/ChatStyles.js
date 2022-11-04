import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        
    },
    title: {
        alignSelf: 'flex-start',
        color: 'white',
        fontSize: 48,
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
        fontWeight: 'bold',
        color: 'white'
    },
    text: {
        color: 'white'
    },
    rightContainer: {
        width: 300
        
    },
    chatContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
   
})