export interface DashboardProps {
  code: string;
}

export interface RequestAccessProps {
  urlCode: string | null;
  onTokenReceived: (expiresIn: number) => void;
}

// Define the structure of the track's artist
interface Artist {
  name: string;
}

// Define the structure of the album's image
interface AlbumImage {
  url: string;
}

// Define the structure of the album
interface Album {
  images: AlbumImage[];
}

// Define the structure of the track item
interface TrackItem {
  artists: Artist[];
  name: string;
  id: string;
  uri: string;
  album: Album;
}

// Define the structure of the API response data
export interface SpotifyItemsResponse {
  body: {
    items: TrackItem[];
  };
}

export interface SpotifyTracksResponse {
  body: {
    tracks: TrackItem[];
  };
}

// Define the Track type that you'll use in the component state
export interface Track {
  artist: string;
  title: string;
  id: string;
  uri: string;
  img: string;
}
