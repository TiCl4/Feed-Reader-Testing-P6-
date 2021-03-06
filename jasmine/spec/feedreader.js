/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); 
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are defined', function() {
           allFeeds.forEach(function(feed) {
               expect(feed.name).toBeDefined();
               expect(feed.name.length).not.toBe(0);
           }); 
        });
    });
    //console.log($('.menu-hidden').css('transform', 'translate3d()'));
    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu is hidden by default.', function() {
            // Check the element that is supposed to have the class that hides the menu has it.
            expect($('body').hasClass('menu-hidden')).toBe(true);
            
            //Use console.log($('.slide-menu').css('transform')) in console to find matrix value first.
            //expect($('.slide-menu').css('transform')).toBe('matrix(1, 0, 0, 1, -192, 0)');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Visibility is changed when clicked', function() {
            //expect($('.menu-icon-link')).toBeTruthy(); Wrong, since it returns an object, always true
            //expect($('body').toggleClass('menu-hidden')).toBeTruthy(); Wrong since it returns an object, always true
            $('.menu-icon-link').trigger("click");                  // Trigger click
            expect($('body').hasClass('menu-hidden')).toBe(false);  // Expect to fail, so that it displays menu since it's hidden by default
            $('.menu-icon-link').trigger("click");                  // Trigger click once more 
            expect($('body').hasClass('menu-hidden')).toBe(true);   // Expect to pass
        });       
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            // must include loadFeed(0)
            loadFeed(0, done);
            //done();
        });
        
        it('loadFeed function is called and completes its work.', function() {
            var newFeed = document.querySelector('.feed .entry');
            //console.log(newFeed);
            expect(newFeed.length).not.toBe(0);   
        });
    });
    
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var initialFeed;
        beforeEach(function(done) {
            var index = 0;
            loadFeed(index, function() {
                initialFeed = document.querySelector('.feed').innerHTML;
                index++;    // Iterate to the next feed
                loadFeed(index, function() {
                    done();
                });
            });
        });
      
        it('A new feed is loaded.', function() {
            var newFeed = document.querySelector('.feed').innerHTML;
            expect(newFeed).not.toBe(initialFeed);
        });
    });
}());
