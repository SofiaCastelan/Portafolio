document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) { // Activa cuando el usuario baja 50px
            menu.classList.add("fijo");
        } else {
            menu.classList.remove("fijo");
        }
    });
});


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const panels = gsap.utils.toArray(".panel");
let observer = null;

// Habilita ScrollTrigger.normalizeScroll() solo en dispositivos táctiles
if (ScrollTrigger.isTouch === 1) {
    observer = ScrollTrigger.normalizeScroll(true);
}
//
document.addEventListener("DOMContentLoaded", () => {
    const puertas = document.querySelectorAll(".solo-esta");

    puertas.forEach(puerta => {
        let animating = false;

        puerta.addEventListener("mouseenter", () => {
            if (animating || puerta.classList.contains("abrir")) return;
            animating = true;

            puerta.classList.remove("cerrar");
            requestAnimationFrame(() => {
                puerta.classList.add("abrir");
                puerta.onclick = () => {
                    window.location.href = "https://sofi261022.itch.io/aventura-d";
                };
                puerta.style.cursor = "pointer";
            });
        });

        puerta.addEventListener("mouseleave", () => {
            if (animating || puerta.classList.contains("cerrar")) return;
            animating = true;

            puerta.classList.remove("abrir");
            requestAnimationFrame(() => {
                puerta.classList.add("cerrar");
            });
        });

        puerta.addEventListener("animationend", (event) => {
            animating = false;

            // Asegurar que la imagen se mantiene en el último frame al abrir
            if (event.animationName === "abrirPuerta") {
                puerta.style.backgroundPosition = "-1385px 0";
            } 
            // Asegurar que la imagen se mantiene en el primer frame al cerrar
            else if (event.animationName === "cerrarPuerta") {
                puerta.style.backgroundPosition = "0 0";
            }
        });
    });
});


// Configura ScrollTrigger para cada panel
panels.forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=199%",
        onToggle: (self) => {
            if (self.isActive && !scrollTween) {
                goToSection(i);
            }
        }
    });
});

// Configura el desplazamiento automático por secciones
ScrollTrigger.create({
    start: 0,
    end: "max",
    snap: 1 / (panels.length - 1)
});

document.addEventListener("DOMContentLoaded", () => {
    const puertas = document.querySelectorAll(".sprite-puerta");

    puertas.forEach(puerta => {
        puerta.addEventListener("mouseenter", () => {
            puerta.classList.add("movimiento");
        });

        puerta.addEventListener("mouseleave", () => {
            puerta.classList.remove("movimiento");
        });
    });
});
