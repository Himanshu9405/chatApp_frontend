import { Avatar, Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const Profile = ({ user, children }) => {
    const [open, setOpen] = React.useState(false);
    console.log('children', children);

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
    return (
        <div>
            {
                children ? (
                    <span onClick={() => setOpen(true)}>{children}</span>
                ) : (
                    <Button>
                        <RemoveRedEyeIcon />
                    </Button>

                )
            }
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                alt={user?.name}
                                src={user?.profile_pic}
                                sx={{ width: 70, height: 70 }}
                            />
                        </Box>
                        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ fontSize: '40px', justifyContent: 'center' }}>
                            <b>{user?.name}</b>
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Email: {user?.email}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button >
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Profile


