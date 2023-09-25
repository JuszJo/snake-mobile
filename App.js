import React, { useRef } from 'react';
import { Text, StyleSheet, SafeAreaView, StatusBar, PanResponder } from "react-native";
import { GameEngine } from 'react-native-game-engine';
import constants from './constants';
import Head from './components/Head';
import GameLoop from './systems/Loop';

const BoardSize = constants.GRID_SIZE * constants.CELL_SIZE

const entities = {
    head: {
        position: [0, 0],
        size: constants.CELL_SIZE,
        updateFrequency: 20,
        nextMove: 20,
        color: "red",
        xspeed: 0,
        yspeed: 1,
        renderer: <Head />
    }
}

const systems = [GameLoop]

export default function App() {
    const engine = useRef(null)

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onStartShouldSetPanResponderCapture: (e, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (e, gestureState) => {
            
        },

        onPanResponderMove: (e, gestureState) => {
            const movementState = {}

            if(gestureState.dx > 0) {
                movementState[Math.abs(gestureState.dx)] = "MOVE_RIGHT"
            }
            else {
                movementState[Math.abs(gestureState.dx)] = "MOVE_LEFT"
            }
            
            if(gestureState.dy > 0) {
                movementState[Math.abs(gestureState.dy)] = "MOVE_DOWN"
            }
            else {
                movementState[Math.abs(gestureState.dy)] = "MOVE_UP"
            }

            const movement = movementState[Math.max(Math.abs(gestureState.dx), Math.abs(gestureState.dy))]
            
            console.log(movement);

            engine.current.dispatch(movement)
        },

        onPanResponderRelease: (e, gestureState) => {

        }
    })

    return (
        <SafeAreaView {...panResponder.panHandlers} style={styles.view}>
            {/* <Text>Hello</Text> */}
            <GameEngine ref={engine} style={styles.engine} running={() => {}} entities={entities} systems={systems} onEvent={(e) => {}}>

            </GameEngine>
        </SafeAreaView>
    )
}

console.log(BoardSize);

const styles = StyleSheet.create({
    view: {
        marginTop: StatusBar.currentHeight,
        flexBasis: "100%",
        alignItems: "center"
    },

    engine: {
        width: BoardSize,
        height:  BoardSize,
        backgroundColor: "black",
        border: "1px solid black",
    }
})