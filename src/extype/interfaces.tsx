export interface songDataInterface {
  uri: string;
  album: {
    images: [{ url: string }];
    name: string;
    artist: string;    
  };
  name: string;
  artists: [{ name: string }];
  isSelected: boolean;
}

export interface selectedInterface {
  uri: string;
}

export interface songUrisInterface {
  songUris: selectedInterface["uri"][];
  useSelector: boolean;
}

export interface tokenState {
  value: string;
}

export interface searchInterface {
  setSearchSong: (value: string) => void;
  getSong: () => void;
}

export interface songInterface {
  uri: string;
  image: string;
  title: string;
  album: string;
  artists: string;
  selectState: (uri: string) => void;
  isSelected: boolean;
  url: string;  
  name: string;
  class: string;
}

