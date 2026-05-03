var width = 100;
var height = 100;

const c = {
	canvas: document.getElementById("image"),
	ctx: () => {
		return c.canvas.getContext("2d");
	},
	
	cssresize: () => {
		let canvas_ratio = width / height;
		let screen_ratio = window.innerWidth / window.innerHeight;
		
		if (screen_ratio > canvas_ratio) {
			c.canvas.style.width = window.innerHeight * canvas_ratio + "px";
			c.canvas.style.height = window.innerHeight + "px";
		} else {
			c.canvas.style.width = window.innerWidth + "px";
			c.canvas.style.height = window.innerWidth / canvas_ratio + "px";
		}
	},
};

function download(name) {
	let link = document.getElementById("download");
	link.download = name;
	link.href = c.canvas.toDataURL();
	link.click();
}

function resize(w, h) {
	c.canvas.width = w;
	c.canvas.height = h;
	width = w;
	height = h;
	c.cssresize();
}

function fillrect(x, y, w, h, color) {
	let ctx = c.ctx();
	
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

function forEachColumn(callback) {
	let ctx = c.ctx();
	
	for (let i = 0; i < width; i++) {
		let pixels = callback(i);
		for (let pixel in pixels) {
			console.log(pixels[pixel].color, pixels[pixel].y)
			ctx.fillStyle = pixels[pixel].color;
			ctx.fillRect(i, pixels[pixel].y, 1, 1);
		}
	}
}


function drawHorizontalLine(callback, color, line_width) {
	let ctx = c.ctx();
	
	ctx.strokeStyle = color;
	ctx.lineWidth = line_width;
	
	ctx.beginPath();
	
	for (let x = 0; x < width; x++) {
		let y = callback(x);
		if (x === 0) {
	        ctx.moveTo(x, y);
	    } else {
	        ctx.lineTo(x, y);
		}
	}
	
	ctx.stroke();
}

class font {
	constructor(size, font, color) {
		this.size = size;
		this.font = font;
		this.color = color;
	}
};

function drawtext(x, y, font, text) {
	let ctx = c.ctx();
	
	ctx.fillStyle = font.color;
	ctx.font = `${font.size}px ${font.font}`;
		
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	
	ctx.fillText(text, x, y);
}

function line(x1, y1, x2, y2, color, line_width) {
	let ctx = c.ctx();
	
	ctx.strokeStyle = color;
	ctx.lineWidth = line_width;
	
	ctx.beginPath();
	
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	
	ctx.stroke();
}

c.cssresize();

function drawImage({ src, x = 0, y = 0, width = null, height = null }) {
	let ctx = c.ctx();
	
	const img = new Image();
	img.onload = () => {
		const aspect = img.width / img.height;
		
		if (height === null) {
			height = Math.round(width / aspect);
		}
		
		if (width === null) {
			width = Math.round(height * aspect);
		}
		
		ctx.drawImage(img, x, y, width, height);
	};
	img.onerror = (e) => console.error('Image load error', e);
	img.src = src;
}