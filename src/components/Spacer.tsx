import clsx from "clsx";
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
    bottom: {
        height: theme.spacing(1)
    },
    spacer: {
        margin: theme.spacing(1)
    }
}));


export function Spacer({ padBottom = false }: { padBottom?: boolean }) {
    const { classes } = useStyles();

    return <div className={clsx(classes.spacer, padBottom && classes.bottom)} />
}