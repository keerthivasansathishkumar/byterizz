'use client';

import { useState } from 'react';

export default function BackgroundVideo() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      <video
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        style={{ objectFit: 'cover', minHeight: '100%', minWidth: '100%' }}
        onError={() => setVideoError(true)}
      >
        {/* Try local video from Downloads first */}
        <source src="/videos/background-video.mp4.mp4" type="video/mp4" />
        <source src="/videos/background-video.mp4" type="video/mp4" />
        <source src="/videos/background.mp4" type="video/mp4" />
        <source src="/videos/background-video.webm" type="video/webm" />
        <source src="/videos/background.webm" type="video/webm" />
        
        {/* Fallback to online nature/student success videos */}
        <source 
          src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" 
          type="video/mp4" 
        />
        <source 
          src="https://videos.pexels.com/video-files/2491284/2491284-hd_1920_1080_30fps.mp4" 
          type="video/mp4" 
        />
        
        {/* Final fallback - student success/graduation video */}
        <source 
          src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Fallback background image if video fails */}
      {videoError && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        />
      )}
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900/85 via-primary-800/75 to-primary-700/65" />
    </div>
  );
}

