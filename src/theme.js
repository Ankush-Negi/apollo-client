import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Comic Sans MS',
      'cursive',
      'sans-serif',
    ].join(','),
    htmlFontSize: 15,
  },
});
