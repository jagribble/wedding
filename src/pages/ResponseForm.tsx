import { makeStyles } from "tss-react/mui";
import 'leaflet/dist/leaflet.css';
import { Button, Card, Checkbox, CircularProgress, Collapse, Fade, FormControlLabel, Grid, Switch, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Spacer } from "../components/Spacer";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles<{ mobile?: boolean }>()((theme, { mobile = false }) => ({
    body: {
        fontFamily: 'system-ui',
    },
    loading: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: 'auto'
    },
    image: {
        backgroundImage: !mobile ? 'url(https://outdoorceremonies.co.uk/wp-content/uploads/2022/01/Sunny-Day-scaled.jpg)' : 'inherit',
        backgroundSize: '270%',
        backgroundPosition: 'right',
        minHeight: '100%'
    },
    responseForm: {
        // backgroundColor: '#ffffff82',
        // backgroundImage: !mobile ? 'url(https://outdoorceremonies.co.uk/wp-content/uploads/2022/01/Sunny-Day-scaled.jpg)' : 'inherit',
        // backgroundImage: 'url(https://cdn0.hitched.co.uk/vendor/5065/3_2/960/jpg/highfield-pa-201602161212401683451047.jpeg)',
        // backgroundImage: 'https://images.trvl-media.com/lodging/2000000/1660000/1659000/1658980/61c17d9a.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fillhttps://cdn0.hitched.co.uk/vendor/5065/3_2/960/jpg/highfield-pa-201602161212401683451047.jpeg',
        position: 'relative',
        margin: 'auto',
        zIndex: 1000,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: 32,
        // backgroundSize: '270%',
        // backgroundPosition: 'right',
        // paddingTop: `calc(64px + ${theme.spacing(1)})`,
        // height: 'calc(100% + 64px)',
        maxWidth: 1582,
        // minHeight: '100%'
    },
    card: {
        padding: theme.spacing(1),
    },
    title: {
        textAlign: 'center'
    }
}));

export interface Guest {
    firstName: string;
    lastName: string;
    dietryRequirments?: string;
    attending: boolean;
    phoneNo: string;
    email?: string;
}

export const systemUI = { fontFamily: 'system-ui' }

function GuestResponse({ guest, setGuest }: { guest: Guest, setGuest(guest: Guest): void }) {
    // const [guestState, setGuest] = useState(guest);
    const { classes } = useStyles({ mobile: false });
    const onChange = useCallback((field: string, value: any) => setGuest({ ...guest, [field]: value }), [guest]);
    return (
        <Card className={classes.card} elevation={2}>
            <div style={{ display: "flex", flexDirection: 'column', fontFamily: 'system-ui' }}>
                <TextField
                    variant="outlined"
                    label="First Name"
                    margin="dense"
                    disabled
                    value={guest.firstName}
                    onChange={evt => onChange('firstName', evt.target.value)}
                    inputProps={{ style: systemUI, }}
                    InputLabelProps={{ style: systemUI }}
                    FormHelperTextProps={{ style: systemUI }}
                    helperText="First and Last name cannot be changed. If either are wrong please contact us so that we can correct it"
                />
                <TextField
                    variant="outlined"
                    label="Last Name"
                    disabled
                    margin="dense"
                    value={guest.lastName}
                    onChange={evt => onChange('lastName', evt.target.value)}
                    inputProps={{ style: systemUI }}
                    InputLabelProps={{ style: systemUI }}
                />

                <FormControlLabel
                    slotProps={{ typography: { style: systemUI } }}
                    label={`Is ${guest.firstName} attending?`}
                    control={<Checkbox checked={guest.attending} onChange={evt => onChange('attending', evt.target.checked)} />}
                />
                <Collapse in={guest.attending}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        rows={2}
                        label="Dietary Requirements"
                        margin="dense"
                        value={guest.dietryRequirments}
                        onChange={evt => onChange('dietryRequirments', evt.target.value)}
                        multiline
                        placeholder="None"
                        inputProps={{ style: systemUI }}
                        InputLabelProps={{ style: systemUI }}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Phone Number"
                        margin="dense"
                        value={guest.phoneNo}
                        onChange={evt => onChange('phoneNo', evt.target.value)}
                        helperText="This will only be used if we need to contact you in case of change of plans or a question about dietry requirements"
                        inputProps={{ style: systemUI }}
                        InputLabelProps={{ style: systemUI }}
                        FormHelperTextProps={{ style: systemUI }}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Email"
                        type="email"
                        margin="dense"
                        value={guest.email}
                        onChange={evt => onChange('email', evt.target.value)}
                        inputProps={{ style: systemUI }}
                        InputLabelProps={{ style: systemUI }}
                        FormHelperTextProps={{ style: systemUI }}
                    />
                </Collapse>
            </div>
        </Card>

    )
}

const jules: Guest = {
    firstName: 'Jules',
    lastName: 'Gribble',
    attending: false,
    phoneNo: ''
}

const emma: Guest = {
    firstName: 'Emma',
    lastName: 'Gribble',
    attending: false,
    phoneNo: ''
}

export interface RSVP {
    code: string;
    people: Guest[];
    finished: boolean;
}

export default function ResponseForm() {
    const { classes } = useStyles({ mobile: window.innerWidth <= 768 });
    const nav = useNavigate();
    const [rsvp, setRsvp] = useState<RSVP>();
    const { id } = useParams<{ id: string }>();

    const fetchRsvp = useCallback(async () => {
        const rsvpRes = await fetch(`https://api.emmaandjules.info/responses/${id}`);
        const res = await rsvpRes.json();
        setRsvp(res);
        console.log(res);
    }, []);

    const submit = useCallback(async () => {
        await fetch(`https://api.emmaandjules.info/responses/${id}`, {
            method: 'POST',
            body: JSON.stringify(rsvp),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        nav('/responded');
    }, [rsvp]);

    useEffect(() => {
        fetchRsvp();
    }, []);

    const setGuest = useCallback((index: number, guest: Guest) => {
        setRsvp(r => {
            if (!!r) {
                const newPeople = [...r.people];
                newPeople[index] = guest;
                return { ...r, people: newPeople }
            }
            return r;
        })
    }, [rsvp]);

    return (
        <>
            <Fade in={!rsvp} timeout={1000}>
                <CircularProgress size={60} color="primary" className={classes.loading} />
            </Fade>
            <Fade in={!!rsvp} timeout={1000}>
                <div className={classes.image}>
                    <div className={classes.responseForm}>
                        {/* <img style={{ position: 'absolute', marginTop: -62, marginLeft: -2, zIndex: -1, }} src="https://images.trvl-media.com/lodging/2000000/1660000/1659000/1658980/61c17d9a.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fillhttps://cdn0.hitched.co.uk/vendor/5065/3_2/960/jpg/highfield-pa-201602161212401683451047.jpeg" /> */}
                        <Grid container>
                            <Grid item sm={6}></Grid>
                            <Grid item sm={6}>
                                <Card className={classes.card}>

                                    <Typography className={classes.title} variant="h3">You have been invited to the wedding of</Typography>
                                    <Typography className={classes.title} variant="h3">Emma & Jules</Typography>
                                    <Typography className={classes.title} variant="h3">Highfield Park | 10th April 2025</Typography>
                                    <Spacer />
                                    <Typography variant="h4">Responding for {rsvp?.people.map(x => x.firstName).join(', ')}</Typography>
                                    {rsvp?.people.map((x, i) => (
                                        <>
                                            <GuestResponse key={x.firstName} guest={x} setGuest={(guest) => setGuest(i, guest)} />
                                            <Spacer />
                                        </>
                                    ))}

                                    <FormControlLabel
                                        slotProps={{ typography: { style: systemUI } }}
                                        label="I confirm that this is correct at time of responding"
                                        control={<Checkbox checked={!!rsvp?.finished} onChange={evt => setRsvp(r => !!r ? { ...r, finished: evt.target.checked } : r)} />}
                                    />
                                    <Button variant="contained" disabled={!rsvp?.finished} onClick={submit} fullWidth sx={systemUI}>Submit</Button>
                                </Card>
                            </Grid>
                        </Grid>
                        <Spacer padBottom />
                    </div>
                </div>

            </Fade>

        </>
    )
}