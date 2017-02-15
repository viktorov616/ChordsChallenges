export default function debounce(func, wait = 20, immediate = true) {
  let timeout;

  return function (...args) {
    const context = this;

    const callNow = immediate && !timeout;

    function later() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}
