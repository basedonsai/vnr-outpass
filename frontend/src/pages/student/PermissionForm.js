import React, { useState } from 'react';
import { Box, Button, TextField, Modal } from '@mui/material';





import { applyOutpass } from '../../api'; // make sure this exists and sends to backend





const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const PermissionForm = ({ open, onClose, onPermissionAdded }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userEmail = localStorage.getItem('email') || ''; // or from props/context
      const menteeId = userEmail.split('@')[0]; // assuming roll number = menteeId
      const mentorId = 'MENTOR123'; // replace with logic to get actual mentorId

      const data = {
        mentorId,
        menteeId,
        title: formData.title,
        description: formData.description,
      };

      const saved = await applyOutpass(data); // assumed API
      onPermissionAdded(saved);
      setFormData({ title: '', description: '' });
      onClose();
    } catch (err) {
      console.error('Permission request failed:', err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <h2>Request GatePass</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default PermissionForm;
