---
title: Implementing Flight Search in a MERN Stack Application 🚀
published: 2025-04-22
description: Update on my Flight Booking System project - Search API endpoint
image: ./flight-search1.jpeg
tags: [MERN, 'Flight Booking System', search,  development, coding]
category: project
draft: false
---


Building a flight management system requires robust search capabilities. In my MERN stack project, I implemented a scalable flight search module using Express.js and the Amadeus API. Here’s a breakdown of the key features:  

**1. Secure Endpoints**  
All routes use `authenticateWithRefresh` middleware to validate JWT tokens, ensuring only authenticated users can access flight data.  

**2. Flexible Flight Search**  
The `/search` endpoint accepts 10+ parameters:  
```javascript
router.get('/search', authenticateWithRefresh, async (req, res) => {
  // Parameters: origin, destination, dates, passengers, class, etc.
  if (!origin || !destination || !departureDate) {
    return res.status(400).json({ message: 'Required fields missing' });
  }
  // ... Amadeus API call
});
```  
Key features:  
- Dynamic query building (optional params like `maxPrice` or `nonStop`)  
- Automatic currency defaulting to USD  
- Clean error handling for API failures  

**3. Airport Autocomplete**  
The `/airports` endpoint provides IATA code-based search with lightweight responses:  
```javascript
const airports = response.data.map(airport => ({
  iataCode: airport.iataCode,
  name: airport.name,
  city: airport.address.cityName 
}));
```  
**4. Best Deals Optimization**  
The `/best-deals` endpoint extends the search with budget-focused parameters like `duration` and `maxPrice`.  

**Lessons Learned:**  
- Third-party API integration requires careful parameter validation  
- Normalizing API responses improves frontend consistency  
- Middleware centralizes authentication logic effectively  

This implementation balances flexibility with maintainability. I am thinking of adding caching for frequent routes and pagination, but I'm maybe overthinking it.

Next step: frontend UI for the search module.

View the full code on [GitHub/Link](https://github.com/tomdu3/flight-booking)!