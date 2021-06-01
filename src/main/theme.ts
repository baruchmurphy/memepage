import { createMuiTheme } from "@material-ui/core";

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffcc00'
        },
        secondary: {
            main: '#000000'
        }
    },
    typography: {
        fontFamily: [
            'proximanova', 
            'arial', 
            'tahoma',
            'sans-serif'
        ].join(',')
    }
})

export default Theme