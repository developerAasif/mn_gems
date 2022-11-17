

import { Button, Divider, Box, Typography, styled } from '@mui/material';

import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Countdown from 'react-countdown';
import { Link, useNavigate } from 'react-router-dom';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1.5,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`

const DealText = styled(Typography)(({ theme }) => ({
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '32px',
    marginRight: '25px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '15px',
        fontWeight: 600,
    }
}));



const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const ViewAllButton = styled(Button)(({ theme }) => ({
    marginLeft: 'auto',
    backgroundColor: '#2874f0',
    borderRadius: '2px',
    fontSize: '13px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '10px',
    }
}));


const Image = styled('img')(({ theme }) => ({
    width: 150,
    height: 150,
    borderRadius: '100%',
    // border:'2px solid white',
    boxShadow: '15px 15px 20px  black',
    [theme.breakpoints.down('sm')]: {
        width: 90,
        height: 90,
        boxShadow: '10px 10px 20px  black',
    }

}));


const Text = styled(Box)(({ theme }) => ({
    fontSize: '14px',
    marginTop: '5px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
        fontWeight:900
    }
}));

const CardBox = styled(Box)(({ theme }) => ({
    padding: '25px 15px',
    margin: '0 10px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
        padding: '10px 0px',
        margin: '0px 0px',
    }
}));

const MultiSlide = ({ data, timer, title }) => {


    const navigate = useNavigate()

    const viewAll = () =>{
        navigate('/view-all',{state:{path:title}})
    }

    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {/* {
                    timer && <Timer>
                                <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                                <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Timer>
                } */}
                <ViewAllButton variant="contained" color="primary" onClick={viewAll}>View All</ViewAllButton>
            </Deal>
            <Divider />
            <Carousel
                swipeable={true}
                draggable={true}
                responsive={responsive}
                centerMode={true}
                infinite={false}
                autoPlay={true}
                autoPlaySpeed={10000}
                keyBoardControl={true}
                showDots={false}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    data.map((item, i) => (
                        <Link to={`product/${item?.id}`} style={{ textDecoration: 'none' }} key={i}>
                            <CardBox>
                                <Image src={item?.images[0]?.image} />
                                <Text style={{ fontWeight: 600, color: '#212121' }}>{item?.name}</Text>
                                <Text style={{ color: 'green' }}>{item?.price}</Text>
                                <Text style={{ color: '#212121', opacity: '.6' }}>{item?.size}</Text>
                            </CardBox>
                        </Link>
                    ))
                }
            </Carousel>
        </Component>
    )
}

const Slide = (props) => {
    return (
        <>
            {
                props.multi === true && <MultiSlide {...props} />
            }
        </>
    )
}

export default Slide;