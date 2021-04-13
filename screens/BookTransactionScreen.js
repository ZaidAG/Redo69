import React from 'react'
import{Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.state=({
            hasCameraPermissions:status==="granted",
            buttonState:'clicked',
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,  
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==="clicked"&&hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
                style={
                    StyleSheet.absoluteFillObject
                }
                />
            )
        }
        else if(buttonState==="normal"){
        return(
            <View style={styles.container}>
                <Text style={styles.displayText}>{
                    hasCameraPermissions===true ? this.state.scanned:'Request Camera Permission'
                }
                </Text>
                <TouchableOpacity
                onPress={this.getCameraPermission}
                style={styles.scanButton}>
                   <Text style={styles.buttonText}>
                    Scan QR Code
                </Text> 
                </TouchableOpacity>

            </View>
        )
    }
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
    },
    scanButton:{
        backgroundColor:'red',
        padding:10,
        margin:10,
    },
    buttonText:{
        fontSize:20
    }
  });