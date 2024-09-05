import React from 'react';

const VideoFeed = () => {
    return (
        <div>
            <h1>Gender Classification Video Feed</h1>
            {/* Video stream */}
            <img
                src="http://localhost:5000/video_feed"
                alt="Video Feed"
                style={{ width: '100px', height: 'auto', border: '2px solid #000' }}
            />
        </div>
    );
};

export default VideoFeed;