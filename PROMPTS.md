
# AI Feature: AI Trip Planner

#Overview

This project uses the Hugging Face Inference API to generate personalized travel itineraries based on user inputs.
# Prompt Variation 1

## Prompt

You are a travel guide.

Create a trip plan for the given destination.

Destination: {destination}

Days: {days}

Traveller Type: {people}

Interest: {interest}

## Example Input

- Destination: Konaseema
- Days: 3
- Traveller Type: Family
- Interest: Nature

## Example Output

- Day-wise itinerary
- Food recommendations
- Estimated budget

## Observation

The response was short and lacked detailed travel suggestions.

---

# Prompt Variation 2

## Prompt

You are an experienced travel planner.

Create a detailed itinerary including:

- Morning activities
- Afternoon activities
- Evening activities
- Food recommendations
- Travel tips
- Estimated budget

Destination: {destination}

Days: {days}

Traveller Type: {people}

Interest: {interest}

## Example Input

- Destination: Araku
- Days: 2
- Traveller Type: Friends
- Interest: Adventure

## Example Output

- Detailed day-wise schedule
- Adventure activities
- Local food suggestions
- Budget estimation

## Observation

The response was more organized and useful.

---

# Prompt Variation 3 (Best)

## Prompt

You are an expert travel guide.

Generate a detailed {days}-day travel itinerary for {destination}.

Traveller Type: {people}

Interests: {interest}

Include:

- Day-wise itinerary
- Morning activities
- Afternoon activities
- Evening activities
- Food recommendations
- Travel tips
- Estimated budget

## Example Input

- Destination: Konaseema
- Days: 3
- Traveller Type: Family
- Interest: Nature

## Example Output

- Complete 3-day itinerary
- Local food recommendations
- Travel tips
- Estimated budget

## Observation

The AI generated a structured and informative travel plan with detailed recommendations. The response was easy to read and covered all the required travel information.

---

# Best Prompt

Prompt Variation 3 produced the best results because it clearly specified the AI's role, the required output format, and all the sections to include. The generated itinerary was detailed, well organized, and useful for end users. Therefore, this prompt was selected for the final implementation.

---

# System Role Used

You are an expert travel guide.