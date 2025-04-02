const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const imageUrl = 'https://i.ibb.co/rftvFg0V/lordali.jpg';

cmd({
    pattern: "menu",
    react: "📃",
    alias: ["panel", "commands"],
    desc: "Get Bot Menu",
    category: "main",
    use: '.menu',
    filename: __filename
},
async (conn, mek, m, { from, quoted, pushname, reply }) => {
    try {
        const selectionMessage = `
*╭══〘〘 ${config.BOT_NAME} 〙〙*
*┃❍ ʜᴇʟʟᴏ👋* :*${pushname}*
*┃❍ ᴍᴏᴅᴇ* : *${config.MODE}*
*┃❍ ᴘʀᴇғɪx* : *${config.PREFIX}*
*┃❍ ʀᴀᴍ* : *34.56 ɢʙ/60.79*
*┃❍ ᴄʀᴇᴀᴛᴏʀ* : *ᴄʏʙᴇʀ ᴅᴜᴍɪʏʜ ᴏꜰᴄ*
*┃❍ ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ* : *${config.ALWAYS_ONLINE}*
*┃❍ ᴠᴇʀsɪᴏɴs* : *ᴠ.1.0.0*
*╰═════════════════⊷*
 *♡︎•━━━━━━☻︎━━━━━━•♡︎*
  *╭────────────◎*
  *┃❍ 1. 𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔* 
  *┃❍ 2. 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐌𝐄𝐍𝐔*
  *┃❍ 3. 𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔*
  *┃❍ 4. 𝐅𝐔𝐍 𝐌𝐄𝐍𝐔*
  *┃❍ 5. 𝐎𝐓𝐇𝐄𝐑 𝐌𝐄𝐍𝐔*
  *┃❍ 6. MAIN MENU*
  *┃❍ 7. OWNER MENU* 
  *┃❍ 8. CONVERT MENU*
  *┃❍ 9. ANMIE MENU*
  *┃❍ 10. AI MENU*
  *╰────────────◎*

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʏʙᴇʀ ᴅᴜᴍɪʏʜ ᴏꜰᴄ 
`;

        const sentMsg = await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: selectionMessage,
            contextInfo: { forwardingScore: 999, isForwarded: true },
        }, { quoted: mek });

        // පරිශීලක ප්‍රතිචාර ලබා ගැනීම
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userResponse = msg.message.extendedTextMessage.text.trim();
            if (msg.message.extendedTextMessage.contextInfo &&
                msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {

                let responseText;

                switch (userResponse) {
                    case '1': // DOWNLOAD MENU
                        responseText = `.menu1`;

                        break;
                    case '2': // AI MENU
                        responseText = `.dulmenu`;
                        break;
                    case '3': // OWNER MENU
                        responseText = `.groupmenu`;
                        break;
                    case '4': // GROUP MENU
                        responseText = `.funmenu`;
                        break;
                    case '5': // INFO MENU
                        responseText = `.othermenu`;
                        
                        break;
                    case '6': // WALLPAPERS MENU
                        responseText = `.mainmenu`;
               break;
                    case '7': // WALLPAPERS MENU
                        responseText = `.ownermenu`;

               break;
                    case '8': // WALLPAPERS MENU
                        responseText = `.convertmenu`;

               break;
                    case '9': // WALLPAPERS MENU
                        responseText = `.animemenu`;
                      
                 break;
                    case '10': // WALLPAPERS MENU
                        responseText = `.aimenu`;
                      
                      
                        break;
                    default:
                        responseText = "*❌ Invalid option. Please enter a valid number (1-10)*";
                }

                // තෝරාගත් මෙනුව WhatsApp chat එකට යවයි.
                await conn.sendMessage(from, { text: responseText }, { quoted: mek });
            }
        });

    } catch (e) {
        console.error(e);
        reply(`*⚠ An error occurred: ${e.message}*`);
    }
});

