import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography, Stack, Box } from '@mui/material'
import CheckCircle from '@mui/icons-material/CheckCircle'
import {Videos} from './'
import {fetchAPI} from '../utils/fetchAPI'


const VideoDetails = () => {
  const [videoDetails, setVideoDetails]= useState(null)
  const [relatedVideos, setRelatedVideos]= useState(null)

  const {id}= useParams()

  useEffect(()=>{
    fetchAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data)=>setVideoDetails(data.items[0]))

    fetchAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10`)
    .then((data)=>setRelatedVideos(data.items))
  },[id]);

  if (!videoDetails) return <div>Loading...</div>
const {snippet:{title, channelId, channelTitle}, statistics:{viewCount, likeCount}}= videoDetails
  return (
    <Box midHeight='95vh'>
      <Stack direction={{xs:'column', md:'row'}}>
        <Box flex={1}>
          <Box sx={{width:'100%', position:'sticky', top:'86px'}}>
            <ReactPlayer url={`hhtps://www.youtube.com/watch?v=${id}`}
            className="react-player" controls/>
            <Typography color="#fff" variant='h5' fontWeight='bold' p={2} mt={2} mb={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{color:'#fff'}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{sm:'subtitle1', md:'h6'}} color='#fff'>
                  {channelTitle}
                  <CheckCircle sx={{fontSize:15, color:'gray', ml:'5px'}}/>
                </Typography>
              </Link>
              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{opacity:0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant={{sm:'subtitle1', md:'h6'}} color='#fff'>
                {parseInt(likeCount).toLocaleString()} likes
                </Typography>

              </Stack>

            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{md:1, xs:5 }} justifyContent='center' alignItems='center'  >
        <Typography variant='h6' fontWeight='bold' mb={2} sx={{color:'white'}}>
          Related Videos
        </Typography>
        <Videos videos={relatedVideos} direction='column'/>
        </Box>

      </Stack>
      

    </Box>
  )
}

export default VideoDetails
