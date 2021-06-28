import config from '@/config'

export default {
  data () {
    return {
      userIcon: `${config.rootDir}/static/img/user2.jpeg`
    }
  },
  methods: {
    formatChatDate (d) {
      let time = d.toLocaleTimeString()
      let date = d.toDateString()
      let t1 = time.split(':')
      let gmt = time.split(' ')[1]
      time = `${t1[0]}:${t1[1]} ${gmt}`
      return `${time}, ${date}`
    },
    scrollDistance (container, callback, refresh) {
      // Make sure a valid callback was provided
      if (!callback || typeof callback !== 'function') return
      if (!container) return

      // Variables
      let isScrolling, start, end, distance

      // Listen for scroll events
      container.addEventListener('scroll', function () {
        // Set starting position
        if (!start) {
          start = container.scrollTop
        }

        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling)

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
          // Calculate distance
          end = container.scrollTop
          distance = end - start

          // Run the callback
          callback(distance, start, end)

          // Reset calculations
          start = null
          end = null
          distance = null
        }, refresh || 66)
      }, false)
    }
  },

  computed: {
    profilePic: {
      set: function (newValue) {
        this.userIcon = newValue
      },

      get: function () {
        return function (u) {
          if (u.profilePic) {
            const serverInf = this.$store.getters.serverConfiguration
            return `${serverInf.profilePictureDir}/${u.id}`
          } else {
            return this.userIcon
          }
        }
      }
    }
  }
}
