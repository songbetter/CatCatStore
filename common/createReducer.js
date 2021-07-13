// 리듀서 덕스패턴 연습하기
import produce from "immer";

export default function createReducer(initialState, handelrMap) {
  return function(state = initialState, action) {
    return produce(state, draft => {
      const handler = handelrMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    })
  }
}
