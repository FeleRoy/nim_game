(()=>{"use strict";function e(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t),document.removeEventListener("click",n)}function t(n){var o=document.querySelector(".popup_is-opened");"Escape"===n.key&&e(o),n.target.removeEventListener("keydown",t)}function n(t){t.target.classList.contains("popup")&&e(t.target),t.target.removeEventListener("click",n)}var o=document.querySelector(".popup_type-start");document.querySelector(".button_type-start").addEventListener("click",(function(){o.classList.add("popup_is-opened"),document.addEventListener("keydown",t),document.addEventListener("click",n)}))})();