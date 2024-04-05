import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/api/authApi";
import { LoadingButton as _LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import LogoIcon from "../assets/images/logo.png"
import ChromeIcon from "../assets/images/image 11.png"
import { ReactComponent as FlashIcon } from "../assets/images/🦆 icon _flash 1_.svg"

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => {
  const [registerUser, registerState] = useRegisterUserMutation();
  const { isLoading } = registerState;

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<RegisterInput> = (
    values: RegisterInput
  ) => {
    registerUser(values);
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(90deg, #08010F 0%, #05050A 100%)"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <DrawerHeader sx={{ justifyContent: "center", mt: 1 }}>
          <LinkItem to="/"><img src={LogoIcon} alt="Logo" /></LinkItem>
        </DrawerHeader>

        <FormProvider {...methods}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
            maxWidth="27rem"
            width="100%"
            sx={{
              background: "linear-gradient(72deg, #150225 0%, #0A0A12 100%)",
              p: { xs: "1rem", sm: "2rem" },
              borderRadius: "15px",
              border: "1px solid #673AB7"
            }}
          >
            <Typography
              textAlign="center"
              component="h1"
              sx={{
                color: "#FFF",
                fontWeight: 800,
                fontSize: "30px",
                mb: 2,
                letterSpacing: 1,
                mt: 3
              }}
            >
              Sign up
            </Typography>
            <Box position="relative">
              <Button variant="contained" sx={{ background: "#FFF", textTransform: "none", mt: 3, color: "black", width: "100%", fontSize: "15px", p: 1, zIndex: 1 }} startIcon={<Box component="img" src={ChromeIcon} />}>Continue with Google</Button>
              <Box width="75px" sx={{ position: "absolute", right: 0, mt: "-5px", color: "#FFF", fontSize: "10px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#6549C0", textAlign: "center", p: 1 }}><FlashIcon />FAST</Box>
            </Box>
            <Box display="flex" sx={{ justifyContent: "center", mt: 5, mb: 5 }}>
              <Divider textAlign="center" sx={{ width: "20%", borderColor: "rgba(94, 55, 164, 0.35)", borderWidth: "1px", mt: 3, mr: 2, color: "#FFF" }}></Divider>
              <Box position="relative"><span style={{ color: "#FFF", position: "absolute", top: "12px" }}>or</span></Box>
              <Divider textAlign="center" sx={{ width: "20%", borderColor: "rgba(94, 55, 164, 0.35)", borderWidth: "1px", mt: 3, ml: 4, color: "#FFF" }}></Divider>
            </Box>
            <FormInput name="name" label="Name" type="text"
              sx={{
                color: "#FFF",
                borderRadius: "10px",
                border: "1px solid rgba(115, 13, 195, 0.50)",
                background: "#11061D"
              }}
            />
            <FormInput name="email" label="Email" type="email"
              sx={{
                color: "#FFF",
                borderRadius: "10px",
                border: "1px solid rgba(115, 13, 195, 0.50)",
                background: "#11061D"
              }}
            />
            <FormInput name="password" label="Password" type="password"
              sx={{
                color: "#FFF",
                borderRadius: "10px",
                border: "1px solid rgba(115, 13, 195, 0.50)",
                background: "#11061D",
              }}
            />
            <FormInput name="passwordConfirm" label="Confirm Password" type="password"
              sx={{
                color: "#FFF",
                borderRadius: "10px",
                border: "1px solid rgba(115, 13, 195, 0.50)",
                background: "#11061D",
              }}
            />

            <LoadingButton
              variant="contained"
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
              sx={{
                borderRadius: "10px",
                background: "linear-gradient(92deg, #6C13B6 35.74%, #6166C5 100%)",
                mt: 1,
                color: "#FFF",
                fontSize: "15px"
              }}
            >
              Sign up
            </LoadingButton>

            <Divider textAlign="center" sx={{ width: "20%", borderColor: "rgba(94, 55, 164, 0.35)", borderWidth: "1px", m: "auto", mt: 3 }}></Divider>

            <Typography sx={{ fontSize: "0.9rem", mb: "1rem", mt: 3, textAlign: "center", color: "#FFF" }}>
              Have an account? <LinkItem to="/login">Log in</LinkItem>
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
