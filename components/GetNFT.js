import { useState } from "react"
import { ethers, BigNumber } from "ethers"
import ContractABI from "./ContractAbi.json"

const Address = "0x82C8C6231E7a4c40d014cb426a49B42863524C88"

const GetNFT = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0])

  // All State Variables
  const [pageNumber, setPageNumber] = useState(1)
  const [nfts, setNfts] = useState([])
  const [selectedNft, setSelectedNft] = useState(null)

  const pageSize = 10

  async function getNFTs() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)

      const nftContract = new ethers.Contract(Address, ContractABI, provider)

      try {
        const totalSupply = await nftContract.totalSupply()
        const start = (pageNumber - 1) * pageSize
        const end = Math.min(start + pageSize, Number(totalSupply))

        const newNfts = []

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
  }

  return (
    <div>
      <div className=" flex items-center w-full mt-20 justify-center ">
        <button
          onClick={handleGetNftsClick}
          className="bg-zinc-300 hover:bg-zinc-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Get Total Nft
        </button>
      </div>

      <div className="grid grid-cols-5 gap-8 mt-10 items-center w-[90%] m-auto pb-10">
        {nfts.map((nft) => (
          <div
            key={nft.tokenId}
            className="border border-gray-700 p-4 hover:bg-zinc-900 hover:border-black transform duration-200 cursor-pointer"
          >
            <img src={nft.metadata.image} alt={nft.metadata.name} />
            <p className="text-center py-2">ID: {nft.tokenId.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default GetNFT
