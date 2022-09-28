import { extendTheme } from "@chakra-ui/react";
import { buttonStyles as Button } from "./componentStyles";
import { tabStyles as NavTab } from "./componentStyles";

export const myTheme = extendTheme({
  colors: {
    primary: "#845EC2",
    secondary: "#FF6F91",
    highlight: "#00C9A7",
    warning: "#FFC75F",
    danger: "#C34A36",
  },
  components: {
    Button,
    NavTab,
  },
});
