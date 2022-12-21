import "./Shipping.css";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import Person from '@material-ui/icons/Person';
import LocationCityIcon from "@material-ui/icons/LocationCity";
import { Country, State } from "country-state-city";
import toast, { Toaster } from 'react-hot-toast';

import Loader from '../Loader/Loader';

import { saveShippingInfo } from "../../redux/actions/cartActions";
import MetaData from "./MetaData";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import CheckoutSteps from "./CheckoutSteps";
import { LOADER } from "../../redux/constants/otherConstant";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader } = useSelector(state => state?.loader);
  const { shippingInfo } = useSelector((state) => state.cart);

  const [name, setName] = useState(shippingInfo?.name);
  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(saveShippingInfo({ name, address, city, state, country, pinCode, phoneNo }));
    navigate("/order/confirm");
  };

  useEffect(() => {
    dispatch({ type: LOADER, payload: true });
    setTimeout(() => {
      dispatch({ type: LOADER, payload: false });
    }, 200);
  }, []);



  return (

    <>
      {
        loader ? (<Loader />) : (
          <Fragment>
            {/* <h1>shippingg</h1> */}
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
              <div className="shippingBox">
                <h2 className="shippingHeading">Shipping Details</h2>

                <form
                  className="shippingForm"
                  encType="multipart/form-data"
                  onSubmit={shippingSubmit}
                >

                  <div>
                    <Person />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <HomeIcon />
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>


                  <div>
                    <LocationCityIcon />
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <PinDropIcon />
                    <input
                      type="number"
                      placeholder="Pin Code"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div>

                  <div>
                    <PhoneIcon />
                    <input
                      type="number"
                      placeholder="Phone Number"
                      required
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      size="10"
                    />
                  </div>

                  <div>
                    <PublicIcon />

                    <select
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {country && (
                    <div>
                      <TransferWithinAStationIcon />

                      <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <input
                    type="submit"
                    value="Continue"
                    className="shippingBtn"
                    disabled={state ? false : true}
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )
      }
    </>

  );
};

export default Shipping;


