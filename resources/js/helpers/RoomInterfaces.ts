export interface QuestionInterface {
	id: null | number;
	value: string;
	answers: { id: number; value: string; isCorrect: string }[];
}
