import React, { useState } from "react"

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
    <div className=" flex items-center w-full mt-10 justify-center ">
      {/* Connect Button */}
      {isConnected ? (
        <div>
          {" "}
          <button
            onClick={connectAccount}
            className="bg-zinc-300 hover:bg-zinc-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Connected
          </button>{" "}
        </div>
      ) : (
        <div>
          <button
            onClick={connectAccount}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Connect
          </button>
        </div>
      )}
    </div>
  )
}

export default Connect
