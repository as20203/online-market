Steps To install<br />
Tools Required:<br />
nodemon, npm<br />

1) Go To online-market root folder(the main project folder)<br />
2) Type The Following commands in terminal <br />
   npm install -g nodemon (In case you don't have it installed)<br />
   npm install<br />
   cd client<br />
   npm install<br />
   cd ..<br />
   npm run dev<br />
3) That's it enjoy.<br />

System Description
IZRAK is a web based online auction market system. This system basically lets us buy products online by placing a bid upon them. We are creating its front-end in REACT JS and using Semantic UI for styling purposes. The backend is in NODE JS with our database in MongoDB. Below is our division of the system into its different components to be used in the front-end and the back-end along with the system architecture diagram. Our application will be a single page application and only a single page is loaded when we start up the website with components re-rendered with each change of state in the products, or due to the events done by the user or by the client-server interface.
How will we buy the products?
In order to buy any product a user will place a bid on it greater than the minimum bid which will be set by the user to whom the product would belong to. Then a timer would start for the bid to complete during which other users can also bid on the product. After the timer would end, the user with the highest bid would receive a notification telling him/her that he has won the mid and acquired the product.
Components of the system
We have divided the system into two basic layers in order to design it. The client side presentation layer and the server side logic layer. The client side layer has the components which are part of our GUI which will interact with each other and render the result to be displayed on the browser. On this layer we will have the logic regarding the dependencies of different components upon one another and that which component would be stateful and which would be stateless.
 
A stateful component is the one which will contain our state object and has the ability to interact with our database and pass down data to it’s child components in the form of props. Currently, we have set our bidding system component as stateful which is described in our architecture diagram in the end of the section but later when we would be building up our application we would see whether we want more stateful components or not.
 
Given Below is the complete description of our system in terms of it’s high level components  and the business logic to be used in our backend to get and post data to/from our database.
We have divided the below section into client side layer and server side layer and explained each one.
Client Side Present Layer
This layer basically contains our different GUI components and it send data to the server side using an http/Ajax request.

Online Bidding System: -
This is our top most component in the system which requires all other components to render the GUI on the browser. It has three immediate child components the Header, Layout and the Footer.

2. Top Level Components and their process:
Header
This component basically contains a navigation bar with a signup and login button. Moreover, after the user logins it will have the following buttons for the different users:
 
Sign Out
Welcome Message
Notifications
My Profile
 
b.  Footer
This will be our bottom component and contain our copyright and property rights information.
 
c. Layout.
This will render elements in the central part of our page. It will further have the following components which it will render depending upon the different events triggered by the user by clicking different button or link on the webpage.
Landing Page
Admin
User
Login
Signup
Product List
 




Layout Components and processes
This section deals with explaining each of the components rendered in the layout section in response to the different events triggered by the user.
 
1)     Landing Page
This is the root layout component which will be rendered when the user will visit the website. This component will basically have a background image with a jumbotron containing a welcome message.
 
2)     Admin
This will be our component which will be rendered when the admin will login the system. It will basically have all the information concerning the administrative usage of the system. The admin will have access to the different products available for purchase and will have the ability to remove any of those product if it is reported and he will also be able to remove any of the users which are accessing the system. Only an admin can add another admin so we will have a root admin defined by default in our database and later in our system logic as we don’t want any other user to be an admin without existing admin approval. The child components present in the admin panel would be: -
a)     Remove User
b)     Remove Product
c)     Create Admin
 
3)     User
This component will be rendered when the user will login the system. It will display the products available for bidding, the notifications of the user, his/her profile and a welcome message upon different events triggered by the user. The user will also be able to create and remove his product.
Following are the child components called by it: -

a)     Profile
This will be rendered when the user clicks the profile link upon login. It will basically contain information about the user collected during sign up, his/her profile picture and also displays his created products which he can remove at any time before a bid is placed. He will also have an option to report a user here.
 
b)     Notifications
This component will display the user notifications regarding bids won, products upon which he placed his bids.

 
c)     Create products
This component lets the user to create the product. It is basically a form and it takes the product name, minimum bid amount, product description and product image.
 
4)     Login
This component will be rendered when the user will click the login link after visiting the website. This component consists of a form which will take the username and password as input and after authenticating login the user to his/her interface. Since we have different interface for the user and the admin.
 
5)     Signup
This component will be rendered when the user will click the sign up button after visiting the website. This component also contains a sign up form which will take the user name, password, credit card info (we will have a test data provided in a server file for this purpose which will be in JSON format and it will contain all the credit card info of users.) for getting current account balance.
 
6)     Product List
This component renders the products available for bidding. It is accessed by both the admin and the user after login. It would basically be an array of objects rendered each time when a user adds a new product. It will have the following child component
 
a)     Product
This will basically be a product card which will have its image and a place bid button. It is rendered inside the product list. Upon clicking the place bid button, purchase product component will be rendered which is described below: -
i)      Purchase Product:
             	       This component contains information about the product collected during its creation and renders it on the screen. Moreover, it has the place bid component inside it. Which will enable us to place bid on the component. The place bid component will display the highest bid and your bid and contain a form for the user to place his bid. When bidding time is over, it will display the highest bid on the product and send a notification to the user with the highest bid that he has won the product bid.
 
 


 
Server Side Layer
This layer basically contains all our business logic and the different processes used in the system as well  as the data storage and it responds to the client’s http/Ajax request by sending back a JSON object. This object basically contains the required information which is to be displayed in different components on the screen. We will divide this layer into business logic and data tier.
 
Business Logic Processes
The major processes involved in this layer are as follows: -
 
1)     Get Product Information
Whenever a new product is created, this process will send its information to the database to be stored in the products table and afterwards this data will be rendered in the product list and the product purchase components corresponding to the user’s or application events. This information is also useful for the admin whenever he wants to remove any given product.
 
2)     Send new user data
Whenever a new user is created this process will get its information and store it in the users table in the database.
 
3)     Get User information
This process fetches the user information when required to display in the user profile component, or in the header welcome message. This information is also useful when an admin wants to remove any user or we want to send notifications to a specific user.
 
4)     Get Admin Information
This will help to add a new admin into our database whenever he is created and fetch admin info when rendering the admin component on the screen.
 
5)     Broadcast Bidding Information
This process will broadcast all the bidding information of the product to all the users who have placed the bid in real time so that each user can know about the highest bid on the product placed at that time.
 



Data Tier
This subdivision will contain information about our database models i.e. our database and the table names. Basically, we have a single database created in MongoDB named Online Bidding system which contains two tables as per our current design which are products, and system users.  These tables contain object of our created entries and will be hosted in mLab online from where we would access our data and later display it on our screen.
System Architecture Diagram

 

Functional Requirements:
	Following is a list of all the possible functional requirements that will be included in the project as the project progresses on:
The User, provided that he or she has made an account beforehand and has logged in using that account, will be able to make bids of his or her choice on a list of biddable items that are provided to them once they are logged in.
Any user, who has once registered and logged in, can place his or her own item for bidding using the create product tab in the menu bar.
The user has to upload his or her product’s image before finalizing it for auction so that potential buyers can view the product before buying it for themselves.
Users can select their own choice of a starting bid price when they enlist an item for auctioning, but the provided minimum price for starting bid price must be $5.
The total amount of time available for placing bids on any items is 3 minutes, this will be increased in future implementation of the website, however, for demonstration and testing phases 3 minutes is an apt adaptation of the available bidding time.
Users have the choice of removing an item from the biddable list of items if bids are places on that item yet, this is in correlation with the previous requirement for the purpose of demonstration and test phases and will be further toned in future implementation.
A filter option will be provided which will narrow down the list of biddable items provided to the user as per the choice of the filter the user inputs in the search bar.
Clicking on any of the items available in the biddable list of items will redirect the user to a different page where a further description of the items and the user who enlisted the item for auctioning will be made available to the user.
Any user who can report another user to an administrator if he or she thinks that user is carrying out any fraudulent activities when he or she is viewing the detailed description of a particular item the alleged user has enlisted for auctioning.
Any potential user has the functionality to register or sign up for an account and log in through that account once the potential user or already registered user visits the home page of the website.
The users are also provided the functionality of saving their password when they have logged in once and are also allowed to log out once they have logged in so that the website may be accessed using a different account through the same terminal.
Users can click on the their name tab in the menu bar to view their own profile, provided that they are already logged in and the list of biddable items is being shown.
The user can also view the notifications that have been generated using the notifications tab in the menu bar about bids placed on their products or notifications about their products being removed by the admin.
The Administrator has the right to create other registered users new admins using the create admin option from the menu bar.
The Administrator has the right to delete any item he or she feels is fraudulent and promotes illegal or shady types of business on the website.
The Administrator also the right to remove any users from the website if he or she feels that the user is carrying out any illegal or shady types of business.
The Administrator’s notifications’ tab has an extra functionality added to it which is that he or she is alerted whenever he or she receives a report via user against another user so that the Administrator can inspect the user himself before removing him or her.




Non - Functional Requirements
Following are the possible non - functional requirements which will be incorporated into the project.

Reliability
The system should be bug free. It should be able to retrieve and record data while maintaining the data integrity. The system should run smoothly without any lag, unwanted errors or system crashes.


Availability
The system should be useable when required, through internet or the local network (depending on how it is deployed). If the system is deployed on a remote web server, a reliable web server needs to be used to reduce the downtime.

Security
The system should be protected against any unauthorized access and unauthorized changes to the system. Each user should be able to use the system only according to their pre-allocated privileges. Moreover, since the credentials of the users will be stored for authentication purpose, extra precautions should be taken to ensure that the data is safe.

Maintainability
The system would be designed in such a way that it would allow additional modules to be added later without significantly changing the existing system.

Portability
The front end of the system would be accessible through any modern web browser through any OS. Meanwhile the backend can be hosted local or remote server.


Summary
IZRAK is a web application that opens up a new horizon in the field of online marketing. It provides for a stress free and reliable retail experience. This gives user the liberty to set his own minimum bid. While at the same time it provides the buyer surety of not being exploited by the selling party by placing bids that seem reasonable to them. The application’s front end will be developed in REACT JS and back end in NODE JS while the database is planned to be set up in MongoDB. The web application has two main interfaces; Admin and user. Admin can add users, remove products and create new admins while user can view all the products available for bidding, bid on items, receive notifications, view user profiles and also create and remove products. Being a single page application, the website has all the components rendered on the same page when triggered by the user or by the client-server interface.
