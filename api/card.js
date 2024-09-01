const Jimp = require('jimp');

module.exports = async (req, res) => {
  const { level, rank } = req.query;
  
  if (!level || !rank) {
    res.status(400).send('Missing required query parameters: level and rank');
    return;
  }

  try {
    // Load the template image
    const image = await Jimp.read('templates/scorecard.png');

    // Define font size and load font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

    // Add level and rank text
    image.print(font, 50, 50, `Level: ${level}`);
    image.print(font, 50, 100, `Rank: ${rank}`);

    // Convert image to buffer
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

    // Set response headers and send image
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image');
  }
};
