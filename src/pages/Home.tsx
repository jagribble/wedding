import { Button, Drawer, Hidden, Icon, IconButton, LinearProgress, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import clsx from "clsx";
import RSVPIcon from '@mui/icons-material/Rsvp';

const calcX = (y: number, ly: number) => -(y - ly - window.innerHeight / 2) / 20
const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20


const useStyles = makeStyles()((theme) => ({
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
    drawer: {
        height: 'calc( 100vh - 123px)',
        borderRadius: '0px 15px',
    }
}));

export default function Home() {
    const { classes } = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={classes.button}>
                <Button size="large" onClick={() => setOpen(o => !o)} variant="contained"><RSVPIcon style={{ fontSize: '4.1875rem' }} /></Button>
            </div>
            <video autoPlay muted loop className={classes.video} playsInline>
                <source src="highfieldpark.mp4" type="video/mp4" />
            </video>
            <div className={classes.splashImage}>
                <Hidden smDown>
                    <div className={clsx(classes.card)}>
                        <img src="./logosquare.jpeg" alt="Picture of Emma and Jules" width="300" height="100%" />
                    </div>
                </Hidden>

                <div className={classes.grid}>
                    <div className={classes.flex}>

                        <div className={classes.splashText}>

                            <Typography variant="h2" color="white">Emma & Jules</Typography>
                            <Typography variant="h4" color="white">10th April 2025</Typography>
                            <Typography variant="h4" color="white">Highfield Park</Typography>
                        </div>
                        <Hidden smUp>
                            <div className={clsx(classes.cardMobile)}>
                                <img src="./logosquare.jpeg" alt="Picture of Emma and Jules" width="100" height="100%" />
                            </div>
                        </Hidden>

                    </div>


                </div>

            </div>
            <Drawer open={open} anchor="bottom" onClose={() => setOpen(false)} PaperProps={{
                sx: {
                    height: 'calc( 100vh - 123px)',
                    borderRadius: '15px 15px 0px 0px',
                }
            }}>
                <iframe style={{ height: '100%' }} src="https://docs.google.com/forms/d/e/1FAIpQLSeld-6Uq-xBN0DrExmWjTM0qh9M_7hKfki635ev7RXQeMaEeA/viewform?embedded=true" frameBorder="0"><LinearProgress /></iframe>
            </Drawer>
        </>
    )
}