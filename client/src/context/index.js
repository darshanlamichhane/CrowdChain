import React, {useContext, createContext} from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const {contract} = useContract('0x01EB976069b234146EB7A6B2aBaA15dc10d3F8F5');
    const {mutateAsync : createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    
}