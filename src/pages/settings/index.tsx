import InitialsAvatar from "@/components/initials-avatar";
import { useAuth } from "@/hooks/use-auth";
import UpdateProfileForm from "./components/update-profile-form";
import UpdatePasswordForm from "./components/update-password-form";
import { Spinner } from "@/components/ui/spinner";

export default function Settings() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <InitialsAvatar
          firstName={currentUser?.first_name}
          lastName={currentUser?.last_name}
          size={60}
        />
        <div>
          <h2 className="text-lg font-semibold">{`${currentUser?.first_name} ${currentUser?.last_name}`}</h2>
          <p className="text-sm text-gray-500">{currentUser?.email}</p>
        </div>
      </div>

      {currentUser ? (
        <UpdateProfileForm currentUser={currentUser} />
      ) : (
        <Spinner />
      )}

      <div className="border-t border-gray-200 my-8" />

      {currentUser ? <UpdatePasswordForm /> : <Spinner />}
    </div>
  );
}
