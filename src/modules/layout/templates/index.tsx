import React from "react"
import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full overflow-x-hidden">
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
