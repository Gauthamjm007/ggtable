# Table with Advanced Filters

## Introduction

This helps users to get an
idea of different metrics for their perspective. goal of this project is to create a customisable
table with a set of functionalities. The table features an analytics page that will call a
REST API to fetch the data. That data is represented on Table component and enable the
user to perform some operations that will alter the view for the end user .

## Video Demo

[![Watch the video](https://youtu.be/yebgS3Shch4)](https://youtu.be/yebgS3Shch4)

### Run locally

Node js , yarn and git are required , Please follow the instructions below to run it in local server

```
git clone https://github.com/Gauthamjm007/ggtable.git
cd ggtable
yarn install
yarn start
```

Now the application will be running in localhost:3000 by default , in case of any error please raise an issue for this repo

### Features

- an option for the user to input the dates as a Date Picker to call the API end point to
  fetch data
- Reusable Analytics Table Component
- Allow the user to enable/hide a particular column from view The columns for the table need to
  have a representation separately as well. This will allow the user to select/deselect a particular
  column from view
- Reorderable table columns (from settings tab [refer mock]).
  Data formatting (each cell).
- Sortings & filters.
- Responsive Table.- Extra
- Reusable data cache layer. (implemented using local storage)
- Shareable table link

### Expectation

- Do not use any 3rd party library for table - Not Used<br/>
- React + Redux usages (Used for API Caching)
- Responsive Design (Checked in ipad ,medium screen,large screen , ultra large screen , not responsive for mobile phones yet)<br/>
- Table should work as per features set (met)
- Minimal library dependency for other components (Didn't use any external ui library , used packages for Drag and Drop , routing , date picker and date)

### File Directory

```
src
 ┣ assets
 ┃ ┣ img
 ┃ ┃ ┣ drawing.svg
 ┃ ┃ ┗ dummy_image.png
 ┃ ┣ styles
 ┃ ┃ ┣ .DS_Store
 ┃ ┃ ┣ _common.scss
 ┃ ┃ ┣ _large.scss
 ┃ ┃ ┣ _medium.scss
 ┃ ┃ ┣ _settings.scss
 ┃ ┃ ┣ _small.scss
 ┃ ┃ ┣ _variable.scss
 ┃ ┃ ┣ _xsmall.scss
 ┃ ┃ ┣ analytics.module.scss
 ┃ ┃ ┗ app.scss
 ┃ ┗ .DS_Store
 ┣ constants
 ┃ ┗ index.js
 ┣ features
 ┃ ┗ analytics
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ AppFilter.js
 ┃ ┃ ┃ ┣ Filter.js
 ┃ ┃ ┃ ┣ RangeFilter.js
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ containers
 ┃ ┃ ┃ ┗ AnalyticsContainer.js
 ┃ ┃ ┣ analyticsRoutes.js
 ┃ ┃ ┗ apiServices.js
 ┣ globalStore
 ┃ ┣ actions
 ┃ ┃ ┣ analytics.js
 ┃ ┃ ┣ app.js
 ┃ ┃ ┗ index.js
 ┃ ┣ reducers
 ┃ ┃ ┣ analytics.js
 ┃ ┃ ┗ app.js
 ┃ ┗ store
 ┃ ┃ ┗ configStore.js
 ┣ hocs
 ┃ ┗ pageLayoutHoc.js
 ┣ shared_elements
 ┃ ┣ NoData.js
 ┃ ┣ Sidebar.js
 ┃ ┗ index.js
 ┣ shared_ui_components
 ┃ ┣ Button.js
 ┃ ┣ ClickAwayListener.js
 ┃ ┣ FilterOption.js
 ┃ ┣ IconButton.js
 ┃ ┗ index.js
 ┣ utils
 ┃ ┣ globalApiServices.js
 ┃ ┣ httpInterceptor.js
 ┃ ┗ index.js
 ┣ .DS_Store
 ┣ App.js
 ┣ index.js
 ┣ logo.svg
 ┗ reportWebVitals.js
```

### Author

Goutham JM
