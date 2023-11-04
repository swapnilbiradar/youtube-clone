import React, { useEffect } from 'react'
import{useState, useEfect} from 'react'
import {useParams } from 'react-router-dom'
import {Box } from '@mui/material'
import {Videos, ChannelCard} from './'
import {fetchAPI} from '../utils/fetchAPI'

const ChannelDetails = () => {
  const {id}= useParams()
  const [channelDetails,setChannelDetails]= useState(null)
  const [videos,setVideos]= useState([])

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchAPI(`channels?part=snippet&id=${id}`);

      setChannelDetails(data?.items[0]);

      const videosData = await fetchAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
      <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetails} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex" >
        <Box sx={{mr:{sm:'100px'}}}/>
          <Videos videos={videos}  />

     
      </Box>

    </Box>
  )
}

export default ChannelDetails
