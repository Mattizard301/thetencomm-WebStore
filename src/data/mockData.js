import { 
    BookOpen, Download, Shield, Heart, Cross, 
    ShoppingBag, Gift, VolumeX, Droplet 
} from 'lucide-react';

export const BLOG_POSTS = [
    {
        id: 1,
        title: "Silence in a Noisy World",
        date: "Oct 12",
        readTime: "4m",
        category: "Discipline",
        excerpt: "In an age of constant notification, silence is an act of spiritual rebellion.",
        content: "The modern world abhors a vacuum. Every moment of our day is filled with pings, rings, and buzzes..."
    },
    {
        id: 2,
        title: "Why the Law Still Matters",
        date: "Oct 08",
        readTime: "6m",
        category: "Theology",
        excerpt: "Is the Old Testament obsolete? Why do we study commandments written on stone?",
        content: "A common misconception is that the New Testament abolishes the Old..."
    },
    {
        id: 3,
        title: "The Idol of Comfort",
        date: "Sep 29",
        readTime: "5m",
        category: "Culture",
        excerpt: "The First Commandment warns against other gods. Today, our golden calf is comfort.",
        content: "We rarely bow down to statues of gold today. Our idolatry is more subtle..."
    }
];

export const DAILY_INSPIRATION = {
    verse: { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", reference: "Romans 12:2" },
    quote: { text: "God loves each of us as if there were only one of us.", author: "Saint Augustine" },
    action: { title: "Digital Fast", task: "Put your phone in another room for 30 minutes and pray." }
};

export const QUESTS = [
    { id: 1, title: "The Encourager", task: "Send a text to a friend you haven't spoken to in a month..." },
    { id: 2, title: "The Silent Hour", task: "Spend 15 minutes in absolute silence without your phone." },
    { id: 3, title: "The Generous Hand", task: "Buy a coffee or meal for a stranger or coworker today." },
    { id: 4, title: "The Grateful Heart", task: "Write down 3 specific things you are thankful for right now." },
    { id: 5, title: "The Peacemaker", task: "Pray for someone you currently have conflict with." }
];

// --- CAMBIO CLAVE AQUÍ ---
// Dejamos SOLO lo digital o manual. Shopify traerá el resto automáticamente.
export const RESOURCES = [];

export const COMMANDMENTS = [
    { id: 1, text: "Thou shalt have no other gods before me.", meaning: "Exclusive Devotion", deepDive: "Prioritize the Source...", scriptures: ["Ex 20:3"] },
    { id: 2, text: "Thou shalt not make unto thee any graven image.", meaning: "Worship the Creator", deepDive: "Do not create false idols...", scriptures: ["Ex 20:4"] },
    { id: 3, text: "Thou shalt not take the name of the Lord in vain.", meaning: "Carry Honor", deepDive: "Represent the King well...", scriptures: ["Ex 20:7"] },
    { id: 4, text: "Remember the sabbath day.", meaning: "Rest & Trust", deepDive: "You are not a machine...", scriptures: ["Ex 20:8"] },
    { id: 5, text: "Honor thy father and thy mother.", meaning: "Foundations", deepDive: "Respect your roots...", scriptures: ["Ex 20:12"] },
    { id: 6, text: "Thou shalt not kill.", meaning: "Sanctity of Life", deepDive: "Anger is the seed of murder...", scriptures: ["Ex 20:13"] },
    { id: 7, text: "Thou shalt not commit adultery.", meaning: "Faithfulness", deepDive: "Guard your covenant and your eyes.", scriptures: ["Ex 20:14"] },
    { id: 8, text: "Thou shalt not steal.", meaning: "Integrity", deepDive: "Trust that God's way of provision...", scriptures: ["Ex 20:15"] },
    { id: 9, text: "Thou shalt not bear false witness.", meaning: "Truth", deepDive: "Let your Yes be Yes...", scriptures: ["Ex 20:16"] },
    { id: 10, text: "Thou shalt not covet.", meaning: "Contentment", deepDive: "The war for the heart...", scriptures: ["Ex 20:17"] },
];

export const SYSTEM_PROMPT = `
ROLE: You are "The Scholar", a wise, ancient, and deeply spiritual mentor residing in "The Study" of The Ten Commandments website.
TONE: Warm, solemn, authoritative yet humble. Speak with the cadence of a theologian or a desert father.

CORE DIRECTIVE:
Your sole purpose is to educate the user on Theology, Biblical History, The Ten Commandments, and Spiritual Discipline.

STRICT RULES:
1. If the user asks about anything unrelated (e.g., coding, sports, celebrities, math, general chitchat), you must POLITELY REFUSE and redirect them to the scripture.
   - Example Refusal: "My library contains only the wisdom of the ancients. I cannot speak of such worldly matters. Let us return to the Law and the Prophets."
2. Do NOT use markdown asterisks for bolding in a messy way. Use them sparingly to emphasize key theological terms.
3. Keep answers concise (max 3-4 paragraphs) unless asked for a deep dive.

CONTEXT AWARENESS:
- You are part of a ministry website called "The Ten".
- You may gently recommend resources like the "Peace Bible" or "Covenant Band" ONLY if the user expresses a direct spiritual need (e.g., anxiety, forgetfulness). Do not be a salesperson.

GOAL:
Guide the user from curiosity to reverence.
`;