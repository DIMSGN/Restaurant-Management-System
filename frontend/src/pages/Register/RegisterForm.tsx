import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { registerSchema, type RegisterFormData } from "@/schemas";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Info, CheckCircle2, XCircle } from "lucide-react";

function RegisterForm() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const username = watch("username");

  const passwordChecks = {
    length: password.length >= 8,
    notEmpty: password.length > 0,
  };

  const usernameChecks = {
    length: username.length >= 3,
    validChars: /^[a-zA-Z0-9_]*$/.test(username),
    notEmpty: username.length > 0,
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        username: data.username,
        email: data.email || undefined,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Account created successfully!", {
        description: "You can now access the system",
      });
      navigate("/products");
    } catch (err: any) {
      const errorMessage = err.message || "Please try again with different credentials.";
      toast.error("Registration failed", {
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Account</CardTitle>
        <CardDescription>
          Register to get started with Restaurant Management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Registration Requirements:
              </p>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li>• Username: 3-50 characters (letters, numbers, underscore)</li>
                <li>• Password: Minimum 8 characters</li>
                <li>• Email: Optional but recommended</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder="Choose a username"
              autoComplete="username"
              className={errors.username ? "border-red-500" : ""}
            />
            
            {username.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  {usernameChecks.length ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span className={usernameChecks.length ? "text-green-600" : "text-red-500"}>
                    At least 3 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {usernameChecks.validChars ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span className={usernameChecks.validChars ? "text-green-600" : "text-red-500"}>
                    Only letters, numbers, and underscores
                  </span>
                </div>
              </div>
            )}
            
            {errors.username && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">
              Email <span className="text-gray-500 text-sm">(optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your@email.com"
              autoComplete="email"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              autoComplete="new-password"
              className={errors.password ? "border-red-500" : ""}
            />
            
            {password.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  {passwordChecks.length ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                  )}
                  <span className={passwordChecks.length ? "text-green-600" : "text-red-500"}>
                    At least 8 characters
                  </span>
                </div>
              </div>
            )}
            
            {errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Login here
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
