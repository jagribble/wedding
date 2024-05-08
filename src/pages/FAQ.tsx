import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, Drawer, Hidden, Icon, IconButton, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
import 'leaflet/dist/leaflet.css';


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
        title: 'What is the dress code?',
        body: `For our wedding, we kindly ask that men wear lounge suits, and women opt for outfits that are similarly formal.`
    },
    {
        title: 'What are the local taxi companies?',
        body: `To avoid issues on the day we suggest you book your taxi in advance.

> Uber has limited availability around Highfield Park so we suggest to book with one of the companies below.

Local taxi companies:
- [Star Taxis Hart](https://www.startaxishart.co.uk/) - (01252 216 455)
- [Hart Taxis](https://harttaxis.com/) - (01252 616149)
- [Station Taxi Hook](https://stationtaxihook.co.uk) - (01256 767676)
- [Loddon Cars](https://www.loddoncars.com/) - (0118 932 1321)
        `
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
`,
        other: (
            <Map />
        )
}, {
        title: 'Photos/Social Media',
        body: `Like most weddings we have two photographers that will be taking photos throughout the day. Of course we would also love to see your photos! We just ask that these are taken on your phone, our photographer will be getting lots of professional photos.
> We kindly ask that people do not take photos during the cermony. We would like for people to be there in the moment with us. 

We will be setting up a way for you to share your photos with us, so watch this space.

> Please do not post any photos on social media until the day after the wedding. 

    `
    }, {
    title: `I have another question that isn't on here`,
        body: 'If you have any other questions please email Emma & Jules via [help@emmaandjules.info](mailto:help@emmaandjules.info) OR call/text Jules on **07507 813132**',
}];

const icon = (window.L as any).icon({
    iconUrl: './favicon.ico',
    iconSize: [20, 20], // size of the icon
    iconAnchor: [20, 10]
});

const hotelIcon = (window.L as any).icon({
    iconUrl: 'https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/hotel/default/24px.svg',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 0]
});

const hotels = [
    {
        latlng: [51.334724, -0.960225],
        name: 'The New Inn at Heckfield',
        desc: 'The New Inn at Heckfield, Odiham Road, Heckfield, Hook, Hampshire, RG27 0LE (0.7 Miles)',
    }, {
        latlng: [51.337221, -0.999419],
        name: 'The Wellington Arms',
        desc: 'The Wellington Arms, Basingstoke Road, Stratfield Turgis, Hampshire, RG27 0AS (1.6 Miles)',
    },
    {
        latlng: [51.287539, -0.951010],
        name: 'Hook House Hotel',
        desc: 'Hook House Hotel, London Road, Hook, Hampshire RG27 9EQ (4.9 Miles)',
    },
    {
        latlng: [51.350460, -0.889972],
        name: 'Warbrook House',
        desc: 'Warbrook House Heritage Hotel, The Street, Eversley, Hampshire, RG27 0PL (5.4 Miles)',
    },
    {
        latlng: [51.274278, -0.982569],
        name: 'Basingstoke Country Hotel',
        desc: 'Basingstoke Country Hotel, Scures Hill, Basingstoke, RG27 9JS (6.2 Miles)',
    },
    {
        latlng: [51.399242, -1.018483],
        name: 'Premier Inn - Reading South (Grazeley Green)',
        desc: 'Premier Inn - Reading South (Grazeley Green), Goring Lane, Reading, Berkshire, RG7 1LS (7.1 Miles)',
    }
]

function Map() {

    return (
        <>
            <div >
                <MapContainer center={[51.338721, -0.964584]} zoom={13} scrollWheelZoom={false} style={{ minHeight: 500 }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.338721, -0.964584]} icon={icon} />
                    {
                        hotels.map(hotel => (
                            <Marker key={hotel.name} position={hotel.latlng as [number, number]} icon={hotelIcon}>
                                <Popup>
                                    {hotel.desc}
                                </Popup>
                            </Marker>
                        ))
                    }
                </MapContainer>
            </div>

        </>
    )
}
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
                        >{faq.title}
                        </AccordionSummary>
                        <AccordionDetails>
                            <ReactMarkdown className={classes.body} children={faq.body} components={{ blockquote: Blockquote }} />
                            {faq.other}
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