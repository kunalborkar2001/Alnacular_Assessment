import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Box, Typography } from '@mui/material';
import * as XLSX from 'xlsx';
import BasicModal from './Modal';
import { currentRows } from '../../../mockData/data'





const DataTable = () => {
    const [open, setOpen] = React.useState(false);
    const [initialRows, setInitalRows] = React.useState(currentRows)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', },
        { field: 'email', headerName: 'Last name', width: 300 },
        { field: 'phone', headerName: 'Phone', type: 'number' },
        { field: 'tags', headerName: 'Tags', description: 'This column has a value getter and is not sortable.', width: 200 },
        { field: 'city', headerName: 'City' },
        { field: 'state', headerName: 'State' },
        { field: 'country', headerName: 'Country' },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,

            renderCell: (params) => (
                <div className='flex items-center justify-center h-full gap-2'>
                    <BasicModal
                        type="Edit"
                        id={params.row.id}
                        name={params.row.name}
                        email={params.row.email}
                        phone={params.row.phone}
                        tags={params.row.tags}
                        city={params.row.city}
                        state={params.row.state}
                        country={params.row.country}
                        addData={handleUpdate}
                    />
                    <Button variant="contained" color="secondary" sx={{ bgcolor: "red", margin: "8px" }} size="small" onClick={() => handleDelete(params.row.id)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            // Assuming the first row contains headers
            const headers = excelData[0];
            const rows = excelData.slice(1).map((row) => {
                const rowData = {};
                headers.forEach((header, index) => {
                    rowData[columns[index].field] = row[index];
                });
                return rowData;
            });
            // Concatenate the new rows with the existing rows
            setInitalRows((prevRows) => [...prevRows, ...rows]);
            handleClose();
        };
        reader.readAsArrayBuffer(file);
    };

    function handleDelete(id) {
        // Implement your delete logic here
        console.log(`Delete row with id ${id}`);
        setInitalRows(initialRows.filter((elem) => elem.id != id))
    };

    function handleAddOne(data) {
        let add = { id: 90, ...data }
        setInitalRows((prevState) => [...prevState, add])
    }

    function handleUpdate(data, id) {
        console.log("update" , data, id);
        setInitalRows(prevRows => {
            // Find the index of the row to be updated
            const index = prevRows.findIndex(row => row.id === id);
            if (index !== -1) {
                // Create a copy of the row with updated data
                const updatedRow = { ...prevRows[index], ...data };
                // Create a new array with the updated row
                const updatedRows = [...prevRows.slice(0, index), updatedRow, ...prevRows.slice(index + 1)];
                return updatedRows;
            }
            return prevRows;
        });
    }


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>Bulk Upload</Button>

            <Modal open={open} onClose={handleClose} sx={{ display: "flex", border: "solid green 10px", alignItems: "center", justifyContent: "center" }}>
                <Box sx={{
                    width: 500,
                    height: 200,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div>
                        <Typography variant="h5">Bulk Upload</Typography>
                        <input type="file" onChange={handleFileUpload} accept=".xlsx,.xls" />
                        <Typography variant="body1">Upload format: Excel (.xlsx, .xls)</Typography>
                    </div>
                </Box>
            </Modal>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={initialRows}
                    columns={columns}
                    pageSize={5}
                    pagination={{ pageSizeOptions: [5, 10, 20,] }}
                    sx={{ padding: "12px" }}
                />
            </div>

            <BasicModal type="Add" addData={handleAddOne} />
        </div>
    );
};

export default DataTable;
