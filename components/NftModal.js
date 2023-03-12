import React, { useState, useEffect } from "react"
import Link from "next/link"
import GetNFT from "./GetNFT"

import { ethers } from "ethers"
import { SlClose } from "react-icons/sl"

// Contract Details
const Address = "0x82C8C6231E7a4c40d014cb426a49B42863524C88"

const NftModal = ({ setOpenModel, selectedNftDetails }) => {
  // State variables
  const [nftDetails, setNftDetails] = useState(null)

  async function getSelectedNFT() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)

      try {
        // Here NFT stats are saved as a local state, but we get the inital value from GetNFT .
        setNftDetails(selectedNftDetails)
      } catch (err) {
        console.log("error: ", err)
      }
    }
  }

  useEffect(() => {
    getSelectedNFT()
  }, [selectedNftDetails])

  return (
    <div className="fixed inset-0 bg-black/80 z-10 py-8 font-robot ">
      <div className="w-[27rem] min-h-full mx-auto  px-12 bg-zinc-300 rounded-xl text-center ">
        {nftDetails && (
          <div className="my-4">
            <h2 className="text-zinc-700 text-2xl font-semibold text-center py-4 mb-2 ">
              {nftDetails.metadata.name}
            </h2>
            <img
              src={nftDetails.metadata.image}
              alt={nftDetails.metadata.name}
              className="mb-8 w-full rounded-md shadow-lg shadow-black max-w-[80%] m-auto"
            />
            <p className="text-gray-700 text-base py-2 mb-8 font-semibold">
              {nftDetails.metadata.description}
            </p>
            <p className="text-gray-700 text-base ">
              NFT ID: {nftDetails.tokenId.toString()}
            </p>
            <Link
              href={`https://etherscan.io/address/${nftDetails.owner}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-gray-700 text-base overflow-hidden hover:text-zinc-500 transform duration-300 ">
                Owner : <span className="truncate">{nftDetails.owner}</span>
              </p>
            </Link>
            <div className="text-center items-center  py-4">
              <Link
                href={`https://opensea.io/assets/ethereum/${Address}/${nftDetails.tokenId.toString()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="mt-3 bg-zinc-300 text-lg hover:bg-[#161616] transform duration-300 text-gray-800 hover:text-white hover:shadow-lg hover:shadow-black  font-semibold py-2 px-8 border border-[#161616] rounded-md">
                  Buy
                </button>
              </Link>
            </div>
            <div className="justify-center flex pt-4">
              <button
                className=" text-zinc-700 hover:text-zinc-200 transform duration-200  m-auto text-center"
                onClick={() => setOpenModel(false)}
              >
                <SlClose size={30} className="text-center" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NftModal
