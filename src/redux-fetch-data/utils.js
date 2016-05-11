import { doneFetching } from './module';

/**
 *
 * @param components
 * @param params
 * @param store
 * @returns {Promise[]}
 */
export function grabPromises(components, params, store) {
  return components
    .filter(component => component.fetchData instanceof Function)
    .map(component => component.fetchData(store, params));
}

/**
 *
 * @param components
 * @param params
 * @param store
 * @returns {Promise}
 */
export function fetchDataOnServer({ components, params }, store) {
  return Promise.all(grabPromises(components, params, store))
    .then(() => {
      store.dispatch(doneFetching());
    });
}
