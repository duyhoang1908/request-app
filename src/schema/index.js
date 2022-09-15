import * as Yup from "yup"

export const requestSchema = Yup.object().shape({
    content: Yup.string().required("Không được bỏ trống")
})