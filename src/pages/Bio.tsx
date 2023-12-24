import { Card, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
    container: {
      display: 'flex',
    },
    img: {
        borderRadius: '50%'
    },
    card: {
        margin: `${theme.spacing(2)} ${theme.spacing(4)}`, 
        padding: theme.spacing(4),
        width: '100%',
        display: 'grid',
        gridTemplate: '1fr / 32% auto'
    }
  }));

export default function Bio() {
    const { classes } = useStyles();
    return (
        <div className={classes.container}>
         <Card className={classes.card}>
             <img src="./logo.jpeg" className={classes.img}/>
             <div>
                 <Typography variant="h5">About me</Typography>
                 <Typography>Test</Typography>

                 <Typography variant="h5">Experience</Typography>
                 <Typography><b>Toca.io - Head of UI</b></Typography>
                 <Typography>
                    November 2020 - Present
                 </Typography>
             </div>
         </Card>
        </div>
    )
}