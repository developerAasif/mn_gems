
import { Box, Typography, Table, TableBody, TableRow, TableCell, styled } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';
import StarRatings from 'react-star-ratings';

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
    }
`

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;

const ProductDetail = ({ product }) => {
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));

    return (
        <>

            <Table>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ${product?.delivery_charge} </TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Stock</TableCell>
                        <TableCell>{product?.stock}</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Size</TableCell>
                        <TableCell>{product?.size}</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Ratings</TableCell>
                        <TableCell style={{ color: '#878787' }}>
                        <StarRatings
                            starDimension="20px"
                            starSpacing="5px"
                            rating={Number(product?.avg_rating) || 0}
                            starRatedColor="blue"
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
                        <span style={{marginLeft:5}}>({product?.avg_rating})</span>
                        </TableCell>

                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                        <TableCell>No Warranty</TableCell>
                    </ColumnText>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <span style={{ color: '#2874f0' }}>SuperComNet</span>
                            <Typography>GST invoice available</Typography>
                        </TableCell>
                    </ColumnText>
                    {/* <TableRow>
                        <TableCell colSpan={2}>
                            <img src={adURL} style={{ width: 390 }} />
                        </TableCell>
                    </TableRow> */}
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                    </ColumnText>
                </TableBody>
            </Table>
        </>
    )
}

export default ProductDetail;