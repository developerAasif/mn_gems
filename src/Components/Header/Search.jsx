import { useState, useEffect } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputBase, List, ListItem, Box, styled } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'; // hooks
import { getProducts as listProducts, searchProducts } from '../../redux/actions/productActions';
import { Link } from 'react-router-dom';

// const SearchContainer = styled(Box)`
//   border-radius: 2px;
//   margin-left: 10%;
//   width: 38%;
//   background-color: #fff;
//   display: flex;
// `;

const SearchContainer = styled(Box)(({ theme }) => ({
  borderRadius: '2px',
  marginLeft: '10%',
  width: '22%',
  backgroundColor: '#fff',
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
  overflow: scroll;
    height: 70vh;
`;


const Image = styled('img')(({ theme }) => ({
  width: '70px',
  height: '70px',
  borderRadius: '100%',
  [theme.breakpoints.down('sm')]: {
    objectFit: 'cover',
    height: 180
  }
}));
const ListBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  // justifyContent:'center',
  alignItems: 'center',
  // height: '70px',
  // borderRadius:'100%',
  '& > *': {
    marginLeft: '10px',
  },
  [theme.breakpoints.down('sm')]: {
    objectFit: 'cover',
    height: 180
  }
}));


const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const Search = () => {
  const [text, setText] = useState();
  const [open, setOpen] = useState(true)

  const getText = (text) => {
    setText(text);
    setOpen(false)
  }

  const products = useSelector(state => state?.search?.search);

  const dispatch = useDispatch();

  useEffect(() => {
    var data = {
      "search_type": "product",
      "query": text
    }
    dispatch(searchProducts(data))
  }, [text])

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => getText(e.target.value)}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      {
        text &&
        <ListWrapper hidden={open}>
          {
            products.filter(product => product?.name.toLowerCase().includes(text.toLowerCase())).map(product => (
              <ListItem >
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: 'none', color: 'inherit', width: '100%', boxShadow: '2px 2px 5px gray', padding: 10 }}
                  onClick={() => setOpen(true)}
                >
                  <ListBox>
                    <Image src={product?.product_images[0]?.image} alt="search" id={product?.id} key={product?.id} />
                    <span> {product?.name}</span>
                    <span style={{ color: 'green' }}> ${product?.price}</span>
                  </ListBox>
                </Link>
              </ListItem>
            ))
          }
        </ListWrapper>
      }

    </SearchContainer>
  )
}

export default Search;