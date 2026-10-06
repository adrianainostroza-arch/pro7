// jsdom no implementa algunas APIs que Vuetify necesita
global.ResizeObserver = class {
  observe () {}
  unobserve () {}
  disconnect () {}
}

window.matchMedia = window.matchMedia || function () {
  return { matches: false, addListener () {}, removeListener () {}, addEventListener () {}, removeEventListener () {} }
}

window.scrollTo = () => {}

global.CSS = global.CSS || { supports: () => false, escape: (s) => s }
