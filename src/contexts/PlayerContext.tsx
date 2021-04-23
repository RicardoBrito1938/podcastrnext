import {createContext, ReactNode, useContext, useState} from 'react'

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping:boolean;
    isShuffling: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    setPlayingState: (state: boolean) => void;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index : number) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
}

type PlayerContextProviderProps = {
    children: ReactNode
}

export const PlayerContext = createContext({} as PlayerContextData)


export const PlayerContextProvider = ({children}:PlayerContextProviderProps) => {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)


  
    const play = (episode : Episode) => {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true)
    }

    const playList = (list: Episode[], index: number) => {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }
  
    const togglePlay = () => {
      setIsPlaying(!isPlaying)    
    }

    const toggleLoop = () => {
        setIsLooping(!isLooping)    
      }

      const toggleShuffle = () => {
        setIsShuffling(!isShuffling)    
      }
  
  
    const setPlayingState = (state: boolean) => {
      setIsPlaying(state)
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) >= episodeList.length

    const playNext = () => {
        if(isShuffling) {
            const nexRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nexRandomEpisodeIndex)
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        }        
    }

    const playPrevious = () => {
        const previousEpisode = currentEpisodeIndex - 1

        if(previousEpisode <= 0) {
            return;
        }

        setCurrentEpisodeIndex(previousEpisode)
    }

    const clearPlayerState = () => {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }
  
  
    return (
      <PlayerContext.Provider value={{ 
          episodeList,
          playList,
          currentEpisodeIndex,
          play,
          isPlaying,
          togglePlay,
          setPlayingState,
          playNext,
          playPrevious,
          hasNext,
          hasPrevious,
          isLooping,
          toggleLoop,
          toggleShuffle,
          isShuffling,
          clearPlayerState
          }}>
          {children}
      </PlayerContext.Provider>)
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}



 