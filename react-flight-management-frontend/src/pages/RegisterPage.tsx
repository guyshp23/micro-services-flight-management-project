import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage(){
    return (
        <div className="flex justify-center items-center">
            <div className="h-screen flex items-center justify-center flex-col bg-transparent">
                <RegisterForm />
            </div>
        </div>
    )
}