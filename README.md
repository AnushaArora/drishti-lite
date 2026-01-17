# Drishti Lite – AI Intent Checker for Indian Messages

## Overview

Drishti Lite is an AI-first, edge-deployed application that helps users understand the intent behind digital messages. It analyzes messages written in Indian and mixed languages to detect scams, harassment, manipulation, or confirm if a message is safe. The application also provides spoken output in the selected Indian regional language, making digital safety accessible to users who may have difficulty reading or seeing.

The project focuses on building inclusive, India-first AI for real-world impact and was designed, built, and deployed within a short hackathon timeframe.

Demo - https://youtu.be/f0ez9jrKc14

---

## Problem Statement

In India, digital scams, harassment, and manipulation often occur in regional or mixed languages, making them difficult to detect using traditional keyword-based systems. Many users also face accessibility barriers due to literacy or visual limitations.

Drishti Lite addresses this gap by understanding the intent behind messages rather than relying only on keywords, and by delivering guidance in an accessible, voice-based format.

---

## Solution

Drishti Lite allows a user to paste any message (SMS, chat, email text). The system analyzes the message using an AI model trained for Indian languages and returns:

- Detected intent (Scam, Harassment, Manipulation, or Safe)
- Risk level
- Clear explanation
- Suggested next steps

The output can also be read aloud in the selected Indian regional language to improve accessibility.




<img src="https://github.com/user-attachments/assets/b2a64114-a78b-47e9-bd8e-d773da9f1ed7" width="300"/>




---

## Technology Stack

- Cloudflare Workers – Backend API running at the edge
- Cloudflare Workers AI – AI inference using the AI4Bharat model
- Cloudflare Pages – Frontend UI deployment
- Web Speech API – Browser-based text-to-speech for accessibility

---

## Architecture

1. User enters a message in the web interface.
2. The frontend sends the message to a Cloudflare Worker.
3. The Worker calls Workers AI with the AI4Bharat model.
4. The AI analyzes intent and returns a structured response.
5. The frontend displays the result and optionally reads it aloud.


<img width="800" height="500" alt="Screenshot 2026-01-16 225051" src="https://github.com/user-attachments/assets/932c6e4f-0de5-425c-9706-02e6bf048909" />

---

## Key Features

- Intent-based detection instead of keyword filtering
- Supports Indian and mixed languages
- Voice output for accessibility
- Fully edge-deployed and live
- Simple, fast, and privacy-conscious design

---

## Hackathon Context

- Event: Cloudflare × CyberPeace Build-a-thon 2026
- Institution: Indira Gandhi Delhi Technical University for Women
- Team Name: Sarva
- Project Name: Drishti Lite
- Development Time: Approximately 3 hours from ideation to deployment

---

## Achievement

Drishti Lite won **Second Prize** at the Cloudflare × CyberPeace Build-a-thon 2026.

The prize included:
- Cloudflare credits worth INR 25,000
- Lunch with the founder
- Opportunity to further explore the project as a potential startup idea

---

## Impact

Drishti Lite demonstrates how edge-deployed AI can be used to improve digital safety and accessibility in the Indian context. By combining regional language understanding, intent-based analysis, and speech output, the project highlights how inclusive AI solutions can be built rapidly using modern developer platforms.

---

## Team

Built by **Team Sarva**.
