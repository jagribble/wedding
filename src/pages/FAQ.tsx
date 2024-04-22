import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Drawer, Hidden, Icon, IconButton, LinearProgress, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import clsx from "clsx";
import RSVPIcon from '@mui/icons-material/Rsvp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMapReact from 'google-map-react';
import ReactMarkdown from "react-markdown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20

const useStyles = makeStyles()((theme) => ({
    body: {
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
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: `calc(64px + ${theme.spacing(1)})`,
        height: 'calc(100vh - 64px)',
        maxWidth: 1582
    }
}));

const faqs = [{
    title: 'Where is Highfield Park?',
    body: 'Highfield Park is a country manor house in Hampshire. The address is Church Lane, Heckfield, Nr. Hook, Hampshire, RG27 0LG'
}, {
    title: 'What is the time of the cermony?',
    body: 'The time of the cermony is currently 14:00. This is subject to change but will be confirmed on invatations that will be sent out nearer the time.'
}, {
    title: 'Can I have a plus one?',
    body: 'Due to the cost and space we are limitting the number of guests. The names on the envelopes of the "Save the Dates" and Invatations are those invited. If you feel we have missed someone out please do contact us ASAP.'
}, {
    title: 'Do you have a registry?',
    body: `Having you at our wedding is all we want, but if you do want to give us a gift you can contribute to our [honeymoon fund here](/honeymoon-fund). Thank you!`
}, {
    title: 'Where can I stay?',
    body: `There are rooms at Highfield Park for the night of the wedding. The main house has been allocated already to those who need accessible rooms and close family. However there are two other buildings called Fir Tree Court & Wellington Lodge which have available rooms. These can be booked by calling **01189 326369** and quoting our names which will get you a reduced rate.

> We kindly ask that guests stay elsewhere the night before the wedding if required.

### Other Hotels    
- [The New Inn at Heckfield](https://newinnheckfield.com/) Odiham Road, Heckfield, Hook, Hampshire, RG27 0LE (0.7 Miles)
- [The Wellington Arms](https://www.wellingtonarmshampshire.co.uk/) Basingstoke Road, Stratfield Turgis, Hampshire, RG27 0AS (1.6 Miles)
- [Hook House Hotel](https://www.hookhousehotel.co.uk/) London Road, Hook, Hampshire RG27 9EQ (4.9 Miles)
- [Warbrook House](https://www.warbrookhouse.com/) Warbrook House Heritage Hotel, The Street, Eversley, Hampshire, RG27 0PL (5.4 Miles)
- [Basingstoke Country Hotel](https://www.britanniahotels.com/hotels/basingstoke-country-hotel) Basingstoke Country Hotel, Scures Hill, Basingstoke, RG27 9JS (6.2 Miles)
- [Premier Inn - Reading South (Grazeley Green)](https://www.premierinn.com/gb/en/hotels/england/berkshire/reading/reading-south-grazeley-green.html?cid=GLBC_REAOLD) Goring Lane, Reading, Berkshire, RG7 1LS (7.1 Miles)
`
}, {
    title: `I have another question that isn't on here`,
    body: 'If you have any other questions please email Emma & Jules via [help@emmaandjules.info](mailto:help@emmaandjules.info) OR call/text Jules on **07507 813132**'
}];


function ImageIcon({ }: { lat: number, lng: number }) {
    return <img src="/favicon.ico" />
}

const Blockquote = ({ ...props }) => {
    return <Alert severity="info" icon={<InfoOutlinedIcon style={{ margin: 'auto 0', marginRight: 16 }} />} sx={{ fontFamily: 'system-ui' }}>{props.children}</Alert>;
};

export default function FAQ() {
    const { classes } = useStyles();
    return (
        <>
            <div />
            <div className={classes.faqs}>
                {faqs.map(faq => (
                    <Accordion key={faq.title} sx={{ fontFamily: 'system-ui' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >{faq.title}</AccordionSummary>
                        <AccordionDetails>
                            <ReactMarkdown className={classes.body} children={faq.body} components={{ blockquote: Blockquote }} />
                        </AccordionDetails>
                    </Accordion>
                ))}
                {/* <div style={{ height: 400, width: '100%', zIndex: 10000 }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyBMAsSPR2ID4frfa23xy1Smya4WmuYBjKo" }}
                        defaultCenter={{ lat: 51.338615, lng: -0.964812 }}
                        defaultZoom={15}
                    >
                        <ImageIcon
                            lat={51.338615}
                            lng={-0.964812}
                        />
                    </GoogleMapReact>
                </div> */}

            </div>



        </>
    )
}