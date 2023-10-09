export interface IForum {
	_id?: string;
	gptPromptId: string;
	topic: string;
	createAt: Date;
	categories: string[];
	reads: number;
}

export interface ICategory {
	_id?: string;
	visited: number;
	order: number;
	desc: string;
	en: string;
	cn: string;
}

export interface IGPTPrompt {
	_id?: string;
	sessionID: string;
	user: string;
	msg: {
		model: string;
		role: string;
		content: string;
		key: number;
	}[];
	status: string;
}
