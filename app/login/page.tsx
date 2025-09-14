"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { email, z } from "zod";
import axios from "axios";

// Zod schema for form validation
const LoginSchema = z.object({
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFields = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFields>({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/authentication/login`,
        {
          email: form.email,
          password: form.password,
        }
      );
      router.push("/posts/new"); // Redirect to writer page after login
    } catch {
      return;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-base-100 border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <form onSubmit={onSubmit} noValidate className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={`input input-bordered w-full`}
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((s) => ({ ...s, email: e.target.value }))
              }
              disabled={submitting}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className={`input input-bordered w-full pr-16`}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm((s) => ({ ...s, password: e.target.value }))
                }
                disabled={submitting}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-full"
            disabled={submitting}
          >
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-xs text-base-content/60 mt-4">
          After login, you’ll be redirected to the writer page if authorized.
        </p>
      </div>
    </main>
  );
}
