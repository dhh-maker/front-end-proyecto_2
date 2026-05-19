import SignInForm from "../Components/SignIn/SignInForm";
import { Suspense } from 'react'
// Eliminamos el import de { login } aquí

export default function Login(){
    return (
        <Suspense>
            <SignInForm />
        </Suspense>
    )
}