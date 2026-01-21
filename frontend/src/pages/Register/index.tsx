import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
