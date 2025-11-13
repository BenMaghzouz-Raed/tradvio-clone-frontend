import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmEmail } from "@/services/domain/AuthService";
import { getOrThrow } from "@/config";
import { ROUTES } from "@/services/http/LinksService";
import { toastNotification } from "@/lib/toast";
import { useAuth } from "@/hooks/use-auth";

export default function VerifyEmail() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const { refresh } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selector = params.get("selector");
    const token = params.get("token");

    if (!selector || !token) {
      setStatus("error");
      setMessage("Missing verification parameters.");
      return;
    }

    confirmEmail({ selector, token })
      .then((res: any) => {
        // res is the Envelope returned by the http interceptor
        const access = res?.data?.access_token;
        if (!access) {
          throw new Error("No access token received");
        }
        localStorage.setItem(
          getOrThrow<string>("ACCESS_TOKEN_TAG") || "access_token",
          access
        );
        setStatus("success");
        toastNotification({ type: "success", message: "Email verified. Redirecting..." });
        refresh()
          .catch(() => {})
          .finally(() => setTimeout(() => navigate(`/${ROUTES.DASHBOARD.path}`), 300));
      })
      .catch((err: any) => {
        setStatus("error");
        setMessage(err?.message || "Email verification failed.");
        toastNotification({ type: "error", message: err?.message || "Email verification failed." });
      });
  }, [navigate]);

  return (
    <div style={{ display: "flex", minHeight: "60vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", padding: "24px" }}>
      {status === "loading" && (
        <>
          <h2>Verifying your email...</h2>
          <p>Please wait while we complete your registration.</p>
        </>
      )}
      {status === "success" && (
        <>
          <h2>Success!</h2>
          <p>Your email has been verified. You will be redirected shortly.</p>
        </>
      )}
      {status === "error" && (
        <>
          <h2>Verification failed</h2>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}
