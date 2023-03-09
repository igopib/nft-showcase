import { useState } from "react"
import NftModal from "./NftModal"

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

        const newNfts = []

        // Looping through the
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

  function handleGetNftsClick() {
    getNFTs()
    setPageNumber(pageNumber + 1)
    setSelectedNftDetails(null)
  }

  return (
    <div className="py-8">
      <div className=" flex items-center w-full mt-10 justify-center ">
        <button
          onClick={handleGetNftsClick}
          className="bg-zinc-800 hover:bg-zinc-200 transform duration-300 text-white hover:text-zinc-800 font-semibold py-2 px-4 border border-white rounded"
        >
          Load NFT's
        </button>
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
