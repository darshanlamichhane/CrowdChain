import React, {useContext, createContext} from "react";
import { useAddress, useContract, useMetamask, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x5e7B3804A6c4222ceE27AaF1488560bfb6B60e18");
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
          const data = await createCampaign({
                    args: [
                        address, // owner
                        form.title, // title
                        form.description, // description
                        form.target,
                        new Date(form.deadline).getTime(), // deadline,
                        form.image,
                    ],
                });
    
                console.info("contract call successs", data);
            } catch (err) {
              console.error("contract call failure", err);
            }
      }

    const getCampaigns = async () => {
        const campaigns = await contract.call
        ('getCampaigns');
        // const { data, isLoading } = useContractRead(contract, "getCampaigns", [{{args}}])
        // const campaigns = useContractRead(contract, "getCampaigns")

        const parsedCampaigns = campaigns.map((campaign, i)=>({
            //we have an object
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline:campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountcollected.toString()),
            image:campaign.image,
            pId: i
        }))
        console.log(parsedCampaigns);

        return parsedCampaigns;
    }
    

    return (
        //something to share across all of the components
        <StateContext.Provider
        value={{
            address,
            contract,
            connect,
            createCampaign:publishCampaign,
            getCampaigns,
        }}>
            {children}
        </StateContext.Provider> 
    )
}
export const useStateContext = () => useContext(StateContext);