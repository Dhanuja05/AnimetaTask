import React from "react";
import Table from "react-bootstrap/Table";
import classes from "./styles.module.scss";

const NormalTable = (props) => {
  const { headers, children, setwidth = false } = props;
  return (
    <Table
      className={`${classes.normalTable}`}
      responsive
      bordered
      hover
    >
      <thead>
        <tr>
          {headers.map((header, index) => {
            return (
              <th
                className={setwidth ? classes.minwidth : undefined}
                key={index}
              >
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default NormalTable;
