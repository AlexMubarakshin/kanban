import { createMuiTheme } from "@material-ui/core";

export const defaultTheme = createMuiTheme({
    overrides: {
        MuiCard: {
            root: {
                boxShadow: "0 7px 15px rgba(0, 9, 128, 0.05), 0 12px 28px rgba(0, 9, 128, 0.075)"
            }
        }
    },
    typography: {
        useNextVariants: true,
    },
});