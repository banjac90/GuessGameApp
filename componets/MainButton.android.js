import React from 'react';
import {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	TouchableNativeFeedback,
	Platform
} from 'react-native';

import Colors from '../constans/Colors';


const MainButton = props =>{
	let ButttonComponent = TouchableOpacity;

	if(Platform.Version == 21){
		ButttonComponent = TouchableNativeFeedback;
	}


	return (
		<View style={styles.buttonContainer}>
		<ButttonComponent activeOpacity={0.6} onPress={props.onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{props.children}</Text>
			</View>
		</ButttonComponent>
		</View>
	);
	
}

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 25,
		overflow: 'hidden',		
	},
	button:{
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25
	},
	buttonText:{
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 18
	}
});

export default MainButton;