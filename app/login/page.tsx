"use client";
import { useState, FormEvent, ChangeEvent } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your login logic here
      console.log("Login attempt:", { email, password, rememberMe });
      // Example: await loginAPI(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
        <form onSubmit={handleSubmit}>
          <h5 className="text-xl font-semibold text-heading mb-6">Log in</h5>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="example@company.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="•••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="flex items-start my-6">
            <div className="flex items-center">
              <input
                id="checkbox-remember"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
              />
              <label
                htmlFor="checkbox-remember"
                className="ms-2 text-sm font-medium text-heading"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm font-medium text-fg-brand hover:underline"
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-brand box-border border border-transparent cursor-pointer hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="text-sm font-medium text-body">
            Not registered?{" "}
            <a href="#" className="text-fg-brand hover:underline">
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
