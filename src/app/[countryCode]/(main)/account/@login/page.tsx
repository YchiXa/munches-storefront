import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Вход",
  description: "Войдите в аккаунт Medusa Store",
}

export default function Login() {
  return <LoginTemplate />
}
