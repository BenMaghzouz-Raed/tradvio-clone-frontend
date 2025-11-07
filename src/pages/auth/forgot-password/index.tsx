import Form from "./components/Form";
import { AuthLayout } from "@/components/auth-layout";

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Reset your Password Securely"
      highlights={["Secure Authentication", "Email Recovery", "Account Safety"]}
    >
      <Form />
    </AuthLayout>
  );
}
