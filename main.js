(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),document.addEventListener("click",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),document.removeEventListener("click",r)}function n(e){var r=document.querySelector(".popup_is-opened");"Escape"===e.key&&t(r),e.target.removeEventListener("keydown",n)}function r(e){e.target.classList.contains("popup")&&t(e.target),e.target.removeEventListener("click",r)}var o=document.querySelector(".main"),c=o.querySelector(".handful-container-game"),a=o.querySelector(".game-history-container"),u=document.querySelector(".control__panel"),l=o.querySelector(".button__restart"),i=document.querySelector(".game__title"),s=o.querySelector(".page__title"),d=document.querySelector(".button_type-start");function m(e,t){for(var n=document.querySelector(".handful-list__image-item-template").content,r=1;r<=t;r++){var o=n.querySelector(".handful-list__image-item").cloneNode(!0);e.append(o)}}function f(e){Array.from(e.querySelectorAll("li")).forEach((function(e){e.remove()}))}function _(e){e.forEach((function(e){e.classList.contains("handful-checked")&&e.classList.remove("handful-checked")}))}function h(e){e.classList.add("handful-checked")}function v(e,t){e.target.classList.contains("handful")&&(_(t),h(e.target)),e.target.parentNode.classList.contains("handful")&&(_(t),h(e.target.parentNode)),e.target.parentNode.parentNode.classList.contains("handful")&&(_(t),h(e.target.parentNode.parentNode))}function y(e){Array.from(e.querySelectorAll(".handful")).forEach((function(e){"0 шт."===e.querySelector(".handful__count").textContent&&e.remove()}))}function p(e,t){var n=e.querySelector(".handful__count"),r=n.textContent.substring(0,2),o=e.querySelector(".handful-list__image");f(o),n.textContent="".concat(String(Number(r)-Number(t))," шт."),m(o,Number(r)-Number(t))}function S(e){return 0===Array.from(e.querySelectorAll("li")).length}function q(e,t,n,r,o){var c=document.querySelector(".history-item-template").content.querySelector(".history-item").cloneNode(!0),a=n.querySelector(".handful__number").textContent;c.textContent="".concat(t,". ").concat(o," взял ").concat(r," шт. из кучки №").concat(a),e.prepend(c)}function g(e,t,n){var r=document.querySelector(".history-item-template").content.querySelector(".history-item").cloneNode(!0);if(2===n)return r.classList.add("message-error"),r.textContent="Похоже, что кучек нет",void e.prepend(r);if(1===n&&t){var o=t.querySelector(".handful__number").textContent;return r.classList.add("message-good"),r.textContent="Из кучки №".concat(o," забрали всё"),void e.prepend(r)}return 3===n?(r.classList.add("message-error"),r.textContent="В кучке меньше предметов",void e.prepend(r)):4===n?(r.classList.add("message-info"),r.textContent="Выберете кучку",void e.prepend(r)):void 0}var L=document.querySelector(".main"),b=document.querySelector(".popup_type-start"),x=document.querySelector(".button_type-start"),C=(b.querySelector(".popup__button"),document.querySelector(".popup_type-how-many")),k=b.querySelector(".popup__button-close"),E=C.querySelector(".popup__button-close"),N=C.querySelector(".popup__button-start"),A=document.forms.assignItem,w=(A.querySelector(".assign-button"),A.assignCount),R=C.querySelector(".handful-container"),M=L.querySelector(".handful-container-game"),D=L.querySelector(".game-history-container"),F=L.querySelector(".button__restart"),I=(document.querySelector(".game__title"),L.querySelector(".page__title"),document.forms["start-game"]),T=document.querySelector(".control__panel"),j=T.querySelector(".panel-text"),z=T.panelInput,B=(T.querySelector(".control__button"),document.querySelector(".popup_type-final")),G=B.querySelector(".popup__button-close"),H=B.querySelector(".end-message"),J=1,K="Игрок";function O(t){K="Компьютер";var n=function(e){var t=Array.from(e.querySelectorAll(".handful"));if(t){var n=0;if(t.forEach((function(e){var t=e.querySelector(".handful__count"),r=Number(t.textContent.substring(0,2));n^=r})),0===n){var r=t[Math.floor(Math.random()*t.length)],o=Number(r.querySelector(".handful__count").textContent.substring(0,2));return{handful:r,countRemove:Math.floor(Math.random()*o)+1,random:!0}}for(var c=0;c<t.length;c++){var a=Number(t[c].querySelector(".handful__count").textContent.substring(0,2)),u=a^n;if(u<a){var l=a-u;return{handful:t[c],countRemove:l,random:!1}}}}}(t),r=n.handful.querySelector(".handful__count").textContent.substring(0,2);if(p(n.handful,n.countRemove),q(D,J,n.handful,n.countRemove,K),J++,Number(r)===Number(n.countRemove)&&(g(D,n.handful,1),y(t)),y(t),S(t))return g(D,n.handful,2),j.textContent="Взять из кучки №",H.textContent="".concat(K," выиграл!"),void e(B);K="Игрок"}G.addEventListener("click",(function(){t(B)})),x.addEventListener("click",(function(){e(b)})),I.addEventListener("submit",(function(n){n.preventDefault(),t(b);var r=I["number-of-handful"].value;!function(e,t){for(var n=1;n<=t;n++){var r=(o=n,c=void 0,a=void 0,u=void 0,a=(c=document.querySelector(".handful-template").content.querySelector(".handful").cloneNode(!0)).querySelector(".handful__number"),u=c.querySelector(".handful__count"),m(c.querySelector(".handful-list__image"),0),a.textContent="".concat(o,"."),u.textContent="".concat(0," шт."),c);e.append(r)}var o,c,a,u}(R,r),e(C)})),k.addEventListener("click",(function(){t(b)})),E.addEventListener("click",(function(){t(C),I.reset(),f(R)})),N.addEventListener("click",(function(){t(C),Array.from(R.querySelectorAll(".handful")).forEach((function(e){M.append(e)})),y(M);var e=M.querySelector(".handful-checked");if(e){var n=e.querySelector(".handful__number").textContent;j.textContent="Взять из кучки №".concat(n)}s.classList.add("element_hide"),d.classList.add("element_hide"),o.classList.add("main__game"),o.classList.remove("main__start"),c.classList.remove("element_hide"),a.classList.remove("element_hide"),u.classList.remove("element_hide"),l.classList.remove("element_hide"),i.classList.remove("element_hide"),I.whoFirst.checked&&"computer"===I["against-whom"].value&&setTimeout((function(){O(M)}),500),I.whoFirst.checked&&"man"===I["against-whom"].value&&(K="Соперник")})),F.addEventListener("click",(function(){I.reset(),f(M),f(D),T.reset(),c.classList.add("element_hide"),a.classList.add("element_hide"),u.classList.add("element_hide"),l.classList.add("element_hide"),i.classList.add("element_hide"),o.classList.remove("main__game"),o.classList.add("main__start"),s.classList.remove("element_hide"),d.classList.remove("element_hide")})),A.addEventListener("submit",(function(e){e.preventDefault();var t,n,r,o,c=R.querySelector(".handful-checked");c&&(t=c,n=w.value,r=t.querySelector(".handful__count"),o=t.querySelector(".handful-list__image"),r.textContent="".concat(n," шт."),m(o,n)),A.reset()})),R.addEventListener("click",(function(e){v(e,Array.from(R.querySelectorAll("li")))})),M.addEventListener("click",(function(e){v(e,Array.from(M.querySelectorAll("li")));var t=M.querySelector(".handful-checked");if(t){var n=t.querySelector(".handful__number").textContent;j.textContent="Взять из кучки №".concat(n)}})),T.addEventListener("submit",(function(t){t.preventDefault();var n=M.querySelector(".handful-checked");if(n){var r=n.querySelector(".handful__count").textContent.substring(0,2);!function(e,t){if(e){var n=e.querySelector(".handful__count").textContent.substring(0,2);return!(Number(n)<Number(t))}}(n,z.value)?g(D,n,3):(p(n,z.value),q(D,J,n,z.value,K),J++,Number(r)===Number(z.value)&&(g(D,n,1),y(M)),y(M),S(M)&&(g(D,n,2),j.textContent="Взять из кучки №",H.textContent="".concat(K," выиграл!"),e(B)),T.reset(),"computer"===I["against-whom"].value&&setTimeout((function(){O(M)}),500),"man"!==I["against-whom"].value||S(M)||(K=function(e){return"Игрок"===e?"Соперник":"Игрок"}(K)))}else S(M)?(g(D,n,2),j.textContent="Взять из кучки №",H.textContent="".concat(K," выиграл!"),e(B)):g(D,n,4)}))})();