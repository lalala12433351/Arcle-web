declare global {
    interface Window {
        YT?: {
            Player: any;
            PlayerState: {
                UNSTARTED: number;
                ENDED: number;
                PLAYING: number;
                PAUSED: number;
                BUFFERING: number;
                CUED: number;
            };
            loaded?: number;
        };
        onYouTubeIframeAPIReady?: () => void;
    }
}

export {};
