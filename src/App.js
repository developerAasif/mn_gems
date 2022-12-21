import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material'

// project imports
import { Home, NotFound } from './Components/default';

//components
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Header from './Components/Header/Header';
import DetailView from './Components/ItemDetails/DetailView';
import TemplateProvider from './templates/TemplateProvider';
import ContextProvider from './context/ContextProvider';
import Cart from './Components/Cart/Cart';
import ViewAll from './Components/products/ViewAll';
import toast, { Toaster } from 'react-hot-toast';
import Shipping from './Components/checkout/Shipping';
import ConfirmOrder from './Components/checkout/ConfirmOrder';
import Payment from './Components/checkout/Payment';
import OrderSuccess from './Components/checkout/OrderSuccess';
import MyOrders from './Components/myOrders/MyOrders';
import OrderDetails from './Components/myOrders/OrderDetails';
import Session from './utils/session';
import { getCart } from './redux/actions/cartActions';
import ProtectedRoute from './firebase/ProtectedRoute';
import OrderTrack from './Components/myOrders/OrderTrack';



function App() {
  const dispatch = useDispatch()

  useEffect(() => {

    const user = Session.getSession('auth');
    if (user) {
      var user_id = user?.id
      dispatch(getCart(user_id))
    }
  }, [])




  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{ marginTop: 54 }}>

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/view-all' element={<ViewAll />} />
              <Route path='/cart' element={<Cart />} />

              {/* <Route path='/' element={<ProtectedRoute />} > */}

              <Route path='/shipping' element={<ProtectedRoute Children={Shipping} />} />
              <Route path='/order/confirm' element={<ProtectedRoute Children={ConfirmOrder} />} />
              <Route path='/process/payment' element={<ProtectedRoute Children={Payment} />} />
              <Route path='/order/success' element={<ProtectedRoute Children={OrderSuccess} />} />
              <Route path='/orders' element={<ProtectedRoute Children={MyOrders} />} />
              <Route path='/order/details' element={<ProtectedRoute Children={OrderDetails} />} />
              <Route path='/order/track' element={<ProtectedRoute Children={OrderTrack} />} />
              <Route path='/product/:id' element={<ProtectedRoute Children={DetailView} />} />

              {/* </ Route> */}

              <Route path='*' element={<Home />} />
            </Routes>

          </Box>
        </BrowserRouter>
      </ContextProvider>
      <Toaster
        position="top-center"
      />
    </TemplateProvider>
  );
}

export default App;
