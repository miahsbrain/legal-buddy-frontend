import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("upload", "routes/upload.tsx"),
  route("demo", "routes/demo.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("summary", "routes/summary.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("login", "routes/login.tsx"),
  route("signup", "routes/signup.tsx"),
] satisfies RouteConfig;
