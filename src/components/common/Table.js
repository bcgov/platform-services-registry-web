import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";

export default function StickyTable({ columns, rows, loading, onClick }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: "calc(100vh - 182px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ marginLeft: 110, marginRight: 11 }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: 17,
                    color: "#3c4043",
                    paddingLeft: 24,
                    paddingRight: 24,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading ? (
            columns.map((_, i) => (
              <TableRow
                key={"row" + i}
                style={{ marginLeft: 24, marginRight: 24 }}
                sx={{
                  width: "100%",
                }}
              >
                {columns.map((__, j) => (
                  <TableCell key={"col" + j}>
                    <Skeleton height="70px" animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      onClick={() => onClick(row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            style={{
                              maxWidth: 250,
                              verticalAlign: "top",
                              fontSize: 15,
                              color: "#3c4043",
                              paddingLeft: 24,
                              paddingRight: 24,
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
