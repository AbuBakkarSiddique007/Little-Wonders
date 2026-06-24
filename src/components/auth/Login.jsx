"use client";

import { signIn } from "next-auth/react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialButton from "../button/SocialButton";
import { useSearchParams } from "next/navigation";

export default function Login() {

  const searchParams = useSearchParams();
  const router = useRouter()

  const handleLoginForm = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    const payload = {
      email,
      password
    }

    console.log("User Info:", payload);

    const result = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
      callbackUrl: searchParams.get('callbackUrl') || "/"
    });

    if (!result.ok) {
      toast.error("Invalid email or password")
    } else {
      toast.success("Login successful")
      router.push(searchParams.get('callbackUrl') || "/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center mb-6">Welcome Back</h2>

          <form className="space-y-4" onSubmit={handleLoginForm}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email."
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password."
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-primary">Forgot password?</a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>

          <div className="divider my-6">OR</div>

          <SocialButton></SocialButton>

          <p className="text-center mt-6 text-sm">
            Don&rsquo;t have an account?{" "}


            <Link

              // Redirect to register page with callbackUrl
              href={`/register?callbackUrl=${searchParams.get('callbackUrl') || "/"}`}

              className="link link-primary font-semibold hover:text-primary-focus transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
