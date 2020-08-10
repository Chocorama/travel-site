import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector('.site-header')
        this.pageSections = document.querySelectorAll('.page-section')
        this.browserHeight = this.innerHeight
        this.previousScrollY = window.scrollY
        this.events()
    }

    events() {
        window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200))
        window.addEventListener('resize', debounce(() => {
            this.browserHeight = window.innerHeight
        }, 333))
    }

    runOnScroll() {
        this.determineScrollDirection()
        
        if (window.scrollY > 60) {
            this.siteHeader.classList.add('site-header--dark')
        } else {
            this.siteHeader.classList.remove('site-header--dark')
        }

        this.pageSections.forEach(el => this.calcSection(el))
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down'
        } else {
            this.scrollDirection = 'up'
        }
        this.previousScrollY = window.scrollY
    }

    calcSection(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100
            if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
                let matchingLink = el.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove('is-current-link'))
                document.querySelector(matchingLink).classList.add("is-current-link")
            }
        }
    }
}

export default StickyHeader;

//scrolly is how many pixels we have scrolled down from the top

// https://brooknovak.files.wordpress.com/2013/06/figure37.png
//go here for reference

// window.scrolly = how far from top we have scrolled
//window.innerheight = height of window
// offsettop = distance from top of element in question to top of parent
//offsetheight = height of element in question
//getBoundingClientRect().y = method returns the size of an element and its position relative to the viewport. tack on x or y to calculate that variable. console.log it to see its top, left,  right, width,  etc relative to viewport. agaain the y is top left corner of element to top of browser -- not top of page -- top of current browser area so a 0 would be where its sitting flush with top of browser