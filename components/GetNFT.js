import { useState, useEffect } from "react"
import NftModal from "./NftModal"
import Link from "next/link"

import { ethers, BigNumber } from "ethers"

// Contract Details
import ContractABI from "./ContractAbi.json"
const Address = "0x82C8C6231E7a4c40d014cb426a49B42863524C88"

const GetNFT = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0])

  // All State Variables
  const [pageNumber, setPageNumber] = useState(1)
  const [nfts, setNfts] = useState([])
  const [openModel, setOpenModel] = useState(false)
  const [selectedNftDetails, setSelectedNftDetails] = useState(null)

  // Set the size of acquired nfts every click of the button
  const pageSize = 10

  async function getNFTs() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)

      // Ethers contract instance
      const nftContract = new ethers.Contract(Address, ContractABI, provider)

      try {
        const totalSupply = await nftContract.totalSupply()
        const start = (pageNumber - 1) * pageSize
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

        // console.log(`Page ${pageNumber} - ${newNfts.length} NFTs:`, newNfts)

        // Update the state with the new NFTs
        setNfts([...nfts, ...newNfts])
      } catch (err) {
        console.log("error: ", err)
      }
    }
  }

  // Effects runs the following function (handleGetNftsClick) to start up when the page loads
  useEffect(() => {
    handleGetNftsClick()
  }, [])

  // Function runs our getNFTs adds more nfts to our array newNfts on every click
  const handleGetNftsClick = async () => {
    await getNFTs()
    setPageNumber(pageNumber + 1)
    setSelectedNftDetails(null)
  }

  return (
    <div className="py-8">
      <div>
        <Link
          href="https://etherscan.io/address/0x82c8c6231e7a4c40d014cb426a49b42863524c88"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-center text-sm text-zinc-400 hover:text-white transform duration-300 w-[50%] m-auto">
            0x82C8C6231E7a4c40d014cb426a49B42863524C88
          </p>
        </Link>
        <div className=" flex items-center w-full mt-10 justify-center ">
          <button
            onClick={handleGetNftsClick}
            className="bg-zinc-800 hover:bg-zinc-200 transform duration-300 text-white hover:text-zinc-800 font-semibold py-2 px-4 border border-white rounded"
          >
            Load NFT's
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-8 mt-10 items-center w-[90%] m-auto ">
        {nfts.map((nft) => (
          <div
            onClick={() => {
              setSelectedNftDetails(nft)
              setOpenModel(true)
            }}
            key={nft.tokenId}
            className="border border-zinc-400 p-4 hover:bg-zinc-300 hover:border-black/0 hover:text-black transform duration-200 cursor-pointer rounded-lg "
          >
            <img
              src={nft.metadata.image}
              alt={nft.metadata.name}
              className="rounded-lg"
            />
            <p className="text-center py-2">ID: {nft.tokenId.toString()}</p>
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
