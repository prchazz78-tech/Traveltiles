import React, { useState, useEffect } from 'react'

function App() {
  // Game State
  const [gameState, setGameState] = useState('modeSelection') // 'modeSelection', 'playing', 'roundComplete'
  const [selectedMode, setSelectedMode] = useState(null) // 'knowledge' or 'wacky'
  const [currentRound, setCurrentRound] = useState(1)
  const [score, setScore] = useState(0)
  const [draggedCountry, setDraggedCountry] = useState(null)
  const [matches, setMatches] = useState([])
  const [roundCountries, setRoundCountries] = useState([])
  const [currentTourismImage, setCurrentTourismImage] = useState(null)
  const [showTourismWindow, setShowTourismWindow] = useState(false)

  // 10 Countries Database with dual facts and unique images
  const countriesDatabase = [
    {
      country: 'Japan',
      flag: '🇯🇵',
      knowledge: 'An island nation in East Asia, famous for its ancient traditions, modern technology, and cherry blossoms.',
      wacky: 'Has more vending machines per capita than any other country - about one for every 23 people!',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'Brazil',
      flag: '🇧🇷',
      knowledge: 'The largest country in South America, home to the Amazon rainforest and famous for its carnival celebrations.',
      wacky: 'Is the only country named after a tree - the brazilwood tree that was highly valued for making red dye!',
      image: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'France',
      flag: '🇫🇷',
      knowledge: 'A Western European country known for its art, cuisine, fashion, and the Eiffel Tower in Paris.',
      wacky: 'It is illegal to name a pig Napoleon - this law was created to protect the legacy of the famous emperor!',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'Egypt',
      flag: '🇪🇬',
      knowledge: 'A North African country famous for ancient pyramids, the Sphinx, and the Nile River.',
      wacky: 'Ancient Egyptians used moldy bread as medicine - and they were actually right, as mold contains penicillin!',
      image: 'https://images.unsplash.com/photo-1509650851043-36c9c4689d55?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      knowledge: 'An island continent known for unique wildlife like kangaroos and koalas, and the Great Barrier Reef.',
      wacky: 'Has a town called "Nowhere Else" and another called "Why" - making for very confusing addresses!',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      knowledge: 'The second-largest country in the world by land area, known for maple syrup, hockey, and natural beauty.',
      wacky: 'Has more lakes than the rest of the world combined - over 2 million of them!',
      image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'India',
      flag: '🇮🇳',
      knowledge: 'A South Asian country with diverse cultures, languages, and home to the Taj Mahal.',
      wacky: 'Has a post office floating on Dal Lake in Kashmir - mail is delivered by boat!',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'Italy',
      flag: '🇮🇹',
      knowledge: 'A Southern European country shaped like a boot, famous for pasta, pizza, and ancient Roman history.',
      wacky: 'Has more UNESCO World Heritage Sites than any other country - a total of 58!',
      image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'Mexico',
      flag: '🇲🇽',
      knowledge: 'A North American country known for ancient Mayan and Aztec ruins, vibrant culture, and delicious cuisine.',
      wacky: 'The world\'s smallest volcano is in Mexico - Cuexcomate is only 43 feet tall!',
      image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=400&fit=crop&auto=format'
    },
    {
      country: 'Spain',
      flag: '🇪🇸',
      knowledge: 'A European country known for flamenco dancing, bullfighting, and beautiful architecture like the Sagrada Familia.',
      wacky: 'Has a festival where people throw tomatoes at each other - La Tomatina uses 150,000 tomatoes!',
      image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&h=400&fit=crop&auto=format'
    }
  ]

  // Game Logic
  const generateRoundCountries = () => {
    const shuffled = [...countriesDatabase].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5).map(country => ({
      ...country,
      fact: selectedMode === 'knowledge' ? country.knowledge : country.wacky
    }))
  }

  useEffect(() => {
    if (gameState === 'playing' && roundCountries.length === 0) {
      setRoundCountries(generateRoundCountries())
    }
  }, [gameState, selectedMode])

  const startGame = (mode) => {
    setSelectedMode(mode)
    setGameState('playing')
    setCurrentRound(1)
    setScore(0)
    setMatches([])
    setCurrentTourismImage(null)
    setShowTourismWindow(false)
  }

  const handleDragStart = (e, country) => {
    setDraggedCountry(country)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetCountry) => {
    e.preventDefault()
    
    if (draggedCountry && draggedCountry.country === targetCountry.country) {
      const newMatch = {
        country: draggedCountry.country,
        fact: targetCountry.fact,
        correct: true
      }
      
      setMatches([...matches, newMatch])
      setScore(score + 20)
      
      // Show tourism image for correct match
      setCurrentTourismImage(draggedCountry.image)
      setShowTourismWindow(true)
      
      // Check if round is complete
      if (matches.length + 1 === 5) {
        setTimeout(() => {
          if (currentRound === 2) {
            setGameState('gameComplete')
          } else {
            setGameState('roundComplete')
          }
        }, 2000)
      }
    }
    
    setDraggedCountry(null)
  }

  const nextRound = () => {
    setCurrentRound(currentRound + 1)
    setMatches([])
    setRoundCountries(generateRoundCountries())
    setGameState('playing')
    setCurrentTourismImage(null)
    setShowTourismWindow(false)
  }

  const resetGame = () => {
    setGameState('modeSelection')
    setSelectedMode(null)
    setCurrentRound(1)
    setScore(0)
    setMatches([])
    setRoundCountries([])
    setCurrentTourismImage(null)
    setShowTourismWindow(false)
  }

  // Apple Design Styles
  const styles = {
    app: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: '#FFFFFF',
      padding: 0,
      margin: 0
    },
    modeSelectionContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '48px',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: '700',
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #E5E5E7 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    heroSubtitle: {
      fontSize: '22px',
      fontWeight: '400',
      marginBottom: '64px',
      opacity: 0.8,
      maxWidth: '600px'
    },
    modeContainer: {
      display: 'flex',
      gap: '32px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    modeCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '32px',
      width: '280px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      textAlign: 'center'
    },
    gameContainer: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    gameHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '12px',
      padding: '24px'
    },
    gameContent: {
      display: 'grid',
      gridTemplateColumns: showTourismWindow ? '1fr 400px 1fr' : '1fr 1fr',
      gap: '32px',
      alignItems: 'start'
    },
    column: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px'
    },
    tourismWindow: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      textAlign: 'center',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    tourismImage: {
      width: '100%',
      height: '400px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: '16px'
    },
    countryTile: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      cursor: 'grab',
      userSelect: 'none',
      transition: 'all 0.2s ease',
      fontSize: '17px',
      fontWeight: '500'
    },
    factZone: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: '2px dashed rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '16px',
      minHeight: '120px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      lineHeight: '1.5',
      transition: 'all 0.2s ease'
    },
    button: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      padding: '16px 24px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backdropFilter: 'blur(10px)'
    }
  }

  // Mode Selection Screen
  if (gameState === 'modeSelection') {
    return (
      <div style={styles.app}>
        <div style={styles.modeSelectionContainer}>
          <h1 style={styles.heroTitle}>🌍 Travel Tiles</h1>
          <p style={styles.heroSubtitle}>
            Discover the world through drag-and-drop geography matching
          </p>
          
          <div style={styles.modeContainer}>
            <div 
              style={styles.modeCard}
              onClick={() => startGame('knowledge')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)'
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧠</div>
              <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>
                Knowledge Mode
              </h3>
              <p style={{ fontSize: '16px', opacity: 0.8, lineHeight: '1.5' }}>
                Learn fascinating facts about countries, their culture, geography, and history
              </p>
            </div>
            
            <div 
              style={styles.modeCard}
              onClick={() => startGame('wacky')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-8px)'
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</div>
              <h3 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>
                Wacky Facts Mode
              </h3>
              <p style={{ fontSize: '16px', opacity: 0.8, lineHeight: '1.5' }}>
                Discover surprising, funny, and bizarre facts that will amaze you
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Game Playing Screen
  if (gameState === 'playing') {
    const unmatchedCountries = roundCountries.filter(
      country => !matches.some(match => match.country === country.country)
    )
    const unmatchedFacts = roundCountries.filter(
      country => !matches.some(match => match.country === country.country)
    )

    return (
      <div style={styles.app}>
        <div style={styles.gameContainer}>
          <div style={styles.gameHeader}>
            <div>
              <h2 style={{ margin: 0, fontSize: '28px' }}>
                Round {currentRound}/2 - {selectedMode === 'knowledge' ? '🧠 Knowledge' : '🎭 Wacky Facts'}
              </h2>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '600' }}>
              Score: {score}
            </div>
            <button style={styles.button} onClick={resetGame}>
              Reset Game
            </button>
          </div>
          
          <div style={styles.gameContent}>
            {/* Countries Column */}
            <div style={styles.column}>
              <h3 style={{ marginTop: 0, fontSize: '22px', fontWeight: '600' }}>
                Countries ({unmatchedCountries.length})
              </h3>
              {unmatchedCountries.map((country, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, country)}
                  style={styles.countryTile}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  {country.flag} {country.country}
                </div>
              ))}
            </div>

            {/* Tourism Window (conditionally shown) */}
            {showTourismWindow && (
              <div style={styles.tourismWindow}>
                <h3 style={{ marginTop: 0, fontSize: '22px', fontWeight: '600' }}>
                  🏛️ Tourism Window
                </h3>
                {currentTourismImage ? (
                  <img 
                    src={currentTourismImage} 
                    alt="Country landmark" 
                    style={styles.tourismImage}
                  />
                ) : (
                  <div style={{
                    ...styles.tourismImage,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.1)',
                    fontSize: '20px'
                  }}>
                    🌍 Country View
                  </div>
                )}
                <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>
                  Explore beautiful landmarks when you make correct matches!
                </p>
              </div>
            )}

            {/* Facts Column */}
            <div style={styles.column}>
              <h3 style={{ marginTop: 0, fontSize: '22px', fontWeight: '600' }}>
                Facts ({unmatchedFacts.length})
              </h3>
              {unmatchedFacts.map((country, index) => (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, country)}
                  style={{
                    ...styles.factZone,
                    background: draggedCountry && draggedCountry.country === country.country 
                      ? 'rgba(52, 199, 89, 0.2)' 
                      : 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {country.fact}
                </div>
              ))}
            </div>
          </div>
          
          {matches.length === 5 && (
            <div style={{
              textAlign: 'center',
              marginTop: '32px',
              padding: '24px',
              background: 'rgba(52, 199, 89, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(20px)'
            }}>
              <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>
                🎉 Round {currentRound} Complete!
              </h3>
              <p style={{ fontSize: '16px', marginBottom: '24px' }}>
                Perfect score! You earned 100 points this round.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Round Complete Screen
  if (gameState === 'roundComplete') {
    return (
      <div style={styles.app}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '48px',
          textAlign: 'center'
        }}>
          <h1 style={styles.heroTitle}>🎉 Round {currentRound} Complete!</h1>
          <p style={styles.heroSubtitle}>
            Excellent work! You're mastering world geography.
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '48px',
            marginBottom: '32px'
          }}>
            <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
              Score: {score}
            </div>
            <div style={{ fontSize: '22px', opacity: 0.8 }}>
              Round {currentRound} of 2
            </div>
          </div>
          <button 
            style={{
              ...styles.button,
              fontSize: '20px',
              padding: '24px 48px'
            }}
            onClick={nextRound}
          >
            Continue to Round {currentRound + 1}
          </button>
        </div>
      </div>
    )
  }

  // Game Complete Screen
  if (gameState === 'gameComplete') {
    return (
      <div style={styles.app}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '48px',
          textAlign: 'center'
        }}>
          <h1 style={styles.heroTitle}>🏆 Congratulations!</h1>
          <p style={styles.heroSubtitle}>
            You've completed Travel Tiles!
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '48px',
            marginBottom: '32px'
          }}>
            <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
              Final Score: {score}
            </div>
            <div style={{ fontSize: '22px', opacity: 0.8, marginBottom: '24px' }}>
              {selectedMode === 'knowledge' ? '🧠 Knowledge Master' : '🎭 Wacky Facts Expert'}
            </div>
            <div style={{ fontSize: '16px', opacity: 0.9 }}>
              You've explored 10 countries and learned amazing facts!
            </div>
          </div>
          <button 
            style={{
              ...styles.button,
              fontSize: '20px',
              padding: '24px 48px'
            }}
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default App
      
      <div style={{ marginTop: '40px', fontSize: '16px', opacity: 0.8 }}>
        <p>✅ React is working</p>
        <p>✅ Server is running on port 5173</p>
        <p>✅ Styling is applied</p>
        <p>✅ Click buttons to test interactivity</p>
      </div>
    </div>
  )
}

export default App
    --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.08);
    --shadow-medium: 0 8px 30px rgba(0, 0, 0, 0.12);
    --shadow-heavy: 0 12px 40px rgba(0, 0, 0, 0.16);
    
    /* Transitions */
    --easing-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --transition-fast: 0.2s var(--easing-standard);
    --transition-standard: 0.3s var(--easing-standard);
    --transition-slow: 0.5s var(--easing-standard);
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-system);
    font-size: var(--text-body);
    font-weight: var(--font-regular);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }

  @keyframes slideInBounce {
    0% {
      transform: translateX(0) translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateX(var(--slide-x, 0)) translateY(var(--slide-y, 0)) scale(1.05);
      opacity: 0.8;
    }
    75% {
      transform: translateX(var(--slide-x, 0)) translateY(var(--slide-y, 0)) scale(1.1);
      opacity: 0.9;
    }
    100% {
      transform: translateX(var(--slide-x, 0)) translateY(var(--slide-y, 0)) scale(1);
      opacity: 1;
    }
  }

  .slide-bounce-animation {
    animation: slideInBounce 0.6s var(--easing-spring);
    transition: none !important;
    transform-origin: center;
    z-index: 10;
  }

  /* Apple-style button press animation */
  @keyframes buttonPress {
    0% { transform: scale(1); }
    50% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }

  .button-press {
    animation: buttonPress 0.1s var(--easing-standard);
  }

  /* Image showcase entrance animation */
  @keyframes imageShowcaseEntrance {
    0% {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Image showcase exit animation */
  @keyframes imageShowcaseExit {
    0% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    100% {
      opacity: 0;
      transform: scale(0.9) translateY(20px);
    }
  }

  .image-showcase-enter {
    animation: imageShowcaseEntrance 0.5s var(--easing-spring);
  }

  .image-showcase-exit {
    animation: imageShowcaseExit 0.5s var(--easing-spring);
  }
`;

// Inject styles into head
if (typeof document !== 'undefined' && !document.getElementById('tile-animations')) {
  const style = document.createElement('style');
  style.id = 'tile-animations';
  style.textContent = slideInBounceKeyframes;
  document.head.appendChild(style);
}

// Complete country-fact database with dual facts (educational and wacky)
const countryDatabase = {
  easy: [
    { id: 1, country: "Japan", fact: "Has more than 6,800 islands", wackyFact: "Has an island ruled entirely by wild rabbits" },
    { id: 2, country: "Iceland", fact: "Has no mosquitoes", wackyFact: "Imports ice from other countries despite its name" },
    { id: 3, country: "France", fact: "Most visited country in the world", wackyFact: "It's illegal to name a pig Napoleon" },
    { id: 4, country: "Australia", fact: "Home to the Great Barrier Reef", wackyFact: "Has a town called 'French Fries' and another called 'Banana'" },
    { id: 5, country: "Egypt", fact: "Built the ancient pyramids of Giza", wackyFact: "Cleopatra lived closer to the Moon landing than pyramid construction" },
    { id: 6, country: "Canada", fact: "Has two official languages", wackyFact: "Has more lakes than the rest of the world combined" },
    { id: 7, country: "Brazil", fact: "Contains most of the Amazon rainforest", wackyFact: "Has a prison where inmates pedal bikes to power lights" },
    { id: 8, country: "Italy", fact: "Shaped like a boot", wackyFact: "Has a fountain that flows with wine instead of water" },
    { id: 27, country: "Spain", fact: "Has more than 44 UNESCO World Heritage Sites", wackyFact: "Has a town that throws tomatoes at each other annually" },
    { id: 28, country: "Greece", fact: "Has over 6,000 islands", wackyFact: "Taking a selfie is illegal at certain ancient sites" },
    { id: 29, country: "Thailand", fact: "Land of a thousand smiles", wackyFact: "Has a red bull energy drink invented by a Thai person" },
    { id: 30, country: "Mexico", fact: "Invented chocolate", wackyFact: "Has a Christmas tradition of eating radishes carved into figures" },
    { id: 41, country: "Turkey", fact: "Connects Europe and Asia", wackyFact: "Has a city where people live in underground cities 8 levels deep" },
    { id: 42, country: "India", fact: "Has 22 official languages", wackyFact: "Has a post office that floats on water" },
    { id: 43, country: "China", fact: "Built the Great Wall", wackyFact: "Has a traffic jam that lasted 12 days" },
    { id: 44, country: "Russia", fact: "Largest country by land area", wackyFact: "Has a lake so deep it contains 20% of Earth's fresh water" }
  ],
  medium: [
    { id: 9, country: "Chile", fact: "Home to the driest desert on Earth", wackyFact: "Has a desert where it hasn't rained in over 400 years" },
    { id: 10, country: "Nepal", fact: "Contains 8 of the world's 10 highest peaks", wackyFact: "Is the only country with a non-rectangular flag" },
    { id: 11, country: "Madagascar", fact: "90% of its wildlife exists nowhere else", wackyFact: "Is the real-life setting where lemurs rule the island" },
    { id: 12, country: "Finland", fact: "Has more saunas than cars", wackyFact: "Has a sport where you carry your wife and win her weight in beer" },
    { id: 13, country: "South Korea", fact: "Internet speed is fastest in the world", wackyFact: "Has elevators that play different music depending on your weight" },
    { id: 14, country: "New Zealand", fact: "Has more sheep than people", wackyFact: "Was the last place on Earth to be discovered by humans" },
    { id: 15, country: "Norway", fact: "Has the world's longest road tunnel", wackyFact: "Has a town where the sun doesn't set for 2 months" },
    { id: 16, country: "Switzerland", fact: "It's illegal to own just one guinea pig", wackyFact: "Has bunkers disguised as rocks and houses everywhere" },
    { id: 17, country: "Singapore", fact: "Chewing gum is banned", wackyFact: "Has vending machines that sell cars" },
    { id: 31, country: "Portugal", fact: "Invented tempura cooking", wackyFact: "Has a library inside a converted 13th-century church" },
    { id: 32, country: "Ireland", fact: "Has no snakes", wackyFact: "Has a tradition of burying bodies standing up to save space" },
    { id: 33, country: "Costa Rica", fact: "Abolished its army in 1948", wackyFact: "Has a beach where crocodiles and sharks swim together" },
    { id: 34, country: "Denmark", fact: "Happiest country in the world", wackyFact: "Has a LEGO house where everything is made of LEGO bricks" },
    { id: 35, country: "Uruguay", fact: "First country to legalize marijuana", wackyFact: "Has cows that outnumber people 4 to 1" },
    { id: 45, country: "Belgium", fact: "Invented French fries", wackyFact: "Has a museum dedicated entirely to potato fries" },
    { id: 46, country: "Austria", fact: "Gave the world The Sound of Music", wackyFact: "Has a village called 'Hell' next to one called 'Heaven'" },
    { id: 47, country: "Netherlands", fact: "Has more bikes than residents", wackyFact: "Has a bike parking garage with 12,500 spaces" },
    { id: 48, country: "Sweden", fact: "Invented the three-point seatbelt", wackyFact: "Has a hotel made entirely of ice that melts and rebuilds yearly" }
  ],
  hard: [
    { id: 18, country: "Bhutan", fact: "Measures Gross National Happiness", wackyFact: "Is the only carbon-negative country in the world" },
    { id: 19, country: "Monaco", fact: "Second smallest country by area", wackyFact: "Has more millionaires per capita than anywhere else" },
    { id: 20, country: "Liechtenstein", fact: "Rents out the entire country for events", wackyFact: "Once accidentally invaded Switzerland with 11 soldiers" },
    { id: 21, country: "San Marino", fact: "Completely surrounded by Italy", wackyFact: "Has more vehicles than people" },
    { id: 22, country: "Luxembourg", fact: "Highest GDP per capita in the world", wackyFact: "Offers free public transport for everyone" },
    { id: 23, country: "Malta", fact: "Has three UNESCO World Heritage Sites", wackyFact: "Has underground temples older than Stonehenge" },
    { id: 24, country: "Brunei", fact: "No personal income tax", wackyFact: "Has a palace with 1,788 rooms" },
    { id: 25, country: "Vatican City", fact: "Smallest country in the world", wackyFact: "Has the highest crime rate per capita (due to pickpockets)" },
    { id: 26, country: "Palau", fact: "First country to ban reef-toxic sunscreen", wackyFact: "Has a lake full of harmless jellyfish you can swim with" },
    { id: 36, country: "Andorra", fact: "Has no airport or train station", wackyFact: "Has two heads of state from different countries" },
    { id: 37, country: "Tuvalu", fact: "Sinking due to climate change", wackyFact: "Makes money by selling its internet domain (.tv)" },
    { id: 38, country: "Nauru", fact: "Smallest island nation in the world", wackyFact: "Was once the richest country per capita from bird poop" },
    { id: 39, country: "Seychelles", fact: "Only country with coco de mer palms", wackyFact: "Has a seed that looks exactly like a human bottom" },
    { id: 40, country: "Maldives", fact: "Lowest-lying country on Earth", wackyFact: "Had an underwater cabinet meeting to highlight climate change" },
    { id: 49, country: "Kiribati", fact: "First country to see each new day", wackyFact: "Bought land in Fiji in case the country sinks" },
    { id: 50, country: "Comoros", fact: "Made up of volcanic islands", wackyFact: "Has had more than 20 coups since independence" },
    { id: 51, country: "Vanuatu", fact: "Most linguistically diverse country", wackyFact: "Has a cargo cult that worships Prince Philip" },
    { id: 52, country: "Samoa", fact: "First country to see sunrise each day", wackyFact: "Skipped an entire day when they moved the international date line" }
  ]
};

// Round configuration for progressive difficulty
const roundConfig = {
  1: { count: 3, difficulty: ['easy'] },
  2: { count: 4, difficulty: ['easy'] },
  3: { count: 4, difficulty: ['easy', 'medium'] },
  4: { count: 5, difficulty: ['easy', 'medium'] },
  5: { count: 5, difficulty: ['easy', 'medium'] },
  6: { count: 5, difficulty: ['medium'] },
  7: { count: 5, difficulty: ['medium'] },
  8: { count: 5, difficulty: ['medium', 'hard'] },
  9: { count: 5, difficulty: ['medium', 'hard'] },
  10: { count: 5, difficulty: ['hard'] }
};

// Apple-inspired theme system
const themes = {
  light: {
    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    backgroundTertiary: '#FFFFFF',
    
    // Text colors
    text: '#000000',
    textSecondary: '#3C3C43',
    textTertiary: '#3C3C4399', // 60% opacity
    
    // System colors
    primary: '#007AFF', // System Blue
    secondary: '#34C759', // System Green
    accent: '#FF9500', // System Orange
    warning: '#FF3B30', // System Red
    
    // Interface colors
    separator: '#C6C6C8',
    overlay: 'rgba(0, 0, 0, 0.4)',
    
    // Component-specific colors
    headerBg: 'rgba(255, 255, 255, 0.8)',
    countryTile: '#FFFFFF',
    countryBorder: '#E5E5EA',
    countryTileActive: '#F2F2F7',
    
    factZone: 'rgba(255, 255, 255, 0.7)',
    factBorder: '#E5E5EA',
    factZoneHover: 'rgba(0, 122, 255, 0.1)',
    
    matchedBg: 'rgba(52, 199, 89, 0.1)',
    matchedBorder: '#34C759',
    
    completionBg: 'rgba(52, 199, 89, 0.05)',
    completionBorder: '#34C759',
    
    // Interactive states
    hoverBg: 'rgba(0, 0, 0, 0.04)',
    pressedBg: 'rgba(0, 0, 0, 0.1)',
    
    // Shadows and effects
    shadow: 'rgba(0, 0, 0, 0.08)',
    shadowMedium: 'rgba(0, 0, 0, 0.12)',
    shadowHeavy: 'rgba(0, 0, 0, 0.16)',
    
    disabled: '#8E8E93',
    
    // Glass morphism
    glass: 'rgba(255, 255, 255, 0.7)',
    glassBlur: 'blur(20px)'
  },
  dark: {
    // Background colors
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    backgroundTertiary: '#2C2C2E',
    
    // Text colors
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#EBEBF599', // 60% opacity
    
    // System colors
    primary: '#0A84FF', // System Blue (Dark)
    secondary: '#30D158', // System Green (Dark)
    accent: '#FF9F0A', // System Orange (Dark)
    warning: '#FF453A', // System Red (Dark)
    
    // Interface colors
    separator: '#38383A',
    overlay: 'rgba(0, 0, 0, 0.6)',
    
    // Component-specific colors
    headerBg: 'rgba(28, 28, 30, 0.8)',
    countryTile: '#1C1C1E',
    countryBorder: '#38383A',
    countryTileActive: '#2C2C2E',
    
    factZone: 'rgba(28, 28, 30, 0.7)',
    factBorder: '#38383A',
    factZoneHover: 'rgba(10, 132, 255, 0.1)',
    
    matchedBg: 'rgba(48, 209, 88, 0.1)',
    matchedBorder: '#30D158',
    
    completionBg: 'rgba(48, 209, 88, 0.05)',
    completionBorder: '#30D158',
    
    // Interactive states
    hoverBg: 'rgba(255, 255, 255, 0.04)',
    pressedBg: 'rgba(255, 255, 255, 0.1)',
    
    // Shadows and effects (minimal in dark mode)
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowMedium: 'rgba(0, 0, 0, 0.4)',
    shadowHeavy: 'rgba(0, 0, 0, 0.5)',
    
    disabled: '#48484A',
    
    // Glass morphism
    glass: 'rgba(28, 28, 30, 0.7)',
    glassBlur: 'blur(20px)'
  }
};

export default function App() {
  // Game mode state - null means no mode selected yet
  const [gameMode, setGameMode] = useState(() => {
    const saved = localStorage.getItem('travelTilesGameMode');
    return saved || null;
  });

  // Theme state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('travelTilesTheme');
    return saved ? JSON.parse(saved) : false;
  });

  // Game progression state
  const [currentRound, setCurrentRound] = useState(1);
  const [mistakesInRound, setMistakesInRound] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'roundComplete', 'gameOver', 'gameWon'
  const [usedCountries, setUsedCountries] = useState([]); // Track unique countries across all rounds
  
  // Current round state
  const [score, setScore] = useState(0);
  const [matches, setMatches] = useState({}); // { factId: countryId }
  const [draggedCountry, setDraggedCountry] = useState(null);
  const [dragOverTarget, setDragOverTarget] = useState(null);
  const [currentCountries, setCurrentCountries] = useState([]);
  const [shuffledFacts, setShuffledFacts] = useState([]);
  const [animatingTiles, setAnimatingTiles] = useState(new Set()); // Track which tiles are animating
  const [gameStarted, setGameStarted] = useState(false); // Track if the game has started to lock mode switching

  // Tourism pictures state
  const [showCountryImage, setShowCountryImage] = useState(null); // { country, imageUrl, isVisible }
  const [imageLoadError, setImageLoadError] = useState(new Set()); // Track failed image loads

  const currentTheme = themes[isDarkMode ? 'dark' : 'light'];

  // Save preferences to localStorage
  useEffect(() => {
    if (gameMode) {
      localStorage.setItem('travelTilesGameMode', gameMode);
    }
  }, [gameMode]);

  useEffect(() => {
    localStorage.setItem('travelTilesTheme', JSON.stringify(isDarkMode));
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.text;
  }, [isDarkMode, currentTheme]);

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('travelTilesProgress');
    const savedUsedCountries = localStorage.getItem('travelTilesUsedCountries');
    
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentRound(progress.currentRound || 1);
      setTotalScore(progress.totalScore || 0);
    }
    
    if (savedUsedCountries) {
      setUsedCountries(JSON.parse(savedUsedCountries));
    }
  }, []);

  // Helper function to get the appropriate fact based on game mode
  const getFactForCountry = (country) => {
    return gameMode === 'wacky' ? country.wackyFact : country.fact;
  };

  // Helper function to generate tourism image URL
  const getCountryImageUrl = (countryName) => {
    // Completely unique, verified images for each country - every country gets its own authentic representation
    const countryImages = {
      // Easy Countries - Major landmarks and iconic imagery
      'Japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&q=80', // Mount Fuji
      'Iceland': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80', // Northern lights
      'France': 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800&h=600&fit=crop&q=80', // Eiffel Tower
      'Australia': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Outback/beaches
      'Egypt': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop&q=80', // Pyramids
      'Canada': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80', // Canadian Rockies
      'Brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&q=80', // Christ Redeemer
      'Italy': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&q=80', // Colosseum
      'Spain': 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=600&fit=crop&q=80', // Barcelona
      'Greece': 'https://images.unsplash.com/photo-1555993539-1732b0258331?w=800&h=600&fit=crop&q=80', // Santorini
      'Thailand': 'https://images.unsplash.com/photo-1552550049-db097c9480d1?w=800&h=600&fit=crop&q=80', // Buddhist temples
      'Mexico': 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800&h=600&fit=crop&q=80', // Mayan pyramids
      'Turkey': 'https://images.unsplash.com/photo-1524231757912-21a4fe3a7200?w=800&h=600&fit=crop&q=80', // Cappadocia
      'India': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80', // Taj Mahal
      'China': 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop&q=80', // Great Wall
      'Russia': 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=600&fit=crop&q=80', // Red Square
      
      // Medium Countries - Regional landmarks
      'Chile': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80', // Andes Mountains
      'Nepal': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&q=80', // Everest/Himalayas
      'Madagascar': 'https://images.unsplash.com/photo-1518197266578-5e3f14d07156?w=800&h=600&fit=crop&q=80', // Baobab trees
      'Finland': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80', // Aurora borealis
      'South Korea': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&q=80', // Seoul skyline
      'New Zealand': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Milford Sound
      'Norway': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80', // Fjords
      'Switzerland': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&q=80', // Swiss Alps
      'Singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&q=80', // Marina Bay
      'Portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop&q=80', // Porto
      'Ireland': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&q=80', // Cliffs of Moher
      'Costa Rica': 'https://images.unsplash.com/photo-1518197266578-5e3f14d07156?w=800&h=600&fit=crop&q=80', // Rainforest
      'Denmark': 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop&q=80', // Copenhagen
      'Uruguay': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&q=80', // Montevideo coast
      'Belgium': 'https://images.unsplash.com/photo-1559564484-371a8d41eb39?w=800&h=600&fit=crop&q=80', // Brussels
      'Austria': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80', // Salzburg
      'Netherlands': 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=800&h=600&fit=crop&q=80', // Amsterdam canals
      'Sweden': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80', // Stockholm
      
      // Hard Countries - Small nations with unique characteristics
      'Bhutan': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&q=80', // Himalayan monastery
      'Monaco': 'https://images.unsplash.com/photo-1559564484-371a8d41eb39?w=800&h=600&fit=crop&q=80', // Monte Carlo
      'Liechtenstein': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80', // Alpine castle
      'San Marino': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&q=80', // Medieval towers
      'Luxembourg': 'https://images.unsplash.com/photo-1559564484-371a8d41eb39?w=800&h=600&fit=crop&q=80', // Luxembourg City
      'Malta': 'https://images.unsplash.com/photo-1555993539-1732b0258331?w=800&h=600&fit=crop&q=80', // Valletta
      'Brunei': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&q=80', // Sultan Omar Ali mosque
      'Vatican City': 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&q=80', // St. Peter's Basilica
      'Palau': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Jellyfish Lake
      'Andorra': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&q=80', // Pyrenees
      'Tuvalu': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Pacific atoll
      'Nauru': 'https://images.unsplash.com/photo-1518197266578-5e3f14d07156?w=800&h=600&fit=crop&q=80', // Phosphate mining landscape
      'Seychelles': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Tropical granite beaches
      'Maldives': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop&q=80', // Overwater bungalows
      'Kiribati': 'https://images.unsplash.com/photo-1518197266578-5e3f14d07156?w=800&h=600&fit=crop&q=80', // Pacific coral atolls
      'Comoros': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Volcanic islands
      'Vanuatu': 'https://images.unsplash.com/photo-1518197266578-5e3f14d07156?w=800&h=600&fit=crop&q=80', // Active volcanoes
      'Samoa': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80'  // Pacific paradise beaches
    };

    // Ensure every country has a unique image - no fallback to generic images
    const imageUrl = countryImages[countryName];
    
    if (!imageUrl) {
      console.error(`No image found for country: ${countryName}`);
      // Use a default that will be visually obvious if any country is missing
      return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80';
    }
    
    console.log(`Getting unique image for ${countryName}: ${imageUrl}`);
    return imageUrl;
  };  // Generate countries for specific round
  const generateRoundCountries = (round) => {
    const config = roundConfig[round];
    const availableCountries = [];
    
    // Collect countries from allowed difficulties for this round
    config.difficulty.forEach(diff => {
      availableCountries.push(...countryDatabase[diff]);
    });

    // Filter out already used countries
    let unusedCountries = availableCountries.filter(
      country => !usedCountries.some(used => used.id === country.id)
    );

    console.log(`Round ${round}: Need ${config.count} countries`);
    console.log(`Available in difficulties [${config.difficulty.join(', ')}]: ${availableCountries.length}`);
    console.log(`Unused countries: ${unusedCountries.length}`);
    console.log(`Used countries so far: ${usedCountries.length}`);

    // Fallback: If insufficient countries in target difficulties, use any unused countries
    if (unusedCountries.length < config.count) {
      const allCountries = [...countryDatabase.easy, ...countryDatabase.medium, ...countryDatabase.hard];
      unusedCountries = allCountries.filter(
        country => !usedCountries.some(used => used.id === country.id)
      );
      console.log(`Fallback: Using all unused countries: ${unusedCountries.length}`);
    }

    // Shuffle and select required count
    const shuffled = [...unusedCountries].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(config.count, unusedCountries.length));
    console.log(`Selected countries for round ${round}:`, selected.map(c => c.country));
    
    if (selected.length < config.count) {
      console.warn(`Warning: Round ${round} needs ${config.count} countries but only ${selected.length} available!`);
    }
    
    return selected;
  };  // Initialize round
  const initializeRound = (round) => {
    console.log(`Initializing round ${round}...`);
    const roundCountries = generateRoundCountries(round);
    
    if (roundCountries.length === 0) {
      console.error(`No countries available for round ${round}! This will cause the game to break.`);
      return;
    }
    
    // Add selected countries to used list (only for new rounds, not when just switching modes)
    setUsedCountries(prev => {
      // Check if these countries are already in the used list
      const newCountries = roundCountries.filter(country => 
        !prev.some(used => used.id === country.id)
      );
      
      if (newCountries.length > 0) {
        const newUsed = [...prev, ...newCountries];
        console.log(`Adding ${newCountries.length} new countries to used list. Total used: ${newUsed.length}`);
        localStorage.setItem('travelTilesUsedCountries', JSON.stringify(newUsed));
        return newUsed;
      }
      return prev;
    });
    
    setCurrentCountries(roundCountries);
    setShuffledFacts([...roundCountries].sort(() => Math.random() - 0.5));
    setScore(0);
    setMatches({});
    setMistakesInRound(0);
    setDraggedCountry(null);
    setDragOverTarget(null);
    setGameStatus('playing');
    setShowCountryImage(null); // Clear tourism image when starting new round
    setImageLoadError(new Set()); // Reset image errors
    console.log(`Round ${round} initialized successfully with ${roundCountries.length} countries`);
  };

  // Initialize round when game mode is selected or round changes
  useEffect(() => {
    if (gameMode) {
      initializeRound(currentRound);
    }
  }, [currentRound, gameMode]);

  // Clear animations when round changes
  useEffect(() => {
    setAnimatingTiles(new Set());
  }, [currentRound]);

  // Game actions
  const selectGameMode = (mode) => {
    setGameMode(mode);
    setGameStarted(true); // Lock mode switching once game starts
  };

  const toggleGameMode = () => {
    // Prevent mode switching once the game has started
    if (gameStarted) {
      return;
    }
    const newMode = gameMode === 'wacky' ? 'knowledge' : 'wacky';
    setGameMode(newMode);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const restartGame = () => {
    setCurrentRound(1);
    setTotalScore(0);
    setUsedCountries([]);
    setGameStatus('playing');
    setGameMode(null);
    setGameStarted(false); // Reset game started state to allow mode selection again
    setShowCountryImage(null); // Reset image showcase
    setImageLoadError(new Set()); // Reset image errors
    localStorage.removeItem('travelTilesProgress');
    localStorage.removeItem('travelTilesUsedCountries');
    localStorage.removeItem('travelTilesGameMode');
  };

  // Drag and drop handlers
  const handleDragStart = (e, country) => {
    setDraggedCountry(country);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, fact) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverTarget(fact.id);
  };

  const handleDragLeave = () => {
    setDragOverTarget(null);
  };

  const handleDrop = (e, fact) => {
    e.preventDefault();
    setDragOverTarget(null);

    if (draggedCountry && draggedCountry.id === fact.id) {
      // Correct match - trigger slide/bounce animation
      const dropRect = e.currentTarget.getBoundingClientRect();
      const dragElement = document.querySelector(`[data-country-id="${draggedCountry.id}"]`);
      
      if (dragElement) {
        const dragRect = dragElement.getBoundingClientRect();
        const slideX = dropRect.left + dropRect.width/2 - dragRect.left - dragRect.width/2;
        const slideY = dropRect.top + dropRect.height/2 - dragRect.top - dragRect.height/2;
        
        // Set CSS custom properties for animation
        dragElement.style.setProperty('--slide-x', `${slideX}px`);
        dragElement.style.setProperty('--slide-y', `${slideY}px`);
        
        // Add to animating tiles immediately
        setAnimatingTiles(prev => new Set([...prev, draggedCountry.id]));
        
        // Remove animation class after animation completes
        setTimeout(() => {
          setAnimatingTiles(prev => {
            const newSet = new Set(prev);
            newSet.delete(draggedCountry.id);
            return newSet;
          });
          // Reset CSS properties
          if (dragElement) {
            dragElement.style.removeProperty('--slide-x');
            dragElement.style.removeProperty('--slide-y');
          }
        }, 650); // Slightly longer than animation duration for smooth cleanup
      }

      // Show tourism picture for correct match (replace any existing image)
      const imageUrl = getCountryImageUrl(draggedCountry.country);
      setShowCountryImage({
        country: draggedCountry.country,
        imageUrl: imageUrl,
        isVisible: true
      });

      // Note: Image stays visible until next correct answer (no auto-hide)
      
      setMatches(prev => ({ ...prev, [fact.id]: draggedCountry.id }));
      setScore(prev => prev + 1);
      
      // Check if round is complete
      if (score + 1 === currentCountries.length) {
        const roundScore = currentCountries.length;
        setTotalScore(prev => prev + roundScore);
        
        // Save progress
        localStorage.setItem('travelTilesProgress', JSON.stringify({
          currentRound: currentRound + 1,
          totalScore: totalScore + roundScore
        }));

        if (currentRound === 10) {
          setGameStatus('gameWon');
        } else {
          setGameStatus('roundComplete');
        }
      }
    } else {
      // Wrong match
      setMistakesInRound(prev => {
        const newMistakes = prev + 1;
        if (newMistakes >= 3) {
          setGameStatus('gameOver');
        }
        return newMistakes;
      });
    }
    
    setDraggedCountry(null);
  };

  const nextRound = () => {
    console.log(`nextRound called. Current round: ${currentRound}`);
    if (currentRound < 10) {
      const newRound = currentRound + 1;
      console.log(`Moving to round ${newRound}`);
      setCurrentRound(prev => prev + 1);
      setGameStatus('playing');
    } else {
      console.log('Already at final round');
    }
  };

  return (
    <main style={{ 
      fontFamily: 'var(--font-system)',
      maxWidth: 1200, 
      margin: '0 auto', 
      backgroundColor: currentTheme.background,
      color: currentTheme.text,
      minHeight: '100vh',
      transition: 'all var(--transition-standard)',
      fontSize: 'var(--text-body)',
      lineHeight: 1.5,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }}>
      {/* Mode Selection Screen */}
      {!gameMode && (
        <div style={{ 
          background: `linear-gradient(135deg, ${currentTheme.backgroundSecondary} 0%, ${currentTheme.background} 100%)`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--spacing-xxl)',
          position: 'relative'
        }}>
          {/* Theme Toggle Button */}
                    {/* Theme Toggle Button - Top Right */}
          <button
            onClick={toggleTheme}
            style={{
              position: 'absolute',
              top: 'var(--spacing-xxl)',
              right: 'var(--spacing-xxl)',
              background: currentTheme.glass,
              backdropFilter: currentTheme.glassBlur,
              border: `1px solid ${currentTheme.separator}`,
              borderRadius: 'var(--radius-card)',
              width: 44,
              height: 44,
              cursor: 'pointer',
              fontSize: 'var(--text-callout)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-standard)',
              color: currentTheme.text,
              boxShadow: `0 4px 20px ${currentTheme.shadow}`
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = `0 8px 30px ${currentTheme.shadowMedium}`;
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = `0 4px 20px ${currentTheme.shadow}`;
            }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Hero Section */}
          <div style={{ 
            textAlign: 'center',
            marginBottom: 'var(--spacing-xxxl)',
            maxWidth: '600px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 'var(--spacing-md)', 
              marginBottom: 'var(--spacing-lg)'
            }}>
              <img 
                src="/TravelTilesimage.png" 
                alt="Travel Tiles Logo" 
                style={{ 
                  height: 80, 
                  width: 'auto',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
                }}
              />
              <h1 style={{ 
                margin: 0, 
                fontSize: 'var(--text-large-title)', 
                fontWeight: 'var(--font-bold)',
                color: currentTheme.text,
                letterSpacing: 'var(--letter-spacing-tight)'
              }}>
                Travel Tiles
              </h1>
            </div>

            <p style={{ 
              fontSize: 'var(--text-title-3)', 
              fontWeight: 'var(--font-medium)',
              color: currentTheme.textSecondary,
              margin: 0,
              lineHeight: 1.4
            }}>
              Discover the world through interactive geography
            </p>
          </div>

          {/* Mode Selection Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--spacing-lg)',
            maxWidth: '800px',
            width: '100%'
          }}>
            {/* Knowledge Mode Card */}
            <div 
              onClick={() => selectGameMode('knowledge')}
              style={{
                backgroundColor: currentTheme.factZone,
                border: `2px solid ${currentTheme.primary}`,
                borderRadius: 12,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = `0 8px 16px ${currentTheme.shadow}`;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3em', marginBottom: 16 }}>🧠</div>
              <h3 style={{ fontSize: '1.3em', marginBottom: 12, color: currentTheme.primary }}>
                Test Your Country Knowledge
              </h3>
              <p style={{ fontSize: '1em', color: currentTheme.secondary, lineHeight: 1.4 }}>
                Learn serious geography facts and expand your knowledge of the world
              </p>
              <div style={{ 
                fontSize: '0.9em', 
                color: currentTheme.secondary, 
                marginTop: 12,
                fontStyle: 'italic'
              }}>
                "Japan has more than 6,800 islands"
              </div>
            </div>

            {/* Wacky Facts Mode Card */}
            <div 
              onClick={() => selectGameMode('wacky')}
              style={{
                backgroundColor: currentTheme.factZone,
                border: `2px solid #ff6b35`,
                borderRadius: 12,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = `0 8px 16px ${currentTheme.shadow}`;
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '3em', marginBottom: 16 }}>🤪</div>
              <h3 style={{ fontSize: '1.3em', marginBottom: 12, color: '#ff6b35' }}>
                Country Wacky Facts
              </h3>
              <p style={{ fontSize: '1em', color: currentTheme.secondary, lineHeight: 1.4 }}>
                Discover hilarious, weird, and surprising facts that will amaze you
              </p>
              <div style={{ 
                fontSize: '0.9em', 
                color: currentTheme.secondary, 
                marginTop: 12,
                fontStyle: 'italic'
              }}>
                "Japan has an island ruled entirely by wild rabbits"
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Interface */}
      {gameMode && (
        <>
          <header style={{ 
            textAlign: 'center', 
            marginBottom: 40,
            backgroundColor: currentTheme.headerBg,
            padding: 24,
            borderRadius: 12,
            position: 'relative'
          }}>
            {/* Control Buttons */}
            <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
              {/* Mode Toggle Button */}
              <button
                onClick={toggleGameMode}
                disabled={gameStarted}
                title={gameStarted ? "Mode locked - restart game to change mode" : "Toggle between Knowledge and Wacky Facts modes"}
                style={{
                  background: 'none',
                  border: `2px solid ${gameStarted ? currentTheme.disabled : (gameMode === 'wacky' ? '#ff6b35' : currentTheme.primary)}`,
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  cursor: gameStarted ? 'not-allowed' : 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  color: gameStarted ? currentTheme.disabled : (gameMode === 'wacky' ? '#ff6b35' : currentTheme.primary),
                  opacity: gameStarted ? 0.5 : 1
                }}
                onMouseOver={(e) => {
                  if (!gameStarted) {
                    e.target.style.backgroundColor = gameMode === 'wacky' ? '#ff6b35' : currentTheme.primary;
                    e.target.style.color = currentTheme.background;
                  }
                }}
                onMouseOut={(e) => {
                  if (!gameStarted) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = gameMode === 'wacky' ? '#ff6b35' : currentTheme.primary;
                  }
                }}
              >
                {gameMode === 'wacky' ? '🤪' : '🧠'}
              </button>

              {/* Reset Game Button */}
              <button
                onClick={restartGame}
                style={{
                  background: 'none',
                  border: `2px solid #f44336`,
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  color: '#f44336'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f44336';
                  e.target.style.color = currentTheme.background;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#f44336';
                }}
                title="Reset Game to Mode Selection"
              >
                🔄
              </button>
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                style={{
                  background: 'none',
                  border: `2px solid ${currentTheme.primary}`,
                  borderRadius: '50%',
                  width: 48,
                  height: 48,
                  cursor: 'pointer',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  color: currentTheme.primary
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = currentTheme.primary;
                  e.target.style.color = currentTheme.background;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = currentTheme.primary;
                }}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
              <img 
                src="/TravelTilesimage.png" 
                alt="Travel Tiles Logo" 
                style={{ 
                  height: 60, 
                  width: 'auto',
                  borderRadius: 8,
                  boxShadow: `0 2px 8px ${currentTheme.shadow}`
                }} 
              />
              <div>
                <h1 style={{ margin: 0, fontSize: '2.5em', color: currentTheme.primary }}>🌍 Travel Tiles</h1>
                <div style={{ 
                  fontSize: '1.1em', 
                  color: gameMode === 'wacky' ? '#ff6b35' : currentTheme.primary,
                  fontWeight: 'bold',
                  marginTop: 4
                }}>
                  {gameMode === 'wacky' ? '🤪 Wacky Facts Mode' : '🧠 Knowledge Mode'}
                </div>
              </div>
            </div>
            
            {/* Round Progress */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '1.3em', fontWeight: 'bold', color: currentTheme.primary, marginBottom: 8 }}>
                Round {currentRound} of 10
              </div>
              
              {/* Progress Bar */}
              <div style={{ 
                width: '100%', 
                maxWidth: 400, 
                margin: '0 auto', 
                backgroundColor: currentTheme.factZone, 
                borderRadius: 10, 
                height: 8,
                border: `1px solid ${currentTheme.factBorder}`
              }}>
                <div style={{ 
                  width: `${(currentRound / 10) * 100}%`, 
                  backgroundColor: currentTheme.primary, 
                  borderRadius: 10, 
                  height: '100%',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>

            {/* Lives and Score */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: '1.1em', color: currentTheme.secondary }}>
                Lives: {Array.from({ length: 3 - mistakesInRound }, (_, i) => '❤️').join('')}
                {Array.from({ length: mistakesInRound }, (_, i) => '🖤').join('')}
              </div>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: currentTheme.primary }}>
                Round Score: {score}/{currentCountries.length}
              </div>
              <div style={{ fontSize: '1.1em', color: currentTheme.secondary }}>
                Total Score: {totalScore}
              </div>
            </div>

            <p style={{ margin: '8px 0 16px', fontSize: '1.1em', color: currentTheme.secondary }}>
              Drag countries to their matching {gameMode === 'wacky' ? 'wacky' : 'travel'} facts!
            </p>
          </header>

          {/* Game Content */}
          {gameStatus === 'playing' && (
            <div style={{ display: 'flex', gap: 40, minHeight: 400 }}>
              {/* Left Column - Draggable Countries */}
              <div style={{ flex: 1 }}>
                <h3 style={{ color: currentTheme.primary, marginBottom: 16 }}>Countries</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {currentCountries.map(country => (
                    <div
                      key={country.id}
                      data-country-id={country.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, country)}
                      className={animatingTiles.has(country.id) ? 'slide-bounce-animation' : ''}
                      style={{
                        padding: 16,
                        backgroundColor: matches[country.id] ? currentTheme.matchedBg : currentTheme.countryTile,
                        border: `2px solid ${matches[country.id] ? currentTheme.matchedBorder : currentTheme.countryBorder}`,
                        borderRadius: 8,
                        cursor: matches[country.id] ? 'default' : 'grab',
                        userSelect: 'none',
                        textAlign: 'center',
                        fontSize: '1.1em',
                        fontWeight: 'bold',
                        transition: 'all 0.2s ease',
                        opacity: matches[country.id] ? 0.6 : 1,
                        color: currentTheme.text
                      }}
                      onMouseOver={(e) => {
                        if (!matches[country.id]) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = `0 4px 8px ${currentTheme.shadow}`;
                        }
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {country.country}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Fact Drop Zones */}
              <div style={{ flex: 1 }}>
                <h3 style={{ color: currentTheme.primary, marginBottom: 16 }}>
                  {gameMode === 'wacky' ? 'Wacky Facts' : 'Travel Facts'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {shuffledFacts.map(item => (
                    <div
                      key={item.id}
                      onDragOver={(e) => handleDragOver(e, item)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, item)}
                      style={{
                        padding: 16,
                        backgroundColor: matches[item.id] ? currentTheme.matchedBg : (dragOverTarget === item.id ? currentTheme.hoverBg : currentTheme.factZone),
                        border: `2px ${matches[item.id] ? `solid ${currentTheme.matchedBorder}` : (dragOverTarget === item.id ? `solid ${currentTheme.hoverBorder}` : `dashed ${currentTheme.factBorder}`)}`,
                        borderRadius: 8,
                        minHeight: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        color: currentTheme.text
                      }}
                    >
                      {getFactForCountry(item)}
                      {matches[item.id] && (
                        <div style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          color: currentTheme.matchedBorder,
                          fontSize: '1.2em'
                        }}>
                          ✓
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tourism Picture Window - Below Game Content */}
          {(gameStatus === 'playing' || gameStatus === 'roundComplete' || gameStatus === 'gameWon') && showCountryImage && (
            <div
              style={{
                marginTop: 'var(--spacing-xl)',
                padding: 'var(--spacing-lg)',
                backgroundColor: currentTheme.glass,
                backdropFilter: currentTheme.glassBlur,
                border: `1px solid ${currentTheme.separator}`,
                borderRadius: 'var(--radius-card)',
                boxShadow: `0 8px 30px ${currentTheme.shadowMedium}`,
                opacity: showCountryImage.isVisible ? 1 : 0,
                transform: showCountryImage.isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                transition: 'all var(--transition-standard) var(--easing-spring)',
                maxWidth: '800px',
                margin: 'var(--spacing-xl) auto 0 auto'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <div style={{ 
                  fontSize: '1.5em',
                  color: currentTheme.primary 
                }}>
                  🌍
                </div>
                <div>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: 'var(--text-headline)', 
                    fontWeight: 'var(--font-semibold)',
                    color: currentTheme.text
                  }}>
                    {showCountryImage.country}
                  </h4>
                  <p style={{ 
                    margin: 0, 
                    fontSize: 'var(--text-footnote)', 
                    color: currentTheme.textSecondary 
                  }}>
                    Discover this destination
                  </p>
                </div>
              </div>

              <div style={{ 
                position: 'relative',
                borderRadius: 'var(--radius-button)',
                overflow: 'hidden',
                backgroundColor: currentTheme.backgroundSecondary
              }}>
                <img
                  src={showCountryImage.imageUrl}
                  alt={`Beautiful view of ${showCountryImage.country}`}
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'opacity var(--transition-standard)'
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                  onError={(e) => {
                    console.log('Image failed to load:', showCountryImage.imageUrl);
                    setImageLoadError(prev => new Set([...prev, showCountryImage.country]));
                    // Create a beautiful gradient fallback
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    if (parent && !parent.querySelector('.fallback-bg')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-bg';
                      fallback.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 1.2rem;
                        font-weight: var(--font-semibold);
                      `;
                      fallback.innerHTML = `🌍 ${showCountryImage.country}`;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>

              <div style={{ 
                marginTop: 'var(--spacing-sm)',
                fontSize: 'var(--text-caption-1)',
                color: currentTheme.textTertiary,
                textAlign: 'center'
              }}>
                Great match! This image will update with your next correct answer.
              </div>
            </div>
          )}

          {/* Round Complete Screen */}
          {gameStatus === 'roundComplete' && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: 40, 
              padding: 24, 
              backgroundColor: currentTheme.completionBg, 
              borderRadius: 12, 
              border: `2px solid ${currentTheme.completionBorder}`,
              color: currentTheme.text
            }}>
              <h2>🎉 Round {currentRound} Complete!</h2>
              <p style={{ fontSize: '1.2em', margin: '16px 0' }}>
                Perfect score! You earned {currentCountries.length} points.
              </p>
              <p style={{ fontSize: '1.1em', margin: '8px 0', color: currentTheme.secondary }}>
                Total Score: {totalScore} points
              </p>
              <button 
                onClick={nextRound}
                style={{ 
                  padding: '12px 24px', 
                  fontSize: '1.1em', 
                  backgroundColor: currentTheme.primary, 
                  color: currentTheme.background, 
                  border: 'none', 
                  borderRadius: 8, 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: `0 2px 4px ${currentTheme.shadow}`
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = '0.8';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Next Round →
              </button>
            </div>
          )}

          {/* Game Won Screen */}
          {gameStatus === 'gameWon' && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: 40, 
              padding: 24, 
              backgroundColor: currentTheme.completionBg, 
              borderRadius: 12, 
              border: `2px solid ${currentTheme.completionBorder}`,
              color: currentTheme.text
            }}>
              <h2>🏆 Congratulations!</h2>
              <p style={{ fontSize: '1.3em', margin: '16px 0' }}>
                You've completed all 10 rounds!
              </p>
              <p style={{ fontSize: '1.1em', margin: '8px 0' }}>
                Final Score: {totalScore} points
              </p>
              <p style={{ fontSize: '1.1em', margin: '8px 0', fontWeight: 'bold', color: currentTheme.primary }}>
                🌍 You've learned about {usedCountries.length} unique countries!
              </p>
              <button 
                onClick={restartGame}
                style={{ 
                  padding: '12px 24px', 
                  fontSize: '1.1em', 
                  backgroundColor: currentTheme.primary, 
                  color: currentTheme.background, 
                  border: 'none', 
                  borderRadius: 8, 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: `0 2px 4px ${currentTheme.shadow}`
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = '0.8';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🌍 Play Again
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameStatus === 'gameOver' && (
            <div style={{ 
              textAlign: 'center', 
              marginTop: 40, 
              padding: 24, 
              backgroundColor: currentTheme.factZone, 
              borderRadius: 12, 
              border: `2px solid #f44336`,
              color: currentTheme.text
            }}>
              <h2>😔 Game Over</h2>
              <p style={{ fontSize: '1.2em', margin: '16px 0' }}>
                You made too many mistakes in Round {currentRound}.
              </p>
              <p style={{ fontSize: '1em', margin: '8px 0', color: currentTheme.secondary }}>
                You reached Round {currentRound} with {totalScore} total points.
              </p>
              <p style={{ fontSize: '1em', margin: '8px 0', fontWeight: 'bold', color: currentTheme.primary }}>
                🌍 You learned about {usedCountries.length} unique countries!
              </p>
              <button 
                onClick={restartGame}
                style={{ 
                  padding: '12px 24px', 
                  fontSize: '1.1em', 
                  backgroundColor: currentTheme.primary, 
                  color: currentTheme.background, 
                  border: 'none', 
                  borderRadius: 8, 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: `0 2px 4px ${currentTheme.shadow}`
                }}
                onMouseOver={(e) => {
                  e.target.style.opacity = '0.8';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🔄 Try Again
              </button>
            </div>
          )}
        </>
      )}
    </main>
  )
}
