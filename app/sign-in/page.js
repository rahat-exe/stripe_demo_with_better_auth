"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    const res = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (res?.error) {
      console.log(res.error);
    }
  };
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");


    const res = await authClient.signIn.email({
        email,
        password,
        callbackURL:"/"
    });

    if(res?.error){
        console.log(res.error)
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login with google</CardTitle>
          <Button onClick={handleGoogleSignIn}>
            Click to sign with google
          </Button>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Login with email and password</CardTitle>
          <form onSubmit={handleEmailSignIn}>
            <Input name="email" placeholder="Email" required type="email" />
            <Input name="password" type="password" placeholder="Password" required />
            <Button type="submit">Sign In</Button>
          </form>
          <CardTitle>Don't have an account?? create one <Link href="/sign-up">Sign up</Link></CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignIn;
