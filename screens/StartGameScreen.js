import React, {useState, useEffect} from 'react';
import {
	View, 
	Text, 
	StyleSheet, 
	Button, 
	TouchableWithoutFeedback, 
	Keyboard, 
	Alert, 
	Dimensions, 
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';

import Card from '../componets/Card';
import Colors from '../constans/Colors';
import Input from '../componets/input';
import NumberContainer from '../componets/NumberContainer';
import MainButton from '../componets/MainButton';





const StartGameScreen = props =>{
	const [enteredValue, setEnteredValue] = useState('')
	const [confirmed, setconfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();
	const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

	useEffect(() => {
		const updateLayout = () =>{
			setButtonWidth(Dimensions.get('window').width / 4);
		};

		Dimensions.addEventListener('change' ,updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout)
		};
	});

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};
	const resetInputHandler = () =>{
		setEnteredValue('')
		setconfirmed(false);
	};
	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99){
			Alert.alert(
				'Invalid number!', 
				'Number has to be number between 1 and 99', 
				[{text: 'Okay', style:'destructive', onPress: resetInputHandler}]
				);
			return;
		}
		setconfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();

	};

	let confirmedOutput;
	if (confirmed){
		confirmedOutput =(
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>Vodi me na pale</MainButton>
			</Card>
		);
	}

	return (
		<ScrollView>
		<KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
		<TouchableWithoutFeedback onPress={() => {
			Keyboard.dismiss();
		}}>
			<View style = {styles.screen}>
				<Text style = {styles.title}>Start a new game</Text>			
				<Card style={styles.inputContainer}>
					<Text>Select a number</Text>
					<Input 
						style={styles.input} 
						blurOnSubmit 
						keyboardType="number-pad" 
						maxLength={2}
						onChangeText = {numberInputHandler}
						value = {enteredValue}
					/>
					<View style = {styles.buttonContainer}>
						<View style={{width: buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/></View>
						<View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/></View>
											
					</View>				
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
		</ScrollView>

	);
};

	const styles = StyleSheet.create({
		screen: {
			flex: 1,
			padding: 10,
			alignItems: 'center'
		},
		buttonContainer:{
			flexDirection: 'row',
			width: '100%',
			justifyContent: 'space-between',
			paddingHorizontal: 15

		},
		inputContainer:{
			minWidth: 300,
			maxWidth: '95%',
			width: '80%',
			alignItems: 'center'

		},		
		title:{
			fontSize: 20,
			marginVertical: 10,
			fontFamily: 'open-sans-bold',
		},
		//button: {
			//width: 100,
			//width: Dimensions.get('window').width / 4,

		//},
		input: {
			width: 50,
			textAlign: 'center'
		},
		summaryContainer: {
			marginTop: 20,
			alignItems: 'center'
		}

	});

	export default StartGameScreen;