"use client";

import { postUser } from "@/action/server/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import SocialButton from "../button/SocialButton";

export default function Register() {
  const searchParams = useSearchParams()

  const router = useRouter()

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    console.log("Register form submitted...");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const payload = {
      name,
      email,
      password
    }

    console.log("Register Info:", payload);

    const result = await postUser(payload);

    if (result.success) {
      toast.success(result.message);

      // Auto Sign In after registration
      const autoSignIn = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
        callbackUrl: searchParams.get('callbackUrl') || "/"
      });

      console.log("Auto Sign In Result:", autoSignIn);

      if (autoSignIn.ok) {
        toast.success("Registration successful");
        router.push(searchParams.get('callbackUrl') || "/");
      } else {
        toast.error("Registration failed");
      }


    } else {
      toast.error(result.message);
    }


  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold justify-center mb-6">Create an Account</h2>

          <form className="space-y-4" onSubmit={handleRegisterForm}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

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
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full">Register</button>
            </div>


          </form>

          <div className="divider my-6">OR</div>

          {/* <button className="btn btn-outline w-full flex items-center gap-2">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button> */}
          <SocialButton></SocialButton>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link

              // Redirect to login page with callbackUrl
              href={`/login?callbackUrl=${searchParams.get('callbackUrl') || "/"}`}

              className="link link-primary font-semibold hover:text-primary-focus transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
