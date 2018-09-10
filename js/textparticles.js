window.onload = function() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;

	var str = "Hello World!";
	var x = y = 0;
	var particles = [];

	var img = new Image();
	img.src = "img/ls1.jpg";

	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);
	ctx.fillStyle = "#FFF";
	ctx.font = "30px Arial";
	ctx.textAlign = "center";

	img.onload = function() {
		ctx.drawImage(img, width/2 - img.width/2, 100);
		ctx.fillText(str, width/2, height/2 + 60);

		function Particle(x, y, r, g, b) {
			this.x = x;
			this.y = y;
			this.r = r;
			this.g = g;
			this.b = b;
			this.rb = this.r;
			this.gb = this.g;
			this.bb = this.b;
			this.xb = x;
			this.yb = y;
			this.rvx = 0;
			this.rvy = 0;
		}

		Particle.prototype.updateParticles = function(b) {
			if (b == false) {
				this.x += Math.random() * 80 - 40;
				this.y += Math.random() * 80 - 40;
				this.rvx = (this.x - this.xb) / 10;
				this.rvy = (this.y - this.yb) / 10;
			} else {
				if ((this.rvx > 0 && this.x - this.xb > this.rvx) || (this.rvx < 0 && this.x - this.xb < this.rvx)) {
					this.x -= this.rvx;
					this.y -= this.rvy;
				} else {
					this.x = this.xb;
					this.y = this.yb;
				}
				if ((this.x - this.rvx) < this.xb && this.rvx > 0 || (this.x + this.rvx) > this.xb && this.rvx < 0) {
					!b;
					this.rvx = 0;
					this.rvy = 0;
					this.r = this.rb;
					this.g = this.gb;
					this.b = this.bb;
				}
			}
			ctx.fillStyle = "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
			ctx.fillRect(this.x, this.y, 1, 1);
		}

		var dataStuff = ctx.getImageData(0, 0, width, height).data;
		for (var i = 0; i < dataStuff.length; i += 4) {
			if (dataStuff[i] !== 0 || dataStuff[i+1] !== 0 || dataStuff[i+2] !== 0) {
				x = (i/4) % width;
				y = i / (4*width);
				particles.push(new Particle(x, y, dataStuff[i], dataStuff[i+1], dataStuff[i+2]));
			}
		}

		var called = false;
		var began = false;
		document.getElementById("button").onclick = function(e) {
			if (began == false) {
				began = true;
				updateCanvas();
			} else {
				called = !called;
			}
		};

		function updateCanvas() {
			ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
			ctx.fillRect(0, 0, width, height);
			for (var i in particles) {
				particles[i].updateParticles(called);
			}
			requestAnimationFrame(updateCanvas);
		}
	}
}
