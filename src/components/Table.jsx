import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Table = ({ rows, columns, loading, onEdit, onDelete, checkboxSelection }) => {
  const enhancedColumns = [
    ...columns.map((col) => ({
      ...col,
      flex: col.flex ?? 1, // Allow each column to grow
      minWidth: col.minWidth ?? 100,
      maxWidth: col.maxWidth ?? 500, // limit max width if needed
    })),
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={(e) => {e.stopPropagation(); onEdit?.(params.row)}}
          >
            <AiFillEdit/>
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={(e) => {e.stopPropagation(); onDelete?.(params.row)}}
          >
            <MdDelete/>
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={enhancedColumns}
      pageSizeOptions={[5, 10]}
      checkboxSelection={checkboxSelection ?? false}
      sx={{ border: 0 }}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
      }}
      loading={loading}
      slotProps={{
        loadingOverlay: {
          variant: 'circular-progress',
          noRowsVariant: 'circular-progress',
        },
      }}
    />
  );
};

export default Table;
