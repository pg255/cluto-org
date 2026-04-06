// when device is mobile size
var matchMedia = window.matchMedia("(max-width: 800px)");
matchMedia.addEventListener("change", function() {
	if (matchMedia.matches && mode != 0) {
		document.getElementById("text1").style.fontSize = "5em";
	} else {
		document.getElementById("text1").style.fontSize = "10em";
	}
});

function resize() {
	document.getElementById("circles").width = window.innerWidth;
	document.getElementById("circles").height = window.innerHeight;
	resizeSettings();
}
resize();

function popup(toOpen, id) {
    if (toOpen) {
        document.getElementById(id + "Back").style.display = "block";
        document.getElementById(id).style.display = "block";
        if (id == "result") {
            document.getElementById("resultTitle").innerHTML = (Math.round((clicks / totalTimeInSeconds) * 1000) / 1000)  + " CPS";
            document.getElementById("resultClicks").innerHTML = clicks + ` <span class="c">CLICK${(clicks != 1) ? "S" : ""} IN</span> ${totalTimeInSeconds} <span class='c'>SECONDS</span>`;
            modeSwitch(mode); // reset
            clickProtector();
        }
    } else {
		// close
        document.getElementById(id + "Back").style.display = "none";
        document.getElementById(id).style.display = "none";
    }
}

document.getElementById("clickProtector").addEventListener("click", function() {
	clearTimeout(clickProtectorTimeout);
	clickProtector();
});
var clickProtectorTimeout;
// this makes it so you dont click on ad or close result on accident
function clickProtector() {
	clickProtectorOn = true;
    document.getElementById("clickProtector").style.display = "block";
    clickProtectorTimeout = setTimeout(function() {
		document.getElementById("clickProtector").style.display = "none";
		clickProtectorOn = false;
	}, 300);
}


// circles
var circles = [];

function newCircle(x, y) {
	circles.push({x: x, y: y, size: 1});
}


function updateCircles() {
	const canvas = document.getElementById("circles");
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (i in circles) {
		ctx.beginPath()
		ctx.arc(circles[i].x, circles[i].y, st.circles.radiusMultiplier * circles[i].size, 0, 2 * Math.PI);
		ctx.fillStyle = `rgba(255, 255, 0, ${st.circles.startOpacity - (circles[i].size / st.circles.opacityDivider)})`;
		ctx.fill()
		circles[i].size += 1;
		if (circles[i].size > st.circles.frames) circles.splice(i, 1);
	}
}

setInterval(updateCircles, st.circles.frameInterval);