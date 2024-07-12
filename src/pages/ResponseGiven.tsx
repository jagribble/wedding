import { makeStyles } from "tss-react/mui";
import 'leaflet/dist/leaflet.css';
import { Button, Card, Checkbox, Collapse, Fade, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Spacer } from "../components/Spacer";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles<{ mobile?: boolean }>()((theme, { mobile = false }) => ({
    body: {
        fontFamily: 'system-ui',
    },
    image: {
        backgroundImage: !mobile ? 'url(https://outdoorceremonies.co.uk/wp-content/uploads/2022/01/Sunny-Day-scaled.jpg)' : 'inherit',
        backgroundSize: '270%',
        backgroundPosition: 'right',
        minHeight: '100%'
    },
    responseForm: {
        // backgroundColor: '#ffffff82',
        position: 'relative',
        margin: 'auto',
        zIndex: 1000,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: `calc(64px + ${theme.spacing(1)})`,
        height: 'calc(100vh - 64px)',
        maxWidth: 1582
    },
    card: {
        padding: theme.spacing(1),
    },
    title: {
        textAlign: 'center'
    }
}));

interface Guest {
    firstName: string;
    lastName: string;
    dietryRequirments?: string;
    attending: boolean;
    phoneNo: string;
    email?: string;
}

const systemUI = { fontFamily: 'system-ui' }


export default function ResponseGiven() {
    const { classes } = useStyles({ mobile: window.innerWidth <= 768 });
    const goTo = useNavigate();
    return (
        <Fade in={true} timeout={1000}>
            <div className={classes.image}>
                <div className={classes.responseForm}>
                    {/* <img style={{ position: 'absolute', marginTop: -62, marginLeft: -2, zIndex: -1, }} src="https://images.trvl-media.com/lodging/2000000/1660000/1659000/1658980/61c17d9a.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fillhttps://cdn0.hitched.co.uk/vendor/5065/3_2/960/jpg/highfield-pa-201602161212401683451047.jpeg" /> */}

                    <Card className={classes.card} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <Typography className={classes.title} variant="h3">Thank you for your RSVP</Typography>
                        <Spacer />
                        <Typography sx={systemUI}>
                            We look forward to sharing our special day with you!
                        </Typography>
                        <Typography sx={systemUI}>
                            Please read our FAQs for more details.
                        </Typography>
                        <Spacer />
                        <Typography sx={systemUI}>
                            If you have any questions please contact us on <a href="mailto:info@emmaandjules.info">info@emmaandjules.info</a> or give us a call.
                        </Typography>
                        <Spacer />
                        {/* <Button size="large" sx={{ color: 'black', borderColor: 'black', width: '100%' }} onClick={() => goTo('/faq')} variant="outlined">FAQ</Button>
                        <Spacer />
                        <Button size="large" sx={{ color: 'black', borderColor: 'black', width: '100%' }} onClick={() => goTo('/honeymoon-fund')} variant="outlined">Honeymoon Fund</Button> */}
                        <Grid container justifyContent="center" spacing={8}>
                            <Grid item sm={3} xs={12}>
                                <Button size="large" sx={{ color: 'black', borderColor: 'black', width: '100%' }} onClick={() => goTo('/faq')} variant="outlined">FAQ</Button>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                                <Button size="large" sx={{ color: 'black', borderColor: 'black', width: '100%' }} onClick={() => goTo('/honeymoon-fund')} variant="outlined">Honeymoon Fund</Button>
                            </Grid>
                        </Grid>

                    </Card>

                    <Spacer padBottom />
                </div>
            </div>

        </Fade>

    )
}