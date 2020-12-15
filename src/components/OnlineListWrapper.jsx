import React from "react";
import PropTypes from 'prop-types';

import { Grid } from "@material-ui/core";

import OnlineList from "../components/OnlineList";

const OnlineListWrapper = ({ children}) => {
  return <Grid container style={{ margin: "-2rem" }}>
    <Grid item lg={10} xs={12}>
      <div style={{ margin: "2rem" }}>
        {children}
      </div>
    </Grid>
    <Grid item lg={2} xs={12}>
      <OnlineList />
    </Grid>
  </Grid>;
};

export default OnlineListWrapper;

OnlineListWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired
  ]),
  // details: PropTypes.element,
}

// OnlineListWrapper.defaultProps = {
//   details: null,
// }
