import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material'

// project imports
import { Home, NotFound } from './Components/default';

//components
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

function App() {

  
  return (
    <TemplateProvider>
      <ContextProvider>
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route path= '/view-all' element={<ViewAll />} />
              <Route path= '/cart' element={<Cart />} />
              <Route path= '/shipping' element={<Shipping />} />
              <Route path= '/order/confirm' element={<ConfirmOrder />} />
              <Route path= '/process/payment' element={<Payment />} />
              <Route path= '/order/success' element={<OrderSuccess />} />
              <Route path= '/orders' element={<MyOrders />} />
              <Route path= '/order/:id' element={<OrderDetails />} />
              <Route path= '/product/:id' element={<DetailView />} />
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
