import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    fontFamily: "Roboto",
    palette: {
        primary: {
            main: "#17A436"
        },
        secondary: {
            main: "#E5DB3F"
        },
        // type: 'dark',
    },
    // typography: {
    //     fontFamily: "",
    // }
})

const Theme = props => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default Theme;
