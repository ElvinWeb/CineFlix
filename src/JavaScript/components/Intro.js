import { HIDE_INTRO_DELAY, REMOVE_FADEANIMATION_DELAY } from "../config.js";
import { hideIntroOverlay, addActiveClass, addFadeClass } from "../helpers.js";

function intro() {
  const intro = document.querySelector(".intro");
  const logoSpans = document.querySelectorAll(".logo-span");

  const setIntroAnimation = function () {
    setTimeout(() => {
      addActiveClass(logoSpans);

      setTimeout(() => {
        addFadeClass(logoSpans);
      }, REMOVE_FADEANIMATION_DELAY);

      setTimeout(() => {
        hideIntroOverlay(intro);
      }, HIDE_INTRO_DELAY);
    });
  };

  window.addEventListener("DOMContentLoaded", setIntroAnimation);
}

export default intro;
