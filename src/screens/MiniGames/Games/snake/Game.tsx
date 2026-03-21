import { Canvas, Circle, Rect } from '@shopify/react-native-skia';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import { Direction, Vec } from './types';
import { useSharedValue } from 'react-native-reanimated';
import { useRewardedInterstitialAd } from '@/hooks/ad/useRewardedInterstitialAd';
import { SGS } from './styles';
import { useTimer } from '@/hooks/useTimer';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// const CELL_SIZE = 20;
// const GRID_SIZE = 15;

const GRID_SIZE = 15;

const CELL_SIZE = width / GRID_SIZE;

const GAME_SIZE = CELL_SIZE * GRID_SIZE;
const SPEED = 160;

const difficulty = [
	{ score: 0, multiplier: 1.0 },
	{ score: 5, multiplier: 1.1 },
	{ score: 10, multiplier: 1.2 },
	{ score: 20, multiplier: 1.3 },
	{ score: 30, multiplier: 1.4 },
];

function getCurrentSpeed(score: number) {
	let multiplier = 1;

	for (const d of difficulty) {
		if (score >= d.score) {
			multiplier = d.multiplier;
		}
	}

	return SPEED / multiplier;
}

function getSnakeColor(index: number, length: number) {
	const t = index / (length - 1 || 1);

	// curva exponencial suave
	const eased = Math.pow(t, 1.8);

	const lightness = 35 + eased * 30;

	return `hsl(120, 100%, ${lightness}%)`;
}

export function SnakeGameScreen() {
	const { loaded, show } = useRewardedInterstitialAd();
	const timer = useTimer();
	const navegation = useNavigation();
	const [score, setScore] = useState(0);

	const [food, setFood] = useState<Vec>({ x: 8, y: 8 });
	const [direction, setDirection] = useState<Direction>('RIGHT');
	const [snake, setSnake] = useState<Vec[]>([{ x: 5, y: 5 }]);
	const [gameOver, setgameOver] = useState(false);

	function randomFood() {
		while (true) {
			const positionNewFood = {
				x: Math.floor(Math.random() * GRID_SIZE),
				y: Math.floor(Math.random() * GRID_SIZE),
			};

			const inSnakePosition = snake.some((s) => s.x === positionNewFood.x && s.y === positionNewFood.y);

			if (!inSnakePosition) {
				return positionNewFood;
			}
		}
	}

	const gesture = Gesture.Pan()
		.minDistance(10)
		.onFinalize((e) => {
			'worklet';
			const dx = e.translationX;
			const dy = e.translationY;

			let newDirection: Direction;

			if (Math.abs(dx) > Math.abs(dy)) {
				newDirection = dx > 0 ? 'RIGHT' : 'LEFT';
			} else {
				newDirection = dy > 0 ? 'DOWN' : 'UP';
			}

			scheduleOnRN(updateDirection, newDirection);
		});

	function updateDirection(newDirection: Direction) {
		if (gameOver) return;
		setDirection((prev) => {
			if (
				(prev === 'UP' && newDirection === 'DOWN') ||
				(prev === 'DOWN' && newDirection === 'UP') ||
				(prev === 'LEFT' && newDirection === 'RIGHT') ||
				(prev === 'RIGHT' && newDirection === 'LEFT')
			) {
				return prev;
			}
			return newDirection;
		});
	}

	function moveSnake(prevSnake: Vec[], dir: Direction): Vec[] {
		const head = { ...prevSnake[0] };
		switch (dir) {
			case 'UP':
				head.y -= 1;
				break;
			case 'DOWN':
				head.y += 1;
				break;
			case 'LEFT':
				head.x -= 1;
				break;
			case 'RIGHT':
				head.x += 1;
				break;
		}
		return [head, ...prevSnake];
	}

	function checkCollision(head: Vec, snake: Vec[]): boolean {
		return (
			head.x < 0 ||
			head.x >= GRID_SIZE ||
			head.y < 0 ||
			head.y >= GRID_SIZE ||
			snake.some((seg) => seg.x === head.x && seg.y === head.y)
		);
	}

	useEffect(() => {
		if (gameOver) return;
		timer.start();
		const interval = setInterval(() => {
			setSnake((prev) => {
				const newSnake = moveSnake(prev, direction);
				const head = newSnake[0];

				if (checkCollision(head, prev)) {
					GamerOver();
					return prev;
				}

				if (head.x === food.x && head.y === food.y) {
					setFood(randomFood());
					setScore((prev) => prev + 1);
					return newSnake;
				}

				newSnake.pop();
				return newSnake;
			});
		}, getCurrentSpeed(score));

		return () => clearInterval(interval);
	}, [direction, food, gameOver, score]);
	function resetGame() {
		navegation.navigate('Propaganda');

		// show();

		// setSnake([{ x: 5, y: 5 }]);
		// setScore(0);
		// setFood(randomFood());
		// setDirection('RIGHT');
		// setgameOver(false);
		// timer.reset();
	}

	function GamerOver() {
		setgameOver(true);
		timer.stop();
	}

	const head = snake[0];

	const directionVec = {
		x: direction === 'RIGHT' ? 1 : direction === 'LEFT' ? -1 : 0,
		y: direction === 'DOWN' ? 1 : direction === 'UP' ? -1 : 0,
	};

	const { leftEye, rightEye } = getEyes(head, directionVec, CELL_SIZE);

	return (
		<GestureDetector gesture={gesture}>
			<SGS.Container>
				<SGS.Body>
					<SGS.Header>
						<SGS.TextHeader>Score: {score}</SGS.TextHeader>
						<SGS.TextHeader>Timer: {timer.formatted}</SGS.TextHeader>
					</SGS.Header>
					<Canvas style={styles.game}>
						{snake.map((segment, index) => (
							<Rect
								key={index}
								x={segment.x * CELL_SIZE}
								y={segment.y * CELL_SIZE}
								width={CELL_SIZE}
								height={CELL_SIZE}
								color={getSnakeColor(index, snake.length)}
							/>
						))}

						{/* olhos */}
						<Circle cx={leftEye.x} cy={leftEye.y} r={leftEye.r} color="black" />

						<Circle cx={rightEye.x} cy={rightEye.y} r={rightEye.r} color="black" />
						<Rect x={food.x * CELL_SIZE} y={food.y * CELL_SIZE} width={CELL_SIZE} height={CELL_SIZE} color="red" />
					</Canvas>
					{gameOver && (
						<SGS.Overlay onTouchStart={resetGame}>
							<Text style={styles.gameOver}>Game Over</Text>
							<Text style={styles.gameOver}>Assista a propaganda para coletar a recompensa!</Text>
						</SGS.Overlay>
					)}
				</SGS.Body>

				{/* <Text style={styles.text}>Direction: {direction}</Text>
				<Text style={styles.text}>pedi: {gameOver ? 'perdeu' : ''}</Text>
				<Text style={styles.text}>score: {score}</Text>
				<Text style={styles.text}>velocidade: {getCurrentSpeed(score)}</Text>
				<Text style={styles.text}>propaganda: {loaded ? 'carregou' : 'não carregou'}</Text> */}
				{/* {gameOver && (
					<View style={styles.overlay} onTouchStart={resetGame}>
						<Text style={styles.gameOver}>Game Over{'\n'}Tap to Restart</Text>
					</View>
				)} */}
			</SGS.Container>
		</GestureDetector>
	);
}

function getEyes(head: { x: number; y: number }, direction: Vec, cellSize: number) {
	const eyeOffsetForward = cellSize * 0.18;
	const eyeOffsetSide = cellSize * 0.18;
	const eyeRadius = cellSize * 0.08;

	const centerX = head.x * cellSize + cellSize / 2;
	const centerY = head.y * cellSize + cellSize / 2;

	// perpendicular vector (lado)
	const sideX = -direction.y;
	const sideY = direction.x;

	return {
		leftEye: {
			x: centerX + direction.x * eyeOffsetForward + sideX * eyeOffsetSide,
			y: centerY + direction.y * eyeOffsetForward + sideY * eyeOffsetSide,
			r: eyeRadius,
		},
		rightEye: {
			x: centerX + direction.x * eyeOffsetForward - sideX * eyeOffsetSide,
			y: centerY + direction.y * eyeOffsetForward - sideY * eyeOffsetSide,
			r: eyeRadius,
		},
	};
}
const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	backgroundColor: '#111',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// },

	game: {
		width: GAME_SIZE,
		height: GAME_SIZE,
		backgroundColor: '#222',
	},

	snake: {
		position: 'absolute',
		width: CELL_SIZE,
		height: CELL_SIZE,
	},

	food: {
		position: 'absolute',
		width: CELL_SIZE,
		height: CELL_SIZE,
		backgroundColor: 'red',
	},

	text: {
		color: 'white',
		marginTop: 10,
		fontSize: 18,
	},

	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},

	gameOver: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
