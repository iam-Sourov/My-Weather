import React from 'react';
import { FaCloudSun } from 'react-icons/fa';

const Spinner = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className="animate-pulse p-2 bg-white/6 rounded-lg weather-card flex items-center gap-2">
                <FaCloudSun className="text-2xl" />
                <span className="font-semibold">WeatherUI.....</span>
            </div>
        </div>
    );
};

export default Spinner;