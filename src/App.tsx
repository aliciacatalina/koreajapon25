import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  X,
  Info,
  Lightbulb,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet";
import { Button } from "./components/ui/button";

interface Activity {
  name: string;
  description: string;
  recommendedTime?: string;
  duration?: string;
  tips?: string;
  funFact?: string;
  address?: string;
  cost?: string;
}

interface ActivityGroup {
  timeLabel: string;
  timeIcon: "morning" | "afternoon" | "evening";
  activities: Activity[];
}

interface DayData {
  dayNumber: string;
  date: string;
  title: string;
  location: string;
  cityClass: string;
  activityGroups: ActivityGroup[];
  notes?: {
    title: string;
    content: string;
  };
  hasBirthday?: boolean;
}

const dayData: DayData[] = [
  {
    dayNumber: "Day 1 • Thursday, October 9",
    date: "2025-10-09",
    title: "Copenhagen → Seoul",
    location: "✈️ Travel Day",
    cityClass: "",
    activityGroups: [
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Flight Departure",
            description: "23:40 from Copenhagen Airport",
            recommendedTime: "Arrive at airport by 21:40",
            duration: "12h 35m flight",
            tips: "Download offline entertainment and bring a neck pillow. The flight arrives the next evening due to time zones.",
            funFact:
              "You'll cross 8 time zones and technically lose a day!",
          },
        ],
      },
    ],
    notes: {
      title: "💡 Travel Tips",
      content:
        "Long travel day ahead! Make sure to stay hydrated and try to sleep on the plane to help with jet lag. Set your watch to Seoul time once you board.",
    },
  },
  {
    dayNumber: "Day 2 • Friday, October 10",
    date: "2025-10-10",
    title: "Arrival in Seoul",
    location: "🏮 Traditional Hanok",
    cityClass: "seoul",
    activityGroups: [
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Landing in Seoul",
            description:
              "18:15 arrival at Incheon International Airport",
            recommendedTime: "18:15 arrival",
            duration: "1-2 hours for immigration and baggage",
            tips: "Airport Railroad Express (AREX) to Seoul Station takes 43 minutes. Have your hanok address ready in Korean.",
            funFact:
              "Incheon Airport has been voted world's best airport multiple times!",
          },
          {
            name: "Check-in Hanok",
            description:
              "Traditional Korean house at 8-17 Dongsomun-ro 23-gil",
            recommendedTime: "Around 20:30",
            address:
              "8-17 Dongsomun-ro 23-gil, Seongbuk-gu, Seoul",
            tips: "Remove shoes before entering. The floor heating (ondol) is traditional Korean technology from 3000 BC!",
            funFact:
              "Hanoks are designed to be in harmony with nature - cool in summer, warm in winter.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Korean BBQ Dinner",
            description:
              "Welcome meal at local restaurant nearby",
            recommendedTime: "21:30-23:00",
            duration: "1.5 hours",
            cost: "₩25,000-40,000 per person",
            tips: "Use scissors to cut meat, don't flip it too often. Lettuce wraps (ssam) are traditional!",
            funFact:
              "Korean BBQ (galbi) dates back to the Goguryeo era, over 2000 years ago.",
          },
          {
            name: "Space Invaders Hunt",
            description:
              "Start collecting retro arcade memorabilia",
            recommendedTime: "After dinner",
            tips: "Check out Dongdaemun area for late-night arcade shopping. Many stores open until 2 AM.",
            funFact:
              "Seoul has more arcade machines per capita than any other city in the world!",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 3 • Saturday, October 11",
    date: "2025-10-11",
    title: "Seoul Exploration",
    location: "📚 Libraries, Parks & Markets",
    cityClass: "seoul",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Starfield Library",
            description:
              "Instagram-worthy book towers in COEX Mall",
            recommendedTime: "10:00-11:30",
            duration: "1.5 hours",
            address: "513 Yeongdong-daero, Gangnam-gu",
            tips: "Visit early for best photos without crowds. Free to enter and browse. The library has 50,000 books!",
            funFact:
              "The 13-meter high bookshelves hold books you can actually read for free.",
          },
          {
            name: "Seoul Forest Park",
            description:
              "Beautiful nature escape in the heart of the city",
            recommendedTime: "12:00-14:00",
            duration: "2 hours",
            cost: "Free entry",
            tips: "Rent bikes at the entrance for ₩3,000/hour. Visit the deer park - it's like Nara but in Seoul!",
            funFact:
              "Seoul Forest was once a royal hunting ground for the Joseon Dynasty.",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Bongeunsa Temple",
            description:
              "Traditional Buddhist temple with 1,200-year history",
            recommendedTime: "14:30-16:00",
            duration: "1.5 hours",
            address: "531 Bongeunsa-ro, Gangnam-gu",
            cost: "Free entry",
            tips: "Dress modestly, no shorts or tank tops. The giant Buddha statue is 23 meters tall!",
            funFact:
              "The temple survived Japanese occupation and is surrounded by Gangnam's skyscrapers.",
          },
          {
            name: "Gwangjang Market",
            description:
              "Korea's oldest traditional market - street food paradise",
            recommendedTime: "16:30-18:30",
            duration: "2 hours",
            address: "88 Changgyeonggung-ro, Jongno-gu",
            tips: "Try bindaetteok (mung bean pancakes) and mayak gimbap (mini rice rolls). Bring cash!",
            funFact:
              "Operating since 1905, it's where locals have shopped for over 100 years.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Hongdae Arcades",
            description:
              "Gaming and nightlife district near Hongik University",
            recommendedTime: "19:00-late",
            duration: "3+ hours",
            cost: "₩1,000-2,000 per game",
            tips: "Visit multiple floors of arcade buildings. Hongdae gets busiest after 10 PM on weekends.",
            funFact:
              "Hongdae is the birthplace of Korean indie music and underground culture.",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 4 • Sunday, October 12",
    date: "2025-10-12",
    title: "Nami Island Day Trip",
    location: "🚂 Gapyeong Adventure",
    cityClass: "seoul",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Train to Gapyeong",
            description: "Scenic ITX-Cheongchun train journey",
            recommendedTime: "08:30 departure",
            duration: "1 hour from Yongsan",
            cost: "₩2,150 each way",
            tips: "Buy tickets at the station or use T-money card. Sit on the right side for Han River views.",
            funFact:
              "The ITX-Cheongchun is Korea's first tilting train, designed for comfort on curves.",
          },
          {
            name: "Nami Island",
            description:
              "Tree-lined paths, bike rentals, and Winter Sonata filming location",
            recommendedTime: "10:00-15:00",
            duration: "5 hours",
            cost: "₩16,000 entry + ₩8,000 ferry",
            tips: "Rent bikes for ₩3,000/hour. The island is car-free! Try the famous Nami Island makgeolli.",
            funFact:
              "Named after General Nami, who died at age 28 defending the nation in 1467.",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Garden of Morning Calm",
            description:
              "Beautiful botanical garden with themed landscapes",
            recommendedTime: "15:30-17:30",
            duration: "2 hours",
            cost: "₩11,000 adults",
            address:
              "432 Sumogwon-ro, Sang-myeon, Gapyeong-gun",
            tips: "The Star Garden is magical during sunset. Wear comfortable walking shoes.",
            funFact:
              "Features over 5,000 plant species arranged in 20 themed gardens.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Return to Seoul",
            description: "Train journey back to the city",
            recommendedTime: "18:30 departure",
            duration: "1 hour",
            tips: "Trains run every 30-60 minutes. Last train is around 22:00.",
            funFact:
              "The evening view of Seoul's skyline from the train is spectacular.",
          },
          {
            name: "Traditional Korean Dinner",
            description:
              "Authentic meal in historic Myeongdong area",
            recommendedTime: "20:30-22:00",
            duration: "1.5 hours",
            cost: "₩30,000-50,000 per person",
            tips: "Try hanjeongsik (full-course Korean meal) or Korean fried chicken. Myeongdong is great for night shopping too.",
            funFact:
              "Myeongdong means 'bright cave' and has been Seoul's commercial heart for decades.",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 5 • Monday, October 13",
    date: "2025-10-13",
    title: "Seoul → Osaka",
    location: "✈️ Flight + Osaka Exploration",
    cityClass: "osaka",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Last-minute Shopping",
            description:
              "Final Seoul souvenir hunt in Myeongdong district",
            recommendedTime: "09:00-11:00",
            duration: "2 hours",
            tips: "Buy Korean skincare, ginseng products, and K-pop merchandise. Tax refund available for purchases over ₩30,000.",
            funFact:
              "Myeongdong processes more credit card transactions per square meter than anywhere else in Korea.",
          },
          {
            name: "Flight to Osaka",
            description:
              "Korean Air or Asiana flight KE721 or OZ111",
            recommendedTime: "12:40 departure → 15:00 arrival",
            duration: "2h 20m flight",
            tips: "Arrive at Gimpo Airport 2 hours early. The flight path goes over the Yellow Sea and western Japan.",
            funFact:
              "Seoul to Osaka is one of the busiest international routes in Asia!",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Check-in Hotel",
            description:
              "Quintessa Hotel Osaka Shinsaibashi Comic & Books",
            recommendedTime: "16:30 check-in",
            address:
              "2-4-10 Nishi-Shinsaibashi, Nishi-ku, Osaka",
            tips: "The hotel has a manga library with 3,000+ volumes! Free manga rental service available.",
            funFact:
              "Each room is designed with different manga themes - from classic to modern anime.",
          },
          {
            name: "Shinsaibashi PARCO & DAIMARU",
            description:
              "Premium shopping district exploration",
            recommendedTime: "17:00-19:00",
            duration: "2 hours",
            tips: "PARCO focuses on trendy fashion, DAIMARU on luxury goods. Both have excellent food courts.",
            funFact:
              "Shinsaibashi has been Osaka's shopping heart for over 380 years!",
          },
          {
            name: "Astro Zombies",
            description:
              "Vintage toy paradise and retro collectibles",
            recommendedTime: "19:00-20:00",
            duration: "1 hour",
            address: "Various locations in Den Den Town",
            tips: "Haggling is acceptable here. Look for rare Space Invaders merchandise and vintage arcade parts.",
            funFact:
              "Den Den Town is Osaka's answer to Tokyo's Akihabara.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Dotonbori Experience",
            description:
              "Iconic neon signs, street food, and river cruise",
            recommendedTime: "20:30-22:30",
            duration: "2 hours",
            cost: "₩2,000-5,000 per street food item",
            tips: "Try takoyaki from multiple stalls to compare. The giant mechanical signs move every 15 minutes!",
            funFact:
              "The Glico Running Man sign has been Osaka's symbol since 1935.",
          },
          {
            name: "Osaka Kaiseki Dinner",
            description:
              "Traditional multi-course meal representing seasons",
            recommendedTime:
              "19:30-21:30 (alternative to street food)",
            duration: "2 hours",
            cost: "¥8,000-15,000 per person",
            tips: "Kaiseki represents the four seasons through ingredients and presentation. Each course has symbolic meaning.",
            funFact:
              "Kaiseki originated from tea ceremony culture and is UNESCO-recognized.",
          },
        ],
      },
    ],
    notes: {
      title: "🏨 Hotel Details",
      content:
        "Quintessa Hotel Osaka Shinsaibashi Comic & Books - A unique hotel featuring manga and comic themes, perfect for anime lovers! Each floor has different manga genres and the lobby has rare collector items.",
    },
  },
  {
    dayNumber: "Day 6 • Tuesday, October 14",
    date: "2025-10-14",
    title: "Osaka & Nara Adventure",
    location: "🦌 Deer Park + Digital Art",
    cityClass: "osaka",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Nara Deer Park",
            description:
              "Feed sacred deer roaming freely in the park",
            recommendedTime: "09:00-12:00",
            duration: "3 hours",
            cost: "¥200 for deer crackers",
            address: "Nara Park, 469 Zoshicho, Nara",
            tips: "Buy official deer crackers (shika senbei) - other food can make deer sick. Bow to deer and they bow back!",
            funFact:
              "Over 1,200 sacred deer roam free. They're considered messengers of the gods in Shinto belief.",
          },
          {
            name: "Todaiji Temple",
            description:
              "Home to Japan's largest bronze Buddha statue",
            recommendedTime: "11:00-12:30",
            duration: "1.5 hours",
            cost: "¥600 adults",
            tips: "Try to squeeze through the pillar hole - it's said to grant enlightenment! The Buddha is 15 meters tall.",
            funFact:
              "Built in 752 AD, the original construction used most of Japan's bronze supply!",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Rikuro's Cheesecake",
            description:
              "Osaka's most famous cheesecake since 1960",
            recommendedTime: "14:00-14:30",
            duration: "30 minutes",
            cost: "¥695 per whole cake",
            address: "Multiple locations, try Namba main store",
            tips: "The cake is best eaten warm! The uncle's face on the box is the founder. Get the whole cake, not slices.",
            funFact:
              "They sell over 60,000 cheesecakes daily across all Osaka locations!",
          },
          {
            name: "Hirakata T-Site",
            description:
              "Unique bookstore and cultural space with Starbucks",
            recommendedTime: "15:00-17:00",
            duration: "2 hours",
            address:
              "T-SITE Hirakata, 2-1-1 Okahigashimachi, Hirakata",
            tips: "Browse books while sipping coffee. They have English manga and Japanese culture books.",
            funFact:
              "T-Site stores are designed as 'cultural convenience stores' - combining books, café, and lifestyle.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "teamLab Botanical Garden",
            description:
              "Digital art installation in nature setting",
            recommendedTime: "18:00-20:00",
            duration: "2 hours",
            cost: "¥1,200 adults",
            address: "Osaka Castle Park area",
            tips: "Wear dark clothing for best interactive effects. Download the teamLab app for artwork explanations.",
            funFact:
              "teamLab's motto: 'Art without boundaries' - the digital art responds to your movement and touch.",
          },
          {
            name: "Takoyaki Street Food",
            description:
              "Authentic Osaka soul food from street vendors",
            recommendedTime: "20:30-21:30",
            duration: "1 hour",
            cost: "¥500-800 per serving (6-8 balls)",
            tips: "Each vendor has a secret recipe. Try multiple stalls in Dotonbori. Let them cool down - they're molten hot inside!",
            funFact:
              "Takoyaki was invented in Osaka in the 1930s and literally means 'grilled octopus'.",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 7 • Wednesday, October 15",
    date: "2025-10-15",
    title: "Universal Studios Japan",
    location: "🎢 Mario World & Harry Potter",
    cityClass: "osaka",
    activityGroups: [
      {
        timeLabel: "Full Day",
        timeIcon: "morning",
        activities: [
          {
            name: "Nintendo World",
            description:
              "Super Mario attractions and interactive experiences",
            recommendedTime:
              "09:00-13:00 (rope drop essential)",
            duration: "4 hours",
            cost: "Express Pass ¥7,800-14,800",
            tips: "Get Power-Up Band for interactive games throughout the land. Mario Kart uses AR technology!",
            funFact:
              "The first Nintendo theme park land in the world, opened in 2021 during the pandemic.",
          },
          {
            name: "Wizarding World of Harry Potter",
            description:
              "Hogwarts castle and magical experiences",
            recommendedTime: "14:00-17:00",
            duration: "3 hours",
            tips: "Buy a wand for interactive spells throughout the area. Butterbeer is a must-try!",
            funFact:
              "The Hogwarts castle is a exact replica, down to the portraits that move and talk.",
          },
          {
            name: "Demon Slayer Attraction",
            description:
              "Latest anime experience and themed dining",
            recommendedTime: "17:30-19:30",
            duration: "2 hours",
            tips: "Limited-time attraction, very popular with locals. Food is themed to match the anime perfectly.",
            funFact:
              "USJ collaborates with popular anime series for limited-time experiences throughout the year.",
          },
        ],
      },
    ],
    notes: {
      title: "🎫 Pro Tips",
      content:
        "Buy Express Pass for popular rides. Arrive early for park opening at 8:30 AM! Download the USJ app for real-time wait times. The Nintendo Power-Up Band is ¥3,200 but makes the experience much more interactive.",
    },
  },
  {
    dayNumber: "Day 8 • Thursday, October 16",
    date: "2025-10-16",
    title: "Osaka → Kyoto → Tokyo",
    location: "🥃 Whisky + Kyoto Temples + Bullet Train",
    cityClass: "",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Suntory Yamazaki Distillery",
            description:
              "Japan's first whisky distillery with tasting",
            recommendedTime: "10:00-12:00",
            duration: "2 hours",
            cost: "¥2,000 for tour + tasting",
            address: "5-2-1 Yamazaki, Shimamoto, Osaka",
            tips: "Book in advance! The 18-year whisky costs ¥50,000+ per bottle. Try the highball - very popular in Japan.",
            funFact:
              "Founded in 1923, Yamazaki means 'mountain cape' and sits between two rivers for perfect water.",
          },
        ],
      },
      {
        timeLabel: "Early Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Kyoto Visit",
            description:
              "Fushimi Inari Shrine or Kiyomizu-dera Temple",
            recommendedTime: "13:00-15:30",
            duration: "2.5 hours",
            cost: "Free (Fushimi Inari) or ¥400 (Kiyomizu-dera)",
            tips: "Fushimi Inari: 10,000 torii gates hike takes 2-3 hours. Kiyomizu-dera: Great city views, especially during autumn.",
            funFact:
              "Fushimi Inari's torii gates are donated by businesses for good fortune - each costs ¥175,000-1.3 million!",
          },
          {
            name: "Kyoto Station Shopping",
            description:
              "Kyoto Station Building & Porta underground mall",
            recommendedTime: "15:30-17:00",
            duration: "1.5 hours",
            tips: "Kyoto Station is an architectural marvel itself. Great for buying local sweets and crafts as souvenirs.",
            funFact:
              "Kyoto Station building is 15 stories high and designed by Hiroshi Hara - it's a destination itself!",
          },
        ],
      },
      {
        timeLabel: "Late Afternoon/Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Late Shinkansen to Tokyo",
            description:
              "Bullet train experience - engineering marvel",
            recommendedTime: "17:30 departure",
            duration: "2h 15m to Tokyo",
            cost: "¥13,320 for reserved seat",
            tips: "Sit on the right side (E seats) for Mount Fuji views! Buy ekiben (train bento) for dinner.",
            funFact:
              "The Tokaido Shinkansen can reach 320 km/h and is never more than 36 seconds late on average.",
          },
          {
            name: "Check-in Metropolitan Hotel",
            description:
              "Modern hotel in bustling Ikebukuro district",
            recommendedTime: "20:30 check-in",
            address: "1-6-1 Nishi-Ikebukuro, Toshima-ku, Tokyo",
            tips: "Ikebukuro is known as 'Otome Road' for female otaku culture. The hotel has great city views from upper floors.",
            funFact:
              "Ikebukuro Station is the world's second-busiest train station with 2.71 million passengers daily!",
          },
          {
            name: "Pokemon Mega Center + Gashapon",
            description:
              "Ikebukuro gaming paradise and capsule toy hunting",
            recommendedTime: "21:00-22:30",
            duration: "1.5 hours",
            cost: "¥100-500 per gashapon",
            tips: "The Pokemon Center has exclusive Tokyo items. Gashapon halls have hundreds of machines with collectibles.",
            funFact:
              "Japan has over 200,000 gashapon machines - more than vending machines in some countries!",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 9 • Friday, October 17",
    date: "2025-10-17",
    title: "Tokyo - Jarim's Birthday!",
    location: "🎂 Sumo + Shabu-Shabu + Arcade",
    cityClass: "tokyo",
    hasBirthday: true,
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Birthday Breakfast",
            description:
              "Special celebration with gift exchange",
            recommendedTime: "09:00-10:00",
            duration: "1 hour",
            tips: "Many Tokyo hotels serve Western + Japanese breakfast buffets. Perfect for birthday celebrations!",
            funFact:
              "In Japan, the birthday person traditionally treats others, but tourists often reverse this custom.",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Sumo at Ryogoku Kokugikan",
            description:
              "Traditional sumo wrestling at the sacred venue",
            recommendedTime: "14:00-18:00",
            duration: "4 hours",
            cost: "¥3,800-14,800 depending on seats",
            address: "1-3-28 Yokoami, Sumida-ku, Tokyo",
            tips: "Lower ranks fight first, grand champions (yokozuna) fight last. Bring cushions to throw for celebrations!",
            funFact:
              "Sumo is Japan's national sport with 1,500+ year history. The ring is considered sacred ground.",
          },
          {
            name: "Tokyo Underground Ramen",
            description:
              "Hidden ramen spots in Ikebukuro's underground passages",
            recommendedTime: "18:30-19:30",
            duration: "1 hour",
            cost: "¥800-1,200 per bowl",
            tips: "Look for places with long queues of locals. Slurping is encouraged - it cools the noodles and shows appreciation!",
            funFact:
              "Tokyo has over 10,000 ramen shops, each with secret recipes passed down through generations.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Best Shabu-Shabu All-You-Can-Eat",
            description:
              "Premium birthday dinner at Onyasai or Nabezo",
            recommendedTime: "20:00-22:00",
            duration: "2 hours",
            cost: "¥2,980-4,980 per person",
            tips: "Wagyu beef option available for special occasions. Cook thin slices just a few seconds in the broth.",
            funFact:
              "Shabu-shabu is named after the sound of swishing meat in boiling broth!",
          },
          {
            name: "Gigo Arcade Akihabara",
            description:
              "Retro gaming birthday celebration in Electric Town",
            recommendedTime: "22:30-late",
            duration: "2+ hours",
            cost: "¥100-200 per game",
            tips: "7-floor arcade with classics to newest games. Floor 6 usually has retro games perfect for Space Invaders hunting!",
            funFact:
              "Akihabara has been Tokyo's electronics district since the 1950s post-war radio market days.",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 10 • Saturday, October 18",
    date: "2025-10-18",
    title: "Tokyo Shopping & Culture",
    location: "🛍️ Nakano + Kintsugi + Ginza",
    cityClass: "tokyo",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Nakano Broadway",
            description:
              "Vintage manga, anime figures, and collector's paradise",
            recommendedTime: "10:00-13:00",
            duration: "3 hours",
            address: "5-52-15 Nakano, Nakano-ku, Tokyo",
            tips: "4 floors of otaku heaven! Mandarake stores have rare collectibles. Prices are often better than Akihabara.",
            funFact:
              "Nakano Broadway has been Tokyo's subculture center since the 1960s, predating modern otaku culture.",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Kintsugi Workshop",
            description:
              "Traditional art of golden repair - philosophy of embracing flaws",
            recommendedTime: "15:30-17:30",
            duration: "2 hours",
            cost: "¥5,000-8,000 per person",
            address: "Various studios in Chuo City",
            tips: "Book in advance! You'll create your own piece using traditional techniques. Perfect philosophical souvenir.",
            funFact:
              "Kintsugi teaches that breakage is part of history, not something to disguise - making objects more beautiful.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Uniqlo Ginza Flagship",
            description:
              "12-floor fashion flagship with exclusive Tokyo items",
            recommendedTime: "18:00-19:00",
            duration: "1 hour",
            address: "5-7-7 Ginza, Chuo-ku, Tokyo",
            tips: "Floors 1-2 are women's, floors 3-4 men's, floor 12 has Tokyo exclusives. Tax-free shopping available.",
            funFact:
              "The world's largest Uniqlo store, featuring custom tailoring services and exclusive collaborations.",
          },
          {
            name: "Muji Ginza Flagship",
            description:
              "6-floor minimalist lifestyle store with café and hotel",
            recommendedTime: "19:00-20:00",
            duration: "1 hour",
            address: "3-3-5 Ginza, Chuo-ku, Tokyo",
            tips: "Floor 1 has seasonal items, floor 6 has the Muji Diner. Don't miss the Found Muji section for vintage-inspired pieces.",
            funFact:
              "World's first Muji hotel is on floors 6-10 of this building, embodying the brand's minimalist philosophy.",
          },
          {
            name: "Bills Ginza",
            description:
              "Famous ricotta pancakes dinner - Australian-Japanese fusion",
            recommendedTime: "20:30-22:00",
            duration: "1.5 hours",
            cost: "¥2,000-3,000 per person",
            address: "Ginza district",
            tips: "The original ricotta pancakes that started a global trend! Perfect ending to a Ginza shopping day.",
            funFact:
              "Bills brought the 'pancake boom' to Japan in 2008, inspiring hundreds of copycat shops across Tokyo.",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 11 • Sunday, October 19",
    date: "2025-10-19",
    title: "Tokyo Markets & Digital Art",
    location: "🏮 Flea Market + teamLab + Skytree",
    cityClass: "tokyo",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Tokyo City Flea Market",
            description:
              "Shinagawa vintage treasures and antique hunting",
            recommendedTime: "09:00-12:00",
            duration: "3 hours",
            address: "Shinagawa Central Park (Sunday market)",
            cost: "Free entry, items ¥100-10,000+",
            tips: "Bring cash! Look for vintage electronics, kimono, and retro toys. Haggling is acceptable but be respectful.",
            funFact:
              "Japanese flea markets often have incredibly well-preserved vintage items due to cultural care for belongings.",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "teamLab Planets",
            description:
              "Immersive digital art - wade through water and walk among artworks",
            recommendedTime: "14:00-16:00",
            duration: "2 hours",
            cost: "¥3,200 adults",
            address: "6-1-16 Toyosu, Koto-ku, Tokyo",
            tips: "Wear shorts and bring towel - you'll wade through water! Book specific time slots in advance.",
            funFact:
              "teamLab Planets lets you become part of the artwork - sensors track your movement to change the displays.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Godzilla Store Daiba",
            description:
              "Kaiju merchandise in futuristic Odaiba district",
            recommendedTime: "17:00-18:00",
            duration: "1 hour",
            address: "Aqua City Odaiba, 1-7-1 Daiba, Minato-ku",
            tips: "Life-size Godzilla head on the building terrace! Special Tokyo-exclusive Godzilla items available.",
            funFact:
              "Godzilla debuted in 1954 as a metaphor for nuclear fears - now he's Japan's beloved monster ambassador.",
          },
          {
            name: "Tokyo Skytree",
            description:
              "Night city views from world's second-tallest structure",
            recommendedTime: "19:00-21:00",
            duration: "2 hours",
            cost: "¥2,100 for 350m deck, ¥3,100 for 450m deck",
            address: "1-1-2 Oshiage, Sumida-ku, Tokyo",
            tips: "Book fast-skip tickets online. The tower changes colors nightly - check the lighting schedule!",
            funFact:
              "At 634m, Skytree's height represents 'Musashi' (6-3-4), the old name for Tokyo region.",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 12 • Monday, October 20",
    date: "2025-10-20",
    title: "Tokyo → Yamanakako",
    location: "🗻 Mount Fuji Adventure",
    cityClass: "yamanakako",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Check Out & Meet Driver",
            description:
              "Private van with experienced mountain driver",
            recommendedTime: "09:00 departure",
            duration: "3-hour journey",
            cost: "¥25,000-35,000 for private van",
            tips: "Driver speaks basic English and knows best photo spots. Bring snacks and camera for the scenic route!",
            funFact:
              "The road to Mount Fuji passes through 5 different climate zones as you gain elevation.",
          },
          {
            name: "Scenic Drive to Mount Fuji",
            description:
              "Beautiful mountain views and photo opportunities",
            recommendedTime: "09:00-12:00",
            duration: "3 hours with stops",
            tips: "Clear weather is crucial for Fuji views. October typically has good visibility. Stop at Kawaguchi-ko first!",
            funFact:
              "Mount Fuji is visible from Tokyo on only 80 days per year due to weather and pollution.",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "Check-in Airbnb",
            description:
              "The No.10 Mt.Fuji Sky Villa with panoramic views",
            recommendedTime: "12:30 check-in",
            address: "Yamanakako village area",
            tips: "Traditional Japanese villa with modern amenities. The view from the living room is spectacular!",
            funFact:
              "Yamanakako is the largest of Fuji's Five Lakes and sits at 980m elevation.",
          },
          {
            name: "Lake Yamanaka Activities",
            description:
              "Lakeside relaxation, swan boats, and local exploration",
            recommendedTime: "14:00-16:00",
            duration: "2 hours",
            cost: "¥600 for swan boat rental",
            tips: "Rent bikes to cycle around the lake. The reflection shots of Fuji in the lake are iconic!",
            funFact:
              "Lake Yamanaka is the only lake of the Fuji Five Lakes that never freezes completely.",
          },
          {
            name: "Mount Fuji Viewing Spots",
            description:
              "Perfect photo opportunities from various angles",
            recommendedTime: "16:00-17:30",
            duration: "1.5 hours",
            tips: "Golden hour provides the best lighting. Panorama-dai lookout offers 360-degree views.",
            funFact:
              "Mount Fuji last erupted in 1707, creating the current perfectly symmetrical cone shape.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Traditional Dinner",
            description:
              "Local cuisine with stunning Fuji views as backdrop",
            recommendedTime: "18:30-20:00",
            duration: "1.5 hours",
            cost: "¥4,000-6,000 per person",
            tips: "Try hoto noodles - a local Yamanashi specialty perfect for mountain weather. Many restaurants have Fuji views.",
            funFact:
              "Hoto noodles were supposedly eaten by samurai warriors for strength before battle.",
          },
        ],
      },
    ],
  },
  {
    dayNumber: "Day 13 • Tuesday, October 21",
    date: "2025-10-21",
    title: "Yamanakako → Tokyo (Alicia's Birthday!)",
    location: "🥾 Mount Fuji Hiking + Birthday Celebration",
    cityClass: "",
    hasBirthday: true,
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Panorama-dai Hiking Trail",
            description:
              "2-3 hour hike with stunning Mount Fuji views, starts near Lake Yamanaka",
            recommendedTime: "08:00-11:00",
            duration: "3 hours",
            address: "Panorama-dai Observation Deck trailhead",
            tips: "Wear layers - it gets cold at higher elevation! Bring water and snacks. The sunrise views are incredible.",
            funFact:
              "On clear days, you can see Tokyo Skytree from the summit, 100km away!",
          },
        ],
      },
      {
        timeLabel: "Afternoon",
        timeIcon: "afternoon",
        activities: [
          {
            name: "JR Express Train to Tokyo",
            description:
              "Return journey via Otsuki with mountain scenery",
            recommendedTime: "13:00 departure",
            duration: "2.5 hours",
            cost: "¥2,280 per person",
            tips: "Sit on the left side for final Fuji views as you descend. The train winds through beautiful countryside.",
            funFact:
              "The Fuji Excursion limited express train features special Mount Fuji-themed decorations.",
          },
          {
            name: "Check-in Metropolitan Hotel",
            description:
              "Back to familiar Ikebukuro location for birthday night",
            recommendedTime: "16:00 check-in",
            tips: "Same hotel as before - staff might remember you! Request a high floor for birthday surprise views.",
            funFact:
              "Returning to the same hotel is considered good luck in Japanese culture.",
          },
        ],
      },
      {
        timeLabel: "Evening",
        timeIcon: "evening",
        activities: [
          {
            name: "Alicia's Birthday Dinner",
            description:
              "Special celebration in Tokyo Skytree area",
            recommendedTime: "18:30-20:30",
            duration: "2 hours",
            cost: "¥8,000-12,000 per person",
            address: "Tokyo Skytree Town area",
            tips: "Many restaurants offer birthday dessert surprises if you mention it's a celebration. Sky Restaurant 634 is perfect!",
            funFact:
              "Tokyo Skytree has 7 restaurants, each offering different birthday celebration packages.",
          },
          {
            name: "Tokyo Night Views",
            description:
              "Birthday city lights celebration from observation decks",
            recommendedTime: "21:00-22:30",
            duration: "1.5 hours",
            tips: "The city lights create a magical birthday atmosphere! Many couples get engaged here!",
            funFact:
              "Tokyo's night illumination uses enough electricity to power a small city - about 250 megowatts.",
          },
        ],
      },
    ],
    notes: {
      title: "🏔️ Hiking Recommendation",
      content:
        "Panorama-dai Trail offers incredible 360° views of Mount Fuji and Lake Yamanaka. The trail is well-marked and starts just 10 minutes from your Airbnb. Perfect for October weather! Bring layers as temperature drops with elevation.",
    },
  },
  {
    dayNumber: "Day 14 • Wednesday, October 22",
    date: "2025-10-22",
    title: "Free Day in Tokyo",
    location: "🎯 Choose Your Adventure",
    cityClass: "tokyo",
    activityGroups: [
      {
        timeLabel: "Choose Your Adventure",
        timeIcon: "morning",
        activities: [
          {
            name: "Option A - Museums & Culture",
            description:
              "Yayoi Kusama Museum + Tokyo National Museum + 21_21 Design Sight",
            recommendedTime: "Full day starting 10:00",
            cost: "¥1,000-2,000 per museum",
            tips: "Kusama Museum requires advance booking. 21_21 Design Sight has rotating exhibitions by famous designers.",
            funFact:
              "Yayoi Kusama's 'Infinity Rooms' create the illusion of endless space using mirrors and lights.",
          },
          {
            name: "Option B - Food Tour",
            description:
              "Noda Shumai Shop + Sushiro + Uncle Ddung's House + Chawari",
            recommendedTime: "10:00-20:00 with breaks",
            cost: "¥3,000-5,000 total",
            tips: "Space out meals every 2-3 hours. Sushiro is conveyor belt sushi - very efficient and delicious!",
            funFact:
              "Tokyo has more Michelin stars than any other city, but the best food is often in tiny local shops.",
          },
          {
            name: "Option C - Unique Tokyo",
            description:
              "Gotokuji Temple + Park Side Donuts + Capsule Lab",
            recommendedTime: "Flexible day trip",
            cost: "¥2,000-4,000",
            tips: "Gotokuji is the birthplace of Maneki Neko (lucky cat). Thousands of cat statues cover the temple grounds!",
            funFact:
              "The beckoning cat legend started when a lord was beckoned into Gotokuji Temple, avoiding lightning!",
          },
          {
            name: "Option D - Shopping",
            description:
              "Beams Flagship + Grand Hammer + Shibuya Sky",
            recommendedTime: "10:00-18:00",
            tips: "Beams has Japan-exclusive streetwear items. Tax-free shopping available for purchases over ¥5,000.",
            funFact:
              "Beams pioneered the Japanese streetwear scene and collaborates with international brands exclusively for Japan.",
          },
          {
            name: "Option E - Day Trip",
            description:
              "Ozawa Brewery + Pola Museum of Art + Enoura Observatory",
            recommendedTime: "Full day, early start",
            cost: "¥8,000-12,000 including transport",
            tips: "Take JR to Ome for brewery, then continue to Hakone area. Beautiful autumn scenery in October!",
            funFact:
              "Ozawa Brewery has been making sake since 1702 and offers tastings in traditional buildings.",
          },
          {
            name: "Option F - Shibuya Fashion & Culture",
            description:
              "PUNKDRUNKERS&OJISUN + Nintendo Store Shibuya + Jomon Shibuya",
            recommendedTime: "14:00-22:00",
            cost: "¥4,000-6,000 for dinner",
            tips: "Start with streetwear shopping, then Nintendo Store, finish with dinner overlooking Shibuya Crossing. Japanese streetwear sizing runs small - size up!",
            funFact:
              "Shibuya is the birthplace of many Japanese street fashion movements and home to the world's busiest pedestrian crossing.",
          },
        ],
      },
    ],
    notes: {
      title: "💡 Flexible Day",
      content:
        "Mix and match activities based on your energy and interests. Don't forget about Space Invaders hunting throughout Tokyo! This is also great for any shopping you missed or revisiting favorite spots.",
    },
  },
  {
    dayNumber: "Day 15 • Thursday, October 23",
    date: "2025-10-23",
    title: "Tokyo → Copenhagen",
    location: "✈️ Farewell Japan",
    cityClass: "",
    activityGroups: [
      {
        timeLabel: "Morning",
        timeIcon: "morning",
        activities: [
          {
            name: "Last-minute Shopping",
            description:
              "Final souvenir hunt in bustling Shibuya district",
            recommendedTime: "09:00-10:30",
            duration: "1.5 hours",
            tips: "Don Quijote (Donki) is perfect for last-minute everything! Kit-Kat flavors, instant ramen, and quirky souvenirs.",
            funFact:
              "Japan has over 300 Kit-Kat flavors, many exclusive to specific regions or seasons!",
          },
          {
            name: "Flight to Copenhagen",
            description:
              "SAS or JAL direct flight - saying goodbye to Japan",
            recommendedTime: "11:35 departure → 18:10 arrival",
            duration: "11h 35m flight",
            cost: "International departure tax ¥1,000",
            tips: "Arrive at Haneda 3 hours early for international flights. Buy final omiyage (souvenirs) at airport duty-free.",
            funFact:
              "You'll travel back in time - departing Thursday afternoon but arriving Thursday evening!",
          },
        ],
      },
    ],
    notes: {
      title: "✈️ Travel Day",
      content:
        "Long journey home - arrive same day due to time difference. Pack all your amazing memories! Don't forget to declare any expensive electronics or large purchases at customs.",
    },
  },
];

const TimeIcon: React.FC<{
  type: "morning" | "afternoon" | "evening";
}> = ({ type }) => {
  const colors = {
    morning: "bg-amber-200",
    afternoon: "bg-sky-300",
    evening: "bg-purple-300",
  };

  return (
    <div
      className={`w-3 h-3 rounded-full ${colors[type]} flex-shrink-0`}
    />
  );
};

const CalendarPanel: React.FC<{
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  className?: string;
}> = ({ selectedDate, onDateSelect, className = "" }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const tripDate = new Date("2025-10-09T23:40:00");
      const now = new Date();
      const diff = tripDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (diff % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const tripDates = dayData.map((day) => day.date);
  const birthdayDates = dayData
    .filter((day) => day.hasBirthday)
    .map((day) => day.date);

  // Generate October 2025 calendar - FIXED timezone issue
  const getCalendarDays = () => {
    const firstDay = new Date(2025, 9, 1); // October 1, 2025
    const lastDay = new Date(2025, 9, 31); // October 31, 2025
    const startCalendar = new Date(firstDay);
    startCalendar.setDate(
      startCalendar.getDate() - firstDay.getDay(),
    ); // Start from Sunday

    const days = [];
    const currentDate = new Date(startCalendar);

    // Generate exactly 6 weeks (42 days) for a complete calendar grid
    for (let i = 0; i < 42; i++) {
      // FIXED: Use local date formatting instead of UTC to avoid timezone issues
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
      const isCurrentMonth = currentDate.getMonth() === 9; // October
      const isTripDate = tripDates.includes(dateStr); // Only actual trip dates from our data
      const isBirthdayDate = birthdayDates.includes(dateStr);
      const isSelected = selectedDate === dateStr;

      days.push({
        date: currentDate.getDate(),
        dateStr,
        isCurrentMonth,
        isTripDate,
        isBirthdayDate,
        isSelected,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border h-full flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-sidebar-border">
        <div className="mb-4">
          <h2 className="text-base md:text-lg font-medium text-sidebar-foreground mb-1">
            Korea - Japan 2025
          </h2>
          <p className="text-xs md:text-sm text-sidebar-foreground/70">
            Oct 9-23, 2025
          </p>
        </div>

        {/* Countdown */}
        <div className="bg-sidebar-accent rounded-lg p-3 md:p-4">
          <div className="text-xs md:text-sm text-sidebar-accent-foreground/70 mb-2">
            Time to departure
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-sm md:text-lg font-medium text-sidebar-accent-foreground">
                {countdown.days}
              </div>
              <div className="text-xs text-sidebar-accent-foreground/70">
                days
              </div>
            </div>
            <div>
              <div className="text-sm md:text-lg font-medium text-sidebar-accent-foreground">
                {countdown.hours}
              </div>
              <div className="text-xs text-sidebar-accent-foreground/70">
                hrs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4 md:p-6">
        <div className="mb-4">
          <h3 className="text-sm md:text-base font-medium text-sidebar-foreground mb-2">
            October 2025
          </h3>
          <div className="grid grid-cols-7 gap-1 text-xs text-sidebar-foreground/50 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map(
              (day, index) => (
                <div key={index} className="text-center p-1">
                  {day}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <button
              key={`calendar-${index}`}
              onClick={() =>
                day.isTripDate && onDateSelect(day.dateStr)
              }
              className={`
                aspect-square text-xs md:text-sm p-1 rounded-md transition-colors text-center touch-manipulation relative
                ${!day.isCurrentMonth ? "text-sidebar-foreground/20" : ""}
                ${
                  day.isTripDate
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 cursor-pointer"
                    : ""
                }
                ${day.isSelected ? "ring-2 ring-sidebar-ring" : ""}
                ${!day.isTripDate && day.isCurrentMonth ? "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" : ""}
              `}
              disabled={!day.isTripDate}
            >
              <div className="flex flex-col items-center justify-center h-full">
                {day.date}
                {day.isBirthdayDate && (
                  <div className="absolute -top-0.5 -right-0.5 text-xs leading-none">
                    🎉
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trip Stats */}
      <div className="mt-auto p-4 md:p-6 border-t border-sidebar-border">
        <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
          <div>
            <div className="text-sm md:text-lg font-medium text-sidebar-foreground">
              15
            </div>
            <div className="text-xs text-sidebar-foreground/70">
              Days
            </div>
          </div>
          <div>
            <div className="text-sm md:text-lg font-medium text-sidebar-foreground">
              4
            </div>
            <div className="text-xs text-sidebar-foreground/70">
              Cities
            </div>
          </div>
          <div>
            <div className="text-sm md:text-lg font-medium text-sidebar-foreground">
              2
            </div>
            <div className="text-xs text-sidebar-foreground/70">
              🎂
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DayOverviewCardProps {
  day: DayData;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const DayOverviewCard = React.forwardRef<HTMLDivElement, DayOverviewCardProps>(
  ({ day, index, isSelected, onClick }, ref) => {
  const getMainActivities = () => {
    const activities = day.activityGroups.flatMap(
      (group) => group.activities,
    );
    return activities.slice(0, 2);
  };

  const getActivityCount = () => {
    return day.activityGroups.flatMap(
      (group) => group.activities,
    ).length;
  };

  // Get city color for subtle accent
  const getCityAccent = () => {
    switch (day.cityClass) {
      case "seoul":
        return "bg-red-50 border-red-100";
      case "osaka":
        return "bg-emerald-50 border-emerald-100";
      case "tokyo":
        return "bg-blue-50 border-blue-100";
      case "yamanakako":
        return "bg-green-50 border-green-100";
      default:
        return "bg-muted/20 border-border/50";
    }
  };

  return (
    <div
      ref={ref}
      className={`
        group relative p-4 md:p-5 rounded-xl cursor-pointer transition-all duration-300 border touch-manipulation
        ${
          isSelected
            ? "bg-card border-ring shadow-lg ring-1 ring-ring/20"
            : `${getCityAccent()} hover:shadow-md hover:border-border`
        }
      `}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {day.dayNumber}
            </div>
            {day.hasBirthday && (
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 rounded-full">
                <span className="text-xs">🎉</span>
                <span className="text-xs font-medium text-orange-700">
                  Birthday
                </span>
              </div>
            )}
          </div>

          <h3 className="text-base md:text-lg font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
            {day.title}
          </h3>

          <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 md:w-3.5 h-3 md:h-3.5 flex-shrink-0" />
            {day.location}
          </p>
        </div>

        <div className="flex items-center gap-1 md:gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
          <div className="text-xs font-medium bg-muted/80 px-2 py-1 rounded-md">
            {getActivityCount()} activities
          </div>
          <ChevronRight className="w-3 md:w-4 h-3 md:h-4 flex-shrink-0" />
        </div>
      </div>

      {/* Preview Activities */}
      <div className="space-y-2">
        {getMainActivities().map((activity, idx) => (
          <div
            key={`activity-${index}-${idx}`}
            className="flex items-start gap-2 md:gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 md:mt-2 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs md:text-sm font-medium text-foreground truncate">
                {activity.name}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {activity.description}
              </div>
            </div>
          </div>
        ))}

        {getActivityCount() > 2 && (
          <div className="text-xs text-muted-foreground ml-4 md:ml-5 mt-2">
            +{getActivityCount() - 2} more activities
          </div>
        )}
      </div>

      {/* Subtle gradient overlay for selected state */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-xl pointer-events-none" />
      )}
    </div>
  );
  }
);

DayOverviewCard.displayName = "DayOverviewCard";

const DayDetailPanel: React.FC<{
  day: DayData | null;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  className?: string;
  showCloseButton?: boolean;
}> = ({
  day,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  className = "",
  showCloseButton = true,
}) => {  
  if (!day) {
    return (
      <div
        className={`bg-muted/30 border-l border-border h-full flex items-center justify-center ${className}`}
      >
        <div className="text-center text-muted-foreground p-6 md:p-8">
          <CalendarIcon className="w-8 md:w-12 h-8 md:h-12 mx-auto mb-3 md:mb-4 opacity-40" />
          <p className="text-xs md:text-sm">
            Select a day to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card border-l border-border h-full flex flex-col ${className}`}
    > 
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 md:p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm md:text-base font-medium text-foreground">
            Day Details
          </h2>
          <button
            onClick={onPrevious}
            className="p-2 hover:bg-accent rounded-lg transition-colors touch-manipulation border border-border"
            aria-label="Previous day"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNext}
            className="p-2 hover:bg-accent rounded-lg transition-colors touch-manipulation border border-border"
            aria-label="Next day"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {showCloseButton && (
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-accent rounded-lg transition-colors touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6">
          {/* Day Header */}
          <div className="mb-6 md:mb-8">
            <div className="text-xs md:text-sm text-muted-foreground mb-2 font-medium uppercase tracking-wide">
              {day.dayNumber}
            </div>
            <h1 className="text-lg md:text-2xl font-medium text-foreground mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
              {day.title}
              {day.hasBirthday && (
                <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200 rounded-full">
                  <span className="text-sm">🎉</span>
                  <span className="text-xs md:text-sm font-medium text-orange-700">
                    Birthday
                  </span>
                </span>
              )}
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-3 md:w-4 h-3 md:h-4" />
              {day.location}
            </p>
          </div>

          {/* Activities */}
          <div className="space-y-6 md:space-y-8 mb-6 md:mb-8">
            {day.activityGroups.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`}>
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
                  <TimeIcon type={group.timeIcon} />
                  <h3 className="text-sm md:text-base font-medium text-foreground">
                    {group.timeLabel}
                  </h3>
                </div>

                <div className="space-y-4 md:space-y-6 ml-4 md:ml-6">
                  {group.activities.map(
                    (activity, actIndex) => (
                      <div
                        key={`activity-detail-${groupIndex}-${actIndex}`}
                        className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden"
                      >
                        {/* Main Activity Info */}
                        <div className="p-3 md:p-4">
                          <div className="flex items-start justify-between mb-2 md:mb-3">
                            <h4 className="text-sm md:text-base font-medium text-foreground leading-tight">
                              {activity.name}
                            </h4>
                            {activity.recommendedTime && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2 py-1 ml-2 flex-shrink-0">
                                <Clock className="w-3 h-3" />
                                <span className="whitespace-nowrap">
                                  {activity.recommendedTime}
                                </span>
                              </div>
                            )}
                          </div>

                          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4">
                            {activity.description}
                          </p>

                          {/* Quick Info Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
                            {activity.duration && (
                              <div className="text-xs">
                                <span className="text-muted-foreground">
                                  Duration:
                                </span>
                                <span className="text-foreground ml-1">
                                  {activity.duration}
                                </span>
                              </div>
                            )}
                            {activity.cost && (
                              <div className="text-xs">
                                <span className="text-muted-foreground">
                                  Cost:
                                </span>
                                <span className="text-foreground ml-1">
                                  {activity.cost}
                                </span>
                              </div>
                            )}
                          </div>

                          {activity.address && (
                            <div className="text-xs mb-3">
                              <span className="text-muted-foreground">
                                Address:
                              </span>
                              <span className="text-foreground ml-1">
                                {activity.address}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Tips & Fun Facts */}
                        {(activity.tips ||
                          activity.funFact) && (
                          <div className="border-t border-border/50 bg-muted/20">
                            {activity.tips && (
                              <div className="p-3 border-b border-border/30">
                                <div className="flex items-start gap-2">
                                  <Info className="w-3 md:w-3.5 h-3 md:h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <div className="text-xs font-medium text-blue-700 mb-1">
                                      Pro Tip
                                    </div>
                                    <div className="text-xs text-muted-foreground leading-relaxed">
                                      {activity.tips}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {activity.funFact && (
                              <div className="p-3">
                                <div className="flex items-start gap-2">
                                  <Lightbulb className="w-3 md:w-3.5 h-3 md:h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <div className="min-w-0">
                                    <div className="text-xs font-medium text-amber-700 mb-1">
                                      Fun Fact
                                    </div>
                                    <div className="text-xs text-muted-foreground leading-relaxed">
                                      {activity.funFact}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          {day.notes && (
            <div className="bg-accent/50 rounded-xl p-4 md:p-5 border border-accent-foreground/10">
              <h4 className="text-sm md:text-base font-medium text-accent-foreground mb-2 md:mb-3 flex items-center gap-2">
                {day.notes.title}
              </h4>
              <p className="text-xs md:text-sm text-accent-foreground/80 leading-relaxed">
                {day.notes.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [selectedDate, setSelectedDate] = useState<
    string | null
  >(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState<
    number | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Refs for scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dayCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    const dayIndex = dayData.findIndex(
      (day) => day.date === date,
    );
    setSelectedDayIndex(dayIndex >= 0 ? dayIndex : null);
    setIsCalendarOpen(false); // Close calendar on mobile after selection

    // Auto scroll to the selected day card
    if (
      dayIndex >= 0 &&
      scrollContainerRef.current &&
      dayCardRefs.current[dayIndex]
    ) {
      dayCardRefs.current[dayIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  const handleDayCardClick = (index: number) => {
    setSelectedDayIndex(index);
    setSelectedDate(dayData[index].date);

    // Only open the detail sheet on mobile/tablet screens (< lg)
    // On desktop, the detail panel is always visible
    const isDesktop = window.innerWidth >= 1024; // lg breakpoint
    if (!isDesktop) {
      setIsDetailOpen(true);
    }
  };

  const handleCloseDetail = () => {
    setSelectedDayIndex(null);
    setSelectedDate(null);
    setIsDetailOpen(false);
  };

  const handleNextDay = () => {
    if (selectedDayIndex !== null && selectedDayIndex < dayData.length - 1) {
      const nextIndex = selectedDayIndex + 1;
      setSelectedDayIndex(nextIndex);
      setSelectedDate(dayData[nextIndex].date);
      
      // Auto scroll to the next day card
      if (scrollContainerRef.current && dayCardRefs.current[nextIndex]) {
        dayCardRefs.current[nextIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  };

  const handlePreviousDay = () => {
    if (selectedDayIndex !== null && selectedDayIndex > 0) {
      const prevIndex = selectedDayIndex - 1;
      setSelectedDayIndex(prevIndex);
      setSelectedDate(dayData[prevIndex].date);
      
      // Auto scroll to the previous day card
      if (scrollContainerRef.current && dayCardRefs.current[prevIndex]) {
        dayCardRefs.current[prevIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }
  };

  const filteredDays = dayData.filter((day) => {
    if (!searchTerm) return true;
    const searchText = searchTerm.toLowerCase();
    return (
      day.title.toLowerCase().includes(searchText) ||
      day.location.toLowerCase().includes(searchText) ||
      day.activityGroups.some((group) =>
        group.activities.some(
          (activity) =>
            activity.name.toLowerCase().includes(searchText) ||
            activity.description
              .toLowerCase()
              .includes(searchText),
        ),
      )
    );
  });

  const selectedDay =
    selectedDayIndex !== null
      ? dayData[selectedDayIndex]
      : null;

  // DEBUG: Log the selected day and navigation props
  console.log('DEBUG: selectedDayIndex:', selectedDayIndex);
  console.log('DEBUG: selectedDay:', selectedDay);
  console.log('DEBUG: hasNext:', selectedDayIndex !== null && selectedDayIndex < dayData.length - 1);
  console.log('DEBUG: hasPrevious:', selectedDayIndex !== null && selectedDayIndex > 0);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Mobile Navigation Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
        <Sheet
          open={isCalendarOpen}
          onOpenChange={setIsCalendarOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <SheetTitle className="sr-only">
              Calendar Navigation
            </SheetTitle>
            <SheetDescription className="sr-only">
              Navigate through trip dates and view calendar
              overview
            </SheetDescription>
            <CalendarPanel
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              className="border-r-0"
            />
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-medium text-foreground">
          Korea - Japan 2025
        </h1>

        {selectedDay && (
          <div className="lg:hidden">
            <Sheet
              open={isDetailOpen}
              onOpenChange={setIsDetailOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  Details
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="p-0 w-full max-w-md"
              >
                <SheetTitle className="sr-only">
                  Day Details
                </SheetTitle>
                <SheetDescription className="sr-only">
                  View detailed information about the selected
                  day's activities
                </SheetDescription>
                <DayDetailPanel
                  day={selectedDay}
                  onClose={() => setIsDetailOpen(false)}
                  onNext={handleNextDay}
                  onPrevious={handlePreviousDay}
                  hasNext={selectedDayIndex !== null && selectedDayIndex < dayData.length - 1}
                  hasPrevious={selectedDayIndex !== null && selectedDayIndex > 0}
                  className="border-l-0"
                  showCloseButton={false}
                />
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>

      {/* Desktop Calendar Panel */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <CalendarPanel
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Hidden on mobile, replaced by mobile nav */}
        <div className="hidden lg:block border-b border-border p-4 lg:p-6 bg-card/50 backdrop-blur-sm">
          <h1 className="text-xl lg:text-2xl font-medium text-foreground mb-3 lg:mb-4">
            Trip Overview
          </h1>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-16 p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-full pl-10 pr-4 py-2.5 bg-input-background border border-border rounded-lg text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable Day Cards */}
        <div
          className="flex-1 overflow-y-auto"
          ref={scrollContainerRef}
        >
          <div className="p-4 lg:p-6">
            <div className="max-w-none lg:max-w-4xl xl:max-w-5xl mx-auto">
              <div className="space-y-3 md:space-y-4">
                {filteredDays.map((day, index) => {
                  const originalIndex = dayData.indexOf(day);
                  return (
                    <DayOverviewCard
                      key={`day-card-${originalIndex}`}
                      ref={(el: HTMLDivElement | null) => {
                        dayCardRefs.current[originalIndex] = el;
                      }}
                      day={day}
                      index={originalIndex}
                      isSelected={
                        selectedDayIndex === originalIndex
                      }
                      onClick={() =>
                        handleDayCardClick(originalIndex)
                      }
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Detail Panel */}
      <div className="hidden lg:block w-96 xl:w-[28rem] flex-shrink-0">
        <DayDetailPanel
          day={selectedDay}
          onClose={handleCloseDetail}
          onNext={handleNextDay}
          onPrevious={handlePreviousDay}
          hasNext={selectedDayIndex !== null && selectedDayIndex < dayData.length - 1}
          hasPrevious={selectedDayIndex !== null && selectedDayIndex > 0}
        />
      </div>
    </div>
  );
}