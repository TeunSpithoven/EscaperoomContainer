export interface HasManyItemInterface {
	id: null | number;
	value: string;
	answers: HasManyItemAnswerInterface[];
}

export interface HasManyItemAnswerInterface {
	value: string;
	isCorrect: boolean;
}
