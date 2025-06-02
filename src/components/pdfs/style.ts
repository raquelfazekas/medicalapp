import { StyleSheet } from '@react-pdf/renderer';
// Create styles
export const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        color: "#262626",
        fontFamily: "Helvetica",
        fontSize: 12,
        paddingHorizontal: "20px"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    image: {
        width: "80px"
    },
    logo: {
        width: 150,
        height: 120,
        alignSelf: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        marginVertical: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    box: {
        border: '1.5px solid black',
        padding: 10,
        marginVertical: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    label: {
        fontWeight: 'bold'
    },
    blueText: {
        color: '#1873e7',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 11
    },
    boxQuadro: {
        border: '1.5px solid black',
        padding: 8,
        width: '48%',
        minHeight: 130,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    labelQuadro: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    textQuadro: {
        fontSize: 10
    },

    row1: {
        textAlign: "left"
    },
      logo1: {
        width: 150,
        height: 120,
    },

});