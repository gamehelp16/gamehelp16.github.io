
barba.init({
	debug: true, // weird bug where debug has to be set to true or page will reload instad of redirecting to new url when clicking a link on slow internet
	timeout: 20000,
	prevent: ({el}) => {
		let ancestor = el.closest('.post-content');
		if(ancestor == null) return false;
		if(el.href.indexOf('/post/') !== -1) return false;
		return true;
	},
	transitions: [{
		beforeLeave(data) {
			if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			data.current.container.classList.add('transition', 'duration-300', 'transform');
		},
		leave(data) {
			// leave function has to exist for the afterLeave function to work
		},
		afterLeave(data) {
			if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
			return new Promise(resolve => {
				data.current.container.classList.add('-translate-y-8', 'opacity-0');
				setTimeout(resolve, 300);
			});
		}
	}]
});

barba.hooks.before(() => {
	NProgress.start();
});

barba.hooks.beforeEnter(() => {
	if('scrollRestoration' in history) history.scrollRestoration = 'manual';
	window.scrollTo(0, 0);
	prepareFadeInAnimation();
});

barba.hooks.after(({current, next, trigger}) => {
	NProgress.done();

	gtag('js', new Date());
	gtag('config', 'UA-71788573-1', {
		'anonymize_ip': true, // for GDPR
		'page_title' : document.title,
		'page_path': next.url.path
	});

	next.container.querySelectorAll('.post-content script').forEach(elem => {
		if(elem.src == '') eval(elem.innerHTML);
		else if(!loadedScripts.includes(elem.src)){
			let script = document.createElement('script');
			script.src = elem.src;
			document.body.appendChild(script);
		}
	});

	if(typeof twttr !== 'undefined' && next.container.querySelector('.twitter-tweet') != null) twttr.widgets.load();

	if(typeof DISQUS !== 'undefined' && next.container.querySelector('#disqus_thread') != null) {
		DISQUS.reset({
			reload: true,
			config: function () {
				this.page.identifier = next.url.path.replace('index.html', '');
			}
		});
	}
});
