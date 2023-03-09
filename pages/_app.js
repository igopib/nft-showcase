import { useState } from "react"
import "../styles/globals.css"
import Nav from "../components/Nav"
import GetNFT from "../components/GetNFT"

export default function App({ Component, pageProps }) {
  const [accounts, setAccounts] = useState([])
  return (
    <div>
      <Nav accounts={accounts} setAccounts={setAccounts} />
      <GetNFT accounts={accounts} setAccounts={setAccounts} />
      <Component {...pageProps} />
    </div>
  )
}
