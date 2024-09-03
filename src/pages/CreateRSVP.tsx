import { Button, Card, Checkbox, Dialog, DialogContent, IconButton, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Guest, RSVP, systemUI } from "./ResponseForm";
import { Spacer } from "../components/Spacer";
import { useAuth0 } from "@auth0/auth0-react";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import convertArrayToCSV from 'convert-array-to-csv';

const useStyles = makeStyles()((theme) => ({
    body: {
        fontFamily: 'system-ui',
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

export default function CreateRSVP() {
    const { classes } = useStyles();
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [chosenPeople, setChosePeople] = useState<string[]>([]);
    const [allGuests, setAllGuests] = useState<Guest[]>([]);
    const [allRSVP, setAllRSVP] = useState<RSVP[]>([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const guestsInvited = useMemo(() => allRSVP.reduce((prev, curr) => prev + curr.people.length, 0), [allRSVP]);
    const peopleAttending = useMemo(() => {
        const attending: Guest[] = [];
        allRSVP.forEach(r => {
            if (r.finished) {
                r.people.forEach(x => {
                    if (x.attending) {
                        attending.push(x);
                    }
                })
            }
        });
        return attending;
    }, [allRSVP]);
    const peopleNotAttending = useMemo(() => {
        const attending: Guest[] = [];
        allRSVP.forEach(r => {
            if (r.finished) {
                r.people.forEach(x => {
                    if (!x.attending) {
                        attending.push(x);
                    }
                })
            }
        });
        return attending;
    }, [allRSVP]);
    // const peopleAttending = useMemo(() => allRSVP.reduce((prev, curr) => [...prev, ...(curr.finished ? ...curr.people.reduce((p, c) => p.push(c.attending ? c : []), []) : ...[]))], []), [allRSVP]);
    const filtered = useMemo(() => allRSVP.filter(x => x.people.some(x => x.firstName.toLowerCase().includes(search.toLowerCase()) || x.lastName.toLowerCase().includes(search.toLowerCase()))), [allRSVP, search]);
    useEffect(() => {
        if (isAuthenticated) {
            getAllGuests();
            getAllRSVPS();
        }

    }, [isAuthenticated]);

    const submit = useCallback(async () => {
        await fetch(`https://api.emmaandjules.info/responses`, {
            method: 'POST',
            body: JSON.stringify(chosenPeople),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setChosePeople([]);
        // setGuest({ firstName: '', lastName: '', attending: false, dietryRequirments: '', phoneNo: '', email: '' });
        getAllRSVPS();
    }, [chosenPeople]);

    const getAllRSVPS = async () => {
        const res = await fetch(`https://api.emmaandjules.info/responses`);
        const json = await res.json();
        console.log(json);
        setAllRSVP(json);
    }

    const getAllGuests = async () => {
        const res = await fetch(`https://api.emmaandjules.info/guests`);
        const json = await res.json();
        // console.log(json);   
        setAllGuests(json);
    }

    const download = useCallback(() => {
        const data = convertArrayToCSV(peopleAttending);
        const csvContent = `data:text/csv;charset=utf-8,${data}`;
        console.log(csvContent);
        window.open(csvContent, '_target')
    }, [peopleAttending]);


    useEffect(() => {
        console.log('isAuth', isAuthenticated, user)
    }, [isAuthenticated, user])
    if (!isAuthenticated) {
        return (
            <>
                <Card className={classes.card} elevation={2}>
                    <Typography sx={systemUI}>You need to login to create RSVP's</Typography>
                    <Button variant="contained" sx={{ ...systemUI }} onClick={() => loginWithRedirect()}>Login</Button>
                </Card>
            </>);
    }

    return (
        <>
            <Card className={classes.card} elevation={2}>
                <div style={{ display: "flex", flexDirection: 'column', fontFamily: 'system-ui' }}>
                    <Select
                        value={chosenPeople}
                        label="Choose people to add to RSVP"
                        multiple
                        renderValue={(selected) => selected.join(', ')}
                        onChange={evt => {
                            const { value } = evt.target;

                            setChosePeople(typeof value === 'string' ? value.split(',') : value)
                        }}
                    >
                        {allGuests.map((guest) => (
                            <MenuItem key={`${guest.firstName}${guest.lastName}`} sx={systemUI} value={`${guest.firstName}${guest.lastName}`}>
                                <Checkbox checked={chosenPeople.indexOf(`${guest.firstName}${guest.lastName}`) > -1} />
                                <ListItemText primaryTypographyProps={systemUI} sx={systemUI} primary={`${guest.firstName} ${guest.lastName}`} />
                            </MenuItem>
                        ))}
                    </Select>
                    <Button sx={systemUI} variant="contained" onClick={submit}>Create RSVP</Button>
                </div>
            </Card>
            <Spacer />
            <Card sx={{ padding: 1 }}>
                <TextField
                    value={search}
                    onChange={evt => setSearch(evt.target.value)}
                    fullWidth
                    variant="outlined"
                    label="Search"
                    margin="dense"
                    inputProps={{ style: systemUI, }}
                    InputLabelProps={{ style: systemUI }}
                    FormHelperTextProps={{ style: systemUI }}
                />
            </Card>
            <Typography sx={systemUI}>RSVPs: {allRSVP.length}</Typography>
            <Typography sx={systemUI}>Guests Invited: {guestsInvited}</Typography>
            <Typography sx={systemUI}>Total People: {allGuests.length}</Typography>
            <Typography sx={systemUI}>People Attending: {peopleAttending.length}</Typography>
            <Typography sx={systemUI}>People Not Attending: {peopleNotAttending.length}</Typography>
            <Button variant="contained" sx={systemUI} color="secondary" onClick={() => setOpen(true)}>Show Attendees</Button>
            {filtered.map(x => <Card sx={{ margin: 1 }}><Typography sx={{ ...systemUI, margin: 0.5 }}><b>{x.code}</b>- {x.people.map(c => `${c.firstName} ${c.lastName}`).join(', ')}</Typography></Card>)}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                    <IconButton
                        size="small"
                        onClick={() => download()}
                    >
                        <SaveAltIcon />
                    </IconButton>
                    <Typography>Attending</Typography>
                    {peopleAttending.map(guest => (
                        <Card key={`${guest.firstName}-${guest.lastName}`} sx={{ margin: 1, padding: 1 }}>
                            <Typography sx={systemUI} >{guest.firstName}&nbsp;{guest.lastName}</Typography>
                            <Typography sx={systemUI}>Dietry Requirments: {guest.dietryRequirments}</Typography>
                        </Card>
                    ))}
                    <Typography>Not Attending</Typography>
                    {peopleNotAttending.map(guest => (
                        <Card key={`${guest.firstName}-${guest.lastName}`} sx={{ margin: 1, padding: 1 }}>
                            <Typography sx={systemUI} >{guest.firstName}&nbsp;{guest.lastName}</Typography>
                            <Typography sx={systemUI}>Dietry Requirments: {guest.dietryRequirments}</Typography>
                        </Card>
                    ))}
                </DialogContent>
            </Dialog>
        </>
    );
}