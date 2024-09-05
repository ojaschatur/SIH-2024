import React from 'react';
import './ModelComponent.css';

const VideoFeed = () => {
    return (
        <div>
            <h1 class="Model-component-h1"><span>Live CCTV </span> Footage</h1>
            <p class="Model-component-p">This heatmap visually represents the distribution and frequency of crimes against women across different states of India, with darker areas indicating higher crime rates. By providing real-time insights, it helps identify hotspots and trends to enhance safety measures and law enforcement response.y</p>
            {/* Video stream */}
            <img
                src="http://localhost:5000/video_feed"
                alt="Video Feed"
            />
        </div>
    );
};

export default VideoFeed;