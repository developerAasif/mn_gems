import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { LOADER } from '../../redux/constants/otherConstant';
import apiPath from '../../utils/apiPath';
import helper from '../../utils/helper';

const StaicCms = () => {
  const {name} = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState('')

  const getData = async() =>{
    try {
      const url = apiPath.staticPage;
      const result  = await helper.api(url, "post", {});
      console.log('get cms response ==>>>',result)
      if(result?.status == 200){
        setData(result?.result || [])
          dispatch({ type: LOADER, payload: false });
      } else{
          dispatch({ type: LOADER, payload: false });
      }
    } catch (error) {
      console.log('err in static page api==>>>>>',error.message)
    }
  }

  const pageName = { 
    "about_us":"About Us",
    "privacy_policy":"Privacy Policy",
    "term_condition":"Terms & Condition",
  }

  const render = (item,i) =>{
    if(item?.slug === name){
      return (
        <div key={i}>
        <h1>{pageName[item.slug]}</h1>
        <p>{item.content}</p>
        </div>
      )
    }
  }
  useEffect(() => {
    dispatch({ type: LOADER, payload: true });
    getData()
  }, [])
  
  return (
    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
      {data && data?.length > 0 ? data?.map(render) : <span>no data found</span> }
    </div>
  )
}

export default StaicCms;