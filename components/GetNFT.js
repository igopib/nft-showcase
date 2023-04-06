import { useState, useEffect } from "react"
import NftModal from "./NftModal"
import Link from "next/link"

import { ethers } from "ethers"

// Contract Details
import ContractABI from "./ContractAbi.json"
// const Address = "0x82C8C6231E7a4c40d014cb426a49B42863524C88"

const GetNFT = ({}) => {
  const pageSize = 8
  // All State Variables
  const [address, setAddress] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const [nfts, setNfts] = useState([])
  const [openModel, setOpenModel] = useState(false)
  const [selectedNftDetails, setSelectedNftDetails] = useState(null)

  // This will speed things up since only first time will create contract instance, it will be cached for later (singleton)
  const nftContractInstance = null
  const getNFTContractInstance = async () => {
    if (nftContractInstance) {
      return nftContractInstance
    } else {
      const provider = new ethers.BrowserProvider(window.ethereum)

      // Ethers contract instance
      const nftContract = new ethers.Contract(address, ContractABI, provider)

      return nftContract
    }
  }

  const loadNfts = async (page) => {
    const nftContract = await getNFTContractInstance()

    try {
      const totalSupply = await nftContract.totalSupply()
      const start = (page - 1) * pageSize
      const end = Math.min(start + pageSize, Number(totalSupply))

      // Array to store all the nfts
      const newNfts = []

      // Looping through the NFT's
      for (let i = start; i < end; i++) {
        const tokenId = await nftContract.tokenByIndex(i)
        const tokenURI = await nftContract.tokenURI(tokenId)
        const metadataResponse = await fetch(tokenURI)
        const metadata = await metadataResponse.json()
        const owner = await nftContract.ownerOf(tokenId)
        newNfts.push({ tokenId, metadata, owner })
      }

      // Update the state with the new NFTs
      setNfts(nfts.concat(newNfts))
    } catch (err) {
      console.log("error: ", err)
    }
  }

  function handleNewPage() {
    setPageNumber(pageNumber + 1)
    setSelectedNftDetails(null)
  }

  return (
    <div className="py-8 w-full">
      <div>
        {/* <Link
          href={`https://etherscan.io/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-center text-sm text-zinc-400 hover:text-white transform duration-300 w-[50%] m-auto">
            {address}
          </p>
        </Link> */}
        <div className=" w-[60%] m-auto flex items-center mt-10 justify-center gap-8 ">
          <input
            className=" placeholder:text-zinc-800 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-zinc-300 focus:ring-zinc-300 focus:ring-1 sm:text-sm text-zinc-800"
            placeholder="Contract Address"
            type="text"
            name="search"
            defaultValue={address}
          />
          <button
            onClick={() =>
              setAddress(document.getElementsByName("search")[0].value)
            }
            className="bg-black/30 hover:bg-zinc-200 transform duration-300  text-white hover:shadow-lg hover:shadow-black hover:text-zinc-800 font-semibold py-1 px-8 border border-white rounded-lg"
          >
            Set Address
          </button>
        </div>

        <div className=" flex items-center w-full mt-10 justify-center ">
          <button
            onClick={() => loadNfts(pageNumber)}
            className="bg-black/30 hover:bg-zinc-200 transform duration-300  text-white hover:shadow-lg hover:shadow-black hover:text-zinc-800 font-semibold py-2 px-4 border border-white rounded-lg"
          >
            Load NFT's
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-10 items-center w-[90%] m-auto ">
        {nfts.map((nft) => (
          <div
            onClick={() => {
              setSelectedNftDetails(nft)
              setOpenModel(true)
            }}
            key={nft.tokenId}
            className="border border-zinc-800 p-4 bg-black/30 hover:bg-zinc-300 hover:shadow-xl hover:shadow-black hover:border-black/80 hover:scale-105 hover:text-black transform duration-200 cursor-pointer rounded-lg"
          >
            <img
              src={nft.metadata.image}
              alt={nft.metadata.name}
              className="rounded-lg"
            />
            <p className="text-center pt-4">ID: {nft.tokenId.toString()}</p>
          </div>
        ))}
      </div>
      {openModel && (
        <NftModal
          setOpenModel={setOpenModel}
          selectedNftDetails={selectedNftDetails}
        />
      )}
    </div>
  )
}
export default GetNFT
