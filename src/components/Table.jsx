import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

const Table = ({ rows, columns, loading, onEdit, onDelete, checkboxSelection, hideActions, renderCallbacks, headerNames }) => {
  const enhancedColumns = [
    ...columns.map((col) => ({
      ...col,
      flex: col.flex ?? 1,
      minWidth: col.minWidth ?? 100,
      maxWidth: col.maxWidth ?? 500,
      headerName: headerNames && (headerNames[col.field] ?? col.headerName),
      renderCell:
        renderCallbacks && renderCallbacks[col.field]
          ? renderCallbacks[col.field]
          : col.renderCell,
    }))
  ];

  if (!hideActions)
    enhancedColumns.push({
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
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(params.row);
            }}
          >
            <AiFillEdit />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(params.row);
            }}
          >
            <MdDelete />
          </IconButton>
        </>
      ),
    })


  return (
    <DataGrid
      rows={rows}
      columns={enhancedColumns}
      pageSizeOptions={[5, 10, 100]}
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
