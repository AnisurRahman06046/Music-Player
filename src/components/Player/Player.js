import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import song1 from '../../assets/tujhe_kitna.mp3'
import {AiFillPlayCircle,AiFillPauseCircle} from 'react-icons/ai'
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

const Player = () => {
    const [isPlaying,setIsPlaying]=useState(false);
    const [play,{pause,duration,sound}]=useSound(song1);
    const [currentTime,setCurrentTIme]=useState({
        min:'',
        sec:''
    });
    const [seconds,setSeconds]=useState();
    const [time,setTime]=useState({})


    const playingButton=()=>{
        if(isPlaying){
            pause()
            setIsPlaying(false)
        }
        else{
            play()
            setIsPlaying(true)
        }
    }
    useEffect(()=>{
        const sec = duration/1000;
        const min = Math.floor(sec/60);
        const secRemain = Math.floor(sec%60);
        const time={
            min:min,
            sec:secRemain
        }
        setTime(time)
    },[])
    useEffect(() => {
        const interval = setInterval(() => {
          if (sound) {
            setSeconds(sound.seek([])); 
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrentTIme({
              min,
              sec,
            });
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [sound]);

    return (
        <div className="component">
        <h2>Playing Now</h2>
        <img
          className="musicCover"
          src="https://pagalsong.in/uploads//thumbnails/300x300/id3Picture_102009727.jpg"
        />
        <div>
          <h3 className="title">Kabir Singh</h3>
          <p className="subTitle">Tujhe Kitna</p>
        </div>
        <div>
          <button className="playButton">
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <BiSkipPrevious />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button className="playButton" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="playButton" onClick={playingButton}>
              <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                <AiFillPauseCircle />
              </IconContext.Provider>
            </button>
          )}
          <button className="playButton">
            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
              <BiSkipNext />
            </IconContext.Provider>
          </button>
        </div>
        <div>
        <div className="time">
          <p>
            {currentTime.min}:{currentTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
            
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      </div>
    );
};

export default Player;