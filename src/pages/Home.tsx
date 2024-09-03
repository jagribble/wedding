import { Box, Button, Drawer, Grid, Hidden, Icon, IconButton, LinearProgress, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from 'react-use-gesture';
import clsx from "clsx";
import RSVPIcon from '@mui/icons-material/Rsvp';

import { useNavigate } from "react-router-dom";

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
        zIndex: 1000
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
        height: 'calc( 100vh - 150px)',
        borderRadius: '0px 15px',
    }
}));

export default function Home() {
    const { classes } = useStyles();
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [open, setOpen] = useState(false);
    const nav = useNavigate()
    const goTo = (path: string) => {
        nav(path);
    }

    const gradient = useMemo(() => smUp ? 'linear-gradient(0deg, rgba(240,205,207,1) 10%, rgba(240,205,207,0.4906556372549019) 39%, rgba(34,34,34,0) 90%)' : 'linear-gradient(0deg, rgb(240, 205, 207) 5%, rgba(240, 205, 207, 0.49) 17%, rgba(34, 34, 34, 0) 95%)', [smUp]);

    return (
        <>
            <Box>
                <img src="highfieldPark.jpg" width="100%" />
                <div style={{ background: gradient, width: '100%', height: 200, marginTop: -206, position: 'relative' }} >
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: 6 }}>
                    <Typography gutterBottom variant="h1">Emma & Jules</Typography>
                    <Typography sx={{}} variant="h3">10th April 2025</Typography>
                    <Typography gutterBottom sx={{}} variant="h3">Highfield Park</Typography>
                    <div style={{ marginTop: 12 }} />

                </div>
                <div style={{ marginLeft: 6, marginRight: 6 }}>
                    <Grid container justifyContent="center" spacing={8}>

                        <Grid item sm={3} xs={12}>
                            <Button size="large" sx={{ color: 'black', borderColor: 'black', width: '100%' }} onClick={() => goTo('/faq')} variant="outlined">FAQ</Button>
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Button size="large" sx={{ color: 'black', borderColor: 'black', width: '100%' }} onClick={() => goTo('/honeymoon-fund')} variant="outlined">Honeymoon Fund</Button>
                        </Grid>
                    </Grid>
                </div>

            </Box >
            {/* <div className={classes.button}>
                <Grid container spacing={1} direction="column" alignItems="center">
                    <Grid item>
                        <Button size="large" onClick={() => setOpen(o => !o)} sx={{ borderRadius: 4, }} variant="contained"><Typography variant="h3"><b>RSVP</b></Typography></Button>
                    </Grid>
                    <Grid item>
                        <Button size="large" onClick={() => goTo('/faq')} sx={{ borderRadius: 4, }} variant="contained"><Typography variant="h3"><b>FAQ</b></Typography></Button>

                    </Grid>
                    <Grid item>
                        <Button size="large" onClick={() => goTo('/wedding-fund')} sx={{ borderRadius: 4, }} variant="contained"><Typography variant="h3"><b>Wedding Fund</b></Typography></Button>

                    </Grid>
                </Grid>
            </div> */}
            {/* <video autoPlay muted loop className={classes.video} playsInline>
                <source src="highfieldpark.mp4" type="video/mp4" />
            </video> */}
            {/* <div className={classes.splashImage}>
                <Hidden smDown>
                    <div className={clsx(classes.card)}>
                        <img src="./logosquare.jpeg" alt="Picture of Emma and Jules" width="300" height="100%" />
                    </div>
                </Hidden>

                <div className={classes.grid}>
                    <div className={classes.flex}>

                        <div className={classes.splashText}>

                            <Typography sx={{}} variant="h2" color="white">Emma & Jules</Typography>
                            <Typography sx={{}} variant="h4" color="white">10th April 2025</Typography>
                            <Typography sx={{}} variant="h4" color="white">Highfield Park</Typography>
                        </div>
                        <Hidden smUp>
                            <div className={clsx(classes.cardMobile)}>
                                <img src="./logosquare.jpeg" alt="Picture of Emma and Jules" width="100" height="100%" />
                            </div>
                        </Hidden>

                    </div>


                </div>

            </div> */}
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