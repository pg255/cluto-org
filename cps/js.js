// mode 0: Just show CPS
// mode 1: 5 second speed test
// mode 2: 60 second speed test
// mode 3: go to "more tools"
var mode = 0;

var started;
var clicks = 0;

// multible cp makes cps shower be smoother. Change currentCps to change CPS.
var currentCps = 0, cps1 = 0, cps2 = 0, cps3 = 0;

// too hard to explain.
var timeFinish, currentTime, totalTimeInSeconds;

function modeSwitch(newMode) {
    const oldMode = mode;
    mode = newMode;
    switch (mode) {
        case 0:
			// mode 0: Just show CPS
            document.getElementById("text1").innerHTML = "0 cps";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "";
            currentCps, cps1, cps2, cps3 = 0, clicks = 0;
            clearInterval(cpsInterval);
            clearInterval(timerInterval);
            cpsInterval = setInterval(updateCPS, 250);
            break;
        case 1:
			// mode 1: 5 second speed test
            document.getElementById("text1").innerHTML = "Click to Start";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "0 cps";
			if (matchMedia.matches && mode != 0) {
				document.getElementById("text1").style.fontSize = "5em";
			} else {
				document.getElementById("text1").style.fontSize = "10em";
			}
            currentCps, cps1, cps2, cps3 = 0, clicks = 0, started = false;
            timeFinish = 100,  currentTime= 150, totalTimeInSeconds = 5;
            clearInterval(cpsInterval);
            clearInterval(timerInterval);
            break;
        case 2:
			// mode 2: 60 second speed test
            document.getElementById("text1").innerHTML = "Click to Start";
            document.getElementById("text2").innerHTML = "0 clicks";
            document.getElementById("text3").innerHTML = "0 cps";
			if (matchMedia.matches && mode != 0) {
				document.getElementById("text1").style.fontSize = "5em";
			} else {
				document.getElementById("text1").style.fontSize = "10em";
			}
            currentCps, cps1, cps2, cps3 = 0, clicks = 0, started = false;
            timeFinish = 1000,  currentTime= 1600, totalTimeInSeconds = 60;
            clearInterval(cpsInterval);
            clearInterval(timerInterval);
            break;
        case 3:
			// mode 3: go to "more tools"
            mode = oldMode;
			window.open("/", "_blank");
            popup(true, "custom");
            return;
    }
	// add borders
    document.getElementById("mb" + oldMode).classList.remove("buttonBorder");
    document.getElementById("mb" + mode).classList.add("buttonBorder");
}

// when clicked
document.getElementById("clickCounter").addEventListener('click', function (e) {
	click();
	newCircle(e.clientX, e.clientY);
});
document.getElementById("clickCounter").addEventListener('contextmenu', function(e) {
    e.preventDefault();
	click();
	newCircle(e.clientX, e.clientY);
}, false);

//count clicks
function click() {
	if (mode == 0) {
        clicks++;
        document.getElementById("text2").innerHTML = clicks + " clicks";
        currentCps++;
    } else {
        if (started) {
            currentCps++;
            clicks++;
            document.getElementById("text2").innerHTML = clicks + " clicks";
        } else {
            currentCps++;
            clicks++;
            document.getElementById("text2").innerHTML = clicks + " clicks";
            started = true;
            cpsInterval = setInterval(updateCPS, 250);
            timerInterval = setInterval(timer, 100);
        }
    }
}

//timer
function timer() {
    currentTime--;
    document.getElementById("text1").innerHTML = ((currentTime + "").slice(1, -1) + "." + (currentTime + "").slice(-1, currentTime.length)) + "s left";
    if (currentTime == timeFinish) {
        clearInterval(timerInterval);
        popup(true, "result");
        started = false;
    }
}

var cpsInterval = setInterval(updateCPS, 250), timerInterval;
function updateCPS() {
    if (mode == 0) {
        document.getElementById("text1").innerHTML = (currentCps + cps1 + cps2 + cps3) + " cps";
    } else {
        document.getElementById("text3").innerHTML = (currentCps + cps1 + cps2 + cps3) + " cps";
    }
    cps3 = cps2;
    cps2 = cps1;
    cps1 = currentCps;
    currentCps = 0;
}
