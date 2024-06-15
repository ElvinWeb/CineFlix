import {
  INITIAL_ANIMATION_STEP,
  REMOVE_ADDANIMATION_DELAY,
  REMOVE_ADDANIMATION_STEP,
  HIDE_INTRO_DELAY,
} from "./config.js";
import { animateSpans, hideElement, removeAndAddClass } from "./helpers.js";

function intro() {
  const intro = document.querySelector(".intro");
  const logoSpan = document.querySelectorAll(".logo-span");

  const setIntroAnimation = function () {
    setTimeout(() => {
      animateSpans(logoSpan, INITIAL_ANIMATION_STEP);
      removeAndAddClass(
        logoSpan,
        REMOVE_ADDANIMATION_DELAY,
        REMOVE_ADDANIMATION_STEP
      );
      hideElement(intro, HIDE_INTRO_DELAY);
    });
  };
  window.addEventListener("DOMContentLoaded", setIntroAnimation);
}
export default intro;
