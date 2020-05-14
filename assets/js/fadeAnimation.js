
function prepareFadeInAnimation() {
	if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
		entries.forEach(entry => {
			if(!entry.isIntersecting) {
				if('delay' in entry.target.dataset) entry.target.dataset.delay = "0";
			}
			else {
				let delay = 0;
				if('delay' in entry.target.dataset) delay = parseInt(entry.target.dataset.delay);
				setTimeout(() => {
					entry.target.classList.add('transition', 'duration-300', 'ease-out');
					entry.target.classList.remove('opacity-0', 'translate-y-8');
					appearOnScroll.unobserve(entry.target);
					setTimeout(() => {
						entry.target.classList.remove('transform', 'transition', 'duration-300', 'ease-out');
					}, 300);
				}, delay);
			}
		});
	}, {
		threshold: 0,
		rootMargin: '-20px 0px 20px 0px'
	});

	let delay = 0;
	document.querySelectorAll('.enter-anim').forEach(elem => {
		elem.classList.add('transform', 'opacity-0');
		if((!window.location.hash || !elem.classList.contains('post-content')) && !elem.classList.contains('footer')) elem.classList.add('translate-y-8');
		if(!('delay' in elem.dataset)) {
			elem.dataset.delay = delay;
			delay += 75;
		}
		appearOnScroll.observe(elem);
	});

	document.querySelector('html').classList.remove('hidden');
}

prepareFadeInAnimation();
