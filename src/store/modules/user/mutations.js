// import config from '../../../config'

export const setProfile = function (state, data) {
  console.log('setting user profile:', data)
  if (!data) return
  state.wallet['capital'] = Number(data.capital)
  state.wallet['interest'] = Number(data.interest)
  state.wallet['commissions'] = Number(data.commissions)

  state.profile['firstName'] = data.first_name
  state.profile['lastName'] = data.last_name
  state.profile['email'] = data.email
  state.profile['phone'] = data.phone
  state.profile['houseAddress'] = data.house_address
  state.profile['gender'] = data.gender // data.gender === 1 ? 'Male' : data.gender === 0 ? 'Female' : ''
  state.profile['dateOfBirth'] = data.date_of_birth ? (new Date(data.date_of_birth)).toDateString() : ''
  state.profile['nationality'] = data.nationality
  state.profile['stateOfOrigin'] = data.state_of_origin
  state.profile['city'] = data.city
  state.profile['lga'] = data.lga
  state.profile['organization'] = data.organization
  state.profile['occupation'] = data.occupation
  state.profile['nokName'] = data.nok_name
  state.profile['nokPhone'] = data.nok_phone
  state.profile['nokAddress'] = data.nok_address

  state.profile['userId'] = data.id
  state.profile['id'] = data.id
  state.profile['type'] = data.type
  state.profile['status'] = data.status
  state.profile['referralCode'] = data.referral_code

  // console.log('done setting profile')
}

export const addMessage = function(state, msg) {
   console.log("ADDMessage")
  state.messages.unshift(msg)
}

export const updateWallet = function(state, wallet) {
  state.wallet.capital = wallet.capital
  state.wallet.interest = wallet.interest
  state.wallet.commissions = wallet.commissions
}

export const addToMarket = function(state, market) {
  state.market.unshift(market)
}

export const setMarkets = function(state, markets) {
  state.market = markets
}

export const setNotif = function(state, notif) {
  state.notification = notif.map((n)=> {
    n.created_at = new Date(n.created_at)
    return n
  })
}

export const addToNotif = function(state, notif) {
  state.market.unshift(notif)
}

export const txCompleted = function(state, data) {
  for(let i in state.market) {
    if(state.market[i].id === data.marketId) {
      state.market.splice(i)
      break;
    }
  }
}

export const updateDepositWallet = function (state, amount) {
  state.wallet['totalDeposits'] = Number(state.wallet['totalDeposits']) + Number(amount)
}

export const updateInvestmentWallet = function (state, amount) {
  state.wallet['totalInvested'] = Number(state.wallet['totalInvested']) + Number(amount)
}

export const updateWithdrawalWallet = function (state, amount) {
  state.wallet['totalProfit'] = Number(state.wallet['totalProfit']) - Number(amount)
}

export const setServerConfig = function (state, conf) {
  // console.log('serverConfig:', conf)
  state['serverConfig'] = conf
}
