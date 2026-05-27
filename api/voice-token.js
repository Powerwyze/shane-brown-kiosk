export default function handler(req, res) {
  // Use a placeholder if ElevenLabs isn't configured yet
  const agentId = process.env.ELEVENLABS_AGENT_ID || 'PLACEHOLDER_AGENT_ID_REPLACE_ME';
  
  if (agentId === 'PLACEHOLDER_AGENT_ID_REPLACE_ME' && !process.env.ELEVENLABS_API_KEY) {
    return res.status(200).json({ 
      agentId: null,
      message: "Voice agent will be enabled when ElevenLabs API key is set."
    });
  }
  
  // Return the agent ID for the client SDK to use
  return res.status(200).json({ agentId });
}
