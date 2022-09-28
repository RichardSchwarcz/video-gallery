import { mode } from "@chakra-ui/theme-tools";

export const buttonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props) => ({
      bg: "transparent",
      _hover: {
        bg: mode("blue.100", "blue.500")(props),

        boxShadow: "lg",
      },
    }),
    outline: (props) => ({
      bg: "transparent",
      border: "1px solid",
      borderColor: "blue.500",
      _hover: {
        bg: mode("blue.100", "blue.500")(props),

        boxShadow: "lg",
      },
    }),
  },
  defaultProps: {},
};

export const tabStyles = {
  baseStyle: {
    bg: "transparent",
    borderRadius: "16px",
    fontSize: "md",
    fontWeight: "semibold",
    h: 10,
    minW: 10,
    px: 4,
    lineHeight: "1.2",
    mr: "2",
  },
  sizes: {},
  variants: {
    primary: (props) => ({
      _hover: {
        bg: mode("blue.100", "blue.500")(props),
        boxShadow: "base",
      },
      _selected: {
        outline: "1px solid",
        outlineColor: "blue.500",
        bg: mode("blue.200", "blue.500")(props),
      },
    }),
  },
  defaultProps: {},
};
