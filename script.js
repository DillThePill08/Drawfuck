function execute() {
	const code = document.getElementById("code").value
	const input = document.getElementById("input").value
	var stack = []
	var memory = []
	var pointer = 0
	var input_pos = 0
	var disable = 0

	var c = document.getElementById("canvas")
	var ctx = c.getContext("2d")
	var canvas = ctx.createImageData(256, 256)
	for (let i = 0; i < canvas.data.length; i += 4) {
		canvas.data[i] = 255
		canvas.data[i + 1] = 255
		canvas.data[i + 2] = 255
		canvas.data[i + 3] = 255

	}
	var canvas_pos = [0, 0]
	var canvas_color = [0, 0, 0]

	for (let i = 0; i < code.length; i++) {
		if (memory[pointer] == undefined) {
			memory[pointer] = 0
		}
		if (memory[pointer] <= -1) {
			memory[pointer] = 255
		} else if (memory[pointer] == 256) {
			memory[pointer] = 0
		}
		for (i; disable != 0; i++) {
			switch (code.charAt(i)) {
				case "[":
					disable++
					break;
				case "]":
					disable--
					break;
			}
		}
		switch (code.charAt(i)) {
			case "<":
				pointer--
				break;
			case ">":
				pointer++
				break;
			case "+":
				memory[pointer]++
				break;
			case "-":
				memory[pointer]--
				break;
			case ".":
				var pixel = canvas_pos[0] * 4 + canvas_pos[1] * 1024
				canvas.data[pixel] = canvas_color[0]
				canvas.data[pixel + 1] = canvas_color[1]
				canvas.data[pixel + 2] = canvas_color[2]
				console.log("Setting pixel " + canvas_pos.toString() + " to " + canvas_color.toString())
				break;
			case ",":
				if (input.charAt(input_pos) != "") {
					memory[pointer] = input.charCodeAt(input_pos)
				} else {
					memory[pointer] = 0
				}
				input_pos++
				break;
			case "[":
				if (memory[pointer] === 0) {
					disable = 1
				} else {
					stack.push(i)
				}
				break;
			case "]":
				if (memory[pointer] == 0) {
					stack.pop()
				} else {
					i = stack[stack.length - 1]
				}
				break;
			case "r":
				canvas_color[0] = memory[pointer]
				break;
			case "g":
				canvas_color[1] = memory[pointer]
				break;
			case "b":
				canvas_color[2] = memory[pointer]
				break;
			case "x":
				canvas_pos[0] = memory[pointer]
				break;
			case "y":
				canvas_pos[1] = memory[pointer]
				break;
			case "n":
				canvas_pos[1] -= 1
				if (canvas_pos[1] == -1) {
					canvas_pos[1] = 255
				}
				break;
			case "e":
				canvas_pos[0] += 1
				if (canvas_pos[0] == 256) {
					canvas_pos[0] = 0
				}
				break;
			case "s":
				canvas_pos[1] += 1
				if (canvas_pos[1] == 256) {
					canvas_pos[1] = 0
				}
				break;
			case "w":
				canvas_pos[0] -= 1
				if (canvas_pos[0] == -1) {
					canvas_pos[0] = 255
				}
				break;
		}
		console.log(memory[pointer])
	}
	ctx.putImageData(canvas, 0, 0)
}
document.getElementsByTagName("button").onclick(execute())