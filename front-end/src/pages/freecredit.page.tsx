import * as React from 'react';
import { Box, Typography, Button, Input, InputAdornment, Modal } from "@mui/material";
import { useCompleteProfileMutation } from "../redux/api/userApi";

import Sidebar from "../components/Sidebar";
import { ReactComponent as CreditsLeftIcon } from "../assets/images/🦆 icon _verify_.svg"
import { ReactComponent as LogoutIcon } from "../assets/images/🦆 icon _logout_.svg"
import { ReactComponent as SendIcon } from "../assets/images/🦆 icon _send.svg"
import { ReactComponent as CopyIcon } from "../assets/images/🦆 icon _copy_.svg"
import { ReactComponent as CloseIcon } from "../assets/images/🦆 icon _close circle_.svg"
import QRCode from "../assets/images/image 10.png"

const FreeCredit = () => {
    const [openprofile, setOpenprofile] = React.useState(false);
    const handleOpenprofile = () => setOpenprofile(true);
    const handleCloseprofile = () => setOpenprofile(false);

    const [openresend, setOpenresend] = React.useState(false);
    const handleOpenresend = () => setOpenresend(true);
    const handleCloseresend = () => setOpenresend(false);

    const [openinvite, setOpeninvite] = React.useState(false);
    const handleOpeninvite = () => setOpeninvite(true);
    const handleCloseinvite = () => setOpeninvite(false);

    const [school, setSchool] = React.useState("");
    const [grade, setGrade] = React.useState("");
    const [instgram, setInstgram] = React.useState("");

    const [submitProfile, profileState] = useCompleteProfileMutation();

    const handleSubmitProfile = () => {
        submitProfile({ school, grade, instgram })
    }

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 472,
        boxShadow: 24,
        p: 4,
        borderRadius: "20px",
        background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)",
        color: "white",
        border: "none"
    };

    return <>
        <Box sx={{ backgroundImage: "linear-gradient(90deg, #08010F 0%, #05050A 100%)" }} height="100vh">
            <Sidebar />
            <Box pl={35} pt={5} pr={5}>
                <Box display="flex">
                    <Typography color="white" variant="h5" fontWeight={600} flexGrow={1}>Free Credits</Typography>
                    <Button variant="outlined" startIcon={<CreditsLeftIcon />} sx={{ border: "1px solid rgb(103, 58, 183, 0.50)", color: "white", mr: 1 }}>{12} credits Left</Button>
                    <Button variant="contained" startIcon={<LogoutIcon />} sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", color: "white" }}>Logout</Button>
                </Box>
                <Box display="flex" gap={3}>
                    <Box flex={1} sx={{ position: "relative", border: "1px solid rgba(103, 58, 183, 0.50)", background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)", pl: 3, pr: 3, borderRadius: 2, mt: 3, pt: 3, pb: 5 }} textAlign="center">
                        <Typography variant="h5" color="white" textAlign="left" fontWeight={700}>Refer a Friend</Typography>
                        <Typography color="white" textAlign="center" mt={1} sx={{ top: "25px", right: "25px", position: "absolute" }}>+ 10 credits (for each)</Typography>
                        <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", mt: 3, p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} readOnly value={"https://join.lmk.so/2i2jmnu3h"} endAdornment={<InputAdornment position="start"><CopyIcon /></InputAdornment>} />
                        <Button variant="contained" sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", textTransform: "none", mt: 3, width: "100%" }} onClick={handleOpeninvite} startIcon={<SendIcon />} >Click to Quick Share</Button>
                        <Modal
                            open={openinvite}
                            onClose={handleCloseinvite}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...modalStyle, textAlign: "center" }}>
                                <Typography color="white" textAlign="center" sx={{ top: "20px", right: "20px", position: "absolute" }}><CloseIcon onClick={handleCloseinvite} /></Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 3 }}>
                                    QR Code For Your Link
                                </Typography>
                                <Box component="img" src={QRCode} sx={{ mt: 2 }} />
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    You will earn 10 credits for each new user<br />that joins through your link or QR code
                                </Typography>
                            </Box>
                        </Modal>
                    </Box>
                    <Box flex={1} sx={{ position: "relative", border: "1px solid rgba(103, 58, 183, 0.50)", background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)", pl: 3, pr: 3, borderRadius: 2, mt: 3, pt: 3, pb: 5 }} textAlign="center">
                        <Typography variant="h5" color="white" textAlign="left" fontWeight={700}>Verify Email</Typography>
                        <Typography color="white" textAlign="center" mt={1} sx={{ top: "25px", right: "25px", position: "absolute" }}>+ 10 credits</Typography>
                        <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", mt: 3, p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} readOnly value={"Email Status: Unverified"} />
                        <Button variant="contained" sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", textTransform: "none", mt: 3, width: "100%" }} onClick={handleOpenresend}>📧 Resend Verification Email</Button>
                        <Modal
                            open={openresend}
                            onClose={handleCloseresend}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{ ...modalStyle, textAlign: "center" }}>
                                <Typography color="white" textAlign="center" sx={{ top: "20px", right: "20px", position: "absolute" }}><CloseIcon onClick={handleCloseresend} /></Typography>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 3 }}>
                                    New verification email has been sent!
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Check your spam folder<br />if you don't see it
                                </Typography>
                            </Box>
                        </Modal>
                    </Box>
                </Box>
                <Box display="flex" gap={3}>
                    <Box flex={1} sx={{ position: "relative", border: "1px solid rgba(103, 58, 183, 0.50)", background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)", pl: 3, pr: 3, borderRadius: 2, mt: 3, pt: 3, pb: 5 }} textAlign="center">
                        <Typography variant="h5" color="white" textAlign="left" fontWeight={700}>Complete Profile</Typography>
                        <Typography color="white" textAlign="center" mt={1} sx={{ top: "25px", right: "25px", position: "absolute" }}>+ 10 credits</Typography>
                        <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", mt: 3, p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} readOnly value={"Profile Status: Incomplete"} />
                        <Button variant="contained" sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", textTransform: "none", mt: 3, width: "100%" }} onClick={handleOpenprofile} >💯 Complete Profile</Button>
                        <Modal
                            open={openprofile}
                            onClose={handleCloseprofile}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography color="white" textAlign="center" sx={{ top: "20px", right: "20px", position: "absolute" }}><CloseIcon onClick={handleCloseprofile} /></Typography>
                                <Typography sx={{ mt: 3 }}>
                                    🏫 Your School/University
                                </Typography>
                                <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} value={school} onChange={(e) => setSchool(e.target.value)} />
                                <Typography sx={{ mt: 3 }}>
                                    📚 Your Grade
                                </Typography>
                                <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} value={grade} onChange={(e) => setGrade(e.target.value)} />
                                <Typography sx={{ mt: 3 }}>
                                    🔗 Your Instagram
                                </Typography>
                                <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} value={instgram} onChange={(e) => setInstgram(e.target.value)} />
                                <Button variant="contained" sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", textTransform: "none", mt: 3, width: "100%" }} onClick={handleSubmitProfile} >Complete Profile</Button>
                            </Box>
                        </Modal>
                    </Box>
                    <Box flex={1} sx={{ position: "relative", border: "1px solid rgba(103, 58, 183, 0.50)", background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)", pl: 3, pr: 3, borderRadius: 2, mt: 3, pt: 3, pb: 5, visibility: "hidden" }} textAlign="center">
                    </Box>
                </Box>
            </Box>
        </Box >
    </>;
}

export default FreeCredit