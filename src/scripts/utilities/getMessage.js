let messages = ["Where are you going?", "What are you searching for?", "There is nothing beyond this place.",
				"Your efforts are wasted.", "Why do you persist?", "What do you hope for?",
				"You cannot get out.", "You hope in vain.", "There is nothing but the void."]

function* messageGenerator(){
	let index = 0;
	while (true) {
		yield messages[index];
		index++;
		if (index > messages.length) {
			index = 0;
		}
	}
}

const generator = messageGenerator();

export default function getMessage(){
	return generator.next().value;
}