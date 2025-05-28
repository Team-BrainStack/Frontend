import { serverUrl } from "@/lib/environment";
import { usernameClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const betterAuthClient = createAuthClient({
    baseURL: serverUrl,
    basePath:"/auth",
    plugins: [usernameClient(), nextCookies()],
});

export default betterAuthClient