import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  // user: {},
  /** @type {import('./models/Item.js').Item[]} */
  items: [],
  /** @type {import('./models/Item.js').Item{}} */
  activeItem: {},

})
