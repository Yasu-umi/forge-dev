import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  selectorRoot: {
    minWidth: theme.spacing(15),
    // color: theme.palette.primary.contrastText,
  },
  selectorIcon: {
    // color: theme.palette.primary.contrastText,
  },
  selectorWrapperRoot: {
    "& .MuiInput-underline:before": {
      // borderBottomColor: theme.palette.primary.contrastText,
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      // borderBottomColor: theme.palette.primary.contrastText,
    },
    "& .MuiInput-underline:after": {
      // borderBottomColor: theme.palette.primary.contrastText,
    },
  },
}));
