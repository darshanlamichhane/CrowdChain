import React from 'react'
import { useNavigate } from 'react-router-dom'

import { loader } from '../assets'
import Fundcard from './Fundcard'
const DisplayCampaigns = ({title, isLoading, campaigns}) => {
    const navigate = useNavigate();

    // To handle the navigation...increasing code readability
    const handleNavigate = (campaign) => {
      navigate(`/campaign-details/${campaign.title}`, {state: campaign})

    }
  return (
    <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title}({campaigns.length})</h1> 
        {/* watch at 2:20 if length not showing */}

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
                <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}

            {!isLoading && campaigns.length === 0 &&(
              <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]" >
                You have not created any campaigns yet. 
              </p>
            )}
            {/* If we have campaigns and want to display them */}
            {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <Fundcard  //Error here: campaigns.length not showing
            key = {campaign.id}
            {...campaign}
            handleClick = {() => handleNavigate(campaign)}
            // Handlenavigate is defined above
            //also need to define Fundcard...defined in components
            //Fundcard is used for displaying all of the campaigns in the form of cards
            />)}
              
        </div>
    </div>
  )
}

export default DisplayCampaigns