import { useState } from "react"
import "@/styles/globals.css"
import Connect from "../components/Connect"
import GetNFT from "../components/GetNFT"

export default function App({ Component, pageProps }) {
  const [accounts, setAccounts] = useState([])
  return (
    <div>
      <Connect accounts={accounts} setAccounts={setAccounts} />
      <GetNFT accounts={accounts} setAccounts={setAccounts} />
      <Component {...pageProps} />
    </div>
  )
}
