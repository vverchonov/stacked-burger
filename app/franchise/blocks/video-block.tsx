'use client';

const VideoBlock = () => {
  return (
    <div className="relative w-full mt-[7vh] h-auto sm:h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        className="w-full sm:absolute sm:top-0 sm:left-0 sm:h-full sm:object-cover object-contain"
      >
        <source src="/franchise/video.MP4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 hidden sm:block"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
        }}
      />
    </div>
  );
};

export default VideoBlock;
