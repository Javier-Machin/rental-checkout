# Rental checkout form

Live version: https://javier-machin.github.io/rental-checkout/

I will go through the main features and the reasons for some of the different choices I made.

# Initial setup

Instead of going with `create-react-app` I decided to setup the project manually from scratch,   
adding a similar set of tools and scripts, using all the latest versions:  

All the assets are handled via Webpack.  
Apart from the regular JavaScript loader, I added HTML, CSS and SASS loaders, along with CSS prefixer.
It transpiles the JS with Babel.   
To serve the project in our dev environment webpack dev server is used.  

It also has `eslint` and `prettier` using the airbnb ruleset a bit customized by me.  
Thanks to this we can enforce a tidy code style and save time trying to format it, for those who use vscode at least (:  

The reason I went with this setup is to showcase webpack and general project setup and tooling knowledge.

`npm install` `npm start` will get it up and running.  
`npm test` will run the tests.

# Folder structure

Simple components are found in `.src/components`.  
Complex components have their own folder and everything is imported from the index file `.src/components/Calendar/index.js" ` 
By having an index we can import it like any other single file component `Import Calendar from './Calendar'`  

In a large project I would create more subfolders like `forms`, `common` and so on, but no more than that, not a fan of crazy nesting.

The css folder mimics the components structure.
Each css file (scss in this case), is imported from it's related component. 
I went this route to keep it simple, but I have used styled components in other projects if that's preferred.

# Implementation run down

I use semantic HTML across the project (when it makes sense). It provides better context and helps with SEO.

Keeping accessibility in mind, the whole app can be navigated using only the keyboard.

`PureComponent` and `memo` are used when possible, it prevents the re-render when the props and state values are the same providing a performance boost.

# RentalCheckout

The main component is `RentalCheckout` it renders all the main UI elements, holds the state and important handlers.   
Those are passed down via props.  
Apart from `Calendar` and `TimePicker` it renders 10 numeric inputs.  

# Calendar

 ```
<Calendar
  selectedDate={selectedDate}
  calendarDate={calendarDate}
  calendarVisible={calendarVisible}
  handleCalendarCellOnClick={this.handleCalendarCellOnClick}
  handleCalendarArrowOnClick={this.handleCalendarArrowOnClick}
  availableDates={[
    { year: 2020, month: 8, from: 4, to: 10 },
    { year: 2020, month: 8, from: 24, to: 27 },
    { year: 2020, month: 9, from: 5, to: 9 },
  ]}
/>
```

I made the calendar from scratch with pure JS.
The reason for this is to prove that if at some point a solution is needed but none of the available third party implementations meet the requirements, we can roll our own.  
To keep the component tidy, most of the calendar logic is tucked away in `helpers` within the component folder.
The layout has been done with grid and flexbox (this is true for the whole project).

The most interesting prop it has is `availableDates`  
We provide an array of objects containing the year, the month and a range of days in that month that will be shown as available.

# TimePicker

```
<TimePicker
  selectedDate={selectedDate}
  selectedHours={selectedHours}
  minHours={2}
  maxHours={3}
  setValidationErrors={this.setValidationErrors}
  setSelectedHours={this.setSelectedHours}
  availableHours={[
    { month: 8, from: 11, to: 15 },
    { month: 9, from: 12, to: 16 },
  ]}
/>
```

Similar to the calendar, this component is also custom made. It only shows up when an available date is selected.  

We provide it with the minimum booking hours, maximum booking hours, and ranges of available hours.
To meet the challenge requirements, the time selections can be made starting and ending in the middle of the different available hours.

Attempting to select more time than the specified max via props will result in a validation error message and the selection will be prevented.
Smaller than minimum ranges and starting times that will span outside of opening hours will also display validation messages.

(To test the validation going beyond opening hours pick one of the available days in October and start the selection near the bottom of the available hours)

# Testing

I added to the project Jest and Testing Library.
After running the tests, apart from the one printed in console, an interactive coverage report will be generated in the `coverage` folder.  
Open the index with your browser to explore it.

In the test folder a spec file can be found containing testing-library tests with different queries and matchers.
A test interacting with the UI and a test with just Jest are also included in the file.

# Wrapping up

So everything went perfectly? Nope.  

For starters the ability to provide a custom value for the implements didn't make it due to time constraints (self-imposed I know).  
The current implementation has a pretty good separation of concerns so I don't see implementing it much of a problem. 
 
The calendar is quite simple but it wasn't as straight forward to build as I expected (first time making one).

The timepicker had me thinking for a bit to come up with a way to be able to make the selection across different hour blocks,  
the biggest challenge in the project.

An improvement that could be made is making the availability displayed in the TimePicker move depending on the minimum booking time.

One small improvement I did over the reference is that the calendar won't trigger the timepicker by clicking days with no availability.

All in all, I think this project is a good representation of the code I produce (and my productivity for a given time).

Thanks.
