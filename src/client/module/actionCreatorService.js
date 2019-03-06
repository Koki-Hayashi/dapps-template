// @flow

export type _plainActionObj = {
  type: any,
  model: any,
};

/*
 * variable "action" expects to be an Symbol object declared in each action creators.
 * Since flowtype doesn't support es6 Symbol, it is typed as any.
 */
export default function createAction(action: any, model: any): _plainActionObj {
  return {
    type: action,
    model,
  };
}
