# Near
This is my 2nd milestone project with Code Institute and their Full Stack Web Developer course.

## Summary 

### Project purpose: Presentation of interacitve data

In this project, you'll build an interactive front-end site. The site should respond to the users actions, allowing users to actively engage with data, alter the way the site displays the information to achieve their preferred goals.

Value provided:
Users are able to interact with the site in their particular way, to achieve their personal goals and derive answers to their specific questions.
The site owner advances their own goals by providing this functionality, potentially by being a regular user themselves.

### Main Technologies

* Required: HTML, CSS, JavaScript

* Optional: jQuery or any other JavaScript libraries, external APIs.

### Near


The other day I was on my bike and I wanted to find a place to eat. I had to use my phone but didn't know where I wanted to go. I opened Google Maps and either had to know the name and write it or go through the many options provided. This takes time, requires many clicks, which can be frustrating and is not particularly safe to do while moving. So I decided that I would make my project an interactive map that is easy and fast to use. 

#### GoogleMaps API
This project uses [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial), which lets you customize maps with your own content and imagery for display on web pages and mobile devices, and [Places API](https://developers.google.com/places/web-service/intro), which is a service that returns information about places using HTTP requests. These are both are managed from the Google Cloud Platform Console (also referred to as the Cloud Console). 

##### How to use the APIs:

To [use](https://developers.google.com/maps/documentation/javascript/tutorial) the APIs an API_key is required and this key is loaded using a script tag, which can be added inline in your HTML file or dynamically using a separate JavaScript file. In this project the API_key was loaded inline at the bottom of page just above "My Script". 

`<script async defer 
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap">
 </script>
`

The Google API has a free tier. Once the service is connected you can limit the calls it can make to the limit of the free tier so it can never go over and start charging you. Project limit:
* Daily limit: 24000 requests/day 

## UX

### User stories:
* As a user I want an easier and faster way to find the nearest basic places

* As a user I want a user friendly platform 

### Design and colors

#### Wireframes

For the design of the project I wanted to have a map as the main feature but I also wanted to include images and icons representing the places the user could choose from. Therefore the map is the largest part but the choosable images are at the top to be easily accessable.

##### Final wireframes:



#### Colors

The default map is very colorful and I wanted to keep the rest of the page clean with a white background. Originally, I had a white toned background image of plates but it looked too messy and I switched to the all white background. I chose a warm tone on the images which are appealing and easy on the eyes as well as fitting well with the map. The color of the icons are white with a dark transparent background to fit with both the satellite and road map view.


#### Fonts

For the font for Heading1`<h1>` and the paragraphs`<p>` I used Open Sans, from Google Fonts. This font works well with the design as it is modern and simple. *"Open Sans was designed with an upright stress, open forms and a neutral, yet friendly appearance. It was optimized for print, web, and mobile interfaces, and has excellent legibility characteristics in its letterforms"* [[Google Fonts, 2020]](https://fonts.google.com/specimen/Open+Sans).