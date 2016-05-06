/**
 * Creates a deferred promise.
 *
 * @returns {{promise: Promise, resolve: function, reject: function}}
 */
export function defer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
