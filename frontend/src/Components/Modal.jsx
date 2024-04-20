import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ type, name, email, phone, tags, id, city, state, country, addData }) {

    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        tags: [],
        city: '',
        state: '',
        country: ''
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'tags') {
            const tags = value.split(',').map(tag => tag.trim());
            setFormData((prevData) => ({
                ...prevData,
                [name]: tags,
            }));
        } else if (name === 'phone') {
            // Ensure phone number is stored as a string
            setFormData((prevData) => ({
                ...prevData,
                [name]: String(value),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    React.useEffect(() => {

        if (type == "Edit") {
            setFormData({
                name: name,
                email: email,
                phone: phone,
                tags: tags,
                city: city,
                state: state,
                country: country,
                _id : id
            })
        }
        else if (type == "Add") {
            setFormData({
                name: '',
                email: '',
                phone: '',
                tags: [],
                city: '',
                state: '',
                country: '',
            })
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        // Handle form submission here
        if (type == "Add") {
            addData(formData)
            console.log('Form submitted with data:', formData);
        }
        else if (type == "Edit") {
            addData(formData, id)
        }
        handleClose(); // Close the modal after form submission
    };

    return (
        <div>
            <Button variant="contained" color="primary" sx={{ bgcolor: `${type == "Edit" ? "black" : "red"}`, margin: "8px" }} size="small" onClick={handleOpen}>
                {type == "Edit" ? "Edit" : "Add"}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {type == "Edit" ? "Edit Form" : "Delete Confirmation"}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            value={formData.email}
                            onChange={handleChange}

                        />
                        <TextField
                            id="phone"
                            name="phone"
                            label="Phone"
                            variant="outlined"
                            inputProps={{ type: 'number' }}
                            fullWidth
                            sx={{ my: 2 }}
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            id="city"
                            name="city"
                            label="cityone"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <TextField
                            id="state"
                            name="state"
                            label="statene"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            value={formData.state}
                            onChange={handleChange}
                        />
                        <TextField
                            id="country"
                            name="country"
                            label="country"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            value={formData.country}
                            onChange={handleChange}
                        />
                        <TextField
                            id="tags"
                            name="tags"
                            label="Tags"
                            variant="outlined"
                            fullWidth
                            sx={{ my: 2 }}
                            value={formData.tags}
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>Confirm</Button>
                        <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
