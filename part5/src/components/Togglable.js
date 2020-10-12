import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="toggle-button">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{props.children}</div>
        <div>
          <button onClick={toggleVisibility}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
