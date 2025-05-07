const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.post('/api/commission', async (req, res) => {
  try {
    const { type, description, contactMethod, contactInfo, budget, minecraftType } = req.body;
    
    if (!type || !description || !contactInfo) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Build fields array for Discord embed
    const fields = [
      {
        name: 'Type',
        value: type,
        inline: true
      },
      {
        name: 'Budget',
        value: budget || 'Not specified',
        inline: true
      }
    ];
    
    // Add Minecraft-specific info if applicable
    if (type === 'Minecraft' && minecraftType) {
      fields.push({
        name: 'Minecraft Development Type',
        value: minecraftType,
        inline: true
      });
    }
    
    // Add contact information
    fields.push({
      name: `Contact (${contactMethod})`,
      value: contactInfo,
      inline: false
    });
    
    // Add project description
    fields.push({
      name: 'Project Description',
      value: description,
      inline: false
    });
    
    const message = {
      embeds: [{
        title: '🚀 New Commission Request',
        color: 0x6c5ce7,
        fields: fields,
        timestamp: new Date().toISOString(),
        footer: {
          text: 'Portfolio Commission System'
        }
      }]
    };
    
    // Send to Discord webhook
    await axios.post(DISCORD_WEBHOOK_URL, message);
    
    res.status(200).json({ success: true, message: 'Commission request sent successfully' });
  } catch (error) {
    console.error('Error sending commission to Discord:', error);
    res.status(500).json({ error: 'Failed to send commission request' });
  }
});

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});