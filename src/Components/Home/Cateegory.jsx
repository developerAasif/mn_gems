

import { Typography, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '55px 130px 0 130px !important',
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
        margin: '5px !important',
    }
}))


const Image = styled(Box)(({ theme }) => ({
 
    [theme.breakpoints.down('lg')]: {
        margin:'0 30px'
    },
    [theme.breakpoints.down('sm')]: {
        margin:'0 12px',
    }
}))
const Container = styled(Box)(({ theme }) => ({
    padding: '12px 8px',
    textAlign: 'center',
    cursor:'pointer',
    [theme.breakpoints.down('lg')]: {
        margin:'0 30px'
    },
    [theme.breakpoints.down('sm')]: {
        margin:'0 0px',
    }
}))

// const Container = styled(Box)`
//     padding: 12px 8px;
//     text-align: center;
// `

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;



const Cateegory = ({ categories }) => {

    const navigate = useNavigate()
    const viewAll = (item) => async() => {
        navigate('/view-all',{state:{path:'category',id:item.id}})
    }
    // console.log('categories-->>>>',categories);
    return (
        <Component>
            {
                categories && categories?.length > 0 && categories.map((item, i) => (
                    <Container key={i} onClick={viewAll(item)}>
                        <Image>
                        <img  src={item?.image} style={{ width: 64, height: 64, borderRadius:'100%',  border:'5px solid white', boxShadow:'3px 2px 8px red'  }} />
                        </Image>
                        <Text>{item?.title}</Text>
                    </Container>
                ))
            }
        </Component>
    )
}

export default Cateegory;