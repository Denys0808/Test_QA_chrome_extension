import * as React from 'react';
import { Box, Typography, Button, Modal, Input, Divider } from "@mui/material";

import Sidebar from "../components/Sidebar";
import PaymentForm from '../components/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ReactComponent as CreditsLeftIcon } from "../assets/images/🦆 icon _verify_.svg"
import { ReactComponent as LogoutIcon } from "../assets/images/🦆 icon _logout_.svg"
import { ReactComponent as ChromeIcon } from "../assets/images/🦆 icon _chrome_.svg"
import { ReactComponent as CloseIcon } from "../assets/images/🦆 icon _close circle_.svg"
import { ReactComponent as LockIcon } from "../assets/images/🦆 icon _lock circle_.svg"
import { ReactComponent as TrashIcon } from "../assets/images/🦆 icon _trash_.svg"
import SettingIcon from "../assets/images/setting.png"

const AccountPage = () => {
    const [opensetting, setOpensetting] = React.useState(false);
    const [cardNumber, setCardNumber] = React.useState("");
    const handleOpensetting = () => setOpensetting(true);
    const handleClosesetting = () => setOpensetting(false);
    
    const stripePromise = loadStripe('pk_test_51NvJdLJ6jaWFbdbZ0flb0sYx6eF08dakswonUqoKbmqXoZHHCU2xV1Pp1zA5jbWxwgepi0g8xdZiOs4BIKlhSwVO00y7c4nX9S');

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
        border: "none",
        color: "white"
    };

    return <>
        <Box sx={{ backgroundImage: "linear-gradient(90deg, #08010F 0%, #05050A 100%)" }} height="100vh">
            <Sidebar />
            <Box pl={35} pt={5} pr={5}>
                <Box display="flex">
                    <Typography color="white" variant="h5" fontWeight={600} flexGrow={1}>My Account</Typography>
                    <Button variant="outlined" startIcon={<CreditsLeftIcon />} sx={{ border: "1px solid rgb(103, 58, 183, 0.50)", color: "white", mr: 1 }}>{12} credits Left</Button>
                    <Button variant="contained" startIcon={<LogoutIcon />} sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", color: "white" }}>Logout</Button>
                </Box>
                <Box sx={{ border: "1px solid rgba(103, 58, 183, 0.50)", background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)", px: 3, borderRadius: 2, mt: 3 }} height={59} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography color="white" fontWeight={600}>Free Credits 🆓 <Box component="span" fontWeight={400}>Complete your profile to earn 10 free credits :)</Box></Typography>
                    <Button variant="contained" sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", textTransform: "none" }}>Complete Profile</Button>
                </Box>
                <Box display="flex" gap={3}>
                    <Box flex={1} sx={{ position: "relative", border: "1px solid rgba(103, 58, 183, 0.50)", background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)", pl: 3, borderRadius: 2, mt: 3, pt: 3, pb: 5 }} textAlign="center">
                        <Typography variant="h5" color="white" textAlign="center" fontWeight={700}>Mike Evans</Typography>
                        <Typography color="white" textAlign="center" fontWeight={500} mt={1}>mikeevansjr2@gmail.com</Typography>
                        <Button variant="contained" sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", textTransform: "none", mt: 3 }} startIcon={<ChromeIcon />} >Add Chrome Extension</Button>
                        <Box component="img" src={SettingIcon} sx={{ position: "absolute", top: "10px", right: "10px", width: "19px", height: "18px" }} onClick={handleOpensetting} />
                        <Modal
                            open={opensetting}
                            onClose={handleClosesetting}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography color="white" textAlign="center" sx={{ top: "20px", right: "20px", position: "absolute" }}><CloseIcon onClick={handleClosesetting} /></Typography>
                                <Typography sx={{ mt: 3 }}>
                                    Name
                                </Typography>
                                <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} defaultValue={"Mark Evans"} />
                                <Typography sx={{ mt: 3 }}>
                                    Email
                                </Typography>
                                <Input sx={{ width: "100%", borderRadius: "10px", border: "1px solid rgba(115, 13, 195, 0.50)", background: "#11061D", p: 1, color: "white", fontSize: "16px", fontWeight: "400" }} defaultValue={"mikeevansjr2@gmail.com"} />
                                <Button variant="contained" sx={{ background: "linear-gradient(128deg, #6C13B6 0%, #6166C5 100%)", textTransform: "none", mt: 3, width: "100%" }} onClick={handleClosesetting} >Update Info</Button>
                                <Divider textAlign="center" sx={{ width: "20%", borderColor: "rgba(94, 55, 164, 0.35)", borderWidth: "1px", m: "auto", mt: 3 }}></Divider>
                                <Box display="flex" sx={{ alignItems: "center", justifyContent: "center" }}>
                                    <Box flex={1}>
                                        <Button variant="contained" sx={{ width: "90%", background: "#FFF", textTransform: "none", mt: 3, color: "black", ml: "5%" }} startIcon={<LockIcon />} >Change Password</Button>
                                    </Box>
                                    <Box flex={1}>
                                        <Button variant="contained" sx={{ width: "90%", background: "#E91E63", textTransform: "none", mt: 3, color: "white", ml: "5%" }} startIcon={<TrashIcon />} >Delete Account</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                    <Box flex={1} sx={{ border: "1px solid rgba(103, 58, 183, 0.50)", background: "linear-gradient(45deg, #150225 0%, #0A0A12 100%)", pl: 3, borderRadius: 2, mt: 3, pt: 3, pb: 5 }} textAlign="center">
                        <Typography variant="h5" color="white" textAlign="center" fontWeight={700}>Free Plan</Typography>
                        <Typography color="white" textAlign="center" fontWeight={500} mt={1}>Your Plan</Typography>
                        <Elements stripe={stripePromise}>
                            <PaymentForm />
                        </Elements>
                    </Box>
                </Box>
            </Box >
        </Box >
    </>;
}

export default AccountPage