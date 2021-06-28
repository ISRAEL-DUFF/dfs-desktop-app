export default {
  wallet: {
    capital: 0,
    interest: 0,
    commissions: 0
  },
  profile: {},
  serverConfig: {},
  market: [],
  notification: [
    {
      title: 'Package uploaded',
      body: 'Package is zipped and uploaded',
      viewed: true,
      created_at: new Date()
    },

    {
      title: 'Another notification',
      body: 'This is a test notification for a start',
      viewed: false,
      created_at: new Date()
    },
    {
      title: 'Yet a notif for you',
      body: 'System will be ready soon',
      viewed: true,
      created_at: new Date()
    },

    {
      title: 'Bank Udate info',
      body: 'Certainly bank update situation',
      viewed: false,
      created_at: new Date()
    }
  ],
  messages: [
    {
        type: "whatassp",
        title: "Message to Group of people",
        text: "elit. Integer dignissim nulla eu quam cursus placerat. Vivamus non odio ullamcorper, lacinia ante nec, blandit leo.",
        date: "11:00 April 16, 2020",
        id: 1
    },
    {
        type: "sms",
        title: "Pronto Meeting schedule change",
        text: "Proin porta vel erat suscipit luctus. Cras rhoncus felis sed magna commodo, in pretium mauris faucibus. Cras rhoncus felis sed magna commodo, in pretium mauris faucibus.",
        date: "17:00 April 15, 2020",
        id: 2
    },

    {
        type: "whatassp",
        title: "Party notification",
        text: "Morbi id arcu convallis, eleifend justo tristique, tincidunt nisl. Morbi euismod fermentum quam, at fringilla elit posuere a.",
        date: "17:00 April 10, 2020",
        id: 3
    },

    {
        type: "sms",
        title: "About the Technology",
        text: "Morbi id arcu convallis, eleifend justo tristique, tincidunt nisl. Morbi euismod fermentum quam, at fringilla elit posuere a.",
        date: "05:00 June 19, 2021",
        id: 4
    }
  ],

  // admin
  stats: {},
  adminCharts: {},

  // user
  userCharts: {}
}
