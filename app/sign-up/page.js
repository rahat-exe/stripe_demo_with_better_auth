"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SignUp = () => {
    const router = useRouter();
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    if (res?.error) {
      console.log(res.error);
    }
    if(!res?.error){
        router.push("/sign-in")
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Register with email and password</CardTitle>
          <form onSubmit={handleEmailSignUp}>
            <Input name="name" placeholder="name" required type="text" />
            <Input 
                name="email" 
                placeholder="email" 
                required 
                type="email" />
            <Input
              name="password"
              placeholder="Password"
              required
              type="password"
            />
            <Button type="submit">Sign In</Button>
          </form>
          <CardTitle>
            Have an account?? <Link href="/sign-in">Sign in</Link>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignUp;
