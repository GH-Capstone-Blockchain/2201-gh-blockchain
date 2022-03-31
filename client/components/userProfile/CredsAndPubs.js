import React from "react";
import { connect } from "react-redux";

import {
  Typography,
  Paper,
  Card,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Avatar,
  Box,
} from "@mui/material";

const CredsAndPubs = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "40px", fontWeight: "bold" }}>
              Credentials:
            </TableCell>
            <TableCell>{props.user.scientist.credentials}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell sx={{ width: "40px", fontWeight: "bold" }}>
              Publications:
            </TableCell>
            <TableCell>{props.user.scientist.publications}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(CredsAndPubs);
