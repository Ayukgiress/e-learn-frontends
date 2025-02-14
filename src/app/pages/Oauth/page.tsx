import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        toast.error("Failed to sign in with Google");
      }
    } catch (error) {
      toast.error("An error occurred during sign in");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-3"
    >
      <FcGoogle className="h-5 w-5" />
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;