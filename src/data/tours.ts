import type { ImageMetadata } from 'astro';

// Import all tour images
import downtownTour from '../assets/downtown-santa-cruz_wikimedia.jpg';
import goldenGateVilla from '../assets/GoldenGate_Villa.jpg';
import beachHillHero from '../assets/beach-hill-hero.jpg';
import beachHillCard from '../assets/beach-hill-card_IMG_9631.jpg';
import surfer from '../assets/surfer.jpg';

// Import surf tour gallery images
import bigWave from '../assets/surf-tour/bigWave_Brocken-Inaglory_wikimediaCommons.jpg';
import brokenInaglory from '../assets/surf-tour/By Brocken Inaglory_wikimediaCommons.jpg';
import cowells from '../assets/surf-tour/Cowells_IMG_7032.jpg';
import cypressPoint from '../assets/surf-tour/CypressPointIMG_0028.jpg';
import img9631 from '../assets/surf-tour/IMG_9631.jpg';
import itsBeach from '../assets/surf-tour/Its_Beach.jpg';
import otter from '../assets/surf-tour/otter.jpg';
import pexelsSurf from '../assets/surf-tour/pexels-steven-bero-2154551604-33281927.jpg';
import surfingClub from '../assets/surf-tour/SurfingClub-Mayo-UCSC.jpg';

// Import heart tour gallery images
import heartImg9251 from '../assets/heart-photos/IMG_9251.jpg';
import heartImg9265 from '../assets/heart-photos/IMG_9265.jpg';
import heartMission from '../assets/heart-photos/mission-santa-cruz_MARELBU-wikimedia.jpg';
import heartSquidRow from '../assets/heart-photos/SquidRow.jpg';
import heartVictorian from '../assets/heart-photos/Victorian.jpg';
import heartWalnutAve from '../assets/heart-photos/walnut-ave.jpg';

// Import beach hill tour gallery images
import beachDelMar from '../assets/beach-hill/DelMar-Theater_IMG_6099-Recovered.jpg';
import beachDowntown from '../assets/beach-hill/downtown2-aaronbrick_wikimedia.jpg';
import beachHindsHouse from '../assets/beach-hill/hinds-house.jpg';
import beachImg0074 from '../assets/beach-hill/IMG_0074.jpg';
import beachImg0083 from '../assets/beach-hill/IMG_0083.jpg';
import beachImg0472 from '../assets/beach-hill/IMG_0472.jpg';
import beachImg1066 from '../assets/beach-hill/IMG_1066.jpeg.jpg';
import beachMission from '../assets/beach-hill/mission-santa-cruz_photo-MARELBU-wikimedia.jpg';
import beachWalnut5 from '../assets/beach-hill/walnut5.jpg';

// TypeScript Interfaces
export interface MeetingPoint {
  name: string;
  url: string;
  embedUrl?: string;
}

export interface TourItineraryStop {
  title: string;
  description: string;
  duration?: string;
}

export interface TourFAQ {
  question: string;
  answer: string;
}

export interface TourIncludes {
  included: string[];
  toBring: string[];
  notIncluded?: string[];
}

export interface Tour {
  // Basic Info
  slug: string;
  title: string;
  shortDescription: string;  // For cards
  longDescription: string;   // For tour page hero

  // Images
  cardImage: ImageMetadata;
  cardImageAlt: string;
  heroImage: ImageMetadata;
  heroImageAlt: string;
  galleryImages: {
    src: ImageMetadata;
    alt: string;
    caption?: string;
  }[];

  // Logistics
  duration: string;
  price: string;
  adultPrice: number;
  childPrice: number;
  schedule: string;
  meetingPoint: MeetingPoint;
  bookingUrl: string;

  // Detailed Content
  storytelling: string;
  itinerary: TourItineraryStop[];
  highlights: string[];
  includes: TourIncludes;
  faqs: TourFAQ[];

  // SEO
  seoTitle: string;
  seoDescription: string;
  keywords: string[];

  // Related
  relatedTourSlugs: string[];
}

// Tour Data
export const tours: Tour[] = [
  {
    slug: 'downtown-mission-hill',
    title: 'Heart of Santa Cruz Tour',
    shortDescription: "Explore Santa Cruz's rich history, architecture, and culture on a relaxed 90-minute walking tour. Led by a knowledgeable local guide.",
    longDescription: "Journey through time as we explore downtown Santa Cruz's architectural gems and the historic Mission Hill district. Discover the stories behind the buildings, the people who shaped this coastal town, and the vibrant culture that makes Santa Cruz unique.",

    cardImage: downtownTour,
    cardImageAlt: 'Downtown Santa Cruz street scene',
    heroImage: downtownTour,
    heroImageAlt: 'Historic downtown Santa Cruz architecture',
    galleryImages: [
      { src: heartSquidRow, alt: 'Squid Row alley', caption: 'Squid Row - Photo by M. O\'Leary' },
      { src: heartMission, alt: 'Mission Santa Cruz', caption: 'Mission Santa Cruz - Photo by MARELBU (Wikimedia)' },
      { src: heartVictorian, alt: 'Victorian home', caption: 'Historic Victorian - Photo by M. O\'Leary' },
      { src: heartWalnutAve, alt: 'Walnut Avenue', caption: 'Walnut Avenue - Photo by M. O\'Leary' },
      { src: heartImg9251, alt: 'Downtown Santa Cruz', caption: 'Downtown Santa Cruz - Photo by M. O\'Leary' },
      { src: heartImg9265, alt: 'Historic Santa Cruz building', caption: 'Historic Santa Cruz - Photo by M. O\'Leary' }
    ],

    duration: '1.5 hours',
    price: 'Adult $45 / Child $30',
    adultPrice: 45,
    childPrice: 30,
    schedule: 'Friday, Saturday, and Sunday at 2pm',
    meetingPoint: {
      name: 'Abbott Square Market in Downtown Santa Cruz',
      url: 'https://maps.app.goo.gl/M7uF1gUT19KMFiMW8',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.4667898953576!2d-122.02546669999998!3d36.9747896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e4026125f9a71%3A0x8ba1abfab596ea05!2sAbbott%20Square%20Market!5e0!3m2!1sen!2sus!4v1764894658764!5m2!1sen!2sus'
    },
    bookingUrl: 'https://fareharbor.com/embeds/book/walksantacruz/items/673407/calendar/2025/12/?full-items=yes',

    storytelling: "Discover Santa Cruz the way locals love it — on foot, at a relaxed pace, with stories that bring the streets to life. This safe, guided walking tour connects the city's past and present, from its early adobe beginnings to its creative, surf-inspired culture today. Along the way, you'll hear how natural beauty, resilience, and community spirit have shaped Santa Cruz through centuries of change — from the original Ohlone inhabitants to the rebirth that followed the 1989 earthquake. Each stop adds a new layer to the city's unique character. You'll learn in a fun, conversational way as you walk shaded streets, peek into hidden courtyards, and see historic buildings through the eyes of a local who's passionate about this place. Small groups make it personal and flexible — there's time for questions, photos, and a few good stories you won't find in a guidebook. By the end, you'll not only know Santa Cruz — you'll feel it.",

    itinerary: [
      {
        title: 'Explore Upper Pacific Ave',
        description: 'Discover the Cooper House site, iconic Town Clock, and the oldest commercial building on Upper Pacific Avenue. Learn about the architectural heritage and early commerce that shaped downtown.'
      },
      {
        title: 'See the Old Santa Cruz Mission Site',
        description: 'Visit the 1822 adobe—the county\'s oldest and California\'s best-preserved Native mission residence. Enjoy stunning downtown views while learning about the complex history of Spanish colonization and the indigenous Ohlone people.'
      },
      {
        title: 'Mission Plaza',
        description: 'Explore how the Mission\'s plaza became the first business district and town center after 1830s secularization. Understand the transformation from religious center to commercial hub.'
      },
      {
        title: 'Stroll down Squid Row',
        description: 'Walk through this artistic alley that hosted the legendary \'80s Calamari Festival. Discover unique architecture, galleries, and the creative spirit that defines Santa Cruz.'
      },
      {
        title: 'Santa Cruz City Hall',
        description: 'Discover the 1937 City Hall and 1940 Civic Auditorium, the city\'s government and cultural hub. Explore the surrounding gardens and learn about the civic pride that rebuilt Santa Cruz.'
      },
      {
        title: 'Walk Santa Cruz\'s "Garden District"',
        description: 'Stroll through this walkable neighborhood lined with grand Victorian-era homes and lush gardens. See how Santa Cruz\'s prosperous families created an elegant residential enclave.'
      },
      {
        title: 'Historic Del Mar Theater',
        description: 'Stroll past this 1936 Art Deco movie palace and listen to the musicians that frequent the Pacific Garden Mall. Experience the vibrant street culture and architectural gems of downtown.'
      }
    ],

    highlights: [
      'Small groups (max 10) make it personal and flexible',
      'Insider tips for local restaurants, coffee, and nearby attractions',
      'Upper Pacific Avenue - Cooper House site, iconic Town Clock, and oldest commercial building',
      'Old Santa Cruz Mission Site - the county\'s oldest 1822 adobe and California\'s best-preserved Native mission residence',
      'Mission Plaza - the first business district and town center',
      'Squid Row - artistic alley with unique architecture and galleries',
      'Santa Cruz City Hall - 1937 building with beautiful surrounding gardens',
      'Santa Cruz\'s "Garden District" - grand Victorian-era homes and lush gardens',
      'Historic Del Mar Theater - 1936 Art Deco movie palace and Pacific Garden Mall'
    ],

    includes: {
      included: [
        'Safe, guided walking tour led by a knowledgeable local host',
        '6–7 curated stops featuring Santa Cruz\'s most historic and scenic landmarks',
        'Engaging stories about the people, places, and events that shaped the city',
        'Small group experience (maximum 10 guests) for a comfortable, personalized pace',
        'Relaxed walking route with frequent stops and plenty of shade',
        'Local tips and recommendations for food, coffee, and nearby attractions'
      ],
      toBring: [
        'Comfortable walking shoes (we\'ll encounter some stairs and uphill sections)',
        'Water bottle to stay hydrated throughout the tour',
        'Sunscreen, hat, and layered clothing (coastal weather can change quickly)',
        'Camera or smartphone for capturing the beautiful architecture and views',
        'Curiosity and questions - our guides love sharing their knowledge'
      ],
      notIncluded: [
        'Transportation to downtown / Abbott Square',
        'Parking downtown ($1.25 per hour)',
        'Food, coffee, or other refreshments',
        'Gratuities for your guide (optional but appreciated)'
      ]
    },

    faqs: [
      {
        question: 'What fitness level is required for this tour?',
        answer: 'This tour involves moderate walking with some stairs and uphill sections, particularly when ascending Mission Hill. The total distance is approximately 1.5 miles. Most people in reasonable health can comfortably complete the tour. We maintain a relaxed pace with regular breaks for storytelling and photos. If you have any mobility concerns, please contact us in advance to discuss potential modifications.'
      },
      {
        question: 'Is the tour suitable for children?',
        answer: 'Yes! Children are welcome and we offer discounted pricing for kids under 12 and seniors. Our guides are experienced at engaging younger visitors with interesting stories, fun facts, and interactive elements. However, please note that the tour involves about 90 minutes of walking and some stairs. We recommend this tour for children ages 6 and up who are comfortable walking for extended periods.'
      },
      {
        question: 'What happens if it rains or the weather is bad?',
        answer: 'Tours operate rain or shine! Santa Cruz generally has mild weather year-round, but we recommend checking the forecast and dressing in layers. Light rain won\'t stop us - we\'ll provide some tips for staying comfortable. In the rare event of severe weather (heavy rain, high winds, or unsafe conditions), we will contact you at least 2 hours before the tour to reschedule or offer a full refund.'
      },
      {
        question: 'Can I book a private tour for my group?',
        answer: 'Absolutely! We love hosting private tours for families, friend groups, corporate teams, or special occasions. Private tours can be customized to your interests and schedule. Contact us at hello@walksantacruz.com or call 831-275-2566 to arrange your personalized experience. Check out our Private Tours page for more ideas and inspiration.'
      },
      {
        question: 'Is the tour wheelchair or stroller accessible?',
        answer: 'Yes! We offer a wheelchair-friendly alternate route that avoids stairs while still capturing the essence of downtown Santa Cruz history. This accessible route includes some gentle hills but provides the same engaging stories and beautiful sights. Please let us know when booking that you need the accessible route so we can plan accordingly. We\'re happy to discuss any specific mobility needs - just contact us at hello@walksantacruz.com or call 831-275-2566.'
      },
      {
        question: 'Where do we meet and is parking available?',
        answer: 'We meet at Abbott Square Market in downtown Santa Cruz. There are several parking options nearby: the Locust Street Garage (often the most convenient), metered street parking on side streets, and the Cedar Street Garage. We recommend arriving 10-15 minutes early to find parking. The meeting point is also accessible by Santa Cruz Metro buses if you prefer public transportation.'
      },
      {
        question: 'Can I take photos during the tour?',
        answer: 'Yes, please do! We encourage photos and will pause at scenic spots and architectural highlights to give you time to capture great shots. Your guide can also recommend the best vantage points and may offer to take group photos. Just remember to stay with the group and be mindful of pedestrians and traffic.'
      },
      {
        question: 'Do you offer tours in languages other than English?',
        answer: 'Currently, our scheduled public tours are conducted in English. However, for private tours, we may be able to arrange guides who speak other languages depending on availability. Please contact us with your language needs and we\'ll do our best to accommodate your group.'
      }
    ],

    seoTitle: 'Downtown Santa Cruz & Mission Hill Walking Tour | Walk Santa Cruz',
    seoDescription: 'Explore Santa Cruz history, Victorian architecture, and Mission Hill on a guided 90-minute walking tour. Small groups, expert local guides, fascinating stories. Book your tour today!',
    keywords: [
      'santa cruz walking tour',
      'downtown santa cruz tour',
      'mission hill santa cruz',
      'santa cruz history tour',
      'santa cruz architecture',
      'guided walking tour santa cruz',
      'things to do santa cruz',
      'santa cruz mission tour',
      'victorian architecture santa cruz'
    ],

    relatedTourSlugs: ['beach-hill-loop', 'surfing-beach-culture']
  },

  {
    slug: 'beach-hill-loop',
    title: 'Santa Cruz: Beach to Mission Loop',
    shortDescription: "Start at the beach, climb through oceanfront estates, descend a hidden staircase into downtown, ascend to Mission Hill's historic adobe, then loop back through Victorian neighborhoods. This extended version of our signature Heart of Santa Cruz tour covers it all in one unforgettable journey.",
    longDescription: "Experience Santa Cruz from every angle on this epic loop that takes you from sea level to hilltop and back again. You'll explore elegant mansions with ocean views, discover secret staircases locals love, wander through downtown's architectural gems, climb to the city's historic mission site, and stroll through charming Victorian neighborhoods. It's the complete Santa Cruz story in one unforgettable walk.",

    cardImage: beachHillCard,
    cardImageAlt: 'Beach Hill oceanfront view',
    heroImage: beachHillHero,
    heroImageAlt: 'Beach Hill historic district overlooking Monterey Bay',
    galleryImages: [
      { src: goldenGateVilla, alt: 'Golden Gate Villa', caption: 'Golden Gate Villa - Photo by Eugene Zelenko (Wikimedia)' },
      { src: beachHindsHouse, alt: 'Historic Hinds House', caption: 'Hinds House - Photo by M. O\'Leary' },
      { src: beachImg0074, alt: 'Beach Hill mansion', caption: 'Beach Hill Estate - Photo by M. O\'Leary' },
      { src: beachImg0083, alt: 'Beach Hill oceanfront view', caption: 'Beach Hill Oceanfront - Photo by M. O\'Leary' },
      { src: beachImg0472, alt: 'Historic Santa Cruz building', caption: 'Historic Santa Cruz - Photo by M. O\'Leary' },
      { src: beachDelMar, alt: 'Del Mar Theater', caption: 'Del Mar Theater - Photo by M. O\'Leary' },
      { src: beachDowntown, alt: 'Downtown Santa Cruz', caption: 'Downtown Santa Cruz - Photo by Aaron Brick (Wikimedia)' },
      { src: beachMission, alt: 'Mission Santa Cruz', caption: 'Mission Santa Cruz - Photo by MARELBU (Wikimedia)' },
      { src: beachWalnut5, alt: 'Walnut Avenue Victorian home', caption: 'Walnut Avenue - Photo by M. O\'Leary' }
    ],

    duration: '2.5 hours',
    price: 'Adult $45 / Child $30',
    adultPrice: 45,
    childPrice: 30,
    schedule: 'Friday, Saturday, and Sunday at 10am',
    meetingPoint: {
      name: 'At the Boardwalk\'s Aloha Terrace Group Picnic Area (next to the Beach Volleyball Courts)',
      url: 'https://maps.app.goo.gl/BmwQe8d7kGhP5fjv9',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d488.90335691358507!2d-122.02059430240925!3d36.963662730594805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e6a998d43eeb3%3A0x75d32b092ac8f17d!2sAloha%20Terrace%20Group%20Picnic%20Area!5e0!3m2!1sen!2sus!4v1764894698969!5m2!1sen!2sus'
    },
    bookingUrl: 'https://fareharbor.com/embeds/book/walksantacruz/items/686749/calendar/2025/12/?full-items=yes',

    storytelling: "Experience Santa Cruz from every angle on this epic loop adventure. Start at the beach and walk up through Beach Hill's oceanfront estates, descend via a hidden staircase locals love, explore downtown's vibrant streets and architectural gems, then continue up to Mission Hill to visit the county's oldest adobe. Loop back through charming Victorian neighborhoods to complete the journey. This extended version of our signature Heart of Santa Cruz tour takes you from Beach Hill to Mission Hill and back again. You'll discover stories of wealthy families who built summer retreats here, how the Beach Boardwalk shaped the city, and how earthquakes and economic shifts transformed Santa Cruz. It's our most comprehensive tour—perfect for history enthusiasts who want the complete Santa Cruz story.",

    itinerary: [
      {
        title: 'Beach Hill Historic District',
        description: 'Begin among the grand estates and stunning ocean vistas of Beach Hill, where wealthy San Francisco families built elaborate summer retreats starting in the 1870s. Learn about the architectural styles, the notable residents, and how this neighborhood became Santa Cruz\'s most prestigious address. We\'ll discuss the 1989 earthquake\'s impact and the ongoing preservation efforts.'
      },
      {
        title: 'Beachfront & Boardwalk History',
        description: 'Descend toward the beach and Boardwalk area, exploring how Santa Cruz became a beach resort destination. Discover stories of the early pleasure piers, the development of the Beach Boardwalk, and the role tourism has played in shaping the city\'s economy and identity for over a century.'
      },
      {
        title: 'Downtown Santa Cruz',
        description: 'Move inland to downtown Santa Cruz, where we\'ll explore Pacific Avenue\'s architectural diversity, from Victorian-era buildings to modern post-earthquake reconstruction. Learn about the challenges and triumphs of downtown\'s evolution and the community spirit that rebuilt this area after 1989.'
      },
      {
        title: 'Mission Hill Climb',
        description: 'Ascend to Mission Hill, discovering the elegant homes and panoramic views that characterize this historic neighborhood. Hear about the early settlers, the mission history, and the families who established Santa Cruz\'s cultural and economic foundations.'
      },
      {
        title: 'Mission Santa Cruz & Holy Cross Church',
        description: 'Visit the mission replica and Holy Cross Church, understanding how Spanish colonization shaped the region and learning about the indigenous Ohlone people whose presence predates the mission by thousands of years. Take in the spectacular views while discussing the complex layers of local history.'
      },
      {
        title: 'Return Journey',
        description: 'As we make our way back to the starting point, we\'ll tie together the themes of the tour and discuss modern Santa Cruz - its challenges, its character, and its future. You\'ll finish with a comprehensive understanding of this unique coastal city and plenty of recommendations for further exploration.'
      }
    ],

    highlights: [
      'Extended 2.5-hour experience covering three distinct neighborhoods',
      'Small group size (maximum 10 people) for personalized attention',
      'Insider recommendations for restaurants, beaches, and hidden local spots',
      'Beach Hill Historic District - grand oceanfront estates with stunning views',
      'Santa Cruz Beach Boardwalk - California\'s oldest surviving amusement park',
      'Downtown Santa Cruz - Victorian, Craftsman, and Art Deco architecture',
      'Mission Hill - elegant homes and panoramic city views',
      'Mission Santa Cruz & Holy Cross Church - mission replica and spectacular overlook',
      'Multiple elevation changes providing dramatic coastal perspectives'
    ],

    includes: {
      included: [
        'Expert local guide with comprehensive knowledge of Santa Cruz history and architecture',
        'Extended 2.5-hour experience covering three distinct neighborhoods',
        'Small group size (maximum 10 people) ensuring personalized attention',
        'Multiple elevation changes providing dramatic views and perspectives',
        'Stories connecting Beach Hill, downtown, and Mission Hill',
        'Insider tips on local restaurants, beaches, trails, and attractions'
      ],
      toBring: [
        'Sturdy, comfortable walking shoes (this tour includes significant hills and stairs)',
        'Water bottle - staying hydrated is important on this longer tour',
        'Sunscreen, hat, and layered clothing (weather can vary from beach to hilltop)',
        'Camera for capturing ocean views, architecture, and panoramic vistas',
        'Snacks if needed (we don\'t stop for food but you can bring portable snacks)',
        'Good energy and curiosity - this is our longest tour'
      ],
      notIncluded: [
        'Food and beverages (though we\'ll point out excellent options)',
        'Gratuities for your guide (optional but appreciated)',
        'Transportation to and from the meeting point',
        'Entry to buildings or museums (exterior viewings only)'
      ]
    },

    faqs: [
      {
        question: 'This tour is longer than your others - what fitness level do I need?',
        answer: 'This 2.5-hour tour involves approximately 2.5-3 miles of walking with significant elevation changes, including hills and stairs throughout. You should be comfortable with sustained walking and climbing. We take regular breaks for stories and photos, and maintain a moderate pace. This tour is best suited for people who enjoy active exploration and are in good general health. If you\'re unsure whether this tour is right for you, consider starting with our shorter Downtown & Mission Hill tour.'
      },
      {
        question: 'How is this different from your Downtown & Mission Hill tour?',
        answer: 'This extended tour includes everything from our Downtown & Mission Hill tour PLUS the entire Beach Hill neighborhood and beachfront areas. You\'ll get the complete Santa Cruz story - from oceanfront estates to downtown architecture to hilltop views. It\'s ideal for visitors with more time who want a comprehensive understanding of the city, or for locals who want the deepest dive into Santa Cruz history and architecture. The Downtown & Mission Hill tour is 1.5 hours; this one is 2.5 hours.'
      },
      {
        question: 'Is this tour family-friendly?',
        answer: 'Yes, children are welcome and receive discounted pricing! However, please consider that this is our longest and most physically demanding tour. It\'s best suited for children age 8 and up who are comfortable with extended walking and hills. Our guides are skilled at engaging younger participants, but the length and hills can be challenging for small children. For families with younger kids, we recommend our shorter tours or a private tour that we can customize to your needs.'
      },
      {
        question: 'What time should I arrive and where exactly do we meet?',
        answer: 'Please arrive 10 minutes before the 10am start time at the Aloha Terrace Group Picnic Area. This is located near the beach in the Beach Hill area. Look for your guide with a Walk Santa Cruz sign. Parking is available along nearby streets - we recommend arriving 15-20 minutes early to find parking and walk to the meeting point. The exact location will be provided in your confirmation email.'
      },
      {
        question: 'What if I need to leave the tour early?',
        answer: 'While we hope you\'ll stay for the full experience, we understand that sometimes plans change. Since this is a loop tour starting and ending near the beach, you\'re welcome to depart at any point. Just let your guide know. However, please note that we cannot provide refunds for partial participation. If you\'re unsure about the tour length, consider booking one of our shorter tours instead.'
      },
      {
        question: 'Can I bring my dog?',
        answer: 'We love dogs, but for the comfort and safety of all participants, we ask that you leave pets at home for our public group tours. However, dogs are welcome on private tours if all participants agree! Contact us to arrange a private dog-friendly tour experience.'
      },
      {
        question: 'Do you take breaks during the 2.5 hours?',
        answer: 'Yes! We build in several natural break points where you can rest, take photos, use restrooms (when available), and hydrate. We stop for storytelling at each major location, giving you time to catch your breath. The tour is designed to be enjoyable, not exhausting. That said, there are limited public restrooms along the route, so we recommend using facilities before the tour begins.'
      },
      {
        question: 'Is this tour good for visitors or better for locals?',
        answer: 'Both! Visitors love this tour because it provides a comprehensive introduction to Santa Cruz - you\'ll leave understanding the city\'s layout, history, and character. Locals are often amazed by how much they didn\'t know about their own city. Many residents tell us this tour gave them a completely new appreciation for Santa Cruz. Whether you\'re a first-time visitor or a long-time local, you\'ll discover fascinating stories and perspectives.'
      }
    ],

    seoTitle: 'Beach Hill to Mission Hill Loop Walking Tour | Walk Santa Cruz',
    seoDescription: 'Comprehensive 2.5-hour Santa Cruz walking tour from Beach Hill mansions through downtown to Mission Hill. Explore oceanfront estates, Victorian architecture, and local history with expert guides.',
    keywords: [
      'santa cruz walking tour',
      'beach hill santa cruz',
      'mission hill tour',
      'santa cruz architecture tour',
      'extended walking tour',
      'santa cruz history',
      'beach hill mansions',
      'comprehensive santa cruz tour',
      'guided tour santa cruz'
    ],

    relatedTourSlugs: ['downtown-mission-hill', 'surfing-beach-culture']
  },

  {
    slug: 'surfing-beach-culture',
    title: 'Santa Cruz Surf History and Culture Tour',
    shortDescription: 'Experience Santa Cruz through its surf history, beach culture, and coastal wildlife on a fun 2-hour guided walk along the waterfront.',
    longDescription: "Dive into the heart of surf culture at its West Coast birthplace. This oceanfront tour explores how surfing shaped Santa Cruz's identity and continues to define our coastal community today.",

    cardImage: surfer,
    cardImageAlt: 'Surfer at Santa Cruz beach',
    heroImage: surfer,
    heroImageAlt: 'Surfing culture in Santa Cruz',
    galleryImages: [
      { src: cowells, alt: 'Cowell Beach surf spot', caption: 'Cowell Beach - Photo by M. O\'Leary' },
      { src: itsBeach, alt: 'Its Beach', caption: 'Its Beach - Photo by M. O\'Leary' },
      { src: bigWave, alt: 'Big wave at Steamer Lane', caption: 'Steamer Lane - Photo by Brocken Inaglory (Wikimedia)' },
      { src: otter, alt: 'Sea otter in kelp', caption: 'Sea Otter - Photo by David Ledig, BLM' },
      { src: cypressPoint, alt: 'Cypress Point coastline', caption: 'Cypress Point - Photo by M. O\'Leary' },
      { src: img9631, alt: 'Santa Cruz coastal view', caption: 'Santa Cruz Coast - Photo by M. O\'Leary' },
      { src: brokenInaglory, alt: 'Surfing at Santa Cruz', caption: 'Santa Cruz Surfing - Photo by Brocken Inaglory (Wikimedia)' },
      { src: pexelsSurf, alt: 'Surfer on wave', caption: 'Surfing - Photo by Steven Bero (Pexels)' },
      { src: surfingClub, alt: 'Surfing Club at UCSC', caption: 'Surfing Club 1941 - Mayo collection, UCSC Digital Archives' }
    ],

    duration: '2 hours',
    price: 'Adult $45 / Child $30',
    adultPrice: 45,
    childPrice: 30,
    schedule: 'Thursday at 10am',
    meetingPoint: {
      name: 'At the Boardwalk\'s Aloha Terrace Group Picnic Area (next to the Beach Volleyball Courts)',
      url: 'https://maps.app.goo.gl/5kQSAFFEfZigLaFKA',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352.97276085142056!2d-122.02167846601544!3d36.963272602578684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e6a99cbaf37ed%3A0xd65ed89d6ad5674c!2sSanta%20Cruz%20Main%20Beach%20Volleyball!5e0!3m2!1sen!2sus!4v1764894765720!5m2!1sen!2sus'
    },
    bookingUrl: 'https://fareharbor.com/embeds/book/walksantacruz/items/686192/calendar/2025/12/?full-items=yes',

    storytelling: "Santa Cruz isn't just a surf town - it's THE surf town. This is where mainland surfing in America truly began, where wetsuit innovation flourished, and where surf culture evolved from Hawaiian roots into the phenomenon it is today. On this oceanfront journey, you'll walk in the footsteps of legends, from the three Hawaiian princes who rode waves at the San Lorenzo Rivermouth on Main Beach in 1885 to the modern shapers and surfers who continue to push the sport forward. We'll explore iconic surf spots, learn to read the waves and conditions, discover the innovations that flourished in Santa Cruz (like wetsuit and skateboard technology), and understand how surf culture permeates every aspect of this coastal community. Along the way, you'll also encounter sea lions, harbor seals, seabirds, and maybe even dolphins or whales, experiencing the vibrant marine ecosystem that makes Santa Cruz special. This tour isn't just about surfing history - it's about understanding how the ocean shapes everything about life in this unique coastal town.",

    itinerary: [
      {
        title: 'Main Beach & Hawaiian Surf Origins',
        description: 'Begin at Main Beach, where three Hawaiian princes introduced surfing to mainland America in 1885. Learn about the deep Hawaiian roots of surf culture, the significance of these early demonstrations, and how Santa Cruz became the birthplace of mainland surfing. We\'ll discuss wave patterns, beach geology, and what makes this beach special.'
      },
      {
        title: 'The Boardwalk & Beach Culture Evolution',
        description: 'Explore how the Santa Cruz Beach Boardwalk (California\'s oldest surviving amusement park, opened 1907) shaped beach culture and tourism. Discover the connection between leisure, surfing, and the development of Santa Cruz as a beach destination. Learn about the evolution of swimwear, beach activities, and coastal recreation.'
      },
      {
        title: 'Cowell Beach & Beginner Surf Culture',
        description: 'Visit Cowell Beach, Santa Cruz\'s premier beginner surf spot and the birthplace of longboarding renaissance. Learn why this break is perfect for learning, how surf schools operate here, and the etiquette and culture of surfing. We\'ll watch surfers in action and discuss what you\'re seeing - wave selection, positioning, and technique.'
      },
      {
        title: 'Steamer Lane Overlook',
        description: 'Stand at one of the world\'s most famous surf spots and watch skilled surfers tackle powerful waves. Learn about the different breaks (The Point, The Slot, Middle Peak), the history of big wave surfing here, and the territorial surf culture that developed. Hear stories of legendary surfers and the innovations that came from this wave.'
      },
      {
        title: 'Surfing Museum & Innovations',
        description: 'Visit the area around the Santa Cruz Surfing Museum (time permitting, we may enter if open) to discuss the evolution of surfboard design, the invention of the modern wetsuit by Jack O\'Neill right here in Santa Cruz, and the technological innovations that made year-round surfing possible in cold Northern California waters.'
      },
      {
        title: 'Lighthouse Point & Marine Wildlife',
        description: 'Explore Lighthouse Point, watching for sea lions, harbor seals, sea otters, and diverse seabirds. Learn about the Monterey Bay National Marine Sanctuary, seasonal marine life patterns (including migrating whales), and the ecological importance of this coastal environment. Understand how surfing culture includes ocean stewardship and conservation.'
      },
      {
        title: 'West Cliff Drive & Surf Spot Tour',
        description: 'Walk along the scenic West Cliff Drive, identifying various surf breaks and discussing what makes each unique. Learn to read wave conditions, understand swell direction and tide impacts, and appreciate the geography that makes Santa Cruz one of the world\'s premier surf destinations. Discuss modern surf culture, contests, and the local shapers who continue to innovate.'
      }
    ],

    highlights: [
      'See the spot where surfing was introduced to mainland America by Hawaiian princes in 1885',
      'Learn to identify surf breaks and read ocean conditions',
      'Insider tips on surf shops, viewing spots, and local surf traditions',
      'Santa Cruz Beach Boardwalk - where Duke Kahanamoku demonstrated his legendary water feats',
      'Cowell Beach - premier beginner surf spot and longboarding renaissance birthplace',
      'Steamer Lane - world-famous surf break with multiple peaks (The Point, The Slot, Middle Peak)',
      'Hear stories about the innovators: Jack O\'Neill, Sam Reid, Dorothy Becker to today\'s aerial heroes and big wave legends',
      'Lighthouse Point - marine wildlife viewing including sea lions, harbor seals, otters, and migrating whales',
      'West Cliff Drive - scenic tour of various surf breaks and coastal geography',
      'Small group experience (maximum 10 people) for personalized attention'
    ],

    includes: {
      included: [
        'Expert guide knowledgeable about surf history, culture, and marine life',
        'Oceanfront walking route with spectacular coastal views',
        'Small group experience (maximum 10 people) for personalized attention',
        'Live surfing observation at multiple world-class surf spots',
        'Marine wildlife viewing opportunities (sea lions, seals, otters, birds)',
        'Learn to identify surf breaks and read ocean conditions',
        'Insider knowledge of local surf culture, shops, and traditions',
        'Photo opportunities at iconic Santa Cruz coastal landmarks'
      ],
      toBring: [
        'Comfortable walking shoes suitable for paved paths (mostly flat terrain)',
        'Water bottle to stay hydrated',
        'Layered clothing - it can be cool and windy along the coast even on warm days',
        'Windbreaker or light jacket recommended',
        'Sunscreen and sunglasses (ocean reflection intensifies sun exposure)',
        'Camera or binoculars for wildlife viewing and surfing photos',
        'Hat that won\'t blow away in coastal winds',
        'Curiosity about surf culture and ocean ecology'
      ],
      notIncluded: [
        'Surfboard rental or surf lessons (we\'re learning about surfing, not doing it)',
        'Entry to the Surfing Museum (though we discuss it; entrance is donation-based)',
        'Food and beverages',
        'Gratuities for your guide (optional but appreciated)',
        'Transportation to and from meeting point',
        'Wetsuit or surf gear'
      ]
    },

    faqs: [
      {
        question: 'Do I need to know how to surf to enjoy this tour?',
        answer: 'Not at all! This tour is perfect for non-surfers who want to understand surf culture and appreciate what they\'re seeing when they watch surfers. It\'s equally enjoyable for experienced surfers who want to learn the history and local knowledge of Santa Cruz surf spots. We explain everything in accessible terms and help you understand what makes surfing and surf culture so special.'
      },
      {
        question: 'Will I get to try surfing on this tour?',
        answer: 'This is a walking tour focused on surf history, culture, and observation rather than a surf lesson. We don\'t include hands-on surfing. However, we can recommend excellent surf schools in Santa Cruz if you\'d like to book a lesson separately! Many guests do this tour first to understand the culture and spots, then book a surf lesson afterward.'
      },
      {
        question: 'What\'s the terrain like? Is it hilly?',
        answer: 'Great news - this is our flattest tour! The route follows paved paths along West Cliff Drive and the beach, with minimal elevation change. It\'s much easier than our hillside tours and suitable for most fitness levels. The main considerations are distance (about 2 miles over 2 hours) and potential coastal winds. If you can comfortably walk for two hours on flat ground, you\'ll be fine.'
      },
      {
        question: 'What if there are no surfers out when we visit?',
        answer: 'Santa Cruz has surfers in the water nearly every day of the year! The beauty of places like Cowell Beach and Steamer Lane is that they\'re popular and consistent, so you\'ll almost certainly see surfing action. However, conditions vary - some days might have just a few surfers, other days dozens. Your guide will explain what you\'re seeing regardless of crowd size and discuss what different conditions mean for surfing.'
      },
      {
        question: 'When is the best time of year for this tour?',
        answer: 'Each season offers something unique! Fall and winter typically bring bigger swells and more dramatic surfing at Steamer Lane, plus migrating gray whales (December-April). Spring and summer offer calmer conditions, warmer weather, and great beginner surfing at Cowell. Marine life is present year-round. Thursday mornings (when this tour runs) are often less crowded than weekends. Really, any time is good!'
      },
      {
        question: 'Will we see whales or other marine life?',
        answer: 'Marine life sightings vary by season and luck! Sea lions and harbor seals are present nearly year-round. Gray whales migrate past from December through April, and humpback whales are often seen May through November. Dolphins are possible any time. Sea otters frequent kelp beds near the coast. Pelicans and seabirds are abundant. While we can\'t guarantee specific wildlife sightings, we\'ll keep our eyes open and your guide will help you spot and identify any animals we see.'
      },
      {
        question: 'Is this tour appropriate for children?',
        answer: 'Yes! Kids often love this tour because there\'s so much to see - surfers, sea lions, waves, and more. The flat terrain makes it accessible for children who can walk 2 miles. We offer discounted pricing for kids under 12. Children who are interested in the ocean, animals, or surfing will be especially engaged. Our guides are great at pointing out exciting sights and explaining things in kid-friendly ways.'
      },
      {
        question: 'Can we stop at the Surfing Museum?',
        answer: 'We visit the area around the museum and discuss its contents and significance. Depending on timing and the museum\'s hours (it\'s run by volunteers with limited hours), we may be able to briefly step inside. However, this isn\'t guaranteed. The museum is small, free (donations appreciated), and worth returning to on your own if you want to spend more time exploring the exhibits.'
      },
      {
        question: 'What if I want to buy surf gear or learn more after the tour?',
        answer: 'Perfect! Your guide will share recommendations for local surf shops, surf schools, and resources for learning more. Santa Cruz has numerous excellent surf shops with knowledgeable staff, and several surf schools offering lessons for all ages and abilities. We can point you toward the best options based on your interests and experience level.'
      }
    ],

    seoTitle: 'Santa Cruz Surfing & Beach Culture Walking Tour | Walk Santa Cruz',
    seoDescription: 'Explore Santa Cruz surfing history, watch surfers at legendary Steamer Lane, spot marine wildlife, and discover beach culture on this 2-hour oceanfront walking tour. Expert guides, small groups.',
    keywords: [
      'santa cruz surf tour',
      'steamer lane tour',
      'santa cruz surfing history',
      'beach culture tour',
      'santa cruz coastal tour',
      'surfing museum santa cruz',
      'west cliff drive tour',
      'marine wildlife tour santa cruz',
      'santa cruz ocean tour',
      'guided surf tour'
    ],

    relatedTourSlugs: ['downtown-mission-hill', 'beach-hill-loop']
  }
];

// Helper function to get tour by slug
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(tour => tour.slug === slug);
}

// Helper function to get related tours
export function getRelatedTours(tourSlug: string): Tour[] {
  const tour = getTourBySlug(tourSlug);
  if (!tour) return [];

  return tour.relatedTourSlugs
    .map(slug => getTourBySlug(slug))
    .filter((t): t is Tour => t !== undefined);
}
