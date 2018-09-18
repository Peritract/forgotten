let messages = ["The moving finger writes, and having writ, moves on","Tomorrow and tomorrow and tomorrow", "It tolls for thee", "Mene, mene, tekel uphasim",
"The lone and level sands stretch far away", "Eloi, Eloi, lema sabachthani", "Unto dust you shall return"]

function blankify(message){
	let new_message = ""
	for (let i = 0; i < message.length; i++){
		let num = Math.floor(Math.random() * 10);
		new_message = new_message + (num > 7 ? [" ","."][Math.floor(Math.random() * 1)] : message[i]);
	}
	return new_message;
}

export default function getMessage(){
	return blankify(messages[Math.floor(Math.random() * messages.length)])
}