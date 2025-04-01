const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

let lastNewsTime = 0;  // To track the time of last news sent
let lastNewsSent = "";  // Variable to store the last news title, preventing duplication

// Function to fetch news from API
const fetchLatestNews = async () => {
    try {
        const apiUrl = `https://suhas-bro-apii.vercel.app/hiru`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data || !data.newsURL || !data.title || !data.image || !data.text) {
            console.log("No news available at the moment.");
            return null;
        }

        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        return null;
    }
};

// Send the news to the group
const sendNews = async (conn, m, newsData) => {
    const { newsURL, title, image, text, Power } = newsData;
    let newsInfo = " 𝐇𝐢𝐫𝐮 𝐍𝐞𝐰𝐬 𝐔𝐩𝐝𝐚𝐭𝐞 📰\n\n";
    newsInfo += `✨ *Title*: ${title}\n\n`;
    newsInfo += `📑 *Description*:\n${text}\n\n`;
    newsInfo += `⛓️‍💥 *Url*: www.hirunews.lk\n\n`;
    newsInfo += `> ᴘᴏᴡᴇʀᴅ ʙʏ ᴄʏʙᴇʀ ᴅᴜᴍɪʏʜ ᴏꜰᴄ*\n\n`;

    if (image) {
        await conn.sendMessage(m.chat, {
            image: { url: image },
            caption: newsInfo,
        }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { text: newsInfo }, { quoted: m });
    }
};

// Set an interval to periodically fetch the latest news
setInterval(async () => {
    const newsData = await fetchLatestNews();
    if (newsData && newsData.title !== lastNewsSent) {
        lastNewsSent = newsData.title;  // Update the last news sent
        // Now you need to send the news to all groups (or specific group)
        // Here, we assume you already have the group `from` to send it
        // You can either send it to a predefined group or multiple groups
        // Or you can trigger the `sendNews` function based on some condition
    }
}, 60000);  // 60 seconds interval (1 minute)

cmd({
    pattern: "newssend",
    alias: ["hi", "ne"],
    react: "⬇️",
    category: "search hiru news",
    desc: "Fetch the latest news from the SUHAS API in Hiru API and send it periodically.",
    use: "",
    filename: __filename,
},
    async (conn, mek, m, {
        from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber,
        botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName,
        participants, groupAdmins, isBotAdmins, isAdmins, reply
    }) => {
        try {
            if (!isGroup) {
                return reply("This command can only be used in groups.");
            }

            const currentTime = Date.now();
            if (currentTime - lastNewsTime < 60000) {  // 1 minute interval
                return reply("You can only request the news once per minute. Please wait a while.");
            }

            lastNewsTime = currentTime;  // Update the time of last news sent

            const newsData = await fetchLatestNews();
            if (!newsData) {
                return reply("No news available at the moment.");
            }

            sendNews(conn, m, newsData);
        } catch (error) {
            console.error(error);
            reply(`*An Error Occurred While Fetching News At This Moment* ❗`);
        }
    }
);
