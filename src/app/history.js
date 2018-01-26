import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux';
import store from "./store";

const history = syncHistoryWithStore(createHashHistory(), store);

export default history;