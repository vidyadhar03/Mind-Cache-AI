import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const benefits = [
  {
    title: "Improved Mental Health",
    description:
      "Dive deep into your emotional world with mind caching, a process that aids in articulating and processing emotions, significantly reducing stress and enhancing mental clarity.",
  },
  {
    title: "Enhanced Self-awareness",
    description:
      "By regularly articulating your thoughts and experiences, you embark on a path to profound self-awareness and understanding.",
  },
  {
    title: "Provides Actionable Insights",
    description:
      "AI does not just highlight patterns; it can also suggest actionable steps for improvement or coping strategies, making the introspection process more practical and applied.",
  },
  {
    title: "Enhances Personal Growth",
    description:
      "By combining the reflective practice of mind caching with AI-driven insights, users can gain deeper, data-backed understanding of their thought processes and emotional patterns. This can accelerate personal growth and self-awareness.",
  },{
    title: "Customizes the Experience",
    description:
      "AI can tailor the experience to each user's unique patterns and preferences, making mind caching a deeply personal and relevant practice.",
  },
  {
    title: "Encourages Consistency",
    description:
      "Seeing tangible patterns and insights can motivate users to consistently engage with mind caching, reinforcing the habit and its benefits.",
  },{
    title: "Bridges the Gap",
    description:
      "The AI acts as a bridge between raw, personal reflections and structured, insightful feedback, making the practice of mind caching more impactful than traditional journaling alone.",
  }
];

function BenefitsDropdown() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {benefits.map((benefit, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{
            background: "transparent",
            boxShadow: "none",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <div className="font-sans text-base md:text-lg ">
              {benefit.title}
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className="font-sans text-base md:text-lg">
              {benefit.description}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default BenefitsDropdown;
