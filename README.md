# guestbook-frontend
 a simple react project

# Development decisions 

 | Decision | Explaination |
 |----------|--------------|
 | The app is a single page application and all its page are loaded under the same resource identifier | This app contains only 2 or 3 page (Login/register and the messaging page) and the client would not need to see more than one page at a time (depending on their authentication status) So, in order to enhance app performance and reduce page reloading, there's no point in spliting the website into multiple URIs |
 | The backend is an independent separate RESTful API project | That makes it much easier to managing the development of the app and it makes it more extensible such that for example a mobile application might be developed in the future it can share the same backend |