import { useContext } from 'react';
import { DataContext } from '../App';
import QuestionsData from '../data/QuestionData';
import Quiz from './Quiz';

const Score = () => {
	const { score, setAppState, setScore } = useContext(DataContext);
	const restartApp = () => {
		setAppState('menu');
		setScore(0);
	};

	return (
		<div className="score">
			<h1>สรุปผลคะแนนสอบ</h1>
			<h2>
				{score} / {QuestionsData.length}
			</h2>
			<button onClick={restartApp}>ทำแบบทดสอบอีกครั้ง</button>
		</div>
	);
};
export default Score;
