import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  auth_token: '',
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Item.js').Item[]} */
  items: [],
  /** @type {import('./models/Item.js').Item{}} */
  activeItem: {},
  /** @type {import('./models/Item.js').Item[]} */
  activeBucketItems: {},
  /** @type {import('./models/Item.js').Item[]} */
  bucketItemsCache: [],

  /** @type {import('./models/Bucket.js/index.js').Bucket[]} */
  buckets: [],
  /** @type {import('./models/Bucket.js/index.js').Bucket{}} */
  activeBucket: {},

  bucketForm: false,
  itemForm: false

})
