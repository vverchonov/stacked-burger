'use client';

const VideoBlock = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/franchise/video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)'
        }}
      />

     
    </div>
  );
};

export default VideoBlock;
