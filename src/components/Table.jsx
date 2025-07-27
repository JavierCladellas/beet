import { DataGrid } from '@mui/x-data-grid';

const Table = (props) => {
  return (
    <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        initialState={{
            columns: {
            columnVisibilityModel: {
                id: false,
            },
            },
        }}
        loading={props.loading}
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
