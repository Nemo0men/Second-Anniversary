import React, { useState, useEffect } from 'react';
import { Heart, X, Cookie, Car, Beef, Clapperboard, HelpCircle  } from 'lucide-react';
import co from '/resources/co.jpg'; 
import emptylot from '/resources/emptylot.jpg';
import baking from '/resources/baking.jpg';
import titanic from '/resources/titanic.jpg';
import miffywallpaper from '/resources/miffywallpaper.jpg';
import miffies from '/resources/miffies.png';

function App() {
  const [name, setName] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [carPosition, setCarPosition] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.toLowerCase() === 'second') {
      setIsUnlocked(true);
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const dateItinerary = [
    {
      time: "6:00 PM",
      activity: "Pickup",
      description: "Just pickup. \nOr is it...?",
      image: emptylot,
      position: "left"
    },
    {
      time: "7:30 PM",
      activity: "Dinner at C&O",
      description: "Sponsored by Nemo.Inc. \nCheap and delicious.",
      image: co,
      position: "right"
    },
    {
      time: "9:00 PM",
      activity: "Baking Date",
      description: "Let's make cookies or brownies! \nHow do you make cookies?",
      image: baking,
      position: "center"
    },
    {
      time: "10:00 PM",
      activity: "Movie Night",
      description: "Ending our day watching \"Titanic.\" \nHopefully while eating good cookies.",
      image: titanic,
      position: "left"
    }
  ];

  useEffect(() => {
    const updateCarPosition = () => {
      // Create date object in EST
      const now = new Date();
      const estOffset = -4; // EDT is UTC-4, EST is UTC-5
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const estNow = new Date(utc + (3600000 * estOffset));

      // Check if the current date is after February 4, 2025
      const endDate = new Date(2026, 1, 4); // February 4, 2025
      if (estNow > endDate) {
        setCarPosition(100);
        return;
      }

      // Check if the current date is before February 4th of the current year
      const startDate = new Date(estNow.getFullYear(), 1, 4); // February 4th
      if (estNow < startDate) {
        setCarPosition(0);
        return;
      }

      const currentTime = estNow.getHours() * 60 + estNow.getMinutes();
      
      // Convert itinerary times to minutes since midnight
      const timePoints = dateItinerary.map(item => {
        const [time, period] = item.time.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        
        // Convert to 24-hour format
        let totalHours = hours;
        if (period === 'PM' && hours !== 12) {
          totalHours += 12;
        } else if (period === 'AM' && hours === 12) {
          totalHours = 0;
        }
        
        return totalHours * 60 + minutes;
      });

      const startTime = timePoints[0];
      const endTime = timePoints[timePoints.length - 1];
      const totalDuration = endTime - startTime;
      
      if (currentTime < startTime) {
        setCarPosition(0);
      } else if (currentTime > endTime) {
        setCarPosition(100);
      } else {
        const progress = ((currentTime - startTime) / totalDuration) * 100;
        setCarPosition(Math.min(100, Math.max(0, progress)));
      }
    };

    updateCarPosition();
    const interval = setInterval(updateCarPosition, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
      {!isUnlocked ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="h-auto max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[100%]">
              <img 
                src={miffywallpaper}
                alt="miffy wallpaper"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="relative flex flex-col h-full justify-between">
              <div>
                <img src={miffies} alt="miffies" className="h-30 mx-auto mb-8" />
                <p className="text-gray-600 text-center mb-8">
                  Welcome back! You're right on track! <br />
                  Solve this riddle for something more than just a snack! <br /> <br />

                  "When I go to McDonald's, I order a McDouble. <br />
                  Because one keeps me full, but two makes me bubble. <br />
                  I can fill my heart with things sweet as mango. <br />
                  But nothing is as sweet as two in tango. <br />
                  Our anniversary marks a single day worth to reckon. <br />
                  It's a sweet day, not the first or the third, but the ______"
                </p>
              </div>
              <div className="flex-grow"></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
                  placeholder="Enter your answer..."
                />
                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                >
                  <Heart size={20} />
                  Submit
                </button>
              </form>
              {showError && (
                <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg flex items-center gap-2">
                  <X size={18} />
                  <span>Nuh uh uhhhh</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-pink-600 text-center mb-12">
            Our Second Anniversary ♥
          </h1>
          <div className="max-w-6xl mx-auto relative">

            {/* Vertical line connecting the cards */}
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 z-0"></div>

            {/* Animated car */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000"
              style={{ top: `${carPosition}%` }}
            >
              <div className="bg-pink-100 rounded-full p-2 shadow-lg">
                <Car className="text-pink-500 w-6 h-6" />
              </div>
            </div>

            {dateItinerary.map((item, index) => (
              <div 
                key={index}
                className={`
                  relative mb-24 perspective-1000
                  ${item.position === 'left' ? 'ml-0 mr-auto' : 
                    item.position === 'right' ? 'ml-auto mr-0' : 'mx-auto'}
                  ${item.position === 'center' ? 'max-w-[250px]' : 'max-w-[250px]'}
                `}
                style={{
                  transform: `
                    ${item.position === 'left' ? 'translateX(15%) rotate(-3deg)' :
                    item.position === 'right' ? 'translateX(-15%) rotate(3deg)' : 'rotate(0deg)'}
                  `
                }}
              >
                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    className={`
                      transform-style-3d transition-all duration-500 h-[400px]
                      ${hoveredCard === index ? 'rotate-y-180 scale-105' : ''}
                      cursor-pointer
                    `}
                  >
                    {/* Front of the polaroid */}
                    <div className="absolute w-full h-full backface-hidden polaroid">
                      <div className="relative h-full">
                        <img 
                          src={item.image}
                          alt={item.activity}
                          className="w-full h-[85%] object-cover"
                        />
                        <div className="absolute top-100 left-0 right-0 p-2 text-center">
                          <p className="text-pink-500 font-medium text-sm">{item.time}</p>
                          <h3 className="font-handwriting text-lg font-bold text-gray-800 truncate">
                            {item.activity}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back of the polaroid */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 polaroid bg-pink-50">
                      <div className="h-full flex flex-col justify-center items-center text-center p-4">
                        <div className="bg-pink-100 rounded-full p-3 mb-4">
                          {index === 0 && (
                            <HelpCircle className="text-pink-500" size={24} />
                          )}
                          {index === 1 && (
                            <Beef className="text-pink-500" size={24} />
                          )}
                          {index === 2 && (
                            <Cookie className="text-pink-500" size={24} />
                          )}
                          {index === 3 && (
                            <Clapperboard className="text-pink-500" size={24} />
                          )}
                        </div>
                        <p className="font-handwriting text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;