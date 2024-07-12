import { Button, Card, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { Guest, systemUI } from "./ResponseForm";
import { Spacer } from "../components/Spacer";
import { useAuth0 } from "@auth0/auth0-react";

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

export default function CreatePeople() {
    const { classes } = useStyles();
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const [guest, setGuest] = useState<Guest>({ firstName: '', lastName: '', attending: false, dietryRequirments: '', phoneNo: '', email: '' });
    const onChange = useCallback((field: string, value: any) => setGuest({ ...guest, [field]: value }), [guest]);
    const [allGuests, setAllGuests] = useState<Guest[]>([]);
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => allGuests.filter(x => x.firstName.toLowerCase().includes(search.toLowerCase())), [allGuests, search]);
    useEffect(() => {
        if (isAuthenticated) {
            getAllGuests()
        }
    }, [isAuthenticated]);

    const submit = useCallback(async () => {
        await fetch(`https://api.emmaandjules.info/responses/person`, {
            method: 'POST',
            body: JSON.stringify(guest),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setGuest({ firstName: '', lastName: '', attending: false, dietryRequirments: '', phoneNo: '', email: '' });
        getAllGuests();
    }, [guest]);

    const getAllGuests = async () => {
        const res = await fetch(`https://api.emmaandjules.info/responses/guests`);
        const json = await res.json();
        console.log(json);
        setAllGuests(json);
    }

    if (!isAuthenticated) {
        return (
            <>
                <Card className={classes.card} elevation={2}>
                    <Typography sx={systemUI}>You need to login to create People</Typography>
                    <Button variant="contained" sx={{ ...systemUI }} onClick={() => loginWithRedirect()}>Login</Button>
                </Card>
            </>);
    }

    return (
        <>
            <Card className={classes.card} elevation={2}>
                <div style={{ display: "flex", flexDirection: 'column', fontFamily: 'system-ui' }}>
                    <TextField
                        variant="outlined"
                        label="First Name"
                        margin="dense"
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
                        margin="dense"
                        value={guest.lastName}
                        onChange={evt => onChange('lastName', evt.target.value)}
                        inputProps={{ style: systemUI }}
                        InputLabelProps={{ style: systemUI }}
                    />
                    <Button variant="contained" onClick={submit}>Create User</Button>
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
                />
            </Card>

            {filtered.map(x => <Card sx={{ margin: 1 }}><Typography sx={{ ...systemUI, margin: 0.5 }}>{x.firstName}&nbsp;{x.lastName}</Typography></Card>)}
        </>
    );
}