import React, {useContext, createContext} from "react";
import { useAddress, useContract, useMetamask, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x5e7B3804A6c4222ceE27AaF1488560bfb6B60e18");
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")

    const address = useAddress();
    const connect = useMetamask();

    //For creating a campaign
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
    //For getting the details of all the campaigns in the blockchain
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
            target: campaign.target,
            deadline:campaign.deadline,
            amountcollected: campaign.amountcollected,
            image:campaign.image,
            pId: i
        }))
        // const parsedCampaigns = campaigns.map((campaign, i)=>({
        //     pId : i
        // }))
        // console.log(parsedCampaigns);    //it shows the details of the campaign in the console

        return parsedCampaigns;
    }
    // //For getting the pId of the users
    // const getpId = async () =>{
    //     const campaigns = await contract.call
    //     ('getCampaigns');
    //     const pID = campaigns.map((campaign, i)=>({
    //         pId : i
    //     }))
       
    //     console.log(pID);
    //     console.log("pId executed") ;
    //     return pID;
    // }

    //For getting the campaigns only published by that logged in user
    const getUserCampaigns = async()=>{
        const allCampaigns = await getCampaigns();

        const filteredCampaigns = allCampaigns.filter((campaign)=>campaign.owner === address); 

        return filteredCampaigns;
    }
    
    //For making donations
    const donate = async (pId, amount)=> {
    
        const data = await contract.call('donateToCampaign', [pId], {value: ethers.utils.parseEther(amount)});
        return data;  
    }

    //For getting all of the donations
    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for(let i = 0; i <numberOfDonations; i++){
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())

            })
        }
        return parsedDonations;
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
            getUserCampaigns,
            donate,
            getDonations,
            // getpId
        }}>
            {children}
        </StateContext.Provider> 
    )
}
export const useStateContext = () => useContext(StateContext);
