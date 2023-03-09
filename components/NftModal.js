import React, { useState, useEffect } from "react"
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

      const nftContract = new ethers.Contract(Address, ContractABI, provider)

      try {
        // const tokenId = await nftContract.tokenByIndex(selectedNftDetails)
        // const tokenURI = await nftContract.tokenURI(tokenId)
        // const metadataResponse = await fetch(tokenURI)
        // const metadata = await metadataResponse.json()
        // const owner = await nftContract.ownerOf(tokenId)
        // const selectedNftDetails = { tokenId, metadata, owner }

        setNftDetails(selectedNftDetails)
        console.log(nftDetails)
      } catch (err) {
        console.log("error: ", err)
      }
    }
  }

  useEffect(() => {
    getSelectedNFT()
  }, [selectedNftDetails])

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-80 z-50">
      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-xl">
        <button
          className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setOpenModel(false)}
        >
          <AiOutlineClose size={30} />
        </button>
        {nftDetails && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">
              {nftDetails.metadata.name}
            </h2>
            <p className="text-gray-700 text-base">
              {nftDetails.metadata.description}
            </p>
            <p className="text-gray-700 text-base">
              Token ID: {nftDetails.tokenId.toString()}
            </p>
            <p className="text-gray-700 text-base">Owner: {nftDetails.owner}</p>
            <img
              src={nftDetails.metadata.image}
              alt={nftDetails.metadata.name}
              className="mt-4 w-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default NftModal
