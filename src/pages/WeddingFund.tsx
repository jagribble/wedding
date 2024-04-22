import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardMedia, Collapse, Drawer, Grid, Hidden, Icon, IconButton, InputAdornment, LinearProgress, TextField, Typography, linearProgressClasses, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Markdown from 'react-markdown'
import { makeStyles } from "tss-react/mui";
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import clsx from "clsx";
import RSVPIcon from '@mui/icons-material/Rsvp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMapReact from 'google-map-react';

const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20

const useStyles = makeStyles()((theme) => ({
    description: {
        fontFamily: 'system-ui',

    },
    video: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%'
    },
    splashImage: {
        // background: 'linear-gradient(307deg, #fff, #CBABFA, #E19BDF)',
        // backgroundSize: '400% 400%',
        // height: `100vh`,
        // display: 'flex',
        // '-webkit-animation': 'Gradient 15s ease infinite',
        // '-moz-animation': 'Gradient 15s ease infinite',
        // 'animation': 'Gradient 15s ease infinite',
        position: 'fixed',
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        color: '#f1f1f1',
        width: '100%',
        padding: 20,
    },
    splashText: {
        width: '100%',
        margin: 'auto',
        // paddingLeft: 100
    },
    card: {
        position: 'absolute',
        top: '-80%',
        left: '50%',
        width: 300,
        height: 300,
        background: 'grey',
        borderRadius: 5,
        boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
        transition: 'box-shadow 0.5s, opacity 0.5s',
        willChange: 'transform',
        // border: '10px solid white',
        overflow: 'hidden',
        touchAction: 'none',
    },
    cardMobile: {
        // position: 'absolute',
        // top: '-80%',
        // left: '50%',
        width: 100,
        height: 100,
        background: 'grey',
        borderRadius: 5,
        boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
        transition: 'box-shadow 0.5s, opacity 0.5s',
        willChange: 'transform',
        // border: '10px solid white',
        // overflow: 'hidden',
        // touchAction: 'none',
    },
    grid: {
        // display: 'grid',
        // gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        width: '100%'
    },
    flex: {
        display: 'flex'
    },
    spacer: {
        flex: 1
    },
    button: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 1000,
        marginTop: -50,
        marginLeft: -55.5
    },

    faqs: {
        // backgroundColor: '#ffffff82',
        position: 'relative',
        margin: 'auto',
        zIndex: 1000,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: `calc(32px + ${theme.spacing(1)})`,
        maxWidth: '1582px',
        marginBottom: theme.spacing(1),
        // height: 'calc(100vh - 64px)',

    },
    title: {
        fontFamily: 'system-ui', paddingTop: 18, paddingLeft: 18
    }
}));


function ImageIcon({ }: { lat: number, lng: number }) {
    return <img src="/favicon.ico" />
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const itemUseStyles = makeStyles()({
    description: {
        fontFamily: 'system-ui'
    }
});

interface ItemProps {
    name: string;
    totalPrice: number;
    perDonation?: number;
    currentTotal: number;
    description: string;
    image: string;
}
function Item({ name, totalPrice = 0, currentTotal = 0, image, description, perDonation }: ItemProps) {
    const [amount, setAmount] = useState(totalPrice);

    useEffect(() => {
        if (perDonation) {
            setAmount(perDonation)
        }
    }, [perDonation]);

    const { classes } = itemUseStyles();
    let progress = 0;
    if (totalPrice > 0) {
        progress = (currentTotal / totalPrice) * 100;
    }
    return (
        <Grid item xs={12} sm={4} md={3}>
            <Card>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image}
                />
                <CardContent>
                    <Typography sx={{ fontSize: '1.5rem' }}>{name}</Typography>
                    <Typography variant="caption">£{totalPrice}</Typography>

                    <BorderLinearProgress variant="determinate" value={progress} />
                    <Markdown children={description} className={classes.description} />
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        label="Amount"
                        variant="outlined"
                        margin="dense"
                        InputProps={{ sx: { borderRadius: 15, }, startAdornment: <InputAdornment position="start">£</InputAdornment>, }}
                        value={amount}
                        size="small"
                        sx={{ width: '100%', marginRight: 1 }}
                        type="number"
                        onChange={evt => setAmount(parseFloat(evt.target.value))}
                    />
                    <Button
                        variant="contained"
                        sx={{ borderRadius: 15, fontFamily: 'system-ui' }}
                        onClick={() => {
                            window.location.href = `http://monzo.me/julesanthonygribble/${amount}?d=${name}`;
                        }}
                    >
                        <DoneIcon />
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}


const items: ItemProps[] = [
    {
        name: 'Leaning Tower of Pisa',
        totalPrice: 50,
        perDonation: 25,
        currentTotal: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg/1200px-Italy_-_Pisa_-_Leaning_Tower.jpg',
        description: ''
    },
    {
        name: 'Gelato',
        totalPrice: 10,
        currentTotal: 0,
        image: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/10/gelato-1296x728-header.jpg?w=1155&h=1528',
        description: ``
    },
    {
        name: `Michelangelo's David`,
        totalPrice: 30,
        perDonation: 15,
        currentTotal: 0,
        image: 'https://4.bp.blogspot.com/-embsOkNZcJA/T5Qs4tJfSFI/AAAAAAAAC24/IUND_5xYC4c/s1600/michelangelo_david_head.jpg',
        description: ``
    },
    {
        name: `Santa Maria Del Fiore`,
        totalPrice: 50,
        perDonation: 25,
        currentTotal: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Florence_Duomo_from_Michelangelo_hill.jpg/440px-Florence_Duomo_from_Michelangelo_hill.jpg',
        description: ``
    },
    {
        name: `Colliseum`,
        totalPrice: 30,
        perDonation: 15,
        currentTotal: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/540px-Colosseo_2020.jpg',
        description: ``
    },
    {
        name: `Vatican`,
        totalPrice: 40,
        perDonation: 20,
        currentTotal: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg/2560px-St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg',
        description: ``
    },
    {
        name: `Pizza`,
        totalPrice: 30,
        perDonation: 15,
        currentTotal: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg',
        description: ``
    },
    {
        name: `Cocktails`,
        totalPrice: 20,
        perDonation: 10,
        currentTotal: 0,
        image: 'https://images.squarespace-cdn.com/content/v1/5dd5b5e9f226644911c4d733/4cd7cbd8-9dd8-4646-b6f0-1f438a513e2f/aperol-spritz-cocktail.jpg',
        description: ``
    },
    {
        name: `Day Trip`,
        totalPrice: 100,
        perDonation: 50,
        currentTotal: 0,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/PiazzadelCampoSiena.jpg/500px-PiazzadelCampoSiena.jpg ',
        description: ``
    },
    {
        name: `Other Amount`,
        totalPrice: 0,
        perDonation: 1,
        currentTotal: 0,
        image: 'https://deih43ym53wif.cloudfront.net/large_florence-italy-shutterstock_592336670_ccaf07e157.jpeg',
        description: ``
    }
]

const desc = `
Having you at our wedding is all we ask for, but if you wish to give us a gift we would really appreciate a contribution towards our honeymoon. 
We are planning a trip to Italy, visiting Pisa, Florence and Rome. We have selected a few of the activities we would like to do whilst we are away and would be very grateful for any help towards them.
`;

const issues = `
If you are having issues using the buttons below either contact us or use our bank details. 
                        
- **Name**: Jules Gribble **OR** Emma Booth
- **Sort Code:** 04-00-03
- **Account No.:** 67200533
`;

export default function WeddingFund() {
    const { classes } = useStyles();
    const [showBankDetials, setShowBankDetails] = useState(false);
    return (
        <>
            <div className={classes.title}>
                <Typography variant="h2">
                    Honeymoon Fund
                </Typography>
                <Box sx={{ maxWidth: { xs: '100%', sm: 800 } }}>
                    <Markdown className={classes.description} children={desc} />
                </Box>
                <Button onClick={() => setShowBankDetails(x => !x)} sx={{ fontFamily: 'system-ui' }} color="info">
                    Having issues? {showBankDetials ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Button>
                <Collapse in={showBankDetials}>
                    <Markdown className={classes.description} children={issues} />
                </Collapse>
            </div>

            <div className={classes.faqs}>
                <Grid container sx={{ width: '100%' }} spacing={2}>
                    {items.map(item => (
                        <Item
                            key={item.name}
                            name={item.name}
                            totalPrice={item.totalPrice}
                            currentTotal={item.currentTotal}
                            image={item.image}
                            description={item.description}
                            perDonation={item.perDonation}
                        />
                    ))}

                </Grid>
            </div>

            <div style={{ padding: 16 }}>

            </div>
        </>
    )
}