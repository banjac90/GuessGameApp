import React, {useState, useRef, useEffect} from 'react';
import {
	View, 
	Text, 
	StyleSheet, 
	Button, 
	Alert, 
	ScrollView, 
	FlatList,
	Dimensions
} from 'react-native';

import NumberContainer from '../componets/NumberContainer';
import Card from '../componets/Card';
import DefaultStyles from '../constans/default-styles';
import MainButton from '../componets/MainButton';
import { Ionicons } from '@expo/vector-icons';
import {ScreenOrientation} from 'expo';

const genereteRandomBetween = (min, max, exclude) =>{
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNumb = Math.floor(Math.random()*(max-min))+min;
	if(rndNumb === exclude){
		return genereteRandomBetween(min, max, exclude);
	} else {
		return rndNumb;
	}
};

const renderListItems = (listLenght, itemData) =>(
		<View style={styles.listItem}>
			<Text styles={DefaultStyles.bodyText}>#{listLenght - itemData.index}</Text>
			<Text styles={DefaultStyles.bodyText}>{itemData.item}</Text>
		</View>
	);


const GameScreen = props =>{
	//ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

	const initialGuess = genereteRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
	const [aveableDeviceWidth, setAveableDeviceWidth] = useState(Dimensions.get('window').width);
	const [aveableDeviceHeight, setAveableDeviceHeight] = useState(Dimensions.get('window').height);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const {
		userChoice, onGameOver
	} = props;

	useEffect(() =>{
		const updateLayout = () =>{
			setAveableDeviceWidth(Dimensions.get('window').width);
			setAveableDeviceHeight(Dimensions.get('window').height);
		};

		Dimensions.addEventListener('change' ,updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	useEffect(() =>{
		if (currentGuess === userChoice){
			onGameOver(pastGuesses.length);
		}

	}, [currentGuess, onGameOver, userChoice]);


	const nextGuessHandler = direction =>{
			if ((direction ==='lower' && currentGuess < props.userChoice) || (direction==='greater' && currentGuess > props.userChoice)){
				Alert.alert("Sto lazes?", 'Sto opet lazes?',
					[{text:'Ok necu vise!', style:'cancel',
				}]);
				return;
			}
			if (direction === 'lower'){
				currentHigh.current = currentGuess;
			}else{
				currentLow.current = currentGuess + 1;
			}
			const nextNumber = genereteRandomBetween(currentLow.current, currentHigh.current, currentGuess);
			setCurrentGuess(nextNumber);
			//setRounds(curRounds => curRounds + 1);
			setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
		};

	if (Dimensions.get('window').height < 500){
		return(
			<View style={styles.screen}>
				<Text style={DefaultStyles.bodyText}>Opponet's Guess</Text>
				<View style={styles.controls}>
					<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name='md-remove' size={24} color='white'/>
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name='md-add' size={24} color='white'/>
					</MainButton>
				</View>
				<View style={styles.listContainer}>
			{/*	<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
				</ScrollView>*/}
				<FlatList 
					keyExtractor={item => item} 
					data={pastGuesses} 
					renderItem={renderListItems.bind(this, pastGuesses.length)} 
					contentContainerStyle={styles.list}
				/>
				</View>	
			</View>		
		)
	}

	return(
		<View style={styles.screen}>
			<Text style={DefaultStyles.bodyText}>Opponet's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name='md-remove' size={24} color='white'/>
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name='md-add' size={24} color='white'/>
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
		{/*	<ScrollView contentContainerStyle={styles.list}>
				{pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
			</ScrollView>*/}
			<FlatList 
				keyExtractor={item => item} 
				data={pastGuesses} 
				renderItem={renderListItems.bind(this, pastGuesses.length)} 
				contentContainerStyle={styles.list}
			/>
			</View>
		</View>
	)
};

const styles = StyleSheet.create({
	screen:{
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
		width: 400,
		maxWidth: '90%'
	},
	listItem:{
		borderColor: '#ccc',
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	listContainer:{
		width: Dimensions.get('window').width > 300 ? '60%' : '80%',
		flex: 1,
	},
	list:{
		flexGrow: 1,
		//alignItems: 'center',
		justifyContent: 'flex-end'
	},
	controls: {
		justifyContent: 'space-around',
		flexDirection: 'row',
		alignItems: 'center',
		width: '80%',

	}

});

export default GameScreen;