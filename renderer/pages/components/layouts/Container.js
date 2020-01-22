import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => 
createStyles({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        
    },
    left: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%'

    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
})
)

const Container = (props) => {
    const classes = useStyle({})

if(props.justify === 'center')
        return(
            <div className={classes.center} style={props.style}>
                {props.children}
            </div>
        )
else if(props.justify === 'left')
        return(
            <div className={classes.left} style={props.style}>
                {props.children}
            </div>
        )
else if(props.justify === 'right')
        return(
            <div className={classes.raight} style={props.style}>
                {props.children}
            </div>
        )
    }

export default Container;