import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; 
import DashboardReducer from './reducer/NavigationReducer';
import DashboardChangeReducer from './reducer/DashboardReducer';
import PackageReducer from './reducer/PackagrReducer';
import productReducer from './reducer/ProductReducer';
import printerReducer from './reducer/PrinterReducer';
import categoryReducer from './reducer/CategoryReducer';
import OrderReducer from './reducer/OrderReducer';
import CartReducer from './reducer/CartListReducer';
 
const rootReducer = combineReducers({
 dashboard:DashboardReducer,
 pages:DashboardChangeReducer,
 package:PackageReducer,
 product:productReducer,
 printer:printerReducer,
 category:categoryReducer,
 order:OrderReducer,
 cart:CartReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;