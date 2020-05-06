let userPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let darkMode = false;

detectDarkMode();
updateElements();

function detectDarkMode() {
	darkMode = localStorage.getItem('darkMode') === null ? userPreference : localStorage.getItem('darkMode') === 'true';
}

function updateElements() {
	if(darkMode) {
		document.querySelector('html').classList.add('dark');
		document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#020c1b');
	}
	else {
		document.querySelector('html').classList.remove('dark');
		document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#ffffff');
	}

}

function toggleDarkMode() {
	darkMode = !darkMode;
	localStorage.setItem('darkMode', darkMode.toString());
	document.body.classList.add('color-anim');
	updateElements();
}

window.addEventListener('storage', e => {
	if(e.key === 'darkMode') {
		if(document.hidden) document.body.classList.remove('color-anim');
		else document.body.classList.add('color-anim');
		detectDarkMode();
		updateElements();
	}
});