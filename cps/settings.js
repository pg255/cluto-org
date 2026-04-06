var st = {};

defaultSettings();
resizeSettings();

function defaultSettings() {
	st.circles = {
		frames: 100,
		frameInterval: 10,
		startOpacity: 0.1,
		endOpacity: 0,
	}
	st.circles.opacityDivider = (st.circles.frames / (st.circles.startOpacity - st.circles.endOpacity));
}

function resizeSettings() {
	st.circles.radiusMultiplier = Math.min(window.innerWidth, window.innerHeight) / st.circles.frames / 2;
}