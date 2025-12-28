import { useRole } from "../context/RoleContext";

/**
 * RoleSelector
 * Entry screen for FocusFund
 * Allows user to choose Child or Parent role
 */

export default function RoleSelector() {
  const { selectRole } = useRole();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-100 to-blue-100 px-6">
      {/* App Title */}
      <h1 className="text-4xl font-bold mb-2 text-gray-800">
        FocusFund
      </h1>

      {/* Tagline */}
      <p className="text-lg text-gray-600 mb-8 text-center">
        Your Attention is Your Wealth 💰
      </p>

      {/* Role Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => selectRole("child")}
          className="py-4 rounded-lg bg-blue-500 text-white text-lg font-semibold hover:bg-blue-600 transition"
        >
          👶 I am a Child
        </button>

        <button
          onClick={() => selectRole("parent")}
          className="py-4 rounded-lg bg-green-600 text-white text-lg font-semibold hover:bg-green-700 transition"
        >
          👨‍👩‍👧 I am a Parent
        </button>
      </div>

      {/* Footer Hint */}
      <p className="mt-8 text-sm text-gray-500 text-center">
        Learn to save attention, just like money.
      </p>
    </div>
  );
}
