import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';

import NumberContainer from '../componets/NumberContainer';
import Card from '../componets/Card';
import DefaultStyles from '../constans/default-styles';
import Colors from '../constans/Colors';
import MainButton from '../componets/MainButton';



const GameOver = props =>{
	return(
		
		<ScrollView>
			<View style = {styles.screen}>
				<Text style={DefaultStyles.title}>Bravo matori!</Text>
				<View style={styles.textContainer}>
					<Text style={DefaultStyles.bodyText}>
						Tvoj broj je: <Text style={styles.higlight}>{props.userNumber}</Text> 	
						<Text style={DefaultStyles.bodyText}> Sinu i meni je trebalo: <Text style={styles.higlight}>{props.roundsNumber}</Text> pokušaja da pogodimo! Oćeš do brazila?</Text>
					</Text>	
				</View>
				<View style={styles.imageContainer}>
				<Image 
					fadeDuration={1000}
					//source={require('../assets/success.png')} 
					source={{uri: 'http://www.pancevo.rs/sadrzaj/uploads/2015/01/Boban-199x300-199x300.jpg'}} 
					style={styles.image}
					resize='cover'
				/>
				</View>			
				
				<MainButton onPress={props.onRestart}>Nova igra Matori</MainButton>
			</View>
		</ScrollView>

	);
};

const styles = StyleSheet.create({
	screen:{
		flex: 1,		
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10
	},
	imageContainer:{
		width:Dimensions.get('window').width * 0.4,
		height: Dimensions.get('window').width * 0.6,
		borderRadius: Dimensions.get('window').width * 0.7 / 2,
		borderColor: 'black',
		borderWidth: 3,
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height * 0.7 / 20
	},
	image:{
		width: '100%',
		height: '100%',		
	},
	higlight:{
		color: Colors.brojevi,

	},
	textContainer:{
		width:'80%'
	}

});

export default GameOver;