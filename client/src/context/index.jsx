import React, {useContext, createContext} from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x01EB976069b234146EB7A6B2aBaA15dc10d3F8F5");
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
    

    return (
        //something to share across all of the components
        <StateContext.Provider
        value={{
            address,
            contract,
            connect,
            createCampaign:publishCampaign,
        }}>
            {children}
        </StateContext.Provider> 
    )
}
export const useStateContext = () => useContext(StateContext);