import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphql";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setUser } from "./slice";
import { Stack } from "@mui/system";
import { removeToken } from "../token/slice";
import { INVALID_TOKEN, UNAUTHENTICATED_MSG } from "./constants";

export default function Account() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const navigate = useNavigate();

    console.log("user: ", user);

    const onLogoutClicked = () => {
        dispatch(removeToken());
        navigate("/signin");
    };

    const { loading } = useQuery(GET_USER, {
        errorPolicy: "all",
        fetchPolicy: "network-only", // Doesn't check cache before making a network request
        onCompleted: (data) => {
            if (data?.user) {
                dispatch(setUser(data.user));
            }
        },
        onError: (error) => {
            enqueueSnackbar(error.message, {
                variant: "error",
                action: () => (
                    <IconButton
                        aria-label="delete"
                        style={{ color: "white" }}
                        onClick={() => closeSnackbar()}
                    >
                        <DeleteIcon />
                    </IconButton>
                ),
            });

            if (
                error.message.includes(UNAUTHENTICATED_MSG) ||
                error.message.includes(INVALID_TOKEN)
            ) {
                dispatch(removeToken());
                navigate("/signin");
            } else {
                console.log(error.message);
            }
        },
    });

    if (loading) {
        return (
            <Box sx={{ display: "flex", height: "inherit" }}>
                <CircularProgress style={{ margin: "auto" }} />
            </Box>
        );
    }

    return (
        <Container
            component="main"
            sx={{
                marginTop: 8,
                marginBottom: 2,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <Typography component="span" variant="h4">
                Account Details
            </Typography>
            <Stack direction="row" spacing={2}>
                <Typography component="span" variant="h5">
                    First Name:
                </Typography>
                <Typography component="span" variant="h5">
                    {user?.firstName}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography component="span" variant="h5">
                    Last Name:
                </Typography>
                <Typography component="span" variant="h5">
                    {user?.lastName}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Typography component="span" variant="h5">
                    Email:
                </Typography>
                <Typography component="span" variant="h5">
                    {user?.email}
                </Typography>
            </Stack>
            <Button
                variant="contained"
                sx={{ width: "fit-content" }}
                onClick={onLogoutClicked}
            >
                Log out
            </Button>
        </Container>
    );
}
