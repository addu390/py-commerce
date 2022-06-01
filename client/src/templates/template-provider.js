import { createContext } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const TemplateContext = createContext({});

const TemplateProvider = ({ children }) => {
  const theme = createTheme({
    overrides: {
      MuiDialog: {
        paperWidthSm: {
          width: "50%",
          overflowY: "auto",
        }
      },
      MuiDialogContent: {
        root: {
          padding: 0,
          '&:first-child': {
            paddingTop: 0,
          }
        },
      },
    },
  });
  return (
    <TemplateContext.Provider value={{}}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;
