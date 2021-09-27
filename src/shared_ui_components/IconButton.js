import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";

export default function IconButton({ className, onClick, children, iconName }) {
  return (
    <span className={className} onClick={onClick}>
      <FontAwesome name={iconName} style={{ color: "#136FED" }} />
      <span className="text"> {children} </span>
    </span>
  );
}

IconButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  iconName: PropTypes.string,
};

IconButton.defaultProps = {
  className: "iconBtn",
  onClick: () => {},
  iconName: "",
};
