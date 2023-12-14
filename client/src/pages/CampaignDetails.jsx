import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';


const CampaignDetails = () => {
  //we can transfer state through routing
  //we have transferred the state to campaign details on display campaigns whenever a campaign is clicked.
  const {state} = useLocation();
  const amountCollectedValue = ethers.utils.formatEther(state.amountcollected); // Convert BigNumber to string
  const targetValue = ethers.utils.formatEther(state.target); // Convert BigNumber to string

  // console.log(amountCollectedValue, targetValue);

// Now, you can use these string values as needed

  // console.log(ethers.utils.formatEther((state.amountcollected).toString()));
  const{donate, getDonations, contract, address} = useStateContext();
  const [isLoading, setisLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const[donators, setDonators] = useState([]);
  // const[pId, setpId] = useState('');
  

  //need to change the deadline to a number
  
  // const deadlinenumber = parseInt(state.deadline.toString(), 10);
  // const deadlinenumber = state.deadline.toNumber();
  const hexString = state.deadline._hex.substring(2); // Remove "0x" prefix
  const deadlineNumber = parseInt(hexString, 16);

  const remainingDays = daysLeft(deadlineNumber);
  
  // console.log(state.pId);

  // const fetchID = async() =>{
  //   const ID = await getpId();
  //   setpId(ID);
  // }
  //Generated 4 id's 
  // useEffect(()=>{
  //   if(contract) fetchID();
  // },[contract, address])
  
  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }
  


  useEffect(()=> {
    if(contract) fetchDonators();
  },[contract, address])

  const handleDonate = async() =>{
    setisLoading(true);
    
    await donate(state.pId, amount);

    setisLoading(false);
  }

  
  // console.log(remainingDays);

  return (
    
    <div>
      {/*If loading show Loading... */}
      {isLoading && 'Loading....'}

      {/*If not loading we need to show the details */}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] objet-cover rounded-xl" />

          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            {/*We want to show how much percentage of the project has been funded */}
            <div className="absolute h-full bg-[#3a3a43] mt-2"
            style={{width: `${calculateBarPercentage(targetValue, amountCollectedValue)}%`, maxWidth:'100%'}}>
              {/*To make it dynamic style is used and a template string is created*/}
            </div>

          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value = {remainingDays}/>
          <CountBox title={`Raised of ${targetValue}`} value = {amountCollectedValue}/>
          <CountBox title="Total Backers" value = {donators.length}/>

        </div>

      </div>
      {/*For the outside part than the image and countbox */}
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>
              {/*For the image of the thirdweb and the owner address */}
              <div className="mt-[20px] flex flx-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all ">{state.owner}</h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
                </div>
              </div>
            </div>
            {/*For the story section */}
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Story</h4>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
              </div>
            </div>
            {/*For the donators section */}
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Donators</h4>
              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{index+1}.{item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">{item.donation}</p>
                  </div>
                ) ):(<p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                ) }
              </div>
            </div>

          </div>
          {/*Below the donators */}
          <div className="flex-1">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Fund</h4>
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
              <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Fund the campaign
              </p>
              <div className="mt-[30px]">
                  <input
                   type="number"
                   placeholder="ETH 0.1"
                   step="0.01"
                   className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]" 
                   value={amount}
                   onChange={(e)=>setAmount(e.target.value)}
                  />
                  <div className="mt-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="my-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Support the project for no reward, just because it speaks to you.
                    </p>
                  </div>
                  {/*For the custom button */}
                  <CustomButton
                    btnType="button"
                    title = "Fund Campaign"
                    styles = "w-full bg-[#8c6dfd]"
                    handleClick={handleDonate}
                  />
              </div>

            </div>
              
          </div>
      </div>
    </div>
  )
}

export default CampaignDetails