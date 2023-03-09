import React, { useState } from "react"
import Link from "next/link"

const Connect = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0])

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccounts(accounts)
    }
  }

  return (
    <div className=" flex items-center w-full py-6 justify-between px-16 bg-black/30">
      <div className="text-2xl hover:text-zinc-400 transform duration-200 font-semibold ">
        <Link
          href="https://igopib.github.io/devProfile/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portfolio
        </Link>
      </div>
      <div className="text-2xl hover:text-zinc-400 transform duration-200 mr-8 font-semibold">
        <Link
          href="https://github.com/igopib/nft-showcase"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </Link>
      </div>
      {/* Connect Button */}
      {isConnected ? (
        <div>
          {" "}
          <button
            onClick={connectAccount}
            className="bg-zinc-800hover:bg-zinc-200 transform duration-300 text-white hover:text-zinc-800 font-semibold py-2 px-4 border border-white rounded"
          >
            Connected
          </button>{" "}
        </div>
      ) : (
        <div>
          <button
            onClick={connectAccount}
            className="bg-zinc-800 hover:bg-zinc-200 transform duration-300 text-white hover:text-zinc-800 font-semibold py-2 px-4 border border-white rounded"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  )
}

export default Connect
