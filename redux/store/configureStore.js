import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import reducer from "../reducers";

const configureStore = () => {
  const store = createStore(reducer);
  return store;
};

// serverside일때 redux store와 client side일때 redux store를 합쳐준다.
// getInitialprops, getServerSideProps에서 store에 접근하기 위해 필요하다.
const wrapper = createWrapper(configureStore);
export default wrapper;
