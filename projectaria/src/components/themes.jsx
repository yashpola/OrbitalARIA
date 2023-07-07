// mui imports
import { createTheme } from "@mui/material";

export const ariaDesertTheme = createTheme({
  palette: {
    primary: {
      main: "#e9cdcd",
      contrastThreshold: 4.5,
    },
    secondary: {
      main: "#A86868",
      contrastThreshold: 4.5,
    },
    tertiary: {
      main: "black",
    },
    font: {
      main: "black",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#A86868",
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#A86868",
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#DC9A7F",
          }),
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#DC9A7F",
          }),
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            color: "white",
          }),
        }),
      },
    },
  },
});

/*
  darkest: #00204b
  dark: #015B96
  light: #6497B1
  lightest: #rgb(179,205,224)
  */

export const ariaNavyTheme = createTheme({
  palette: {
    primary: {
      main: "#015B96",
      contrastThreshold: 4.5,
    },
    secondary: {
      main: "#015B96",
      contrastThreshold: 4.5,
    },
    tertiary: {
      main: "black",
    },
    font: {
      main: "white",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "rgb(179,205,224)",
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#6497B1",
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#6497B1",
          }),
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "rgb(179,205,224)",
          }),
        }),
      },
    },
  },
});

export const ariaNewsTheme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastThreshold: 4.5,
    },
    secondary: {
      main: "#000",
      contrastThreshold: 4.5,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "white",
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "white",
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#eee",
          }),
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#eee",
          }),
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            color: "black",
          }),
        }),
      },
    },
  },
});

/*
18453B
043301
1B9000
32CD31
178000
71BC78
CCFDCC
*/

export const ariaForestTheme = createTheme({
  palette: {
    primary: {
      main: "#32CD31",
      contrastThreshold: 4.5,
    },
    secondary: {
      main: "#178000",
      contrastThreshold: 4.5,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#CCFDCC",
          }),
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#178000",
          }),
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#178000",
          }),
        }),
      },
    },
    MuiTable: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            backgroundColor: "#CCFDCC",
          }),
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState.orientation = "vertical") && {
            color: "black",
          }),
        }),
      },
    },
  },
});

export const possibleThemes = {
  Desert: ariaDesertTheme,
  Navy: ariaNavyTheme,
  News: ariaNewsTheme,
  Forest: ariaForestTheme,
};

export const buttonColors = {
  Desert: "primary",
  Navy: "primary",
  News: "primary",
  Forest: "primary",
};

export const possibleFontColors = {
  Desert: "black",
  Navy: "white",
  News: "black",
  Forest: "white",
};

export const accordionColoring = {
  NavyLight: "#83b1cf",
  NavyMedium: "#6497B1",
  NavyDark: "#015B96",
  DesertLight: "#DC9A7F",
  DesertMedium: "#a86868",
  DesertDark: "#5B200D",
  NewsLight: "#999999",
  NewsMedium: "#777777",
  NewsDark: "#555555",
  ForestLight: "#71BC78",
  ForestMedium: "#178000",
  ForestDark: "#18453B",
};

export const possibleBackgroundColorsUserProfile = {
  Desert: "#DC9A7F",
  Navy: "#6497B1",
  News: "#EEE",
  Forest: "#178000",
};

export const photoFrameBackgroundColor = {
  Desert: "#B5A197",
  News: "transparent",
  Forest: "#CCFDCC",
};

export const photoFrameBorderColor = {
  Desert: "5px solid #966f33",
  Navy: "5px solid #00204b",
  News: "5px solid black",
  Forest: "5px solid #178000",
};

export const navBarColor = {
  Desert: "#5B200D",
  Navy: "#00204b",
  News: "black",
  Forest: "#043301",
};
