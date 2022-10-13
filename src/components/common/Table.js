import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import HideSourceIcon from '@mui/icons-material/HideSource';
export default function StickyTable({
  columns,
  rows,
  loading,
  onClickPath,
  onNextPage = () => "",
  count = rows.length,
  refetch
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrders, setSortOrders] = useState(Array(columns.length).fill(0));
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    onNextPage(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleRowClick = (id) => {
    navigate(onClickPath + id);
  };

  useEffect(() => {
    sortOrders.forEach((order, index) => {
      order !== 0 && refetch({ sort: columns[index].id, sortOrder: order===1? "ASCENDING":"DESCENDING"})
    })
  }, [columns, refetch, sortOrders]);

  return (
    <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {count === 0 && !loading ? <p style={{ paddingLeft: 20 }}>Nothing was found, try to change filter conditions</p> : <TableContainer sx={{ height: "calc(100vh - 182px)" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{ marginLeft: 110, marginRight: 11 }}>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  onClick={() => {
                    setSortOrders(sortOrders => sortOrders.map((order, innerIndex) => innerIndex === index ? order === 0 ? 1 : order === 1 ? -1 : 1 : 0
                    ))
                  }}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: 18,
                    color: "#3c4043",
                    paddingLeft: 24,
                    paddingRight: 24,
                  }}
                >{column.label}
                  {index !== 4 && index !== 5 && <IconButton size="small">
                    {sortOrders[index] === 0 ?
                      <HideSourceIcon style={{ fontSize: '15px' }} /> :
                      sortOrders[index] === 1 ?
                        <ArrowDownwardIcon style={{ fontSize: '15px' }} /> :
                        <ArrowUpwardIcon style={{ fontSize: '15px' }} />}
                  </IconButton>}
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
                      onClick={() => handleRowClick(row.id)}
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
                              fontSize: 18,
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
      </TableContainer>}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
