export function bindDomInputAction (actionCreator) {
  return function createAction ({target: {value, validity: {badInput = false} = {}}}) {
    return actionCreator(value, badInput)
  }
}
