import React, { useState, useEffect } from 'react'

function App() {
  // Game State
  const [gameState, setGameState] = useState('modeSelection')
  const [selectedMode, setSelectedMode] = useState(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [score, setScore] = useState(0)
  const [failures, setFailures] = useState(0)
  const [draggedCountry, setDraggedCountry] = useState(null)
  const [matches, setMatches] = useState([])
  const [roundCountries, setRoundCountries] = useState([])
  const [shuffledFacts, setShuffledFacts] = useState([])
  const [currentTourismImage, setCurrentTourismImage] = useState(null)
  const [currentTourismCountry, setCurrentTourismCountry] = useState(null)
  const [showTourismWindow, setShowTourismWindow] = useState(false)
  const [usedCountries, setUsedCountries] = useState([])

  // Countries Database - 50 countries for 10 rounds
  const countriesDatabase = [
    {
      country: 'Japan',
      flag: '🇯🇵',
      knowledge: 'An island nation in East Asia, famous for its ancient traditions, modern technology, and cherry blossoms.',
      wacky: 'Has more vending machines per capita than any other country - about one for every 23 people!',
      image: '/images/countries/japan.jpg'
    },
    {
      country: 'Brazil',
      flag: '🇧🇷',
      knowledge: 'The largest country in South America, home to the Amazon rainforest and famous for its carnival celebrations.',
      wacky: 'Is the only country named after a tree - the brazilwood tree that was highly valued for making red dye!',
      image: '/images/countries/brazil.jpg'
    },
    {
      country: 'France',
      flag: '🇫🇷',
      knowledge: 'A Western European country known for its art, cuisine, fashion, and the Eiffel Tower in Paris.',
      wacky: 'It is illegal to name a pig Napoleon - this law was created to protect the legacy of the famous emperor!',
      image: '/images/countries/france.jpg'
    },
    {
      country: 'Egypt',
      flag: '🇪🇬',
      knowledge: 'A North African country famous for ancient pyramids, the Sphinx, and the Nile River.',
      wacky: 'Ancient Egyptians used moldy bread as medicine - and they were actually right, as mold contains penicillin!',
      image: '/images/countries/egypt.jpg'
    },
    {
      country: 'Australia',
      flag: '🇦🇺',
      knowledge: 'An island continent known for unique wildlife like kangaroos and koalas, and the Great Barrier Reef.',
      wacky: 'Has a town called "Nowhere Else" and another called "Why" - making for very confusing addresses!',
      image: '/images/countries/australia.jpg'
    },
    {
      country: 'Canada',
      flag: '🇨🇦',
      knowledge: 'The second-largest country in the world by land area, known for maple syrup, hockey, and natural beauty.',
      wacky: 'Has more lakes than the rest of the world combined - over 2 million of them!',
      image: '/images/countries/canada.jpg'
    },
    {
      country: 'India',
      flag: '🇮🇳',
      knowledge: 'A South Asian country with diverse cultures, languages, and home to the Taj Mahal.',
      wacky: 'Has a post office floating on Dal Lake in Kashmir - mail is delivered by boat!',
      image: '/images/countries/india.jpg'
    },
    {
      country: 'Italy',
      flag: '🇮🇹',
      knowledge: 'A Southern European country shaped like a boot, famous for pasta, pizza, and ancient Roman history.',
      wacky: 'Has more UNESCO World Heritage Sites than any other country - a total of 58!',
      image: '/images/countries/italy.jpg'
    },
    {
      country: 'Mexico',
      flag: '🇲🇽',
      knowledge: 'A North American country known for ancient Mayan and Aztec ruins, vibrant culture, and delicious cuisine.',
      wacky: 'The world\'s smallest volcano is in Mexico - Cuexcomate is only 43 feet tall!',
      image: '/images/countries/mexico.jpg'
    },
    {
      country: 'Spain',
      flag: '🇪🇸',
      knowledge: 'A European country known for flamenco dancing, bullfighting, and beautiful architecture like the Sagrada Familia.',
      wacky: 'Has a festival where people throw tomatoes at each other - La Tomatina uses 150,000 tomatoes!',
      image: '/images/countries/spain.jpg'
    },
    {
      country: 'China',
      flag: '🇨🇳',
      knowledge: 'The world\'s most populous country, home to the Great Wall and ancient civilizations.',
      wacky: 'Fortune cookies are not Chinese - they were actually invented in California!',
      image: '/images/countries/china.jpg'
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      knowledge: 'An island nation in Europe, birthplace of Shakespeare and home to Big Ben and Buckingham Palace.',
      wacky: 'The Queen legally owns all unmarked mute swans in open water in England and Wales!',
      image: '/images/countries/uk.jpg'
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      knowledge: 'A Central European country known for its history, engineering, and Oktoberfest celebrations.',
      wacky: 'Has a word "verschlimmbessern" meaning to make something worse by trying to improve it!',
      image: '/images/countries/germany.jpg'
    },
    {
      country: 'Russia',
      flag: '🇷🇺',
      knowledge: 'The largest country in the world by land area, spanning 11 time zones.',
      wacky: 'Contains about 20% of the world\'s fresh water, most of it frozen in Siberia!',
      image: '/images/countries/russia.jpg'
    },
    {
      country: 'Thailand',
      flag: '🇹🇭',
      knowledge: 'A Southeast Asian country famous for its beaches, temples, and delicious cuisine.',
      wacky: 'It\'s illegal to step on money because it has the king\'s face on it!',
      image: '/images/countries/thailand.jpg'
    },
    {
      country: 'Norway',
      flag: '🇳🇴',
      knowledge: 'A Scandinavian country known for fjords, Northern Lights, and high quality of life.',
      wacky: 'Knighted a penguin named Sir Nils Olav who lives in Edinburgh Zoo!',
      image: '/images/countries/norway.jpg'
    },
    {
      country: 'South Korea',
      flag: '🇰🇷',
      knowledge: 'An East Asian country known for K-pop, technology companies like Samsung, and kimchi.',
      wacky: 'Has the fastest internet speed in the world and more internet cafes per capita than anywhere else!',
      image: '/images/countries/southkorea.jpg'
    },
    {
      country: 'Argentina',
      flag: '🇦🇷',
      knowledge: 'A South American country famous for tango, beef, and Patagonia\'s natural beauty.',
      wacky: 'Has the world\'s widest avenue - 9 de Julio Avenue has up to 22 lanes!',
      image: '/images/countries/argentina.jpg'
    },
    {
      country: 'Netherlands',
      flag: '🇳🇱',
      knowledge: 'A European country known for tulips, windmills, canals, and cycling culture.',
      wacky: 'Has more bikes than residents - about 23 million bikes for 17 million people!',
      image: '/images/countries/netherlands.jpg'
    },
    {
      country: 'Turkey',
      flag: '🇹🇷',
      knowledge: 'A transcontinental country connecting Europe and Asia, famous for its history and cuisine.',
      wacky: 'Santa Claus was born in Turkey - the original Saint Nicholas was from Myra!',
      image: '/images/countries/turkey.jpg'
    },
    {
      country: 'Kenya',
      flag: '🇰🇪',
      knowledge: 'An East African country famous for wildlife safaris, the Maasai people, and distance running.',
      wacky: 'Flamingos are naturally white - they turn pink from eating algae and shrimp!',
      image: '/images/countries/kenya.jpg'
    },
    {
      country: 'Greece',
      flag: '🇬🇷',
      knowledge: 'A Mediterranean country considered the birthplace of democracy and Western philosophy.',
      wacky: 'Feta cheese can only legally be called "feta" if it\'s made in Greece!',
      image: '/images/countries/greece.jpg'
    },
    {
      country: 'Sweden',
      flag: '🇸🇪',
      knowledge: 'A Scandinavian country known for IKEA, meatballs, and the Nobel Prize.',
      wacky: 'Has a law called "allemansrätten" giving everyone the right to roam freely in nature!',
      image: '/images/countries/sweden.jpg'
    },
    {
      country: 'Morocco',
      flag: '🇲🇦',
      knowledge: 'A North African country known for its vibrant markets, historic cities, and diverse landscapes.',
      wacky: 'The leather used in luxury goods worldwide often comes from the ancient tanneries of Fez!',
      image: '/images/countries/morocco.jpg'
    },
    {
      country: 'Peru',
      flag: '🇵🇪',
      knowledge: 'A South American country home to Machu Picchu and the ancient Inca civilization.',
      wacky: 'Has over 3,000 varieties of potatoes - they were first cultivated here 8,000 years ago!',
      image: '/images/countries/peru.jpg'
    },
    {
      country: 'Singapore',
      flag: '🇸🇬',
      knowledge: 'A city-state in Southeast Asia known for its cleanliness, diversity, and economic success.',
      wacky: 'Chewing gum is illegal to sell, and you can be fined for not flushing public toilets!',
      image: '/images/countries/singapore.jpg'
    },
    {
      country: 'Chile',
      flag: '🇨🇱',
      knowledge: 'A long, narrow South American country known for wine, the Atacama Desert, and Easter Island.',
      wacky: 'Is so narrow that you can see both the Pacific Ocean and the Andes mountains from many places!',
      image: '/images/countries/chile.jpg'
    },
    {
      country: 'Switzerland',
      flag: '🇨🇭',
      knowledge: 'A mountainous European country famous for chocolate, watches, and neutrality.',
      wacky: 'It\'s illegal to own just one guinea pig because they get lonely - you must have at least two!',
      image: '/images/countries/switzerland.jpg'
    },
    {
      country: 'Vietnam',
      flag: '🇻🇳',
      knowledge: 'A Southeast Asian country known for its beautiful landscapes, rich history, and delicious cuisine.',
      wacky: 'Motorbikes are so popular that some McDonald\'s locations have drive-through service for motorcycles!',
      image: '/images/countries/vietnam.jpg'
    },
    {
      country: 'New Zealand',
      flag: '🇳🇿',
      knowledge: 'An island nation known for stunning landscapes, Maori culture, and being the filming location for Lord of the Rings.',
      wacky: 'Has more species of penguins than any other country, and they outnumber people in some areas!',
      image: '/images/countries/newzealand.jpg'
    },
    {
      country: 'Iceland',
      flag: '🇮🇸',
      knowledge: 'A Nordic island country known for volcanoes, geysers, glaciers, and the Blue Lagoon.',
      wacky: 'Runs almost entirely on renewable energy and has no mosquitoes!',
      image: '/images/countries/iceland.jpg'
    },
    {
      country: 'South Africa',
      flag: '🇿🇦',
      knowledge: 'A country at the southern tip of Africa known for wildlife, Nelson Mandela, and diverse cultures.',
      wacky: 'Has 11 official languages - more than any other country in the world!',
      image: '/images/countries/southafrica.jpg'
    },
    {
      country: 'Portugal',
      flag: '🇵🇹',
      knowledge: 'A European country known for port wine, beautiful coastlines, and historic cities.',
      wacky: 'Cork comes from cork oak trees, and Portugal produces about 50% of the world\'s cork!',
      image: '/images/countries/portugal.jpg'
    },
    {
      country: 'Indonesia',
      flag: '🇮🇩',
      knowledge: 'The world\'s largest archipelago with over 17,000 islands, known for diverse cultures and Bali.',
      wacky: 'Has more volcanoes than any other country - over 130 active ones!',
      image: '/images/countries/indonesia.jpg'
    },
    {
      country: 'Colombia',
      flag: '🇨🇴',
      knowledge: 'A South American country known for coffee, emeralds, and diverse ecosystems.',
      wacky: 'Produces about 60% of the world\'s emeralds and has the most bird species of any country!',
      image: '/images/countries/colombia.jpg'
    },
    {
      country: 'Malaysia',
      flag: '🇲🇾',
      knowledge: 'A Southeast Asian country known for diverse cultures, rainforests, and the Petronas Towers.',
      wacky: 'Has the world\'s largest flower - the Rafflesia can grow up to 3 feet across and smells like rotting meat!',
      image: '/images/countries/malaysia.jpg'
    },
    {
      country: 'Ireland',
      flag: '🇮🇪',
      knowledge: 'An island nation known for green landscapes, traditional music, and friendly people.',
      wacky: 'There are more Irish people living outside Ireland than in Ireland - about 70 million worldwide!',
      image: '/images/countries/ireland.jpg'
    },
    {
      country: 'Israel',
      flag: '🇮🇱',
      knowledge: 'A Middle Eastern country known for ancient history, the Dead Sea, and technological innovation.',
      wacky: 'The Dead Sea is so salty you can\'t sink in it, and it\'s the lowest point on Earth\'s surface!',
      image: '/images/countries/israel.jpg'
    },
    {
      country: 'Philippines',
      flag: '🇵🇭',
      knowledge: 'An archipelago in Southeast Asia known for beautiful beaches, rice terraces, and over 7,000 islands.',
      wacky: 'Has the world\'s smallest primate - the tarsier has eyes bigger than its brain!',
      image: '/images/countries/philippines.jpg'
    },
    {
      country: 'Cuba',
      flag: '🇨🇺',
      knowledge: 'A Caribbean island nation known for classic cars, cigars, and revolutionary history.',
      wacky: 'Has one of the highest literacy rates in the world - 99.8% of adults can read and write!',
      image: '/images/countries/cuba.jpg'
    },
    {
      country: 'Czech Republic',
      flag: '🇨🇿',
      knowledge: 'A Central European country known for Prague\'s architecture, beer culture, and crystal glass.',
      wacky: 'Drinks more beer per person than any other country - about 142 liters per person per year!',
      image: '/images/countries/czechrepublic.jpg'
    },
    {
      country: 'Austria',
      flag: '🇦🇹',
      knowledge: 'A European country known for classical music, the Alps, and The Sound of Music.',
      wacky: 'Mozart was born here, but he actually preferred to live in other countries and died quite poor!',
      image: '/images/countries/austria.jpg'
    },
    {
      country: 'Jordan',
      flag: '🇯🇴',
      knowledge: 'A Middle Eastern country home to the ancient city of Petra and part of the Dead Sea.',
      wacky: 'Petra was built by the Nabataeans and remained hidden from the Western world for over 1,000 years!',
      image: '/images/countries/jordan.jpg'
    },
    {
      country: 'Finland',
      flag: '🇫🇮',
      knowledge: 'A Nordic country known for saunas, Nokia, and consistently ranking as one of the happiest countries.',
      wacky: 'Has more saunas than cars - about 2 million saunas for 5.5 million people!',
      image: '/images/countries/finland.jpg'
    },
    {
      country: 'Denmark',
      flag: '🇩🇰',
      knowledge: 'A Scandinavian country known for LEGO, hygge culture, and being the happiest country in the world.',
      wacky: 'LEGO bricks from 1958 still click perfectly with LEGO bricks made today!',
      image: '/images/countries/denmark.jpg'
    },
    {
      country: 'Ecuador',
      flag: '🇪🇨',
      knowledge: 'A South American country known for the Galápagos Islands, the Amazon rainforest, and being on the equator.',
      wacky: 'The Galápagos Islands inspired Darwin\'s theory of evolution, and giant tortoises there can live over 150 years!',
      image: '/images/countries/ecuador.jpg'
    },
    {
      country: 'Madagascar',
      flag: '🇲🇬',
      knowledge: 'An island nation off Africa known for unique wildlife including lemurs and baobab trees.',
      wacky: '90% of its wildlife exists nowhere else on Earth - it\'s like a living laboratory of evolution!',
      image: '/images/countries/madagascar.jpg'
    },
    {
      country: 'Nepal',
      flag: '🇳🇵',
      knowledge: 'A Himalayan country home to Mount Everest and the birthplace of Buddha.',
      wacky: 'Is the only country with a non-rectangular flag, and its flag contains mathematical instructions for drawing it!',
      image: '/images/countries/nepal.jpg'
    },
    {
      country: 'Nigeria',
      flag: '🇳🇬',
      knowledge: 'Africa\'s most populous country known for Nollywood films, diverse cultures, and oil resources.',
      wacky: 'Nollywood produces more movies than Hollywood - about 2,500 films per year!',
      image: '/images/countries/nigeria.jpg'
    },
    {
      country: 'Belgium',
      flag: '🇧🇪',
      knowledge: 'A European country known for chocolates, waffles, and being home to the European Union headquarters.',
      wacky: 'Has more castles per square kilometer than any other country in the world!',
      image: '/images/countries/belgium.jpg'
    },
    {
      country: 'Cambodia',
      flag: '🇰🇭',
      knowledge: 'A Southeast Asian country famous for the ancient temple complex of Angkor Wat.',
      wacky: 'Angkor Wat is the largest religious monument in the world and appears on the country\'s flag!',
      image: '/images/countries/cambodia.jpg'
    }
  ]

  // Game Logic
  const generateRoundCountries = () => {
    // Filter out countries that have already been used
    const availableCountries = countriesDatabase.filter(
      country => !usedCountries.includes(country.country)
    )
    
    // Shuffle available countries and take 5
    const shuffled = [...availableCountries].sort(() => Math.random() - 0.5)
    const selectedCountries = shuffled.slice(0, 5)
    
    // Debug: Log what we're getting
    console.log('Selected countries for round:', selectedCountries)
    selectedCountries.forEach(country => {
      console.log(`Country: ${country.country}, Flag: "${country.flag}"`)
    })
    
    // Add these countries to the used list
    const newUsedCountries = [...usedCountries, ...selectedCountries.map(c => c.country)]
    setUsedCountries(newUsedCountries)
    
    return selectedCountries.map(country => ({
      ...country,
      fact: selectedMode === 'knowledge' ? country.knowledge : country.wacky
    }))
  }

  useEffect(() => {
    if (gameState === 'playing' && roundCountries.length === 0) {
      const newRoundCountries = generateRoundCountries()
      setRoundCountries(newRoundCountries)
      
      // Shuffle facts once and store them
      const shuffled = [...newRoundCountries].sort(() => Math.random() - 0.5)
      setShuffledFacts(shuffled)
    }
  }, [gameState, selectedMode])

  const startGame = (mode) => {
    setSelectedMode(mode)
    setGameState('playing')
    setCurrentRound(1)
    setScore(0)
    setMatches([])
    setCurrentTourismImage(null)
    setCurrentTourismCountry(null)
    setShowTourismWindow(false)
    setUsedCountries([]) // Reset used countries for new game
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
      setCurrentTourismCountry(draggedCountry.country)
      setShowTourismWindow(true)
      
      // Check if round is complete
      if (matches.length + 1 === 5) {
        setTimeout(() => {
          if (currentRound === 10) {
            setGameState('gameComplete')
          } else {
            setGameState('roundComplete')
          }
        }, 2000)
      }
    } else if (draggedCountry) {
      // Wrong match - increment failures
      const newFailures = failures + 1
      setFailures(newFailures)
      
      // Check if game should end due to too many failures
      if (newFailures >= 3) {
        setTimeout(() => {
          setGameState('gameOver')
        }, 1000)
      }
    }
    
    setDraggedCountry(null)
  }

  const nextRound = () => {
    setCurrentRound(currentRound + 1)
    setMatches([])
    setFailures(0)
    setRoundCountries([])
    setShuffledFacts([])
    setGameState('playing')
    setCurrentTourismImage(null)
    setCurrentTourismCountry(null)
    setShowTourismWindow(false)
  }

  const resetGame = () => {
    setGameState('modeSelection')
    setSelectedMode(null)
    setCurrentRound(1)
    setScore(0)
    setFailures(0)
    setMatches([])
    setRoundCountries([])
    setShuffledFacts([])
    setCurrentTourismImage(null)
    setCurrentTourismCountry(null)
    setShowTourismWindow(false)
    setUsedCountries([]) // Reset used countries
  }

  // Apple Design Styles
  const styles = {
    app: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
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
      WebkitTextFillColor: 'transparent'
    },
    heroSubtitle: {
      fontSize: '22px',
      fontWeight: '400',
      marginBottom: '64px',
      opacity: 0.8,
      maxWidth: '600px'
    },
    modeCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      padding: '32px',
      width: '280px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      margin: '16px'
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
      gridTemplateColumns: '1fr 1fr',
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <img 
              src="/TravelTilesimage.png" 
              alt="Travel Tiles Logo" 
              style={{ 
                width: '64px', 
                height: '64px', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
              }} 
            />
            <h1 style={styles.heroTitle}>Travel Tiles</h1>
          </div>
          <p style={styles.heroSubtitle}>
            Discover the world through drag-and-drop geography matching
          </p>
          
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
    const unmatchedShuffledFacts = shuffledFacts.filter(
      country => !matches.some(match => match.country === country.country)
    )

    return (
      <div style={styles.app}>
        <div style={styles.gameContainer}>
          <div style={styles.gameHeader}>
            <div>
              <h2 style={{ margin: 0, fontSize: '28px' }}>
                Round {currentRound}/10 - {selectedMode === 'knowledge' ? '🧠 Knowledge' : '🎭 Wacky Facts'}
              </h2>
            </div>
            <div style={{ fontSize: '22px', fontWeight: '600' }}>
              Score: {score} | Lives: {'❤️'.repeat(3 - failures)}{'🤍'.repeat(failures)}
            </div>
            <button style={styles.button} onClick={resetGame}>
              Reset Game
            </button>
          </div>
          
          <div style={styles.gameContent}>
            {/* Countries Column */}
            <div>
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
                    {country.country}
                  </div>
                ))}
              </div>

              {/* Tourism Window Below Countries */}
              {showTourismWindow && (
                <div style={{ ...styles.tourismWindow, marginTop: '32px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '22px', fontWeight: '600' }}>
                    🏛️ {currentTourismCountry || 'Tourism Window'}
                  </h3>
                  {currentTourismImage ? (
                    <img 
                      src={currentTourismImage} 
                      alt="Country landmark" 
                      style={styles.tourismImage}
                      onError={(e) => {
                        e.target.src = '/images/countries/default.svg'
                      }}
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
            </div>

            {/* Facts Column */}
            <div style={styles.column}>
              <h3 style={{ marginTop: 0, fontSize: '22px', fontWeight: '600' }}>
                Facts ({unmatchedShuffledFacts.length})
              </h3>
              {unmatchedShuffledFacts.map((country, index) => (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, country)}
                  style={styles.factZone}
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
              Round {currentRound} of 10
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

  // Game Over Screen (2 failures reached)
  if (gameState === 'gameOver') {
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
          <h1 style={styles.heroTitle}>😔 Game Over</h1>
          <p style={styles.heroSubtitle}>
            You've reached the maximum of 3 incorrect matches
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
              Round {currentRound} • {selectedMode === 'knowledge' ? '🧠 Knowledge Mode' : '🎭 Wacky Facts Mode'}
            </div>
            <div style={{ fontSize: '16px', opacity: 0.9, marginBottom: '16px' }}>
              Correct matches: {matches.length}
            </div>
            <div style={{ fontSize: '16px', opacity: 0.9 }}>
              Don't worry - every expert started as a beginner!
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
            Try Again
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
              You've explored 50 countries and learned amazing facts!
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