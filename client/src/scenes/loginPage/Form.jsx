import { useState } from "react"
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux" 
import { setLogin } from "state"
import Dropzone from "react-dropzone"
import FlexBetween from "components/FlexBetween"

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})

const loginSchema = yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})

const initialValuesRegister =  {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const intialValuesLogin = {
    email: "",
    password: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("login")
    const { palette } = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isNonMobile = useMediaQuery("(min-width: 600px")
    const isLogin = pageType === "login"
    const isRegister = pageType === "register"
    
    const handleFormSubmit = async (values, onSubmitProps) => {}

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? intialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => {
                <form onSubmit={handleSubmit}>
                    
                </form>
            }}
        </Formik>
    )
}

export default Form