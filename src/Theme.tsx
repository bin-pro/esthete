interface ThemeProps {
  colors: {
    bgColor: string;
    textColor: string;
    secondBlack: string;
    lightGray: string;
    middleGray: string;
    primaryColor: string;
    secondaryColor: string;
    pointColor: string;
  };
}

export const dark: ThemeProps = {
  colors: {
    bgColor: "black",
    textColor: "white",
    secondBlack: "#545454",
    lightGray: "#F0F0F0",
    middleGray: "#9D9D9D",
    primaryColor: "#7EC9FF",
    secondaryColor: "#FF6D6D",
    pointColor: "",
  },
};

export const light = {
  bgColor: "white",
  textColor: "black",
  secondBlack: "#100c0c",
  lightGray: "#F0F0F0",
  middleGray: "#9D9D9D",
  primaryColor: "#7EC9FF",
  secondaryColor: "#FF6D6D",
  pointColor: "",
};
