- rendering only visible rows based on the container height

- on scroll it should only render items - without flickering/lags


* 
- find start index / end index - based on the scroll position
    - track `scrollTop`/`itemHeight`
    - `(scrollTop + clientHeight) / itemHeight` --- for end 
- if container is fixed - how we have scrollable behaviour 