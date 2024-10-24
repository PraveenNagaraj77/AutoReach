import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './ContentCreation.css';

const ContentCreation = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = "http://localhost:5000"; // Update this for production

  const handleGenerateContent = async () => {
    setLoading(true);
    setError("");

    // Validate the prompt input
    if (!prompt.trim()) {
      setError("Prompt cannot be empty."); // Inform the user if the prompt is empty
      setLoading(false);
      return;
    }

    // Append platform-specific prompts
    const extendedPrompt = `
    Generate a detailed social media campaign about "${prompt}". 
  
    1. **Instagram Post**:
    - What would be the best content for an Instagram post related to "${prompt}"?
    - Suggest creative captions, relevant hashtags, and visual ideas (e.g., types of images or videos).
    - Include any engaging elements like polls or questions to encourage interaction.
  
    2. **Instagram Ad Campaign**:
    - Outline a suitable budget for the ad campaign, along with potential audience demographics (age, interests, location).
    - Define the primary call-to-action (CTA) for the ad.
    - Provide estimated reach and engagement metrics based on the budget and target audience.
    - Include expected Click-Through Rate (CTR) and any factors that may influence it.
  
    3. **Twitter Post**:
    - Create a concise Twitter post related to "${prompt}", including 2-3 relevant hashtags and an engaging caption.
    - Suggest any additional elements, like images or links, to enhance engagement.
  
    4. **Twitter Ad Campaign**:
    - Recommend a budget for the Twitter ad campaign, targeting specifics like audience demographics and interests.
    - Describe the type of content that should be used in the ads (e.g., images, videos, GIFs).
    - Include performance expectations, such as clicks, retweets, and estimated Click-Through Rate (CTR).
    - Define goals for the campaign (e.g., increase followers, drive traffic to a website).
  `;

    try {
      const response = await axios.post(`${BASE_URL}/api/ai/generate`, {
        prompt: extendedPrompt,
      });

      // Check the response structure
      if (response.data && response.data.text) {
        setGeneratedContent(response.data.text);
        if (typeof onGenerate === 'function') {
          onGenerate(response.data.text); // Call only if onGenerate is a function
        } else {
          console.warn("onGenerate is not a function"); // Log warning if not a function
        }
      } else {
        throw new Error("Invalid response structure from the API.");
      }
    } catch (err) {
      console.error("Error generating content:", err.response || err); // Log the error response if available
      setError("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-creation container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center">Content Generation</h2>
          <div className="form-group">
            <label htmlFor="promptInput">Prompt:</label>
            <input
              id="promptInput"
              type="text"
              className="form-control"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              required
            />
          </div>
          <button
            className="btn btn-primary mx-auto d-block mt-3"
            onClick={handleGenerateContent}
            disabled={loading}
            style={{ padding: "10px 20px" }}
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
          {error && <p className="text-danger text-center mt-2">{error}</p>}
          {generatedContent && (
            <div className="mt-4">
              <h3>Generated Content:</h3>
              <div
                className="border p-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "5px",
                  width: "100%",
                  maxWidth: "1200px",
                  margin: "0 auto",
                  overflow: "hidden",
                }}
                dangerouslySetInnerHTML={{
                  __html: formatContent(generatedContent),
                }} // Render formatted HTML content
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Function to format content
const formatContent = (content) => {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold text
    .replace(/## (.*?)(\n|$)/g, "<h2>$1</h2>") // Headings (##)
    .replace(/### (.*?)(\n|$)/g, "<h3>$1</h3>") // Subheadings (###)
    .replace(/^\* (.*?)(\n|$)/gm, "<li>$1</li>") // List items with asterisks at the start
    .replace(/\n/g, "<br/>") // New lines to line breaks
    .replace(/(<li>.*?<\/li>)/g, "<ul>$1</ul>") // Wrap list items in <ul>
    .replace(/<ul><\/ul>/g, "") // Remove empty <ul> tags
    // Remove unwanted # symbols from non-hashtag sections
    .replace(/(?!#\w)(#)/g, ""); // Remove # unless part of a hashtag (e.g., #hashtag)
};
export default ContentCreation;
