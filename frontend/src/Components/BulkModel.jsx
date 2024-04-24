import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BulkModal({ invalidData, isOpen, bulkSubmit }) {

    const [errorData, setErrorData] = React.useState([])

    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);

    React.useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])

    React.useEffect(() => {
        setErrorData(invalidData)
    }, [invalidData])

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event, rowNumber) => {
        const { value } = event.target;
        setErrorData(prevErrorData =>
            prevErrorData.map(elem =>
                elem.rowNumber === rowNumber ? { ...elem, name: value } : elem
            )
        );
    };

    const handlePhoneChange = (event, rowNumber) => {
        const { value } = event.target;
        setErrorData(prevErrorData =>
            prevErrorData.map(elem =>
                elem.rowNumber === rowNumber ? { ...elem, phone: value } : elem
            )
        );
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        let validation = true

        for (let i = 0; i < errorData.length; i++) {
            if (errorData[i].name === "Please add Name" || errorData[i].phone === "Please add Phone") {
                validation = false
                break
            }
        }
        if (validation) {
            bulkSubmit(errorData)
            setOpen(false)
        }
        else {
            console.log("You must correct all invalid text");
            alert("Some of the field are incorrect")
        }

    }



    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Fix This Invaild Data
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            {errorData && errorData.map((elem, idx) => (
                                <div
                                    key={idx}
                                    className='flex items-center p-2'
                                >
                                    <label className='mr-1' htmlFor="">Row: {elem.rowNumber}</label>
                                    <>
                                        <label className='mr-1' htmlFor="name">Name: </label>
                                        <input className='border'
                                            type="text"
                                            id='name'
                                            placeholder="Please Enter Name"
                                            value={elem.name}
                                            onChange={(event) => handleChange(event, elem.rowNumber)}
                                        />
                                    </>


                                    <>
                                        <label className='mx-1' htmlFor="phone">Phone: </label>
                                        <input className='border'
                                            type="number"
                                            id='phone'
                                            placeholder='Please Enter Phone'
                                            value={elem.phone}
                                            onChange={(event) => handlePhoneChange(event, elem.rowNumber)}
                                        />
                                    </>

                                </div>
                            ))}
                            <div className='flex justify-center'>
                                <Button className='w-full text-end' type='submit' variant='success' >Retry</Button>
                                <Button className='w-full text-end' onClick={handleClose} >Cancel</Button>
                            </div>
                        </form>
                    </Typography>
                </Box>

            </Modal>
        </div>
    );
}
