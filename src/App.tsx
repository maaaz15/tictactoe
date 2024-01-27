import React, {useState} from 'react';
import {
  FlatList, Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar'
import Icons from "./components/Icons";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

function App(): React.JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reload = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(Array(9).fill('empty', 0, 9))
    ReactNativeHapticFeedback.trigger("impactLight", options);
  }

  const checkIsWinner = () => {
    if (
        gameState[0] === gameState[1] &&
        gameState[1] === gameState[2] &&
        gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game 🥳`)
    } else if (
        gameState[3] !== 'empty' &&
        gameState[3] === gameState[4] &&
        gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game 🥳`)
    } else if (
        gameState[6] !== 'empty' &&
        gameState[6] === gameState[7] &&
        gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game 🥳`)
    } else if (
        gameState[0] !== 'empty' &&
        gameState[0] === gameState[3] &&
        gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game 🥳`)
    } else if (
        gameState[1] !== 'empty' &&
        gameState[1] === gameState[4] &&
        gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game 🥳`)
    } else if (
        gameState[2] !== 'empty' &&
        gameState[2] === gameState[5] &&
        gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game 🥳`)
    } else if (
        gameState[0] !== 'empty' &&
        gameState[0] === gameState[4] &&
        gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game 🥳`)
    } else if (
        gameState[2] !== 'empty' &&
        gameState[2] === gameState[4] &&
        gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game 🥳`)
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game...⌛')
    }
  }

  const onChangeBox = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: "#000000",
        textColor: '#FFFFFF'
      })
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: 'red',
        textColor: '#FFFFFF'
      })
    }

    checkIsWinner()
    ReactNativeHapticFeedback.trigger("impactLight", options);
  }

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        {gameWinner ? (
            <View style={[styles.playerInfo, styles.winnerInfo]}>
              <Text style={styles.winnerText}>{gameWinner}</Text>
            </View>
        ) : (
            <View style={styles.playerInfo}>
              <Text style={styles.gameTurnText}>Player {isCross ? 'X' : 'O'}'s Turn</Text>
            </View>
        )}
        <FlatList
            data={gameState}
            numColumns={3}
            style={styles.grid}
            renderItem={({item, index}) => (
                <Pressable
                    key={index}
                    style={styles.card}
                    onPress={() => onChangeBox(index)}
                >
                  <Icons name={item}/>
                </Pressable>
            )} />
        <Pressable
            style={styles.gameBtn}
            onPress={reload}
        >
          <Text style={styles.gameBtnText}>
            {gameWinner ? 'Start new game' : 'Reload the game'}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  playerInfo: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    marginHorizontal: 14,
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  winnerText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  gameTurnText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000'
  },
  grid: {
    marginTop: 30,
  },
  card: {
    height: 110,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    marginVertical: 20,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
});

export default App;
