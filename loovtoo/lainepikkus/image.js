resize(1920, 1080);

fillrect(0, 0, width, height, "#000022");

var do_sagedus = false;
var do_lainepikkus = false;

var linex = 0;

var liney = 800;
var lineh = 200;
var lainepikkus = 30;
var samm = 5;

const tf = new font(50, 'Ubuntu, "DejaVu Sans", "Noto Sans", Arial, sans-serif', "#abcdef");

var praegune_lainepikkus = lainepikkus;

var pool_lainepikkus = lainepikkus * Math.PI;

line_0();

setInterval(() => {
	if (linex > width) {
		return;
	}

	line(
		linex,
		liney + Math.sin(linex / praegune_lainepikkus) * lineh,
		linex + samm,
		liney + Math.sin((linex + samm) / praegune_lainepikkus) * lineh,
		"#abcdef",
		2,
	);

	if ((linex / samm) % 3 == 0) {
		line(
			linex,
			liney,
			linex,
			liney + Math.sin(linex / praegune_lainepikkus) * lineh,
			"#abcdef",
			2,
		);
	}

	let faas = linex % (pool_lainepikkus * 2);

	line(0, liney, linex, liney, "#ffff00", 10);

	line(0, liney, pool_lainepikkus * 2, liney, "#ff00ff", 10);

	if (do_sagedus && Math.floor((faas - pool_lainepikkus * 1.5) / samm) == 0) {
		line(920, 500, linex, liney - lineh - 10, "#ffff00", 2);
	}

	if (do_lainepikkus) line(300, 500, 0, liney, "#ff00ff", 2);
	if (do_lainepikkus) line(300, 500, pool_lainepikkus * 2, liney, "#ff00ff", 2);

	linex += samm;
}, 10);

function line_0() {
	
	fillrect(0, 0, width, height, "#000022");

	
	linex = 0;
	praegune_lainepikkus = lainepikkus;
	pool_lainepikkus = lainepikkus * Math.PI;
	
	if (do_sagedus) drawtext(920, 450, tf, "Sagedus");
	if (do_lainepikkus) drawtext(300, 450, tf, "Lainepikkus");
}

function muuda_lainepikkust(delta) {
	lainepikkus += (lainepikkus * (delta / 100)) / 10;

	line_0();
}
