# Virtual List (Windowing)
- won't add same no. of nodes in DOM
- updates the visible elements with new data, fixde no. of element were added in DOM
- technique to render only visible rows based on the container height
- on scroll it should only render items - without flickering/lags

- scrollHeight - full height of scrollable area
- scrollTop - how much distance scrollable area is scrolled
- clientHeight - visible area height (of the outer container)
- overscan - rendering extra rows before and after the visible area - for smooth scrolling

* 
- find start index / end index - based on the scroll position
    - track `scrollTop`/`itemHeight`
    - `(scrollTop + clientHeight) / itemHeight` --- for end 
    
- if container is fixed - how we have scrollable behaviour 


# other solutions are:
- pagination:
    - pros: predictable performance, Random access, url friendly, easy to debug
    - cons: requires extra memory(offset performance), context switching, interaction overload
    - use:  Admin panel, dashboard, search result, api's, seo-critical pages
    - not use: social feed, image gallery, real-time updates, 

- infinite scrolling (intersection observer API) or Bi-directional scrolling
```js
container.addEventListener('scroll', () => {
    const {scrolltTop, scrollHeight, clientHeight} = container;
    if(scrollTop + clientHeight >= scrollHeight-20){
        // fetch more data / next page
    }
});
```
     - cons: dom keeps growing, memory leaks, no random access, footer unreachable
     - pros: simple, progressive loading, seamless
     - use : social feed, chat applications, image gallery, live notifications
     - not use: data tables, financial reports, dashboards, anywhere random access is needed


# libraries available - 
- react-virtuoso 
- react-virtual-scroller 
- react-window 
- @tanstack/react-virtual

- browsers have height restriction -  eg. 2,147,483,647 - can't grow further that