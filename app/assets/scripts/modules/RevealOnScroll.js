import throttle from 'lodash/throttle'
import { isArguments } from 'lodash';
import debounce from 'lodash/debounce'

class RevealOnScroll {
    constructor(els, threshholdPercent) {
        this.threshholdPercent = threshholdPercent
        this.itemsToReveal = els;
        this.browserHeight = window.innerHeight
        this.hideInitially();
        // this gets functio to run when page loads//
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        //above the bind(this) menas that no matter how our function is called itll always be pointing at the 'this' keyword
        this.events()
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle)
        window.addEventListener('resize', debounce(() => {
            console.log('resize just ran')
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller() {
        console.log('scroll function ran')
        
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScolledTo(el)
            }
        })
    }

    calculateIfScolledTo(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log('element was calculated')
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100
            if (scrollPercent < this.threshholdPercent) {
                el.classList.add('reveal-item--is-visible')
                el.isRevealed = true
                if (el.isLastItem) {
                    window.removeEventListener('scroll', this.scrollThrottle)
                }
            }
        }

        // console.log(el.getBoundingClientRect().y)

        //this is a property that all modern web browsers make available to us
        //its a measure of how far the top edge of an element is from the top edge of the current bounding rectangle - in this case the browser viewport. if we scrolled to the bootom of viewport touching the item in question - it would be the height of our browser window in pixels
    }

    

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item')
            el.isRevealed = false
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
        //isLastItem is a property that we just tacked on with dot notation
    }
}

export default RevealOnScroll;

// throttle you provide two Arguments, the first is a function you want to run and the second is how many millisenconds before running again