import React, { useState, useEffect } from "react"
import Link from "next/link"
import GetNFT from "./GetNFT"

import { ethers } from "ethers"
import { AiOutlineClose } from "react-icons/ai"

// Contract Details
import ContractABI from "./ContractAbi.json"
const Address = "0x82C8C6231E7a4c40d014cb426a49B42863524C88"

const NftModal = ({ setOpenModel, selectedNftDetails }) => {
  // State variables
  const [nftDetails, setNftDetails] = useState(null)

  async function getSelectedNFT() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)

      try {
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
    <div className="fixed inset-0 bg-black/90 z-10 mt-8 font-robot ">
      <div className="max-w-lg mx-auto p-4 bg-zinc-300 rounded-lg ">
        {nftDetails && (
          <div className="my-4">
            <button
              className=" text-zinc-700 hover:text-zinc-200 transform duration-200  m-auto "
              onClick={() => setOpenModel(false)}
            >
              <AiOutlineClose size={25} className="" />
            </button>
            <h2 className="text-zinc-700 text-2xl font-semibold text-center py-2 mb-2 ">
              {nftDetails.metadata.name}
            </h2>
            <img
              src={nftDetails.metadata.image}
              alt={nftDetails.metadata.name}
              className="mb-8 w-full rounded-md shadow-lg shadow-black "
            />

            <p className="text-gray-700 text-base py-2 font-semibold">
              {nftDetails.metadata.description}
            </p>
            <p className="text-gray-700 text-base ">
              NFT ID: {nftDetails.tokenId.toString()}
            </p>
            <p className="text-gray-700 text-base">
              Owner : {nftDetails.owner}
            </p>
            <div className="text-center items-center  py-4">
              <Link
                href={`https://opensea.io/assets/ethereum/${Address}/${nftDetails.tokenId.toString()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-zinc-300 hover:bg-zinc-500/60 transform duration-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Buy
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default NftModal
