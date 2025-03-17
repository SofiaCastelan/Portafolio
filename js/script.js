gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let panels = gsap.utils.toArray(".panel"),
    observer,
    scrollTween;

if (ScrollTrigger.isTouch === 1) {
    observer = ScrollTrigger.normalizeScroll(true);
}

document.addEventListener("touchstart", e => {
    if (scrollTween) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}, { capture: true, passive: false });

function goToSection(i) {
    scrollTween = gsap.to(window, {
        scrollTo: { y: i * innerHeight, autoKill: false },
        onStart: () => {
            if (!observer) return;
            observer.disable();
            observer.enable();
        },
        duration: 1,
        onComplete: () => scrollTween = null,
        overwrite: true
    });
}

panels.forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=199%",
        onToggle: self => self.isActive && !scrollTween && goToSection(i)
    });
});

ScrollTrigger.create({
    start: 0,
    end: "max",
    snap: 1 / (panels.length - 1)
});
