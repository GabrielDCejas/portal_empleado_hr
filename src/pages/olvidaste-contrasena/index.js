// ** Next Import
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { CircularProgress, FormHelperText } from "@mui/material";

// // ** Demo Imports
// import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
const styles = {
  background: {
    flex: 1,
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(/images/fondo_login.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover", // Utiliza 'cover' para que la imagen se ajuste al tamaño del Box
    width: "100%",
    height: "100vh", // Ajusta la altura al 100% de la altura de la ventana (viewport)
  },
};
// Styled Components
const ForgotPasswordIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const ForgotPasswordIllustration = styled("img")(({ theme }) => ({
  maxWidth: "30rem",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "15rem",
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { mt: theme.spacing(8) },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  display: "flex",
  fontSize: "0.875rem",
  alignItems: "center",
  textDecoration: "none",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const ForgotPassword = () => {
  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const { settings } = useSettings();

  // ** Vars
  const { skin } = settings;
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState(""); // Agrega un estado para el correo electrónico

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const defaultValues = {
    email: "",
    telefono: "",
    nombre: "",
    apellido: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Ingresa una dirección de correo electrónico válida")
      .required("El campo de correo electrónico es requerido"),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, touched },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const [loading, setloading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = async (data) => {
    const { email } = data;
    setloading(true);
    try {
      // Llama a la función `forgotPassword` del contexto de autenticación con el correo electrónico
      await auth.forgotPassword(email);
      setloading(false);
      setSuccessMessage(
        "Se ha enviado un correo electrónico de recuperación de contraseña, revisa el buzón de correo no deseado."
      );
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "El correo electrónico ya está en uso por otra cuenta.";
          break;
        case "auth/invalid-email":
          errorMessage = "La dirección de correo electrónico proporcionada no es válida.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "La operación de registro no está permitida.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña proporcionada es demasiado débil.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Hubo un problema de red al registrar la cuenta.";
          break;
        case "auth/app-deleted":
          errorMessage = "La instancia de la aplicación Firebase ha sido eliminada.";
          break;
        case "auth/app-not-authorized":
          errorMessage = "La aplicación no está autorizada para acceder a Firebase.";
          break;
        case "auth/argument-error":
          errorMessage = "Error de argumento al registrar la cuenta.";
          break;
        case "auth/internal-error":
          errorMessage = "Error interno al registrar la cuenta.";
          break;
        case "auth/missing-iframe-start":
          errorMessage = "Falta el iframe de inicio al registrar la cuenta.";
          break;
        case "auth/user-not-found":
          errorMessage = "Correo electrónico no registrado";
          break;
        default:
          errorMessage = "Error desconocido";
          break;
      }
      setloading(false);

      setError("email", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <Box className="content-right">
      {!hidden ? <Box sx={styles.background}>{/* Tu contenido aquí */}</Box> : null}
      <RightWrapper sx={skin === "bordered" && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 12,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant="h5">Olvidaste la contraseña? 🔒</TypographyStyled>
              <Typography variant="body2">
                Ingresa tu correo y te enviaremos las intrucciones para recuperar la contraseña
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      type="email"
                      label="Correo electrónico"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="Correo electrónico"
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: "error.main" }}>{errors.email.message}</FormHelperText>}
                {successMessage && (
                  <Typography variant="subtitle2" color="green">
                    {successMessage}
                  </Typography>
                )}
              </FormControl>
              <Box sx={{ mt: 3, mb: 2, position: "relative" }}>
                <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 7 }} disabled={loading}>
                  Enviar link de reseteo
                </Button>
                {loading && (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: "green",
                      position: "absolute",
                      top: "30%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                <Typography variant="body2">
                  <LinkStyled href="/login">Volver al login</LinkStyled>
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};
ForgotPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
ForgotPassword.guestGuard = true;

export default ForgotPassword;