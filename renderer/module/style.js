import reactCSS from "reactcss";
export { wrap } from "react-bounds";

export const bounds = () => {
  return {
    mobile: {
      minWidth: 0,
      maxWidth: 500
    },
    tablette: {
      minWidth: 501,
      maxWidth: 1000
    },
    small: {
      minWidth: 1001,
      maxWidth: 1300
    },
    medium: {
      minWidth: 1301,
      maxWidth: 1600
    },
    large: {
      minWidth: 1601,
      maxWidth: 4000
    }
  };
};
export var styles = reactCSS({
  default: {
    body: {
      overflow: "hidden"
    }
  },
  mobile: {
    body: {
      transform: "scale(2)",
      overflow: "hidden"
    }
  },
  tablette: {
    body: {}
  },
  small: {
    body: {
      transform: "scale(0.5)",
      overflow: "hidden"
    }
  },
  medium: {
    body: {
      transform: "scale(0.5)",
      overflow: "hidden"
    }
  },
  large: {
    body: {
      transform: "scale(2)",
      overflow: "hidden"
    }
  }
});
